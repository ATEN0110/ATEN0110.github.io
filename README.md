# Moa-demo

## WeCom Audio Autoplay Demo

Open `wecom-audio-autoplay.html` to see a working autoplay flow for WeCom.

Steps to integrate in a real app:
1. Replace the audio `src` with your own file URL.
2. Load the WeCom JS SDK and provide `wx.config` and (if needed)
   `wx.agentConfig` from your backend signature service.
3. Call `audio.play()` inside `WeixinJSBridgeReady` or `wx.ready`.
4. Keep a user-gesture fallback for devices that still block autoplay.

Files:
- `wecom-audio-autoplay.html`
- `js/wecom-audio-autoplay.js`
