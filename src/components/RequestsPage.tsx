// import React, { useState } from "react";
// import { Button } from "./ui/button";
// import { Card } from "./ui/card";
// import { Badge } from "./ui/badge";
// import { Input } from "./ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "./ui/dialog";
// import { Label } from "./ui/label";
// import { Textarea } from "./ui/textarea";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "./ui/table";
// import {
//   Plus,
//   Search,
//   Eye,
//   CheckCircle,
//   Clock,
//   XCircle,
//   AlertCircle,
// } from "lucide-react";
// import { recentRequests, cloudProviders, userRoles } from "../mock/data";

// // Interfaces
// interface RecentRequest {
//   id: string;
//   title: string;
//   user: string;
//   requester: string;
//   service: string;
//   cloud: string; // Changed from provider to cloud
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

// interface User {
//   id: string;
//   name: string;
//   username: string;
//   permissions: string[];
// }

// interface RequestsPageProps {
//   currentUser: User;
//   selectedProvider: string;
// }

// const RequestsPage: React.FC<RequestsPageProps> = ({ currentUser, selectedProvider }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [viewingRequest, setViewingRequest] = useState<RecentRequest | null>(null);
//   const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
//   const [newRequest, setNewRequest] = useState({
//     title: "",
//     description: "",
//     cloud: selectedProvider !== "all" ? selectedProvider : "", // Changed from provider to cloud
//     resourceType: "",
//     justification: "",
//     estimatedCost: "",
//     accessLevel: "",
//     manager: "",
//   });
//   const [formErrors, setFormErrors] = useState({
//     title: "",
//     cloud: "", // Changed from provider to cloud
//     description: "",
//     resourceType: "",
//     justification: "",
//     estimatedCost: "",
//     accessLevel: "",
//     manager: "",
//   });

//   const filteredRequests = recentRequests.filter((request) => {
//     const matchesSearch =
//       request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       request.cloud.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       request.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       request.accesslevel.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesStatus = statusFilter === "all" || request.status.toLowerCase() === statusFilter.toLowerCase();
//     const matchesProvider = selectedProvider === "all" || request.cloud === selectedProvider; // Changed from provider to cloud
//     // Removed matchesUser since requester is empty in the data
//     return matchesSearch && matchesStatus && matchesProvider;
//   });

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "approved":
//         return "border-green-500 text-green-600";
//       case "rejected":
//         return "border-red-500 text-red-600";
//       case "pending":
//         return "border-yellow-500 text-yellow-600";
//       default:
//         return "border-gray-500 text-gray-600";
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "approved":
//         return <CheckCircle className="w-4 h-4 text-green-600" />;
//       case "pending":
//         return <Clock className="w-4 h-4 text-yellow-600" />;
//       case "rejected":
//         return <XCircle className="w-4 h-4 text-red-600" />;
//       default:
//         return <AlertCircle className="w-4 h-4 text-gray-600" />;
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setNewRequest((prev) => ({ ...prev, [name]: value }));
//     setFormErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleSelectChange = (name: string, value: string) => {
//     setNewRequest((prev) => ({ ...prev, [name]: value }));
//     setFormErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const errors = {
//       title: "",
//       cloud: "", // Changed from provider to cloud
//       description: "",
//       resourceType: "",
//       justification: "",
//       estimatedCost: "",
//       accessLevel: "",
//       manager: "",
//     };

//     if (!newRequest.cloud) {
//       errors.cloud = "Cloud provider is required";
//       isValid = false;
//     }
//     if (!newRequest.description.trim()) {
//       errors.description = "Description is required";
//       isValid = false;
//     }
//     if (!newRequest.resourceType) {
//       errors.resourceType = "Resource type is required";
//       isValid = false;
//     }
//     if (!newRequest.justification.trim()) {
//       errors.justification = "Justification is required";
//       isValid = false;
//     }
//     if (!newRequest.estimatedCost || isNaN(Number(newRequest.estimatedCost))) {
//       errors.estimatedCost = "Valid estimated cost is required";
//       isValid = false;
//     }
//     if (!newRequest.accessLevel) {
//       errors.accessLevel = "Access level is required";
//       isValid = false;
//     }

//     setFormErrors(errors);
//     return isValid;
//   };

//   const handleSubmitRequest = () => {
//     if (validateForm()) {
//       console.log("Submitting request:", {
//         id: `REQ-${Math.random().toString(36).substr(2, 9)}`,
//         title: newRequest.title,
//         user: currentUser.name,
//         requester: currentUser.username,
//         service: newRequest.resourceType,
//         cloud: newRequest.cloud, // Changed from provider to cloud
//         accesslevel: newRequest.accessLevel, // Added accesslevel
//         status: "pending",
//         requestDate: new Date().toISOString().split('T')[0],
//         createdAt: new Date().toISOString(),
//         estimatedCost: Number(newRequest.estimatedCost),
//         description: newRequest.description,
//         rejectionReason: undefined,
//       });
//       setIsNewRequestOpen(false);
//       setNewRequest({
//         title: "",
//         description: "",
//         cloud: selectedProvider !== "all" ? selectedProvider : "",
//         resourceType: "",
//         justification: "",
//         estimatedCost: "",
//         accessLevel: "",
//         manager: "",
//       });
//       setFormErrors({
//         title: "",
//         cloud: "",
//         description: "",
//         resourceType: "",
//         justification: "",
//         estimatedCost: "",
//         accessLevel: "",
//         manager: "",
//       });
//     }
//   };

//   const handleRequestAction = (requestId: string, action: string) => {
//     console.log(`${action} request ${requestId}`);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">
//             {currentUser.id === "user" ? "My Requests" : "Service Requests"}
//           </h1>
//           <p className="text-muted-foreground">
//             {currentUser.id === "user"
//               ? "Track your resource requests and access approvals"
//               : "Manage and approve team resource requests"}
//           </p>
//         </div>
//         {currentUser.permissions.includes("request_access") && (
//           <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
//             <DialogTrigger asChild>
//               <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
//                 <Plus className="w-4 h-4 mr-2" />
//                 New Request
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[600px]">
//               <DialogHeader>
//                 <DialogTitle>New Access Request</DialogTitle>
//                 <p className="text-sm text-muted-foreground">
//                   Fill in the details below to request access to a cloud resource.
//                 </p>
//               </DialogHeader>
//               <div className="grid grid-cols-2 gap-4 py-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="cloud">Cloud Provider</Label>
//                   <Select
//                     value={newRequest.cloud}
//                     onValueChange={(value) => handleSelectChange("cloud", value)}
//                     disabled={selectedProvider !== "all"}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select provider" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {cloudProviders.map((provider) => (
//                         <SelectItem key={provider.id} value={provider.id}>
//                           {provider.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   {formErrors.cloud && (
//                     <p className="text-sm text-destructive">{formErrors.cloud}</p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="resourceType">Resource Type</Label>
//                   <Select
//                     value={newRequest.resourceType}
//                     onValueChange={(value) => handleSelectChange("resourceType", value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select resource type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="ec2">EC2 Instance</SelectItem>
//                       <SelectItem value="s3">S3 Bucket</SelectItem>
//                       <SelectItem value="rds">RDS Database</SelectItem>
//                       <SelectItem value="lambda">Lambda Function</SelectItem>
//                       <SelectItem value="storage">Cloud Storage</SelectItem>
//                       <SelectItem value="compute">Compute Instance</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   {formErrors.resourceType && (
//                     <p className="text-sm text-destructive">{formErrors.resourceType}</p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="accessLevel">Access Level</Label>
//                   <Select
//                     value={newRequest.accessLevel}
//                     onValueChange={(value) => handleSelectChange("accessLevel", value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select access level" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="read">Read Only</SelectItem>
//                       <SelectItem value="write">Read/Write</SelectItem>
//                       <SelectItem value="admin">Administrative</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   {formErrors.accessLevel && (
//                     <p className="text-sm text-destructive">{formErrors.accessLevel}</p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="manager">Manager</Label>
//                   <Select
//                     value={newRequest.manager}
//                     onValueChange={(value) => handleSelectChange("manager", value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select manager" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {userRoles
//                         .filter((role) => role.id === "manager")
//                         .map((manager) => (
//                           <SelectItem key={manager.id} value={manager.credentials.username}>
//                             {manager.credentials.username}
//                           </SelectItem>
//                         ))}
//                     </SelectContent>
//                   </Select>
//                   {formErrors.manager && (
//                     <p className="text-sm text-destructive">{formErrors.manager}</p>
//                   )}
//                 </div>
//                 <div className="col-span-2 space-y-2">
//                   <Label htmlFor="justification">Justification</Label>
//                   <Textarea
//                     name="justification"
//                     value={newRequest.justification}
//                     onChange={handleInputChange}
//                     placeholder="Explain the reason for access"
//                   />
//                   {formErrors.justification && (
//                     <p className="text-sm text-destructive">{formErrors.justification}</p>
//                   )}
//                 </div>
//               </div>
//               <div className="flex justify-end space-x-2">
//                 <Button variant="outline" onClick={() => setIsNewRequestOpen(false)}>
//                   Cancel
//                 </Button>
//                 <Button onClick={handleSubmitRequest} className="bg-primary hover:bg-primary/90">
//                   Submit Request
//                 </Button>
//               </div>
//             </DialogContent>
//           </Dialog>
//         )}
//       </div>

//       {/* Filters */}
//       <Card className="p-4">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//             <Input
//               placeholder="Search by ID, cloud, service, or access level..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//           <div className="w-40">
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Statuses</SelectItem>
//                 <SelectItem value="pending">Pending</SelectItem>
//                 <SelectItem value="approved">Approved</SelectItem>
//                 <SelectItem value="rejected">Rejected</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </Card>

//       {/* Request Table */}
//       <Card>
//         <Card className="p-4 max-h-[500px] overflow-y-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Id</TableHead>
//                 <TableHead>Cloud</TableHead>
//                 <TableHead>Resource Type</TableHead>
//                 <TableHead>Access Level</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Request Date</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredRequests.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={7} className="h-24 text-center">
//                     No results found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredRequests.map((request) => (
//                   <TableRow key={request.id}>
//                     <TableCell>{request.id}</TableCell>
//                     <TableCell>{request.cloud}</TableCell>
//                     <TableCell>{request.service}</TableCell>
//                     <TableCell>{request.accesslevel}</TableCell>
//                     <TableCell>
//                       <Badge variant="outline" className={getStatusColor(request.status)}>
//                         {getStatusIcon(request.status)}
//                         <span className="ml-1">{request.status.toUpperCase()}</span>
//                       </Badge>
//                     </TableCell>
//                     <TableCell>{request.requestDate}</TableCell>
//                     <TableCell className="text-right">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => setViewingRequest(request)}
//                       >
//                         <Eye className="h-4 w-4 mr-2" />
//                         View
//                       </Button>
//                       {(currentUser.permissions.includes("approve_requests") ||
//                         currentUser.permissions.includes("full_access")) &&
//                         request.status === "pending" && (
//                           <>
//                             <Button
//                               size="sm"
//                               variant="destructive"
//                               onClick={() => handleRequestAction(request.id, "Reject")}
//                               className="ml-2"
//                             >
//                               Reject
//                             </Button>
//                             <Button
//                               size="sm"
//                               onClick={() => handleRequestAction(request.id, "Approve")}
//                               className="ml-2 bg-green-600 hover:bg-green-700"
//                             >
//                               Approve
//                             </Button>
//                           </>
//                         )}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </Card>
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
//               <p><strong>Username:</strong> {viewingRequest.requester || 'N/A'}</p>
//               <p><strong>User:</strong> {viewingRequest.user || 'N/A'}</p>
//               <p><strong>Cloud:</strong> {viewingRequest.cloud.toUpperCase()}</p>
//               <p><strong>Title:</strong> {viewingRequest.title || 'N/A'}</p>
//               <p><strong>Resource Type:</strong> {viewingRequest.service}</p>
//               <p><strong>Access Level:</strong> {viewingRequest.accesslevel}</p>
//               <p><strong>Description:</strong> {viewingRequest.description}</p>
//               <p><strong>Status:</strong> {viewingRequest.status.toUpperCase()}</p>
//               <p><strong>Rejection Reason:</strong> {viewingRequest.rejectionReason || 'N/A'}</p>
//               <p><strong>Estimated Cost:</strong> ${viewingRequest.estimatedCost.toLocaleString()}</p>
//               <p><strong>Request Time:</strong> {viewingRequest.createdAt ? new Date(viewingRequest.createdAt).toLocaleString() : 'N/A'}</p>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default RequestsPage;




// import React, { useState, useEffect } from "react";
// import { Button } from "./ui/button";
// import { Card } from "./ui/card";
// import { Badge } from "./ui/badge";
// import { Input } from "./ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "./ui/dialog";
// import { Label } from "./ui/label";
// import { Textarea } from "./ui/textarea";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "./ui/table";
// import {
//   Plus,
//   Search,
//   Eye,
//   CheckCircle,
//   Clock,
//   XCircle,
//   AlertCircle,
// } from "lucide-react";
// import { recentRequests, cloudProviders, userRoles } from "../mock/data";

// // Interfaces
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

// interface User {
//   id: string;
//   name: string;
//   username: string;
//   permissions: string[];
// }

// interface RequestsPageProps {
//   currentUser: User;
//   selectedProvider: string;
// }

// const RequestsPage: React.FC<RequestsPageProps> = ({ 
//   currentUser, 
//   selectedProvider
// }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [viewingRequest, setViewingRequest] = useState<RecentRequest | null>(null);
//   const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  


// // For dynamic custom resource types per cloud
// const [customResources, setCustomResources] = useState<{ [cloudId: string]: string[] }>({});
// const [showCustomResourceInput, setShowCustomResourceInput] = useState(false);
// const [customResourceInput, setCustomResourceInput] = useState("");

// // Optional: for better display labels
// const resourceTypeLabels: { [key: string]: string } = {
//   ec2: "EC2 Instance",
//   s3: "S3 Bucket",
//   rds: "RDS Database",
//   lambda: "Lambda Function",
//   storage: "Cloud Storage",
//   compute: "Compute Instance"
// };

// const getResourceOptions = () => {
//   if (!newRequest.cloud) return [];
//   const cloudObj = cloudProviders.find(p => p.id === newRequest.cloud);
//   // Built-in types
//   const base = cloudObj?.services || [];
//   // Plus any added by user for this cloud
//   const extras = customResources[newRequest.cloud] || [];
//   // Remove duplicates
//   return [...base, ...extras.filter(r => !base.includes(r))];
// };






//   const [newRequest, setNewRequest] = useState({
//     title: "",
//     description: "",
//     cloud: selectedProvider !== "all" ? selectedProvider : "",
//     resourceType: "",
//     justification: "",
//     estimatedCost: "",
//     accessLevel: "",
//     manager: "",
//   });
//   const [formErrors, setFormErrors] = useState({
//     title: "",
//     cloud: "",
//     description: "",
//     resourceType: "",
//     justification: "",
//     estimatedCost: "",
//     accessLevel: "",
//     manager: "",
//   });

//   // Add event listener for the custom event from OverviewPage
//   useEffect(() => {
//     const handleOpenDialog = () => {
//       setIsNewRequestOpen(true);
//     };

//     window.addEventListener('openNewRequestDialog', handleOpenDialog);

//     // Cleanup event listener on unmount
//     return () => {
//       window.removeEventListener('openNewRequestDialog', handleOpenDialog);
//     };
//   }, []);

//   const filteredRequests = recentRequests.filter((request) => {
//     const matchesSearch =
//       request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       request.cloud.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       request.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       request.accesslevel.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesStatus = statusFilter === "all" || request.status.toLowerCase() === statusFilter.toLowerCase();
//     const matchesProvider = selectedProvider === "all" || request.cloud === selectedProvider;
//     return matchesSearch && matchesStatus && matchesProvider;
//   });

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "approved":
//         return "border-green-500 text-green-600";
//       case "rejected":
//         return "border-red-500 text-red-600";
//       case "pending":
//         return "border-yellow-500 text-yellow-600";
//       default:
//         return "border-gray-500 text-gray-600";
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "approved":
//         return <CheckCircle className="w-4 h-4 text-green-600" />;
//       case "pending":
//         return <Clock className="w-4 h-4 text-yellow-600" />;
//       case "rejected":
//         return <XCircle className="w-4 h-4 text-red-600" />;
//       default:
//         return <AlertCircle className="w-4 h-4 text-gray-600" />;
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setNewRequest((prev) => ({ ...prev, [name]: value }));
//     setFormErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//  const handleSelectChange = (name: string, value: string) => {
//   setNewRequest((prev) => ({
//     ...prev,
//     [name]: value,
//     ...(name === "cloud" ? { resourceType: "" } : {})
//   }));
//   setFormErrors((prev) => ({ ...prev, [name]: "" }));
//   if (name === "cloud") {
//     setShowCustomResourceInput(false);
//     setCustomResourceInput("");
//   }
// };


//   const validateForm = () => {
//     let isValid = true;
//     const errors = {
//       title: "",
//       cloud: "",
//       description: "",
//       resourceType: "",
//       justification: "",
//       estimatedCost: "",
//       accessLevel: "",
//       manager: "",
//     };

//     if (!newRequest.cloud) {
//       errors.cloud = "Cloud provider is required";
//       isValid = false;
//     }
//     if (!newRequest.description.trim()) {
//       errors.description = "Description is required";
//       isValid = false;
//     }
//     if (!newRequest.resourceType) {
//       errors.resourceType = "Resource type is required";
//       isValid = false;
//     }
//     if (!newRequest.justification.trim()) {
//       errors.justification = "Justification is required";
//       isValid = false;
//     }
//     if (!newRequest.estimatedCost || isNaN(Number(newRequest.estimatedCost))) {
//       errors.estimatedCost = "Valid estimated cost is required";
//       isValid = false;
//     }
//     if (!newRequest.accessLevel) {
//       errors.accessLevel = "Access level is required";
//       isValid = false;
//     }

//     setFormErrors(errors);
//     return isValid;
//   };

//   const handleSubmitRequest = () => {
//     if (validateForm()) {
//       console.log("Submitting request:", {
//         id: `REQ-${Math.random().toString(36).substr(2, 9)}`,
//         title: newRequest.title,
//         user: currentUser.name,
//         requester: currentUser.username,
//         service: newRequest.resourceType,
//         cloud: newRequest.cloud,
//         accesslevel: newRequest.accessLevel,
//         status: "pending",
//         requestDate: new Date().toISOString().split('T')[0],
//         createdAt: new Date().toISOString(),
//         estimatedCost: Number(newRequest.estimatedCost),
//         description: newRequest.description,
//         rejectionReason: undefined,
//       });
//       setIsNewRequestOpen(false);
//       setNewRequest({
//         title: "",
//         description: "",
//         cloud: selectedProvider !== "all" ? selectedProvider : "",
//         resourceType: "",
//         justification: "",
//         estimatedCost: "",
//         accessLevel: "",
//         manager: "",
//       });
//       setFormErrors({
//         title: "",
//         cloud: "",
//         description: "",
//         resourceType: "",
//         justification: "",
//         estimatedCost: "",
//         accessLevel: "",
//         manager: "",
//       });
//     }
//   };

//   const handleRequestAction = (requestId: string, action: string) => {
//     console.log(`${action} request ${requestId}`);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">
//             {currentUser.id === "user" ? "My Requests" : "Service Requests"}
//           </h1>
//           <p className="text-muted-foreground">
//             {currentUser.id === "user"
//               ? "Track your resource requests and access approvals"
//               : "Manage and approve team resource requests"}
//           </p>
//         </div>
//         {currentUser.permissions.includes("request_access") && (
//           // <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
//           //   <DialogTrigger asChild>
//           //     <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
//           //       <Plus className="w-4 h-4 mr-2" />
//           //       New Request
//           //     </Button>
//           //   </DialogTrigger>
//           //   <DialogContent className="sm:max-w-[420px] max-h-[85vh] overflow-y-auto">
//           //     <DialogHeader className="pb-3">
//           //       <DialogTitle className="text-lg">New Access Request</DialogTitle>
//           //       <p className="text-xs text-muted-foreground">
//           //         Request access to cloud resources
//           //       </p>
//           //     </DialogHeader>
//           //     <div className="space-y-3">
//           //       {/* Cloud Provider */}
//           //       <div className="space-y-1">
//           //         <Label htmlFor="cloud" className="text-xs font-medium">Cloud Provider *</Label>
//           //         <Select
//           //           value={newRequest.cloud}
//           //           onValueChange={(value) => handleSelectChange("cloud", value)}
//           //           disabled={selectedProvider !== "all"}
//           //         >
//           //           <SelectTrigger className="h-8 text-sm">
//           //             <SelectValue placeholder="Select provider" />
//           //           </SelectTrigger>
//           //           <SelectContent>
//           //             {cloudProviders.map((provider) => (
//           //               <SelectItem key={provider.id} value={provider.id}>
//           //                 {provider.name}
//           //               </SelectItem>
//           //             ))}
//           //           </SelectContent>
//           //         </Select>
//           //         {formErrors.cloud && (
//           //           <p className="text-xs text-destructive">{formErrors.cloud}</p>
//           //         )}
//           //       </div>

//           //       {/* Resource Type */}
//           //       <div className="space-y-1">
//           //         <Label htmlFor="resourceType" className="text-xs font-medium">Resource Type *</Label>
//           //         <Select
//           //           value={newRequest.resourceType}
//           //           onValueChange={(value) => handleSelectChange("resourceType", value)}
//           //         >
//           //           <SelectTrigger className="h-8 text-sm">
//           //             <SelectValue placeholder="Select resource type" />
//           //           </SelectTrigger>
//           //           <SelectContent>
//           //             <SelectItem value="ec2">EC2 Instance</SelectItem>
//           //             <SelectItem value="s3">S3 Bucket</SelectItem>
//           //             <SelectItem value="rds">RDS Database</SelectItem>
//           //             <SelectItem value="lambda">Lambda Function</SelectItem>
//           //             <SelectItem value="storage">Cloud Storage</SelectItem>
//           //             <SelectItem value="compute">Compute Instance</SelectItem>
//           //           </SelectContent>
//           //         </Select>
//           //         {formErrors.resourceType && (
//           //           <p className="text-xs text-destructive">{formErrors.resourceType}</p>
//           //         )}
//           //       </div>

//           //       {/* Access Level & Cost (Side by side) */}
//           //       <div className="grid grid-cols-2 gap-3">
//           //         <div className="space-y-1">
//           //           <Label htmlFor="accessLevel" className="text-xs font-medium">Access Level *</Label>
//           //           <Select
//           //             value={newRequest.accessLevel}
//           //             onValueChange={(value) => handleSelectChange("accessLevel", value)}
//           //           >
//           //             <SelectTrigger className="h-8 text-sm">
//           //               <SelectValue placeholder="Select access" />
//           //             </SelectTrigger>
//           //             <SelectContent>
//           //               <SelectItem value="read">Read Only</SelectItem>
//           //               <SelectItem value="write">Read/Write</SelectItem>
//           //               <SelectItem value="admin">Administrative</SelectItem>
//           //             </SelectContent>
//           //           </Select>
//           //           {formErrors.accessLevel && (
//           //             <p className="text-xs text-destructive">{formErrors.accessLevel}</p>
//           //           )}
//           //         </div>
//           //         <div className="space-y-1">
//           //           <Label htmlFor="estimatedCost" className="text-xs font-medium">Cost ($) *</Label>
//           //           <Input
//           //             name="estimatedCost"
//           //             type="number"
//           //             value={newRequest.estimatedCost}
//           //             onChange={handleInputChange}
//           //             placeholder="Cost"
//           //             className="h-8 text-sm"
//           //           />
//           //           {formErrors.estimatedCost && (
//           //             <p className="text-xs text-destructive">{formErrors.estimatedCost}</p>
//           //           )}
//           //         </div>
//           //       </div>

//           //       {/* Description */}
//           //       <div className="space-y-1">
//           //         <Label htmlFor="description" className="text-xs font-medium">Description *</Label>
//           //         <Textarea
//           //           name="description"
//           //           value={newRequest.description}
//           //           onChange={handleInputChange}
//           //           placeholder="Brief description of the resource needed"
//           //           className="text-sm min-h-[60px] resize-none"
//           //         />
//           //         {formErrors.description && (
//           //           <p className="text-xs text-destructive">{formErrors.description}</p>
//           //         )}
//           //       </div>

//           //       {/* Justification */}
//           //       <div className="space-y-1">
//           //         <Label htmlFor="justification" className="text-xs font-medium">Business Justification *</Label>
//           //         <Textarea
//           //           name="justification"
//           //           value={newRequest.justification}
//           //           onChange={handleInputChange}
//           //           placeholder="Explain why this access is needed"
//           //           className="text-sm min-h-[60px] resize-none"
//           //         />
//           //         {formErrors.justification && (
//           //           <p className="text-xs text-destructive">{formErrors.justification}</p>
//           //         )}
//           //       </div>
//           //     </div>
              
//           //     <div className="flex justify-end space-x-2 pt-4 border-t">
//           //       <Button 
//           //         variant="outline" 
//           //         size="sm" 
//           //         onClick={() => setIsNewRequestOpen(false)}
//           //         className="text-sm"
//           //       >
//           //         Cancel
//           //       </Button>
//           //       <Button 
//           //         onClick={handleSubmitRequest} 
//           //         size="sm"
//           //         className="bg-primary hover:bg-primary/90 text-sm"
//           //       >
//           //         Submit Request
//           //       </Button>
//           //     </div>
//           //   </DialogContent>
//           // </Dialog>
// <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
//   <DialogTrigger asChild>
//     <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
//       <Plus className="w-4 h-4 mr-2" />
//       New Request
//     </Button>
//   </DialogTrigger>
//   <DialogContent className="sm:max-w-[600px]">
//     <DialogHeader>
//       <DialogTitle>New Access Request</DialogTitle>
//       <p className="text-sm text-muted-foreground">
//         Fill in the details below to request access to a cloud resource.
//       </p>
//     </DialogHeader>
//     <div className="grid grid-cols-2 gap-4 py-4">
//       {/* Cloud Provider */}
//       <div className="space-y-2">
//         <Label htmlFor="cloud">Cloud Provider</Label>
//         <Select
//           value={newRequest.cloud}
//           onValueChange={(value) => handleSelectChange("cloud", value)}
//           disabled={selectedProvider !== "all"}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select provider" />
//           </SelectTrigger>
//           <SelectContent>
//             {cloudProviders.map((provider) => (
//               <SelectItem key={provider.id} value={provider.id}>
//                 {provider.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//         {formErrors.cloud && (
//           <p className="text-sm text-destructive">{formErrors.cloud}</p>
//         )}
//       </div>
//       {/* Resource Type */}
//       <div className="space-y-2">
//         <Label htmlFor="resourceType">Resource Type</Label>
//         <Select
//           value={showCustomResourceInput ? "__custom__" : newRequest.resourceType}
//           onValueChange={(val) => {
//             if (val === "__custom__") {
//               setShowCustomResourceInput(true);
//             } else {
//               setShowCustomResourceInput(false);
//               handleSelectChange("resourceType", val);
//             }
//           }}
//           disabled={!newRequest.cloud}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select resource type" />
//           </SelectTrigger>
//           <SelectContent>
//             {getResourceOptions().map((type) => (
//               <SelectItem value={type} key={type}>
//                 {resourceTypeLabels[type] || type}
//               </SelectItem>
//             ))}
//             <SelectItem value="__custom__" key="__custom__">
//               + Create new resource...
//             </SelectItem>
//           </SelectContent>
//         </Select>
//         {/* Inline input for custom resource */}
//         {showCustomResourceInput && (
//           <div className="flex gap-2 mt-1">
//             <Input
//               autoFocus
//               value={customResourceInput}
//               onChange={e => setCustomResourceInput(e.target.value)}
//               placeholder="Enter new resource type"
//               className="flex-1"
//             />
//             <Button
//               type="button"
//               onClick={() => {
//                 const val = customResourceInput.trim();
//                 if (val && newRequest.cloud) {
//                   setCustomResources((old) => ({
//                     ...old,
//                     [newRequest.cloud]: [
//                       ...(old[newRequest.cloud] || []),
//                       val
//                     ]
//                   }));
//                   handleSelectChange("resourceType", val);
//                   setShowCustomResourceInput(false);
//                   setCustomResourceInput("");
//                 }
//               }}
//               disabled={!customResourceInput.trim()}
//             >
//               Add
//             </Button>
//             <Button
//               type="button"
//               variant="ghost"
//               onClick={() => {
//                 setShowCustomResourceInput(false);
//                 setCustomResourceInput("");
//               }}
//             >
//               Cancel
//             </Button>
//           </div>
//         )}
//         {formErrors.resourceType && (
//           <p className="text-sm text-destructive">{formErrors.resourceType}</p>
//         )}
//       </div>
//       {/* Access Level */}
//       <div className="space-y-2">
//         <Label htmlFor="accessLevel">Access Level</Label>
//         <Select
//           value={newRequest.accessLevel}
//           onValueChange={(value) => handleSelectChange("accessLevel", value)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select access level" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="read">Read Only</SelectItem>
//             <SelectItem value="write">Read/Write</SelectItem>
//             <SelectItem value="admin">Administrative</SelectItem>
//           </SelectContent>
//         </Select>
//         {formErrors.accessLevel && (
//           <p className="text-sm text-destructive">{formErrors.accessLevel}</p>
//         )}
//       </div>
//       {/* Manager */}
//       <div className="space-y-2">
//         <Label htmlFor="manager">Manager</Label>
//         <Select
//           value={newRequest.manager}
//           onValueChange={(value) => handleSelectChange("manager", value)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select manager" />
//           </SelectTrigger>
//           <SelectContent>
//             {userRoles
//               .filter((role) => role.id === "manager")
//               .map((manager) => (
//                 <SelectItem key={manager.id} value={manager.credentials.username}>
//                   {manager.credentials.username}
//                 </SelectItem>
//               ))}
//           </SelectContent>
//         </Select>
//         {formErrors.manager && (
//           <p className="text-sm text-destructive">{formErrors.manager}</p>
//         )}
//       </div>
//       {/* Justification */}
//       <div className="col-span-2 space-y-2">
//         <Label htmlFor="justification">Justification</Label>
//         <Textarea
//           name="justification"
//           value={newRequest.justification}
//           onChange={handleInputChange}
//           placeholder="Explain the reason for access"
//         />
//         {formErrors.justification && (
//           <p className="text-sm text-destructive">{formErrors.justification}</p>
//         )}
//       </div>
       
       
       
//     </div>
//     <div className="flex justify-end space-x-2">
//       <Button variant="outline" onClick={() => setIsNewRequestOpen(false)}>
//         Cancel
//       </Button>
//       <Button onClick={handleSubmitRequest} className="bg-primary hover:bg-primary/90">
//         Submit Request
//       </Button>
//     </div>
//   </DialogContent>
// </Dialog>



//         )}
//       </div>

//       {/* Filters */}
//       <Card className="p-4">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//             <Input
//               placeholder="Search by ID, cloud, service, or access level..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//           <div className="w-40">
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Statuses</SelectItem>
//                 <SelectItem value="pending">Pending</SelectItem>
//                 <SelectItem value="approved">Approved</SelectItem>
//                 <SelectItem value="rejected">Rejected</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </Card>

//       {/* Request Table */}
//       <Card>
//         <Card className="p-4 max-h-[500px] overflow-y-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Id</TableHead>
//                 <TableHead>Cloud</TableHead>
//                 <TableHead>Resource Type</TableHead>
//                 <TableHead>Access Level</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Request Date</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredRequests.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={7} className="h-24 text-center">
//                     No results found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredRequests.map((request) => (
//                   <TableRow key={request.id}>
//                     <TableCell>{request.id}</TableCell>
//                     <TableCell>{request.cloud}</TableCell>
//                     <TableCell>{request.service}</TableCell>
//                     <TableCell>{request.accesslevel}</TableCell>
//                     <TableCell>
//                       <Badge variant="outline" className={getStatusColor(request.status)}>
//                         {getStatusIcon(request.status)}
//                         <span className="ml-1">{request.status.toUpperCase()}</span>
//                       </Badge>
//                     </TableCell>
//                     <TableCell>{request.requestDate}</TableCell>
//                     <TableCell className="text-right">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => setViewingRequest(request)}
//                       >
//                         <Eye className="h-4 w-4 mr-2" />
//                         View
//                       </Button>
//                       {(currentUser.permissions.includes("approve_requests") ||
//                         currentUser.permissions.includes("full_access")) &&
//                         request.status === "pending" && (
//                           <>
//                             <Button
//                               size="sm"
//                               variant="destructive"
//                               onClick={() => handleRequestAction(request.id, "Reject")}
//                               className="ml-2"
//                             >
//                               Reject
//                             </Button>
//                             <Button
//                               size="sm"
//                               onClick={() => handleRequestAction(request.id, "Approve")}
//                               className="ml-2 bg-green-600 hover:bg-green-700"
//                             >
//                               Approve
//                             </Button>
//                           </>
//                         )}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </Card>
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
//               <p><strong>Username:</strong> {viewingRequest.requester || 'N/A'}</p>
//               <p><strong>User:</strong> {viewingRequest.user || 'N/A'}</p>
//               <p><strong>Cloud:</strong> {viewingRequest.cloud.toUpperCase()}</p>
//               <p><strong>Title:</strong> {viewingRequest.title || 'N/A'}</p>
//               <p><strong>Resource Type:</strong> {viewingRequest.service}</p>
//               <p><strong>Access Level:</strong> {viewingRequest.accesslevel}</p>
//               <p><strong>Description:</strong> {viewingRequest.description}</p>
//               <p><strong>Status:</strong> {viewingRequest.status.toUpperCase()}</p>
//               <p><strong>Rejection Reason:</strong> {viewingRequest.rejectionReason || 'N/A'}</p>
//               <p><strong>Estimated Cost:</strong> ${viewingRequest.estimatedCost.toLocaleString()}</p>
//               <p><strong>Request Time:</strong> {viewingRequest.createdAt ? new Date(viewingRequest.createdAt).toLocaleString() : 'N/A'}</p>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default RequestsPage;


// import React, { useState, useEffect } from 'react';
// import { Button } from './ui/button';
// import { Card } from './ui/card';
// import { Badge } from './ui/badge';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { Textarea } from './ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
// import { useNavigate } from 'react-router-dom';
// import {
//   Search,
//   Calendar,
//   User,
//   CheckCircle,
//   XCircle,
//   Clock,
//   FileText,
//   Eye,
//   X,
//   Edit3,
//   Loader2,
//   Shield,
//   AlertCircle,
//   Plus
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

// // New Request Form interfaces
// interface NewRequest {
//   cloud: string;
//   resourceType: string;
//   accessLevel: string;
//   manager: string;
//   justification: string;
// }

// interface FormErrors {
//   cloud?: string;
//   resourceType?: string;
//   accessLevel?: string;
//   manager?: string;
//   justification?: string;
// }

// const RequestsPage = () => {
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [filterStatus, setFilterStatus] = useState<string>('all');
//   const [requests, setRequests] = useState<APIRequest[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedRequest, setSelectedRequest] = useState<APIRequest | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   // New Request Dialog states
//   const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
//   const [newRequest, setNewRequest] = useState<NewRequest>({
//     cloud: '',
//     resourceType: '',
//     accessLevel: '',
//     manager: '',
//     justification: '',
//   });
//   const [formErrors, setFormErrors] = useState<FormErrors>({});
//   const [showCustomResourceInput, setShowCustomResourceInput] = useState(false);
//   const [customResourceInput, setCustomResourceInput] = useState('');
//   const [customResources, setCustomResources] = useState<{ [key: string]: string[] }>({});
//   const [selectedProvider] = useState('all'); // Assuming this comes from props or context

//   // Static data - you might want to fetch these from API
//   const cloudProviders = [
//     { id: 'aws', name: 'Amazon Web Services' },
//     { id: 'azure', name: 'Microsoft Azure' },
//     { id: 'gcp', name: 'Google Cloud Platform' },
//   ];

//   const resourceTypeLabels: { [key: string]: string } = {
//     s3: 'S3 Bucket',
//     ec2: 'EC2 Instance',
//     rds: 'RDS Database',
//     vm: 'Virtual Machine',
//     storage: 'Storage Account',
//     compute: 'Compute Engine',
//   };

//   const baseResourceTypes: { [key: string]: string[] } = {
//     aws: ['s3', 'ec2', 'rds'],
//     azure: ['vm', 'storage'],
//     gcp: ['compute', 'storage'],
//   };

//   const userRoles = [
//     { id: 'manager', credentials: { username: 'Muthyam_Harshitha' } },
//     { id: 'manager', credentials: { username: 'jane.supervisor' } },
//     { id: 'manager', credentials: { username: 'mike.lead' } },
//   ];

//   useEffect(() => {
//     const fetchRequests = async () => {
//       setIsLoading(true);
//       setError(null);
//       const fullName = localStorage.getItem("fullName");
//       const userRole = localStorage.getItem("role");

//       try {
//         const response = await fetch(
//           `https://9y40j38nv9.execute-api.ap-south-1.amazonaws.com/list_requests?Username=${fullName}`
//         );

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || 'Failed to fetch requests');
//         }

//         const data: APIResponse = await response.json();
//         if (Array.isArray(data.requests)) {
//           const filteredRequests = userRole === "Manager"
//             ? data.requests
//             : data.requests.filter((req: APIRequest) => req.Username === fullName);
//           setRequests(filteredRequests);
//         }
//       } catch (error: any) {
//         console.error("Error fetching requests:", error);
//         setError(error.message || 'Error loading requests. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchRequests();
//   }, []);

//   // New Request Form handlers
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setNewRequest(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user starts typing
//     if (formErrors[name as keyof FormErrors]) {
//       setFormErrors(prev => ({
//         ...prev,
//         [name]: undefined
//       }));
//     }
//   };

//   const handleSelectChange = (field: keyof NewRequest, value: string) => {
//     setNewRequest(prev => ({
//       ...prev,
//       [field]: value
//     }));
//     // Clear error when user makes selection
//     if (formErrors[field]) {
//       setFormErrors(prev => ({
//         ...prev,
//         [field]: undefined
//       }));
//     }
//   };

//   const getResourceOptions = () => {
//     if (!newRequest.cloud) return [];
//     const baseTypes = baseResourceTypes[newRequest.cloud] || [];
//     const customTypes = customResources[newRequest.cloud] || [];
//     return [...baseTypes, ...customTypes];
//   };

//   const validateForm = (): boolean => {
//     const errors: FormErrors = {};

//     if (!newRequest.cloud) {
//       errors.cloud = 'Cloud provider is required';
//     }
//     if (!newRequest.resourceType) {
//       errors.resourceType = 'Resource type is required';
//     }
//     if (!newRequest.accessLevel) {
//       errors.accessLevel = 'Access level is required';
//     }
//     if (!newRequest.manager) {
//       errors.manager = 'Manager is required';
//     }
//     if (!newRequest.justification.trim()) {
//       errors.justification = 'Justification is required';
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

  
//   const handleSubmitRequest = async () => {
//   if (!validateForm()) {
//     return;
//   }

//   try {
//     setIsLoading(true); // Add loading state for better UX
    
//     // Transform the form data to match API expectations
//     const requestBody = {
//       Username: localStorage.getItem("fullName"),
//       Cloud: newRequest.cloud, // maps to your cloud field
//       Service: newRequest.resourceType, // maps to your resourceType field
//       AccessLevel: newRequest.accessLevel, // maps to your accessLevel field
//       Role: localStorage.getItem("role"),
//       Manager: newRequest.manager, // maps to your manager field
//       Reason: newRequest.justification, // maps to your justification field
//     };

//     console.log('Submitting request:', requestBody);

//     const response = await fetch(
//       'https://lp6t2xn0q4.execute-api.ap-south-1.amazonaws.com/prod/request_access',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // Add any additional headers your API might need
//           // 'Authorization': 'Bearer ' + token, // if authentication is required
//         },
//         body: JSON.stringify(requestBody),
//       }
//     );

//     if (response.ok) {
//       const responseData = await response.json();
//       console.log('Request submitted successfully:', responseData);
      
//       // Show success message (you might want to add a toast notification)
//       alert('Request submitted successfully!');
      
//       // Reset form
//       setNewRequest({
//         cloud: '',
//         resourceType: '',
//         accessLevel: '',
//         manager: '',
//         justification: '',
//       });
//       setFormErrors({});
//       setIsNewRequestOpen(false);
      
//       // Refresh the requests list
//       window.location.reload();
//     } else {
//       // Handle HTTP errors
//       const errorData = await response.json().catch(() => null);
//       const errorMessage = errorData?.message || `HTTP ${response.status}: ${response.statusText}`;
//       console.error('Failed to submit request:', errorMessage);
//       alert(`Failed to submit request: ${errorMessage}`);
//     }
//   } catch (error) {
//     console.error('Error submitting request:', error);
//     alert(`Error submitting request: ${error.message}`);
//   } finally {
//     setIsLoading(false);
//   }
// };

//   const getFilteredRequests = (): APIRequest[] => {
//     let filtered = requests;

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (request) =>
//           request.Service.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           request.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           request.RequestID.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           request.Reason.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (filterStatus !== 'all') {
//       filtered = filtered.filter((request) => request.Status === filterStatus);
//     }

//     filtered.sort((a, b) => {
//       return new Date(b.RequestTime).getTime() - new Date(a.RequestTime).getTime();
//     });

//     return filtered;
//   };

//   const filteredRequests = getFilteredRequests();

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'approved':
//         return <CheckCircle className="w-4 h-4 text-blue-500" />;
//       case 'applied':
//         return <Shield className="w-4 h-4 text-green-500" />;
//       case 'rejected':
//         return <XCircle className="w-4 h-4 text-red-500" />;
//       default:
//         return <Clock className="w-4 h-4 text-orange-500" />;
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     const statusConfig: {
//       [key: string]: { color: string; label: string };
//     } = {
//       approved: { color: 'text-blue-600 border-blue-600 bg-blue-50', label: 'Approved' },
//       applied: { color: 'text-green-600 border-green-600 bg-green-50', label: 'Applied' },
//       rejected: { color: 'text-red-600 border-red-600 bg-red-50', label: 'Rejected' },
//       pending: { color: 'text-orange-600 border-orange-600 bg-orange-50', label: 'Pending' },
//     };

//     const config = statusConfig[status] || statusConfig.pending;
//     return (
//       <Badge variant="outline" className={`text-xs ${config.color}`}>
//         {config.label}
//       </Badge>
//     );
//   };

//   const getCloudIcon = (cloud: string) => {
//     const cloudIcons: { [key: string]: string } = {
//       aws: '🚀',
//       azure: '☁️',
//       gcp: '🔵'
//     };
//     return cloudIcons[cloud.toLowerCase()] || '☁️';
//   };

//   const handleViewRequest = (request: APIRequest) => {
//     setSelectedRequest(request);
//   };

//   const handleCloseModal = () => {
//     setSelectedRequest(null);
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

//   if (isLoading && !requests.length) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
//           <p className="text-muted-foreground">Loading request history...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error && !requests.length) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//           <h3 className="text-lg font-semibold text-foreground mb-2">Error Loading Requests</h3>
//           <p className="text-muted-foreground mb-4">{error}</p>
//           <Button onClick={() => window.location.reload()}>
//             Try Again
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
     
//       {/* Simplified Filters */}
//       <Card className="p-4">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search by service, username, request ID, or reason..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-9"
//               />
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
//             >
//               <option value="all">All Status</option>
//               <option value="applied">Applied</option>
//               <option value="approved">Approved</option>
//               <option value="pending">Pending</option>
//               <option value="rejected">Rejected</option>
//             </select>

//             {/* New Request Dialog */}
//             <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
//               <DialogTrigger asChild>
//                 <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
//                   <Plus className="w-4 h-4 mr-2" />
//                   New Request
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[600px]">
//                 <DialogHeader>
//                   <DialogTitle>New Access Request</DialogTitle>
//                   <DialogDescription>
//                     Fill in the details below to request access to a cloud resource.
//                   </DialogDescription>
//                 </DialogHeader>
//                 {error && (
//                   <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-4">
//                     {error}
//                   </div>
//                 )}
//                 <div className="grid grid-cols-2 gap-4 py-4">
//                   {/* Cloud Provider */}
//                   <div className="space-y-2">
//                     <Label htmlFor="cloud">Cloud Provider</Label>
//                     <Select
//                       value={newRequest.cloud}
//                       onValueChange={(value) => handleSelectChange("cloud", value)}
//                       disabled={selectedProvider !== "all"}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select provider" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {cloudProviders.map((provider) => (
//                           <SelectItem key={provider.id} value={provider.id}>
//                             {provider.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     {formErrors.cloud && (
//                       <p className="text-sm text-destructive">{formErrors.cloud}</p>
//                     )}
//                   </div>
//                   {/* Resource Type */}
//                   <div className="space-y-2">
//                     <Label htmlFor="resourceType">Resource Type</Label>
//                     <Select
//                       value={showCustomResourceInput ? "__custom__" : newRequest.resourceType}
//                       onValueChange={(val) => {
//                         if (val === "__custom__") {
//                           setShowCustomResourceInput(true);
//                         } else {
//                           setShowCustomResourceInput(false);
//                           handleSelectChange("resourceType", val);
//                         }
//                       }}
//                       disabled={!newRequest.cloud}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select resource type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {getResourceOptions().map((type) => (
//                           <SelectItem value={type} key={type}>
//                             {resourceTypeLabels[type] || type}
//                           </SelectItem>
//                         ))}
//                         <SelectItem value="__custom__" key="__custom__">
//                           + Create new resource...
//                         </SelectItem>
//                       </SelectContent>
//                     </Select>
//                     {showCustomResourceInput && (
//                       <div className="flex gap-2 mt-1">
//                         <Input
//                           autoFocus
//                           value={customResourceInput}
//                           onChange={e => setCustomResourceInput(e.target.value)}
//                           placeholder="Enter new resource type"
//                           className="flex-1"
//                         />
//                         <Button
//                           type="button"
//                           onClick={() => {
//                             const val = customResourceInput.trim();
//                             if (val && newRequest.cloud) {
//                               setCustomResources((old) => ({
//                                 ...old,
//                                 [newRequest.cloud]: [
//                                   ...(old[newRequest.cloud] || []),
//                                   val
//                                 ]
//                               }));
//                               handleSelectChange("resourceType", val);
//                               setShowCustomResourceInput(false);
//                               setCustomResourceInput("");
//                             }
//                           }}
//                           disabled={!customResourceInput.trim()}
//                         >
//                           Add
//                         </Button>
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           onClick={() => {
//                             setShowCustomResourceInput(false);
//                             setCustomResourceInput("");
//                           }}
//                         >
//                           Cancel
//                         </Button>
//                       </div>
//                     )}
//                     {formErrors.resourceType && (
//                       <p className="text-sm text-destructive">{formErrors.resourceType}</p>
//                     )}
//                   </div>
//                   {/* Access Level */}
//                   <div className="space-y-2">
//                     <Label htmlFor="accessLevel">Access Level</Label>
//                     <Select
//                       value={newRequest.accessLevel}
//                       onValueChange={(value) => handleSelectChange("accessLevel", value)}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select access level" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="read">Read Only</SelectItem>
//                         <SelectItem value="write">Read/Write</SelectItem>
//                         <SelectItem value="admin">Administrative</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     {formErrors.accessLevel && (
//                       <p className="text-sm text-destructive">{formErrors.accessLevel}</p>
//                     )}
//                   </div>
//                   {/* Manager */}
//                   <div className="space-y-2">
//                     <Label htmlFor="manager">Manager</Label>
//                     <Select
//                       value={newRequest.manager}
//                       onValueChange={(value) => handleSelectChange("manager", value)}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select manager" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {userRoles
//                           .filter((role) => role.id === "manager")
//                           .map((manager) => (
//                             <SelectItem key={manager.credentials.username} value={manager.credentials.username}>
//                               {manager.credentials.username}
//                             </SelectItem>
//                           ))}
//                       </SelectContent>
//                     </Select>
//                     {formErrors.manager && (
//                       <p className="text-sm text-destructive">{formErrors.manager}</p>
//                     )}
//                   </div>
//                   {/* Justification */}
//                   <div className="col-span-2 space-y-2">
//                     <Label htmlFor="justification">Justification</Label>
//                     <Textarea
//                       name="justification"
//                       value={newRequest.justification}
//                       onChange={handleInputChange}
//                       placeholder="Explain the reason for access"
//                     />
//                     {formErrors.justification && (
//                       <p className="text-sm text-destructive">{formErrors.justification}</p>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex justify-end space-x-2">
//                   <Button variant="outline" onClick={() => setIsNewRequestOpen(false)} disabled={isLoading}>
//                     Cancel
//                   </Button>
//                   <Button onClick={handleSubmitRequest} disabled={isLoading} className="bg-primary hover:bg-primary/90">
//                     {isLoading ? (
//                       <>
//                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                         Submitting...
//                       </>
//                     ) : (
//                       'Submit Request'
//                     )}
//                   </Button>
//                 </div>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>
//       </Card>

//       {/* Requests Table */}
//       <Card className="p-6">
//         <div className="overflow-x-auto">
//           <table className="table-auto w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Request ID
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Service
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Cloud
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Access Level
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Requested
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredRequests.map((request) => (
//                 <tr key={request.RequestID} className="hover:bg-gray-50">
//                   <td className="px-4 py-4 text-sm text-gray-500 truncate max-w-[120px]">
//                     <div className="font-mono text-xs">
//                       {request.RequestID.substring(0, 8)}...
//                     </div>
//                   </td>
//                   <td className="px-4 py-4 text-sm font-medium text-gray-900">
//                     <div className="flex items-center">
//                       <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
//                       {request.Service}
//                     </div>
//                   </td>
//                   <td className="px-4 py-4 text-sm text-gray-500">
//                     <div className="flex items-center">
//                       <span className="mr-1">{getCloudIcon(request.Cloud)}</span>
//                       {request.Cloud.toUpperCase()}
//                     </div>
//                   </td>
//                   <td className="px-4 py-4 text-sm text-gray-500">
//                     <Badge variant="secondary" className="text-xs">
//                       {request.AccessLevel}
//                     </Badge>
//                   </td>
//                   <td className="px-4 py-4 text-sm text-gray-500">
//                     <div className="flex items-center space-x-2">
//                       {getStatusIcon(request.Status)}
//                       {getStatusBadge(request.Status)}
//                     </div>
//                   </td>
//                   <td className="px-4 py-4 text-sm text-gray-500">
//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 mr-1" />
//                       {formatDate(request.RequestTime)}
//                     </div>
//                   </td>
//                   <td className="px-4 py-4 text-sm text-gray-500">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => handleViewRequest(request)}
//                     >
//                       <Eye className="w-4 h-4 mr-1" />
//                       View
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {filteredRequests.length === 0 && (
//           <div className="text-center py-8">
//             <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-500">No requests found matching your criteria.</p>
//           </div>
//         )}
//       </Card>

//       {/* View Request Modal */}
//       {selectedRequest && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
//             <Button
//               variant="ghost"
//               size="sm"
//               className="absolute top-2 right-2"
//               onClick={handleCloseModal}
//             >
//               <X className="w-4 h-4" />
//             </Button>

//             <div className="mb-6">
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">Request Details</h2>
//               <div className="flex items-center space-x-2 mb-4">
//                 {getStatusIcon(selectedRequest.Status)}
//                 {getStatusBadge(selectedRequest.Status)}
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">Request ID</Label>
//                   <div className="p-2 bg-gray-100 rounded-lg font-mono text-sm">
//                     {selectedRequest.RequestID}
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">Username</Label>
//                   <div className="p-2 bg-gray-100 rounded-lg text-sm flex items-center">
//                     <User className="w-4 h-4 mr-2" />
//                     {selectedRequest.Username}
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">Cloud Provider</Label>
//                   <div className="p-2 bg-gray-100 rounded-lg text-sm flex items-center">
//                     <span className="mr-2">{getCloudIcon(selectedRequest.Cloud)}</span>
//                     {selectedRequest.Cloud.toUpperCase()}
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">Service</Label>
//                   <div className="p-2 bg-gray-100 rounded-lg text-sm">
//                     {selectedRequest.Service}
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">Access Level</Label>
//                   <div className="p-2 bg-gray-100 rounded-lg text-sm">
//                     <Badge variant="secondary">{selectedRequest.AccessLevel}</Badge>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">Manager</Label>
//                   <div className="p-2 bg-gray-100 rounded-lg text-sm">
//                     {selectedRequest.Manager}
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label className="text-gray-700 font-medium">Reason</Label>
//                 <div className="p-3 bg-gray-100 rounded-lg text-sm">
//                   {selectedRequest.Reason}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">Request Time</Label>
//                   <div className="p-2 bg-gray-100 rounded-lg text-sm flex items-center">
//                     <Calendar className="w-4 h-4 mr-2" />
//                     {formatDate(selectedRequest.RequestTime)}
//                   </div>
//                 </div>
//                 {selectedRequest.ApplicationTime && (
//                   <div className="space-y-2">
//                     <Label className="text-gray-700 font-medium">Application Time</Label>
//                     <div className="p-2 bg-gray-100 rounded-lg text-sm flex items-center">
//                       <Calendar className="w-4 h-4 mr-2" />
//                       {formatDate(selectedRequest.ApplicationTime)}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {selectedRequest.PolicyExpiry && (
//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">Policy Expiry</Label>
//                   <div className="p-2 bg-yellow-100 border border-yellow-300 rounded-lg text-sm flex items-center">
//                     <AlertCircle className="w-4 h-4 mr-2 text-yellow-600" />
//                     {formatDate(selectedRequest.PolicyExpiry)}
//                   </div>
//                 </div>
//               )}

//               {selectedRequest.Policy && (
//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">Policy Details</Label>
//                   <div className="p-3 bg-gray-100 rounded-lg text-xs font-mono max-h-40 overflow-y-auto">
//                     <pre>{JSON.stringify(selectedRequest.Policy, null, 2)}</pre>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="flex justify-end mt-6">
//               <Button onClick={handleCloseModal}>
//                 Close
//               </Button>
//             </div>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RequestsPage;



// import React, { useState, useEffect } from 'react';
// import { Button } from './ui/button';
// import { Card } from './ui/card';
// import { Badge } from './ui/badge';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { Textarea } from './ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {
//   Search,
//   Calendar,
//   User,
//   CheckCircle,
//   XCircle,
//   Clock,
//   FileText,
//   Eye,
//   X,
//   Edit3,
//   Loader2,
//   Shield,
//   AlertCircle,
//   Plus,
//   ChevronDown
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
 
// // AWS Service interface for the pricing API
// interface AWSService {
//   serviceName: string;
//   serviceCode: string;
//   displayName?: string;
// }
 
// // New Request Form interfaces
// interface NewRequest {
//   cloud: string;
//   resourceType: string;
//   accessLevel: string;
//   manager: string;
//   justification: string;
// }
 
// interface FormErrors {
//   cloud?: string;
//   resourceType?: string;
//   accessLevel?: string;
//   manager?: string;
//   justification?: string;
// }
 
// // Custom searchable dropdown component
// const SearchableDropdown = ({
//   options,
//   value,
//   onChange,
//   placeholder = "Select option...",
//   isLoading = false,
//   disabled = false,
//   className = ""
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
 
//   const filteredOptions = options.filter(option =>
//     option.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     option.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     option.serviceCode?.toLowerCase().includes(searchTerm.toLowerCase())
//   );
 
//   const selectedOption = options.find(option =>
//     option.serviceCode === value || option.serviceName === value
//   );
 
//   const handleSelect = (option) => {
//     onChange(option.serviceCode || option.serviceName);
//     setIsOpen(false);
//     setSearchTerm('');
//   };
 
//   return (
//     <div className={`relative ${className}`}>
//       <button
//         type="button"
//         className={`w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
//         onClick={() => !disabled && setIsOpen(!isOpen)}
//         disabled={disabled}
//       >
//         <div className="flex items-center justify-between">
//           <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
//             {selectedOption ? (selectedOption.displayName || selectedOption.serviceName) : placeholder}
//           </span>
//           <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//         </div>
//       </button>
 
//       {isOpen && (
//         <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
//           <div className="p-2 border-b border-gray-200">
//             <div className="relative">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 type="text"
//                 placeholder="Search services..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-9 h-8"
//                 autoFocus
//               />
//             </div>
//           </div>
//           <div className="max-h-60 overflow-y-auto">
//             {isLoading ? (
//               <div className="p-4 text-center">
//                 <Loader2 className="w-4 h-4 animate-spin mx-auto mb-2" />
//                 <span className="text-sm text-gray-500">Loading services...</span>
//               </div>
//             ) : filteredOptions.length === 0 ? (
//               <div className="p-4 text-center text-sm text-gray-500">
//                 No services found
//               </div>
//             ) : (
//               filteredOptions.map((option, index) => (
//                 <button
//                   key={option.serviceCode || option.serviceName || index}
//                   type="button"
//                   className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
//                   onClick={() => handleSelect(option)}
//                 >
//                   <div className="flex flex-col">
//                     <span className="font-medium text-sm">
//                       {option.displayName || option.serviceName}
//                     </span>
//                     {option.serviceCode && option.serviceCode !== option.serviceName && (
//                       <span className="text-xs text-gray-500">{option.serviceCode}</span>
//                     )}
//                   </div>
//                 </button>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
 
// const RequestsPage = () => {
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [filterStatus, setFilterStatus] = useState<string>('all');
//   const [requests, setRequests] = useState<APIRequest[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedRequest, setSelectedRequest] = useState<APIRequest | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const location = useLocation();
 
//   // New Request Dialog states
//   const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
//   const [newRequest, setNewRequest] = useState<NewRequest>({
//     cloud: '',
//     resourceType: '',
//     accessLevel: '',
//     manager: '',
//     justification: '',
//   });
//   const [formErrors, setFormErrors] = useState<FormErrors>({});
//   const [showCustomResourceInput, setShowCustomResourceInput] = useState(false);
//   const [customResourceInput, setCustomResourceInput] = useState('');
//   const [customResources, setCustomResources] = useState<{ [key: string]: string[] }>({});
//   const [selectedProvider] = useState('all'); // Assuming this comes from props or context
 
//   // AWS Services state
//   const [awsServices, setAwsServices] = useState<AWSService[]>([]);
//   const [isLoadingServices, setIsLoadingServices] = useState(false);
//   const [servicesError, setServicesError] = useState<string | null>(null);
 
//   // Static data - you might want to fetch these from API
//   const cloudProviders = [
//     { id: 'aws', name: 'Amazon Web Services' },
//     { id: 'azure', name: 'Microsoft Azure' },
//     { id: 'gcp', name: 'Google Cloud Platform' },
//   ];
 
//   const resourceTypeLabels: { [key: string]: string } = {
//     s3: 'S3 Bucket',
//     ec2: 'EC2 Instance',
//     rds: 'RDS Database',
//     vm: 'Virtual Machine',
//     storage: 'Storage Account',
//     compute: 'Compute Engine',
//   };
 
//   const baseResourceTypes: { [key: string]: string[] } = {
//     aws: ['s3', 'ec2', 'rds'],
//     azure: ['vm', 'storage'],
//     gcp: ['compute', 'storage'],
//   };
 
//   const userRoles = [
//     { id: 'manager', credentials: { username: 'Muthyam_Harshitha' } },
//     { id: 'manager', credentials: { username: 'jane.supervisor' } },
//     { id: 'manager', credentials: { username: 'mike.lead' } },
//   ];
 
//   // Fetch AWS services from pricing API
//   const fetchAWSServices = async () => {
//     setIsLoadingServices(true);
//     setServicesError(null);
   
//     try {
//       const response = await fetch('https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/index.json');
     
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
     
//       const data = await response.json();
     
//       // Extract services from the offers object
//       const services: AWSService[] = [];
//       if (data.offers) {
//         Object.entries(data.offers).forEach(([serviceCode, serviceData]: [string, any]) => {
//           if (serviceData && typeof serviceData === 'object') {
//             services.push({
//               serviceCode: serviceCode,
//               serviceName: serviceData.offerName || serviceCode,
//               displayName: serviceData.offerName || serviceCode
//             });
//           }
//         });
//       }
     
//       // Sort services alphabetically by display name
//       services.sort((a, b) => (a.displayName || a.serviceName).localeCompare(b.displayName || b.serviceName));
     
//       setAwsServices(services);
//     } catch (error) {
//       console.error('Error fetching AWS services:', error);
//       setServicesError('Failed to load AWS services. Using default options.');
     
//       // Fallback to default AWS services if API fails
//       setAwsServices([
//         { serviceCode: 'AmazonS3', serviceName: 'Amazon Simple Storage Service (S3)', displayName: 'Amazon S3' },
//         { serviceCode: 'AmazonEC2', serviceName: 'Amazon Elastic Compute Cloud', displayName: 'Amazon EC2' },
//         { serviceCode: 'AmazonRDS', serviceName: 'Amazon Relational Database Service', displayName: 'Amazon RDS' },
//         { serviceCode: 'AWSLambda', serviceName: 'AWS Lambda', displayName: 'AWS Lambda' },
//         { serviceCode: 'AmazonVPC', serviceName: 'Amazon Virtual Private Cloud', displayName: 'Amazon VPC' }
//       ]);
//     } finally {
//       setIsLoadingServices(false);
//     }
//   };
 
//   // Handle initial filter from navigation state
//   useEffect(() => {
//     if (location.state?.filterStatus) {
//       setFilterStatus(location.state.filterStatus);
//     }
//   }, [location.state]);
 
//   useEffect(() => {
//     const fetchRequests = async () => {
//       setIsLoading(true);
//       setError(null);
//       const fullName = localStorage.getItem("fullName");
//       const userRole = localStorage.getItem("role");
 
//       try {
//         const response = await fetch(
//           `https://9y40j38nv9.execute-api.ap-south-1.amazonaws.com/list_requests?Username=${fullName}`
//         );
 
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || 'Failed to fetch requests');
//         }
 
//         const data: APIResponse = await response.json();
//         if (Array.isArray(data.requests)) {
//           const filteredRequests = userRole === "Manager"
//             ? data.requests
//             : data.requests.filter((req: APIRequest) => req.Username === fullName);
//           setRequests(filteredRequests);
//         }
//       } catch (error: any) {
//         console.error("Error fetching requests:", error);
//         setError(error.message || 'Error loading requests. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     };
 
//     fetchRequests();
//   }, []);
 
//   // Load AWS services when cloud provider changes to AWS
//   useEffect(() => {
//     if (newRequest.cloud === 'aws' && awsServices.length === 0) {
//       fetchAWSServices();
//     }
//   }, [newRequest.cloud]);
 
//   // New Request Form handlers
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setNewRequest(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user starts typing
//     if (formErrors[name as keyof FormErrors]) {
//       setFormErrors(prev => ({
//         ...prev,
//         [name]: undefined
//       }));
//     }
//   };
 
//   const handleSelectChange = (field: keyof NewRequest, value: string) => {
//     setNewRequest(prev => ({
//       ...prev,
//       [field]: value
//     }));
//     // Clear error when user makes selection
//     if (formErrors[field]) {
//       setFormErrors(prev => ({
//         ...prev,
//         [field]: undefined
//       }));
//     }
//   };
 
//   const getResourceOptions = () => {
//     if (!newRequest.cloud) return [];
   
//     if (newRequest.cloud === 'aws') {
//       return awsServices.map(service => ({
//         serviceName: service.serviceCode,
//         displayName: service.displayName || service.serviceName,
//         serviceCode: service.serviceCode
//       }));
//     }
   
//     const baseTypes = baseResourceTypes[newRequest.cloud] || [];
//     const customTypes = customResources[newRequest.cloud] || [];
//     return [...baseTypes, ...customTypes].map(type => ({
//       serviceName: type,
//       displayName: resourceTypeLabels[type] || type
//     }));
//   };
 
//   const validateForm = (): boolean => {
//     const errors: FormErrors = {};
 
//     if (!newRequest.cloud) {
//       errors.cloud = 'Cloud provider is required';
//     }
//     if (!newRequest.resourceType) {
//       errors.resourceType = 'Resource type is required';
//     }
//     if (!newRequest.accessLevel) {
//       errors.accessLevel = 'Access level is required';
//     }
//     if (!newRequest.manager) {
//       errors.manager = 'Manager is required';
//     }
//     if (!newRequest.justification.trim()) {
//       errors.justification = 'Justification is required';
//     }
 
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };
 
 
//   const handleSubmitRequest = async () => {
//   if (!validateForm()) {
//     return;
//   }
 
//   try {
//     setIsLoading(true); // Add loading state for better UX
   
//     // Transform the form data to match API expectations
//     const requestBody = {
//       Username: localStorage.getItem("fullName"),
//       Cloud: newRequest.cloud, // maps to your cloud field
//       Service: newRequest.resourceType, // maps to your resourceType field
//       AccessLevel: newRequest.accessLevel, // maps to your accessLevel field
//       Role: localStorage.getItem("role"),
//       Manager: newRequest.manager, // maps to your manager field
//       Reason: newRequest.justification, // maps to your justification field
//     };
 
//     console.log('Submitting request:', requestBody);
 
//     const response = await fetch(
//       'https://lp6t2xn0q4.execute-api.ap-south-1.amazonaws.com/prod/request_access',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // Add any additional headers your API might need
//           // 'Authorization': 'Bearer ' + token, // if authentication is required
//         },
//         body: JSON.stringify(requestBody),
//       }
//     );
 
//     if (response.ok) {
//       const responseData = await response.json();
//       console.log('Request submitted successfully:', responseData);
     
//       // Show success message (you might want to add a toast notification)
//       alert('Request submitted successfully!');
     
//       // Reset form
//       setNewRequest({
//         cloud: '',
//         resourceType: '',
//         accessLevel: '',
//         manager: '',
//         justification: '',
//       });
//       setFormErrors({});
//       setIsNewRequestOpen(false);
     
//       // Refresh the requests list
//       window.location.reload();
//     } else {
//       // Handle HTTP errors
//       const errorData = await response.json().catch(() => null);
//       const errorMessage = errorData?.message || `HTTP ${response.status}: ${response.statusText}`;
//       console.error('Failed to submit request:', errorMessage);
//       alert(`Failed to submit request: ${errorMessage}`);
//     }
//   } catch (error) {
//     console.error('Error submitting request:', error);
//     alert(`Error submitting request: ${error.message}`);
//   } finally {
//     setIsLoading(false);
//   }
// };
 
//   const getFilteredRequests = (): APIRequest[] => {
//     let filtered = requests;
 
//     if (searchTerm) {
//       filtered = filtered.filter(
//         (request) =>
//           request.Service.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           request.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           request.RequestID.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           request.Reason.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
 
//     if (filterStatus !== 'all') {
//       filtered = filtered.filter((request) => request.Status === filterStatus);
//     }
 
//     filtered.sort((a, b) => {
//       return new Date(b.RequestTime).getTime() - new Date(a.RequestTime).getTime();
//     });
 
//     return filtered;
//   };
 
//   const filteredRequests = getFilteredRequests();
 
//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'approved':
//         return <CheckCircle className="w-4 h-4 text-blue-500" />;
//       case 'applied':
//         return <Shield className="w-4 h-4 text-green-500" />;
//       case 'rejected':
//         return <XCircle className="w-4 h-4 text-red-500" />;
//       default:
//         return <Clock className="w-4 h-4 text-orange-500" />;
//     }
//   };
 
//   const getStatusBadge = (status: string) => {
//     const statusConfig: {
//       [key: string]: { color: string; label: string };
//     } = {
//       approved: { color: 'text-blue-600 border-blue-600 bg-blue-50', label: 'Approved' },
//       applied: { color: 'text-green-600 border-green-600 bg-green-50', label: 'Applied' },
//       rejected: { color: 'text-red-600 border-red-600 bg-red-50', label: 'Rejected' },
//       pending: { color: 'text-orange-600 border-orange-600 bg-orange-50', label: 'Pending' },
//     };
 
//     const config = statusConfig[status] || statusConfig.pending;
//     return (
//       <Badge variant="outline" className={`text-xs ${config.color}`}>
//         {config.label}
//       </Badge>
//     );
//   };
 
//   const getCloudIcon = (cloud: string) => {
//     const cloudIcons: { [key: string]: string } = {
//       aws: '🚀',
//       azure: '☁️',
//       gcp: '🔵'
//     };
//     return cloudIcons[cloud.toLowerCase()] || '☁️';
//   };
 
//   const handleViewRequest = (request: APIRequest) => {
//     setSelectedRequest(request);
//   };
 
//   const handleCloseModal = () => {
//     setSelectedRequest(null);
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
 
//   const getFilterStatusDisplayName = (status: string) => {
//     const statusNames: { [key: string]: string } = {
//       'all': 'All Requests',
//       'applied': 'Applied Services',
//       'approved': 'Approved Requests',
//       'pending': 'Pending Approvals',
//       'rejected': 'Rejected Requests'
//     };
//     return statusNames[status] || 'All Requests';
//   };
 
//   if (isLoading && !requests.length) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
//           <p className="text-muted-foreground">Loading request history...</p>
//         </div>
//       </div>
//     );
//   }
 
//   if (error && !requests.length) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//           <h3 className="text-lg font-semibold text-foreground mb-2">Error Loading Requests</h3>
//           <p className="text-muted-foreground mb-4">{error}</p>
//           <Button onClick={() => window.location.reload()}>
//             Try Again
//           </Button>
//         </div>
//       </div>
//     );
//   }
 
//   return (
//     <div className="space-y-6">
           
//       {/* Simplified Filters */}
//       <Card className="p-4">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search by service, username, request ID, or reason..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-9"
//               />
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
//             >
//               <option value="all">All Status</option>
//               <option value="applied">Applied</option>
//               <option value="approved">Approved</option>
//               <option value="pending">Pending</option>
//               <option value="rejected">Rejected</option>
//             </select>
 
//             {/* New Request Dialog */}
//             <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
//               <DialogTrigger asChild>
//                 <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
//                   <Plus className="w-4 h-4 mr-2" />
//                   New Request
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[600px]">
//                 <DialogHeader>
//                   <DialogTitle>New Access Request</DialogTitle>
//                   <DialogDescription>
//                     Fill in the details below to request access to a cloud resource.
//                   </DialogDescription>
//                 </DialogHeader>
//                 {error && (
//                   <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-4">
//                     {error}
//                   </div>
//                 )}
//                 {servicesError && (
//                   <div className="p-3 bg-yellow-100 text-yellow-700 rounded-lg mb-4 text-sm">
//                     <AlertCircle className="w-4 h-4 inline mr-2" />
//                     {servicesError}
//                   </div>
//                 )}
//                 <div className="grid grid-cols-2 gap-4 py-4">
//                   {/* Cloud Provider */}
//                   <div className="space-y-2">
//                     <Label htmlFor="cloud">Cloud Provider</Label>
//                     <Select
//                       value={newRequest.cloud}
//                       onValueChange={(value) => {
//                         handleSelectChange("cloud", value);
//                         // Reset resource type when cloud provider changes
//                         handleSelectChange("resourceType", "");
//                       }}
//                       disabled={selectedProvider !== "all"}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select provider" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {cloudProviders.map((provider) => (
//                           <SelectItem key={provider.id} value={provider.id}>
//                             {provider.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     {formErrors.cloud && (
//                       <p className="text-sm text-destructive">{formErrors.cloud}</p>
//                     )}
//                   </div>
                 
//                   {/* Resource Type */}
//                   <div className="space-y-2">
//                     <Label htmlFor="resourceType">Resource Type</Label>
//                     {newRequest.cloud === 'aws' ? (
//                       // Use custom searchable dropdown for AWS
//                       <div>
//                         <SearchableDropdown
//                           options={getResourceOptions()}
//                           value={newRequest.resourceType}
//                           onChange={(value) => handleSelectChange("resourceType", value)}
//                           placeholder="Search and select AWS service..."
//                           isLoading={isLoadingServices}
//                           disabled={!newRequest.cloud}
//                         />
//                       </div>
//                     ) : (
//                       // Use regular select for other cloud providers
//                       <Select
//                         value={showCustomResourceInput ? "__custom__" : newRequest.resourceType}
//                         onValueChange={(val) => {
//                           if (val === "__custom__") {
//                             setShowCustomResourceInput(true);
//                           } else {
//                             setShowCustomResourceInput(false);
//                             handleSelectChange("resourceType", val);
//                           }
//                         }}
//                         disabled={!newRequest.cloud}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select resource type" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {getResourceOptions().map((option) => (
//                             <SelectItem value={option.serviceName} key={option.serviceName}>
//                               {option.displayName || option.serviceName}
//                             </SelectItem>
//                           ))}
//                           <SelectItem value="__custom__" key="__custom__">
//                             + Create new resource...
//                           </SelectItem>
//                         </SelectContent>
//                       </Select>
//                     )}
                   
//                     {showCustomResourceInput && newRequest.cloud !== 'aws' && (
//                       <div className="flex gap-2 mt-1">
//                         <Input
//                           autoFocus
//                           value={customResourceInput}
//                           onChange={e => setCustomResourceInput(e.target.value)}
//                           placeholder="Enter new resource type"
//                           className="flex-1"
//                         />
//                         <Button
//                           type="button"
//                           onClick={() => {
//                             const val = customResourceInput.trim();
//                             if (val && newRequest.cloud) {
//                               setCustomResources((old) => ({
//                                 ...old,
//                                 [newRequest.cloud]: [
//                                   ...(old[newRequest.cloud] || []),
//                                   val
//                                 ]
//                               }));
//                               handleSelectChange("resourceType", val);
//                               setShowCustomResourceInput(false);
//                               setCustomResourceInput("");
//                             }
//                           }}
//                           disabled={!customResourceInput.trim()}
//                         >
//                           Add
//                         </Button>
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           onClick={() => {
//                             setShowCustomResourceInput(false);
//                             setCustomResourceInput("");
//                           }}
//                         >
//                           Cancel
//                         </Button>
//                       </div>
//                     )}
//                     {formErrors.resourceType && (
//                       <p className="text-sm text-destructive">{formErrors.resourceType}</p>
//                     )}
//                   </div>
                 
//                   {/* Access Level */}
//                   <div className="space-y-2">
//                     <Label htmlFor="accessLevel">Access Level</Label>
//                     <Select
//                       value={newRequest.accessLevel}
//                       onValueChange={(value) => handleSelectChange("accessLevel", value)}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select access level" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="read">Read Only</SelectItem>
//                         <SelectItem value="write">Read/Write</SelectItem>
//                         <SelectItem value="admin">Administrative</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     {formErrors.accessLevel && (
//                       <p className="text-sm text-destructive">{formErrors.accessLevel}</p>
//                     )}
//                   </div>
                 
//                   {/* Manager */}
//                   <div className="space-y-2">
//                     <Label htmlFor="manager">Manager</Label>
//                     <Select
//                       value={newRequest.manager}
//                       onValueChange={(value) => handleSelectChange("manager", value)}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select manager" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {userRoles
//                           .filter((role) => role.id === "manager")
//                           .map((manager) => (
//                             <SelectItem key={manager.credentials.username} value={manager.credentials.username}>
//                               {manager.credentials.username}
//                             </SelectItem>
//                           ))}
//                       </SelectContent>
//                     </Select>
//                     {formErrors.manager && (
//                       <p className="text-sm text-destructive">{formErrors.manager}</p>
//                     )}
//                   </div>
                 
//                   {/* Justification */}
//                   <div className="col-span-2 space-y-2">
//                     <Label htmlFor="justification">Justification</Label>
//                     <Textarea
//                       name="justification"
//                       value={newRequest.justification}
//                       onChange={handleInputChange}
//                       placeholder="Explain the reason for access"
//                     />
//                     {formErrors.justification && (
//                       <p className="text-sm text-destructive">{formErrors.justification}</p>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex justify-end space-x-2">
//                   <Button variant="outline" onClick={() => setIsNewRequestOpen(false)} disabled={isLoading}>
//                     Cancel
//                   </Button>
//                   <Button onClick={handleSubmitRequest} disabled={isLoading} className="bg-primary hover:bg-primary/90">
//                     {isLoading ? (
//                       <>
//                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                         Submitting...
//                       </>
//                     ) : (
//                       'Submit Request'
//                     )}
//                   </Button>
//                 </div>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>
//       </Card>
 
//       {/* Requests Table */}
//       <Card className="p-6">
//         <div className="overflow-x-auto">
//           <table className="table-auto w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Request ID
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Service
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Cloud
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Access Level
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Requested
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredRequests.map((request) => (
//                 <tr key={request.RequestID} className="hover:bg-gray-50">
//                   <td className="px-4 py-4 text-sm text-gray-500 truncate max-w-[120px]">
//                     <div className="font-mono text-xs">
//                       {request.RequestID.substring(0, 8)}...
//                     </div>
//                   </td>
//                   <td className="px-4 py-4 text-sm font-medium text-gray-900">
//                     <div className="flex items-center">
//                       <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
//                       {request.Service}
//                     </div>
//                   </td>
//                   <td className="px-4 py-4 text-sm text-gray-500">
//                     <div className="flex items-center">
//                       <span className="mr-1">{getCloudIcon(request.Cloud)}</span>
//                       {request.Cloud.toUpperCase()}
//                     </div>
//                   </td>
//                   <td className="px-4 py-4 text-sm text-gray-500">
//                     <Badge variant="secondary" className="text-xs">
//                       {request.AccessLevel}
//                     </Badge>
//                   </td>
//                   <td className="px-4 py-4 text-sm text-gray-500">
//                     <div className="flex items-center space-x-2">
//                       {getStatusIcon(request.Status)}
//                       {getStatusBadge(request.Status)}
//                     </div>
//                   </td>
//                   <td className="px-4 py-4 text-sm text-gray-500">
//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 mr-1" />
//                       {formatDate(request.RequestTime)}
//                     </div>
//                   </td>
//                   <td className="px-4 py-4 text-sm text-gray-500">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => handleViewRequest(request)}
//                     >
//                       <Eye className="w-4 h-4 mr-1" />
//                       View
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
 
//         {filteredRequests.length === 0 && (
//           <div className="text-center py-8">
//             <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-500">No requests found matching your criteria.</p>
//             {filterStatus !== 'all' && (
//               <Button
//                 variant="outline"
//                 className="mt-4"
//                 onClick={() => setFilterStatus('all')}
//               >
//                 Show All Requests
//               </Button>
//             )}
//           </div>
//         )}
//       </Card>
 
//       {/* View Request Modal */}
//       {selectedRequest && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
//             <Button
//               variant="ghost"
//               size="sm"
//               className="absolute top-2 right-2"
//               onClick={handleCloseModal}
//             >
//               <X className="w-4 h-4" />
//             </Button>
 
//             <div className="mb-6">
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">Request Details</h2>
//               <div className="flex items-center space-x-2 mb-4">
//                 {getStatusIcon(selectedRequest.Status)}
//                 {getStatusBadge(selectedRequest.Status)}
//               </div>
//             </div>
 
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">Request ID</Label>
//                   <div className="p-2 bg-gray-100 rounded-lg font-mono text-sm">
//                     {selectedRequest.RequestID}
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">Username</Label>
//                   <div className="p-2 bg-gray-100 rounded-lg text-sm flex items-center">
//                     <User className="w-4 h-4 mr-2" />
//                     {selectedRequest.Username}
//                   </div>
//                 </div>
//               </div>
 
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">Cloud Provider</Label>
//                   <div className="p-2 bg-gray-100 rounded-lg text-sm flex items-center">
//                     <span className="mr-2">{getCloudIcon(selectedRequest.Cloud)}</span>
//                     {selectedRequest.Cloud.toUpperCase()}
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">Service</Label>
//                   <div className="p-2 bg-gray-100 rounded-lg text-sm">
//                     {selectedRequest.Service}
//                   </div>
//                 </div>
//               </div>
 
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">Access Level</Label>
//                   <div className="p-2 bg-gray-100 rounded-lg text-sm">
//                     <Badge variant="secondary">{selectedRequest.AccessLevel}</Badge>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">Manager</Label>
//                   <div className="p-2 bg-gray-100 rounded-lg text-sm">
//                     {selectedRequest.Manager}
//                   </div>
//                 </div>
//               </div>
 
//               <div className="space-y-2">
//                 <Label className="text-gray-700 font-medium">Reason</Label>
//                 <div className="p-3 bg-gray-100 rounded-lg text-sm">
//                   {selectedRequest.Reason}
//                 </div>
//               </div>
 
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">Request Time</Label>
//                   <div className="p-2 bg-gray-100 rounded-lg text-sm flex items-center">
//                     <Calendar className="w-4 h-4 mr-2" />
//                     {formatDate(selectedRequest.RequestTime)}
//                   </div>
//                 </div>
//                 {selectedRequest.ApplicationTime && (
//                   <div className="space-y-2">
//                     <Label className="text-gray-700 font-medium">Application Time</Label>
//                     <div className="p-2 bg-gray-100 rounded-lg text-sm flex items-center">
//                       <Calendar className="w-4 h-4 mr-2" />
//                       {formatDate(selectedRequest.ApplicationTime)}
//                     </div>
//                   </div>
//                 )}
//               </div>
 
//               {selectedRequest.PolicyExpiry && (
//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">Policy Expiry</Label>
//                   <div className="p-2 bg-yellow-100 border border-yellow-300 rounded-lg text-sm flex items-center">
//                     <AlertCircle className="w-4 h-4 mr-2 text-yellow-600" />
//                     {formatDate(selectedRequest.PolicyExpiry)}
//                   </div>
//                 </div>
//               )}
 
//               {selectedRequest.Policy && (
//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">Policy Details</Label>
//                   <div className="p-3 bg-gray-100 rounded-lg text-xs font-mono max-h-40 overflow-y-auto">
//                     <pre>{JSON.stringify(selectedRequest.Policy, null, 2)}</pre>
//                   </div>
//                 </div>
//               )}
//             </div>
 
//             <div className="flex justify-end mt-6">
//               <Button onClick={handleCloseModal}>
//                 Close
//               </Button>
//             </div>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// };
 
// export default RequestsPage;




import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Eye,
  X,
  Edit3,
  Loader2,
  Shield,
  AlertCircle,
  Plus,
  ChevronDown
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
 
// AWS Service interface for the pricing API
interface AWSService {
  serviceName: string;
  serviceCode: string;
  displayName?: string;
}
 
// New Request Form interfaces
interface NewRequest {
  cloud: string;
  resourceType: string;
  accessLevel: string;
  manager: string;
  justification: string;
}
 
interface FormErrors {
  cloud?: string;
  resourceType?: string;
  accessLevel?: string;
  manager?: string;
  justification?: string;
}
 
// Custom searchable dropdown component
const SearchableDropdown = ({
  options,
  value,
  onChange,
  placeholder = "Select option...",
  isLoading = false,
  disabled = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
 
  const filteredOptions = options.filter(option =>
    option.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.serviceCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  const selectedOption = options.find(option =>
    option.serviceCode === value || option.serviceName === value
  );
 
  const handleSelect = (option) => {
    onChange(option.serviceCode || option.serviceName);
    setIsOpen(false);
    setSearchTerm('');
  };
 
  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        className={`w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <div className="flex items-center justify-between">
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption ? (selectedOption.displayName || selectedOption.serviceName) : placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
 
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-8"
                autoFocus
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center">
                <Loader2 className="w-4 h-4 animate-spin mx-auto mb-2" />
                <span className="text-sm text-gray-500">Loading services...</span>
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No services found
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <button
                  key={option.serviceCode || option.serviceName || index}
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  onClick={() => handleSelect(option)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">
                      {option.displayName || option.serviceName}
                    </span>
                    {option.serviceCode && option.serviceCode !== option.serviceName && (
                      <span className="text-xs text-gray-500">{option.serviceCode}</span>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
 
const RequestsPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [requests, setRequests] = useState<APIRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<APIRequest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
 
  // New Request Dialog states
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [newRequest, setNewRequest] = useState<NewRequest>({
    cloud: '',
    resourceType: '',
    accessLevel: '',
    manager: '',
    justification: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showCustomResourceInput, setShowCustomResourceInput] = useState(false);
  const [customResourceInput, setCustomResourceInput] = useState('');
  const [customResources, setCustomResources] = useState<{ [key: string]: string[] }>({});
  const [selectedProvider] = useState('all'); // Assuming this comes from props or context
 
  // AWS Services state
  const [awsServices, setAwsServices] = useState<AWSService[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [servicesError, setServicesError] = useState<string | null>(null);
 
  // Static data - you might want to fetch these from API
  const cloudProviders = [
    { id: 'aws', name: 'Amazon Web Services' },
    { id: 'azure', name: 'Microsoft Azure' },
    { id: 'gcp', name: 'Google Cloud Platform' },
  ];
 
  const resourceTypeLabels: { [key: string]: string } = {
    s3: 'S3 Bucket',
    ec2: 'EC2 Instance',
    rds: 'RDS Database',
    vm: 'Virtual Machine',
    storage: 'Storage Account',
    compute: 'Compute Engine',
  };
 
  const baseResourceTypes: { [key: string]: string[] } = {
    aws: ['s3', 'ec2', 'rds'],
    azure: ['vm', 'storage'],
    gcp: ['compute', 'storage'],
  };
 
  const userRoles = [
    { id: 'manager', credentials: { username: 'Muthyam_Harshitha' } },
    { id: 'manager', credentials: { username: 'jane.supervisor' } },
    { id: 'manager', credentials: { username: 'mike.lead' } },
  ];

  // Helper function to capitalize first letter of service name
  const capitalizeService = (service: string) => {
    return service.charAt(0).toUpperCase() + service.slice(1).toLowerCase();
  };
 
  // Fetch AWS services from pricing API
  const fetchAWSServices = async () => {
    setIsLoadingServices(true);
    setServicesError(null);
   
    try {
      const response = await fetch('https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/index.json');
     
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
     
      const data = await response.json();
     
      // Extract services from the offers object
      const services: AWSService[] = [];
      if (data.offers) {
        Object.entries(data.offers).forEach(([serviceCode, serviceData]: [string, any]) => {
          if (serviceData && typeof serviceData === 'object') {
            services.push({
              serviceCode: serviceCode,
              serviceName: serviceData.offerName || serviceCode,
              displayName: serviceData.offerName || serviceCode
            });
          }
        });
      }
     
      // Sort services alphabetically by display name
      services.sort((a, b) => (a.displayName || a.serviceName).localeCompare(b.displayName || b.serviceName));
     
      setAwsServices(services);
    } catch (error) {
      console.error('Error fetching AWS services:', error);
      setServicesError('Failed to load AWS services. Using default options.');
     
      // Fallback to default AWS services if API fails
      setAwsServices([
        { serviceCode: 'AmazonS3', serviceName: 'Amazon Simple Storage Service (S3)', displayName: 'Amazon S3' },
        { serviceCode: 'AmazonEC2', serviceName: 'Amazon Elastic Compute Cloud', displayName: 'Amazon EC2' },
        { serviceCode: 'AmazonRDS', serviceName: 'Amazon Relational Database Service', displayName: 'Amazon RDS' },
        { serviceCode: 'AWSLambda', serviceName: 'AWS Lambda', displayName: 'AWS Lambda' },
        { serviceCode: 'AmazonVPC', serviceName: 'Amazon Virtual Private Cloud', displayName: 'Amazon VPC' }
      ]);
    } finally {
      setIsLoadingServices(false);
    }
  };
 
  // Handle initial filter from navigation state
  useEffect(() => {
    if (location.state?.filterStatus) {
      setFilterStatus(location.state.filterStatus);
    }
  }, [location.state]);
 
  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      setError(null);
      const fullName = localStorage.getItem("fullName");
      const userRole = localStorage.getItem("role");
 
      try {
        const response = await fetch(
          `https://9y40j38nv9.execute-api.ap-south-1.amazonaws.com/list_requests?Username=${fullName}`
        );
 
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch requests');
        }
 
        const data: APIResponse = await response.json();
        if (Array.isArray(data.requests)) {
          const filteredRequests = userRole === "Manager"
            ? data.requests
            : data.requests.filter((req: APIRequest) => req.Username === fullName);
          setRequests(filteredRequests);
        }
      } catch (error: any) {
        console.error("Error fetching requests:", error);
        setError(error.message || 'Error loading requests. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
 
    fetchRequests();
  }, []);
 
  // Load AWS services when cloud provider changes to AWS
  useEffect(() => {
    if (newRequest.cloud === 'aws' && awsServices.length === 0) {
      fetchAWSServices();
    }
  }, [newRequest.cloud]);
 
  // New Request Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRequest(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
 
  const handleSelectChange = (field: keyof NewRequest, value: string) => {
    setNewRequest(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user makes selection
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };
 
  const getResourceOptions = () => {
    if (!newRequest.cloud) return [];
   
    if (newRequest.cloud === 'aws') {
      return awsServices.map(service => ({
        serviceName: service.serviceCode,
        displayName: service.displayName || service.serviceName,
        serviceCode: service.serviceCode
      }));
    }
   
    const baseTypes = baseResourceTypes[newRequest.cloud] || [];
    const customTypes = customResources[newRequest.cloud] || [];
    return [...baseTypes, ...customTypes].map(type => ({
      serviceName: type,
      displayName: resourceTypeLabels[type] || type
    }));
  };
 
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
 
    if (!newRequest.cloud) {
      errors.cloud = 'Cloud provider is required';
    }
    if (!newRequest.resourceType) {
      errors.resourceType = 'Resource type is required';
    }
    if (!newRequest.accessLevel) {
      errors.accessLevel = 'Access level is required';
    }
    if (!newRequest.manager) {
      errors.manager = 'Manager is required';
    }
    if (!newRequest.justification.trim()) {
      errors.justification = 'Justification is required';
    }
 
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
 
 
  const handleSubmitRequest = async () => {
  if (!validateForm()) {
    return;
  }
 
  try {
    setIsLoading(true); // Add loading state for better UX
   
    // Transform the form data to match API expectations
    const requestBody = {
      Username: localStorage.getItem("fullName"),
      Cloud: newRequest.cloud, // maps to your cloud field
      Service: newRequest.resourceType, // maps to your resourceType field
      AccessLevel: newRequest.accessLevel, // maps to your accessLevel field
      Role: localStorage.getItem("role"),
      Manager: newRequest.manager, // maps to your manager field
      Reason: newRequest.justification, // maps to your justification field
    };
 
    console.log('Submitting request:', requestBody);
 
    const response = await fetch(
      'https://lp6t2xn0q4.execute-api.ap-south-1.amazonaws.com/prod/request_access',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers your API might need
          // 'Authorization': 'Bearer ' + token, // if authentication is required
        },
        body: JSON.stringify(requestBody),
      }
    );
 
    if (response.ok) {
      const responseData = await response.json();
      console.log('Request submitted successfully:', responseData);
     
      // Show success message (you might want to add a toast notification)
      alert('Request submitted successfully!');
     
      // Reset form
      setNewRequest({
        cloud: '',
        resourceType: '',
        accessLevel: '',
        manager: '',
        justification: '',
      });
      setFormErrors({});
      setIsNewRequestOpen(false);
     
      // Refresh the requests list
      window.location.reload();
    } else {
      // Handle HTTP errors
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.message || `HTTP ${response.status}: ${response.statusText}`;
      console.error('Failed to submit request:', errorMessage);
      alert(`Failed to submit request: ${errorMessage}`);
    }
  } catch (error) {
    console.error('Error submitting request:', error);
    alert(`Error submitting request: ${error.message}`);
  } finally {
    setIsLoading(false);
  }
};
 
  const getFilteredRequests = (): APIRequest[] => {
    let filtered = requests;
 
    if (searchTerm) {
      filtered = filtered.filter(
        (request) =>
          request.Service.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.Reason.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
 
    if (filterStatus !== 'all') {
      filtered = filtered.filter((request) => request.Status === filterStatus);
    }
 
    filtered.sort((a, b) => {
      return new Date(b.RequestTime).getTime() - new Date(a.RequestTime).getTime();
    });
 
    return filtered;
  };
 
  const filteredRequests = getFilteredRequests();
 
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'applied':
        return <Shield className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-orange-500" />;
    }
  };
 
  const getStatusBadge = (status: string) => {
    const statusConfig: {
      [key: string]: { color: string; label: string };
    } = {
      approved: { color: 'text-blue-600 border-blue-600 bg-blue-50', label: 'Approved' },
      applied: { color: 'text-green-600 border-green-600 bg-green-50', label: 'Applied' },
      rejected: { color: 'text-red-600 border-red-600 bg-red-50', label: 'Rejected' },
      pending: { color: 'text-orange-600 border-orange-600 bg-orange-50', label: 'Pending' },
    };
 
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Badge variant="outline" className={`text-xs ${config.color}`}>
        {config.label}
      </Badge>
    );
  };
 
  const getCloudIcon = (cloud: string) => {
    const cloudIcons: { [key: string]: string } = {
      aws: '🚀',
      azure: '☁️',
      gcp: '🔵'
    };
    return cloudIcons[cloud.toLowerCase()] || '☁️';
  };
 
  const handleViewRequest = (request: APIRequest) => {
    setSelectedRequest(request);
  };
 
  const handleCloseModal = () => {
    setSelectedRequest(null);
  };
 
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
 
  const getFilterStatusDisplayName = (status: string) => {
    const statusNames: { [key: string]: string } = {
      'all': 'All Requests',
      'applied': 'Applied Services',
      'approved': 'Approved Requests',
      'pending': 'Pending Approvals',
      'rejected': 'Rejected Requests'
    };
    return statusNames[status] || 'All Requests';
  };
 
  if (isLoading && !requests.length) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading request history...</p>
        </div>
      </div>
    );
  }
 
  if (error && !requests.length) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Error Loading Requests</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }
 
  return (
    <div className="space-y-6">
           
      {/* Simplified Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by service, username, or reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
            >
              <option value="all">All Status</option>
              <option value="applied">Applied</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
 
            {/* New Request Dialog */}
            <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  New Request
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>New Access Request</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to request access to a cloud resource.
                  </DialogDescription>
                </DialogHeader>
                {error && (
                  <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-4">
                    {error}
                  </div>
                )}
                {servicesError && (
                  <div className="p-3 bg-yellow-100 text-yellow-700 rounded-lg mb-4 text-sm">
                    <AlertCircle className="w-4 h-4 inline mr-2" />
                    {servicesError}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 py-4">
                  {/* Cloud Provider */}
                  <div className="space-y-2">
                    <Label htmlFor="cloud">Cloud Provider</Label>
                    <Select
                      value={newRequest.cloud}
                      onValueChange={(value) => {
                        handleSelectChange("cloud", value);
                        // Reset resource type when cloud provider changes
                        handleSelectChange("resourceType", "");
                      }}
                      disabled={selectedProvider !== "all"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {cloudProviders.map((provider) => (
                          <SelectItem key={provider.id} value={provider.id}>
                            {provider.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formErrors.cloud && (
                      <p className="text-sm text-destructive">{formErrors.cloud}</p>
                    )}
                  </div>
                 
                  {/* Resource Type */}
                  <div className="space-y-2">
                    <Label htmlFor="resourceType">Resource Type</Label>
                    {newRequest.cloud === 'aws' ? (
                      // Use custom searchable dropdown for AWS
                      <div>
                        <SearchableDropdown
                          options={getResourceOptions()}
                          value={newRequest.resourceType}
                          onChange={(value) => handleSelectChange("resourceType", value)}
                          placeholder="Search and select AWS service..."
                          isLoading={isLoadingServices}
                          disabled={!newRequest.cloud}
                        />
                      </div>
                    ) : (
                      // Use regular select for other cloud providers
                      <Select
                        value={showCustomResourceInput ? "__custom__" : newRequest.resourceType}
                        onValueChange={(val) => {
                          if (val === "__custom__") {
                            setShowCustomResourceInput(true);
                          } else {
                            setShowCustomResourceInput(false);
                            handleSelectChange("resourceType", val);
                          }
                        }}
                        disabled={!newRequest.cloud}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select resource type" />
                        </SelectTrigger>
                        <SelectContent>
                          {getResourceOptions().map((option) => (
                            <SelectItem value={option.serviceName} key={option.serviceName}>
                              {option.displayName || option.serviceName}
                            </SelectItem>
                          ))}
                          <SelectItem value="__custom__" key="__custom__">
                            + Create new resource...
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                   
                    {showCustomResourceInput && newRequest.cloud !== 'aws' && (
                      <div className="flex gap-2 mt-1">
                        <Input
                          autoFocus
                          value={customResourceInput}
                          onChange={e => setCustomResourceInput(e.target.value)}
                          placeholder="Enter new resource type"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            const val = customResourceInput.trim();
                            if (val && newRequest.cloud) {
                              setCustomResources((old) => ({
                                ...old,
                                [newRequest.cloud]: [
                                  ...(old[newRequest.cloud] || []),
                                  val
                                ]
                              }));
                              handleSelectChange("resourceType", val);
                              setShowCustomResourceInput(false);
                              setCustomResourceInput("");
                            }
                          }}
                          disabled={!customResourceInput.trim()}
                        >
                          Add
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => {
                            setShowCustomResourceInput(false);
                            setCustomResourceInput("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                    {formErrors.resourceType && (
                      <p className="text-sm text-destructive">{formErrors.resourceType}</p>
                    )}
                  </div>
                 
                  {/* Access Level */}
                  <div className="space-y-2">
                    <Label htmlFor="accessLevel">Access Level</Label>
                    <Select
                      value={newRequest.accessLevel}
                      onValueChange={(value) => handleSelectChange("accessLevel", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select access level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="read">Read Only</SelectItem>
                        <SelectItem value="write">Read/Write</SelectItem>
                        <SelectItem value="admin">Administrative</SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.accessLevel && (
                      <p className="text-sm text-destructive">{formErrors.accessLevel}</p>
                    )}
                  </div>
                 
                  {/* Manager */}
                  <div className="space-y-2">
                    <Label htmlFor="manager">Manager</Label>
                    <Select
                      value={newRequest.manager}
                      onValueChange={(value) => handleSelectChange("manager", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select manager" />
                      </SelectTrigger>
                      <SelectContent>
                        {userRoles
                          .filter((role) => role.id === "manager")
                          .map((manager) => (
                            <SelectItem key={manager.credentials.username} value={manager.credentials.username}>
                              {manager.credentials.username}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    {formErrors.manager && (
                      <p className="text-sm text-destructive">{formErrors.manager}</p>
                    )}
                  </div>
                 
                  {/* Justification */}
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="justification">Justification</Label>
                    <Textarea
                      name="justification"
                      value={newRequest.justification}
                      onChange={handleInputChange}
                      placeholder="Explain the reason for access"
                    />
                    {formErrors.justification && (
                      <p className="text-sm text-destructive">{formErrors.justification}</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsNewRequestOpen(false)} disabled={isLoading}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitRequest} disabled={isLoading} className="bg-primary hover:bg-primary/90">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>
 
      {/* Requests Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="table-auto w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cloud
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Access Level
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requested
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.RequestID} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                    <div className="flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      {capitalizeService(request.Service)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    <div className="flex items-center justify-center">
                      <span className="mr-1">{getCloudIcon(request.Cloud)}</span>
                      {request.Cloud.toUpperCase()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    <Badge variant="secondary" className="text-xs">
                      {request.AccessLevel}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    <div className="flex items-center justify-center space-x-2">
                      {getStatusIcon(request.Status)}
                      {getStatusBadge(request.Status)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    <div className="flex items-center justify-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(request.RequestTime)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewRequest(request)}
                      className="hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
 
        {filteredRequests.length === 0 && (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No requests found matching your criteria.</p>
            {filterStatus !== 'all' && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setFilterStatus('all')}
              >
                Show All Requests
              </Button>
            )}
          </div>
        )}
      </Card>
 
      {/* View Request Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleCloseModal}
            >
              <X className="w-4 h-4" />
            </Button>
 
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Service Request Details</h2>
              <div className="flex items-center space-x-2 mb-4">
                {getStatusIcon(selectedRequest.Status)}
                {getStatusBadge(selectedRequest.Status)}
              </div>
            </div>
 
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Username</Label>
                  <div className="p-2 bg-gray-100 rounded-lg text-sm flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {selectedRequest.Username}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Cloud Provider</Label>
                  <div className="p-2 bg-gray-100 rounded-lg text-sm flex items-center">
                    <span className="mr-2">{getCloudIcon(selectedRequest.Cloud)}</span>
                    {selectedRequest.Cloud.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Service</Label>
                  <div className="p-2 bg-gray-100 rounded-lg text-sm font-medium">
                    {capitalizeService(selectedRequest.Service)}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Access Level</Label>
                  <div className="p-2 bg-gray-100 rounded-lg text-sm">
                    <Badge variant="secondary">{selectedRequest.AccessLevel}</Badge>
                  </div>
                </div>
              </div>
 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Manager</Label>
                  <div className="p-2 bg-gray-100 rounded-lg text-sm">
                    {selectedRequest.Manager}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Request Time</Label>
                  <div className="p-2 bg-gray-100 rounded-lg text-sm flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(selectedRequest.RequestTime)}
                  </div>
                </div>
              </div>
 
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Reason for Request</Label>
                <div className="p-3 bg-gray-100 rounded-lg text-sm text-gray-700">
                  {selectedRequest.Reason}
                </div>
              </div>
             
              {selectedRequest.ApplicationTime && (
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Application Time</Label>
                  <div className="p-2 bg-gray-100 rounded-lg text-sm flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(selectedRequest.ApplicationTime)}
                  </div>
                </div>
              )}
             
              {selectedRequest.PolicyExpiry && (
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Policy Expiry</Label>
                  <div className="p-2 bg-yellow-100 border border-yellow-300 rounded-lg text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 text-yellow-600" />
                    {formatDate(selectedRequest.PolicyExpiry)}
                  </div>
                </div>
              )}
             
              {selectedRequest.Policy && (
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Policy Details</Label>
                  <div className="p-3 bg-gray-100 rounded-lg text-xs font-mono max-h-40 overflow-y-auto border">
                    <pre>{JSON.stringify(selectedRequest.Policy, null, 2)}</pre>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 p-3 rounded-lg">
                <Label className="text-blue-700 font-medium">Request ID</Label>
                <div className="font-mono text-xs text-blue-600 break-all mt-1">
                  {selectedRequest.RequestID}
                </div>
              </div>
            </div>
 
            <div className="flex justify-end mt-6">
              <Button onClick={handleCloseModal}>
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
 
export default RequestsPage;