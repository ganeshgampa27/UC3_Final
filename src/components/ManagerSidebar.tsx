import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  LayoutDashboard,
  Clock,
  AlertCircle,
  Users,
  Shield,
} from "lucide-react";

interface ManagerSidebarProps {

  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const ManagerSidebar: React.FC<ManagerSidebarProps> = ({
  currentUser,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: "dashboard",
      label: "Overview",
      icon: LayoutDashboard,
      badge: null,
      //   permissions: ['view_resources'],
      path: "/manager-dashboard",
    },
    {
      id: "request-history",
      label: "Request History",
      icon: Clock,
      badge: null,
      //   permissions: ['view_resources'],
      path: "/manager-dashboard/request-history",
    },
    {
      id: "approvals",
      label: "Approvals",
      icon: AlertCircle,
      badge: 8,
      //   permissions: ['approve_requests'],
      path: "/manager-dashboard/approvals",
    },
    {
      id: "role-management",
      label: "Role Management",
      icon: Users,
      badge: null,
      //   permissions: ['manage_team'],
      path: "/manager-dashboard/role-management",
    },
    {
      id: "team-management",
      label: "Team Management",
      icon: Users,
      badge: null,
      //   permissions: ['manage_team'],
      path: "/manager-dashboard/team-management",
    },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const currentUser=localStorage.getItem("fullName")

  const SidebarContent = () => (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <div className="p-4">
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2 ">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Manager Portal
            </span>
          </div>
          <Badge variant="secondary" className="text-xs font-mono bg-primary-light text-primary">
            {currentUser}
          </Badge>
        </div>


        

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
       

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-10 px-3 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
                onClick={() => handleNavClick(item.path)}
              >
                <Icon className="w-4 h-4 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge
                    variant={isActive ? "secondary" : "outline"}
                    className={`text-xs ml-2 ${
                      isActive
                        ? "bg-primary-foreground text-primary"
                        : "border-primary text-primary"
                    }`}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
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

export default ManagerSidebar;
