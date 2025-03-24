import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaCog, FaPlusCircle } from "react-icons/fa"; // Import Icons
import { motion } from "framer-motion"; // Animation Library
import "./Dashboard.css"; // Import Styles
import logo from "../assets/logo.png"; // Ensure the logo exists
import Footer from "../components/Footer"; // Import Footer

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // Navigate to Add Asset Page
    const handleAddAsset = () => {
        navigate("/add-asset");
    };

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
                        <li><a href="/add-common-asset">Asset List</a></li>
                        <li><a href="/add-asset-form">Asset ListNew</a></li>
                        <li><a href="/technicians">Technicians</a></li>
                        <li><a href="/reports">Reports</a></li>
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
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="add-asset-button"
                    onClick={handleAddAsset}
                >
                    <FaPlusCircle className="icon" /> Add New Asset
                </motion.button>

                {/* Dashboard Cards */}
                <section className="dashboard-content">
                    {[
                        { title: "Total Assets", count: 120 },
                        { title: "Pending Issues", count: 15 },
                        { title: "Technicians Available", count: 8 },
                        { title: "Reports Generated", count: 25 }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="dashboard-card"
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3>{item.title}</h3>
                            <p>{item.count}</p>
                        </motion.div>
                    ))}
                </section>
            </main>
            <Footer />

        </div>

    );
};

export default Dashboard;
