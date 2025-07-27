import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary.tsx';
import { MainPage } from './pages/MainPage.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './pages/Layout.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';
import { Details } from './components/details/Details.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');
createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<MainPage />}>
              <Route path="details/:id" element={<Details />} />
            </Route>
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
