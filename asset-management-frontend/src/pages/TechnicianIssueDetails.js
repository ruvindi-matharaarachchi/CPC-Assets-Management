import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TechnicianDashboard.css";
import { FaBell, FaCog } from "react-icons/fa";
import logo from "../assets/logo.png";

const TechnicianIssueDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [issue, setIssue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("");
    const [technicianNotes, setTechnicianNotes] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/technician-issue-details/${id}`)
            .then(res => {
                setIssue(res.data);
                setStatus(res.data.status || "Open");
                setTechnicianNotes(res.data.technicianNotes || "");
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch issue details:", err);
                setLoading(false);
            });
    }, [id]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    const handleBack = () => {
        navigate("/technician-dashboard");
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/update-issue-status/${id}`, {
            status,
            technicianNotes
        })
            .then(res => {
                alert("Issue updated successfully!");
            })
            .catch(err => {
                console.error("Failed to update issue:", err);
                alert("Update failed.");
            });
    };

    if (loading) return <p>Loading issue details...</p>;
    if (!issue) return <p>Issue not found.</p>;

    return (
        <div className="dashboard-containerr">
            {/* Header */}
            <header className="dashboard-header">
                <img src={logo} alt="Company Logo" className="logo" />
                <nav>
                    <ul>
                        <li><a href="/technician-dashboard">Dashboard</a></li>
                    </ul>
                </nav>
                <div className="admin-icons">
                    <FaBell className="admin-icon" />
                    <FaCog className="admin-icon" />
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </header>

            <h2>Issue Details Form</h2>
            <button className="back-button1" onClick={() => navigate(-1)}>
                Back
            </button>
            <form className="issue-details-form" onSubmit={handleUpdate}>
                <div>
                    <label>Item Name</label>
                    <input type="text" value={issue.assetId?.itemName || ''} readOnly />
                </div>
                <div>
                    <label>Model</label>
                    <input type="text" value={issue.assetId?.model || ''} readOnly />
                </div>
                <div>
                    <label>Brand</label>
                    <input type="text" value={issue.assetId?.brand || ''} readOnly />
                </div>
                <div>
                    <label>Serial Number</label>
                    <input type="text" value={issue.assetId?.serialNumber || ''} readOnly />
                </div>

                <div>
                    <label>Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>
                <div>
                    <label>Reported Date</label>
                    <input type="text" value={new Date(issue.createdAt).toLocaleDateString()} readOnly />
                </div>
                <div>
                    <label>Description</label>
                    <textarea value={issue.issueDescription || ''} readOnly></textarea>
                </div>
                <div>
                    <label>Technician Notes</label>
                    <textarea
                        value={technicianNotes}
                        onChange={(e) => setTechnicianNotes(e.target.value)}
                        placeholder="Add your notes here..."
                    ></textarea>
                </div>


                <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "space-between" }}>
                    <button type="submit">Update Issue</button>
                </div>
            </form>
        </div>
    );
};

export default TechnicianIssueDetails;
