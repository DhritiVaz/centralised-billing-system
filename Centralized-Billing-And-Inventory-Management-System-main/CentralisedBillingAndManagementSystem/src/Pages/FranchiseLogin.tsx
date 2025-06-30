import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Login.css';

function FranchiseLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      const response = await axios.post("http://localhost:5001/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const role = response.data.role;
        if (role === "franchise") {
          navigate("/franchise-dashboard");
        } else {
          setError("Not a franchise account");
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Check credentials or try again.');
      console.error('Login failed:', err.response?.data || err.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="site-title">Welcome to Centralised Billing and Management Software</h1>
      <h2 className="login-title">Franchise Login</h2>

      <div className="login-box">
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="error-msg">{error}</div>}

        <button className="submit-btn" type="button" onClick={handleLogin}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default FranchiseLogin;
