import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ViewTechnicians.css";

const ViewTechnicians = () => {
  const [technicians, setTechnicians] = useState([]);
  const navigate = useNavigate(); // ✅ fix

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/technicians");
        setTechnicians(res.data);
      } catch (err) {
        console.error("Error fetching technicians", err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this technician?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/technicians/delete/${id}`);
      setTechnicians(technicians.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="tech-view-container">
      <h2>Technician List</h2>
      <table>
        <thead>
          <tr>
            <th>EPF</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>NIC</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Specialization</th>
            <th>Address</th>
            <th>Experience</th>
            <th>Other</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((tech) => (
            <tr key={tech._id}>
              <td>{tech.epf}</td>
              <td>{tech.fullName}</td>
              <td>{tech.username}</td>
              <td>{tech.nic}</td>
              <td>{tech.email}</td>
              <td>{tech.phone}</td>
              <td>{tech.specialization}</td>
              <td>{tech.address}</td>
              <td>{tech.experience}</td>
              <td>{tech.other}</td>
              <td>
                <button onClick={() => navigate(`/edit-technician/${tech._id}`)}>Edit</button>
                <button onClick={() => handleDelete(tech._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTechnicians;
