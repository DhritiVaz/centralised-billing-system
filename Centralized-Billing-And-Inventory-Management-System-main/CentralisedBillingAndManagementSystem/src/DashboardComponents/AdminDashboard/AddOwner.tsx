import { useNavigate } from 'react-router-dom';

function AddOwner() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/owner-login');
  };

  return (
    <button className="admin-dashboard-button" onClick={handleClick}>
      <div>Add Owner</div>
    </button>
  );
}

export default AddOwner;
