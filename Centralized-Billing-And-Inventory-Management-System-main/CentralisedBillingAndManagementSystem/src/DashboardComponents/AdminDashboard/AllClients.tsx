import { useNavigate } from 'react-router-dom';

function AllClients() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/all-clients');
  };

  return (
    <button className="admin-dashboard-button" onClick={handleClick}>
      <div>All Clients</div>
    </button>
  );
}

export default AllClients;


/*import { Link } from 'react-router-dom';

<Link to="/all-clients">
  <div className="your-box-class">
    <img src="./Icons/yourIcon.png" alt="Clients" />
    <p>All Clients</p>
  </div>
</Link>
*/