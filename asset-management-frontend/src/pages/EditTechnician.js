import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditTechnician.css"; // Reuse the same styling

const EditTechnician = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchTech = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/technicians/${id}`);
                setForm(res.data);
            } catch (err) {
                console.error("Error fetching technician", err);
            }
        };
        fetchTech();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/technicians/update/${id}`, form);
            setMessage("✅ Technician updated successfully.");
            setTimeout(() => navigate("/view-technicians"), 1500);
        } catch (err) {
            console.error("Update failed", err);
            setMessage("❌ Update failed.");
        }
    };

    if (!form) return <p>Loading technician data...</p>;

    return (
        <div className="technician-container">
            <h2>
                <span style={{ color: "#7c1426", fontWeight: "bold" }}>{form?.fullName || "Technician"} !</span><br />
                
            </h2>

            {message && <div className="form-message">{message}</div>}

            <form className="technician-form" onSubmit={handleUpdate}>
                <div>
                    <label>EPF</label>
                    <input type="text" name="epf" placeholder="EPF" value={form.epf} onChange={handleChange} disabled />
                </div>

                <div>
                    <label>Full Name</label>
                    <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} disabled />
                </div>

                <div>
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} disabled />
                </div>

                <div>
                    <label>NIC</label>
                    <input type="text" name="nic" placeholder="NIC" value={form.nic} onChange={handleChange} disabled />
                </div>

                <div>
                    <label>Email</label>
                    <input type="text" name="email" placeholder="Email" value={form.email} onChange={handleChange} disabled />
                </div>

                <div>
                    <label>Phone Number</label>
                    <input type="text" name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} />
                </div>

                <div>
                    <label>specialization</label><br></br>
                    <select name="specialization" value={form.specialization} onChange={handleChange}>
                        <option value="">Select Specialization</option>
                        <option value="Printer">Printer</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Monitor">Monitor</option>
                    </select>
                </div>

                <div>
                    <label>Address</label>
                    <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} />
                </div>
                <div>
                    <label>Experience</label><br></br>
                    <select name="experience" value={form.experience} onChange={handleChange}>
                        <option value="">Experience (Years)</option>
                        <option value="1 Year">1 Year</option>
                        <option value="2 Years">2 Years</option>
                        <option value="3+ Years">3+ Years</option>
                    </select>
                </div>

                <div>
                    <label>Other Information</label><br></br>
                    <textarea name="other" placeholder="Additional Information" value={form.other} onChange={handleChange}></textarea>

                </div>

                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditTechnician;
