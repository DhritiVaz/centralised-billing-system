import { useState } from 'react';
import axios from 'axios';

function AddAdmin() {
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        password,
        role: 'admin',
      });
      setMessage(res.data.message);
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div>
      {/* Main Button */}
      <button className="dashboard-button" onClick={() => setShowForm(true)}>
        <img src="/icons/add-admin.png" alt="Add Admin" />
        <div>Add Admin</div>
      </button>

      {/* Popup form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Add New Admin</h2>
            <input
              type="text"
              placeholder="Admin Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            /><br /><br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br /><br />
            <button onClick={handleSignup}>Register Admin</button>
            <button onClick={() => setShowForm(false)} style={{ marginLeft: '10px' }}>Cancel</button>
            {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddAdmin;
