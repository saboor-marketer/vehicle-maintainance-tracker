import { useState, useEffect } from 'react';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage';
import { sampleMaintenanceRecords } from '../data/sampleData';
import { generateId } from '../utils/helpers';

export const useMaintenance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getFromStorage(STORAGE_KEYS.MAINTENANCE);
    const sampleDataLoaded = getFromStorage(STORAGE_KEYS.SAMPLE_DATA_LOADED, false);

    if (stored) {
      setRecords(stored);
    } else if (!sampleDataLoaded) {
      setRecords(sampleMaintenanceRecords);
      saveToStorage(STORAGE_KEYS.MAINTENANCE, sampleMaintenanceRecords);
    }

    setLoading(false);
  }, []);

  const addRecord = (record) => {
    const newRecord = {
      ...record,
      id: generateId(),
      cost: parseFloat(record.cost) || 0,
      mileage: parseFloat(record.mileage) || 0,
      nextServiceMileage: record.nextServiceMileage ? parseFloat(record.nextServiceMileage) : null
    };
    const updated = [...records, newRecord];
    setRecords(updated);
    saveToStorage(STORAGE_KEYS.MAINTENANCE, updated);
    return newRecord;
  };

  const updateRecord = (id, updatedRecord) => {
    const updated = records.map(r => 
      r.id === id 
        ? { 
            ...r, 
            ...updatedRecord, 
            cost: parseFloat(updatedRecord.cost) || 0,
            mileage: parseFloat(updatedRecord.mileage) || 0,
            nextServiceMileage: updatedRecord.nextServiceMileage ? parseFloat(updatedRecord.nextServiceMileage) : null
          }
        : r
    );
    setRecords(updated);
    saveToStorage(STORAGE_KEYS.MAINTENANCE, updated);
  };

  const deleteRecord = (id) => {
    const updated = records.filter(r => r.id !== id);
    setRecords(updated);
    saveToStorage(STORAGE_KEYS.MAINTENANCE, updated);
  };

  const getRecord = (id) => {
    return records.find(r => r.id === id) || null;
  };

  const getRecordsByVehicle = (vehicleId) => {
    return records.filter(r => r.vehicleId === vehicleId);
  };

  const deleteRecordsByVehicle = (vehicleId) => {
    const updated = records.filter(r => r.vehicleId !== vehicleId);
    setRecords(updated);
    saveToStorage(STORAGE_KEYS.MAINTENANCE, updated);
  };

  const clearSampleData = () => {
    setRecords([]);
    saveToStorage(STORAGE_KEYS.MAINTENANCE, []);
  };

  return {
    records,
    loading,
    addRecord,
    updateRecord,
    deleteRecord,
    getRecord,
    getRecordsByVehicle,
    deleteRecordsByVehicle,
    clearSampleData
  };
};
