import React from 'react';
import VehicleCard from './VehicleCard';
import EmptyState from './EmptyState';

const VehicleList = ({ vehicles, onEdit, onDelete }) => {
  if (vehicles.length === 0) {
    return (
      <EmptyState
        icon="🚗"
        title="No Vehicles Yet"
        message="Add your first vehicle to start tracking maintenance."
      />
    );
  }

  return (
    <div className="vehicle-list">
      {vehicles.map(vehicle => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default VehicleList;
