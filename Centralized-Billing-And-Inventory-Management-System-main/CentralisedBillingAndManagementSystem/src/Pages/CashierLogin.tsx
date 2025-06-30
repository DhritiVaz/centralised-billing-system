import '../Login.css'
import { Link } from 'react-router-dom';

function CashierLogin() {
  return (
    <div className="login-container">
      <h1 className="site-title">Welcome to Centralised Billing and Management Software</h1>
      <Link to="/" className="home-button">
      <img src='./Icons/home.png' alt="Home" className="home-icon" />
       Home</Link>
      <h2 className="login-title">Cashier Login</h2>

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

export default CashierLogin;