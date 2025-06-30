// src/Pages/UserProfile.tsx
import { useState, useEffect } from 'react';
import '../App.css';

function UserProfile() {
  const [username, setUsername] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleChangePassword = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/update-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, oldPassword, newPassword }),
      });
      const data = await res.json();
      setMessage(data.message || data.error);
      if (res.ok) setShowPopup(false);
    } catch (err) {
      setMessage('Server error. Try again.');
    }
  };

  return (
    <div className="main-container">
      <div className="heading-panel">
        <h2>User Profile</h2>
        <h1>Welcome, <b>{username}</b></h1>
      </div>

      <button onClick={() => setShowPopup(true)} className="change-pass-btn">
        Change Password
      </button>

      {showPopup && (
        <div className="popup-backdrop">
          <div className="popup-box">
            <h3>Change Password</h3>
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleChangePassword}>Update</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
            {message && <p>{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
