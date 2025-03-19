import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaCog } from "react-icons/fa"; // Import FontAwesome icons
import "./Dashboard.css";
import logo from "../assets/logo.png";

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
            {/* Header Navigation Bar */}
            <header className="dashboard-header">
                <img src={logo} alt="Company Logo" className="logo" />
                
                <nav>
                    <ul>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="/assets">Asset List</a></li>
                        <li><a href="/technicians">Technicians</a></li>
                        <li><a href="/reports">Reports</a></li>
                    </ul>
                </nav>

                <div className="admin-icons">
                    <FaBell className="admin-icon" />  {/* Notification Icon */}
                    <FaCog className="admin-icon" />   {/* Settings Icon */}
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <h1>Welcome, Admin</h1>

                {/* Add Asset Button */}
                <button className="add-asset-button" onClick={handleAddAsset}>
                    ➕ Add New Asset
                </button>

                <section className="dashboard-content">
                    <div className="dashboard-card">
                        <h3>Total Assets</h3>
                        <p>120</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>Pending Issues</h3>
                        <p>15</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>Technicians Available</h3>
                        <p>8</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>Reports Generated</h3>
                        <p>25</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
