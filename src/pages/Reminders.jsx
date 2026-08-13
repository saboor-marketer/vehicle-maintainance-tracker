import React from 'react';
import { Container, Card, Table, Row, Col, Badge } from 'react-bootstrap';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { useVehicles } from '../hooks/useVehicles';
import { useMaintenance } from '../hooks/useMaintenance';
import { getMaintenanceStatus } from '../utils/helpers';
import { formatDate, formatMileage } from '../utils/formatters';

const Reminders = () => {
  const { vehicles } = useVehicles();
  const { records } = useMaintenance();

  const recordsWithStatus = records.map(record => {
    const vehicle = vehicles.find(v => v.id === record.vehicleId);
    const { status } = getMaintenanceStatus(record, vehicle);
    return {
      ...record,
      status,
      vehicle
    };
  });

  const overdueRecords = recordsWithStatus.filter(r => r.status === 'overdue');
  const dueSoonRecords = recordsWithStatus.filter(r => r.status === 'due_soon');
  const upToDateRecords = recordsWithStatus.filter(r => r.status === 'up_to_date');

  const getVehicleName = (record) => {
    return record.vehicle ? record.vehicle.name : 'Unknown Vehicle';
  };

  const ReminderTable = ({ title, records, emptyMessage, showIfEmpty = false }) => {
    if (!showIfEmpty && records.length === 0) return null;

    return (
      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">{title} ({records.length})</h5>
        </Card.Header>
        <Card.Body>
          {records.length === 0 ? (
            <p className="text-muted">{emptyMessage}</p>
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th>Vehicle</th>
                    <th>Service Type</th>
                    <th>Last Service Date</th>
                    <th>Last Service Mileage</th>
                    <th>Next Service Date</th>
                    <th>Next Service Mileage</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map(record => (
                    <tr key={record.id}>
                      <td>{getVehicleName(record)}</td>
                      <td>{record.serviceType}</td>
                      <td>{formatDate(record.date)}</td>
                      <td>{formatMileage(record.mileage)}</td>
                      <td>{record.nextServiceDate ? formatDate(record.nextServiceDate) : 'N/A'}</td>
                      <td>{record.nextServiceMileage ? formatMileage(record.nextServiceMileage) : 'N/A'}</td>
                      <td><StatusBadge status={record.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  };

  if (records.length === 0) {
    return (
      <Container>
        <PageHeader
          title="Maintenance Reminders"
          subtitle="Track upcoming and overdue maintenance"
        />
        <EmptyState
          icon="🔔"
          title="No Maintenance Records"
          message="Add maintenance records to see reminders for upcoming services."
        />
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader
        title="Maintenance Reminders"
        subtitle="Track upcoming and overdue maintenance"
      />

      <Row className="mb-4">
        <Col md={4}>
          <Card className="dashboard-card h-100">
            <Card.Body>
              <div className="card-value text-danger">{overdueRecords.length}</div>
              <div className="card-label">Overdue</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="dashboard-card h-100">
            <Card.Body>
              <div className="card-value text-warning">{dueSoonRecords.length}</div>
              <div className="card-label">Due Soon</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="dashboard-card h-100">
            <Card.Body>
              <div className="card-value text-success">{upToDateRecords.length}</div>
              <div className="card-label">Up to Date</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ReminderTable
        title="Overdue Maintenance"
        records={overdueRecords}
        emptyMessage="No overdue maintenance."
        showIfEmpty={true}
      />

      <ReminderTable
        title="Due Soon"
        records={dueSoonRecords}
        emptyMessage="No maintenance due soon."
      />

      <ReminderTable
        title="Up to Date"
        records={upToDateRecords}
        emptyMessage="No up-to-date maintenance records."
      />
    </Container>
  );
};

export default Reminders;
