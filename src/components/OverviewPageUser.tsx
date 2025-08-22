// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card } from './ui/card';
// import { Badge } from './ui/badge';
// import { Button } from './ui/button';
// import {
//   TrendingUp,
//   AlertTriangle,
//   CheckCircle,
//   Clock,
//   Server,
//   FileText,
//   Activity,
//   Calendar,
//   Loader2,
//   ArrowRight,
//   Users,
//   Shield,
//   DollarSign,
// } from 'lucide-react';
 
// // API Response interfaces
// interface APIRequest {
//   RequestID: string;
//   Username: string;
//   UserID: string;
//   Role: string;
//   Cloud: string;
//   Service: string;
//   AccessLevel: string;
//   Status: 'pending' | 'approved' | 'rejected' | 'applied';
//   Reason: string;
//   Manager: string;
//   RequestTime: string;
//   ApprovalTime?: string;
//   ApplicationTime?: string;
//   PolicyExpiry?: string;
//   Policy?: any;
//   ReminderSent: boolean;
// }
 
// interface APIResponse {
//   requests: APIRequest[];
//   lastEvaluatedKey: string | null;
//   message: string;
// }
 
// interface User {
//   id: string;
//   name: string;
//   username: string;
//   permissions: string[];
// }
 
// interface QuickAction {
//   id: string;
//   title: string;
//   description: string;
//   icon: React.ElementType;
//   color: string;
//   permission: string;
//   targetTab?: string;
//   action?: 'openDialog' | 'switchTab';
//   badge?: number;
// }
 
// interface EmployeeRequestStats {
//   totalRequests: number;
//   successfulApprovals: number;
//   pendingApprovals: number;
//   rejectedApprovals: number;
//   appliedRequests: number;
// }
 
// interface CloudProvider {
//   id: string;
//   name: string;
//   status: string;
//   resources: number;
//   cost: number;
// }
 
// const OverviewPageUser= () => {
//   const [requests, setRequests] = useState<APIRequest[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeAction, setActiveAction] = useState<string | null>(null);
//   const navigate = useNavigate();
 
//   // Get user data from localStorage
//   const fullName = localStorage.getItem("fullName");
//   const cloudProvider = localStorage.getItem("cloudProvider");
//   const userRole = localStorage.getItem("role");
 

 
//   useEffect(() => {
//     const fetchRequests = async () => {
//       setIsLoading(true);
 
//       try {
//         const response = await fetch(
//           `https://9y40j38nv9.execute-api.ap-south-1.amazonaws.com/list_requests?Username=${fullName}`
//         );
//         if (response.ok) {
//           const data: APIResponse = await response.json();
//           if (Array.isArray(data.requests)) {
//             const filteredRequests = data.requests.filter(
//               (req: APIRequest) => req.Username === fullName
//             );
//             setRequests(filteredRequests);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching requests:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
 
//     if (fullName) {
//       fetchRequests();
//     }
//   }, [fullName]);
 
//   const getEmployeeRequestStats = (): EmployeeRequestStats => {
//     return {
//       totalRequests: requests.length,
//       successfulApprovals: requests.filter((r) => r.Status === 'approved').length,
//       pendingApprovals: requests.filter((r) => r.Status === 'pending').length,
//       rejectedApprovals: requests.filter((r) => r.Status === 'rejected').length,
//       appliedRequests: requests.filter((r) => r.Status === 'applied').length,
//     };
//   };
 
//   const getQuickActions = (): QuickAction[] => {
//     const pendingCount = requests.filter((r) => r.Status === 'pending').length;
 
//     const baseActions: QuickAction[] = [
//       {
//         id: 'new-request',
//         title: 'Request New Service',
//         description: 'Create a new resource request',
//         icon: FileText,
//         color: 'bg-blue-500',
//         permission: 'request_access',
//         targetTab: 'requests',
//       },
//     ];
 
//     if (userRole === 'Manager') {
//       return [
//         ...baseActions,
//         {
//           id: 'approve-requests',
//           title: 'Pending Approvals',
//           description: 'Review team requests',
//           icon: CheckCircle,
//           color: 'bg-green-500',
//           permission: 'approve_requests',
//           badge: pendingCount,
//           targetTab: 'approvals',
//           action: 'switchTab',
//         },
//         {
//           id: 'team-management',
//           title: 'Team Management',
//           description: 'Manage team access',
//           icon: Users,
//           color: 'bg-purple-500',
//           permission: 'manage_team',
//           targetTab: 'team',
//           action: 'switchTab',
//         },
//       ];
//     }
 
//     if (userRole === 'Admin') {
//       return [
//         ...baseActions,
//         {
//           id: 'user-management',
//           title: 'User Management',
//           description: 'Manage all users',
//           icon: Shield,
//           color: 'bg-red-500',
//           permission: 'full_access',
//           targetTab: 'users',
//           action: 'switchTab',
//         },
//         {
//           id: 'cost-optimization',
//           title: 'Cost Optimization',
//           description: 'Optimize cloud spend',
//           icon: DollarSign,
//           color: 'bg-orange-500',
//           permission: 'full_access',
//           targetTab: 'analytics',
//           action: 'switchTab',
//         },
//       ];
//     }
 
//     return [
//       ...baseActions,
//       {
//         id: 'view-infrastructure',
//         title: 'View Infrastructure',
//         description: 'Browse cloud resources',
//         icon: Server,
//         color: 'bg-teal-500',
//         permission: 'view_resources',
//         targetTab: 'infrastructure',
//         action: 'switchTab',
//       },
//       {
//         id: 'approved-services',
//         title: 'Approved Services',
//         description: 'Access your resources',
//         icon: CheckCircle,
//         color: 'bg-green-500',
//         permission: 'view_resources',
//         targetTab: 'approved-services',
//         action: 'switchTab',
//       },
//     ];
//   };
 
//   const handleQuickAction = (action: QuickAction): void => {
//     setActiveAction(action.id);
   
//     if (action.targetTab) {
//       navigate(`/dashboard/${action.targetTab}`);
//     }
//   };
 
//   const getCloudProviders = (): CloudProvider[] => {
//     const providerStats: Record<string, { resources: number; cost: number }> = {};
   
//     requests.forEach((req) => {
//       const cloud = req.Cloud.toLowerCase();
//       if (!providerStats[cloud]) {
//         providerStats[cloud] = { resources: 0, cost: 0 };
//       }
//       if (req.Status === 'applied') {
//         providerStats[cloud].resources += 1;
//         providerStats[cloud].cost += Math.random() * 1000; // Mock cost data
//       }
//     });
 
//     return Object.entries(providerStats).map(([cloud, stats]) => ({
//       id: cloud,
//       name: cloud.toUpperCase(),
//       status: 'connected',
//       resources: stats.resources,
//       cost: Math.round(stats.cost),
//     }));
//   };
 
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
//           <p className="text-muted-foreground">Loading dashboard data...</p>
//         </div>
//       </div>
//     );
//   }
 
//   const employeeStats = getEmployeeRequestStats();
//   const recentRequestsLimited = requests.slice(0, 5);
//   const cloudProviders = getCloudProviders();
//   const quickActions = getQuickActions();
 
//   return (
//     <div className="space-y-6">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
//               <p className="text-2xl font-bold text-foreground">{employeeStats.totalRequests}</p>
//             </div>
//             <FileText className="w-8 h-8 text-blue-500" />
//           </div>
//           <div className="mt-2">
//             <div className="flex items-center text-sm text-muted-foreground">
//               <Calendar className="w-4 h-4 mr-1" />
//               <span>All time</span>
//             </div>
//           </div>
//         </Card>
 
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Applied Services</p>
//               <p className="text-2xl font-bold text-foreground">{employeeStats.appliedRequests}</p>
//             </div>
//             <CheckCircle className="w-8 h-8 text-green-500" />
//           </div>
//           <div className="mt-2">
//             <div className="flex items-center text-sm text-green-600">
//               <TrendingUp className="w-4 h-4 mr-1" />
//               <span>Active access!</span>
//             </div>
//           </div>
//         </Card>
 
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
//               <p className="text-2xl font-bold text-foreground">{employeeStats.pendingApprovals}</p>
//             </div>
//             <Clock className="w-8 h-8 text-orange-500" />
//           </div>
//           <div className="mt-2">
//             <div className="flex items-center text-sm text-muted-foreground">
//               <Calendar className="w-4 h-4 mr-1" />
//               <span>Avg. 2 days</span>
//             </div>
//           </div>
//         </Card>
 
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Rejected Requests</p>
//               <p className="text-2xl font-bold text-foreground">{employeeStats.rejectedApprovals}</p>
//             </div>
//             <AlertTriangle className="w-8 h-8 text-red-500" />
//           </div>
//           <div className="mt-2">
//             <div className="flex items-center text-sm text-muted-foreground">
//               <Activity className="w-4 h-4 mr-1" />
//               <span>Review needed</span>
//             </div>
//           </div>
//         </Card>
//       </div>
 
//       {/* Quick Actions */}
//       <Card className="p-6">
//         <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {quickActions.map((action) => {
//             const Icon = action.icon;
            
 
//             return (
//               <div
//                 key={action.id}
//                 className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
//                   activeAction === action.id
//                     ? 'border-primary bg-primary/10'
//                     : 'border-border hover:border-primary/50'
//                 }`}
//                 onClick={() => handleQuickAction(action)}
//               >
//                 <div className="flex items-center space-x-3">
//                   <div className={`p-2 rounded-lg ${action.color} text-white`}>
//                     <Icon className="w-5 h-5" />
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between">
//                       <h3 className="font-medium text-foreground">{action.title}</h3>
//                       {action.badge && action.badge > 0 && (
//                         <Badge variant="destructive" className="text-xs">
//                           {action.badge}
//                         </Badge>
//                       )}
//                     </div>
//                     <p className="text-sm text-muted-foreground">{action.description}</p>
//                   </div>
//                   <ArrowRight className="w-4 h-4 text-muted-foreground" />
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </Card>
 
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Cloud Providers */}
//         <Card className="p-6">
//           <h2 className="text-lg font-semibold text-foreground mb-4">Cloud Resources</h2>
//           <div className="space-y-4">
//             {cloudProviders.length > 0 ? (
//               cloudProviders.map((provider) => (
//                 <div key={provider.id} className="p-4 border rounded-lg bg-accent/50">
//                   <div className="flex items-center justify-between mb-2">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-3 h-3 rounded-full bg-green-500"></div>
//                       <h3 className="font-medium text-foreground">{provider.name}</h3>
//                     </div>
//                     <Badge variant="outline" className="text-xs">
//                       {provider.status}
//                     </Badge>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <span className="text-muted-foreground">Resources:</span>
//                       <span className="font-medium ml-2">{provider.resources}</span>
//                     </div>
//                     <div>
//                       <span className="text-muted-foreground">Est. Cost:</span>
//                       <span className="font-medium ml-2">${provider.cost}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-8 text-muted-foreground">
//                 <Server className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                 <p>No active cloud resources yet</p>
//               </div>
//             )}
//           </div>
//         </Card>
 
//         {/* Recent Requests */}
//         <Card className="p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-foreground">Recent Requests</h2>
//           </div>
//           <div className="space-y-3">
//             {recentRequestsLimited.length > 0 ? (
//               recentRequestsLimited.map((request) => (
//                 <div
//                   key={request.RequestID}
//                   className="p-3 border rounded-lg hover:bg-accent/50"
//                 >
//                   <div className="flex items-center justify-between mb-1">
//                     <h3 className="font-medium text-sm text-foreground">
//                       {request.Cloud.toUpperCase()} - {request.Service}
//                     </h3>
//                     <Badge
//                       variant="outline"
//                       className={`text-xs ${
//                         request.Status === 'applied'
//                           ? 'text-green-600 border-green-600'
//                           : request.Status === 'pending'
//                           ? 'text-orange-600 border-orange-600'
//                           : request.Status === 'approved'
//                           ? 'text-blue-600 border-blue-600'
//                           : 'text-red-600 border-red-600'
//                       }`}
//                     >
//                       {request.Status}
//                     </Badge>
//                   </div>
//                   <div className="flex items-center justify-between text-xs text-muted-foreground">
//                     <span>{request.AccessLevel} access</span>
//                     <span>{new Date(request.RequestTime).toLocaleDateString()}</span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-8 text-muted-foreground">
//                 <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                 <p>No requests found</p>
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };
 
// export default OverviewPageUser;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Server,
  FileText,
  Activity,
  Calendar,
  Loader2,
  ArrowRight,
  Users,
  Shield,
  DollarSign,
} from 'lucide-react';
 
// API Response interfaces
interface APIRequest {
  RequestID: string;
  Username: string;
  UserID: string;
  Role: string;
  Cloud: string;
  Service: string;
  AccessLevel: string;
  Status: 'pending' | 'approved' | 'rejected' | 'applied';
  Reason: string;
  Manager: string;
  RequestTime: string;
  ApprovalTime?: string;
  ApplicationTime?: string;
  PolicyExpiry?: string;
  Policy?: any;
  ReminderSent: boolean;
}
 
interface APIResponse {
  requests: APIRequest[];
  lastEvaluatedKey: string | null;
  message: string;
}
 
interface User {
  id: string;
  name: string;
  username: string;
  permissions: string[];
}
 
interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  permission: string;
  targetTab?: string;
  action?: 'openDialog' | 'switchTab';
  badge?: number;
}
 
interface EmployeeRequestStats {
  totalRequests: number;
  successfulApprovals: number;
  pendingApprovals: number;
  rejectedApprovals: number;
  appliedRequests: number;
}
 
interface CloudProvider {
  id: string;
  name: string;
  status: string;
  resources: number;
  cost: number;
}
 
const OverviewPageUser= () => {
  const [requests, setRequests] = useState<APIRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const navigate = useNavigate();
 
  // Get user data from localStorage
  const fullName = localStorage.getItem("fullName");
  const cloudProvider = localStorage.getItem("cloudProvider");
  const userRole = localStorage.getItem("role");
 

 
  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
 
      try {
        const response = await fetch(
          `https://9y40j38nv9.execute-api.ap-south-1.amazonaws.com/list_requests?Username=${fullName}`
        );
        if (response.ok) {
          const data: APIResponse = await response.json();
          if (Array.isArray(data.requests)) {
            const filteredRequests = data.requests.filter(
              (req: APIRequest) => req.Username === fullName
            );
            setRequests(filteredRequests);
          }
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setIsLoading(false);
      }
    };
 
    if (fullName) {
      fetchRequests();
    }
  }, [fullName]);
 
  const getEmployeeRequestStats = (): EmployeeRequestStats => {
    return {
      totalRequests: requests.length,
      successfulApprovals: requests.filter((r) => r.Status === 'approved').length,
      pendingApprovals: requests.filter((r) => r.Status === 'pending').length,
      rejectedApprovals: requests.filter((r) => r.Status === 'rejected').length,
      appliedRequests: requests.filter((r) => r.Status === 'applied').length,
    };
  };

  // Navigation handlers for stats cards
  const handleCardClick = (cardType: string) => {
    const baseUrl = '/dashboard/requests';
    
    switch (cardType) {
      case 'total':
        // Navigate to requests page with no status filter (shows all)
        navigate(baseUrl, { state: { filterStatus: 'all' } });
        break;
      case 'applied':
        // Navigate to requests page filtered by applied status
        navigate(baseUrl, { state: { filterStatus: 'applied' } });
        break;
      case 'pending':
        // For managers, navigate to approvals page; for others, navigate to requests with pending filter
        if (userRole === 'Manager') {
          navigate('/dashboard/approvals');
        } else {
          navigate(baseUrl, { state: { filterStatus: 'pending' } });
        }
        break;
      case 'rejected':
        // Navigate to requests page filtered by rejected status
        navigate(baseUrl, { state: { filterStatus: 'rejected' } });
        break;
      default:
        navigate(baseUrl);
    }
  };
 
  const getQuickActions = (): QuickAction[] => {
    const pendingCount = requests.filter((r) => r.Status === 'pending').length;
 
    const baseActions: QuickAction[] = [
      {
        id: 'new-request',
        title: 'Request New Service',
        description: 'Create a new resource request',
        icon: FileText,
        color: 'bg-blue-500',
        permission: 'request_access',
        targetTab: 'requests',
      },
    ];
 
    if (userRole === 'Manager') {
      return [
        ...baseActions,
        {
          id: 'approve-requests',
          title: 'Pending Approvals',
          description: 'Review team requests',
          icon: CheckCircle,
          color: 'bg-green-500',
          permission: 'approve_requests',
          badge: pendingCount,
          targetTab: 'approvals',
          action: 'switchTab',
        },
        {
          id: 'team-management',
          title: 'Team Management',
          description: 'Manage team access',
          icon: Users,
          color: 'bg-purple-500',
          permission: 'manage_team',
          targetTab: 'team',
          action: 'switchTab',
        },
      ];
    }
 
    if (userRole === 'Admin') {
      return [
        ...baseActions,
        {
          id: 'user-management',
          title: 'User Management',
          description: 'Manage all users',
          icon: Shield,
          color: 'bg-red-500',
          permission: 'full_access',
          targetTab: 'users',
          action: 'switchTab',
        },
        {
          id: 'cost-optimization',
          title: 'Cost Optimization',
          description: 'Optimize cloud spend',
          icon: DollarSign,
          color: 'bg-orange-500',
          permission: 'full_access',
          targetTab: 'analytics',
          action: 'switchTab',
        },
      ];
    }
 
    return [
      ...baseActions,
      {
        id: 'view-infrastructure',
        title: 'View Infrastructure',
        description: 'Browse cloud resources',
        icon: Server,
        color: 'bg-teal-500',
        permission: 'view_resources',
        targetTab: 'infrastructure',
        action: 'switchTab',
      },
      {
        id: 'approved-services',
        title: 'Approved Services',
        description: 'Access your resources',
        icon: CheckCircle,
        color: 'bg-green-500',
        permission: 'view_resources',
        targetTab: 'approved-services',
        action: 'switchTab',
      },
    ];
  };
 
  const handleQuickAction = (action: QuickAction): void => {
    setActiveAction(action.id);
   
    if (action.targetTab) {
      navigate(`/dashboard/${action.targetTab}`);
    }
  };
 
  const getCloudProviders = (): CloudProvider[] => {
    const providerStats: Record<string, { resources: number; cost: number }> = {};
   
    requests.forEach((req) => {
      const cloud = req.Cloud.toLowerCase();
      if (!providerStats[cloud]) {
        providerStats[cloud] = { resources: 0, cost: 0 };
      }
      if (req.Status === 'applied') {
        providerStats[cloud].resources += 1;
        providerStats[cloud].cost += Math.random() * 1000; // Mock cost data
      }
    });
 
    return Object.entries(providerStats).map(([cloud, stats]) => ({
      id: cloud,
      name: cloud.toUpperCase(),
      status: 'connected',
      resources: stats.resources,
      cost: Math.round(stats.cost),
    }));
  };
 
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }
 
  const employeeStats = getEmployeeRequestStats();
  const recentRequestsLimited = requests.slice(0, 5);
  const cloudProviders = getCloudProviders();
  const quickActions = getQuickActions();
 
  return (
    <div className="space-y-6">
      {/* Stats Cards with click handlers */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card 
          className="p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:bg-accent/50" 
          onClick={() => handleCardClick('total')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
              <p className="text-2xl font-bold text-foreground">{employeeStats.totalRequests}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
          <div className="mt-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-1" />
              <span>All time</span>
              <ArrowRight className="w-4 h-4 ml-auto opacity-50" />
            </div>
          </div>
        </Card>
 
        <Card 
          className="p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:bg-accent/50" 
          onClick={() => handleCardClick('applied')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Applied Services</p>
              <p className="text-2xl font-bold text-foreground">{employeeStats.appliedRequests}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-2">
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>Active access!</span>
              <ArrowRight className="w-4 h-4 ml-auto opacity-50" />
            </div>
          </div>
        </Card>
 
        <Card 
          className="p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:bg-accent/50" 
          onClick={() => handleCardClick('pending')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
              <p className="text-2xl font-bold text-foreground">{employeeStats.pendingApprovals}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
          <div className="mt-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Avg. 2 days</span>
              <ArrowRight className="w-4 h-4 ml-auto opacity-50" />
            </div>
          </div>
        </Card>
 
        <Card 
          className="p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:bg-accent/50" 
          onClick={() => handleCardClick('rejected')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Rejected Requests</p>
              <p className="text-2xl font-bold text-foreground">{employeeStats.rejectedApprovals}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <div className="mt-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Activity className="w-4 h-4 mr-1" />
              <span>Review needed</span>
              <ArrowRight className="w-4 h-4 ml-auto opacity-50" />
            </div>
          </div>
        </Card>
      </div>
 
      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            
 
            return (
              <div
                key={action.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                  activeAction === action.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleQuickAction(action)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${action.color} text-white`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground">{action.title}</h3>
                      {action.badge && action.badge > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {action.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cloud Providers */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Cloud Resources</h2>
          <div className="space-y-4">
            {cloudProviders.length > 0 ? (
              cloudProviders.map((provider) => (
                <div key={provider.id} className="p-4 border rounded-lg bg-accent/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <h3 className="font-medium text-foreground">{provider.name}</h3>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {provider.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Resources:</span>
                      <span className="font-medium ml-2">{provider.resources}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Est. Cost:</span>
                      <span className="font-medium ml-2">${provider.cost}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Server className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No active cloud resources yet</p>
              </div>
            )}
          </div>
        </Card>
 
        {/* Recent Requests */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Requests</h2>
          </div>
          <div className="space-y-3">
            {recentRequestsLimited.length > 0 ? (
              recentRequestsLimited.map((request) => (
                <div
                  key={request.RequestID}
                  className="p-3 border rounded-lg hover:bg-accent/50"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-sm text-foreground">
                      {request.Cloud.toUpperCase()} - {request.Service}
                    </h3>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        request.Status === 'applied'
                          ? 'text-green-600 border-green-600'
                          : request.Status === 'pending'
                          ? 'text-orange-600 border-orange-600'
                          : request.Status === 'approved'
                          ? 'text-blue-600 border-blue-600'
                          : 'text-red-600 border-red-600'
                      }`}
                    >
                      {request.Status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{request.AccessLevel} access</span>
                    <span>{new Date(request.RequestTime).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No requests found</p>
              </div>
            )}</div>
        </Card>
      </div>
    </div>
  );
};
 
export default OverviewPageUser;