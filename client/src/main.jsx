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
import ExitFeedback from './pages/ExitFeedback.jsx';
import Thanks from './pages/Thanks.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<Intro />} />
      <Route path='vote' element={<Vote />} />
      <Route path='exit' element={<ExitFeedback />} />
      <Route path='thanks' element={<Thanks />} />
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
