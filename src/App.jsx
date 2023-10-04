import React from "react";
import "./index.css";

import { Routes, Route } from "react-router-dom";
import { Login, Main } from "./components";

export default () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<Main />} />
      </Routes>
    </div>
  );
};
