import React from 'react';
import { Container, Card, Row, Col, Table } from 'react-bootstrap';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import DashboardCard from '../components/DashboardCard';
import { useVehicles } from '../hooks/useVehicles';
import { useMaintenance } from '../hooks/useMaintenance';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { calculateTotalExpenses, calculateExpensesByVehicle, calculateExpensesByServiceType, calculateMonthlyExpenses } from '../utils/helpers';

const Expenses = () => {
  const { vehicles } = useVehicles();
  const { records } = useMaintenance();

  const totalExpenses = calculateTotalExpenses(records);
  const expensesByVehicle = calculateExpensesByVehicle(records, vehicles);
  const expensesByServiceType = calculateExpensesByServiceType(records);
  const monthlyExpenses = calculateMonthlyExpenses(records);

  if (records.length === 0) {
    return (
      <Container>
        <PageHeader
          title="Expense Overview"
          subtitle="Track your maintenance spending"
        />
        <EmptyState
          icon="💰"
          title="No Expenses Yet"
          message="Add maintenance records to see expense breakdowns."
        />
      </Container>
    );
  }

  const maxExpenseByVehicle = Math.max(...expensesByVehicle.map(e => e.total), 1);
  const maxExpenseByService = Math.max(...expensesByServiceType.map(e => e.total), 1);

  return (
    <Container>
      <PageHeader
        title="Expense Overview"
        subtitle="Track your maintenance spending"
      />

      <Row className="mb-4">
        <Col md={12}>
          <DashboardCard
            icon="💰"
            value={formatCurrency(totalExpenses)}
            label="Total Maintenance Expenses"
            color="success"
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">Expenses by Vehicle</h5>
            </Card.Header>
            <Card.Body>
              {expensesByVehicle.length === 0 ? (
                <p className="text-muted">No expense data available.</p>
              ) : (
                expensesByVehicle.map(expense => (
                  <div key={expense.vehicleId}>
                    <div className="expense-bar-label">
                      <span>{expense.vehicleName}</span>
                      <span>{formatCurrency(expense.total)}</span>
                    </div>
                    <div className="expense-bar">
                      <div
                        className="expense-bar-fill"
                        style={{ width: `${(expense.total / maxExpenseByVehicle) * 100}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">Expenses by Service Type</h5>
            </Card.Header>
            <Card.Body>
              {expensesByServiceType.length === 0 ? (
                <p className="text-muted">No expense data available.</p>
              ) : (
                expensesByServiceType.slice(0, 6).map(expense => (
                  <div key={expense.serviceType}>
                    <div className="expense-bar-label">
                      <span>{expense.serviceType} ({expense.count})</span>
                      <span>{formatCurrency(expense.total)}</span>
                    </div>
                    <div className="expense-bar">
                      <div
                        className="expense-bar-fill"
                        style={{ width: `${(expense.total / maxExpenseByService) * 100}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">Monthly Expenses (Last 12 Months)</h5>
        </Card.Header>
        <Card.Body>
          {monthlyExpenses.length === 0 ? (
            <p className="text-muted">No monthly expense data available.</p>
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Total Spent</th>
                    <th>Number of Services</th>
                    <th>Average per Service</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyExpenses.map(expense => (
                    <tr key={expense.month}>
                      <td>{expense.month}</td>
                      <td>{formatCurrency(expense.total)}</td>
                      <td>{formatNumber(expense.count)}</td>
                      <td>{formatCurrency(expense.count > 0 ? expense.total / expense.count : 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <h5 className="mb-0">Expense Summary</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <p><strong>Total Vehicles:</strong> {formatNumber(vehicles.length)}</p>
            </Col>
            <Col md={4}>
              <p><strong>Total Services:</strong> {formatNumber(records.length)}</p>
            </Col>
            <Col md={4}>
              <p><strong>Average Cost per Service:</strong> {formatCurrency(records.length > 0 ? totalExpenses / records.length : 0)}</p>
            </Col>
            <Col md={4}>
              <p><strong>Average Cost per Vehicle:</strong> {formatCurrency(vehicles.length > 0 ? totalExpenses / vehicles.length : 0)}</p>
            </Col>
            <Col md={4}>
              <p><strong>Highest Single Expense:</strong> {formatCurrency(Math.max(...records.map(r => parseFloat(r.cost) || 0)))}</p>
            </Col>
            <Col md={4}>
              <p><strong>Lowest Single Expense:</strong> {formatCurrency(Math.min(...records.map(r => parseFloat(r.cost) || 0)))}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Expenses;
