import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App';

import ErrorPage from './pages/ErrorPage';
import Login from "./pages/Login"
import ShiftPage from './pages/ShiftPage';
import WeatherPage from './pages/WeatherPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />
      }, 
      {
        path: '/shift',
        element: <ShiftPage />
      }, 
      {
        path: '/weather',
        element: <WeatherPage />
      }, 
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
