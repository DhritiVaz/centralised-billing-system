import { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";

type Admin = {
  adminid: number;
  username: string;
  email: string;
};

function AllAdmins() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "", email: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/all-admins");
      setAdmins(res.data);
    } catch {
      setMessage("Failed to load admins.");
    }
  };

  const handleAddAdmin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/admin/add-admin", newAdmin);
      setMessage(res.data.message);
      setNewAdmin({ username: "", password: "", email: "" });
      fetchAdmins();
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Error adding admin.");
    }
  };

  return (
    <div className="main-container">
      <div className="heading-panel">
        <h2>Admin Control</h2>
        <h1>All Admin Users</h1>
      </div>

      <table className="client-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin.adminid}>
              <td>{admin.adminid}</td>
              <td>{admin.username}</td>
              <td>{admin.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "2rem" }}>
        <h3>Add New Admin</h3>
        <input
          type="text"
          placeholder="Username"
          value={newAdmin.username}
          onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={newAdmin.password}
          onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
        /><br />
        <input
          type="email"
          placeholder="Email"
          value={newAdmin.email}
          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
        /><br /><br />
        <button onClick={handleAddAdmin}>Add Admin</button>
        {message && <p style={{ color: "green" }}>{message}</p>}
      </div>
    </div>
  );
}

export default AllAdmins;
