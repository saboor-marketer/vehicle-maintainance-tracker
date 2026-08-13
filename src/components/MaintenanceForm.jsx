import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { validateMaintenance, hasErrors } from '../utils/validation';

const SERVICE_TYPES = [
  'Oil Change',
  'Tire Replacement',
  'Brake Service',
  'Battery Replacement',
  'Engine Service',
  'AC Service',
  'General Inspection',
  'Filter Replacement',
  'Other'
];

const MaintenanceForm = ({ record, vehicles, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    vehicleId: '',
    serviceType: 'Oil Change',
    date: '',
    mileage: '',
    cost: '',
    serviceProvider: '',
    description: '',
    nextServiceDate: '',
    nextServiceMileage: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (record) {
      setFormData({
        vehicleId: record.vehicleId || '',
        serviceType: record.serviceType || 'Oil Change',
        date: record.date || '',
        mileage: record.mileage || '',
        cost: record.cost || '',
        serviceProvider: record.serviceProvider || '',
        description: record.description || '',
        nextServiceDate: record.nextServiceDate || '',
        nextServiceMileage: record.nextServiceMileage || ''
      });
    }
  }, [record]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateMaintenance(formData, vehicles);
    setErrors(validationErrors);
    
    if (!hasErrors(validationErrors)) {
      onSubmit(formData);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Vehicle *</Form.Label>
            <Form.Select
              name="vehicleId"
              value={formData.vehicleId}
              onChange={handleChange}
              isInvalid={!!errors.vehicleId}
            >
              <option value="">Select a vehicle</option>
              {vehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name} - {vehicle.year} {vehicle.make} {vehicle.model}
                </option>
              ))}
            </Form.Select>
            {errors.vehicleId && <div className="invalid-feedback">{errors.vehicleId}</div>}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Service Type *</Form.Label>
            <Form.Select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              isInvalid={!!errors.serviceType}
            >
              {SERVICE_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Form.Select>
            {errors.serviceType && <div className="invalid-feedback">{errors.serviceType}</div>}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Date *</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              isInvalid={!!errors.date}
            />
            {errors.date && <div className="invalid-feedback">{errors.date}</div>}
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Mileage *</Form.Label>
            <Form.Control
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              isInvalid={!!errors.mileage}
              placeholder="e.g., 45000"
              min="0"
              step="1"
            />
            {errors.mileage && <div className="invalid-feedback">{errors.mileage}</div>}
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Cost ($) *</Form.Label>
            <Form.Control
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              isInvalid={!!errors.cost}
              placeholder="e.g., 65.00"
              min="0"
              step="0.01"
            />
            {errors.cost && <div className="invalid-feedback">{errors.cost}</div>}
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Service Provider</Form.Label>
        <Form.Control
          type="text"
          name="serviceProvider"
          value={formData.serviceProvider}
          onChange={handleChange}
          placeholder="e.g., QuickLube"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Details about the service performed..."
        />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Next Service Date</Form.Label>
            <Form.Control
              type="date"
              name="nextServiceDate"
              value={formData.nextServiceDate}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Next Service Mileage</Form.Label>
            <Form.Control
              type="number"
              name="nextServiceMileage"
              value={formData.nextServiceMileage}
              onChange={handleChange}
              isInvalid={!!errors.nextServiceMileage}
              placeholder="e.g., 50000"
              min="0"
              step="1"
            />
            {errors.nextServiceMileage && <div className="invalid-feedback">{errors.nextServiceMileage}</div>}
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex gap-2">
        <Button type="submit" variant="primary">
          {record ? 'Update Record' : 'Add Record'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default MaintenanceForm;
