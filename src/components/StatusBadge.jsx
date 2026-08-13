import React from 'react';
import { Badge } from 'react-bootstrap';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    overdue: {
      bg: 'danger',
      label: 'Overdue'
    },
    due_soon: {
      bg: 'warning',
      label: 'Due Soon'
    },
    up_to_date: {
      bg: 'success',
      label: 'Up to Date'
    }
  };

  const config = statusConfig[status] || statusConfig.up_to_date;

  return (
    <Badge bg={config.bg} className="status-badge">
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
