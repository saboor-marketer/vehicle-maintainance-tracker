export const validateVehicle = (vehicle) => {
  const errors = {};

  if (!vehicle.name || vehicle.name.trim() === '') {
    errors.name = 'Vehicle name is required';
  }

  if (!vehicle.make || vehicle.make.trim() === '') {
    errors.make = 'Make is required';
  }

  if (!vehicle.model || vehicle.model.trim() === '') {
    errors.model = 'Model is required';
  }

  if (!vehicle.year || vehicle.year.trim() === '') {
    errors.year = 'Year is required';
  } else {
    const yearNum = parseInt(vehicle.year);
    const currentYear = new Date().getFullYear();
    if (isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear + 1) {
      errors.year = `Year must be between 1900 and ${currentYear + 1}`;
    }
  }

  if (!vehicle.registrationNumber || vehicle.registrationNumber.trim() === '') {
    errors.registrationNumber = 'Registration number is required';
  }

  if (vehicle.mileage === '' || vehicle.mileage === null || vehicle.mileage === undefined) {
    errors.mileage = 'Mileage is required';
  } else {
    const mileageNum = parseFloat(vehicle.mileage);
    if (isNaN(mileageNum) || mileageNum < 0) {
      errors.mileage = 'Mileage must be 0 or greater';
    }
  }

  return errors;
};

export const validateMaintenance = (maintenance, vehicles) => {
  const errors = {};

  if (!maintenance.vehicleId || maintenance.vehicleId.trim() === '') {
    errors.vehicleId = 'Vehicle is required';
  } else if (vehicles && !vehicles.find(v => v.id === maintenance.vehicleId)) {
    errors.vehicleId = 'Selected vehicle does not exist';
  }

  if (!maintenance.serviceType || maintenance.serviceType.trim() === '') {
    errors.serviceType = 'Service type is required';
  }

  if (!maintenance.date || maintenance.date.trim() === '') {
    errors.date = 'Date is required';
  } else {
    const dateObj = new Date(maintenance.date);
    if (isNaN(dateObj.getTime())) {
      errors.date = 'Invalid date';
    }
  }

  if (maintenance.mileage === '' || maintenance.mileage === null || maintenance.mileage === undefined) {
    errors.mileage = 'Mileage is required';
  } else {
    const mileageNum = parseFloat(maintenance.mileage);
    if (isNaN(mileageNum) || mileageNum < 0) {
      errors.mileage = 'Mileage must be 0 or greater';
    }
  }

  if (maintenance.cost === '' || maintenance.cost === null || maintenance.cost === undefined) {
    errors.cost = 'Cost is required';
  } else {
    const costNum = parseFloat(maintenance.cost);
    if (isNaN(costNum) || costNum < 0) {
      errors.cost = 'Cost must be 0 or greater';
    }
  }

  if (maintenance.nextServiceMileage !== '' && maintenance.nextServiceMileage !== null && maintenance.nextServiceMileage !== undefined) {
    const nextMileageNum = parseFloat(maintenance.nextServiceMileage);
    if (isNaN(nextMileageNum) || nextMileageNum < 0) {
      errors.nextServiceMileage = 'Next service mileage must be 0 or greater';
    }
  }

  return errors;
};

export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};
