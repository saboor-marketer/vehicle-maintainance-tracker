export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

export const getDaysUntil = (date) => {
  if (!date) return null;
  
  const targetDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);
  
  const diffTime = targetDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

export const getMaintenanceStatus = (maintenance, vehicle) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let status = 'up_to_date';
  let reason = null;

  if (maintenance.nextServiceDate) {
    const nextDate = new Date(maintenance.nextServiceDate);
    nextDate.setHours(0, 0, 0, 0);
    const daysUntil = Math.ceil((nextDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntil < 0) {
      status = 'overdue';
      reason = 'date';
    } else if (daysUntil <= 30) {
      status = 'due_soon';
      reason = 'date';
    }
  }

  if (maintenance.nextServiceMileage && vehicle) {
    const currentMileage = parseFloat(vehicle.currentMileage) || 0;
    const nextMileage = parseFloat(maintenance.nextServiceMileage);
    
    if (currentMileage >= nextMileage) {
      status = 'overdue';
      reason = 'mileage';
    } else if (currentMileage >= nextMileage * 0.9) {
      if (status !== 'overdue') {
        status = 'due_soon';
        reason = 'mileage';
      }
    }
  }

  return { status, reason };
};

export const calculateTotalExpenses = (maintenanceRecords) => {
  if (!maintenanceRecords || maintenanceRecords.length === 0) {
    return 0;
  }
  
  return maintenanceRecords.reduce((total, record) => {
    const cost = parseFloat(record.cost) || 0;
    return total + cost;
  }, 0);
};

export const calculateExpensesByVehicle = (maintenanceRecords, vehicles) => {
  const expenses = {};
  
  vehicles.forEach(vehicle => {
    expenses[vehicle.id] = {
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      total: 0
    };
  });
  
  maintenanceRecords.forEach(record => {
    const cost = parseFloat(record.cost) || 0;
    if (expenses[record.vehicleId]) {
      expenses[record.vehicleId].total += cost;
    }
  });
  
  return Object.values(expenses).filter(e => e.total > 0);
};

export const calculateExpensesByServiceType = (maintenanceRecords) => {
  const expenses = {};
  
  maintenanceRecords.forEach(record => {
    const cost = parseFloat(record.cost) || 0;
    const serviceType = record.serviceType || 'Other';
    
    if (!expenses[serviceType]) {
      expenses[serviceType] = {
        serviceType,
        total: 0,
        count: 0
      };
    }
    
    expenses[serviceType].total += cost;
    expenses[serviceType].count += 1;
  });
  
  return Object.values(expenses).sort((a, b) => b.total - a.total);
};

export const calculateMonthlyExpenses = (maintenanceRecords) => {
  const expenses = {};
  
  maintenanceRecords.forEach(record => {
    const cost = parseFloat(record.cost) || 0;
    const date = new Date(record.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!expenses[monthKey]) {
      expenses[monthKey] = {
        month: monthKey,
        total: 0,
        count: 0
      };
    }
    
    expenses[monthKey].total += cost;
    expenses[monthKey].count += 1;
  });
  
  return Object.values(expenses)
    .sort((a, b) => b.month.localeCompare(a.month))
    .slice(0, 12);
};

export const getVehicleMaintenanceRecords = (vehicleId, maintenanceRecords) => {
  if (!vehicleId) return [];
  return maintenanceRecords.filter(record => record.vehicleId === vehicleId);
};

export const getLastService = (vehicleId, maintenanceRecords) => {
  const vehicleRecords = getVehicleMaintenanceRecords(vehicleId, maintenanceRecords);
  if (vehicleRecords.length === 0) return null;
  
  return vehicleRecords.reduce((latest, record) => {
    const recordDate = new Date(record.date);
    const latestDate = new Date(latest.date);
    return recordDate > latestDate ? record : latest;
  });
};

export const getNextService = (vehicleId, maintenanceRecords, vehicle) => {
  const vehicleRecords = getVehicleMaintenanceRecords(vehicleId, maintenanceRecords);
  if (vehicleRecords.length === 0) return null;
  
  const recordsWithNextService = vehicleRecords.filter(record => 
    record.nextServiceDate || record.nextServiceMileage
  );
  
  if (recordsWithNextService.length === 0) return null;
  
  const today = new Date();
  let nextService = null;
  let minDays = Infinity;
  
  recordsWithNextService.forEach(record => {
    if (record.nextServiceDate) {
      const nextDate = new Date(record.nextServiceDate);
      const daysUntil = Math.ceil((nextDate - today) / (1000 * 60 * 60 * 24));
      
      if (daysUntil >= 0 && daysUntil < minDays) {
        minDays = daysUntil;
        nextService =	record;
      }
    }
  });
  
  return nextService;
};

export const sortMaintenanceRecords = (records, sortBy) => {
  const sorted = [...records];
  
  switch (sortBy) {
    case 'date_newest':
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'date_oldest':
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case 'cost_highest':
      sorted.sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost));
      break;
    case 'cost_lowest':
      sorted.sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost));
      break;
    case 'mileage_highest':
      sorted.sort((a, b) => parseFloat(b.mileage) - parseFloat(a.mileage));
      break;
    case 'mileage_lowest':
      sorted.sort((a, b) => parseFloat(a.mileage) - parseFloat(b.mileage));
      break;
    default:
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  
  return sorted;
};

export const filterMaintenanceRecords = (records, filters) => {
  let filtered = [...records];
  
  if (filters.vehicleId) {
    filtered = filtered.filter(record => record.vehicleId === filters.vehicleId);
  }
  
  if (filters.serviceType) {
    filtered = filtered.filter(record => record.serviceType === filters.serviceType);
  }
  
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(record => {
      return (
        record.serviceType?.toLowerCase().includes(query) ||
        record.serviceProvider?.toLowerCase().includes(query) ||
        record.description?.toLowerCase().includes(query)
      );
    });
  }
  
  if (filters.status) {
    filtered = filtered.filter(record => {
      const { status } = getMaintenanceStatus(record);
      return status === filters.status;
    });
  }
  
  return filtered;
};
