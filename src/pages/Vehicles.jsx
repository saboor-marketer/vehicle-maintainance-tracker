import React, { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import PageHeader from '../components/PageHeader';
import VehicleList from '../components/VehicleList';
import VehicleForm from '../components/VehicleForm';
import ConfirmModal from '../components/ConfirmModal';
import { useVehicles } from '../hooks/useVehicles';
import { useMaintenance } from '../hooks/useMaintenance';

const Vehicles = () => {
  const { vehicles, loading, addVehicle, updateVehicle, deleteVehicle, getVehicle } = useVehicles();
  const { deleteRecordsByVehicle } = useMaintenance();
  
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  const handleAddClick = () => {
    setEditingVehicle(null);
    setShowForm(true);
  };

  const handleEditClick = (vehicle) => {
    setEditingVehicle(vehicle);
    setShowForm(true);
  };

  const handleDeleteClick = (vehicle) => {
    setVehicleToDelete(vehicle);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingVehicle) {
      updateVehicle(editingVehicle.id, formData);
    } else {
      const newVehicle = addVehicle(formData);
    }
    setShowForm(false);
    setEditingVehicle(null);
  };

  const handleDeleteConfirm = () => {
    if (vehicleToDelete) {
      deleteRecordsByVehicle(vehicleToDelete.id);
      deleteVehicle(vehicleToDelete.id);
      setShowDeleteModal(false);
      setVehicleToDelete(null);
    }
  };

  if (loading) {
    return <Container><p>Loading...</p></Container>;
  }

  return (
    <Container>
      <PageHeader
        title="Vehicles"
        subtitle="Manage your vehicle fleet"
      >
        <Button variant="primary" onClick={handleAddClick}>
          Add Vehicle
        </Button>
      </PageHeader>

      <VehicleList
        vehicles={vehicles}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <Modal show={showForm} onHide={() => setShowForm(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VehicleForm
            vehicle={editingVehicle}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
          />
        </Modal.Body>
      </Modal>

      <ConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Vehicle"
        message={`Are you sure you want to delete ${vehicleToDelete?.name}? This will also delete all maintenance records for this vehicle. This action cannot be undone.`}
      />
    </Container>
  );
};

export default Vehicles;
