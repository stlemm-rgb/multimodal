import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { createIdbStore } from './platform/idbStore';
import './styles.css';

const store = createIdbStore();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App store={store} />
  </StrictMode>,
);
