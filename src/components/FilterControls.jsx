import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const FilterControls = ({ vehicles, serviceTypes, filters, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...filters,
      [field]: value
    });
  };

  const allServiceTypes = [
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

  return (
    <div className="filter-controls">
      <Row>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Filter by Vehicle</Form.Label>
            <Form.Select
              value={filters.vehicleId || ''}
              onChange={(e) => handleChange('vehicleId', e.target.value)}
            >
              <option value="">All Vehicles</option>
              {vehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Filter by Service Type</Form.Label>
            <Form.Select
              value={filters.serviceType || ''}
              onChange={(e) => handleChange('serviceType', e.target.value)}
            >
              <option value="">All Service Types</option>
              {allServiceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Filter by Status</Form.Label>
            <Form.Select
              value={filters.status || ''}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <option value="">All Status</option>
              <option value="overdue">Overdue</option>
              <option value="due_soon">Due Soon</option>
              <option value="up_to_date">Up to Date</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default FilterControls;
