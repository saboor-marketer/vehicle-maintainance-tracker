import { useState, useEffect } from 'react';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage';
import { sampleVehicles } from '../data/sampleData';
import { generateId } from '../utils/helpers';

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getFromStorage(STORAGE_KEYS.VEHICLES);
    const sampleDataLoaded = getFromStorage(STORAGE_KEYS.SAMPLE_DATA_LOADED, false);

    if (stored) {
      setVehicles(stored);
    } else if (!sampleDataLoaded) {
      setVehicles(sampleVehicles);
      saveToStorage(STORAGE_KEYS.VEHICLES, sampleVehicles);
      saveToStorage(STORAGE_KEYS.SAMPLE_DATA_LOADED, true);
    }

    setLoading(false);
  }, []);

  const addVehicle = (vehicle) => {
    const newVehicle = {
      ...vehicle,
      id: generateId(),
      currentMileage: parseFloat(vehicle.currentMileage) || 0
    };
    const updated = [...vehicles, newVehicle];
    setVehicles(updated);
    saveToStorage(STORAGE_KEYS.VEHICLES, updated);
    return newVehicle;
  };

  const updateVehicle = (id, updatedVehicle) => {
    const updated = vehicles.map(v => 
      v.id === id 
        ? { ...v, ...updatedVehicle, currentMileage: parseFloat(updatedVehicle.currentMileage) || 0 }
        : v
    );
    setVehicles(updated);
    saveToStorage(STORAGE_KEYS.VEHICLES, updated);
  };

  const deleteVehicle = (id) => {
    const updated = vehicles.filter(v => v.id !== id);
    setVehicles(updated);
    saveToStorage(STORAGE_KEYS.VEHICLES, updated);
  };

  const getVehicle = (id) => {
    return vehicles.find(v => v.id === id) || null;
  };

  const clearSampleData = () => {
    setVehicles([]);
    saveToStorage(STORAGE_KEYS.VEHICLES, []);
  };

  return {
    vehicles,
    loading,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    getVehicle,
    clearSampleData
  };
};
