import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddAsset from "./components/AddAsset";
import ViewAsset from "./components/ViewAsset";
import AssetList from "./components/AssetList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-asset" element={<AddAsset />} />
        <Route path="/assets" element={<AssetList />} />  {/* Asset List */}
        <Route path="/assets/:id" element={<ViewAsset />} /> {/* View Asset Route */}

      </Routes>
    </Router>
  );
};

export default App;
