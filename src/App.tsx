import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PropertyDetail from './pages/PropertyDetail';
import AdminPage from './pages/AdminPage';
import BookingsPage from './pages/Bookings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;