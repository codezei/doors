import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './sections/Header';
import Home from './pages/Home';
import DoorPage from './pages/DoorPage';
import 'bootstrap/dist/css/bootstrap.css';
import Cart from './pages/Cart';

function App() {

  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path=":id" element={<DoorPage />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </div>
  );
}

export default App;
