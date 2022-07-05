import React from "react";
import ReactDOM from "react-dom";
import MainRouter from "./routers";
// import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "../src/context/AuthProvider ";

ReactDOM.render(
  <AuthProvider>
    <MainRouter />
  </AuthProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
