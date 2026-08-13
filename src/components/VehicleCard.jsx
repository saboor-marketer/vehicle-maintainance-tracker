import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatMileage } from '../utils/formatters';

const VehicleCard = ({ vehicle, onEdit, onDelete }) => {
  return (
    <Card className="vehicle-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="vehicle-name">{vehicle.name}</h5>
            <p className="vehicle-details mb-1">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </p>
            <p className="vehicle-details mb-1">
              Reg: {vehicle.registrationNumber}
            </p>
            <p className="vehicle-details mb-1">
              Mileage: {formatMileage(vehicle.currentMileage)}
            </p>
            {vehicle.fuelType && (
              <p className="vehicle-details mb-0">
                Fuel: {vehicle.fuelType}
              </p>
            )}
          </div>
          <div className="d-flex gap-2">
            <Button
              as={Link}
              to={`/vehicles/${vehicle.id}`}
              variant="outline-primary"
              size="sm"
            >
              View
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => onEdit(vehicle)}
            >
              Edit
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onDelete(vehicle)}
            >
              Delete
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default VehicleCard;
