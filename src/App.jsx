import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import PrivateRoute from "./components/ProtectedRoute";
import RouteCheck from "./components/RouteCheck";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Properties from "./pages/Properties";
import AddProperty from "./pages/AddProperty";
import SoldProperties from "./pages/SoldProperties";
import Property from "./components/Property";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/addproperty" element={<AddProperty />} />
          <Route path="/soldproperties" element={<SoldProperties />} />
          <Route path="/property/:id" element={<Property />} />

        </Route>
        <Route path="*" element={<RouteCheck />} />
      </Routes>
      <Sidebar />
    </>
  );
};

export default App;
