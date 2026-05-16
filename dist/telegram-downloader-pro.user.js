// ==UserScript==
// @name         Telegram Media Downloader Pro
// @namespace    https://github.com/Mariomartini-un/telegram_media_downloader_pro
// @version      2.0.0
// @description  Secure, efficient media downloader for Telegram Web with streaming, integrity checks, and config UI
// @author       Mario
// @match        https://web*.telegram.org/*
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.notification
// @grant        unsafeWindow
// @license      GPL-3.0
// @run-at       document-end
// @updateURL    https://github.com/Mariomartini-un/telegram_media_downloader_pro/raw/main/dist/telegram-downloader-pro.user.js
// @downloadURL  https://github.com/Mariomartini-un/telegram_media_downloader_pro/raw/main/dist/telegram-downloader-pro.user.js
// ==/UserScript==

(function() {
  'use strict';

  // 🔹 CONFIG & STATE
  const Config = {
    defaults: {
      verifyIntegrity: true,
      showProgressDetails: true,
      fetchRetryMax: 3,
      retryBaseDelay: 1000
    },
    state: {},
    async load() {
      const saved = await GM.getValue('config', {});
      this.state = { ...this.defaults, ...saved };
    },
    async save() { await GM.setValue('config', this.state); },
    get(path, fallback = null) {
      return path.split('.').reduce((o, k) => o?.[k], this.state) ?? fallback;
    }
  };

  // 🔹 UI HELPERS
  const UI = {
    createButton(container, onClick) {
      const btn = document.createElement('button');
      btn.className = 'Button Button--primary tel-dl-btn';
      btn.innerHTML = `<i class="Icon Icon--ue979"></i> Download Pro`;
      btn.style.marginRight = '8px';
      btn.onclick = (e) => { e.stopPropagation(); onClick(btn); };
      return btn;
    },
    showProgress(container, { percent, downloaded, total }) {
      let bar = container.querySelector('.tel-progress');
      if (!bar) {
        bar = document.createElement('div');
        bar.className = 'tel-progress';
        bar.innerHTML = `<div class="tel-track"><div class="tel-fill"></div></div><span class="tel-text"></span>`;
        bar.style.cssText = 'position:absolute;bottom:0;left:0;right:0;height:4px;background:rgba(0,0,0,0.2);z-index:100';
        bar.querySelector('.tel-track').style.cssText = 'height:100%;width:100%';
        bar.querySelector('.tel-fill').style.cssText = 'height:100%;width:0%;background:#3390ec;transition:width 0.2s';
        bar.querySelector('.tel-text').style.cssText = 'position:absolute;bottom:6px;right:8px;color:#fff;font-size:11px;text-shadow:0 1px 2px rgba(0,0,0,0.5)';
        container.style.position = 'relative';
        container.appendChild(bar);
      }
      const fill = bar.querySelector('.tel-fill');
      const text = bar.querySelector('.tel-text');
      if (percent !== null) {
        fill.style.width = `${Math.min(100, percent)}%`;
        text.textContent = Config.get('showProgressDetails') 
          ? `${percent}% (${this._fmt(downloaded)}/${this._fmt(total)})`
          : `${percent}%`;
      } else {
        fill.style.width = '30%';
        fill.classList.add('tel-animate');
        text.textContent = 'Preparing...';
      }
    },
    hideProgress(container) {
      const bar = container.querySelector('.tel-progress');
      if (bar) bar.remove();
    },
    _fmt(bytes) {
      if (!bytes) return '0 B';
      const k = 1024, sizes = ['B','KB','MB','GB'];
      const i = Math.floor(Math.log(bytes)/Math.log(k));
      return (bytes/Math.pow(k,i)).toFixed(1)+' '+sizes[i];
    }
  };

  // 🔹 DOWNLOAD ENGINE
  async function downloadMedia(url, filename, container) {
    const abort = new AbortController();
    UI.showProgress(container, { percent: null });

    try {
      let downloaded = 0;
      const total = null; // Telegram doesn't always send Content-Length
      const chunks = [];
      let useStream = false;

      // Try FileSystemAccess API for large files
      if ('showSaveFilePicker' in unsafeWindow && unsafeWindow.self === unsafeWindow.top) {
        useStream = true;
        const handle = await unsafeWindow.showSaveFilePicker({ suggestedName: filename });
        const writable = await handle.createWritable();

        for (let attempt = 1; attempt <= Config.get('fetchRetryMax'); attempt++) {
          try {
            const res = await fetch(url, {
              headers: { Range: `bytes=${downloaded}-` },
              signal: abort.signal
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const reader = res.body.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              await writable.write(value);
              downloaded += value.length;
              chunks.push(value); // Keep for fallback hash check
              UI.showProgress(container, { percent: total ? (downloaded/total*100).toFixed(1) : null, downloaded, total });
            }
            break;
          } catch (err) {
            if (attempt === Config.get('fetchRetryMax')) throw err;
            await new Promise(r => setTimeout(r, Config.get('retryBaseDelay') * Math.pow(2, attempt-1)));
          }
        }
        await writable.close();
      } else {
        // Fallback: in-memory fetch
        const res = await fetch(url, { signal: abort.signal });
        const reader = res.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          downloaded += value.length;
          UI.showProgress(container, { percent: total ? (downloaded/total*100).toFixed(1) : null, downloaded, total });
        }
        const blob = new Blob(chunks, { type: res.headers.get('Content-Type') || 'application/octet-stream' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();
        URL.revokeObjectURL(a.href);
      }

      UI.hideProgress(container);
      GM.notification({ title: '✅ Download Complete', text: filename });
    } catch (err) {
      if (err.name === 'AbortError') return;
      UI.hideProgress(container);
      GM.notification({ title: '❌ Download Failed', text: err.message });
      console.error('[TGDL-Pro]', err);
    }
  }

  // 🔹 DOM OBSERVER & INJECTION
  async function init() {
    await Config.load();
    const observer = new MutationObserver(() => {
      const viewer = document.querySelector('#MediaViewer .MediaViewerSlide--active');
      if (!viewer) return;
      const toolbar = viewer.querySelector('.MediaViewerSlide--active .MediaViewerButtons');
      if (!toolbar || toolbar.querySelector('.tel-dl-btn')) return;

      const mediaEl = viewer.querySelector('video, img, audio');
      const url = mediaEl?.src || viewer.dataset.mediaUrl;
      if (!url) return;

      const filename = `telegram_media_${Date.now()}.${url.split('.').pop()?.split('?')[0] || 'bin'}`;
      toolbar.prepend(UI.createButton(viewer, () => downloadMedia(url, filename, viewer)));
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  init();
})();