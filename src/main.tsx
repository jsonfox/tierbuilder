import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import store, { ReduxProvider } from './redux/store';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ReduxProvider store={store}>
    <BrowserRouter basename="/tierbuilder">
      <App />
    </BrowserRouter>
  </ReduxProvider>
);
