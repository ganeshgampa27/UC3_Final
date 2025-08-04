<<<<<<< HEAD
import React, { useState } from "react";
=======
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




import React, { useState, useEffect } from "react";
>>>>>>> 93756b3 (request quickaction)
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Plus,
  Search,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { recentRequests, cloudProviders, userRoles } from "../mock/data";

// Interfaces
interface RecentRequest {
  id: string;
  title: string;
  user: string;
  requester: string;
  service: string;
<<<<<<< HEAD
  cloud: string; // Changed from provider to cloud
=======
  cloud: string;
>>>>>>> 93756b3 (request quickaction)
  accesslevel: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  createdAt: string;
  estimatedCost: number;
  description: string;
  rejectionReason?: string;
}

interface CloudProvider {
  id: string;
  name: string;
  status: string;
  resources: number;
  cost: number;
  region: string;
  services: string[];
}

interface User {
  id: string;
  name: string;
  username: string;
  permissions: string[];
}

interface RequestsPageProps {
  currentUser: User;
  selectedProvider: string;
}

<<<<<<< HEAD
const RequestsPage: React.FC<RequestsPageProps> = ({ currentUser, selectedProvider }) => {
=======
const RequestsPage: React.FC<RequestsPageProps> = ({ 
  currentUser, 
  selectedProvider
}) => {
>>>>>>> 93756b3 (request quickaction)
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewingRequest, setViewingRequest] = useState<RecentRequest | null>(null);
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
<<<<<<< HEAD
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    cloud: selectedProvider !== "all" ? selectedProvider : "", // Changed from provider to cloud
=======
  


// For dynamic custom resource types per cloud
const [customResources, setCustomResources] = useState<{ [cloudId: string]: string[] }>({});
const [showCustomResourceInput, setShowCustomResourceInput] = useState(false);
const [customResourceInput, setCustomResourceInput] = useState("");

// Optional: for better display labels
const resourceTypeLabels: { [key: string]: string } = {
  ec2: "EC2 Instance",
  s3: "S3 Bucket",
  rds: "RDS Database",
  lambda: "Lambda Function",
  storage: "Cloud Storage",
  compute: "Compute Instance"
};

const getResourceOptions = () => {
  if (!newRequest.cloud) return [];
  const cloudObj = cloudProviders.find(p => p.id === newRequest.cloud);
  // Built-in types
  const base = cloudObj?.services || [];
  // Plus any added by user for this cloud
  const extras = customResources[newRequest.cloud] || [];
  // Remove duplicates
  return [...base, ...extras.filter(r => !base.includes(r))];
};






  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    cloud: selectedProvider !== "all" ? selectedProvider : "",
>>>>>>> 93756b3 (request quickaction)
    resourceType: "",
    justification: "",
    estimatedCost: "",
    accessLevel: "",
    manager: "",
  });
  const [formErrors, setFormErrors] = useState({
    title: "",
<<<<<<< HEAD
    cloud: "", // Changed from provider to cloud
=======
    cloud: "",
>>>>>>> 93756b3 (request quickaction)
    description: "",
    resourceType: "",
    justification: "",
    estimatedCost: "",
    accessLevel: "",
    manager: "",
  });

<<<<<<< HEAD
=======
  // Add event listener for the custom event from OverviewPage
  useEffect(() => {
    const handleOpenDialog = () => {
      setIsNewRequestOpen(true);
    };

    window.addEventListener('openNewRequestDialog', handleOpenDialog);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('openNewRequestDialog', handleOpenDialog);
    };
  }, []);

>>>>>>> 93756b3 (request quickaction)
  const filteredRequests = recentRequests.filter((request) => {
    const matchesSearch =
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.cloud.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.accesslevel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status.toLowerCase() === statusFilter.toLowerCase();
<<<<<<< HEAD
    const matchesProvider = selectedProvider === "all" || request.cloud === selectedProvider; // Changed from provider to cloud
    // Removed matchesUser since requester is empty in the data
=======
    const matchesProvider = selectedProvider === "all" || request.cloud === selectedProvider;
>>>>>>> 93756b3 (request quickaction)
    return matchesSearch && matchesStatus && matchesProvider;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "border-green-500 text-green-600";
      case "rejected":
        return "border-red-500 text-red-600";
      case "pending":
        return "border-yellow-500 text-yellow-600";
      default:
        return "border-gray-500 text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRequest((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

<<<<<<< HEAD
  const handleSelectChange = (name: string, value: string) => {
    setNewRequest((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };
=======
 const handleSelectChange = (name: string, value: string) => {
  setNewRequest((prev) => ({
    ...prev,
    [name]: value,
    ...(name === "cloud" ? { resourceType: "" } : {})
  }));
  setFormErrors((prev) => ({ ...prev, [name]: "" }));
  if (name === "cloud") {
    setShowCustomResourceInput(false);
    setCustomResourceInput("");
  }
};

>>>>>>> 93756b3 (request quickaction)

  const validateForm = () => {
    let isValid = true;
    const errors = {
      title: "",
<<<<<<< HEAD
      cloud: "", // Changed from provider to cloud
=======
      cloud: "",
>>>>>>> 93756b3 (request quickaction)
      description: "",
      resourceType: "",
      justification: "",
      estimatedCost: "",
      accessLevel: "",
      manager: "",
    };

    if (!newRequest.cloud) {
      errors.cloud = "Cloud provider is required";
      isValid = false;
    }
    if (!newRequest.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }
    if (!newRequest.resourceType) {
      errors.resourceType = "Resource type is required";
      isValid = false;
    }
    if (!newRequest.justification.trim()) {
      errors.justification = "Justification is required";
      isValid = false;
    }
    if (!newRequest.estimatedCost || isNaN(Number(newRequest.estimatedCost))) {
      errors.estimatedCost = "Valid estimated cost is required";
      isValid = false;
    }
    if (!newRequest.accessLevel) {
      errors.accessLevel = "Access level is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmitRequest = () => {
    if (validateForm()) {
      console.log("Submitting request:", {
        id: `REQ-${Math.random().toString(36).substr(2, 9)}`,
        title: newRequest.title,
        user: currentUser.name,
        requester: currentUser.username,
        service: newRequest.resourceType,
<<<<<<< HEAD
        cloud: newRequest.cloud, // Changed from provider to cloud
        accesslevel: newRequest.accessLevel, // Added accesslevel
=======
        cloud: newRequest.cloud,
        accesslevel: newRequest.accessLevel,
>>>>>>> 93756b3 (request quickaction)
        status: "pending",
        requestDate: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        estimatedCost: Number(newRequest.estimatedCost),
        description: newRequest.description,
        rejectionReason: undefined,
      });
      setIsNewRequestOpen(false);
      setNewRequest({
        title: "",
        description: "",
        cloud: selectedProvider !== "all" ? selectedProvider : "",
        resourceType: "",
        justification: "",
        estimatedCost: "",
        accessLevel: "",
        manager: "",
      });
      setFormErrors({
        title: "",
        cloud: "",
        description: "",
        resourceType: "",
        justification: "",
        estimatedCost: "",
        accessLevel: "",
        manager: "",
      });
    }
  };

  const handleRequestAction = (requestId: string, action: string) => {
    console.log(`${action} request ${requestId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {currentUser.id === "user" ? "My Requests" : "Service Requests"}
          </h1>
          <p className="text-muted-foreground">
            {currentUser.id === "user"
              ? "Track your resource requests and access approvals"
              : "Manage and approve team resource requests"}
          </p>
        </div>
        {currentUser.permissions.includes("request_access") && (
<<<<<<< HEAD
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
                <p className="text-sm text-muted-foreground">
                  Fill in the details below to request access to a cloud resource.
                </p>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="cloud">Cloud Provider</Label>
                  <Select
                    value={newRequest.cloud}
                    onValueChange={(value) => handleSelectChange("cloud", value)}
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
                <div className="space-y-2">
                  <Label htmlFor="resourceType">Resource Type</Label>
                  <Select
                    value={newRequest.resourceType}
                    onValueChange={(value) => handleSelectChange("resourceType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select resource type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ec2">EC2 Instance</SelectItem>
                      <SelectItem value="s3">S3 Bucket</SelectItem>
                      <SelectItem value="rds">RDS Database</SelectItem>
                      <SelectItem value="lambda">Lambda Function</SelectItem>
                      <SelectItem value="storage">Cloud Storage</SelectItem>
                      <SelectItem value="compute">Compute Instance</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.resourceType && (
                    <p className="text-sm text-destructive">{formErrors.resourceType}</p>
                  )}
                </div>
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
                          <SelectItem key={manager.id} value={manager.credentials.username}>
                            {manager.credentials.username}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {formErrors.manager && (
                    <p className="text-sm text-destructive">{formErrors.manager}</p>
                  )}
                </div>
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
                <Button variant="outline" onClick={() => setIsNewRequestOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitRequest} className="bg-primary hover:bg-primary/90">
                  Submit Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
=======
          // <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
          //   <DialogTrigger asChild>
          //     <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
          //       <Plus className="w-4 h-4 mr-2" />
          //       New Request
          //     </Button>
          //   </DialogTrigger>
          //   <DialogContent className="sm:max-w-[420px] max-h-[85vh] overflow-y-auto">
          //     <DialogHeader className="pb-3">
          //       <DialogTitle className="text-lg">New Access Request</DialogTitle>
          //       <p className="text-xs text-muted-foreground">
          //         Request access to cloud resources
          //       </p>
          //     </DialogHeader>
          //     <div className="space-y-3">
          //       {/* Cloud Provider */}
          //       <div className="space-y-1">
          //         <Label htmlFor="cloud" className="text-xs font-medium">Cloud Provider *</Label>
          //         <Select
          //           value={newRequest.cloud}
          //           onValueChange={(value) => handleSelectChange("cloud", value)}
          //           disabled={selectedProvider !== "all"}
          //         >
          //           <SelectTrigger className="h-8 text-sm">
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
          //           <p className="text-xs text-destructive">{formErrors.cloud}</p>
          //         )}
          //       </div>

          //       {/* Resource Type */}
          //       <div className="space-y-1">
          //         <Label htmlFor="resourceType" className="text-xs font-medium">Resource Type *</Label>
          //         <Select
          //           value={newRequest.resourceType}
          //           onValueChange={(value) => handleSelectChange("resourceType", value)}
          //         >
          //           <SelectTrigger className="h-8 text-sm">
          //             <SelectValue placeholder="Select resource type" />
          //           </SelectTrigger>
          //           <SelectContent>
          //             <SelectItem value="ec2">EC2 Instance</SelectItem>
          //             <SelectItem value="s3">S3 Bucket</SelectItem>
          //             <SelectItem value="rds">RDS Database</SelectItem>
          //             <SelectItem value="lambda">Lambda Function</SelectItem>
          //             <SelectItem value="storage">Cloud Storage</SelectItem>
          //             <SelectItem value="compute">Compute Instance</SelectItem>
          //           </SelectContent>
          //         </Select>
          //         {formErrors.resourceType && (
          //           <p className="text-xs text-destructive">{formErrors.resourceType}</p>
          //         )}
          //       </div>

          //       {/* Access Level & Cost (Side by side) */}
          //       <div className="grid grid-cols-2 gap-3">
          //         <div className="space-y-1">
          //           <Label htmlFor="accessLevel" className="text-xs font-medium">Access Level *</Label>
          //           <Select
          //             value={newRequest.accessLevel}
          //             onValueChange={(value) => handleSelectChange("accessLevel", value)}
          //           >
          //             <SelectTrigger className="h-8 text-sm">
          //               <SelectValue placeholder="Select access" />
          //             </SelectTrigger>
          //             <SelectContent>
          //               <SelectItem value="read">Read Only</SelectItem>
          //               <SelectItem value="write">Read/Write</SelectItem>
          //               <SelectItem value="admin">Administrative</SelectItem>
          //             </SelectContent>
          //           </Select>
          //           {formErrors.accessLevel && (
          //             <p className="text-xs text-destructive">{formErrors.accessLevel}</p>
          //           )}
          //         </div>
          //         <div className="space-y-1">
          //           <Label htmlFor="estimatedCost" className="text-xs font-medium">Cost ($) *</Label>
          //           <Input
          //             name="estimatedCost"
          //             type="number"
          //             value={newRequest.estimatedCost}
          //             onChange={handleInputChange}
          //             placeholder="Cost"
          //             className="h-8 text-sm"
          //           />
          //           {formErrors.estimatedCost && (
          //             <p className="text-xs text-destructive">{formErrors.estimatedCost}</p>
          //           )}
          //         </div>
          //       </div>

          //       {/* Description */}
          //       <div className="space-y-1">
          //         <Label htmlFor="description" className="text-xs font-medium">Description *</Label>
          //         <Textarea
          //           name="description"
          //           value={newRequest.description}
          //           onChange={handleInputChange}
          //           placeholder="Brief description of the resource needed"
          //           className="text-sm min-h-[60px] resize-none"
          //         />
          //         {formErrors.description && (
          //           <p className="text-xs text-destructive">{formErrors.description}</p>
          //         )}
          //       </div>

          //       {/* Justification */}
          //       <div className="space-y-1">
          //         <Label htmlFor="justification" className="text-xs font-medium">Business Justification *</Label>
          //         <Textarea
          //           name="justification"
          //           value={newRequest.justification}
          //           onChange={handleInputChange}
          //           placeholder="Explain why this access is needed"
          //           className="text-sm min-h-[60px] resize-none"
          //         />
          //         {formErrors.justification && (
          //           <p className="text-xs text-destructive">{formErrors.justification}</p>
          //         )}
          //       </div>
          //     </div>
              
          //     <div className="flex justify-end space-x-2 pt-4 border-t">
          //       <Button 
          //         variant="outline" 
          //         size="sm" 
          //         onClick={() => setIsNewRequestOpen(false)}
          //         className="text-sm"
          //       >
          //         Cancel
          //       </Button>
          //       <Button 
          //         onClick={handleSubmitRequest} 
          //         size="sm"
          //         className="bg-primary hover:bg-primary/90 text-sm"
          //       >
          //         Submit Request
          //       </Button>
          //     </div>
          //   </DialogContent>
          // </Dialog>
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
      <p className="text-sm text-muted-foreground">
        Fill in the details below to request access to a cloud resource.
      </p>
    </DialogHeader>
    <div className="grid grid-cols-2 gap-4 py-4">
      {/* Cloud Provider */}
      <div className="space-y-2">
        <Label htmlFor="cloud">Cloud Provider</Label>
        <Select
          value={newRequest.cloud}
          onValueChange={(value) => handleSelectChange("cloud", value)}
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
            {getResourceOptions().map((type) => (
              <SelectItem value={type} key={type}>
                {resourceTypeLabels[type] || type}
              </SelectItem>
            ))}
            <SelectItem value="__custom__" key="__custom__">
              + Create new resource...
            </SelectItem>
          </SelectContent>
        </Select>
        {/* Inline input for custom resource */}
        {showCustomResourceInput && (
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
                <SelectItem key={manager.id} value={manager.credentials.username}>
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
      <Button variant="outline" onClick={() => setIsNewRequestOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleSubmitRequest} className="bg-primary hover:bg-primary/90">
        Submit Request
      </Button>
    </div>
  </DialogContent>
</Dialog>



>>>>>>> 93756b3 (request quickaction)
        )}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID, cloud, service, or access level..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-40">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Request Table */}
      <Card>
        <Card className="p-4 max-h-[500px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Cloud</TableHead>
                <TableHead>Resource Type</TableHead>
                <TableHead>Access Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No results found
                  </TableCell>
                </TableRow>
              ) : (
                filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.cloud}</TableCell>
                    <TableCell>{request.service}</TableCell>
                    <TableCell>{request.accesslevel}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(request.status)}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1">{request.status.toUpperCase()}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>{request.requestDate}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setViewingRequest(request)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      {(currentUser.permissions.includes("approve_requests") ||
                        currentUser.permissions.includes("full_access")) &&
                        request.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRequestAction(request.id, "Reject")}
                              className="ml-2"
                            >
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleRequestAction(request.id, "Approve")}
                              className="ml-2 bg-green-600 hover:bg-green-700"
                            >
                              Approve
                            </Button>
                          </>
                        )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </Card>

      {/* Request Details Dialog */}
      <Dialog open={!!viewingRequest} onOpenChange={() => setViewingRequest(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
          </DialogHeader>
          {viewingRequest && (
            <div className="space-y-2 text-sm">
              <p><strong>Request ID:</strong> {viewingRequest.id}</p>
              <p><strong>Username:</strong> {viewingRequest.requester || 'N/A'}</p>
              <p><strong>User:</strong> {viewingRequest.user || 'N/A'}</p>
              <p><strong>Cloud:</strong> {viewingRequest.cloud.toUpperCase()}</p>
              <p><strong>Title:</strong> {viewingRequest.title || 'N/A'}</p>
              <p><strong>Resource Type:</strong> {viewingRequest.service}</p>
              <p><strong>Access Level:</strong> {viewingRequest.accesslevel}</p>
              <p><strong>Description:</strong> {viewingRequest.description}</p>
              <p><strong>Status:</strong> {viewingRequest.status.toUpperCase()}</p>
              <p><strong>Rejection Reason:</strong> {viewingRequest.rejectionReason || 'N/A'}</p>
              <p><strong>Estimated Cost:</strong> ${viewingRequest.estimatedCost.toLocaleString()}</p>
              <p><strong>Request Time:</strong> {viewingRequest.createdAt ? new Date(viewingRequest.createdAt).toLocaleString() : 'N/A'}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RequestsPage;