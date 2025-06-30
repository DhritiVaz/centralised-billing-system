// src/Pages/OwnerLogin.tsx
import '../Login.css';
import { Link } from 'react-router-dom';

// ==============================
// 👤 OwnerLogin Component
// ==============================
function OwnerLogin() {
  return (
    <div className="login-container">
      {/* Header */}
      <h1 className="site-title">
        Welcome to Centralised Billing and Management Software
      </h1>

      {/* Home Link */}
      <Link to="/" className="home-button">
        <img src="./Icons/home.png" alt="Home" className="home-icon" />
        Home
      </Link>

      {/* Title */}
      <h2 className="login-title">Owner Login</h2>

      {/* Login Form */}
      <div className="login-box">
        <label>Username</label>
        <input type="text" placeholder="Enter username" />

        <label>Password</label>
        <input type="password" placeholder="Enter password" />

        <button className="submit-btn">Submit</button>
      </div>
    </div>
  );
}

export default OwnerLogin;
