import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TravelProvider } from './store/TravelContext';
import { ClassroomProvider } from './store/ClassroomContext';
import { DisplayProvider } from './store/DisplayContext';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DisplayProvider><TravelProvider><ClassroomProvider><App /></ClassroomProvider></TravelProvider></DisplayProvider>
  </React.StrictMode>
);

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`));
}
