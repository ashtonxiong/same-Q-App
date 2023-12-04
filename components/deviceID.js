import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Create a context
const DeviceIdentifierContext = createContext();

// Create a provider component that manages the deviceIdentifier state
export const DeviceIdentifierProvider = ({ children }) => {
  const [deviceIdentifier, setDeviceIdentifier] = useState('');

  useEffect(() => {
    const generatedDeviceId = uuidv4();
    setDeviceIdentifier(generatedDeviceId);
  }, []);

  return (
    <DeviceIdentifierContext.Provider value={deviceIdentifier}>
      {children}
    </DeviceIdentifierContext.Provider>
  );
};

// Custom hook to access the deviceIdentifier from any component
export const useDeviceIdentifier = () => {
  return useContext(DeviceIdentifierContext);
};
