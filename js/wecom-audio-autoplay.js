(() => {
  "use strict";

  const audio = document.getElementById("bg-audio");
  const status = document.getElementById("status");
  const playBtn = document.getElementById("play-btn");
  const pauseBtn = document.getElementById("pause-btn");

  if (!audio) {
    return;
  }

  const setStatus = (message) => {
    if (status) {
      status.textContent = message;
    }
  };

  const tryPlay = (reason) => {
    let playPromise;
    try {
      playPromise = audio.play();
    } catch (error) {
      setStatus(`Play error (${reason}): ${error}`);
      return;
    }

    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => {
          setStatus(`Playing (${reason})`);
        })
        .catch((error) => {
          setStatus(`Play blocked (${reason}): ${error}`);
        });
    } else {
      setStatus(`Play requested (${reason})`);
    }
  };

  const tryPause = (reason) => {
    audio.pause();
    setStatus(`Paused (${reason})`);
  };

  const bindBridgeReady = () => {
    const handler = () => {
      tryPlay("WeixinJSBridgeReady");
    };
    document.addEventListener("WeixinJSBridgeReady", handler, false);
    document.addEventListener("YixinJSBridgeReady", handler, false);
  };

  const bindWxReady = () => {
    if (window.wx && typeof window.wx.ready === "function") {
      window.wx.ready(() => {
        tryPlay("wx.ready");
      });
      if (typeof window.wx.error === "function") {
        window.wx.error(() => {
          setStatus("wx.config error; waiting for user gesture");
        });
      }
    }
  };

  const bindUserGesture = () => {
    let triggered = false;
    const onGesture = () => {
      if (triggered) {
        return;
      }
      triggered = true;
      document.removeEventListener("touchstart", onGesture, false);
      document.removeEventListener("click", onGesture, false);
      tryPlay("user-gesture");
    };
    document.addEventListener("touchstart", onGesture, false);
    document.addEventListener("click", onGesture, false);
  };

  if (playBtn) {
    playBtn.addEventListener("click", () => {
      tryPlay("button");
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener("click", () => {
      tryPause("button");
    });
  }

  bindBridgeReady();
  bindWxReady();
  bindUserGesture();
  tryPlay("page-load");
})();
