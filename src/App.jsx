import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import DefaultLayout from "./components/DefaultLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/app/*" element={<DefaultLayout />} />
    </Routes>
  );
}

export default App;
