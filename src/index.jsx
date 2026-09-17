import App from '@components/App/index.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@styles/reset.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
