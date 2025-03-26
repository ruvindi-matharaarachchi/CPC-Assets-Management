import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddCommonAsset from "./pages/AddCommonAsset";
import ViewCommonAssets from "./pages/ViewCommonAssets";
import AssetSummary from "./pages/AssetSummary";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-common-asset" element={<AddCommonAsset />} />
        <Route path="/view-common-assets" element={<ViewCommonAssets />} />
        <Route path="/asset-summary" element={<AssetSummary />} />

      </Routes>
    </Router>
  );
};

export default App;
