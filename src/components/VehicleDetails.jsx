import React from 'react';
import { Card, Button, Table, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate, formatMileage } from '../utils/formatters';
import { calculateTotalExpenses, getLastService, getNextService } from '../utils/helpers';

const VehicleDetails = ({ vehicle, maintenanceRecords, onEdit, onDelete, onAddMaintenance }) => {
  const vehicleRecords = maintenanceRecords.filter(r => r.vehicleId === vehicle.id);
  const totalCost = calculateTotalExpenses(vehicleRecords);
  const lastService = getLastService(vehicle.id, maintenanceRecords);
  const nextService = getNextService(vehicle.id, maintenanceRecords, vehicle);

  return (
    <div>
      <Card className="mb-4">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Vehicle Information</h5>
            <div className="d-flex gap-2">
              <Button variant="outline-primary" size="sm" onClick={onAddMaintenance}>
                Add Maintenance
              </Button>
              <Button variant="outline-secondary" size="sm" onClick={onEdit}>
                Edit Vehicle
              </Button>
              <Button variant="outline-danger" size="sm" onClick={onDelete}>
                Delete Vehicle
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Name:</strong> {vehicle.name}</p>
              <p><strong>Make:</strong> {vehicle.make}</p>
              <p><strong>Model:</strong> {vehicle.model}</p>
              <p><strong>Year:</strong> {vehicle.year}</p>
              <p><strong>Registration:</strong> {vehicle.registrationNumber}</p>
            </Col>
            <Col md={6}>
              <p><strong>Current Mileage:</strong> {formatMileage(vehicle.currentMileage)}</p>
              <p><strong>Fuel Type:</strong> {vehicle.fuelType}</p>
              <p><strong>Color:</strong> {vehicle.color || 'N/A'}</p>
              <p><strong>Purchase Date:</strong> {formatDate(vehicle.purchaseDate)}</p>
            </Col>
          </Row>
          {vehicle.notes && (
            <p className="mt-3"><strong>Notes:</strong> {vehicle.notes}</p>
          )}
        </Card.Body>
      </Card>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="dashboard-card h-100">
            <Card.Body>
              <div className="card-value">{vehicleRecords.length}</div>
              <div className="card-label">Maintenance Records</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card h-100">
            <Card.Body>
              <div className="card-value">{formatCurrency(totalCost)}</div>
              <div className="card-label">Total Spent</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card h-100">
            <Card.Body>
              <div className="card-value">{lastService ? formatDate(lastService.date) : 'N/A'}</div>
              <div className="card-label">Last Service</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card h-100">
            <Card.Body>
              <div className="card-value">{nextService ? formatDate(nextService.nextServiceDate) : 'N/A'}</div>
              <div className="card-label">Next Service</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Header>
          <h5 className="mb-0">Maintenance History</h5>
        </Card.Header>
        <Card.Body>
          {vehicleRecords.length === 0 ? (
            <p className="text-muted">No maintenance records yet.</p>
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Service Type</th>
                    <th>Mileage</th>
                    <th>Cost</th>
                    <th>Provider</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleRecords
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map(record => (
                      <tr key={record.id}>
                        <td>{formatDate(record.date)}</td>
                        <td>{record.serviceType}</td>
                        <td>{formatMileage(record.mileage)}</td>
                        <td>{formatCurrency(record.cost)}</td>
                        <td>{record.serviceProvider || 'N/A'}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default VehicleDetails;
