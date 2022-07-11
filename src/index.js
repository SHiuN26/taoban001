import React from "react";
import ReactDOM from "react-dom";
import MainRouter from "./routers";

import { AuthProvider } from "../src/context/AuthProvider ";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<MainRouter />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
