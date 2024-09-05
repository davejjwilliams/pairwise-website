import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

import Intro from './pages/Intro.jsx';
import Vote from './pages/Vote.jsx';
import Layout from './pages/Layout.jsx';
import AppState from './context/AppState.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<Intro />} />
      <Route path='vote' element={<Vote />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppState>
      <RouterProvider router={router} />
    </AppState>
  </StrictMode>
);
