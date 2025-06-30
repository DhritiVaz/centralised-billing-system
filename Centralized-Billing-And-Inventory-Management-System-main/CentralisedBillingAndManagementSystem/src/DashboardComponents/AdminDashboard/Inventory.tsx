import { useEffect, useState } from 'react';
import axios from 'axios';
import "../../App.css";


type Sale = {
  saleid: number;
  productname: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
  franchise: string;
};

function Inventory() {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/sales');
        setSales(res.data);
      } catch (err) {
        console.error('Failed to fetch sales:', err);
      }
    };
    fetchSales();
  }, []);

  return (
    <div className="main-container">
      <div className="heading-panel">
        <h2>Admin Panel</h2>
        <h1>Sales Inventory</h1>
      </div>

      <div className="client-table-wrapper">
        <table className="client-table client-table-striped client-table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Date</th>
              <th>Franchise</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.saleid}>
                <td>{sale.saleid}</td>
                <td>{sale.productname}</td>
                <td>{sale.quantity}</td>
                <td>₹{sale.price}</td>
                <td>₹{sale.total}</td>
                <td>{new Date(sale.date).toLocaleDateString()}</td>
                <td>{sale.franchise}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
