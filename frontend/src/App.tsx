import React from 'react';
import { Product } from './features/product/Product';
import { SingleProduct } from './features/product/SingleProduct';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/:id" element={<SingleProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
