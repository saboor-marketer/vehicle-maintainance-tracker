# Vehicle Maintenance Tracker

A production-quality, responsive web application for tracking vehicle maintenance, expenses, and service reminders. Built with React, Bootstrap 5, and localStorage for data persistence.

## Features

### Dashboard
- Overview of total vehicles, maintenance records, and expenses
- Quick-action cards for common tasks
- Upcoming maintenance display
- Recent activity feed
- Maintenance cost summary

### Vehicle Management
- Add, edit, and delete vehicles
- Track vehicle details (make, model, year, registration, mileage, fuel type, color, purchase date, notes)
- View detailed vehicle information
- See maintenance history per vehicle
- Form validation for all required fields

### Maintenance Records
- Log maintenance services with comprehensive details
- Track service type, date, mileage, cost, service provider, and description
- Set next service dates and mileage thresholds
- Edit and delete records
- Search by service type, provider, or description
- Filter by vehicle, service type, and maintenance status
- Sort by date, cost, or mileage

### Maintenance Reminders
- Automatic status calculation (Overdue, Due Soon, Up to Date)
- Date-based reminders (services due within 30 days)
- Mileage-based reminders (when current mileage reaches 90% of next service mileage)
- Clear visual status badges

### Expense Tracking
- Total maintenance expenses
- Expenses breakdown by vehicle
- Expenses breakdown by service type
- Monthly expense history
- Visual expense bars for easy comparison

### Data Persistence
- All data stored in localStorage
- Sample data loaded on first launch (2 vehicles, 5 maintenance records)
- Data persists across browser refreshes
- Graceful handling of corrupted or empty localStorage

## Technology Stack

- **React 18** - UI library
- **React Router DOM 6** - Client-side routing
- **Bootstrap 5** - CSS framework
- **React Bootstrap** - Bootstrap components for React
- **Vite** - Build tool and dev server
- **localStorage** - Data persistence

## Project Structure

```
vehicle-maintainance-tracker/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── DashboardCard.jsx
│   │   ├── StatusBadge.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ConfirmModal.jsx
│   │   ├── PageHeader.jsx
│   │   ├── VehicleForm.jsx
│   │   ├── VehicleCard.jsx
│   │   ├── VehicleList.jsx
│   │   ├── VehicleDetails.jsx
│   │   ├── MaintenanceForm.jsx
│   │   ├── MaintenanceTable.jsx
│   │   ├── SearchBar.jsx
│   │   └── FilterControls.jsx
│   ├── pages/               # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Vehicles.jsx
│   │   ├── VehicleDetailsPage.jsx
│   │   ├── Maintenance.jsx
│   │   ├── Reminders.jsx
│   │   ├── Expenses.jsx
│   │   └── NotFound.jsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useVehicles.js
│   │   └── useMaintenance.js
│   ├── utils/               # Utility functions
│   │   ├── storage.js
│   │   ├── formatters.js
│   │   ├── validation.js
│   │   └── helpers.js
│   ├── data/                # Sample data
│   │   └── sampleData.js
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx            # Entry point
│   └── styles.css          # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## Building for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Routes

- `/` - Dashboard
- `/vehicles` - Vehicle list
- `/vehicles/new` - Add new vehicle
- `/vehicles/:id` - Vehicle details
- `/vehicles/:id/edit` - Edit vehicle
- `/maintenance` - Maintenance records
- `/maintenance/new` - Add maintenance record
- `/maintenance/:id/edit` - Edit maintenance record
- `/reminders` - Maintenance reminders
- `/expenses` - Expense overview
- `*` - 404 Not Found page

## Validation

### Vehicle Validation
- Name, make, model, year, and registration number are required
- Year must be between 1900 and current year + 1
- Mileage must be 0 or greater

### Maintenance Validation
- Vehicle, service type, date, mileage, and cost are required
- Cost must be 0 or greater
- Mileage must be 0 or greater
- Selected vehicle must exist

## Responsive Design

The application is fully responsive and works on:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## Browser Compatibility

Works on all modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- localStorage API

## Data Management

### Clearing Sample Data

To clear sample data and start fresh, open browser DevTools Console and run:
```javascript
localStorage.clear();
location.reload();
```

### Exporting Data

To export your data, open DevTools Console:
```javascript
const data = {
  vehicles: JSON.parse(localStorage.getItem('vmt_vehicles')),
  maintenance: JSON.parse(localStorage.getItem('vmt_maintenance'))
};
console.log(JSON.stringify(data, null, 2));
```

### Importing Data

To import data, open DevTools Console:
```javascript
const data = { /* your data object */ };
localStorage.setItem('vmt_vehicles', JSON.stringify(data.vehicles));
localStorage.setItem('vmt_maintenance', JSON.stringify(data.maintenance));
location.reload();
```

## Service Types

Pre-defined service types include:
- Oil Change
- Tire Replacement
- Brake Service
- Battery Replacement
- Engine Service
- AC Service
- General Inspection
- Filter Replacement
- Other

## License

This project is open source and available for personal and commercial use.
