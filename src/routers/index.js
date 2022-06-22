import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

const MainRouter = () => {
  return (
    <BrowserRouter basename="/TaoBan">
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
export default MainRouter;
