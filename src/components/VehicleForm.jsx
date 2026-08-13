import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { validateVehicle, hasErrors } from '../utils/validation';

const VehicleForm = ({ vehicle, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    make: '',
    model: '',
    year: '',
    registrationNumber: '',
    currentMileage: '',
    fuelType: 'Gasoline',
    color: '',
    purchaseDate: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (vehicle) {
      setFormData({
        name: vehicle.name || '',
        make: vehicle.make || '',
        model: vehicle.model || '',
        year: vehicle.year || '',
        registrationNumber: vehicle.registrationNumber || '',
        currentMileage: vehicle.currentMileage || '',
        fuelType: vehicle.fuelType || 'Gasoline',
        color: vehicle.color || '',
        purchaseDate: vehicle.purchaseDate || '',
        notes: vehicle.notes || ''
      });
    }
  }, [vehicle]);

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
    
    const validationErrors = validateVehicle(formData);
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
            <Form.Label>Vehicle Name *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              placeholder="e.g., Family Car"
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Make *</Form.Label>
            <Form.Control
              type="text"
              name="make"
              value={formData.make}
              onChange={handleChange}
              isInvalid={!!errors.make}
              placeholder="e.g., Toyota"
            />
            {errors.make && <div className="invalid-feedback">{errors.make}</div>}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Model *</Form.Label>
            <Form.Control
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              isInvalid={!!errors.model}
              placeholder="e.g., Camry"
            />
            {errors.model && <div className="invalid-feedback">{errors.model}</div>}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Year *</Form.Label>
            <Form.Control
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              isInvalid={!!errors.year}
              placeholder="e.g., 2020"
              min="1900"
              max={new Date().getFullYear() + 1}
            />
            {errors.year && <div className="invalid-feedback">{errors.year}</div>}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Registration Number *</Form.Label>
            <Form.Control
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              isInvalid={!!errors.registrationNumber}
              placeholder="e.g., ABC-1234"
            />
            {errors.registrationNumber && <div className="invalid-feedback">{errors.registrationNumber}</div>}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Current Mileage *</Form.Label>
            <Form.Control
              type="number"
              name="currentMileage"
              value={formData.currentMileage}
              onChange={handleChange}
              isInvalid={!!errors.mileage}
              placeholder="e.g., 45000"
              min="0"
              step="1"
            />
            {errors.mileage && <div className="invalid-feedback">{errors.mileage}</div>}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Fuel Type</Form.Label>
            <Form.Select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
            >
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="e.g., Silver"
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Purchase Date</Form.Label>
        <Form.Control
          type="date"
          name="purchaseDate"
          value={formData.purchaseDate}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as="textarea"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Any additional notes about this vehicle..."
        />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button type="submit" variant="primary">
          {vehicle ? 'Update Vehicle' : 'Add Vehicle'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default VehicleForm;
