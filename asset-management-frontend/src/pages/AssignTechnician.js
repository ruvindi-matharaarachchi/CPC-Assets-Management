import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./AssignTechnician.css";

const AssignTechnician = () => {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const [technicians, setTechnicians] = useState([]);
  const [selectedTechnicianId, setSelectedTechnicianId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/technicians")
      .then(res => setTechnicians(res.data))
      .catch(err => console.error("Error loading technicians", err));
  }, []);

  const handleAssign = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/asset-issues/${issueId}/assign-technician`, {
        technicianId: selectedTechnicianId
      });
      setMessage("Technician assigned successfully.");
      setTimeout(() => navigate("/view-all-asset-issues"), 1500);
    } catch (err) {
      setMessage("Failed to assign technician.");
    }
  };

  return (
    <div className="assign-tech-container">
      <h2>Assign Technician</h2>
      {message && <div className="message">{message}</div>}
      <div className="form-section">
        <label>Select Technician:</label>
        <select
          onChange={(e) => setSelectedTechnicianId(e.target.value)}
          value={selectedTechnicianId}
        >
          <option value="">-- Select --</option>
          {technicians.map((tech) => (
            <option key={tech._id} value={tech._id}>
              {tech.fullName} - {tech.specialization}
            </option>
          ))}
        </select>

        <button onClick={handleAssign} disabled={!selectedTechnicianId}>
          Assign Technician
        </button>
      </div>
    </div>
  );
};

export default AssignTechnician;
