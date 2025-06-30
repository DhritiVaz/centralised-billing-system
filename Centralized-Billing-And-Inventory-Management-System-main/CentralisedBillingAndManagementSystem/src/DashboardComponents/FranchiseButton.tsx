import { useNavigate } from 'react-router-dom';

function FranchiseButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/franchise-login');
  };

  return (
    <button className="dashboard-button" onClick={handleClick}>
      <div>Franchise Login</div>
    </button>
  );
}

export default FranchiseButton;