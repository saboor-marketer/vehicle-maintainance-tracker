import { generateId } from '../utils/helpers';

export const sampleVehicles = [
  {
    id: generateId(),
    name: 'Family Car',
    make: 'Toyota',
    model: 'Camry',
    year: '2020',
    registrationNumber: 'ABC-1234',
    currentMileage: 45000,
    fuelType: 'Gasoline',
    color: 'Silver',
    purchaseDate: '2020-03-15',
    notes: 'Primary family vehicle'
  },
  {
    id: generateId(),
    name: 'Work Truck',
    make: 'Ford',
    model: 'F-150',
    year: '2019',
    registrationNumber: 'XYZ-5678',
    currentMileage: 68000,
    fuelType: 'Gasoline',
    color: 'Blue',
    purchaseDate: '2019-07-20',
    notes: 'Used for construction work'
  }
];

export const sampleMaintenanceRecords = [
  {
    id: generateId(),
    vehicleId: sampleVehicles[0].id,
    serviceType: 'Oil Change',
    date: '2024-01-15',
    mileage: 42000,
    cost: 65.00,
    serviceProvider: 'QuickLube',
    description: 'Regular oil change with synthetic oil',
    nextServiceDate: '2024-07-15',
    nextServiceMileage: 48000
  },
  {
    id: generateId(),
    vehicleId: sampleVehicles[0].id,
    serviceType: 'Tire Replacement',
    date: '2023-11-20',
    mileage: 38000,
    cost: 450.00,
    serviceProvider: 'Tire Kingdom',
    description: 'Replaced all four tires',
    nextServiceDate: '2026-11-20',
    nextServiceMileage: 88000
  },
  {
    id: generateId(),
    vehicleId: sampleVehicles[1].id,
    serviceType: 'Brake Service',
    date: '2024-02-10',
    mileage: 65000,
    cost: 320.00,
    serviceProvider: 'AutoZone',
    description: 'Front brake pad replacement and rotor resurfacing',
    nextServiceDate: '2025-02-10',
    nextServiceMileage: 85000
  },
  {
    id: generateId(),
    vehicleId: sampleVehicles[1].id,
    serviceType: 'Battery Replacement',
    date: '2023-08-05',
    mileage: 55000,
    cost: 180.00,
    serviceProvider: 'NAPA Auto Parts',
    description: 'New battery installation',
    nextServiceDate: '2026-08-05',
    nextServiceMileage: 105000
  },
  {
    id: generateId(),
    vehicleId: sampleVehicles[0].id,
    serviceType: 'General Inspection',
    date: '2024-03-01',
    mileage: 44000,
    cost: 50.00,
    serviceProvider: 'Toyota Dealership',
    description: 'Annual safety inspection',
    nextServiceDate: '2025-03-01',
    nextServiceMileage: 54000
  }
];
