import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userRoles } from '../mock/data';
import Header from './Header';
import Sidebar from './Sidebar';
import OverviewPage from './OverviewPage';
import RequestsPage from './RequestsPage';
import ApprovedServices from './ApprovedServices';
import InfrastructurePage from './InfrastructurePage';
import EC2ServicePage from './services/EC2ServicePage';
import S3ServicePage from './services/S3ServicePage';
import RDSServicePage from './services/RDSServicePage';
import LambdaServicePage from './services/LambdaServicePage';
import CloudFrontServicePage from './services/CloudFrontServicePage';
import IAMServicePage from './services/IAMServicePage';
import VirtualMachinesServicePage from './services/azure/VirtualMachinesServicePage';
import BlobStorageServicePage from './services/azure/BlobStorageServicePage';
import SQLDatabaseServicePage from './services/azure/SQLDatabaseServicePage';
import FunctionsServicePage from './services/azure/FunctionsServicePage';
import ComputeEngineServicePage from './services/gcp/ComputeEngineServicePage';
import CloudStorageServicePage from './services/gcp/CloudStorageServicePage';
import AddServicePage from './AddServicePage';

const DashboardPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    
    if (!userRole) {
      navigate('/login');
      return;
    }

    const role = userRoles.find(r => r.id === userRole);
    setCurrentUser({ ...role, username: userName });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const handleProviderChange = (provider: string) => {
    setSelectedProvider(provider);
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-hero">
        <div className="text-center">
          <div className="w-8 h-8 animate-spin border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPage currentUser={currentUser} selectedProvider={selectedProvider} setActiveTab={setActiveTab} />;
      case 'requests':
        return <RequestsPage currentUser={currentUser} selectedProvider={selectedProvider} />;
      case 'infrastructure':
        return <InfrastructurePage selectedProvider={selectedProvider} onCloudChange={handleProviderChange} />;
      case 'infrastructure/ec2':
        return <EC2ServicePage />;
      case 'infrastructure/s3':
        return <S3ServicePage />;
      case 'infrastructure/rds':
        return <RDSServicePage />;
      case 'infrastructure/lambda':
        return <LambdaServicePage />;
      case 'infrastructure/cloudfront':
        return <CloudFrontServicePage />;
      case 'infrastructure/iam':
        return <IAMServicePage />;
      case 'infrastructure/virtual-machines':
        return <VirtualMachinesServicePage />;
      case 'infrastructure/blob-storage':
        return <BlobStorageServicePage />;
      case 'infrastructure/sql-database':
        return <SQLDatabaseServicePage />;
      case 'infrastructure/functions':
        return <FunctionsServicePage />;
      case 'infrastructure/compute-engine':
        return <ComputeEngineServicePage />;
      case 'infrastructure/cloud-storage':
        return <CloudStorageServicePage />;
      case 'add-service':
        return <AddServicePage />;
      case 'approved-services':
        return <ApprovedServices selectedProvider={selectedProvider} />;
      default:
        return <OverviewPage currentUser={currentUser} selectedProvider={selectedProvider} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header 
        currentUser={currentUser}
        selectedProvider={selectedProvider}
        onProviderChange={handleProviderChange}
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <div className="flex">
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          selectedProvider={selectedProvider}
          onCloudChange={handleProviderChange}
        />
        
        <div className="flex-1 md:ml-64 p-6 mt-16">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;