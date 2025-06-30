import { useNavigate } from 'react-router-dom';
import HeadingPanel from './HeadingPanel';

function AdminControls() {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <HeadingPanel subheading="Admin Panel" heading="Admin Controls" />

      <div className="admin-button-grid" style={{ marginTop: '3rem' }}>
        <div className="admin-dashboard-button" onClick={() => navigate('/add-admin')}>
          <div>Add New Admin</div>
        </div>
        <div className="admin-dashboard-button" onClick={() => navigate('/view-admins')}>
          <div>View All Admins</div>
        </div>
      </div>
    </div>
  );
}

export default AdminControls;
