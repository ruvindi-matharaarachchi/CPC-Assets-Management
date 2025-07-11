import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaCog } from "react-icons/fa"; 
import { motion } from "framer-motion"; 
import axios from "axios"; 
import "./Dashboard.css"; // Import Styles
import logo from "../assets/logo.png"; // Ensure the logo exists
import Footer from "../components/Footer"; // Import Footer

const Dashboard = () => {
    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState({
        totalAssets: 0,
        pendingIssues: 0,
        techniciansAvailable: 0,
        reportsGenerated: 0,
    });
    const handleViewAssetSummary = () => {
        navigate("/asset-summary");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleAddNewAsset = () => {
        navigate("/add-common-asset");
    };
    const handleAddAsset = () => {
        navigate("/naasset-details");
    };
    const handleViewAsset = () => {
        navigate("/naassetview-details");
    };
    const handleSearch = () => {
        navigate("/search-used-asset");
    };
    useEffect(() => {
        // Function to fetch the dashboard data from the API
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/common-assets");
                setDashboardData(response.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData(); // Call the function on component mount
    }, []);

    return (
        <div className="dashboard-container">
            {/* Background Overlay */}
            <div className="background-overlay"></div>

            {/* Header Navigation Bar */}
            <motion.header
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="dashboard-header"
            >
                <img src={logo} alt="Company Logo" className="logo" />

                <nav>
                    <ul>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="/view-common-assets">View Assets List</a></li>
                        <li><a href="/technicians">Technicians</a></li>
                        <li><a href="/view-technicians">View Technicians</a></li>
                        <li><a href="/asset-summary">Reports</a></li>
                        <li><a href="/issue-asset">Issues</a></li>

                    </ul>
                </nav>

                <div className="admin-icons">
                    <FaBell className="admin-icon" />
                    <FaCog className="admin-icon" />
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </motion.header>

            {/* Main Content */}
            <main className="main-content">
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    Welcome, Admin
                </motion.h1>

                {/* Add Asset Button */}
                {/* Add Asset Buttons in One Line */}
                <div className="add-asset-button-group">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="add-asset-button"
                        onClick={handleAddNewAsset}
                    >
                        Add New Asset
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="add-asset-button secondary-button"
                        onClick={handleAddAsset}
                    >
                        Add Used Asset
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="add-asset-button secondary-button"
                        onClick={handleViewAsset}
                    >
                        View Used Asset
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="add-asset-button secondary-button"
                        onClick={handleSearch}
                    >
                        Issues 
                    </motion.button>
                </div>


                {/* Dashboard Cards */}
                <section className="dashboard-content">
                    <motion.div
                        className="dashboard-card"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3>Total Assets</h3>
                        <p>{dashboardData.totalAssets}</p>
                    </motion.div>

                    <motion.div
                        className="dashboard-card"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3>Pending Issues</h3>
                        <p>{dashboardData.pendingIssues}</p>
                    </motion.div>

                    <motion.div
                        className="dashboard-card"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3>Technicians Available</h3>
                        <p>{dashboardData.techniciansAvailable}</p>
                    </motion.div>

                    <motion.div
                        className="dashboard-card"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3>Reports Generated</h3>
                        <p>{dashboardData.reportsGenerated}</p>
                    </motion.div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;
