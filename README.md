# 📥 Telegram Media Downloader Pro

> A secure, efficient userscript for downloading media from Telegram Web — with streaming support, integrity verification, and defensive security practices.

[![License: GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)
[![Userscript](https://img.shields.io/badge/install-userscript-44cc11.svg)](https://github.com/yourusername/telegram-media-downloader-pro/raw/main/dist/telegram-downloader-pro.user.js)

## ✨ Features

- 🚀 **Streaming Downloads**: Handle 10GB+ files without memory crashes
- 🔐 **Integrity Verification**: SHA-256 hash checks detect tampering/corruption
- 🎛️ **Configurable UI**: In-browser settings panel (no code edits needed)
- 🛡️ **Security-First**: Minimal permissions, input sanitization, abort capability
- 📱 **Cross-Platform**: Works on Telegram WebK (`/k/`) and WebZ (`/a/`)

## 🚀 Quick Install

1. Install a userscript manager:
   - Chrome: [Tampermonkey](https://www.tampermonkey.net/)
   - Firefox: [Violentmonkey](https://violentmonkey.github.io/)

2. Click here to install:  
   [🔗 Install Telegram Media Downloader Pro](https://github.com/yourusername/telegram-media-downloader-pro/raw/main/dist/telegram-downloader-pro.user.js)

3. Visit [Telegram Web](https://web.telegram.org) and open any media — a "Download Pro" button will appear!

## 🔧 Development

```bash
# Install dependencies (optional, for testing)
npm install

# Build userscript
npm run build

# Run tests
npm test