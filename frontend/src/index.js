import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import './index.css'; // Optional: for global styles

// Create a root and render the main App component
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
