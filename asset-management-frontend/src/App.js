import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddCommonAsset from "./pages/AddCommonAsset";
import ViewCommonAssets from "./pages/ViewCommonAssets";
import AssetSummary from "./pages/AssetSummary";
import AddAssetDetailsForm from "./pages/AddAssetDetailsForm";
import AddSingleAssetDetail from "./pages/AddSingleAssetDetail"; 
import ViewAssetDetails from "./pages/ViewAssetDetails"; 
import IssueAssetForm from "./pages/IssueAssetForm"; // adjust path as needed

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-common-asset" element={<AddCommonAsset />} />
        <Route path="/view-common-assets" element={<ViewCommonAssets />} />
        <Route path="/asset-summary" element={<AssetSummary />} />
        <Route path="/add-asset-details/:commonAssetId/:quantity" element={<AddAssetDetailsForm />} />
        <Route path="/add-one-asset/:commonAssetId" element={<AddSingleAssetDetail />} />
        <Route path="/view-asset/:id" element={<ViewAssetDetails />} />
        <Route path="/issue-asset" element={<IssueAssetForm />} />

      </Routes>
    </Router>
  );
};

export default App;
