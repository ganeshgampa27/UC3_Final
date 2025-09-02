// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import {
//   TrendingUp,
//   DollarSign,
//   Server,
//   Clock,
//   ArrowRight,
//   Cloud,
//   AlertCircle
// } from 'lucide-react';

// interface OverviewPageProps {
//   currentUser: any;
//   selectedProvider: string;
//   setActiveTab: (tab: string) => void;
// }

// const OverviewPage: React.FC<OverviewPageProps> = ({
//   currentUser,
//   selectedProvider,
//   setActiveTab
// }) => {
//   const mockStats = {
//     totalServices: 12,
//     pendingRequests: 3,
//     monthlySpend: 2450,
//     activeResources: 24
//   };

//   const recentRequests = [
//     {
//       id: 1,
//       service: 'AWS EC2 Instance',
//       status: 'pending',
//       date: '2024-01-15',
//       cost: '$120/month'
//     },
//     {
//       id: 2,
//       service: 'Azure Storage Account',
//       status: 'approved',
//       date: '2024-01-14',
//       cost: '$45/month'
//     },
//     {
//       id: 3,
//       service: 'GCP Cloud Function',
//       status: 'pending',
//       date: '2024-01-13',
//       cost: '$25/month'
//     }
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Welcome Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-foreground">
//           Welcome back, {currentUser?.username?.split('@')[0] || 'User'}
//         </h1>
//         <p className="text-muted-foreground">
//           Here's what's happening with your cloud resources today.
//         </p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Active Services</p>
//                 <p className="text-2xl font-bold text-foreground">{mockStats.totalServices}</p>
//               </div>
//               <Server className="w-8 h-8 text-blue-500" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Pending Requests</p>
//                 <p className="text-2xl font-bold text-foreground">{mockStats.pendingRequests}</p>
//               </div>
//               <Clock className="w-8 h-8 text-orange-500" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Monthly Spend</p>
//                 <p className="text-2xl font-bold text-foreground">
//                   ${mockStats.monthlySpend.toLocaleString()}
//                 </p>
//               </div>
//               <DollarSign className="w-8 h-8 text-green-500" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Resources</p>
//                 <p className="text-2xl font-bold text-foreground">{mockStats.activeResources}</p>
//               </div>
//               <Cloud className="w-8 h-8 text-purple-500" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Quick Actions */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Quick Actions</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <Button
//               variant="outline"
//               className="h-20 flex flex-col space-y-2"
//               onClick={() => setActiveTab('infrastructure')}
//             >
//               <Cloud className="w-6 h-6" />
//               <span>Browse Services</span>
//             </Button>

//             <Button
//               variant="outline"
//               className="h-20 flex flex-col space-y-2"
//               onClick={() => setActiveTab('requests')}
//             >
//               <Clock className="w-6 h-6" />
//               <span>View Requests</span>
//             </Button>

//             <Button
//               variant="outline"
//               className="h-20 flex flex-col space-y-2"
//               onClick={() => setActiveTab('approved-services')}
//             >
//               <Server className="w-6 h-6" />
//               <span>My Services</span>
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Recent Requests */}
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between">
//           <CardTitle>Recent Requests</CardTitle>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => setActiveTab('requests')}
//           >
//             View All <ArrowRight className="w-4 h-4 ml-1" />
//           </Button>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {recentRequests.map((request) => (
//               <div key={request.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
//                     <Cloud className="w-5 h-5 text-muted-foreground" />
//                   </div>
//                   <div>
//                     <p className="font-medium text-foreground">{request.service}</p>
//                     <p className="text-sm text-muted-foreground">{request.date}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <span className="text-sm font-medium text-foreground">{request.cost}</span>
//                   <Badge
//                     variant={request.status === 'approved' ? 'default' : 'secondary'}
//                     className={request.status === 'approved' ? 'bg-green-500 text-white' : ''}
//                   >
//                     {request.status}
//                   </Badge>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Provider Status */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Cloud Provider Status</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="flex items-center justify-between p-4 border border-border rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-sm">
//                   AWS
//                 </div>
//                 <div>
//                   <p className="font-medium text-foreground">Amazon Web Services</p>
//                   <p className="text-sm text-muted-foreground">8 active services</p>
//                 </div>
//               </div>
//               <div className="w-3 h-3 bg-green-500 rounded-full" />
//             </div>

//             <div className="flex items-center justify-between p-4 border border-border rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm">
//                   AZ
//                 </div>
//                 <div>
//                   <p className="font-medium text-foreground">Microsoft Azure</p>
//                   <p className="text-sm text-muted-foreground">3 active services</p>
//                 </div>
//               </div>
//               <div className="w-3 h-3 bg-green-500 rounded-full" />
//             </div>

//             <div className="flex items-center justify-between p-4 border border-border rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm">
//                   GCP
//                 </div>
//                 <div>
//                   <p className="font-medium text-foreground">Google Cloud Platform</p>
//                   <p className="text-sm text-muted-foreground">1 active service</p>
//                 </div>
//               </div>
//               <div className="w-3 h-3 bg-green-500 rounded-full" />
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default OverviewPage;

// import { ReactNode, useState } from 'react';
// import { Button } from './ui/button';
// import { Card } from './ui/card';
// import { Badge } from './ui/badge';
// import { Progress } from './ui/progress';
// import {
//   TrendingUp,
//   AlertTriangle,
//   CheckCircle,
//   Clock,
//   Server,
//   DollarSign,
//   Users,
//   Activity,
//   Calendar,
//   FileText,
//   ArrowRight,
//   Shield,
// } from 'lucide-react';
// import {
//   cloudProviders,
//   recentRequests,
//   costData,
//   dashboardStats,
// } from '../mock/data';

// // Interfaces for data structures
// interface CloudProvider {
//   id: string;
//   name: string;
//   status: string;
//   resources: number;
//   cost: number;
//   region: string;
//   services: string[];
// }

// interface RecentRequest {
//   cloud: ReactNode;
//   id: string;
//   title: string;
//   user: string;
//   requester: string;
//   service: string;
//   provider: string;
//   status: 'pending' | 'approved' | 'rejected';
//   requestDate: string;
//   createdAt: string;
//   estimatedCost: number;
//   description: string;
//   rejectionReason?: string;
// }

// interface DashboardStats {
//   totalResources: string;
//   activeUsers: string;
//   uptime: number;
//   costSavings: number;
//   pendingRequests: number;
//   monthlySpend: number;
//   avgApprovalTime: string;
//   monthlyBudget: number;
// }

// interface CostData {
//   currentMonth: {
//     total: number;
//     aws: number;
//     azure: number;
//     gcp: number;
//   };
//   forecast: {
//     nextMonth: number;
//     confidence: number;
//     trend: string;
//   };
//   breakdown: {
//     compute: number;
//     storage: number;
//     networking: number;
//     databases: number;
//     other: number;
//   };
//   alerts: {
//     message: string;
//     provider: string;
//     severity: 'high' | 'medium';
//   }[];
// }

// interface User {
//   id: string;
//   name: string;
//   username: string;
//   permissions: string[];
// }

// interface OverviewPageProps {
//   currentUser: User;
//   selectedProvider: string;
//   setActiveTab: (tab: string) => void;
// }

// interface QuickAction {
//   id: string;
//   title: string;
//   description: string;
//   icon: React.ElementType;
//   color: string;
//   permission: string;
//   targetTab: string;
//   badge?: number;
// }

// interface FilteredData {
//   totalResources: number;
//   totalCost: number;
//   providers: CloudProvider[];
//   requests: RecentRequest[];
// }

// interface EmployeeRequestStats {
//   totalRequests: number;
//   successfulApprovals: number;
//   pendingApprovals: number;
//   rejectedApprovals: number;
// }

// const OverviewPage: React.FC<OverviewPageProps> = ({
//   currentUser,
//   selectedProvider,
//   setActiveTab,
// }) => {
//   const [activeAction, setActiveAction] = useState<string | null>(null);

//   const getFilteredData = (): FilteredData => {
//     if (selectedProvider === 'all') {
//       return {
//         totalResources: parseFloat(dashboardStats.totalResources.replace('K', '')) * 1000,
//         totalCost: costData.currentMonth.total,
//         providers: cloudProviders,
//         requests: recentRequests,
//       };
//     }

//     const provider = cloudProviders.find((p) => p.id === selectedProvider);
//     const providerRequests = recentRequests.filter((r) => r.provider === selectedProvider);

//     return {
//       totalResources: provider?.resources || 0,
//       totalCost: provider?.cost || 0,
//       providers: provider ? [provider] : [],
//       requests: providerRequests,
//     };
//   };

//   const data = getFilteredData();

//   const getEmployeeRequestStats = (): EmployeeRequestStats => {
//     const userRequests = recentRequests.filter(
//       (r) => r.requester === currentUser.username || r.requester === 'john.doe@company.com'
//     );
//     return {
//       totalRequests: userRequests.length,
//       successfulApprovals: userRequests.filter((r) => r.status === 'approved').length,
//       pendingApprovals: userRequests.filter((r) => r.status === 'pending').length,
//       rejectedApprovals: userRequests.filter((r) => r.status === 'rejected').length,
//     };
//   };

//   const employeeStats = getEmployeeRequestStats();

//   const getQuickActions = (): QuickAction[] => {
//     const baseActions: QuickAction[] = [
//       {
//         id: 'new-request',
//         title: 'Request New Service',
//         description: 'Create a new resource request',
//         icon: FileText,
//         color: 'bg-cloud-blue',
//         permission: 'request_access',
//         targetTab: 'requests',
//       },
//     ];

//     if (currentUser.id === 'manager') {
//       return [
//         ...baseActions,
//         {
//           id: 'approve-requests',
//           title: 'Pending Approvals',
//           description: 'Review team requests',
//           icon: CheckCircle,
//           color: 'bg-cloud-emerald',
//           permission: 'approve_requests',
//           badge: data.requests.filter((r) => r.status === 'pending').length,
//           targetTab: 'approvals',
//         },
//         {
//           id: 'team-management',
//           title: 'Team Management',
//           description: 'Manage team access',
//           icon: Users,
//           color: 'bg-cloud-purple',
//           permission: 'manage_team',
//           targetTab: 'team',
//         },
//       ];
//     }

//     if (currentUser.id === 'admin') {
//       return [
//         ...baseActions,
//         {
//           id: 'user-management',
//           title: 'User Management',
//           description: 'Manage all users',
//           icon: Shield,
//           color: 'bg-cloud-red',
//           permission: 'full_access',
//           targetTab: 'users',
//         },
//         {
//           id: 'cost-optimization',
//           title: 'Cost Optimization',
//           description: 'Optimize cloud spend',
//           icon: DollarSign,
//           color: 'bg-cloud-orange',
//           permission: 'full_access',
//           targetTab: 'analytics',
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
//         color: 'bg-cloud-teal',
//         permission: 'view_resources',
//         targetTab: 'infrastructure',
//       },
//       {
//         id: 'approved-services',
//         title: 'Approved Services',
//         description: 'Access your resources',
//         icon: CheckCircle,
//         color: 'bg-cloud-emerald',
//         permission: 'view_resources',
//         targetTab: 'approved-services',
//       },
//     ];
//   };

//   const quickActions = getQuickActions();
//   const recentRequestsLimited = data.requests.slice(0, 5);
//   const pendingRequests = data.requests.filter((r) => r.status === 'pending');

//   const handleQuickAction = (action: QuickAction): void => {
//     setActiveAction(action.id);
//     if (action.targetTab) {
//       setActiveTab(action.targetTab);
//     }
//   };

//   const renderStatsCards = () => {
//     if (currentUser.id === 'employee') {
//       return (
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <Card className="p-4 bg-gradient-card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
//                 <p className="text-2xl font-bold text-foreground">{employeeStats.totalRequests}</p>
//               </div>
//               <FileText className="w-8 h-8 text-cloud-blue" />
//             </div>
//             <div className="mt-2">
//               <div className="flex items-center text-sm text-muted-foreground">
//                 <Calendar className="w-4 h-4 mr-1" />
//                 <span>All time</span>
//               </div>
//             </div>
//           </Card>
//           <Card className="p-4 bg-gradient-card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Successful Approvals</p>
//                 <p className="text-2xl font-bold text-foreground">{employeeStats.successfulApprovals}</p>
//               </div>
//               <CheckCircle className="w-8 h-8 text-cloud-emerald" />
//             </div>
//             <div className="mt-2">
//               <div className="flex items-center text-sm text-cloud-emerald">
//                 <TrendingUp className="w-4 h-4 mr-1" />
//                 <span>Great progress!</span>
//               </div>
//             </div>
//           </Card>
//           <Card className="p-4 bg-gradient-card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
//                 <p className="text-2xl font-bold text-foreground">{employeeStats.pendingApprovals}</p>
//               </div>
//               <Clock className="w-8 h-8 text-cloud-orange" />
//             </div>
//             <div className="mt-2">
//               <div className="flex items-center text-sm text-muted-foreground">
//                 <Calendar className="w-4 h-4 mr-1" />
//                 <span>Avg. 2 days</span>
//               </div>
//             </div>
//           </Card>
//           <Card className="p-4 bg-gradient-card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Rejected Approvals</p>
//                 <p className="text-2xl font-bold text-foreground">{employeeStats.rejectedApprovals}</p>
//               </div>
//               <AlertTriangle className="w-8 h-8 text-cloud-red" />
//             </div>
//             <div className="mt-2">
//               <div className="flex items-center text-sm text-muted-foreground">
//                 <Activity className="w-4 h-4 mr-1" />
//                 <span>Review needed</span>
//               </div>
//             </div>
//           </Card>
//         </div>
//       );
//     }

//     return (
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card className="p-4 bg-gradient-card">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Team Members</p>
//               <p className="text-2xl font-bold text-foreground">{parseInt(dashboardStats.activeUsers)}</p>
//             </div>
//             <Users className="w-8 h-8 text-cloud-blue" />
//           </div>
//           <div className="mt-2">
//             <div className="flex items-center text-sm text-cloud-emerald">
//               <TrendingUp className="w-4 h-4 mr-1" />
//               <span className="text-sm text-cloud-emerald">+5% this month</span>
//             </div>
//           </div>
//         </Card>
//         <Card className="p-4 bg-gradient-card">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Pending Requests</p>
//               <p className="text-2xl font-bold text-foreground">{pendingRequests.length}</p>
//             </div>
//             <Clock className="w-8 h-8 text-cloud-orange" />
//           </div>
//           <div className="mt-2">
//             <div className="flex items-center text-sm text-muted-foreground">
//               <Calendar className="w-4 h-4 mr-1" />
//               <span>Avg. 2 days</span>
//             </div>
//           </div>
//         </Card>
//         <Card className="p-4 bg-gradient-card">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Monthly Cost</p>
//               <p className="text-2xl font-bold text-foreground">${data.totalCost.toLocaleString()}</p>
//             </div>
//             <DollarSign className="w-8 h-8 text-cloud-emerald" />
//           </div>
//           <div className="mt-2">
//             <div className="flex items-center text-sm text-cloud-red">
//               <TrendingUp className="w-4 h-4 mr-1" />
//               <span>+12% from last month</span>
//             </div>
//           </div>
//         </Card>
//         <Card className="p-4 bg-gradient-card">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Total Resources</p>
//               <p className="text-2xl font-bold text-foreground">{data.totalResources}</p>
//             </div>
//             <Server className="w-8 h-8 text-cloud-purple" />
//           </div>
//           <div className="mt-2">
//             <div className="flex items-center text-sm text-cloud-emerald">
//               <Activity className="w-4 h-4 mr-1" />
//               <span>99.9% uptime</span>
//             </div>
//           </div>
//         </Card>
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}

//       {/* Stats Cards */}
//       {renderStatsCards()}

//       {/* Quick Actions */}
//       <Card className="p-6 bg-gradient-card">
//         <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {quickActions.map((action) => {
//             const Icon = action.icon;
//             const hasPermission = currentUser.permissions.includes(action.permission);

//             if (!hasPermission) return null;

//             return (
//               <div
//                 key={action.id}
//                 className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
//                   activeAction === action.id
//                     ? 'border-primary bg-primary-light'
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
//                       {action.badge && (
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
//         <Card className="p-6 bg-gradient-card">
//           <h2 className="text-lg font-semibold text-foreground mb-4">Cloud Providers</h2>
//           <div className="space-y-4">
//             {data.providers.map((provider) => (
//               <div key={provider.id} className="p-4 border rounded-lg bg-accent/50">
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center space-x-3">
//                     <div
//                       className={`w-3 h-3 rounded-full ${
//                         provider.status === 'connected' ? 'bg-cloud-emerald' : 'bg-cloud-red'
//                       }`}
//                     ></div>
//                     <h3 className="font-medium text-foreground">{provider.name}</h3>
//                   </div>
//                   <Badge variant="outline" className="text-xs">
//                     {provider.status}
//                   </Badge>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <span className="text-muted-foreground">Resources:</span>
//                     <span className="font-medium ml-2">{provider.resources}</span>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground">Cost:</span>
//                     <span className="font-medium ml-2">${provider.cost.toLocaleString()}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>

//         {/* Recent Requests */}
//         <Card className="p-6 bg-gradient-card">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-foreground">Recent Requests</h2>
//             <Button variant="outline" size="sm" onClick={() => setActiveTab('requests')}>
//               View All
//             </Button>
//           </div>
//           <div className="space-y-3">
//             {recentRequestsLimited.map((request) => (
//               <div
//                 key={request.id}
//                 className="p-3 border rounded-lg hover:bg-accent/50"
//               >
//                 <div className="flex items-center justify-between mb-1">
//                   <h3 className="font-medium text-sm text-foreground">{request.cloud}</h3>
//                   <Badge
//                     variant="outline"
//                     className={`text-xs ${
//                       request.status === 'approved'
//                         ? 'text-cloud-emerald border-cloud-emerald'
//                         : request.status === 'pending'
//                         ? 'text-cloud-orange border-cloud-orange'
//                         : 'text-cloud-red border-cloud-red'
//                     }`}
//                   >
//                     {request.status}
//                   </Badge>
//                 </div>
//                 <div className="flex items-center justify-between text-xs text-muted-foreground">
//                   <span>{request.service}</span>
//                   <span>{new Date(request.requestDate).toLocaleDateString()}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>

//     </div>
//   );
// };

// export default OverviewPage;

//--------------------

// import { ReactNode, useState } from 'react';
// import { Button } from './ui/button';
// import { Card } from './ui/card';
// import { Badge } from './ui/badge';
// import { Progress } from './ui/progress';
// import {
//   TrendingUp,
//   AlertTriangle,
//   CheckCircle,
//   Clock,
//   Server,
//   DollarSign,
//   Users,
//   Activity,
//   Calendar,
//   FileText,
//   ArrowRight,
//   Shield,
// } from 'lucide-react';
// import {
//   cloudProviders,
//   recentRequests,
//   costData,
//   dashboardStats,
// } from '../mock/data';

// // Interfaces for data structures
// interface CloudProvider {
//   id: string;
//   name: string;
//   status: string;
//   resources: number;
//   cost: number;
//   region: string;
//   services: string[];
// }

// interface RecentRequest {
//   cloud: ReactNode;
//   id: string;
//   title: string;
//   user: string;
//   requester: string;
//   service: string;
//   provider: string;
//   status: 'pending' | 'approved' | 'rejected';
//   requestDate: string;
//   createdAt: string;
//   estimatedCost: number;
//   description: string;
//   rejectionReason?: string;
// }

// interface DashboardStats {
//   totalResources: string;
//   activeUsers: string;
//   uptime: number;
//   costSavings: number;
//   pendingRequests: number;
//   monthlySpend: number;
//   avgApprovalTime: string;
//   monthlyBudget: number;
// }

// interface CostData {
//   currentMonth: {
//     total: number;
//     aws: number;
//     azure: number;
//     gcp: number;
//   };
//   forecast: {
//     nextMonth: number;
//     confidence: number;
//     trend: string;
//   };
//   breakdown: {
//     compute: number;
//     storage: number;
//     networking: number;
//     databases: number;
//     other: number;
//   };
//   alerts: {
//     message: string;
//     provider: string;
//     severity: 'high' | 'medium';
//   }[];
// }

// interface User {
//   id: string;
//   name: string;
//   username: string;
//   permissions: string[];
// }

// interface OverviewPageProps {
//   currentUser: User;
//   selectedProvider: string;
//   setActiveTab: (tab: string) => void;
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

// interface FilteredData {
//   totalResources: number;
//   totalCost: number;
//   providers: CloudProvider[];
//   requests: RecentRequest[];
// }

// interface EmployeeRequestStats {
//   totalRequests: number;
//   successfulApprovals: number;
//   pendingApprovals: number;
//   rejectedApprovals: number;
// }

// const OverviewPage: React.FC<OverviewPageProps> = ({
//   currentUser,
//   selectedProvider,
//   setActiveTab,
// }) => {
//   const [activeAction, setActiveAction] = useState<string | null>(null);

//   const getFilteredData = (): FilteredData => {
//     if (selectedProvider === 'all') {
//       return {
//         totalResources: parseFloat(dashboardStats.totalResources.replace('K', '')) * 1000,
//         totalCost: costData.currentMonth.total,
//         providers: cloudProviders,
//         requests: recentRequests,
//       };
//     }

//     const provider = cloudProviders.find((p) => p.id === selectedProvider);
//     const providerRequests = recentRequests.filter((r) => r.provider === selectedProvider);

//     return {
//       totalResources: provider?.resources || 0,
//       totalCost: provider?.cost || 0,
//       providers: provider ? [provider] : [],
//       requests: providerRequests,
//     };
//   };

//   const data = getFilteredData();

//   const getEmployeeRequestStats = (): EmployeeRequestStats => {
//     const userRequests = recentRequests.filter(
//       (r) => r.requester === currentUser.username || r.requester === 'john.doe@company.com'
//     );
//     return {
//       totalRequests: userRequests.length,
//       successfulApprovals: userRequests.filter((r) => r.status === 'approved').length,
//       pendingApprovals: userRequests.filter((r) => r.status === 'pending').length,
//       rejectedApprovals: userRequests.filter((r) => r.status === 'rejected').length,
//     };
//   };

//   const employeeStats = getEmployeeRequestStats();

//   const getQuickActions = (): QuickAction[] => {
//     const baseActions: QuickAction[] = [
//       {
//         id: 'new-request',
//         title: 'Request New Service',
//         description: 'Create a new resource request',
//         icon: FileText,
//         color: 'bg-cloud-blue',
//         permission: 'request_access',
//         action: 'openDialog',
//       },
//     ];

//     if (currentUser.id === 'manager') {
//       return [
//         ...baseActions,
//         {
//           id: 'approve-requests',
//           title: 'Pending Approvals',
//           description: 'Review team requests',
//           icon: CheckCircle,
//           color: 'bg-cloud-emerald',
//           permission: 'approve_requests',
//           badge: data.requests.filter((r) => r.status === 'pending').length,
//           targetTab: 'approvals',
//           action: 'switchTab',
//         },
//         {
//           id: 'team-management',
//           title: 'Team Management',
//           description: 'Manage team access',
//           icon: Users,
//           color: 'bg-cloud-purple',
//           permission: 'manage_team',
//           targetTab: 'team',
//           action: 'switchTab',
//         },
//       ];
//     }

//     if (currentUser.id === 'admin') {
//       return [
//         ...baseActions,
//         {
//           id: 'user-management',
//           title: 'User Management',
//           description: 'Manage all users',
//           icon: Shield,
//           color: 'bg-cloud-red',
//           permission: 'full_access',
//           targetTab: 'users',
//           action: 'switchTab',
//         },
//         {
//           id: 'cost-optimization',
//           title: 'Cost Optimization',
//           description: 'Optimize cloud spend',
//           icon: DollarSign,
//           color: 'bg-cloud-orange',
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
//         color: 'bg-cloud-teal',
//         permission: 'view_resources',
//         targetTab: 'infrastructure',
//         action: 'switchTab',
//       },
//       {
//         id: 'approved-services',
//         title: 'Approved Services',
//         description: 'Access your resources',
//         icon: CheckCircle,
//         color: 'bg-cloud-emerald',
//         permission: 'view_resources',
//         targetTab: 'approved-services',
//         action: 'switchTab',
//       },
//     ];
//   };

//   const quickActions = getQuickActions();
//   const recentRequestsLimited = data.requests.slice(0, 5);
//   const pendingRequests = data.requests.filter((r) => r.status === 'pending');

//   const handleQuickAction = (action: QuickAction): void => {
//     setActiveAction(action.id);

//     if (action.action === 'openDialog') {
//       // Switch to requests tab first
//       setActiveTab('requests');
//       // Dispatch a custom event to trigger the dialog
//       setTimeout(() => {
//         window.dispatchEvent(new CustomEvent('openNewRequestDialog'));
//       }, 100);
//     } else if (action.action === 'switchTab' && action.targetTab) {
//       setActiveTab(action.targetTab);
//     } else if (action.targetTab) {
//       setActiveTab(action.targetTab);
//     }
//   };

//   const renderStatsCards = () => {
//     if (currentUser.id === 'employee') {
//       return (
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <Card className="p-4 bg-gradient-card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
//                 <p className="text-2xl font-bold text-foreground">{employeeStats.totalRequests}</p>
//               </div>
//               <FileText className="w-8 h-8 text-cloud-blue" />
//             </div>
//             <div className="mt-2">
//               <div className="flex items-center text-sm text-muted-foreground">
//                 <Calendar className="w-4 h-4 mr-1" />
//                 <span>All time</span>
//               </div>
//             </div>
//           </Card>
//           <Card className="p-4 bg-gradient-card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Successful Approvals</p>
//                 <p className="text-2xl font-bold text-foreground">{employeeStats.successfulApprovals}</p>
//               </div>
//               <CheckCircle className="w-8 h-8 text-cloud-emerald" />
//             </div>
//             <div className="mt-2">
//               <div className="flex items-center text-sm text-cloud-emerald">
//                 <TrendingUp className="w-4 h-4 mr-1" />
//                 <span>Great progress!</span>
//               </div>
//             </div>
//           </Card>
//           <Card className="p-4 bg-gradient-card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
//                 <p className="text-2xl font-bold text-foreground">{employeeStats.pendingApprovals}</p>
//               </div>
//               <Clock className="w-8 h-8 text-cloud-orange" />
//             </div>
//             <div className="mt-2">
//               <div className="flex items-center text-sm text-muted-foreground">
//                 <Calendar className="w-4 h-4 mr-1" />
//                 <span>Avg. 2 days</span>
//               </div>
//             </div>
//           </Card>
//           <Card className="p-4 bg-gradient-card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Rejected Approvals</p>
//                 <p className="text-2xl font-bold text-foreground">{employeeStats.rejectedApprovals}</p>
//               </div>
//               <AlertTriangle className="w-8 h-8 text-cloud-red" />
//             </div>
//             <div className="mt-2">
//               <div className="flex items-center text-sm text-muted-foreground">
//                 <Activity className="w-4 h-4 mr-1" />
//                 <span>Review needed</span>
//               </div>
//             </div>
//           </Card>
//         </div>
//       );
//     }

//     return (
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card className="p-4 bg-gradient-card">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Team Members</p>
//               <p className="text-2xl font-bold text-foreground">{parseInt(dashboardStats.activeUsers)}</p>
//             </div>
//             <Users className="w-8 h-8 text-cloud-blue" />
//           </div>
//           <div className="mt-2">
//             <div className="flex items-center text-sm text-cloud-emerald">
//               <TrendingUp className="w-4 h-4 mr-1" />
//               <span className="text-sm text-cloud-emerald">+5% this month</span>
//             </div>
//           </div>
//         </Card>
//         <Card className="p-4 bg-gradient-card">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Pending Requests</p>
//               <p className="text-2xl font-bold text-foreground">{pendingRequests.length}</p>
//             </div>
//             <Clock className="w-8 h-8 text-cloud-orange" />
//           </div>
//           <div className="mt-2">
//             <div className="flex items-center text-sm text-muted-foreground">
//               <Calendar className="w-4 h-4 mr-1" />
//               <span>Avg. 2 days</span>
//             </div>
//           </div>
//         </Card>
//         <Card className="p-4 bg-gradient-card">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Monthly Cost</p>
//               <p className="text-2xl font-bold text-foreground">${data.totalCost.toLocaleString()}</p>
//             </div>
//             <DollarSign className="w-8 h-8 text-cloud-emerald" />
//           </div>
//           <div className="mt-2">
//             <div className="flex items-center text-sm text-cloud-red">
//               <TrendingUp className="w-4 h-4 mr-1" />
//               <span>+12% from last month</span>
//             </div>
//           </div>
//         </Card>
//         <Card className="p-4 bg-gradient-card">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Total Resources</p>
//               <p className="text-2xl font-bold text-foreground">{data.totalResources}</p>
//             </div>
//             <Server className="w-8 h-8 text-cloud-purple" />
//           </div>
//           <div className="mt-2">
//             <div className="flex items-center text-sm text-cloud-emerald">
//               <Activity className="w-4 h-4 mr-1" />
//               <span>99.9% uptime</span>
//             </div>
//           </div>
//         </Card>
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}

//       {/* Stats Cards */}
//       {renderStatsCards()}

//       {/* Quick Actions */}
//       <Card className="p-6 bg-gradient-card">
//         <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {quickActions.map((action) => {
//             const Icon = action.icon;
//             const hasPermission = currentUser.permissions.includes(action.permission);

//             if (!hasPermission) return null;

//             return (
//               <div
//                 key={action.id}
//                 className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
//                   activeAction === action.id
//                     ? 'border-primary bg-primary-light'
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
//                       {action.badge && (
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
//         <Card className="p-6 bg-gradient-card">
//           <h2 className="text-lg font-semibold text-foreground mb-4">Cloud Providers</h2>
//           <div className="space-y-4">
//             {data.providers.map((provider) => (
//               <div key={provider.id} className="p-4 border rounded-lg bg-accent/50">
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center space-x-3">
//                     <div
//                       className={`w-3 h-3 rounded-full ${
//                         provider.status === 'connected' ? 'bg-cloud-emerald' : 'bg-cloud-red'
//                       }`}
//                     ></div>
//                     <h3 className="font-medium text-foreground">{provider.name}</h3>
//                   </div>
//                   <Badge variant="outline" className="text-xs">
//                     {provider.status}
//                   </Badge>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <span className="text-muted-foreground">Resources:</span>
//                     <span className="font-medium ml-2">{provider.resources}</span>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground">Cost:</span>
//                     <span className="font-medium ml-2">${provider.cost.toLocaleString()}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>

//         {/* Recent Requests */}
//         <Card className="p-6 bg-gradient-card">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-foreground">Recent Requests</h2>
//             <Button variant="outline" size="sm" onClick={() => setActiveTab('requests')}>
//               View All
//             </Button>
//           </div>
//           <div className="space-y-3">
//             {recentRequestsLimited.map((request) => (
//               <div
//                 key={request.id}
//                 className="p-3 border rounded-lg hover:bg-accent/50"
//               >
//                 <div className="flex items-center justify-between mb-1">
//                   <h3 className="font-medium text-sm text-foreground">{request.cloud}</h3>
//                   <Badge
//                     variant="outline"
//                     className={`text-xs ${
//                       request.status === 'approved'
//                         ? 'text-cloud-emerald border-cloud-emerald'
//                         : request.status === 'pending'
//                         ? 'text-cloud-orange border-cloud-orange'
//                         : 'text-cloud-red border-cloud-red'
//                     }`}
//                   >
//                     {request.status}
//                   </Badge>
//                 </div>
//                 <div className="flex items-center justify-between text-xs text-muted-foreground">
//                   <span>{request.service}</span>
//                   <span>{new Date(request.requestDate).toLocaleDateString()}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>

//     </div>
//   );
// };

// export default OverviewPage;

// import { ReactNode, useState } from 'react';
// import { Button } from './ui/button';
// import { Card } from './ui/card';
// import { Badge } from './ui/badge';
// import { Progress } from './ui/progress';
// import {
//   TrendingUp,
//   AlertTriangle,
//   CheckCircle,
//   Clock,
//   Server,
//   DollarSign,
//   Users,
//   Activity,
//   Calendar,
//   FileText,
//   ArrowRight,
//   Shield,
// } from 'lucide-react';
// import {
//   cloudProviders,
//   recentRequests,
//   costData,
//   dashboardStats,
// } from '../mock/data';

// // Interfaces for data structures
// interface CloudProvider {
//   id: string;
//   name: string;
//   status: string;
//   resources: number;
//   cost: number;
//   region: string;
//   services: string[];
// }

// interface RecentRequest {
//   cloud: ReactNode;
//   id: string;
//   title: string;
//   user: string;
//   requester: string;
//   service: string;
//   provider: string;
//   status: 'pending' | 'approved' | 'rejected';
//   requestDate: string;
//   createdAt: string;
//   estimatedCost: number;
//   description: string;
//   rejectionReason?: string;
// }

// interface DashboardStats {
//   totalResources: string;
//   activeUsers: string;
//   uptime: number;
//   costSavings: number;
//   pendingRequests: number;
//   monthlySpend: number;
//   avgApprovalTime: string;
//   monthlyBudget: number;
// }

// interface CostData {
//   currentMonth: {
//     total: number;
//     aws: number;
//     azure: number;
//     gcp: number;
//   };
//   forecast: {
//     nextMonth: number;
//     confidence: number;
//     trend: string;
//   };
//   breakdown: {
//     compute: number;
//     storage: number;
//     networking: number;
//     databases: number;
//     other: number;
//   };
//   alerts: {
//     message: string;
//     provider: string;
//     severity: 'high' | 'medium';
//   }[];
// }

// interface User {
//   id: string;
//   name: string;
//   username: string;
//   permissions: string[];
// }

// interface OverviewPageProps {
//   currentUser: User;
//   selectedProvider: string;
//   setActiveTab: (tab: string) => void;
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

// interface FilteredData {
//   totalResources: number;
//   totalCost: number;
//   providers: CloudProvider[];
//   requests: RecentRequest[];
// }

// interface EmployeeRequestStats {
//   totalRequests: number;
//   successfulApprovals: number;
//   pendingApprovals: number;
//   rejectedApprovals: number;
// }

// const OverviewPage: React.FC<OverviewPageProps> = ({
//   currentUser,
//   selectedProvider,
//   setActiveTab,
// }) => {
//   const [activeAction, setActiveAction] = useState<string | null>(null);

//   const getFilteredData = (): FilteredData => {
//     if (selectedProvider === 'all') {
//       return {
//         totalResources: parseFloat(dashboardStats.totalResources.replace('K', '')) * 1000,
//         totalCost: costData.currentMonth.total,
//         providers: cloudProviders,
//         requests: recentRequests,
//       };
//     }

//     const provider = cloudProviders.find((p) => p.id === selectedProvider);
//     const providerRequests = recentRequests.filter((r) => r.provider === selectedProvider);

//     return {
//       totalResources: provider?.resources || 0,
//       totalCost: provider?.cost || 0,
//       providers: provider ? [provider] : [],
//       requests: providerRequests,
//     };
//   };

//   const data = getFilteredData();

//   const getEmployeeRequestStats = (): EmployeeRequestStats => {
//     const userRequests = recentRequests.filter(
//       (r) => r.requester === currentUser.username || r.requester === 'john.doe@company.com'
//     );
//     return {
//       totalRequests: userRequests.length,
//       successfulApprovals: userRequests.filter((r) => r.status === 'approved').length,
//       pendingApprovals: userRequests.filter((r) => r.status === 'pending').length,
//       rejectedApprovals: userRequests.filter((r) => r.status === 'rejected').length,
//     };
//   };

//   const employeeStats = getEmployeeRequestStats();

//   const getQuickActions = (): QuickAction[] => {
//     const baseActions: QuickAction[] = [
//       {
//         id: 'new-request',
//         title: 'Request New Service',
//         description: 'Create a new resource request',
//         icon: FileText,
//         color: 'bg-cloud-blue',
//         permission: 'request_access',
//         action: 'openDialog',
//       },
//     ];

//     if (currentUser.id === 'manager') {
//       return [
//         ...baseActions,
//         {
//           id: 'approve-requests',
//           title: 'Pending Approvals',
//           description: 'Review team requests',
//           icon: CheckCircle,
//           color: 'bg-cloud-emerald',
//           permission: 'approve_requests',
//           badge: data.requests.filter((r) => r.status === 'pending').length,
//           targetTab: 'approvals',
//           action: 'switchTab',
//         },
//         {
//           id: 'team-management',
//           title: 'Team Management',
//           description: 'Manage team access',
//           icon: Users,
//           color: 'bg-cloud-purple',
//           permission: 'manage_team',
//           targetTab: 'team',
//           action: 'switchTab',
//         },
//       ];
//     }

//     if (currentUser.id === 'admin') {
//       return [
//         ...baseActions,
//         {
//           id: 'user-management',
//           title: 'User Management',
//           description: 'Manage all users',
//           icon: Shield,
//           color: 'bg-cloud-red',
//           permission: 'full_access',
//           targetTab: 'users',
//           action: 'switchTab',
//         },
//         {
//           id: 'cost-optimization',
//           title: 'Cost Optimization',
//           description: 'Optimize cloud spend',
//           icon: DollarSign,
//           color: 'bg-cloud-orange',
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
//         color: 'bg-cloud-teal',
//         permission: 'view_resources',
//         targetTab: 'infrastructure',
//         action: 'switchTab',
//       },
//       {
//         id: 'approved-services',
//         title: 'Approved Services',
//         description: 'Access your resources',
//         icon: CheckCircle,
//         color: 'bg-cloud-emerald',
//         permission: 'view_resources',
//         targetTab: 'approved-services',
//         action: 'switchTab',
//       },
//     ];
//   };

//   const quickActions = getQuickActions();
//   const recentRequestsLimited = data.requests.slice(0, 5);
//   const pendingRequests = data.requests.filter((r) => r.status === 'pending');

//   const handleQuickAction = (action: QuickAction): void => {
//     setActiveAction(action.id);

//     if (action.action === 'openDialog') {
//       // Switch to requests tab first
//       setActiveTab('requests');
//       // Dispatch a custom event to trigger the dialog
//       setTimeout(() => {
//         window.dispatchEvent(new CustomEvent('openNewRequestDialog'));
//       }, 100);
//     } else if (action.action === 'switchTab' && action.targetTab) {
//       setActiveTab(action.targetTab);
//     } else if (action.targetTab) {
//       setActiveTab(action.targetTab);
//     }
//   };

//   const renderStatsCards = () => {
//     if (currentUser.id === 'employee') {
//       return (
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <Card className="p-4 bg-gradient-card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
//                 <p className="text-2xl font-bold text-foreground">{employeeStats.totalRequests}</p>
//               </div>
//               <FileText className="w-8 h-8 text-cloud-blue" />
//             </div>
//             <div className="mt-2">
//               <div className="flex items-center text-sm text-muted-foreground">
//                 <Calendar className="w-4 h-4 mr-1" />
//                 <span>All time</span>
//               </div>
//             </div>
//           </Card>
//           <Card className="p-4 bg-gradient-card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Successful Approvals</p>
//                 <p className="text-2xl font-bold text-foreground">{employeeStats.successfulApprovals}</p>
//               </div>
//               <CheckCircle className="w-8 h-8 text-cloud-emerald" />
//             </div>
//             <div className="mt-2">
//               <div className="flex items-center text-sm text-cloud-emerald">
//                 <TrendingUp className="w-4 h-4 mr-1" />
//                 <span>Great progress!</span>
//               </div>
//             </div>
//           </Card>
//           <Card className="p-4 bg-gradient-card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
//                 <p className="text-2xl font-bold text-foreground">{employeeStats.pendingApprovals}</p>
//               </div>
//               <Clock className="w-8 h-8 text-cloud-orange" />
//             </div>
//             <div className="mt-2">
//               <div className="flex items-center text-sm text-muted-foreground">
//                 <Calendar className="w-4 h-4 mr-1" />
//                 <span>Avg. 2 days</span>
//               </div>
//             </div>
//           </Card>
//           <Card className="p-4 bg-gradient-card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Rejected Approvals</p>
//                 <p className="text-2xl font-bold text-foreground">{employeeStats.rejectedApprovals}</p>
//               </div>
//               <AlertTriangle className="w-8 h-8 text-cloud-red" />
//             </div>
//             <div className="mt-2">
//               <div className="flex items-center text-sm text-muted-foreground">
//                 <Activity className="w-4 h-4 mr-1" />
//                 <span>Review needed</span>
//               </div>
//             </div>
//           </Card>
//         </div>
//       );
//     }

//     return (
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card className="p-4 bg-gradient-card">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Team Members</p>
//               <p className="text-2xl font-bold text-foreground">{parseInt(dashboardStats.activeUsers)}</p>
//             </div>
//             <Users className="w-8 h-8 text-cloud-blue" />
//           </div>
//           <div className="mt-2">
//             <div className="flex items-center text-sm text-cloud-emerald">
//               <TrendingUp className="w-4 h-4 mr-1" />
//               <span className="text-sm text-cloud-emerald">+5% this month</span>
//             </div>
//           </div>
//         </Card>
//         <Card className="p-4 bg-gradient-card">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Pending Requests</p>
//               <p className="text-2xl font-bold text-foreground">{pendingRequests.length}</p>
//             </div>
//             <Clock className="w-8 h-8 text-cloud-orange" />
//           </div>
//           <div className="mt-2">
//             <div className="flex items-center text-sm text-muted-foreground">
//               <Calendar className="w-4 h-4 mr-1" />
//               <span>Avg. 2 days</span>
//             </div>
//           </div>
//         </Card>
//         <Card className="p-4 bg-gradient-card">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Monthly Cost</p>
//               <p className="text-2xl font-bold text-foreground">${data.totalCost.toLocaleString()}</p>
//             </div>
//             <DollarSign className="w-8 h-8 text-cloud-emerald" />
//           </div>
//           <div className="mt-2">
//             <div className="flex items-center text-sm text-cloud-red">
//               <TrendingUp className="w-4 h-4 mr-1" />
//               <span>+12% from last month</span>
//             </div>
//           </div>
//         </Card>
//         <Card className="p-4 bg-gradient-card">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Total Resources</p>
//               <p className="text-2xl font-bold text-foreground">{data.totalResources}</p>
//             </div>
//             <Server className="w-8 h-8 text-cloud-purple" />
//           </div>
//           <div className="mt-2">
//             <div className="flex items-center text-sm text-cloud-emerald">
//               <Activity className="w-4 h-4 mr-1" />
//               <span>99.9% uptime</span>
//             </div>
//           </div>
//         </Card>
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}

//       {/* Stats Cards */}
//       {renderStatsCards()}

//       {/* Quick Actions */}
//       <Card className="p-6 bg-gradient-card">
//         <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {quickActions.map((action) => {
//             const Icon = action.icon;
//             const hasPermission = currentUser.permissions.includes(action.permission);

//             if (!hasPermission) return null;

//             return (
//               <div
//                 key={action.id}
//                 className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
//                   activeAction === action.id
//                     ? 'border-primary bg-primary-light'
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
//                       {action.badge && (
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
//         <Card className="p-6 bg-gradient-card">
//           <h2 className="text-lg font-semibold text-foreground mb-4">Cloud Providers</h2>
//           <div className="space-y-4">
//             {data.providers.map((provider) => (
//               <div key={provider.id} className="p-4 border rounded-lg bg-accent/50">
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center space-x-3">
//                     <div
//                       className={`w-3 h-3 rounded-full ${
//                         provider.status === 'connected' ? 'bg-cloud-emerald' : 'bg-cloud-red'
//                       }`}
//                     ></div>
//                     <h3 className="font-medium text-foreground">{provider.name}</h3>
//                   </div>
//                   <Badge variant="outline" className="text-xs">
//                     {provider.status}
//                   </Badge>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <span className="text-muted-foreground">Resources:</span>
//                     <span className="font-medium ml-2">{provider.resources}</span>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground">Cost:</span>
//                     <span className="font-medium ml-2">${provider.cost.toLocaleString()}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>

//         {/* Recent Requests */}
//         <Card className="p-6 bg-gradient-card">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-foreground">Recent Requests</h2>
//             <Button variant="outline" size="sm" onClick={() => setActiveTab('requests')}>
//               View All
//             </Button>
//           </div>
//           <div className="space-y-3">
//             {recentRequestsLimited.map((request) => (
//               <div
//                 key={request.id}
//                 className="p-3 border rounded-lg hover:bg-accent/50"
//               >
//                 <div className="flex items-center justify-between mb-1">
//                   <h3 className="font-medium text-sm text-foreground">{request.cloud}</h3>
//                   <Badge
//                     variant="outline"
//                     className={`text-xs ${
//                       request.status === 'approved'
//                         ? 'text-cloud-emerald border-cloud-emerald'
//                         : request.status === 'pending'
//                         ? 'text-cloud-orange border-cloud-orange'
//                         : 'text-cloud-red border-cloud-red'
//                     }`}
//                   >
//                     {request.status}
//                   </Badge>
//                 </div>
//                 <div className="flex items-center justify-between text-xs text-muted-foreground">
//                   <span>{request.service}</span>
//                   <span>{new Date(request.requestDate).toLocaleDateString()}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>

//     </div>
//   );
// };

// export default OverviewPage;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import {
//   BarChart3,
//   Clock,
//   AlertTriangle,
//   CheckCircle,
//   XCircle,
//   Filter,
//   TrendingUp,
//   Users,
//   Cloud
// } from 'lucide-react';

// interface Request {
//   Role: string;
//   Cloud: string;
//   Service: string;
//   Status: string;
//   Manager: string;
//   RequestID: string;
//   ApplicationTime: string | null;
//   UserID: string;
//   RequestTime: string;
//   Reason: string;
//   PolicyExpiry: string | null;
//   ReminderSent: boolean;
//   ApprovalTime: string | null;
//   AccessLevel: string;
//   Username: string;
//   Policy?: any;
// }

// interface ApiResponse {
//   requests: Request[];
//   lastEvaluatedKey: string | null;
//   message: string;
// }

// const OverviewPage = () => {
//   const [requests, setRequests] = useState<Request[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedProvider, setSelectedProvider] = useState('all');
//   const [currentUser, setCurrentUser] = useState<any>(null);
//   const navigate = useNavigate();

//   // Get current user from localStorage
//   useEffect(() => {
//     const userRole = localStorage.getItem('role');
//     const userName = localStorage.getItem('fullName');

//     if (userRole && userName) {
//       setCurrentUser({
//         role: userRole,
//         name: userName,
//         // permissions: ['view_resources', 'approve_requests', 'manage_team'] // Set based on role
//       });
//     }
//   }, []);

//   // Fetch requests from API
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('https://9y40j38nv9.execute-api.ap-south-1.amazonaws.com/list_requests');

//         if (!response.ok) {
//           throw new Error('Failed to fetch requests');
//         }

//         const data: ApiResponse = await response.json();
//         setRequests(data.requests || []);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, []);

//   // Filter requests based on selected provider
//   const filteredRequests = selectedProvider === 'all'
//     ? requests
//     : requests.filter(request => request.Cloud.toLowerCase() === selectedProvider.toLowerCase());

//   // Calculate statistics
//   const stats = {
//     total: filteredRequests.length,
//     pending: filteredRequests.filter(r => r.Status === 'pending').length,
//     approved: filteredRequests.filter(r => r.Status === 'applied').length,
//     rejected: filteredRequests.filter(r => r.Status === 'rejected').length
//   };

//   // Get recent requests (last 5)
//   const recentRequests = filteredRequests
//     .sort((a, b) => new Date(b.RequestTime).getTime() - new Date(a.RequestTime).getTime())
//     .slice(0, 5);

//   // Get unique cloud providers for filter
//   const cloudProviders = ['all', ...new Set(requests.map(r => r.Cloud.toLowerCase()))];

//   const handleProviderChange = (provider: string) => {
//     setSelectedProvider(provider);
//   };

//   const getStatusBadgeVariant = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'pending':
//         return 'outline';
//       case 'applied':
//         return 'default';
//       case 'rejected':
//         return 'destructive';
//       default:
//         return 'secondary';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'pending':
//         return Clock;
//       case 'applied':
//         return CheckCircle;
//       case 'rejected':
//         return XCircle;
//       default:
//         return AlertTriangle;
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <div className="w-8 h-8 animate-spin border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
//           <p className="text-muted-foreground">Loading requests...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
//           <p className="text-destructive mb-4">Error loading requests: {error}</p>
//           <Button onClick={() => window.location.reload()}>
//             Try Again
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">

//       {/* Statistics Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
//             <BarChart3 className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.total}</div>
//             <p className="text-xs text-muted-foreground">
//               All access requests
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
//             <Clock className="h-4 w-4 text-orange-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-orange-500">{stats.pending}</div>
//             <p className="text-xs text-muted-foreground">
//               Awaiting your review
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Approved</CardTitle>
//             <CheckCircle className="h-4 w-4 text-green-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-green-500">{stats.approved}</div>
//             <p className="text-xs text-muted-foreground">
//               Successfully applied
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Rejected</CardTitle>
//             <XCircle className="h-4 w-4 text-red-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-red-500">{stats.rejected}</div>
//             <p className="text-xs text-muted-foreground">
//               Denied requests
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card className="cursor-pointer hover:shadow-md transition-shadow"
//               onClick={() => navigate('/manager-dashboard/approvals')}>
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <AlertTriangle className="w-5 h-5 text-orange-500" />
//               <span>Review Pending Requests</span>
//             </CardTitle>
//             <CardDescription>
//               {stats.pending} requests need your attention
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Button className="w-full">
//               Go to Approvals
//             </Button>
//           </CardContent>
//         </Card>

//         <Card className="cursor-pointer hover:shadow-md transition-shadow"
//               onClick={() => navigate('/manager-dashboard/team-management')}>
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <Users className="w-5 h-5 text-blue-500" />
//               <span>Manage Team</span>
//             </CardTitle>
//             <CardDescription>
//               View and manage team members
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Button variant="outline" className="w-full">
//               Team Management
//             </Button>
//           </CardContent>
//         </Card>

//         <Card className="cursor-pointer hover:shadow-md transition-shadow"
//               onClick={() => navigate('/manager-dashboard/request-history')}>
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <TrendingUp className="w-5 h-5 text-purple-500" />
//               <span>View Analytics</span>
//             </CardTitle>
//             <CardDescription>
//               Request history and trends
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Button variant="outline" className="w-full">
//               View History
//             </Button>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Requests */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center space-x-2">
//             <Clock className="w-5 h-5" />
//             <span>Recent Requests</span>
//           </CardTitle>
//           <CardDescription>
//             Latest access requests from your team
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {recentRequests.length === 0 ? (
//             <div className="text-center py-8 text-muted-foreground">
//               No recent requests found
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {recentRequests.map((request) => {
//                 const StatusIcon = getStatusIcon(request.Status);
//                 return (
//                   <div key={request.RequestID}
//                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
//                     <div className="flex items-center space-x-4">
//                       <StatusIcon className="w-5 h-5 text-muted-foreground" />
//                       <div>
//                         <div className="flex items-center space-x-2">
//                           <span className="font-medium">{request.Username}</span>
//                           <Badge variant="secondary" className="text-xs">
//                             {request.Role}
//                           </Badge>
//                         </div>
//                         <div className="text-sm text-muted-foreground">
//                           {request.Cloud} • {request.Service} • {request.AccessLevel} access
//                         </div>
//                         <div className="text-xs text-muted-foreground">
//                           {formatDate(request.RequestTime)}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge variant={getStatusBadgeVariant(request.Status)}>
//                         {request.Status.charAt(0).toUpperCase() + request.Status.slice(1)}
//                       </Badge>
//                       <Cloud className="w-4 h-4 text-muted-foreground" />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default OverviewPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  BarChart3,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Filter,
  TrendingUp,
  Users,
  Cloud
} from 'lucide-react';
import { useCloudProvider } from '@/context/CloudProviderContext';

interface Request {
  Role: string;
  Cloud: string;
  Service: string;
  Status: string;
  Manager: string;
  RequestID: string;
  ApplicationTime: string | null;
  UserID: string;
  RequestTime: string;
  Reason: string;
  PolicyExpiry: string | null;
  ReminderSent: boolean;
  ApprovalTime: string | null;
  AccessLevel: string;
  Username: string;
  Policy?: any;
}

interface ApiResponse {
  requests: Request[];
  lastEvaluatedKey: string | null;
  message: string;
}

const OverviewPage = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState('all');
  
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();

  const { cloudProvider, setCloudProvider } = useCloudProvider();

  // Get current user from localStorage
  useEffect(() => {
    const userRole = localStorage.getItem("role");
    const userName = localStorage.getItem("fullName");

    if (userRole && userName) {
      setCurrentUser({
        role: userRole,
        name: userName,
        // permissions: ['view_resources', 'approve_requests', 'manage_team'] // Set based on role
      });
    }
  }, []);

  // Fetch requests from API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://9y40j38nv9.execute-api.ap-south-1.amazonaws.com/list_requests"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }

        const data: ApiResponse = await response.json();
        setRequests(data.requests || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Filter requests based on selected provider
  const filteredRequests = cloudProvider === 'all' 
    ? requests 
    : requests.filter(request => request.Cloud.toLowerCase() === cloudProvider.toLowerCase());

  // Calculate statistics
  const stats = {
    total: filteredRequests.length,
    pending: filteredRequests.filter((r) => r.Status === "pending").length,
    approved: filteredRequests.filter((r) => r.Status === "applied").length,
    rejected: filteredRequests.filter((r) => r.Status === "rejected").length,
  };

  // Get recent requests (last 5)
  const recentRequests = filteredRequests
    .sort(
      (a, b) =>
        new Date(b.RequestTime).getTime() - new Date(a.RequestTime).getTime()
    )
    .slice(0, 5);

  // Get unique cloud providers for filter
  const cloudProviders = [
    "all",
    ...new Set(requests.map((r) => r.Cloud.toLowerCase())),
  ];

  const handleProviderChange = (provider: string) => {
    setSelectedProvider(provider);
  };

  // Navigation handlers for statistics cards
  const handleTotalRequestsClick = () => {
    navigate("/manager-dashboard/request-history");
  };

  const handlePendingClick = () => {
    navigate("/manager-dashboard/request-history", {
      state: { defaultFilter: "pending" },
    });
  };

  const handleApprovedClick = () => {
    navigate("/manager-dashboard/request-history", {
      state: { defaultFilter: "applied" },
    });
  };

  const handleRejectedClick = () => {
    navigate("/manager-dashboard/request-history", {
      state: { defaultFilter: "rejected" },
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "outline";
      case "applied":
        return "default";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return Clock;
      case "applied":
        return CheckCircle;
      case "rejected":
        return XCircle;
      default:
        return AlertTriangle;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 animate-spin border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <p className="text-destructive mb-4">
            Error loading requests: {error}
          </p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
          onClick={handleTotalRequestsClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Requests
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All access requests</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
          onClick={handlePendingClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approval
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">
              {stats.pending}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting your review
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
          onClick={handleApprovedClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {stats.approved}
            </div>
            <p className="text-xs text-muted-foreground">
              Successfully applied
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
          onClick={handleRejectedClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {stats.rejected}
            </div>
            <p className="text-xs text-muted-foreground">Denied requests</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-primary" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>
            Common actions for managing requests and your team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow p-4"
              onClick={() => navigate("/manager-dashboard/approvals")}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base mb-1">
                    Review Pending Requests
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {stats.pending} requests need your attention
                  </p>
                  <Button className="w-full">Go to Approvals</Button>
                </div>
              </div>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-md transition-shadow p-4"
              onClick={() => navigate("/manager-dashboard/team-management")}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base mb-1">Manage Team</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    View and manage team members
                  </p>
                  <Button variant="outline" className="w-full">
                    Team Management
                  </Button>
                </div>
              </div>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-md transition-shadow p-4"
              onClick={() => navigate("/manager-dashboard/request-history")}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base mb-1">
                    View Analytics
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Request history and trends
                  </p>
                  <Button variant="outline" className="w-full">
                    View History
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Recent Requests</span>
          </CardTitle>
          <CardDescription>
            Latest access requests from your team
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentRequests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No recent requests found
            </div>
          ) : (
            <div className="space-y-4">
              {recentRequests.map((request) => {
                const StatusIcon = getStatusIcon(request.Status);
                return (
                  <div
                    key={request.RequestID}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <StatusIcon className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            {request.Username}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {request.Role}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {request.Cloud} • {request.Service} •{" "}
                          {request.AccessLevel} access
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(request.RequestTime)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusBadgeVariant(request.Status)}>
                        {request.Status.charAt(0).toUpperCase() +
                          request.Status.slice(1)}
                      </Badge>
                      <Cloud className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewPage;
