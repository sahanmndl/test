import React from 'react';
import Home from './pages/Home/Home';
import User from './pages/User/User';
import Payment from './pages/Payment/Payment';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/user/:id" element={<User />} />
        <Route exact path="/payment/:id" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
