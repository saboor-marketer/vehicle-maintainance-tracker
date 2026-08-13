import React from 'react';
import { Card } from 'react-bootstrap';

const DashboardCard = ({ icon, value, label, color = 'primary' }) => {
  const colorClasses = {
    primary: 'text-primary',
    success: 'text-success',
    danger: 'text-danger',
    warning: 'text-warning',
    info: 'text-info'
  };

  return (
    <Card className="dashboard-card h-100">
      <Card.Body>
        <div className={`card-icon ${colorClasses[color] || colorClasses.primary}`}>
          {icon}
        </div>
        <div className="card-value">{value}</div>
        <div className="card-label">{label}</div>
      </Card.Body>
    </Card>
  );
};

export default DashboardCard;
