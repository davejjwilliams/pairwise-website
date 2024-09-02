import { useState, useEffect } from 'react';
import ReadDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Intro from './pages/Intro';
import Vote from './pages/Vote';

import './App.css';

function App() {
  return (
    <>
      <Vote />
    </>
  );
}

export default App;
