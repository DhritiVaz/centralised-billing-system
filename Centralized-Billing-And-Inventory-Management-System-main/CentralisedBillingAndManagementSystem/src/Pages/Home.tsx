import AdminButton from '../DashboardComponents/AdminButton';
import FranchiseButton from '../DashboardComponents/FranchiseButton';

function Home() {
  return (
    <div className="dashboard" style={{ padding: '2rem' }}>
      <div className="heading-panel" style={{ marginBottom: '2rem' }}>
        <h2>Welcome to</h2>
        <h1>Centralised Billing and Management Software</h1>
      </div>

      <div className="button-grid" style={{ marginBottom: '2rem' }}>
        <AdminButton />
        <FranchiseButton />
      </div>
    </div>
  );
}

export default Home;
