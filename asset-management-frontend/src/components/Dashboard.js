import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Import CSS file
import logo from "../assets/logo.png";
import i1 from "../assets/notifications.png";
import i2 from "../assets/settings.png";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="dashboard-container">
            {/* Header Navigation Bar */}
            <header className="dashboard-header">
                <img src={logo} alt="Company Logo" className="logo" />
                
                <nav>
                    <ul>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="/assets">Asset Issues</a></li>
                        <li><a href="/technicians">Technicians</a></li>
                        <li><a href="/reports">Reports</a></li>
                    </ul>
                </nav>

                <div className="admin-icons">
                    {/* Fix for icons: Use correct path or FontAwesome */}
                    <img src={i1} alt="icon1" className="admin-icon" />
                    <img src={i2} alt="Settings" className="admin-icon" />
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </header>

            {/* Dashboard Content */}
            <main className="main-content">
                <h1>Welcome, Admin</h1>

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
