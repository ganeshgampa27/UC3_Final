// import React, { useState, useEffect } from 'react';
// import { useNavigate, Outlet } from 'react-router-dom'; // Add Outlet import
// import Header from './Header';
// import Sidebar from './Sidebar';
 
// const DashboardPage = () => {
//   const [currentUser, setCurrentUser] = useState<any>(null);
//   const [selectedProvider, setSelectedProvider] = useState('all');
 
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();
 
//   useEffect(() => {
//     const userRole = localStorage.getItem('role');
//     const userName = localStorage.getItem('fullName');
   
//     if (!userRole) {
//       navigate('/login');
//       return;
//     }
 
//     // const role = userRoles.find(r => r.id === userRole);
//     setCurrentUser(userName);
//   }, [navigate]);
 
//   const handleLogout = () => {
//     localStorage.removeItem('role');
//     localStorage.removeItem('fullName');
//     navigate('/');
//   };
 
//   const handleProviderChange = (provider: string) => {
//     setSelectedProvider(provider);
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
//         <Sidebar
//           currentUser={currentUser}
//           isMobileMenuOpen={isMobileMenuOpen}
//           setIsMobileMenuOpen={setIsMobileMenuOpen}
//           selectedProvider={selectedProvider}
//           onCloudChange={handleProviderChange}
//               />
       
//         {/* Add main content area with Outlet */}
//         <main className="flex-1 md:ml-64 mt-16 p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };
 
// export default DashboardPage;






import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(''); // Add state for userRole

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const userName = localStorage.getItem('fullName');

    if (!storedRole) {
      navigate('/login');
      return;
    }

    setUserRole(storedRole); // Set userRole from localStorage
    setCurrentUser(userName);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
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
        <Sidebar
          currentUser={currentUser}
          userRole={userRole} // Pass dynamic userRole
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
    
        />
        <main className="flex-1 md:ml-64 mt-16 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;