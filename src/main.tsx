import ReactDOM from 'react-dom/client';
import Modal from 'react-modal'
import { Provider as ReduxProvider } from 'react-redux';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Create, Import, Tierbuilder } from './routes';
import store from './redux/store';
import './index.css'

Modal.setAppElement('#root')

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/builder" />,
  },
  {
    path: "/builder",
    element: <Tierbuilder />,
    children: [
      {
        path: ":encoded",
        element: <Tierbuilder />,
      },
    ],
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/import",
    element: <Import />,
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ReduxProvider store={store}>
    <RouterProvider router={router} />
  </ReduxProvider>
)
