
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const init = () => {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error("Target container 'root' not found.");
    }

    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Application failed to start:", error);
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; text-align:center; padding:20px;">
          <h2 style="color:#ef4444;">App failed to load</h2>
          <p style="color:#64748b;">Please check the console for errors.</p>
        </div>
      `;
    }
  }
};

// 确保 DOM 加载后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
