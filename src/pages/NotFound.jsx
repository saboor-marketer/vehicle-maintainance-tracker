import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../components/EmptyState';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <EmptyState
        icon="🔍"
        title="Page Not Found"
        message="The page you're looking for doesn't exist or has been moved."
        actionText="Go to Dashboard"
        onAction={() => navigate('/')}
      />
    </Container>
  );
};

export default NotFound;
