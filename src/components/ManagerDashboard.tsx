// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import { 
//   LayoutDashboard, 
//   Clock, 
//   AlertCircle,
//   Users,
//   Shield
// } from 'lucide-react';
// import { userRoles } from '../mock/data';
// import Header from './Header';
// import OverviewPage from './OverviewPage';
// import RoleManagement from './RoleManagementPage';
// import TeamManagementPage from './TeamManagementPage';
// import RequestHistoryPage from './RequestHistoryPage';
// import ApprovalsPage from './ApprovalsPage';



// const ManagerDashboard = () => {
//   const [currentUser, setCurrentUser] = useState<any>(null);
//   const [selectedProvider, setSelectedProvider] = useState('all');
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userRole = localStorage.getItem('role');
//     const userName = localStorage.getItem('fullName');
    
//     if (!userRole) {
//       navigate('/login');
//       return;
//     }

//     // For Manager Dashboard, ensure user is a manager
//     if (userRole !== 'Manager') {
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

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <OverviewPage currentUser={currentUser} selectedProvider={selectedProvider} setActiveTab={setActiveTab} />;
//       case 'request-history':
//         return <RequestHistoryPage currentUser={currentUser} selectedProvider={selectedProvider} />;
//       case 'approvals':
//         return <ApprovalsPage currentUser={currentUser} selectedProvider={selectedProvider} />;
//       case 'role-management':
//         return <RoleManagement currentUser={currentUser} selectedProvider={selectedProvider} />;
//       case 'team-management':
//         return <TeamManagementPage currentUser={currentUser} selectedProvider={selectedProvider} />;
//       default:
//         return <OverviewPage currentUser={currentUser} selectedProvider={selectedProvider} setActiveTab={setActiveTab} />;
//     }
//   };

//   // Custom Sidebar component for Manager Dashboard with specific tabs
//   const ManagerSidebar = ({ activeTab, setActiveTab, currentUser, isMobileMenuOpen, setIsMobileMenuOpen }: any) => {
//     const navItems = [
//       {
//         id: 'dashboard',
//         label: 'Overview',
//         icon: LayoutDashboard,
//         badge: null,
//         permissions: ['view_resources']
//       },
//       {
//         id: 'request-history', 
//         label: 'Request History',
//         icon: Clock,
//         badge: null,
//         permissions: ['view_resources']
//       },
//       {
//         id: 'approvals',
//         label: 'Approvals', 
//         icon: AlertCircle,
//         badge: 8,
//         permissions: ['approve_requests']
//       },
//       {
//         id: 'role-management',
//         label: 'Role Management',
//         icon: Users,
//         badge: null,
//         permissions: ['manage_team']
//       },
//       {
//         id: 'team-management',
//         label: 'Team Management',
//         icon: Users,
//         badge: null,
//         permissions: ['manage_team']
//       }
//     ];

//     const handleNavClick = (itemId: string) => {
//       setActiveTab(itemId);
//       if (isMobileMenuOpen) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     const SidebarContent = () => (
//       <div className="flex-1 flex flex-col overflow-y-auto">
//         <div className="p-4">
//           <div className="mb-6">
//             <div className="flex items-center space-x-2 mb-2">
//               <Shield className="w-5 h-5 text-primary" />
//               <span className="text-sm font-medium text-foreground">Manager Portal</span>
//             </div>
//             <Badge variant="secondary" className="text-xs font-mono bg-primary-light text-primary">
//               {currentUser?.name}
//             </Badge>
//           </div>

//           <nav className="space-y-1">
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = activeTab === item.id;
//               const hasPermission = item.permissions.some(permission => 
//                 currentUser?.permissions?.includes(permission)
//               );

//               if (!hasPermission) return null;

//               return (
//                 <Button
//                   key={item.id}
//                   variant={isActive ? 'default' : 'ghost'}
//                   className={`w-full justify-start h-10 px-3 ${
//                     isActive 
//                       ? 'bg-primary text-primary-foreground shadow-soft' 
//                       : 'text-muted-foreground hover:bg-accent hover:text-foreground'
//                   }`}
//                   onClick={() => handleNavClick(item.id)}
//                 >
//                   <Icon className="w-4 h-4 mr-3" />
//                   <span className="flex-1 text-left">{item.label}</span>
//                   {item.badge && (
//                     <Badge 
//                       variant={isActive ? 'secondary' : 'outline'} 
//                       className={`text-xs ml-2 ${
//                         isActive ? 'bg-primary-foreground text-primary' : 'border-primary text-primary'
//                       }`}
//                     >
//                       {item.badge}
//                     </Badge>
//                   )}
//                 </Button>
//               );
//             })}
//           </nav>
//         </div>
//       </div>
//     );

//     return (
//       <>
//         {/* Desktop Sidebar */}
//         <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 md:top-16 md:bg-background md:border-r md:border-border">
//           <SidebarContent />
//         </div>

//         {/* Mobile Sidebar */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
//             <div className="fixed inset-y-0 left-0 w-64 bg-background shadow-large border-r border-border">
//               <div className="flex-1 flex flex-col overflow-y-auto pt-20">
//                 <SidebarContent />
//               </div>
//             </div>
//           </div>
//         )}
//       </>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-hero">
//       <Header 
//         currentUser={currentUser}
//         selectedProvider={selectedProvider}
//         onProviderChange={handleProviderChange}
//         onLogout={handleLogout}
//         isMobileMenuOpen={isMobileMenuOpen}
//         setIsMobileMenuOpen={setIsMobileMenuOpen}
//       />
      
//       <div className="flex">
//         <ManagerSidebar 
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           currentUser={currentUser}
//           isMobileMenuOpen={isMobileMenuOpen}
//           setIsMobileMenuOpen={setIsMobileMenuOpen}
//         />
        
//         <div className="flex-1 md:ml-64 p-6 mt-16">
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManagerDashboard;


// -----------using api

import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Header from './Header';
import ManagerSidebar from './ManagerSidebar';

const ManagerDashboard = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    const userName = localStorage.getItem('fullName');
    
    if (!userRole) {
      navigate('/login');
      return;
    }

    // For Manager Dashboard, ensure user is a manager
    if (userRole !== 'Manager') {
      navigate('/dashboard'); // Redirect to regular dashboard if not manager
      return;
    }

    // const role = userRoles.find(r => r.id === userRole);
    setCurrentUser({ role:userRole, username: userName });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/');
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
    <div className="min-h-screen bg-gradient-hero">
      <Header 
        currentUser={currentUser}
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <div className="flex">
        <ManagerSidebar 
        
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        
        <div className="flex-1 md:ml-64 p-6 mt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;