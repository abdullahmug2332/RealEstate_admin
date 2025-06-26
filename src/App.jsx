import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import PrivateRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Properties from "./pages/Properties";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/properties" element={<Properties />} />
      </Routes>
      <Sidebar />
    </>
  );
};

export default App;
