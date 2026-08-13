import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Row, Col, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import MaintenanceTable from '../components/MaintenanceTable';
import MaintenanceForm from '../components/MaintenanceForm';
import SearchBar from '../components/SearchBar';
import FilterControls from '../components/FilterControls';
import ConfirmModal from '../components/ConfirmModal';
import { useVehicles } from '../hooks/useVehicles';
import { useMaintenance } from '../hooks/useMaintenance';
import { sortMaintenanceRecords, filterMaintenanceRecords } from '../utils/helpers';

const Maintenance = () => {
  const location = useLocation();
  const { vehicles } = useVehicles();
  const { records, loading, addRecord, updateRecord, deleteRecord } = useMaintenance();
  
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date_newest');
  const [filters, setFilters] = useState({
    vehicleId: '',
    serviceType: '',
    status: ''
  });

  useEffect(() => {
    if (location.state?.vehicleId) {
      setFilters(prev => ({ ...prev, vehicleId: location.state.vehicleId }));
      setShowForm(true);
    }
  }, [location.state]);

  const handleAddClick = () => {
    setEditingRecord(null);
    setShowForm(true);
  };

  const handleEditClick = (record) => {
    setEditingRecord(record);
    setShowForm(true);
  };

  const handleDeleteClick = (record) => {
    setRecordToDelete(record);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingRecord) {
      updateRecord(editingRecord.id, formData);
    } else {
      addRecord(formData);
    }
    setShowForm(false);
    setEditingRecord(null);
  };

  const handleDeleteConfirm = () => {
    if (recordToDelete) {
      deleteRecord(recordToDelete.id);
      setShowDeleteModal(false);
      setRecordToDelete(null);
    }
  };

  const getFilteredAndSortedRecords = () => {
    let filtered = filterMaintenanceRecords(records, { ...filters, searchQuery });
    return sortMaintenanceRecords(filtered, sortBy);
  };

  if (loading) {
    return <Container><p>Loading...</p></Container>;
  }

  const displayRecords = getFilteredAndSortedRecords();

  return (
    <Container>
      <PageHeader
        title="Maintenance Records"
        subtitle="Track all vehicle maintenance"
      >
        <Button variant="primary" onClick={handleAddClick}>
          Add Maintenance
        </Button>
      </PageHeader>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search by service type, provider, or description..."
      />

      <FilterControls
        vehicles={vehicles}
        filters={filters}
        onChange={setFilters}
      />

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Sort By</Form.Label>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date_newest">Date (Newest First)</option>
              <option value="date_oldest">Date (Oldest First)</option>
              <option value="cost_highest">Cost (Highest First)</option>
              <option value="cost_lowest">Cost (Lowest First)</option>
              <option value="mileage_highest">Mileage (Highest First)</option>
              <option value="mileage_lowest">Mileage (Lowest First)</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <p className="text-muted mt-4">
            Showing {displayRecords.length} of {records.length} records
          </p>
        </Col>
      </Row>

      <MaintenanceTable
        records={displayRecords}
        vehicles={vehicles}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <Modal show={showForm} onHide={() => setShowForm(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingRecord ? 'Edit Maintenance Record' : 'Add Maintenance Record'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MaintenanceForm
            record={editingRecord}
            vehicles={vehicles}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
          />
        </Modal.Body>
      </Modal>

      <ConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Maintenance Record"
        message="Are you sure you want to delete this maintenance record? This action cannot be undone."
      />
    </Container>
  );
};

export default Maintenance;
