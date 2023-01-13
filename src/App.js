import "./scss/app.scss";
import React, { useState } from "react";
import NotFound from "./pages/notFound";
import Header from "./components/header";
import { render } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/cart";

import Home from "./pages/home";
function App() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="App">
      <div className="wrapper">
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
