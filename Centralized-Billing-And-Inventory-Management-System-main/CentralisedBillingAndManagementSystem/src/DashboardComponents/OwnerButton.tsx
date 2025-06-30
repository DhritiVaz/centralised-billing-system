import { useNavigate } from 'react-router-dom';

function OwnerButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/owner-login');
  };

  return (
    <button className="dashboard-button" onClick={handleClick}>
     <div>Owner</div>
    </button>
  );
}

export default OwnerButton;
