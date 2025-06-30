// src/Pages/Home.tsx
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Optional: for styling

function Home() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <div className="heading-panel">
        <h2>Welcome to Centralised Billing and Management Software</h2>
        <h1>Admin Dashboard</h1>
      </div>

      <div className="admin-button-grid">
        <div className="admin-dashboard-button" onClick={() => navigate('/admin-controls')}>
  <div>Add Admin</div>
</div>


        <div className="admin-dashboard-button" onClick={() => navigate('/add-owner')}>
          <div>Add Owner</div>
        </div>

        <div className="admin-dashboard-button" onClick={() => navigate('/all-clients')}>
          <div>All Clients</div>
        </div>

        <div className="admin-dashboard-button" onClick={() => navigate('/inventory')}>
          <div>Inventory</div>
        </div>
      </div>
    </div>
    
  );
}

export default Home;
