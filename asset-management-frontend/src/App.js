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
import AddTechnician from "./pages/AddTechnician";
import ViewTechnicians from "./pages/ViewTechnicians";
import EditTechnician from "./pages/EditTechnician";
import NAddAssetDetails from "./pages/NAddAssetDetails";
import NViewUsedAssets from "./pages/NViewUsedAssets";
import NSearchUsedAsset from "./pages/NSearchUsedAsset";
import NAddAssetIssue from "./pages/NAddAssetIssue";
import NAllAssetIssues from "./pages/NAllAssetIssues";
import AssignTechnician from "./pages/AssignTechnician";
import TechnicianDashboard from "./pages/TechnicianDashboard";
import ChangePassword from "./pages/ChangePassword";
import TechnicianIssueDetails from "./pages/TechnicianIssueDetails";

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
        <Route path="/technicians" element={<AddTechnician />} />
        <Route path="/view-technicians" element={<ViewTechnicians />} />
        <Route path="/edit-technician/:id" element={<EditTechnician />} />
        <Route path="/naasset-details" element={<NAddAssetDetails />} />
        <Route path="/naassetview-details" element={<NViewUsedAssets />} />
        <Route path="/search-used-asset" element={<NSearchUsedAsset />} />
        <Route path="/add-asset-issue/:assetId" element={<NAddAssetIssue />} />
        <Route path="/view-all-asset-issues" element={<NAllAssetIssues />} />
        <Route path="/assign-technician/:issueId" element={<AssignTechnician />} />
        <Route path="/technician-dashboard" element={<TechnicianDashboard />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/technician-issue-details/:id" element={<TechnicianIssueDetails />} />

      </Routes>
    </Router>
  );
};

export default App;
