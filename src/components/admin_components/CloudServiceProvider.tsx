// import React, { createContext, useContext, useState } from 'react';

// export type CloudService = 'all' | 'aws' | 'azure' | 'gcp';

// interface CloudServiceContextType {
//   selectedService: CloudService;
//   setSelectedService: (service: CloudService) => void;
// }

// const CloudServiceContext = createContext<CloudServiceContextType | undefined>(undefined);

// export function CloudServiceProvider({ children }: { children: React.ReactNode }) {
//   const [selectedService, setSelectedService] = useState<CloudService>('all');

//   return (
//     <CloudServiceContext.Provider value={{ selectedService, setSelectedService }}>
//       {children}
//     </CloudServiceContext.Provider>
//   );
// }

// export function useCloudService() {
//   const context = useContext(CloudServiceContext);
//   if (context === undefined) {
//     throw new Error('useCloudService must be used within a CloudServiceProvider');
//   }
//   return context;
// }