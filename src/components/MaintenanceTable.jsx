import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate, formatMileage } from '../utils/formatters';

const MaintenanceTable = ({ records, vehicles, onEdit, onDelete }) => {
  const getVehicleName = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? vehicle.name : 'Unknown Vehicle';
  };

  if (records.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted">No maintenance records found.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <Table hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Vehicle</th>
            <th>Service Type</th>
            <th>Mileage</th>
            <th>Cost</th>
            <th>Provider</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id}>
              <td>{formatDate(record.date)}</td>
              <td>{getVehicleName(record.vehicleId)}</td>
              <td>{record.serviceType}</td>
              <td>{formatMileage(record.mileage)}</td>
              <td>{formatCurrency(record.cost)}</td>
              <td>{record.serviceProvider || 'N/A'}</td>
              <td>
                <div className="d-flex gap-1">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onEdit(record)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDelete(record)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MaintenanceTable;
