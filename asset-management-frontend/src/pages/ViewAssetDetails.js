import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AssetDetailView.css"; // Create and style this file as needed

const ViewAssetDetails = () => {
  const { id } = useParams(); // commonAssetId
  const navigate = useNavigate();
  const [commonAsset, setCommonAsset] = useState(null);
  const [uniqueAssets, setUniqueAssets] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  // Function to generate PDF based on date filter
  const generatePDF = () => {
    const filtered = uniqueAssets.filter((a) => {
      const assetDate = new Date(a.createdAt);
      return (!startDate || assetDate >= new Date(startDate)) &&
             (!endDate || assetDate <= new Date(endDate));
    });

    const doc = new jsPDF();
    doc.text(`Asset Report: ${commonAsset.itemName}`, 14, 15);

    autoTable(doc, {
      head: [["Assigned To", "Location", "Serial", "Asset", "Remarks", "Date"]],
      body: filtered.map((a) => [
        a.assignedTo,
        a.location || "-",
        a.serialNumber || "-",
        a.assetnumber || "-",
        a.remarks || "-",
        new Date(a.createdAt).toLocaleDateString()
      ])
    });

    doc.save("asset-report.pdf");
  };

  if (!commonAsset) return <p>Loading...</p>;

  return (
    <div className="asset-details-container">
      <h2>Asset: {commonAsset.itemName}</h2>
      <p><strong>Brand:</strong> {commonAsset.brand}</p>
      <p><strong>Model:</strong> {commonAsset.model}</p>
      <p><strong>Total Quantity:</strong> {commonAsset.numberOfItems}</p>

      {/* Date Range Filters and PDF Generation */}
      <div className="date-filter">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button className="pdf-button" onClick={generatePDF}>
           PDF
        </button>
      </div>

      <h3>Unique Devices:</h3>
      <table>
        <thead>
          <tr>
            <th>Assigned To</th>
            <th>Location</th>
            <th>Serial No</th>
            <th>Asset No.</th>
            <th>Remarks</th>
            <th>Added Date</th>
          </tr>
        </thead>
        <tbody>
          {uniqueAssets.map((a) => (
            <tr key={a._id}>
              <td>{a.assignedTo}</td>
              <td>{a.location || "-"}</td>
              <td>{a.serialNumber || "-"}</td>
              <td>{a.assetNumber || "-"}</td>
              <td>{a.remarks || "-"}</td>
              <td>{new Date(a.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
    </div>
  );
};

export default ViewAssetDetails;
