import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddAsset from "./components/AddAsset";
import AssetList from "./components/AssetList";
import ViewAsset from "./components/ViewAsset";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-asset" element={<AddAsset />} />
        <Route path="/assets" element={<AssetList />} />  {/* Asset List Page */}
        <Route path="/assets/:id" element={<ViewAsset />} /> {/* View Asset Page */}
      </Routes>
    </Router>
  );
};

export default App;
