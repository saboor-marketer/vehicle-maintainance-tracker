import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import { formatCurrency, formatNumber, formatMileage, formatDate } from '../utils/formatters';
import { calculateTotalExpenses, getLastService, getNextService } from '../utils/helpers';

const Dashboard = ({ vehicles, maintenanceRecords }) => {
  const totalVehicles = vehicles.length;
  const totalRecords = maintenanceRecords.length;
  const totalExpenses = calculateTotalExpenses(maintenanceRecords);
  
  const currentMileage = vehicles.reduce((sum, v) => sum + (parseFloat(v.currentMileage) || 0), 0);
  
  const upcomingMaintenance = maintenanceRecords.filter(record => {
    if (!record.nextServiceDate) return false;
    const daysUntil = Math.ceil((new Date(record.nextServiceDate) - new Date()) / (1000 * 60 * 60 * 24));
    return daysUntil >= 0 && daysUntil <= 30;
  });

  const recentActivity = [...maintenanceRecords]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const getVehicleName = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? vehicle.name : 'Unknown';
  };

  return (
    <Container>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="page-subtitle">Overview of your vehicle maintenance</p>
      </div>

      <Row className="mb-4">
        <Col md={3}>
          <DashboardCard
            icon="🚗"
            value={formatNumber(totalVehicles)}
            label="Total Vehicles"
            color="primary"
          />
        </Col>
        <Col md={3}>
          <DashboardCard
            icon="🔧"
            value={formatNumber(totalRecords)}
            label="Maintenance Records"
            color="info"
          />
        </Col>
        <Col md={3}>
          <DashboardCard
            icon="💰"
            value={formatCurrency(totalExpenses)}
            label="Total Expenses"
            color="success"
          />
        </Col>
        <Col md={3}>
          <DashboardCard
            icon="📊"
            value={formatMileage(currentMileage)}
            label="Total Mileage"
            color="warning"
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="quick-action-card h-100" as={Link} to="/vehicles/new">
            <Card.Body>
              <div className="action-icon">➕</div>
              <div className="action-label">Add Vehicle</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="quick-action-card h-100" as={Link} to="/maintenance/new">
            <Card.Body>
              <div className="action-icon">🔧</div>
              <div className="action-label">Add Maintenance</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="quick-action-card h-100" as={Link} to="/vehicles">
            <Card.Body>
              <div className="action-icon">🚗</div>
              <div className="action-label">View Vehicles</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="quick-action-card h-100" as={Link} to="/maintenance">
            <Card.Body>
              <div className="action-icon">📋</div>
              <div className="action-label">View Maintenance</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">Upcoming Maintenance</h5>
            </Card.Header>
            <Card.Body>
              {upcomingMaintenance.length === 0 ? (
                <p className="text-muted">No upcoming maintenance in the next 30 days.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Vehicle</th>
                        <th>Service</th>
                        <th>Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingMaintenance.slice(0, 5).map(record => (
                        <tr key={record.id}>
                          <td>{getVehicleName(record.vehicleId)}</td>
                          <td>{record.serviceType}</td>
                          <td>{formatDate(record.nextServiceDate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">Recent Activity</h5>
            </Card.Header>
            <Card.Body>
              {recentActivity.length === 0 ? (
                <p className="text-muted">No recent maintenance activity.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Vehicle</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivity.map(record => (
                        <tr key={record.id}>
                          <td>{getVehicleName(record.vehicleId)}</td>
                          <td>{record.serviceType}</td>
                          <td>{formatDate(record.date)}</td>
                          <td>{formatCurrency(record.cost)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Maintenance Cost Summary</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <p><strong>Average Cost per Service:</strong> {formatCurrency(totalRecords > 0 ? totalExpenses / totalRecords : 0)}</p>
                </Col>
                <Col md={4}>
                  <p><strong>Average Cost per Vehicle:</strong> {formatCurrency(totalVehicles > 0 ? totalExpenses / totalVehicles : 0)}</p>
                </Col>
                <Col md={4}>
                  <p><strong>Total Services This Year:</strong> {formatNumber(maintenanceRecords.filter(r => new Date(r.date).getFullYear() === new Date().getFullYear()).length)}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
