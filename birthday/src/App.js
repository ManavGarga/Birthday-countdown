import React from 'react';
import './App.css';
import Birthday from './Birthday';
import RouterBirthday from './RouterBirthday';
import Generate from './Generate';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Birthday />} />

          {/* Dynamic Route with optional params */}
          <Route path="/birthday/:name?/:day?/:month?" element={<RouterBirthday />} />

          {/* Generate Page */}
          <Route path="/generate" element={<Generate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
