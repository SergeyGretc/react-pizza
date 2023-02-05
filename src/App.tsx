import "./scss/app.scss";
import React from "react";
import NotFound from "./pages/notFound";

import { Routes, Route } from "react-router-dom";
import Cart from "./pages/cart";
import FullPizza from "./pages/fullPizza";
import Home from "./pages/home";
import MainLayout from "./layouts/mainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
