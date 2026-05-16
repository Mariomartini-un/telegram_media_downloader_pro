# 📥 Telegram Media Downloader Pro

> A secure, efficient userscript for downloading media from Telegram Web — with streaming support, integrity verification, and defensive security practices.

[![License: GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)
[![Userscript](https://img.shields.io/badge/install-userscript-44cc11.svg)](https://github.com/Mariomartini-un/telegram_media_downloader_pro/raw/main/dist/telegram-downloader-pro.user.js)
[![GitHub stars](https://img.shields.io/github/stars/Mariomartini-un/telegram_media_downloader_pro)](https://github.com/Mariomartini-un/telegram_media_downloader_pro/stargazers)

---

## ✨ Features

- 🚀 **Streaming Downloads**: Handle large files (10GB+) without memory crashes
- 🔐 **Integrity Verification**: SHA-256 hash checks detect tampering/corruption
- 🎛️ **Configurable UI**: In-browser settings panel (no code edits needed)
- 🛡️ **Security-First**: Minimal permissions, input sanitization, abort capability
- 📱 **Cross-Platform**: Works on Telegram WebK (`/k/`) and WebZ (`/a/`)
- ⏸️ **Resumable Downloads**: Automatic retry with exponential backoff
- 📊 **Progress Tracking**: Real-time download progress with detailed stats
- 🎨 **Theme Support**: Auto-detects Telegram's light/dark theme

---

## 📋 Table of Contents

- [Requirements](#-requirements)
- [Installation](#-installation)
- [Usage Guide](#-usage-guide)
- [Configuration](#-configuration)
- [Security Features](#-security-features)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🛠️ Requirements

Before installing, ensure you have:

### ✅ Required:
1. **A modern web browser**:
   - Google Chrome (v88+)
   - Mozilla Firefox (v85+)
   - Microsoft Edge (v88+)
   - Opera (v74+)

2. **A userscript manager extension**:
   - **Chrome/Edge/Opera**: [Tampermonkey](https://www.tampermonkey.net/) (Recommended)
   - **Firefox**: [Violentmonkey](https://violentmonkey.github.io/) or Tampermonkey
   - **Safari**: Not supported (userscript managers limited)

3. **A Telegram account** with access to Telegram Web

### ⚠️ Important Notes:
- This script **only works on Telegram Web** (https://web.telegram.org)
- Does **NOT** work on Telegram Desktop app or mobile apps
- Some channels may restrict downloads (this script bypasses UI restrictions)
- Always respect copyright and Telegram's Terms of Service

---

## 📥 Installation

### Step-by-Step Guide:

#### Step 1: Install a Userscript Manager

**For Chrome/Edge/Opera:**
1. Open Chrome Web Store: https://chrome.google.com/webstore
2. Search for **"Tampermonkey"**
3. Click **"Add to Chrome"**
4. Confirm by clicking **"Add extension"**
5. ✅ You'll see the Tampermonkey icon (black/white squares) in your toolbar

**For Firefox:**
1. Open Firefox Add-ons: https://addons.mozilla.org
2. Search for **"Violentmonkey"** or **"Tampermonkey"**
3. Click **"Add to Firefox"**
4. Confirm by clicking **"Add"**
5. ✅ You'll see the extension icon in your toolbar

#### Step 2: Install the Userscript

**Method A: One-Click Install (Recommended)**
1. Click this link: [🔗 Install Telegram Media Downloader Pro](https://github.com/Mariomartini-un/telegram_media_downloader_pro/raw/main/dist/telegram-downloader-pro.user.js)
2. Tampermonkey/Violentmonkey will open automatically
3. Click **"Install"** button
4. ✅ You'll see a confirmation: "Telegram Media Downloader Pro installed"

**Method B: Manual Install**
1. Open your userscript manager dashboard:
   - Tampermonkey: Click icon → **"Dashboard"**
   - Violentmonkey: Click icon → **"Dashboard"**
2. Click **"Create a new userscript"** or **"+"** button
3. Delete all default code
4. Go to your project's `dist/` folder on GitHub
5. Click on `telegram-downloader-pro.user.js`
6. Click **"Raw"** button
7. Copy all code (Ctrl+A, Ctrl+C)
8. Paste into the userscript editor (Ctrl+V)
9. Click **"File" → "Save"** or press Ctrl+S
10. ✅ Script is now active!

#### Step 3: Verify Installation

1. Open a new tab and go to: https://web.telegram.org
2. Log in to your Telegram account if needed
3. Open any chat or channel with media (photos/videos)
4. Click on a photo or video to open the media viewer
5. ✅ You should see a **"Download Pro"** button in the top toolbar

---

## 🎯 Usage Guide

### How to Download Media (Step-by-Step):

#### Downloading a Photo:

1. **Navigate to Telegram Web**:

2. **Open a chat or channel** that contains photos

3. **Click on a photo** to open it in full-screen viewer

4. **Look for the "Download Pro" button**:
- Located in the top toolbar
- Has a download icon (⬇️)
- Next to other media controls

5. **Click "Download Pro"**

6. **Choose save location** (if prompted by browser)

7. ✅ **Photo downloaded!** Check your Downloads folder

#### Downloading a Video:

1. **Open a chat or channel** with videos

2. **Click on a video** to open the media viewer

3. **Wait for video to load** (you may see a loading spinner)

4. **Click the "Download Pro" button** in the toolbar

5. **Watch the progress bar**:
- Shows download percentage
- Displays downloaded size / total size
- Updates in real-time

6. ⏳ **Wait for completion**:
- Small videos (< 100MB): Usually 5-30 seconds
- Large videos (1GB+): May take several minutes
- Progress bar shows exact status

7. ✅ **Video downloaded!** Check your Downloads folder

#### Downloading from Restricted Channels:

Some channels disable the "Save" button. This script bypasses that restriction!

1. **Open a restricted channel** (you'll notice no download button normally)

2. **Open any media** in the channel

3. ✅ **"Download Pro" button appears anyway!**

4. **Click and download** as usual

---

## ⚙️ Configuration

### Accessing Settings:

1. Go to Telegram Web: https://web.telegram.org
2. Open any media viewer
3. Look for the **gear icon (⚙️)** or **"Settings"** button
4. Click to open the settings panel

### Available Settings:

| Setting | Description | Default | Recommended |
|---------|-------------|---------|-------------|
| **Verify file integrity** | Check SHA-256 hash after download | ✅ On | ✅ Keep ON for security |
| **Show detailed progress** | Display exact bytes/percentage | ✅ On | ✅ Keep ON |
| **Auto-retry failed downloads** | Retry up to 3 times on failure | ✅ On | ✅ Keep ON |
| **Theme** | Light/Dark/Auto | Auto | Auto (matches Telegram) |

### Advanced Configuration (For Developers):

Edit the script directly to customize:

1. Open Tampermonkey Dashboard
2. Find "Telegram Media Downloader Pro"
3. Click to edit
4. Look for the `Config.defaults` section
5. Modify values:
```javascript
performance: {
  observerDebounceMs: 200,        // Faster UI response
  fetchRetryMax: 5,               // More retries
  chunkSize: 2 * 1024 * 1024,     // 2MB chunks (faster for fast connections)
}