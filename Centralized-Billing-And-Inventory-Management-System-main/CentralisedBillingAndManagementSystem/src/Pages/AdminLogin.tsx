/*import '../Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'


function AdminLogin() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/admin-dashboard');
  };
  return (
    <div className="login-container">
      <h1 className="site-title">KanakkuCloud</h1>
      <Link to="/" className="home-button">
      <img src='./Icons/home.png' alt="Home" className="home-icon" />
       Home</Link>
      <h2 className="login-title">Admin Login</h2>

      <div className="login-box">
        <label>Username</label>
        <input type="text" placeholder="Enter username" />

        <label>Password</label>
        <input type="password" placeholder="Enter password" />

        <button className="submit-btn" onClick={handleClick}>Submit</button>
      </div>
    </div>
  );
}

export default AdminLogin;
*/

/*import '../Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleClick = async () => {
    setError('');

    try {
      const res = await axios.post('http://localhost:5001/api/auth/admin/login', {
        username,
        password
      });

      const token = res.data.token;

      if (token) {
        localStorage.setItem('adminToken', token);
        navigate('/admin-dashboard');
      } else {
        setError('Login failed: No token received');
      }
    } catch (err: any) {
      console.error('Login error:', err.response?.data || err.message);
      setError('Login failed. Check credentials or try again.');
    }
  };


}
  return (
    <div className="login-container">
      <h1 className="site-title">KanakkuCloud</h1>
      <Link to="/" className="home-button">
        <img src="./Icons/home.png" alt="Home" className="home-icon" />
        Home
      </Link>
      <h2 className="login-title">Admin Login</h2>

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

        <button className="submit-btn" onClick={handleClick}>Submit</button>
      </div>
    </div>
  );
}

export default AdminLogin;
*/

/*
import '../Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';


function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      console.log("Response:", response.data);

      // Assuming login is successful, redirect
      navigate('/admin-dashboard');
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
      setError('Login failed. Check credentials or try again.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="site-title">KanakkuCloud</h1>
      <Link to="/" className="home-button">
        <img src="./Icons/home.png" alt="Home" className="home-icon" />
        Home
      </Link>
      <h2 className="login-title">Admin Login</h2>

      <form className="login-box" onSubmit={handleSubmit}>
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

        <button className="submit-btn" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AdminLogin;

*/

import '../Login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleClick = async () => {
    localStorage.setItem('username', username);

  setError('');
  try {
    const response = await axios.post<{ message: string }>("http://localhost:5000/login",{
      username,
      password 
    });

    if (response.status === 200) {
      // Only navigate if login is successful
      navigate('/admin-dashboard');
    }
  } catch (err: any) {
    // Access error message safely from response
    setError(err.response?.data?.error || 'Login failed. Check credentials or try again.');
    console.error("Login failed:", err.response?.data || err.message);
  }
};


  return (
    <div className="login-container">
      <h1 className="site-title">Welcome to Centralised Billing and Management Software</h1>
      <h2 className="login-title">Admin Login</h2>

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

        <button className="submit-btn" type="button" onClick={handleClick}>
          Submit
        </button>
      </div>
    </div>
  );
}



export default AdminLogin;
