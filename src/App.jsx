import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import VehicleDetailsPage from './pages/VehicleDetailsPage';
import Maintenance from './pages/Maintenance';
import Reminders from './pages/Reminders';
import Expenses from './pages/Expenses';
import NotFound from './pages/NotFound';
import { useVehicles } from './hooks/useVehicles';
import { useMaintenance } from './hooks/useMaintenance';

const AppContent = () => {
  const { vehicles } = useVehicles();
  const { records } = useMaintenance();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard vehicles={vehicles} maintenanceRecords={records} />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/new" element={<Vehicles />} />
        <Route path="/vehicles/:id" element={<VehicleDetailsPage />} />
        <Route path="/vehicles/:id/edit" element={<VehicleDetailsPage />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/maintenance/new" element={<Maintenance />} />
        <Route path="/maintenance/:id/edit" element={<Maintenance />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
