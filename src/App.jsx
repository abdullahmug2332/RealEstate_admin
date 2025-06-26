import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import PrivateRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Home />} />
      </Routes>
      <Sidebar />
    </>
  );
};

export default App;
