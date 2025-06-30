// src/Pages/AllClients.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import './AllClients.css';
import HeadingPanel from '../Pages/HeadingPanel'; // ✅ Correct import (JSX, not CSS)

type Franchise = {
  franchiseid: number;
  franchisename: string;
  ownername: string;
  contactnumber: string;
  emailaddress: string;
  address: string;
  geolocation: string | null;
  createdat: string;
};

function AllClients() {
  const [clients, setClients] = useState<Franchise[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/allclients');
        setClients(res.data);
      } catch (err) {
        console.error('Failed to fetch clients:', err);
      }
    };

    fetchClients();
  }, []);

  const handleDelete = async (id: number) => {
  if (!window.confirm('Are you sure you want to delete this user?')) return;

  try {
    await axios.delete(`http://localhost:5000/api/auth/user/${id}`);
    setClients(prev => prev.filter(client => client.franchiseid !== id));
    alert('User deleted successfully');
  } catch (err) {
    console.error('Failed to delete user:', err);
    alert('Error deleting user');
  }
};


  return (
    <div className="main-container">
      <HeadingPanel subheading="Admin Panel" heading="All Franchise Clients" />

      <div className="client-table-wrapper">
        <table className="client-table client-table-striped client-table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Owner</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Address</th>
              <th>Geolocation</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
  {clients.map((client) => (
    <tr key={client.franchiseid}>
      <td>{client.franchiseid}</td>
      <td>{client.franchisename}</td>
      <td>{client.ownername}</td>
      <td>{client.contactnumber}</td>
      <td>{client.emailaddress}</td>
      <td>{client.address}</td>
      <td>{JSON.stringify(client.geolocation)}</td>
      <td>{new Date(client.createdat).toLocaleString()}</td>
      <td>
        <button
          onClick={() => handleDelete(client.franchiseid)}
          style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '6px' }}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
}

export default AllClients;
