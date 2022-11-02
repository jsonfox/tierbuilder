import ReactDOM from 'react-dom/client';
import Modal from 'react-modal';
import { Provider as ReduxProvider } from 'react-redux';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { Layout, Create, Tierbuilder } from './routes';
import store from './redux/store';
import './index.css';

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Create />} />
          <Route path="/builder" element={<Tierbuilder />}>
            <Route path=":encoded" element={<Tierbuilder />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </ReduxProvider>
);
