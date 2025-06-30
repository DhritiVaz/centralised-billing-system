import { useState } from 'react';

function ChangePasswordPopup() {
  const username = localStorage.getItem('loggedInUser') || '';
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/update-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, oldPassword, newPassword }),
      });
      const data = await res.json();
      setMessage(data.message || data.error);
      if (res.ok) {
        setTimeout(() => closePopup(), 1500);
      }
    } catch {
      setMessage('Something went wrong.');
    }
  };

  const closePopup = () => {
    document.getElementById('changePassModal')?.classList.remove('show');
    setOldPassword('');
    setNewPassword('');
    setMessage('');
  };

  return (
    <div>
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
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleChangePassword}>Update</button>
        <button onClick={closePopup}>Cancel</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ChangePasswordPopup;
