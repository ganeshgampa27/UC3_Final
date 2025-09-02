// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import {
//   LayoutDashboard,
//   FileText,
//   CheckCircle,
//   Settings,
//   Cloud,
//   ChevronDown,
//   ChevronRight,
//   Server,
//   Database,
//   Zap,
//   Shield
// } from 'lucide-react';
 
// interface SidebarProps {
//   currentUser: any;
//   isMobileMenuOpen: boolean;
//   setIsMobileMenuOpen: (open: boolean) => void;
//   selectedProvider: string;
//   onCloudChange: (provider: string) => void;
// }
 
// const Sidebar: React.FC<SidebarProps> = ({
//   currentUser,
//   isMobileMenuOpen,
//   setIsMobileMenuOpen,
//   selectedProvider,
//   onCloudChange
// }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [infrastructureOpen, setInfrastructureOpen] = React.useState(false);
 
//   const getCloudServices = () => {
//     if (selectedProvider === 'all' || selectedProvider === 'aws') {
//       return [
//         { id: 'ec2', name: 'EC2', icon: Server, route: '/dashboard/infrastructure/ec2' },
//         { id: 's3', name: 'S3', icon: Database, route: '/dashboard/infrastructure/s3' },
//         { id: 'rds', name: 'RDS', icon: Database, route: '/dashboard/infrastructure/rds' },
//         { id: 'lambda', name: 'Lambda', icon: Zap, route: '/dashboard/infrastructure/lambda' }
//       ];
//     } else if (selectedProvider === 'azure') {
//       return [
//         { id: 'vm', name: 'Virtual Machines', icon: Server, route: '/dashboard/infrastructure/vm' },
//         { id: 'storage', name: 'Storage', icon: Database, route: '/dashboard/infrastructure/storage' },
//         { id: 'sql', name: 'SQL Database', icon: Database, route: '/dashboard/infrastructure/sql' }
//       ];
//     } else if (selectedProvider === 'gcp') {
//       return [
//         { id: 'compute', name: 'Compute Engine', icon: Server, route: '/dashboard/infrastructure/compute' },
//         { id: 'storage', name: 'Cloud Storage', icon: Database, route: '/dashboard/infrastructure/storage' },
//         { id: 'sql', name: 'Cloud SQL', icon: Database, route: '/dashboard/infrastructure/sql' }
//       ];
//     }
//     return [];
//   };
 
//   const navItems = [
//     {
//       id: 'overview',
//       label: 'Overview',
//       icon: LayoutDashboard,
//       badge: null,
//       route: '/dashboard/overview'
//     },
//     {
//       id: 'approved-services',
//       label: 'Approved Services',
//       icon: CheckCircle,
//       badge: null,
//       route: '/dashboard/approved-services'
//     },
//     {
//       id: 'requests',
//       label: 'Request History',
//       icon: FileText,
//       badge: null,
//       route: '/dashboard/requests'
//     }  
//   ];
 
//   const handleNavClick = (itemId: string, route?: string) => {
//     if (itemId === 'infrastructure') {
//       setInfrastructureOpen(!infrastructureOpen);
//     } else if (route) {
//       navigate(route);
//       if (isMobileMenuOpen) {
//         setIsMobileMenuOpen(false);
//       }
//     }
//   };
 
//   const handleServiceClick = (route: string) => {
//     navigate(route);
//     if (isMobileMenuOpen) {
//       setIsMobileMenuOpen(false);
//     }
//   };
 
//   const isActiveRoute = (route: string) => {
//     return location.pathname === route;
//   };
 
//   const isInfrastructureActive = () => {
//     return location.pathname.startsWith('/dashboard/infrastructure');
//   };
 
//   // Auto-expand infrastructure menu if user is on an infrastructure route
//   React.useEffect(() => {
//     if (isInfrastructureActive()) {
//       setInfrastructureOpen(true);
//     }
//   }, [location.pathname]);
 
//   const SidebarContent = () => (
//     <div className="flex-1 flex flex-col overflow-y-auto">
//       <div className="p-4">
//         <div className="mb-6">
//           <div className="flex items-center space-x-2 mb-2">
//             <Shield className="w-5 h-5 text-primary" />
//             <span className="text-sm font-medium text-foreground">Employee Portal</span>
//           </div>
//           <Badge variant="secondary" className="text-xs font-mono bg-primary-light text-primary">
//             {currentUser}
//           </Badge>
//         </div>
 
//         <nav className="space-y-1">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = isActiveRoute(item.route);
 
//             return (
//               <Button
//                 key={item.id}
//                 variant={isActive ? 'default' : 'ghost'}
//                 className={`w-full justify-start h-10 px-3 ${
//                   isActive
//                     ? 'bg-primary text-primary-foreground shadow-soft'
//                     : 'text-muted-foreground hover:bg-accent hover:text-foreground'
//                 }`}
//                 onClick={() => handleNavClick(item.id, item.route)}
//               >
//                 <Icon className="w-4 h-4 mr-3" />
//                 <span className="flex-1 text-left">{item.label}</span>
//                 {item.badge && (
//                   <Badge
//                     variant={isActive ? 'secondary' : 'outline'}
//                     className={`text-xs ml-2 ${
//                       isActive ? 'bg-primary-foreground text-primary' : 'border-primary text-primary'
//                     }`}
//                   >
//                     {item.badge}
//                   </Badge>
//                 )}
//               </Button>
//             );
//           })}
 
//           {/* Infrastructure Section */}
//           <div>
//             <Button
//               variant={isInfrastructureActive() ? 'default' : 'ghost'}
//               className={`w-full justify-start h-10 px-3 ${
//                 isInfrastructureActive()
//                   ? 'bg-primary text-primary-foreground shadow-soft'
//                   : 'text-muted-foreground hover:bg-accent hover:text-foreground'
//               }`}
//               onClick={() => handleNavClick('infrastructure')}
//             >
//               <Cloud className="w-4 h-4 mr-3" />
//               <span className="flex-1 text-left">Infrastructure</span>
//               {infrastructureOpen ?
//                 <ChevronDown className="w-4 h-4" /> :
//                 <ChevronRight className="w-4 h-4" />
//               }
//             </Button>
 
//             {infrastructureOpen && (
//               <div className="ml-6 mt-1 space-y-1">
//                 {getCloudServices().map((service) => {
//                   const ServiceIcon = service.icon;
//                   const isActive = isActiveRoute(service.route);
                 
//                   return (
//                     <Button
//                       key={service.id}
//                       variant={isActive ? 'default' : 'ghost'}
//                       size="sm"
//                       className={`w-full justify-start h-8 px-3 ${
//                         isActive
//                           ? 'bg-primary text-primary-foreground'
//                           : 'text-muted-foreground hover:bg-accent hover:text-foreground'
//                       }`}
//                       onClick={() => handleServiceClick(service.route)}
//                     >
//                       <ServiceIcon className="w-3 h-3 mr-2" />
//                       <span className="text-sm">{service.name}</span>
//                     </Button>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
 
//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 md:top-16 md:bg-background md:border-r md:border-border">
//         <SidebarContent />
//       </div>
 
//       {/* Mobile Sidebar */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
//           <div className="fixed inset-y-0 left-0 w-64 bg-background shadow-large border-r border-border">
//             <div className="flex-1 flex flex-col overflow-y-auto pt-20">
//               <SidebarContent />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
 
// export default Sidebar;
 


import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  LayoutDashboard,
  FileText,
  CheckCircle,
  Settings,
  Cloud,
  ChevronDown,
  ChevronRight,
  Server,
  Database,
  Zap,
  Shield
} from 'lucide-react';
 
interface SidebarProps {
  currentUser: any;
  userRole: string;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;


}
 
const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  userRole,
  isMobileMenuOpen,
  setIsMobileMenuOpen,

}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [infrastructureOpen, setInfrastructureOpen] = React.useState(false);
  const [roleServices, setRoleServices] = React.useState<string[]>([]);
 const selectedProvider=localStorage.getItem("cloudProvider")
  React.useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('https://tkvbq8wok6.execute-api.ap-south-1.amazonaws.com/get_roles');
        const data = await response.json();
        const roles = data.roles;
        const normalizedUserRole = userRole.toLowerCase().replace(/\s/g, '');
        const matchingRole = roles.find((r: { name: string }) => r.name === normalizedUserRole);
        if (matchingRole) {
          setRoleServices(matchingRole.services);
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    if (userRole) {
      fetchRoles();
    }
  }, [userRole]);
 








  const serviceMap: { [key: string]: { name: string; icon: any; route: string } } = {
    's3': { name: 'S3', icon: Database, route: '/dashboard/infrastructure/s3' },
    'athena': { name: 'Athena', icon: Database, route: '/dashboard/infrastructure/athena' },
    'glue': { name: 'Glue', icon: Database, route: '/dashboard/infrastructure/glue' },
    'lambda': { name: 'Lambda', icon: Zap, route: '/dashboard/infrastructure/lambda' },
    'cloudfront': { name: 'CloudFront', icon: Cloud, route: '/dashboard/infrastructure/cloudfront' },
    'ec2': { name: 'EC2', icon: Server, route: '/dashboard/infrastructure/ec2' },
    'iam': { name: 'IAM', icon: Shield, route: '/dashboard/infrastructure/iam' },
    'cloudformation': { name: 'CloudFormation', icon: Server, route: '/dashboard/infrastructure/cloudformation' },
    'ce': { name: 'Cost Explorer', icon: Settings, route: '/dashboard/infrastructure/ce' },
    'cur': { name: 'CUR', icon: FileText, route: '/dashboard/infrastructure/cur' },
    'budgets': { name: 'Budgets', icon: Settings, route: '/dashboard/infrastructure/budgets' },
    'aws-portal': { name: 'AWS Portal', icon: LayoutDashboard, route: '/dashboard/infrastructure/aws-portal' },
    'account': { name: 'Account', icon: Settings, route: '/dashboard/infrastructure/account' },
    'organizations': { name: 'Organizations', icon: Settings, route: '/dashboard/infrastructure/organizations' },
    'cloudtrail': { name: 'CloudTrail', icon: FileText, route: '/dashboard/infrastructure/cloudtrail' },
    'auditmanager': { name: 'Audit Manager', icon: CheckCircle, route: '/dashboard/infrastructure/auditmanager' },
    'guardduty': { name: 'GuardDuty', icon: Shield, route: '/dashboard/infrastructure/guardduty' },
  };
 
  const getCloudServices = () => {
    if (selectedProvider === 'Azure') {
      return [
        { id: 'vm', name: 'Virtual Machines', icon: Server, route: '/dashboard/infrastructure/vm' },
        { id: 'storage', name: 'Storage', icon: Database, route: '/dashboard/infrastructure/storage' },
        { id: 'sql', name: 'SQL Database', icon: Database, route: '/dashboard/infrastructure/sql' }
      ];
    } else if (selectedProvider === 'GCP') {
      return [
        { id: 'compute', name: 'Compute Engine', icon: Server, route: '/dashboard/infrastructure/compute' },
        { id: 'storage', name: 'Cloud Storage', icon: Database, route: '/dashboard/infrastructure/storage' },
        { id: 'sql', name: 'Cloud SQL', icon: Database, route: '/dashboard/infrastructure/sql' }
      ];
    } else {
      return roleServices.map((service) => {
        const mapped = serviceMap[service] || {
          name: service.toUpperCase(),
          icon: Cloud,
          route: `/dashboard/infrastructure/${service}`
        };
        return { id: service, ...mapped };
      });
    }
  };
 
  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      badge: null,
      route: '/dashboard/overview'
    },
    {
      id: 'approved-services',
      label: 'Approved Services',
      icon: CheckCircle,
      badge: null,
      route: '/dashboard/approved-services'
    },
    {
      id: 'requests',
      label: 'Request History',
      icon: FileText,
      badge: null,
      route: '/dashboard/requests'
    }  
  ];
 
  const handleNavClick = (itemId: string, route?: string) => {
    if (itemId === 'infrastructure') {
      setInfrastructureOpen(!infrastructureOpen);
    } else if (route) {
      navigate(route);
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
  };
 
  const handleServiceClick = (route: string) => {
    navigate(route);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };
 
  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };
 
  const isInfrastructureActive = () => {
    return location.pathname.startsWith('/dashboard/infrastructure');
  };
 
  // Auto-expand infrastructure menu if user is on an infrastructure route
  React.useEffect(() => {
    if (isInfrastructureActive()) {
      setInfrastructureOpen(true);
    }
  }, [location.pathname]);
 
  const SidebarContent = () => (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <div className="p-4">
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Employee Portal</span>
          </div>
          <Badge variant="secondary" className="text-xs font-mono bg-primary-light text-primary">
            {currentUser}
          </Badge>
        </div>
 
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.route);
 
            return (
              <Button
                key={item.id}
                variant={isActive ? 'default' : 'ghost'}
                className={`w-full justify-start h-10 px-3 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
                onClick={() => handleNavClick(item.id, item.route)}
              >
                <Icon className="w-4 h-4 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge
                    variant={isActive ? 'secondary' : 'outline'}
                    className={`text-xs ml-2 ${
                      isActive ? 'bg-primary-foreground text-primary' : 'border-primary text-primary'
                    }`}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
 
          {/* Infrastructure Section */}
          <div>
            <Button
              variant={isInfrastructureActive() ? 'default' : 'ghost'}
              className={`w-full justify-start h-10 px-3 ${
                isInfrastructureActive()
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
              onClick={() => handleNavClick('infrastructure')}
            >
              <Cloud className="w-4 h-4 mr-3" />
              <span className="flex-1 text-left">Infrastructure</span>
              {infrastructureOpen ?
                <ChevronDown className="w-4 h-4" /> :
                <ChevronRight className="w-4 h-4" />
              }
            </Button>
 
            {infrastructureOpen && (
              <div className="ml-6 mt-1 space-y-1">
                {getCloudServices().map((service) => {
                  const ServiceIcon = service.icon;
                  const isActive = isActiveRoute(service.route);
                 
                  return (
                    <Button
                      key={service.id}
                      variant={isActive ? 'default' : 'ghost'}
                      size="sm"
                      className={`w-full justify-start h-8 px-3 ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      }`}
                      onClick={() => handleServiceClick(service.route)}
                    >
                      <ServiceIcon className="w-3 h-3 mr-2" />
                      <span className="text-sm">{service.name}</span>
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
 
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 md:top-16 md:bg-background md:border-r md:border-border">
        <SidebarContent />
      </div>
 
      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-64 bg-background shadow-large border-r border-border">
            <div className="flex-1 flex flex-col overflow-y-auto pt-20">
              <SidebarContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
 
export default Sidebar;