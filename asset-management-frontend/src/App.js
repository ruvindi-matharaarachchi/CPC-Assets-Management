import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ViewAsset from "./components/ViewAsset";
import AddCommonAsset from "./pages/AddCommonAsset";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assets/:id" element={<ViewAsset />} /> {/* View Asset Page */}
        <Route path="/add-common-asset" element={<AddCommonAsset />} />

      </Routes>
    </Router>
  );
};

export default App;
