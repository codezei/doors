import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './sections/Header';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Door from './pages/Door';

function App() {

  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/catalog" element={<Catalog />}>
          <Route path=":collection" element={<Catalog />}></Route>
        </Route>
        <Route path=":door" element={<Door />}></Route>
      </Routes>
    </div>
  );
}

export default App;
