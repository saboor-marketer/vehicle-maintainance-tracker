import React, { useState, useEffect } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import VehicleDetails from '../components/VehicleDetails';
import VehicleForm from '../components/VehicleForm';
import ConfirmModal from '../components/ConfirmModal';
import { useVehicles } from '../hooks/useVehicles';
import { useMaintenance } from '../hooks/useMaintenance';

const VehicleDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vehicles, getVehicle, updateVehicle, deleteVehicle } = useVehicles();
  const { records, deleteRecordsByVehicle } = useMaintenance();
  
  const [vehicle, setVehicle] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddMaintenanceModal, setShowAddMaintenanceModal] = useState(false);

  useEffect(() => {
    const foundVehicle = getVehicle(id);
    if (foundVehicle) {
      setVehicle(foundVehicle);
    } else {
      navigate('/vehicles');
    }
  }, [id, vehicles, getVehicle, navigate]);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleUpdateVehicle = (formData) => {
    updateVehicle(vehicle.id, formData);
    setShowEditModal(false);
  };

  const handleDeleteConfirm = () => {
    deleteRecordsByVehicle(vehicle.id);
    deleteVehicle(vehicle.id);
    navigate('/vehicles');
  };

  const handleAddMaintenance = () => {
    navigate('/maintenance/new', { state: { vehicleId: vehicle.id } });
  };

  if (!vehicle) {
    return <Container><p>Loading...</p></Container>;
  }

  return (
    <Container>
      <VehicleDetails
        vehicle={vehicle}
        maintenanceRecords={records}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddMaintenance={handleAddMaintenance}
      />

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VehicleForm
            vehicle={vehicle}
            onSubmit={handleUpdateVehicle}
            onCancel={() => setShowEditModal(false)}
          />
        </Modal.Body>
      </Modal>

      <ConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Vehicle"
        message={`Are you sure you want to delete ${vehicle.name}? This will also delete all maintenance records for this vehicle. This action cannot be undone.`}
      />
    </Container>
  );
};

export default VehicleDetailsPage;
