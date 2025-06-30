import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Pages/Navbar';
import AdminLogin from './Pages/AdminLogin';
import OwnerLogin from './Pages/OwnerLogin';
import Home from './Pages/Home';
import CashierLogin from './Pages/CashierLogin';
import FranchiseLogin from './Pages/FranchiseLogin';
import AdminDashboard from './Pages/AdminDashboard';
import AllClients from './Pages/AllClients';
import HeadingPanel from './Pages/HeadingPanel';
import UserProfile from './Pages/UserProfile';
import ChangePasswordPopup from './Pages/ChangePasswordPopup';
import AddAdmin from './DashboardComponents/AdminDashboard/AddAdmin';
import AdminControls from './Pages/AdminControls';
import ViewAdmins from './Pages/ViewAdmins';


function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Add this line to use your Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/owner-login" element={<OwnerLogin />} />
        <Route path="/cashier-login" element={<CashierLogin />} />
        <Route path="/franchise-login" element={<FranchiseLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/all-clients" element={<AllClients />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/add-admin" element={<AddAdmin />} />
        <Route path="/admin-controls" element={<AdminControls />} />
        <Route path="/view-admins" element={<ViewAdmins />} />
      </Routes>
        <div
  id="changePassModal"
  className="modal-overlay"
  onClick={(e) => {
    const target = e.target as HTMLElement;
    if (target.id === 'changePassModal') {
      target.classList.remove('show');
    }
  }}
>
  <div className="modal-box">
    <h3>Change Password</h3>
    <ChangePasswordPopup />
  </div>
</div>

    </Router>
  );
}
<HeadingPanel subheading="Welcome" heading="Centralised Billing and Management Software" />




export default App;
