// import React, { useState } from 'react';
// import { Button } from './ui/button';
// import { Card } from './ui/card';
// import { Badge } from './ui/badge';
// import { Input } from './ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from './ui/select';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from './ui/table';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from './ui/dialog';
// import {
//   CheckCircle,
//   Search,
//   Calendar,
//   DollarSign,
//   Filter,
//   Eye,
//   Clock,
//   XCircle,
//   AlertCircle,
//   Shield,
// } from 'lucide-react';
// import { recentRequests, cloudProviders } from '../mock/data';

// // Interface for RecentRequest
// interface RecentRequest {
//   id: string;
//   title: string;
//   user: string;
//   requester: string;
//   service: string;
//   cloud: string;
//   accesslevel: string;
//   status: 'pending' | 'approved' | 'rejected';
//   requestDate: string;
//   createdAt: string;
//   estimatedCost: number;
//   description: string;
//   rejectionReason?: string;
// }

// interface CloudProvider {
//   id: string;
//   name: string;
//   status: string;
//   resources: number;
//   cost: number;
//   region: string;
//   services: string[];
// }

// interface ApprovedServicesPageProps {
//   selectedProvider: string;
// }

// const ApprovedServicesPage: React.FC<ApprovedServicesPageProps> = ({ selectedProvider }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [providerFilter, setProviderFilter] = useState('all');
//   const [sortBy, setSortBy] = useState('newest');
//   const [viewingRequest, setViewingRequest] = useState<RecentRequest | null>(null);

//   // Filter only approved requests
//   const approvedRequests = recentRequests.filter(request => request.status === 'approved');

//   const filteredServices = approvedRequests.filter(request => {
//     const matchesSearch =
//       request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       request.cloud.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       request.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       request.accesslevel.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesProvider = providerFilter === 'all' || request.cloud === providerFilter;
//     const matchesSelectedProvider = selectedProvider === 'all' || request.cloud === selectedProvider;
//     return matchesSearch && matchesProvider && matchesSelectedProvider;
//   });

//   const sortedServices = [...filteredServices].sort((a, b) => {
//     switch (sortBy) {
//       case 'newest':
//         return new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime();
//       case 'oldest':
//         return new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime();
//       case 'cost-high':
//         return b.estimatedCost - a.estimatedCost;
//       case 'cost-low':
//         return a.estimatedCost - b.estimatedCost;
//       default:
//         return 0;
//     }
//   });

//   const getProviderColor = (provider: string) => {
//     switch (provider) {
//       case 'aws':
//         return 'bg-orange-100 text-orange-800 border-orange-200';
//       case 'azure':
//         return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'gcp':
//         return 'bg-green-100 text-green-800 border-green-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'approved':
//         return 'border-green-500 text-green-600';
//       case 'rejected':
//         return 'border-red-500 text-red-600';
//       case 'pending':
//         return 'border-yellow-500 text-yellow-600';
//       default:
//         return 'border-gray-500 text-gray-600';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'approved':
//         return <CheckCircle className="w-4 h-4 text-green-600" />;
//       case 'pending':
//         return <Clock className="w-4 h-4 text-yellow-600" />;
//       case 'rejected':
//         return <XCircle className="w-4 h-4 text-red-600" />;
//       default:
//         return <AlertCircle className="w-4 h-4 text-gray-600" />;
//     }
//   };

//   const totalApprovedCost = sortedServices.reduce((sum, service) => sum + service.estimatedCost, 0);

//   return (
//     <div className="space-y-6">
//       {/* Summary Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Services</p>
//               <p className="text-2xl font-bold">{sortedServices.length}</p>
//             </div>
//             <CheckCircle className="w-8 h-8 text-green-600" />
//           </div>
//         </Card>
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Active Access</p>
//               <p className="text-2xl font-bold">{Math.floor(sortedServices.length * 0.9)}</p>
//             </div>
//             <Shield className="w-8 h-8 text-blue-600" />
//           </div>
//         </Card>
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Cost</p>
//               <p className="text-2xl font-bold">${totalApprovedCost.toLocaleString()}</p>
//             </div>
//             <DollarSign className="w-8 h-8 text-purple-600" />
//           </div>
//         </Card>
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">This Month</p>
//               <p className="text-2xl font-bold">
//                 {
//                   sortedServices.filter(s => 
//                     new Date(s.requestDate).getMonth() === new Date().getMonth() &&
//                     new Date(s.requestDate).getFullYear() === new Date().getFullYear()
//                   ).length
//                 }
//               </p>
//             </div>
//             <Calendar className="w-8 h-8 text-orange-600" />
//           </div>
//         </Card>
//       </div>

//       {/* Filters */}
//       <Card className="p-4">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <Input
//                 placeholder="Search approved services..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <Select value={providerFilter} onValueChange={setProviderFilter}>
//               <SelectTrigger className="w-40">
//                 <SelectValue placeholder="Cloud Provider" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Providers</SelectItem>
//                 {cloudProviders.map(provider => (
//                   <SelectItem key={provider.id} value={provider.id}>
//                     {provider.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             {/* <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger className="w-32">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="newest">Newest</SelectItem>
//                 <SelectItem value="oldest">Oldest</SelectItem>
//                 <SelectItem value="cost-high">Cost: High to Low</SelectItem>
//                 <SelectItem value="cost-low">Cost: Low to High</SelectItem>
//               </SelectContent>
//             </Select> */}
            
//           </div>
//         </div>
//       </Card>

//       {/* Services Table */}
//       <Card className="p-4 max-h-[500px] overflow-y-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Id</TableHead>
//               <TableHead>Cloud</TableHead>
//               <TableHead>Resource Type</TableHead>
//               <TableHead>Access Level</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Request Date</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {sortedServices.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={7} className="h-24 text-center">
//                   No approved services found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               sortedServices.map((service) => (
//                 <TableRow key={service.id}>
//                   <TableCell>{service.id}</TableCell>
//                   <TableCell>
//                     <Badge variant="outline" className={getProviderColor(service.cloud)}>
//                       {service.cloud.toUpperCase()}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>{service.service}</TableCell>
//                   <TableCell>{service.accesslevel}</TableCell>
//                   <TableCell>
//                     <Badge variant="outline" className={getStatusColor(service.status)}>
//                       {getStatusIcon(service.status)}
//                       <span className="ml-1">{service.status.toUpperCase()}</span>
//                     </Badge>
//                   </TableCell>
//                   <TableCell>{service.requestDate}</TableCell>
//                   <TableCell className="text-right">
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => setViewingRequest(service)}
//                     >
//                       <Eye className="h-4 w-4 mr-2" />
//                       View
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </Card>

//       {/* Request Details Dialog */}
//       <Dialog open={!!viewingRequest} onOpenChange={() => setViewingRequest(null)}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Request Details</DialogTitle>
//           </DialogHeader>
//           {viewingRequest && (
//             <div className="space-y-2 text-sm">
//               <p><strong>Request ID:</strong> {viewingRequest.id}</p>
//               <p><strong>Cloud:</strong> {viewingRequest.cloud.toUpperCase()}</p>
//               <p><strong>Resource Type:</strong> {viewingRequest.service}</p>
//               <p><strong>Access Level:</strong> {viewingRequest.accesslevel}</p>
//               <p><strong>Status:</strong> {viewingRequest.status.toUpperCase()}</p>
//               <p><strong>Description:</strong> {viewingRequest.description}</p>
//               <p><strong>Request Date:</strong> {viewingRequest.requestDate}</p>
//               <p><strong>Title:</strong> {viewingRequest.title || 'N/A'}</p>
//               <p><strong>User:</strong> {viewingRequest.user || 'N/A'}</p>
//               <p><strong>Requester:</strong> {viewingRequest.requester || 'N/A'}</p>
//               <p><strong>Created At:</strong> {viewingRequest.createdAt ? new Date(viewingRequest.createdAt).toLocaleString() : 'N/A'}</p>
//               <p><strong>Estimated Cost:</strong> ${viewingRequest.estimatedCost.toLocaleString()}</p>
//               <p><strong>Rejection Reason:</strong> {viewingRequest.rejectionReason || 'N/A'}</p>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ApprovedServicesPage;



// import React, { useState, useEffect } from 'react';
// import { Button } from './ui/button';
// import { Card } from './ui/card';
// import { Badge } from './ui/badge';
// import { Input } from './ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from './ui/select';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from './ui/table';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from './ui/dialog';
// import {
//   CheckCircle,
//   Search,
//   Calendar,
//   DollarSign,
//   Filter,
//   Eye,
//   Clock,
//   XCircle,
//   AlertCircle,
//   Shield,
//   Loader2,
// } from 'lucide-react';
 
// // Updated interface to match API response
// interface ApiRequest {
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
//   requests: ApiRequest[];
//   lastEvaluatedKey: string | null;
//   message: string;
// }
 
// interface ApprovedServicesPageProps {
//   selectedProvider: string;
//   fullName: string; // Add fullName prop for API call
// }
 
// const ApprovedServicesPage = ({
 
// }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [providerFilter, setProviderFilter] = useState('all');
//   const [sortBy, setSortBy] = useState('newest');
//   const [viewingRequest, setViewingRequest] = useState<ApiRequest | null>(null);
//   const [requests, setRequests] = useState<ApiRequest[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedProvider, setselectedProvider]=useState('all')
//   const [fullName , setfullName]=useState('HarshithaMuthyam')
 
//   // Fetch data from API
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         setLoading(true);
//         setError(null);
       
//         const response = await fetch(
//           `https://9y40j38nv9.execute-api.ap-south-1.amazonaws.com/list_requests?Username=${encodeURIComponent(fullName)}`
//         );
       
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
       
//         const data: ApiResponse = await response.json();
//         setRequests(data.requests || []);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to fetch requests');
//         console.error('Error fetching requests:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
 
//     if (fullName) {
//       fetchRequests();
//     }
//   }, [fullName]);
 
//   // Filter only approved/applied requests (matching your API statuses)
//   const approvedRequests = requests.filter(request =>
//     request.Status === 'approved' || request.Status === 'applied'
//   );
 
//   const filteredServices = approvedRequests.filter(request => {
//     const matchesSearch =
//       request.RequestID.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       request.Cloud.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       request.Service.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       request.AccessLevel.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       request.Username.toLowerCase().includes(searchQuery.toLowerCase());
   
//     const matchesProvider = providerFilter === 'all' || request.Cloud.toLowerCase() === providerFilter.toLowerCase();
//     const matchesSelectedProvider = selectedProvider === 'all' || request.Cloud.toLowerCase() === selectedProvider.toLowerCase();
   
//     return matchesSearch && matchesProvider && matchesSelectedProvider;
//   });
 
//   const sortedServices = [...filteredServices].sort((a, b) => {
//     switch (sortBy) {
//       case 'newest':
//         return new Date(b.RequestTime).getTime() - new Date(a.RequestTime).getTime();
//       case 'oldest':
//         return new Date(a.RequestTime).getTime() - new Date(b.RequestTime).getTime();
//       case 'service-az':
//         return a.Service.localeCompare(b.Service);
//       case 'service-za':
//         return b.Service.localeCompare(a.Service);
//       default:
//         return 0;
//     }
//   });
 
//   const getProviderColor = (provider: string) => {
//     switch (provider.toLowerCase()) {
//       case 'aws':
//         return 'bg-orange-100 text-orange-800 border-orange-200';
//       case 'azure':
//         return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'gcp':
//         return 'bg-green-100 text-green-800 border-green-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };
 
//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'approved':
//         return 'border-green-500 text-green-600';
//       case 'applied':
//         return 'border-blue-500 text-blue-600';
//       case 'rejected':
//         return 'border-red-500 text-red-600';
//       case 'pending':
//         return 'border-yellow-500 text-yellow-600';
//       default:
//         return 'border-gray-500 text-gray-600';
//     }
//   };
 
//   const getStatusIcon = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'approved':
//         return <CheckCircle className="w-4 h-4 text-green-600" />;
//       case 'applied':
//         return <Shield className="w-4 h-4 text-blue-600" />;
//       case 'pending':
//         return <Clock className="w-4 h-4 text-yellow-600" />;
//       case 'rejected':
//         return <XCircle className="w-4 h-4 text-red-600" />;
//       default:
//         return <AlertCircle className="w-4 h-4 text-gray-600" />;
//     }
//   };
 
//   const formatDate = (dateString: string) => {
//     try {
//       return new Date(dateString).toLocaleDateString();
//     } catch {
//       return dateString;
//     }
//   };
 
//   const getUniqueProviders = () => {
//     const providers = [...new Set(requests.map(r => r.Cloud.toLowerCase()))];
//     return providers.map(p => ({ id: p, name: p.toUpperCase() }));
//   };
 
//   const activeServices = sortedServices.filter(s =>
//     s.Status === 'applied' && (!s.PolicyExpiry || new Date(s.PolicyExpiry) > new Date())
//   );
 
//   const thisMonthServices = sortedServices.filter(s => {
//     const requestDate = new Date(s.RequestTime);
//     const now = new Date();
//     return requestDate.getMonth() === now.getMonth() &&
//            requestDate.getFullYear() === now.getFullYear();
//   });
 
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <Loader2 className="w-8 h-8 animate-spin" />
//         <span className="ml-2">Loading approved services...</span>
//       </div>
//     );
//   }
 
//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
//           <p className="text-red-600">Error: {error}</p>
//           <Button
//             onClick={() => window.location.reload()}
//             variant="outline"
//             className="mt-2"
//           >
//             Retry
//           </Button>
//         </div>
//       </div>
//     );
//   }
 
//   return (
//     <div className="space-y-6">
     
 
//       {/* Filters */}
//       <Card className="p-4">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <Input
//                 placeholder="Search approved services..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <Select value={providerFilter} onValueChange={setProviderFilter}>
//               <SelectTrigger className="w-40">
//                 <SelectValue placeholder="Cloud Provider" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Providers</SelectItem>
//                 {getUniqueProviders().map(provider => (
//                   <SelectItem key={provider.id} value={provider.id}>
//                     {provider.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger className="w-40">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="newest">Newest First</SelectItem>
//                 <SelectItem value="oldest">Oldest First</SelectItem>
//                 <SelectItem value="service-az">Service A-Z</SelectItem>
//                 <SelectItem value="service-za">Service Z-A</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </Card>
 
//       {/* Services Table */}
//       <Card className="p-4">
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Request ID</TableHead>
//                 <TableHead>Cloud</TableHead>
//                 <TableHead>Service</TableHead>
//                 <TableHead>Access Level</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Request Date</TableHead>
//                 <TableHead>Expiry</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {sortedServices.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={8} className="h-24 text-center">
//                     No approved services found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 sortedServices.map((service) => (
//                   <TableRow key={service.RequestID}>
//                     <TableCell className="font-mono text-xs">
//                       {service.RequestID.substring(0, 8)}...
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant="outline" className={getProviderColor(service.Cloud)}>
//                         {service.Cloud.toUpperCase()}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>{service.Service}</TableCell>
//                     <TableCell>
//                       <Badge variant="secondary">
//                         {service.AccessLevel}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant="outline" className={getStatusColor(service.Status)}>
//                         {getStatusIcon(service.Status)}
//                         <span className="ml-1">{service.Status.toUpperCase()}</span>
//                       </Badge>
//                     </TableCell>
//                     <TableCell>{formatDate(service.RequestTime)}</TableCell>
//                     <TableCell>
//                       {service.PolicyExpiry ? (
//                         <span className={
//                           new Date(service.PolicyExpiry) < new Date()
//                             ? 'text-red-600'
//                             : 'text-green-600'
//                         }>
//                           {formatDate(service.PolicyExpiry)}
//                         </span>
//                       ) : (
//                         <span className="text-gray-400">No expiry</span>
//                       )}
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => setViewingRequest(service)}
//                       >
//                         <Eye className="h-4 w-4 mr-2" />
//                         View
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </Card>
 
//       {/* Request Details Dialog */}
//       <Dialog open={!!viewingRequest} onOpenChange={() => setViewingRequest(null)}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>Request Details</DialogTitle>
//           </DialogHeader>
//           {viewingRequest && (
//             <div className="space-y-3 text-sm max-h-96 overflow-y-auto">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p><strong>Request ID:</strong></p>
//                   <p className="font-mono text-xs break-all">{viewingRequest.RequestID}</p>
//                 </div>
//                 <div>
//                   <p><strong>Username:</strong> {viewingRequest.Username}</p>
//                 </div>
//               </div>
             
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p><strong>Cloud:</strong> {viewingRequest.Cloud.toUpperCase()}</p>
//                 </div>
//                 <div>
//                   <p><strong>Service:</strong> {viewingRequest.Service}</p>
//                 </div>
//               </div>
             
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p><strong>Access Level:</strong> {viewingRequest.AccessLevel}</p>
//                 </div>
//                 <div>
//                   <p><strong>Role:</strong> {viewingRequest.Role}</p>
//                 </div>
//               </div>
             
//               <div>
//                 <p><strong>Status:</strong></p>
//                 <Badge variant="outline" className={getStatusColor(viewingRequest.Status)}>
//                   {getStatusIcon(viewingRequest.Status)}
//                   <span className="ml-1">{viewingRequest.Status.toUpperCase()}</span>
//                 </Badge>
//               </div>
             
//               <div>
//                 <p><strong>Reason:</strong></p>
//                 <p className="bg-gray-50 p-2 rounded mt-1">{viewingRequest.Reason}</p>
//               </div>
             
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p><strong>Request Time:</strong></p>
//                   <p>{new Date(viewingRequest.RequestTime).toLocaleString()}</p>
//                 </div>
//                 <div>
//                   <p><strong>Manager:</strong> {viewingRequest.Manager}</p>
//                 </div>
//               </div>
             
//               {viewingRequest.ApplicationTime && (
//                 <div>
//                   <p><strong>Application Time:</strong></p>
//                   <p>{new Date(viewingRequest.ApplicationTime).toLocaleString()}</p>
//                 </div>
//               )}
             
//               {viewingRequest.PolicyExpiry && (
//                 <div>
//                   <p><strong>Policy Expiry:</strong></p>
//                   <p className={
//                     new Date(viewingRequest.PolicyExpiry) < new Date()
//                       ? 'text-red-600'
//                       : 'text-green-600'
//                   }>
//                     {new Date(viewingRequest.PolicyExpiry).toLocaleString()}
//                   </p>
//                 </div>
//               )}
             
//               {viewingRequest.Policy && (
//                 <div>
//                   <p><strong>Policy:</strong></p>
//                   <pre className="bg-gray-50 p-2 rounded text-xs overflow-x-auto">
//                     {JSON.stringify(viewingRequest.Policy, null, 2)}
//                   </pre>
//                 </div>
//               )}
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };
 
// export default ApprovedServicesPage;
 
 
//  import React, { useState, useEffect } from 'react';
// import { Button } from './ui/button';
// import { Card } from './ui/card';
// import { Badge } from './ui/badge';
// import { Input } from './ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from './ui/select';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from './ui/table';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from './ui/dialog';
// import {
//   CheckCircle,
//   Search,
//   Calendar,
//   DollarSign,
//   Filter,
//   Eye,
//   Clock,
//   XCircle,
//   AlertCircle,
//   Shield,
//   Loader2,
// } from 'lucide-react';
 
// // Updated interface to match API response
// interface ApiRequest {
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
//   requests: ApiRequest[];
//   lastEvaluatedKey: string | null;
//   message: string;
// }
 
// interface ApprovedServicesPageProps {
//   selectedProvider: string;
//   fullName: string; // Add fullName prop for API call
// }
 
// const ApprovedServicesPage = ({
 
// }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [providerFilter, setProviderFilter] = useState('all');
//   const [sortBy, setSortBy] = useState('newest');
//   const [viewingRequest, setViewingRequest] = useState<ApiRequest | null>(null);
//   const [requests, setRequests] = useState<ApiRequest[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedProvider, setselectedProvider]=useState('all')
//   const fullName=localStorage.getItem('fullName')  


  
//   // Fetch data from API
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         setLoading(true);
//         setError(null);
       
//         const response = await fetch(
//           `https://9y40j38nv9.execute-api.ap-south-1.amazonaws.com/list_requests?Username=${encodeURIComponent(fullName)}`
//         );
       
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
       
//         const data: ApiResponse = await response.json();
//         setRequests(data.requests || []);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to fetch requests');
//         console.error('Error fetching requests:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
 
//     if (fullName) {
//       fetchRequests();
//     }
//   }, [fullName]);
 
//   // Filter only approved/applied requests (matching your API statuses)
//   const approvedRequests = requests.filter(request =>
//     request.Status === 'approved' || request.Status === 'applied'
//   );

//   // Helper function to capitalize first letter of service name
//   const capitalizeService = (service: string) => {
//     return service.charAt(0).toUpperCase() + service.slice(1).toLowerCase();
//   };
 
//   const filteredServices = approvedRequests.filter(request => {
//     const matchesSearch =
//       request.Cloud.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       request.Service.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       request.AccessLevel.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       request.Username.toLowerCase().includes(searchQuery.toLowerCase());
   
//     const matchesProvider = providerFilter === 'all' || request.Cloud.toLowerCase() === providerFilter.toLowerCase();
//     const matchesSelectedProvider = selectedProvider === 'all' || request.Cloud.toLowerCase() === selectedProvider.toLowerCase();
   
//     return matchesSearch && matchesProvider && matchesSelectedProvider;
//   });
 
//   const sortedServices = [...filteredServices].sort((a, b) => {
//     switch (sortBy) {
//       case 'newest':
//         return new Date(b.RequestTime).getTime() - new Date(a.RequestTime).getTime();
//       case 'oldest':
//         return new Date(a.RequestTime).getTime() - new Date(b.RequestTime).getTime();
//       case 'service-az':
//         return a.Service.localeCompare(b.Service);
//       case 'service-za':
//         return b.Service.localeCompare(a.Service);
//       default:
//         return 0;
//     }
//   });
 
//   const getProviderColor = (provider: string) => {
//     switch (provider.toLowerCase()) {
//       case 'aws':
//         return 'bg-orange-100 text-orange-800 border-orange-200';
//       case 'azure':
//         return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'gcp':
//         return 'bg-green-100 text-green-800 border-green-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };
 
//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'approved':
//         return 'border-green-500 text-green-600';
//       case 'applied':
//         return 'border-blue-500 text-blue-600';
//       case 'rejected':
//         return 'border-red-500 text-red-600';
//       case 'pending':
//         return 'border-yellow-500 text-yellow-600';
//       default:
//         return 'border-gray-500 text-gray-600';
//     }
//   };
 
//   const getStatusIcon = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'approved':
//         return <CheckCircle className="w-4 h-4 text-green-600" />;
//       case 'applied':
//         return <Shield className="w-4 h-4 text-blue-600" />;
//       case 'pending':
//         return <Clock className="w-4 h-4 text-yellow-600" />;
//       case 'rejected':
//         return <XCircle className="w-4 h-4 text-red-600" />;
//       default:
//         return <AlertCircle className="w-4 h-4 text-gray-600" />;
//     }
//   };
 
//   const formatDate = (dateString: string) => {
//     try {
//       return new Date(dateString).toLocaleDateString();
//     } catch {
//       return dateString;
//     }
//   };
 
//   const getUniqueProviders = () => {
//     const providers = [...new Set(requests.map(r => r.Cloud.toLowerCase()))];
//     return providers.map(p => ({ id: p, name: p.toUpperCase() }));
//   };
 
//   const activeServices = sortedServices.filter(s =>
//     s.Status === 'applied' && (!s.PolicyExpiry || new Date(s.PolicyExpiry) > new Date())
//   );
 
//   const thisMonthServices = sortedServices.filter(s => {
//     const requestDate = new Date(s.RequestTime);
//     const now = new Date();
//     return requestDate.getMonth() === now.getMonth() &&
//            requestDate.getFullYear() === now.getFullYear();
//   });
 
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <Loader2 className="w-8 h-8 animate-spin" />
//         <span className="ml-2">Loading approved services...</span>
//       </div>
//     );
//   }
 
//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
//           <p className="text-red-600">Error: {error}</p>
//           <Button
//             onClick={() => window.location.reload()}
//             variant="outline"
//             className="mt-2"
//           >
//             Retry
//           </Button>
//         </div>
//       </div>
//     );
//   }
 
//   return (
//     <div className="space-y-6">
//       {/* Filters */}
//       <Card className="p-6">
//         <div className="flex flex-col sm:flex-row gap-4 items-center">
//           <div className="flex-1 w-full">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <Input
//                 placeholder="Search approved services..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </div>
//           <div className="flex gap-3 w-full sm:w-auto">
//             <Select value={providerFilter} onValueChange={setProviderFilter}>
//               <SelectTrigger className="w-full sm:w-40">
//                 <SelectValue placeholder="Cloud Provider" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Providers</SelectItem>
//                 {getUniqueProviders().map(provider => (
//                   <SelectItem key={provider.id} value={provider.id}>
//                     {provider.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger className="w-full sm:w-40">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="newest">Newest First</SelectItem>
//                 <SelectItem value="oldest">Oldest First</SelectItem>
//                 <SelectItem value="service-az">Service A-Z</SelectItem>
//                 <SelectItem value="service-za">Service Z-A</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </Card>
 
//       {/* Services Table */}
//       <Card className="p-6">
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="text-center">Cloud Provider</TableHead>
//                 <TableHead className="text-center">Service</TableHead>
//                 <TableHead className="text-center">Access Level</TableHead>
//                 <TableHead className="text-center">Status</TableHead>
//                 <TableHead className="text-center">Request Date</TableHead>
//                 <TableHead className="text-center">Expiry Date</TableHead>
//                 <TableHead className="text-center">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {sortedServices.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={7} className="h-24 text-center text-gray-500">
//                     No approved services found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 sortedServices.map((service) => (
//                   <TableRow key={service.RequestID} className="hover:bg-gray-50">
//                     <TableCell className="text-center">
//                       <Badge variant="outline" className={getProviderColor(service.Cloud)}>
//                         {service.Cloud.toUpperCase()}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="text-center font-medium">
//                       {capitalizeService(service.Service)}
//                     </TableCell>
//                     <TableCell className="text-center">
//                       <Badge variant="secondary" className="bg-gray-100 text-gray-700">
//                         {service.AccessLevel}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="text-center">
//                       <Badge variant="outline" className={getStatusColor(service.Status)}>
//                         {getStatusIcon(service.Status)}
//                         <span className="ml-1">{service.Status.toUpperCase()}</span>
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="text-center text-gray-600">
//                       {formatDate(service.RequestTime)}
//                     </TableCell>
//                     <TableCell className="text-center">
//                       {service.PolicyExpiry ? (
//                         <span className={
//                           new Date(service.PolicyExpiry) < new Date()
//                             ? 'text-red-600 font-medium'
//                             : 'text-green-600 font-medium'
//                         }>
//                           {formatDate(service.PolicyExpiry)}
//                         </span>
//                       ) : (
//                         <span className="text-gray-400">No expiry</span>
//                       )}
//                     </TableCell>
//                     <TableCell className="text-center">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => setViewingRequest(service)}
//                         className="hover:bg-blue-50 hover:text-blue-600"
//                       >
//                         <Eye className="h-4 w-4 mr-2" />
//                         View Details
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </Card>
 
//       {/* Request Details Dialog */}
//       <Dialog open={!!viewingRequest} onOpenChange={() => setViewingRequest(null)}>
//         <DialogContent className="max-w-3xl">
//           <DialogHeader>
//             <DialogTitle className="text-lg font-semibold">Service Request Details</DialogTitle>
//           </DialogHeader>
//           {viewingRequest && (
//             <div className="space-y-4 text-sm max-h-96 overflow-y-auto">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <div>
//                     <p className="font-semibold text-gray-700">Username:</p>
//                     <p className="text-gray-600">{viewingRequest.Username}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-700">Cloud Provider:</p>
//                     <Badge variant="outline" className={getProviderColor(viewingRequest.Cloud)}>
//                       {viewingRequest.Cloud.toUpperCase()}
//                     </Badge>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-700">Service:</p>
//                     <p className="text-gray-600 font-medium">{capitalizeService(viewingRequest.Service)}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-700">Access Level:</p>
//                     <Badge variant="secondary">{viewingRequest.AccessLevel}</Badge>
//                   </div>
//                 </div>
                
//                 <div className="space-y-2">
//                   <div>
//                     <p className="font-semibold text-gray-700">Role:</p>
//                     <p className="text-gray-600">{viewingRequest.Role}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-700">Manager:</p>
//                     <p className="text-gray-600">{viewingRequest.Manager}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-700">Status:</p>
//                     <Badge variant="outline" className={getStatusColor(viewingRequest.Status)}>
//                       {getStatusIcon(viewingRequest.Status)}
//                       <span className="ml-1">{viewingRequest.Status.toUpperCase()}</span>
//                     </Badge>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-700">Request Time:</p>
//                     <p className="text-gray-600">{new Date(viewingRequest.RequestTime).toLocaleString()}</p>
//                   </div>
//                 </div>
//               </div>
             
//               <div>
//                 <p className="font-semibold text-gray-700">Reason for Request:</p>
//                 <p className="bg-gray-50 p-3 rounded-md mt-1 text-gray-700">{viewingRequest.Reason}</p>
//               </div>
             
//               {viewingRequest.ApplicationTime && (
//                 <div>
//                   <p className="font-semibold text-gray-700">Application Time:</p>
//                   <p className="text-gray-600">{new Date(viewingRequest.ApplicationTime).toLocaleString()}</p>
//                 </div>
//               )}
             
//               {viewingRequest.PolicyExpiry && (
//                 <div>
//                   <p className="font-semibold text-gray-700">Policy Expiry:</p>
//                   <p className={
//                     new Date(viewingRequest.PolicyExpiry) < new Date()
//                       ? 'text-red-600 font-medium'
//                       : 'text-green-600 font-medium'
//                   }>
//                     {new Date(viewingRequest.PolicyExpiry).toLocaleString()}
//                   </p>
//                 </div>
//               )}
             
//               {viewingRequest.Policy && (
//                 <div>
//                   <p className="font-semibold text-gray-700">Policy Details:</p>
//                   <pre className="bg-gray-50 p-3 rounded-md text-xs overflow-x-auto border">
//                     {JSON.stringify(viewingRequest.Policy, null, 2)}
//                   </pre>
//                 </div>
//               )}
              
//               <div className="bg-blue-50 p-3 rounded-md">
//                 <p className="font-semibold text-blue-700">Request ID:</p>
//                 <p className="font-mono text-xs text-blue-600 break-all">{viewingRequest.RequestID}</p>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };
 
// export default ApprovedServicesPage;


// import React, { useState, useEffect } from 'react';
// import { Button } from './ui/button';
// import { Card } from './ui/card';
// import { Badge } from './ui/badge';
// import { Input } from './ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from './ui/select';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from './ui/table';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from './ui/dialog';
// import {
//   CheckCircle,
//   Search,
//   Calendar,
//   DollarSign,
//   Filter,
//   Eye,
//   Clock,
//   XCircle,
//   AlertCircle,
//   Shield,
//   Loader2,
// } from 'lucide-react';
// import { useCloudProvider } from '@/context/CloudProviderContext';

// // Updated interface to match API response
// interface ApiRequest {
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
//   requests: ApiRequest[];
//   lastEvaluatedKey: string | null;
//   message: string;
// }

// const ApprovedServicesPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState('newest');
//   const [viewingRequest, setViewingRequest] = useState<ApiRequest | null>(null);
//   const [requests, setRequests] = useState<ApiRequest[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
//   // Use the cloud provider from context (same as Header)
//   const { cloudProvider } = useCloudProvider();
  
//   const fullName = localStorage.getItem('fullName');

//   // Fetch data from API
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         setLoading(true);
//         setError(null);
       
//         const response = await fetch(
//           `https://9y40j38nv9.execute-api.ap-south-1.amazonaws.com/list_requests?Username=${encodeURIComponent(fullName)}`
//         );
       
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
       
//         const data: ApiResponse = await response.json();
//         setRequests(data.requests || []);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to fetch requests');
//         console.error('Error fetching requests:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
 
//     if (fullName) {
//       fetchRequests();
//     }
//   }, [fullName]);
 
//   // Filter only approved/applied requests (matching your API statuses)
//   const approvedRequests = requests.filter(request =>
//     request.Status === 'approved' || request.Status === 'applied'
//   );

//   // Helper function to capitalize first letter of service name
//   const capitalizeService = (service: string) => {
//     return service.charAt(0).toUpperCase() + service.slice(1).toLowerCase();
//   };
 
//   const filteredServices = approvedRequests.filter(request => {
//     const matchesSearch =
//       request.Cloud.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       request.Service.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       request.AccessLevel.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       request.Username.toLowerCase().includes(searchQuery.toLowerCase());
   
//     // Use cloudProvider from context instead of local providerFilter
//     const matchesProvider = cloudProvider === 'all' || 
//       request.Cloud.toLowerCase() === cloudProvider.toLowerCase();
   
//     return matchesSearch && matchesProvider;
//   });
 
//   const sortedServices = [...filteredServices].sort((a, b) => {
//     switch (sortBy) {
//       case 'newest':
//         return new Date(b.RequestTime).getTime() - new Date(a.RequestTime).getTime();
//       case 'oldest':
//         return new Date(a.RequestTime).getTime() - new Date(b.RequestTime).getTime();
//       case 'service-az':
//         return a.Service.localeCompare(b.Service);
//       case 'service-za':
//         return b.Service.localeCompare(a.Service);
//       default:
//         return 0;
//     }
//   });
 
//   const getProviderColor = (provider: string) => {
//     switch (provider.toLowerCase()) {
//       case 'aws':
//         return 'bg-orange-100 text-orange-800 border-orange-200';
//       case 'azure':
//         return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'gcp':
//         return 'bg-green-100 text-green-800 border-green-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };
 
//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'approved':
//         return 'border-green-500 text-green-600';
//       case 'applied':
//         return 'border-blue-500 text-blue-600';
//       case 'rejected':
//         return 'border-red-500 text-red-600';
//       case 'pending':
//         return 'border-yellow-500 text-yellow-600';
//       default:
//         return 'border-gray-500 text-gray-600';
//     }
//   };
 
//   const getStatusIcon = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'approved':
//         return <CheckCircle className="w-4 h-4 text-green-600" />;
//       case 'applied':
//         return <Shield className="w-4 h-4 text-blue-600" />;
//       case 'pending':
//         return <Clock className="w-4 h-4 text-yellow-600" />;
//       case 'rejected':
//         return <XCircle className="w-4 h-4 text-red-600" />;
//       default:
//         return <AlertCircle className="w-4 h-4 text-gray-600" />;
//     }
//   };
 
//   const formatDate = (dateString: string) => {
//     try {
//       return new Date(dateString).toLocaleDateString();
//     } catch {
//       return dateString;
//     }
//   };
 
//   const activeServices = sortedServices.filter(s =>
//     s.Status === 'applied' && (!s.PolicyExpiry || new Date(s.PolicyExpiry) > new Date())
//   );
 
//   const thisMonthServices = sortedServices.filter(s => {
//     const requestDate = new Date(s.RequestTime);
//     const now = new Date();
//     return requestDate.getMonth() === now.getMonth() &&
//            requestDate.getFullYear() === now.getFullYear();
//   });
 
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <Loader2 className="w-8 h-8 animate-spin" />
//         <span className="ml-2">Loading approved services...</span>
//       </div>
//     );
//   }
 
//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
//           <p className="text-red-600">Error: {error}</p>
//           <Button
//             onClick={() => window.location.reload()}
//             variant="outline"
//             className="mt-2"
//           >
//             Retry
//           </Button>
//         </div>
//       </div>
//     );
//   }
 
//   return (
//     <div className="space-y-6">
//       {/* Simplified Filters - removed provider filter since it's now in header */}
//       <Card className="p-6">
//         <div className="flex flex-col sm:flex-row gap-4 items-center">
//           <div className="flex-1 w-full">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <Input
//                 placeholder="Search approved services..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </div>
//           <div className="flex gap-3 w-full sm:w-auto">
//             <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger className="w-full sm:w-40">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="newest">Newest First</SelectItem>
//                 <SelectItem value="oldest">Oldest First</SelectItem>
//                 <SelectItem value="service-az">Service A-Z</SelectItem>
//                 <SelectItem value="service-za">Service Z-A</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </Card>

     
 
//       {/* Services Table */}
//       <Card className="p-6">
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="text-center">Cloud Provider</TableHead>
//                 <TableHead className="text-center">Service</TableHead>
//                 <TableHead className="text-center">Access Level</TableHead>
//                 <TableHead className="text-center">Status</TableHead>
//                 <TableHead className="text-center">Request Date</TableHead>
//                 <TableHead className="text-center">Expiry Date</TableHead>
//                 <TableHead className="text-center">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {sortedServices.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={7} className="h-24 text-center text-gray-500">
//                     {cloudProvider === 'all' 
//                       ? 'No approved services found'
//                       : `No approved services found for ${cloudProvider.toUpperCase()}`
//                     }
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 sortedServices.map((service) => (
//                   <TableRow key={service.RequestID} className="hover:bg-gray-50">
//                     <TableCell className="text-center">
//                       <Badge variant="outline" className={getProviderColor(service.Cloud)}>
//                         {service.Cloud.toUpperCase()}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="text-center font-medium">
//                       {capitalizeService(service.Service)}
//                     </TableCell>
//                     <TableCell className="text-center">
//                       <Badge variant="secondary" className="bg-gray-100 text-gray-700">
//                         {service.AccessLevel}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="text-center">
//                       <Badge variant="outline" className={getStatusColor(service.Status)}>
//                         {getStatusIcon(service.Status)}
//                         <span className="ml-1">{service.Status.toUpperCase()}</span>
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="text-center text-gray-600">
//                       {formatDate(service.RequestTime)}
//                     </TableCell>
//                     <TableCell className="text-center">
//                       {service.PolicyExpiry ? (
//                         <span className={
//                           new Date(service.PolicyExpiry) < new Date()
//                             ? 'text-red-600 font-medium'
//                             : 'text-green-600 font-medium'
//                         }>
//                           {formatDate(service.PolicyExpiry)}
//                         </span>
//                       ) : (
//                         <span className="text-gray-400">No expiry</span>
//                       )}
//                     </TableCell>
//                     <TableCell className="text-center">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => setViewingRequest(service)}
//                         className="hover:bg-blue-50 hover:text-blue-600"
//                       >
//                         <Eye className="h-4 w-4 mr-2" />
//                         View Details
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </Card>
 
//       {/* Request Details Dialog */}
//       <Dialog open={!!viewingRequest} onOpenChange={() => setViewingRequest(null)}>
//         <DialogContent className="max-w-3xl">
//           <DialogHeader>
//             <DialogTitle className="text-lg font-semibold">Service Request Details</DialogTitle>
//           </DialogHeader>
//           {viewingRequest && (
//             <div className="space-y-4 text-sm max-h-96 overflow-y-auto">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <div>
//                     <p className="font-semibold text-gray-700">Username:</p>
//                     <p className="text-gray-600">{viewingRequest.Username}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-700">Cloud Provider:</p>
//                     <Badge variant="outline" className={getProviderColor(viewingRequest.Cloud)}>
//                       {viewingRequest.Cloud.toUpperCase()}
//                     </Badge>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-700">Service:</p>
//                     <p className="text-gray-600 font-medium">{capitalizeService(viewingRequest.Service)}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-700">Access Level:</p>
//                     <Badge variant="secondary">{viewingRequest.AccessLevel}</Badge>
//                   </div>
//                 </div>
                
//                 <div className="space-y-2">
//                   <div>
//                     <p className="font-semibold text-gray-700">Role:</p>
//                     <p className="text-gray-600">{viewingRequest.Role}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-700">Manager:</p>
//                     <p className="text-gray-600">{viewingRequest.Manager}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-700">Status:</p>
//                     <Badge variant="outline" className={getStatusColor(viewingRequest.Status)}>
//                       {getStatusIcon(viewingRequest.Status)}
//                       <span className="ml-1">{viewingRequest.Status.toUpperCase()}</span>
//                     </Badge>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-700">Request Time:</p>
//                     <p className="text-gray-600">{new Date(viewingRequest.RequestTime).toLocaleString()}</p>
//                   </div>
//                 </div>
//               </div>
             
//               <div>
//                 <p className="font-semibold text-gray-700">Reason for Request:</p>
//                 <p className="bg-gray-50 p-3 rounded-md mt-1 text-gray-700">{viewingRequest.Reason}</p>
//               </div>
             
//               {viewingRequest.ApplicationTime && (
//                 <div>
//                   <p className="font-semibold text-gray-700">Application Time:</p>
//                   <p className="text-gray-600">{new Date(viewingRequest.ApplicationTime).toLocaleString()}</p>
//                 </div>
//               )}
             
//               {viewingRequest.PolicyExpiry && (
//                 <div>
//                   <p className="font-semibold text-gray-700">Policy Expiry:</p>
//                   <p className={
//                     new Date(viewingRequest.PolicyExpiry) < new Date()
//                       ? 'text-red-600 font-medium'
//                       : 'text-green-600 font-medium'
//                   }>
//                     {new Date(viewingRequest.PolicyExpiry).toLocaleString()}
//                   </p>
//                 </div>
//               )}
             
//               {viewingRequest.Policy && (
//                 <div>
//                   <p className="font-semibold text-gray-700">Policy Details:</p>
//                   <pre className="bg-gray-50 p-3 rounded-md text-xs overflow-x-auto border">
//                     {JSON.stringify(viewingRequest.Policy, null, 2)}
//                   </pre>
//                 </div>
//               )}
              
//               <div className="bg-blue-50 p-3 rounded-md">
//                 <p className="font-semibold text-blue-700">Request ID:</p>
//                 <p className="font-mono text-xs text-blue-600 break-all">{viewingRequest.RequestID}</p>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };
 
// export default ApprovedServicesPage;



import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  CheckCircle,
  Search,
  Calendar,
  DollarSign,
  Filter,
  Eye,
  Clock,
  XCircle,
  AlertCircle,
  Shield,
  Loader2,
} from 'lucide-react';

// Updated interface to match API response
interface ApiRequest {
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
  requests: ApiRequest[];
  lastEvaluatedKey: string | null;
  message: string;
}

interface ApprovedServicesPageProps {
  selectedProvider: string;
  fullName?: string; // Optional prop for flexibility
}

const ApprovedServicesPage = ({
  selectedProvider,
  fullName: propFullName, // Accept fullName as a prop if passed
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [providerFilter, setProviderFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewingRequest, setViewingRequest] = useState<ApiRequest | null>(null);
  const [requests, setRequests] = useState<ApiRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProviderState, setSelectedProvider] = useState(selectedProvider || 'all');
  const [fullName, setFullName] = useState(() => {
    // Get fullName from localStorage, fallback to prop or default
    return propFullName || localStorage.getItem('fullName');
  });

  // Fetch data from API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `https://9y40j38nv9.execute-api.ap-south-1.amazonaws.com/list_requests?Username=${encodeURIComponent(fullName)}`;
        console.log('API URL:', url); // Debug the URL
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        console.log('API Response:', JSON.stringify(data, null, 2)); // Debug the response
        setRequests(data.requests || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch requests');
        console.error('Error fetching requests:', err);
      } finally {
        setLoading(false);
      }
    };

    if (fullName) {
      fetchRequests();
    }
  }, [fullName]);

  // Filter only approved/applied requests for the current user
  const approvedRequests = requests.filter(request =>
    (request.Status?.toLowerCase() === 'approved' || request.Status?.toLowerCase() === 'applied') &&
    request.Username.toLowerCase() === fullName.toLowerCase()
  );

  // Helper function to capitalize first letter of service name
  const capitalizeService = (service: string) => {
    return service.charAt(0).toUpperCase() + service.slice(1).toLowerCase();
  };

  const filteredServices = approvedRequests.filter(request => {
    const matchesSearch =
      request.Cloud.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.Service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.AccessLevel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.Username.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProvider = providerFilter === 'all' || request.Cloud.toLowerCase() === providerFilter.toLowerCase();
    const matchesSelectedProvider = selectedProviderState === 'all' || request.Cloud.toLowerCase() === selectedProviderState.toLowerCase();

    return matchesSearch && matchesProvider && matchesSelectedProvider;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.RequestTime).getTime() - new Date(a.RequestTime).getTime();
      case 'oldest':
        return new Date(a.RequestTime).getTime() - new Date(b.RequestTime).getTime();
      case 'service-az':
        return a.Service.localeCompare(b.Service);
      case 'service-za':
        return b.Service.localeCompare(a.Service);
      default:
        return 0;
    }
  });

  const getProviderColor = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'aws':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'azure':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'gcp':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'border-green-500 text-green-600';
      case 'applied':
        return 'border-blue-500 text-blue-600';
      case 'rejected':
        return 'border-red-500 text-red-600';
      case 'pending':
        return 'border-yellow-500 text-yellow-600';
      default:
        return 'border-gray-500 text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'applied':
        return <Shield className="w-4 h-4 text-blue-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const getUniqueProviders = () => {
    const providers = [...new Set(requests.map(r => r.Cloud.toLowerCase()))];
    return providers.map(p => ({ id: p, name: p.toUpperCase() }));
  };

  const activeServices = sortedServices.filter(s =>
    s.Status === 'applied' && (!s.PolicyExpiry || new Date(s.PolicyExpiry) > new Date())
  );

  const thisMonthServices = sortedServices.filter(s => {
    const requestDate = new Date(s.RequestTime);
    const now = new Date();
    return requestDate.getMonth() === now.getMonth() &&
           requestDate.getFullYear() === now.getFullYear();
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading approved services...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <p className="text-red-600">Error: {error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mt-2"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search approved services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Select value={providerFilter} onValueChange={setProviderFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Cloud Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                {getUniqueProviders().map(provider => (
                  <SelectItem key={provider.id} value={provider.id}>
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="service-az">Service A-Z</SelectItem>
                <SelectItem value="service-za">Service Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Services Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Cloud Provider</TableHead>
                <TableHead className="text-center">Service</TableHead>
                <TableHead className="text-center">Access Level</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Request Date</TableHead>
                <TableHead className="text-center">Expiry Date</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedServices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                    No approved services found
                  </TableCell>
                </TableRow>
              ) : (
                sortedServices.map((service) => (
                  <TableRow key={service.RequestID} className="hover:bg-gray-50">
                    <TableCell className="text-center">
                      <Badge variant="outline" className={getProviderColor(service.Cloud)}>
                        {service.Cloud.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {capitalizeService(service.Service)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        {service.AccessLevel}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={getStatusColor(service.Status)}>
                        {getStatusIcon(service.Status)}
                        <span className="ml-1">{service.Status.toUpperCase()}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-gray-600">
                      {formatDate(service.RequestTime)}
                    </TableCell>
                    <TableCell className="text-center">
                      {service.PolicyExpiry ? (
                        <span className={
                          new Date(service.PolicyExpiry) < new Date()
                            ? 'text-red-600 font-medium'
                            : 'text-green-600 font-medium'
                        }>
                          {formatDate(service.PolicyExpiry)}
                        </span>
                      ) : (
                        <span className="text-gray-400">No expiry</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setViewingRequest(service)}
                        className="hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Request Details Dialog */}
      <Dialog open={!!viewingRequest} onOpenChange={() => setViewingRequest(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Service Request Details</DialogTitle>
          </DialogHeader>
          {viewingRequest && (
            <div className="space-y-4 text-sm max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <p className="font-semibold text-gray-700">Username:</p>
                    <p className="text-gray-600">{viewingRequest.Username}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Cloud Provider:</p>
                    <Badge variant="outline" className={getProviderColor(viewingRequest.Cloud)}>
                      {viewingRequest.Cloud.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Service:</p>
                    <p className="text-gray-600 font-medium">{capitalizeService(viewingRequest.Service)}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Access Level:</p>
                    <Badge variant="secondary">{viewingRequest.AccessLevel}</Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <p className="font-semibold text-gray-700">Role:</p>
                    <p className="text-gray-600">{viewingRequest.Role}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Manager:</p>
                    <p className="text-gray-600">{viewingRequest.Manager}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Status:</p>
                    <Badge variant="outline" className={getStatusColor(viewingRequest.Status)}>
                      {getStatusIcon(viewingRequest.Status)}
                      <span className="ml-1">{viewingRequest.Status.toUpperCase()}</span>
                    </Badge>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Request Time:</p>
                    <p className="text-gray-600">{new Date(viewingRequest.RequestTime).toLocaleString()}</p>
                  </div>
                </div>
              </div>
             
              <div>
                <p className="font-semibold text-gray-700">Reason for Request:</p>
                <p className="bg-gray-50 p-3 rounded-md mt-1 text-gray-700">{viewingRequest.Reason}</p>
              </div>
             
              {viewingRequest.ApplicationTime && (
                <div>
                  <p className="font-semibold text-gray-700">Application Time:</p>
                  <p className="text-gray-600">{new Date(viewingRequest.ApplicationTime).toLocaleString()}</p>
                </div>
              )}
             
              {viewingRequest.PolicyExpiry && (
                <div>
                  <p className="font-semibold text-gray-700">Policy Expiry:</p>
                  <p className={
                    new Date(viewingRequest.PolicyExpiry) < new Date()
                      ? 'text-red-600 font-medium'
                      : 'text-green-600 font-medium'
                  }>
                    {new Date(viewingRequest.PolicyExpiry).toLocaleString()}
                  </p>
                </div>
              )}
             
              {viewingRequest.Policy && (
                <div>
                  <p className="font-semibold text-gray-700">Policy Details:</p>
                  <pre className="bg-gray-50 p-3 rounded-md text-xs overflow-x-auto border">
                    {JSON.stringify(viewingRequest.Policy, null, 2)}
                  </pre>
                </div>
              )}
              
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="font-semibold text-blue-700">Request ID:</p>
                <p className="font-mono text-xs text-blue-600 break-all">{viewingRequest.RequestID}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApprovedServicesPage;