import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout.jsx';
import Overview from './pages/Overview.jsx';
import Products from './pages/Products.jsx';
import Customers from './pages/Customers.jsx';
import Analytics from './pages/Analytics.jsx';
import './App.css';

export default function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<Overview />} />
      </Routes>
    </DashboardLayout>
  );
}
