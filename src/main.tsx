import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure window.fetch is writable and setting it does not throw
try {
  const win = typeof window !== 'undefined' ? window : (globalThis as any);
  if (win && win.fetch) {
    const rawFetch = win.fetch;
    let currentFetch = (...args: any[]) => rawFetch.apply(win, args);
    try {
      Object.defineProperty(win, 'fetch', {
        get() { return currentFetch; },
        set(val) { currentFetch = val; },
        configurable: true,
        enumerable: true,
      });
    } catch (_) {}
  }
} catch (_) {}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
