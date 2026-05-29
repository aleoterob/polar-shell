import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import i18n from '@/shared/i18n';
import { routeTree } from './routeTree.gen';
import './index.css';

document.documentElement.classList.add('dark');

const router = createRouter({
  routeTree,
  Wrap: ({ children }) => (
    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
  ),
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);
