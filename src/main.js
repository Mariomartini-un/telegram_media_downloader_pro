// src/main.js - Wires all modules together
(async function main() {
  await Config.load();
  
  const ui = new UIManager();
  let currentDownload = null;

  const onMediaReady = (container, buttons) => {
    if (buttons.querySelector('.tel-download-pro')) return;
    
    ui.injectDownloadButton(container, buttons, async (btn) => {
      const mediaEl = container.querySelector('video, img, audio');
      const url = mediaEl?.src || container.dataset.mediaUrl;
      const filename = `telegram_media_${Date.now()}.bin`;
      
      if (!url) {
        Logger.error('No media URL found');
        GM.notification({ title: 'Download Failed', text: 'Could not locate media source' });
        return;
      }

      ui.showProgress(container, { percent: null });
      
      const manager = new DownloadManager(
        (progress) => ui.showProgress(container, progress),
        (filename) => {
          ui.hideProgress();
          GM.notification({ title: '✓ Download Complete', text: filename });
          Logger.info('Download succeeded', { filename });
        },
        (msg, err) => {
          ui.hideProgress();
          GM.notification({ title: '✗ Download Failed', text: msg });
          Logger.error(msg, err, { url });
        }
      );
      
      currentDownload = manager;
      await manager.download(url, filename);
      currentDownload = null;
    });
  };

  const onError = (msg, err) => Logger.error(msg, err);
  const observer = new DOMObserver(onMediaReady, onError);
  observer.init();

  window.addEventListener('beforeunload', () => {
    observer.destroy();
    currentDownload?.abort();
  });

  Logger.info('Telegram Media Downloader Pro initialized');
})();