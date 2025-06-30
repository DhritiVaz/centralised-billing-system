import { useNavigate } from 'react-router-dom';

function AddAdmin() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/admin-login');
  };

  return (
    <button className="dashboard-button" onClick={handleClick}>
      <div> Administrator Login</div>
    </button>
  );
}

export default AddAdmin;
