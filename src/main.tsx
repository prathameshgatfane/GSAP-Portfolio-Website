import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/portfolio.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root container element #root not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
