// src/Pages/Navbar.tsx
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const username = localStorage.getItem('username') || '';
  const navigate = useNavigate();
  const location = useLocation();

  const isPublicPage = [
    '/',
    '/admin-login',
    '/franchise-login',
    '/owner-login',
    '/cashier-login'
  ].includes(location.pathname);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const openPasswordModal = () => {
    document.getElementById('changePassModal')?.classList.add('show');
    setShowDropdown(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">🧾 CBMS</div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/admin-login">Admin</Link>
        <Link to="/franchise-login">Franchise</Link>

        {/* Always render dropdown container for ref to work */}
        <div className="profile-dropdown" ref={dropdownRef}>
          {!isPublicPage && username && (
            <>
              <button className="profile-btn" onClick={toggleDropdown}>
                Profile
              </button>
              {showDropdown && (
                <div className="dropdown-menu" style={{ display: 'block' }}>
  <p><strong>Welcome, {username}</strong></p>
  <button onClick={openPasswordModal}>Change Password</button>
</div>

              )}
            </>
          )}
        </div>

        {!isPublicPage && username && (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
