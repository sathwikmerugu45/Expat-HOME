import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PropertyDetail from './pages/PropertyDetail';
import AdminPage from './pages/AdminPage';
import BookingsPage from './pages/Bookings';

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;