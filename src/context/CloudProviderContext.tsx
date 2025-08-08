import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface CloudProviderContextType {
  cloudProvider: string;
  setCloudProvider: (provider: string) => void;
}

const CloudProviderContext = createContext<
  CloudProviderContextType | undefined
>(undefined);

export const CloudProviderProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // Initialize state from localStorage or default to "AWS"
  const [cloudProvider, setCloudProvider] = useState<string>(() => {
    return localStorage.getItem("cloudProvider") || "none";
  });

  // Persist cloudProvider to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cloudProvider", cloudProvider);
  }, [cloudProvider]);

  return (
    <CloudProviderContext.Provider value={{ cloudProvider, setCloudProvider }}>
      {children}
    </CloudProviderContext.Provider>
  );
};

export const useCloudProvider = () => {
  const context = useContext(CloudProviderContext);
  if (!context) {
    throw new Error(
      "useCloudProvider must be used within a CloudProviderProvider"
    );
  }
  return context;
};
