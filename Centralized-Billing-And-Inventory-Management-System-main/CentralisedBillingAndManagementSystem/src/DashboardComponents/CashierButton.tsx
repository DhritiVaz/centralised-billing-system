import { useNavigate } from 'react-router-dom';

function CashierButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/cashier-login');
  };

  return (
    <button className="dashboard-button" onClick={handleClick}>
      <div>Cashier</div>
    </button>
  );
}

export default CashierButton;