import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AssetDetailView.css";
import logo from "../assets/logo.png";

const ViewAssetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [commonAsset, setCommonAsset] = useState(null);
  const [uniqueAssets, setUniqueAssets] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Modal and form states
  const [assigningAssetId, setAssigningAssetId] = useState(null);
  const [userForm, setUserForm] = useState({ username: "", empId: "" });
  const [assignMessage, setAssignMessage] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [commonRes, detailRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/common-assets/${id}`),
          axios.get(`http://localhost:5000/api/asset-details/by-common/${id}`)
        ]);

        setCommonAsset(commonRes.data);
        setUniqueAssets(detailRes.data);
      } catch (err) {
        console.error("Failed to fetch asset details", err);
      }
    };

    fetchDetails();
  }, [id]);

  const generatePDF = () => {
    const filtered = uniqueAssets.filter((a) => {
      const assetDate = new Date(a.createdAt);
      return (
        (!startDate || assetDate >= new Date(startDate)) &&
        (!endDate || assetDate <= new Date(endDate))
      );
    });

    const doc = new jsPDF();
    doc.addImage(logo, 'PNG', 10, 10, 20, 20);
    doc.setFontSize(16);
    doc.text("CPC Head Office", 50, 20);
    doc.setFontSize(12);
    doc.text(`Asset Report: ${commonAsset.itemName}`, 14, 40);

    autoTable(doc, {
      head: [["Location", "Serial", "Asset", "Remarks", "Date"]],
      body: filtered.map((a) => [
        a.location || "-",
        a.serialNumber || "-",
        a.assetNumber || "-",
        a.remarks || "-",
        new Date(a.createdAt).toLocaleDateString()
      ]),
      margin: { top: 50 },
    });

    doc.save("asset-report.pdf");
  };

  const handleAssignClick = (assetId) => {
    setAssigningAssetId(assetId);
    setUserForm({ username: "", empId: "" });
    setAssignMessage("");
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/asset-details/assign-user/${assigningAssetId}`, userForm);
      setAssignMessage("✅ User assigned successfully.");
      setTimeout(() => {
        setAssigningAssetId(null);
        setAssignMessage("");
        window.location.reload(); // optional: reload to reflect updates
      }, 1500);
    } catch (err) {
      console.error("Error assigning user", err);
      setAssignMessage("❌ Failed to assign user.");
    }
  };

  return (
    <div className="asset-details-container">
      <h2>Asset: {commonAsset?.itemName}</h2>
      <p><strong>Brand:</strong> {commonAsset?.brand}</p>
      <p><strong>Model:</strong> {commonAsset?.model}</p>
      <p><strong>Total Quantity:</strong> {commonAsset?.numberOfItems}</p>

      <div className="date-filter">
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button className="pdf-button" onClick={generatePDF}>PDF</button>
      </div>

      <h3>Unique Devices:</h3>
      <table>
        <thead>
          <tr>
            <th>Location</th>
            <th>Serial No</th>
            <th>Asset No.</th>
            <th>Remarks</th>
            <th>Added Date</th>
            <th>Assign User</th>
          </tr>
        </thead>
        <tbody>
          {uniqueAssets.map((a) => (
            <tr key={a._id}>
              <td>{a.location || "-"}</td>
              <td>{a.serialNumber || "-"}</td>
              <td>{a.assetNumber || "-"}</td>
              <td>{a.remarks || "-"}</td>
              <td>{new Date(a.createdAt).toLocaleDateString()}</td>
              <td><button onClick={() => handleAssignClick(a._id)}>Assign</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Modal Form */}
      {assigningAssetId && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Assign User</h4>
            <form onSubmit={handleAssignSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={userForm.username}
                onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Employee ID"
                value={userForm.empId}
                onChange={(e) => setUserForm({ ...userForm, empId: e.target.value })}
                required
              />
              <button type="submit">Assign</button>
              <button type="button" onClick={() => setAssigningAssetId(null)}>Cancel</button>
            </form>
            {assignMessage && <p className="assign-message">{assignMessage}</p>}
          </div>
        </div>
      )}

      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default ViewAssetDetails;
