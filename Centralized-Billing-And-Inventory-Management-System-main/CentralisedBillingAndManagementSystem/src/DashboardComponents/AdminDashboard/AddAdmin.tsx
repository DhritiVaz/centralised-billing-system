import { useNavigate } from 'react-router-dom';

function AddAdmin() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/admin-login');
  };

  return (
    <button className="admin-dashboard-button" onClick={handleClick}>
      <div>Add Admin</div>
    </button>
  );
}

export default AddAdmin;
