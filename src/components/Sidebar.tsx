import React from 'react';
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
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: any;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  selectedProvider: string;
  onCloudChange: (provider: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  selectedProvider,
  onCloudChange
}) => {
  const [infrastructureOpen, setInfrastructureOpen] = React.useState(false);

  const getCloudServices = () => {
    if (selectedProvider === 'all' || selectedProvider === 'aws') {
      return [
        { id: 'ec2', name: 'EC2', icon: Server },
        { id: 's3', name: 'S3', icon: Database },
        { id: 'rds', name: 'RDS', icon: Database },
        { id: 'lambda', name: 'Lambda', icon: Zap }
      ];
    } else if (selectedProvider === 'azure') {
      return [
        { id: 'vm', name: 'Virtual Machines', icon: Server },
        { id: 'storage', name: 'Storage', icon: Database },
        { id: 'sql', name: 'SQL Database', icon: Database }
      ];
    } else if (selectedProvider === 'gcp') {
      return [
        { id: 'compute', name: 'Compute Engine', icon: Server },
        { id: 'storage', name: 'Cloud Storage', icon: Database },
        { id: 'sql', name: 'Cloud SQL', icon: Database }
      ];
    }
    return [];
  };

  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      badge: null,
      permissions: ['view_resources']
    },
    {
      id: 'approved-services',
      label: 'Approved Services',
      icon: CheckCircle,
      badge: null,
      permissions: ['view_resources']
    },
    {
      id: 'requests',
      label: 'Request History',
      icon: FileText,
      badge: null,
      permissions: ['request_access']
    }   
  ];

  const handleNavClick = (itemId: string) => {
    if (itemId === 'infrastructure') {
      setInfrastructureOpen(!infrastructureOpen);
    } else {
      setActiveTab(itemId);
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  const handleServiceClick = (serviceId: string) => {
    setActiveTab(`infrastructure/${serviceId}`);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const SidebarContent = () => (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <div className="p-4">
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Employee Portal</span>
          </div>
          <Badge variant="secondary" className="text-xs font-mono bg-primary-light text-primary">
            {currentUser?.name}
          </Badge>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const hasPermission = item.permissions.some(permission => 
              currentUser?.permissions?.includes(permission)
            );

            if (!hasPermission) return null;

            return (
              <Button
                key={item.id}
                variant={isActive ? 'default' : 'ghost'}
                className={`w-full justify-start h-10 px-3 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-soft' 
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
                onClick={() => handleNavClick(item.id)}
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
              variant="ghost"
              className={`w-full justify-start h-10 px-3 text-muted-foreground hover:bg-accent hover:text-foreground ${
                activeTab.startsWith('infrastructure') ? 'bg-accent text-foreground' : ''
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
                  const isActive = activeTab === `infrastructure/${service.id}`;
                  
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
                      onClick={() => handleServiceClick(service.id)}
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