import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import Main from './Main';
import reportWebVitals from './reportWebVitals';

const resizeObserverLoopErrRe =
  /ResizeObserver loop completed with undelivered notifications/i;

const isIgnoredResizeObserverError = (value) =>
  resizeObserverLoopErrRe.test(String(value || ""));

const NativeResizeObserver = window.ResizeObserver;

if (NativeResizeObserver) {
  window.ResizeObserver = class ResizeObserver extends NativeResizeObserver {
    constructor(callback) {
      super((entries, observer) => {
        window.requestAnimationFrame(() => callback(entries, observer));
      });
    }
  };
}

const resizeObserverHandler = (e) => {
  const message = e?.message || e?.reason?.message || "";

  if (isIgnoredResizeObserverError(message)) {
    e.preventDefault?.();
    e.stopImmediatePropagation();
  }
};

if (process.env.NODE_ENV === "development") {
  const originalConsoleError = console.error.bind(console);

  const hideResizeObserverOverlay = () => {
    const selectors = [
      "iframe[id*='overlay']",
      "iframe[src*='react-error-overlay']",
      "iframe[src*='error-overlay']",
      "#webpack-dev-server-client-overlay",
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((node) => {
        node.style.display = "none";
      });
    });
  };

  window.onerror = (message) => isIgnoredResizeObserverError(message);

  window.addEventListener("error", resizeObserverHandler, true);
  window.addEventListener("unhandledrejection", resizeObserverHandler, true);
  window.addEventListener("resize", () => {
    window.requestAnimationFrame(hideResizeObserverOverlay);
  });

  console.error = (...args) => {
    if (args.some((arg) => isIgnoredResizeObserverError(arg?.message || arg))) {
      window.requestAnimationFrame(hideResizeObserverOverlay);
      return;
    }

    originalConsoleError(...args);
  };

  const overlayObserver = new MutationObserver(() => {
    hideResizeObserverOverlay();
  });

  window.requestAnimationFrame(() => {
    hideResizeObserverOverlay();
    overlayObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Main />
  </HashRouter>
);

reportWebVitals();
