// import { userRoles } from '@/mock/data';
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import Header from './Header';
// import { AppSidebar } from './admin_components/AppSidebar';
// import { SidebarProvider } from './ui/sidebar';

// function AdminDashboard() {

//   const [currentUser, setCurrentUser] = useState<any>(null);
//   const [selectedProvider, setSelectedProvider] = useState('all');
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userRole = localStorage.getItem('userRole');
//     const userName = localStorage.getItem('userName');
    
//     if (!userRole) {
//       navigate('/login');
//       return;
//     }

//     // For Manager Dashboard, ensure user is a manager
//     if (userRole !== 'admin') {
//       navigate('/dashboard'); // Redirect to regular dashboard if not manager
//       return;
//     }

//     const role = userRoles.find(r => r.id === userRole);
//     setCurrentUser({ ...role, username: userName });
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('userName');
//     navigate('/');
//   };

//   const handleProviderChange = (provider: string) => {
//     setSelectedProvider(provider);
//     if (provider === 'add-new') {
//       console.log('Add new service functionality');
//       setSelectedProvider('all');
//     }
//   };

//   if (!currentUser) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-hero">
//         <div className="text-center">
//           <div className="w-8 h-8 animate-spin border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
//           <p className="text-muted-foreground">Loading...</p>
//         </div>
//       </div>
//     );
//   }



  
//   return (
//     <div>
//        <Header
//         currentUser={currentUser}
//         selectedProvider={selectedProvider}
//         onProviderChange={handleProviderChange}
//         onLogout={handleLogout}
//         isMobileMenuOpen={isMobileMenuOpen}
//         setIsMobileMenuOpen={setIsMobileMenuOpen}
//       />
      
      
// <SidebarProvider>
//               <div className="min-h-screen flex w-full bg-background">
//                 <AppSidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
//                 <div className={`flex-1 flex flex-col ${isSidebarCollapsed ? "ml-[-13rem]" : "ml-50"} transition-all duration-300`}>
                
              
//                 </div>
//               </div>
//             </SidebarProvider>
       
//     </div>
    
//   )
// }

// export default AdminDashboard


import { userRoles } from '@/mock/data';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { AppSidebar } from './admin_components/AppSidebar';
import { SidebarProvider } from './ui/sidebar';
import AzureCostCenter from './services/admin services/AzureCostCenter';
import AwsCostCenter from './services/admin services/AwsCostCenter';
import GcpCostCenter from './services/admin services/Gcp';
import Dashboard from './services/admin services/Dashboard';
import { CloudServiceProvider } from './admin_components/CloudServiceProvider';

// Import your component pages (you'll need to create these)

function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [activeTab, setActiveTab] = useState('dashboard'); // This will control which component to show
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    const userName = localStorage.getItem('fullName');
    
    if (!userRole) {
      navigate('/login');
      return;
    }

    // For Admin Dashboard, ensure user is an admin
    if (userRole !== 'Admin') {
      navigate('/dashboard'); // Redirect to regular dashboard if not admin
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
    if (provider === 'add-new') {
      console.log('Add new service functionality');
      setSelectedProvider('all');
    }
  };

  // Function to handle navigation from sidebar
  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
  };

  // Function to render the active component based on activeTab
  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'cost-centers-azure':
        return <AzureCostCenter />;
      case 'cost-centers-aws':
        return <AwsCostCenter />;
      case 'cost-centers-gcp':
        return <GcpCostCenter />;
      default:
        return <Dashboard/>;
    }
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
      
return (
  <CloudServiceProvider>
    <div className="relative">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header 
          // currentUser={currentUser}
          selectedProvider={selectedProvider}
          onProviderChange={handleProviderChange}
          onLogout={handleLogout}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </div>

      {/* Sidebar and Main Content */}
      <SidebarProvider>
        <div className="pt-[4.5rem] min-h-screen flex w-full bg-background">
          <AppSidebar 
            isCollapsed={isSidebarCollapsed} 
            setIsCollapsed={setIsSidebarCollapsed}
            activeTab={activeTab}
            onNavigate={handleNavigation}
          />
          
          <div className={`flex-1 flex flex-col transition-all duration-300`}>
            <main className="flex-1 p-6 overflow-auto   bg-gradient-hero">
              {renderActiveComponent()}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  </CloudServiceProvider>
);

}

export default AdminDashboard;