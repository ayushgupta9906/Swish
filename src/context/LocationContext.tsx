import React, { createContext, useContext, useState } from 'react';

interface LocationContextType {
  currentLocation: string | null;
  setCurrentLocation: (location: string) => void;
  locationModal: boolean;
  setLocationModal: (show: boolean) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [locationModal, setLocationModal] = useState(false);

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        setCurrentLocation,
        locationModal,
        setLocationModal,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}