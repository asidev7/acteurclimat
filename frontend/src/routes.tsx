import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'contact',
        element: <ContactPage />
      },
    ],
    errorElement: <NotFoundPage />
  }
]);

export default router;
