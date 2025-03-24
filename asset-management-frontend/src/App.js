import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddAsset from "./components/AddAsset";
import AssetList from "./components/AssetList";
import ViewAsset from "./components/ViewAsset";
import AddCommonAsset from "./pages/AddCommonAsset";
import AddAssetForm from "./components/AddAssetForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-asset" element={<AddAsset />} />
        <Route path="/assets" element={<AssetList />} />  {/* Asset List Page */}
        <Route path="/assets/:id" element={<ViewAsset />} /> {/* View Asset Page */}
        <Route path="/add-common-asset" element={<AddCommonAsset />} />
        <Route path="/add-asset-form" element={<AddAssetForm />} /> {/* ✅ New Route */}

      </Routes>
    </Router>
  );
};

export default App;
