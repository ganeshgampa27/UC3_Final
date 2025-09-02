// import React, { useState, useEffect, useMemo } from 'react';
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
//   ChevronDown,
//   Check
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

// // AWS Service Interface
// interface AWSService {
//   serviceName: string;
//   serviceCode: string;
// }

// // Custom Searchable Dropdown Component
// const SearchableDropdown = ({ 
//   options, 
//   value, 
//   onSelect, 
//   placeholder, 
//   isLoading = false,
//   className = ""
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
  
//   const filteredOptions = useMemo(() => {
//     if (!searchTerm) return options;
//     return options.filter(option => 
//       option.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       option.serviceCode.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [options, searchTerm]);

//   const selectedOption = options.find(opt => opt.serviceCode === value);

//   return (
//     <div className={`relative ${className}`}>
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full flex items-center justify-between px-3 py-2 text-sm border border-input rounded-md bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//       >
//         <span className={selectedOption ? "text-foreground" : "text-muted-foreground"}>
//           {selectedOption ? selectedOption.serviceName : placeholder}
//         </span>
//         <ChevronDown className="h-4 w-4 opacity-50" />
//       </button>
      
//       {isOpen && (
//         <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg">
//           <div className="p-2 border-b border-border">
//             <div className="relative">
//               <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search services..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-8 h-8"
//                 autoFocus
//               />
//             </div>
//           </div>
//           <div className="max-h-48 overflow-y-auto">
//             {isLoading ? (
//               <div className="flex items-center justify-center py-4">
//                 <Loader2 className="h-4 w-4 animate-spin" />
//                 <span className="ml-2 text-sm text-muted-foreground">Loading services...</span>
//               </div>
//             ) : filteredOptions.length > 0 ? (
//               filteredOptions.map((option) => (
//                 <button
//                   key={option.serviceCode}
//                   type="button"
//                   onClick={() => {
//                     onSelect(option.serviceCode, option.serviceName);
//                     setIsOpen(false);
//                     setSearchTerm('');
//                   }}
//                   className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground flex items-center justify-between"
//                 >
//                   <div>
//                     <div className="font-medium">{option.serviceName}</div>
//                     <div className="text-xs text-muted-foreground">{option.serviceCode}</div>
//                   </div>
//                   {value === option.serviceCode && <Check className="h-4 w-4" />}
//                 </button>
//               ))
//             ) : (
//               <div className="px-3 py-2 text-sm text-muted-foreground text-center">
//                 No services found
//               </div>
//             )}
//           </div>
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
//   const [showAWSServicesDropdown, setShowAWSServicesDropdown] = useState(false);
//   const [awsServices, setAwsServices] = useState<AWSService[]>([]);
//   const [isLoadingAWSServices, setIsLoadingAWSServices] = useState(false);
//   const [customResources, setCustomResources] = useState<{ [key: string]: string[] }>({});
//   const [selectedProvider] = useState('all');

//   // Static data
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

//   // Fetch AWS services from API
//   const fetchAWSServices = async () => {
//     setIsLoadingAWSServices(true);
//     try {
//       const response = await fetch('https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/index.json');
//       if (!response.ok) {
//         throw new Error('Failed to fetch AWS services');
//       }
      
//       const data = await response.json();
//       console.log('AWS Services API response:', data);
//       const services: AWSService[] = [];
      
//       // Try multiple possible response structures
//       if (data.offers) {
//         // Structure 1: Direct offers object
//         Object.entries(data.offers).forEach(([serviceCode, serviceData]: [string, any]) => {
//           if (serviceData && typeof serviceData === 'object') {
//             let serviceName = serviceCode;
            
//             // Try different possible field names for service name
//             if (serviceData.serviceName) {
//               serviceName = serviceData.serviceName;
//             } else if (serviceData.name) {
//               serviceName = serviceData.name;
//             } else if (serviceData.displayName) {
//               serviceName = serviceData.displayName;
//             } else if (serviceData.description) {
//               serviceName = serviceData.description;
//             }
            
//             services.push({
//               serviceCode: serviceCode,
//               serviceName: serviceName
//             });
//           }
//         });
//       } else if (data.services) {
//         // Structure 2: Services array
//         data.services.forEach((service: any) => {
//           if (service && service.serviceCode) {
//             services.push({
//               serviceCode: service.serviceCode,
//               serviceName: service.serviceName || service.name || service.serviceCode
//             });
//           }
//         });
//       } else if (data.metadata && data.metadata.offers) {
//         // Structure 3: Nested in metadata
//         Object.entries(data.metadata.offers).forEach(([serviceCode, serviceData]: [string, any]) => {
//           if (serviceData && typeof serviceData === 'object') {
//             services.push({
//               serviceCode: serviceCode,
//               serviceName: serviceData.serviceName || serviceData.name || serviceCode
//             });
//           }
//         });
//       }
      
//       // If we still don't have services, try to extract from any object keys
//       if (services.length === 0 && typeof data === 'object') {
//         Object.keys(data).forEach(key => {
//           if (typeof data[key] === 'object' && data[key] !== null) {
//             Object.entries(data[key]).forEach(([serviceCode, serviceData]: [string, any]) => {
//               if (typeof serviceData === 'object' && serviceData !== null) {
//                 services.push({
//                   serviceCode: serviceCode,
//                   serviceName: serviceData.serviceName || serviceData.name || serviceCode
//                 });
//               }
//             });
//           }
//         });
//       }
      
//       // Remove duplicates and sort
//       const uniqueServices = services.filter((service, index, self) => 
//         index === self.findIndex(s => s.serviceCode === service.serviceCode)
//       );
      
//       uniqueServices.sort((a, b) => a.serviceName.localeCompare(b.serviceName));
      
//       console.log('Parsed services:', uniqueServices);
//       setAwsServices(uniqueServices);
      
//       // If still no services found, use fallback
//       if (uniqueServices.length === 0) {
//         throw new Error('No services found in API response');
//       }
      
//     } catch (error) {
//       console.error('Error fetching AWS services:', error);
//       // Fallback to comprehensive list of common AWS services
//       setAwsServices([
//         { serviceCode: 'AmazonS3', serviceName: 'Amazon Simple Storage Service (S3)' },
//         { serviceCode: 'AmazonEC2', serviceName: 'Amazon Elastic Compute Cloud (EC2)' },
//         { serviceCode: 'AmazonRDS', serviceName: 'Amazon Relational Database Service (RDS)' },
//         { serviceCode: 'AWSLambda', serviceName: 'AWS Lambda' },
//         { serviceCode: 'AmazonVPC', serviceName: 'Amazon Virtual Private Cloud (VPC)' },
//         { serviceCode: 'AmazonCloudFront', serviceName: 'Amazon CloudFront' },
//         { serviceCode: 'AmazonRoute53', serviceName: 'Amazon Route 53' },
//         { serviceCode: 'AmazonDynamoDB', serviceName: 'Amazon DynamoDB' },
//         { serviceCode: 'AmazonSNS', serviceName: 'Amazon Simple Notification Service (SNS)' },
//         { serviceCode: 'AmazonSQS', serviceName: 'Amazon Simple Queue Service (SQS)' },
//         { serviceCode: 'AmazonEKS', serviceName: 'Amazon Elastic Kubernetes Service (EKS)' },
//         { serviceCode: 'AmazonECS', serviceName: 'Amazon Elastic Container Service (ECS)' },
//         { serviceCode: 'AWSCloudFormation', serviceName: 'AWS CloudFormation' },
//         { serviceCode: 'AmazonCloudWatch', serviceName: 'Amazon CloudWatch' },
//         { serviceCode: 'AWSIAM', serviceName: 'AWS Identity and Access Management (IAM)' },
//         { serviceCode: 'AmazonKinesis', serviceName: 'Amazon Kinesis' },
//         { serviceCode: 'AmazonRedshift', serviceName: 'Amazon Redshift' },
//         { serviceCode: 'AmazonElastiCache', serviceName: 'Amazon ElastiCache' },
//         { serviceCode: 'AWSGlue', serviceName: 'AWS Glue' },
//         { serviceCode: 'AmazonSageMaker', serviceName: 'Amazon SageMaker' },
//         { serviceCode: 'AWSStep Functions', serviceName: 'AWS Step Functions' },
//         { serviceCode: 'AmazonAPIGateway', serviceName: 'Amazon API Gateway' },
//         { serviceCode: 'AWSAppSync', serviceName: 'AWS AppSync' },
//         { serviceCode: 'AmazonCognito', serviceName: 'Amazon Cognito' },
//         { serviceCode: 'AWSSecrets Manager', serviceName: 'AWS Secrets Manager' },
//         { serviceCode: 'AWSKMS', serviceName: 'AWS Key Management Service (KMS)' },
//         { serviceCode: 'AWSConfig', serviceName: 'AWS Config' },
//         { serviceCode: 'AWSCloudTrail', serviceName: 'AWS CloudTrail' },
//         { serviceCode: 'AmazonGuardDuty', serviceName: 'Amazon GuardDuty' },
//         { serviceCode: 'AWSSecurityHub', serviceName: 'AWS Security Hub' }
//       ]);
//     } finally {
//       setIsLoadingAWSServices(false);
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

//   // New Request Form handlers
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setNewRequest(prev => ({
//       ...prev,
//       [name]: value
//     }));
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

//   const handleCreateNewResource = () => {
//     if (newRequest.cloud === 'aws') {
//       setShowAWSServicesDropdown(true);
//       if (awsServices.length === 0) {
//         fetchAWSServices();
//       }
//     } else {
//       // For non-AWS clouds, show a simple input
//       const customService = prompt('Enter custom service name:');
//       if (customService && customService.trim()) {
//         const serviceCode = customService.trim().toLowerCase().replace(/\s+/g, '-');
//         setCustomResources(prev => ({
//           ...prev,
//           [newRequest.cloud]: [...(prev[newRequest.cloud] || []), serviceCode]
//         }));
//         handleSelectChange('resourceType', serviceCode);
//       }
//     }
//   };

//   const handleAWSServiceSelect = (serviceCode: string, serviceName: string) => {
//     // Add to custom resources for this cloud
//     setCustomResources(prev => ({
//       ...prev,
//       [newRequest.cloud]: [...(prev[newRequest.cloud] || []), serviceCode]
//     }));
    
//     // Update resource type labels
//     resourceTypeLabels[serviceCode] = serviceName;
    
//     // Select the service
//     handleSelectChange('resourceType', serviceCode);
//     setShowAWSServicesDropdown(false);
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
//     if (!validateForm()) {
//       return;
//     }

//     try {
//       setIsLoading(true);
      
//       const requestBody = {
//         Username: localStorage.getItem("fullName"),
//         Cloud: newRequest.cloud,
//         Service: newRequest.resourceType,
//         AccessLevel: newRequest.accessLevel,
//         Role: localStorage.getItem("role"),
//         Manager: newRequest.manager,
//         Reason: newRequest.justification,
//       };

//       console.log('Submitting request:', requestBody);

//       const response = await fetch(
//         'https://lp6t2xn0q4.execute-api.ap-south-1.amazonaws.com/prod/request_access',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(requestBody),
//         }
//       );

//       if (response.ok) {
//         const responseData = await response.json();
//         console.log('Request submitted successfully:', responseData);
        
//         alert('Request submitted successfully!');
        
//         setNewRequest({
//           cloud: '',
//           resourceType: '',
//           accessLevel: '',
//           manager: '',
//           justification: '',
//         });
//         setFormErrors({});
//         setIsNewRequestOpen(false);
//         setShowAWSServicesDropdown(false);
        
//         window.location.reload();
//       } else {
//         const errorData = await response.json().catch(() => null);
//         const errorMessage = errorData?.message || `HTTP ${response.status}: ${response.statusText}`;
//         console.error('Failed to submit request:', errorMessage);
//         alert(`Failed to submit request: ${errorMessage}`);
//       }
//     } catch (error) {
//       console.error('Error submitting request:', error);
//       alert(`Error submitting request: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

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
//                       onValueChange={(value) => {
//                         handleSelectChange("cloud", value);
//                         // Reset resource type when cloud changes
//                         setNewRequest(prev => ({ ...prev, resourceType: '' }));
//                         setShowAWSServicesDropdown(false);
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
//                     {!showAWSServicesDropdown ? (
//                       <Select
//                         value={newRequest.resourceType}
//                         onValueChange={(value) => {
//                           if (value === "__create_new__") {
//                             handleCreateNewResource();
//                           } else {
//                             handleSelectChange("resourceType", value);
//                           }
//                         }}
//                         disabled={!newRequest.cloud}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select resource type" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {getResourceOptions().map((type) => (
//                             <SelectItem value={type} key={type}>
//                               {resourceTypeLabels[type] || type}
//                             </SelectItem>
//                           ))}
//                           <SelectItem value="__create_new__" key="__create_new__">
//                             + Create new resource...
//                           </SelectItem>
//                         </SelectContent>
//                       </Select>
//                     ) : (
//                       <div className="space-y-2">
//                         <SearchableDropdown
//                           options={awsServices}
//                           value={newRequest.resourceType}
//                           onSelect={handleAWSServiceSelect}
//                           placeholder="Search AWS services..."
//                           isLoading={isLoadingAWSServices}
//                         />
//                         <Button
//                           type="button"
//                           variant="outline"
//                           size="sm"
//                           onClick={() => setShowAWSServicesDropdown(false)}
//                         >
//                           Back to basic resources
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
//                   <Button 
//                     variant="outline" 
//                     onClick={() => {
//                       setIsNewRequestOpen(false);
//                       setShowAWSServicesDropdown(false);
//                     }} 
//                     disabled={isLoading}
//                   >
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


// import React, { useState, useEffect, useMemo } from 'react';
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
//   Loader2,
//   Shield,
//   AlertCircle,
//   Plus,
//   ChevronDown,
//   Check
// } from 'lucide-react';
// import { z } from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
// import { useCloudProvider } from '@/context/CloudProviderContext';

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

// // Form Schema
// const formSchema = z.object({
//   cloud: z.string().nonempty('Cloud provider is required'),
//   resourceType: z.string().nonempty('Resource type is required'),
//   accessLevel: z.string().nonempty('Access level is required'),
//   manager: z.string().nonempty('Manager selection is required'),
//   justification: z.string().nonempty('Justification is required'),
// });

// // AWS Service Interface
// interface AWSService {
//   serviceName: string;
//   serviceCode: string;
// }

// // Custom Searchable Dropdown Component
// const SearchableDropdown = ({ 
//   options, 
//   value, 
//   onSelect, 
//   placeholder, 
//   isLoading = false,
//   className = ""
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
  
//   const filteredOptions = useMemo(() => {
//     if (!searchTerm) return options;
//     return options.filter(option => 
//       option.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       option.serviceCode.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [options, searchTerm]);

//   const selectedOption = options.find(opt => opt.serviceCode === value);

//   return (
//     <div className={`relative ${className}`}>
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full flex items-center justify-between px-3 py-2 text-sm border border-input rounded-md bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//       >
//         <span className={selectedOption ? "text-foreground" : "text-muted-foreground"}>
//           {selectedOption ? selectedOption.serviceName : placeholder}
//         </span>
//         <ChevronDown className="h-4 w-4 opacity-50" />
//       </button>
      
//       {isOpen && (
//         <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg">
//           <div className="p-2 border-b border-border">
//             <div className="relative">
//               <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search services..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-8 h-8"
//                 autoFocus
//               />
//             </div>
//           </div>
//           <div className="max-h-48 overflow-y-auto">
//             {isLoading ? (
//               <div className="flex items-center justify-center py-4">
//                 <Loader2 className="h-4 w-4 animate-spin" />
//                 <span className="ml-2 text-sm text-muted-foreground">Loading services...</span>
//               </div>
//             ) : filteredOptions.length > 0 ? (
//               filteredOptions.map((option) => (
//                 <button
//                   key={option.serviceCode}
//                   type="button"
//                   onClick={() => {
//                     onSelect(option.serviceCode, option.serviceName);
//                     setIsOpen(false);
//                     setSearchTerm('');
//                   }}
//                   className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground flex items-center justify-between"
//                 >
//                   <div>
//                     <div className="font-medium">{option.serviceName}</div>
//                     <div className="text-xs text-muted-foreground">{option.serviceCode}</div>
//                   </div>
//                   {value === option.serviceCode && <Check className="h-4 w-4" />}
//                 </button>
//               ))
//             ) : (
//               <div className="px-3 py-2 text-sm text-muted-foreground text-center">
//                 No services found
//               </div>
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
//   const [resourceTypes, setResourceTypes] = useState<AWSService[]>([]);
//   const [awsServices, setAwsServices] = useState<AWSService[]>([]);
//   const [isLoadingAWSServices, setIsLoadingAWSServices] = useState(false);
//   const [customResources, setCustomResources] = useState<{ [key: string]: string[] }>({});
//   const [showAWSServicesDropdown, setShowAWSServicesDropdown] = useState(false);
//   const [userExistingAccess, setUserExistingAccess] = useState<Record<string, string[]>>({});
//   const [selectedProvider] = useState('all');
//   const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();



  
//     const { cloudProvider, setCloudProvider } = useCloudProvider();



//   // Form setup
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       cloud: '',
//       resourceType: '',
//       accessLevel: '',
//       manager: '',
//       justification: '',
//     },
//   });

//   // Static data
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

//   const accessLevels = ['read', 'write'];
//   const accessLevelLabels: { [key: string]: string } = {
//     read: 'Read',
//     write: 'Write',
//   };

//   const userRoles = [
//     { id: 'manager', credentials: { username: 'sudheer_bellamkonda' } },
//     { id: 'manager', credentials: { username: 'muthyam_harshitha' } },
//     { id: 'manager', credentials: { username: 'shreya_gattikoppula' } },
//   ];

//   const fallbackResourceTypes: { [key: string]: string[] } = {
//     aws: ['s3', 'ec2', 'rds'],
//     azure: ['vm', 'storage'],
//     gcp: ['compute', 'storage'],
//   };

//   // Helper function to capitalize first letter of service name
//   const capitalizeService = (serviceName: string) => {
//     return serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
//   };

//   // Fetch resource types from API
//   const fetchResourceTypes = async () => {
//     if (!form.getValues('cloud')) {
//       setResourceTypes([]);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const email = localStorage.getItem('email');
//       if (!email) {
//         throw new Error('Email not found in localStorage');
//       }

//       const response = await fetch(
//         `https://hnqj1wzgmi.execute-api.ap-south-1.amazonaws.com/listservices?email=${encodeURIComponent(email)}`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.log('Error response body:', errorData);
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       const services = data.services || fallbackResourceTypes[form.getValues('cloud')] || [];
//       const mappedServices: AWSService[] = services.map((service: string) => ({
//         serviceName: resourceTypeLabels[service.toLowerCase()] || service,
//         serviceCode: service.toLowerCase().replace(/\s+/g, '-'),
//       }));
//       setResourceTypes(mappedServices);
//     } catch (error) {
//       console.error('Failed to fetch resource types:', error);
//       const fallbackServices = (fallbackResourceTypes[form.getValues('cloud')] || []).map((service: string) => ({
//         serviceName: resourceTypeLabels[service.toLowerCase()] || service,
//         serviceCode: service.toLowerCase().replace(/\s+/g, '-'),
//       }));
//       setResourceTypes(fallbackServices);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch AWS services for "Create new resource..."
//   const fetchAWSServices = async () => {
//     setIsLoadingAWSServices(true);
//     try {
//       const response = await fetch('https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/index.json');
//       if (!response.ok) {
//         throw new Error('Failed to fetch AWS services');
//       }
      
//       const data = await response.json();
//       const services: AWSService[] = [];
      
//       if (data.offers) {
//         Object.entries(data.offers).forEach(([serviceCode, serviceData]: [string, any]) => {
//           if (serviceData && typeof serviceData === 'object') {
//             let serviceName = serviceCode;
//             if (serviceData.serviceName) {
//               serviceName = serviceData.serviceName;
//             } else if (serviceData.name) {
//               serviceName = serviceData.name;
//             } else if (serviceData.displayName) {
//               serviceName = serviceName;
//             } else if (serviceData.description) {
//               serviceName = serviceData.description;
//             }
//             services.push({
//               serviceCode: serviceCode,
//               serviceName: serviceName,
//             });
//           }
//         });
//       }
      
//       const uniqueServices = services.filter((service, index, self) => 
//         index === self.findIndex(s => s.serviceCode === service.serviceCode)
//       );
      
//       uniqueServices.sort((a, b) => a.serviceName.localeCompare(b.serviceName));
//       setAwsServices(uniqueServices);
      
//       if (uniqueServices.length === 0) {
//         throw new Error('No services found in API response');
//       }
//     } catch (error) {
//       console.error('Error fetching AWS services:', error);
//       setAwsServices([
//         { serviceCode: 'AmazonS3', serviceName: 'Amazon Simple Storage Service (S3)' },
//         { serviceCode: 'AmazonEC2', serviceName: 'Amazon Elastic Compute Cloud (EC2)' },
//         { serviceCode: 'AmazonRDS', serviceName: 'Amazon Relational Database Service (RDS)' },
//         { serviceCode: 'AWSLambda', serviceName: 'AWS Lambda' },
//         { serviceCode: 'AmazonVPC', serviceName: 'Amazon Virtual Private Cloud (VPC)' },
//         { serviceCode: 'AmazonCloudFront', serviceName: 'Amazon CloudFront' },
//         { serviceCode: 'AmazonRoute53', serviceName: 'Amazon Route 53' },
//         { serviceCode: 'AmazonDynamoDB', serviceName: 'Amazon DynamoDB' },
//         { serviceCode: 'AmazonSNS', serviceName: 'Amazon Simple Notification Service (SNS)' },
//         { serviceCode: 'AmazonSQS', serviceName: 'Amazon Simple Queue Service (SQS)' },
//         { serviceCode: 'AmazonEKS', serviceName: 'Amazon Elastic Kubernetes Service (EKS)' },
//         { serviceCode: 'AmazonECS', serviceName: 'Amazon Elastic Container Service (ECS)' },
//         { serviceCode: 'AWSCloudFormation', serviceName: 'AWS CloudFormation' },
//         { serviceCode: 'AmazonCloudWatch', serviceName: 'Amazon CloudWatch' },
//         { serviceCode: 'AWSIAM', serviceName: 'AWS Identity and Access Management (IAM)' },
//         { serviceCode: 'AmazonKinesis', serviceName: 'Amazon Kinesis' },
//         { serviceCode: 'AmazonRedshift', serviceName: 'Amazon Redshift' },
//         { serviceCode: 'AmazonElastiCache', serviceName: 'Amazon ElastiCache' },
//         { serviceCode: 'AWSGlue', serviceName: 'AWS Glue' },
//         { serviceCode: 'AmazonSageMaker', serviceName: 'Amazon SageMaker' },
//         { serviceCode: 'AWSStepFunctions', serviceName: 'AWS Step Functions' },
//         { serviceCode: 'AmazonAPIGateway', serviceName: 'Amazon API Gateway' },
//         { serviceCode: 'AWSAppSync', serviceName: 'AWS AppSync' },
//         { serviceCode: 'AmazonCognito', serviceName: 'Amazon Cognito' },
//         { serviceCode: 'AWSSecretsManager', serviceName: 'AWS Secrets Manager' },
//         { serviceCode: 'AWSKMS', serviceName: 'AWS Key Management Service (KMS)' },
//         { serviceCode: 'AWSConfig', serviceName: 'AWS Config' },
//         { serviceCode: 'AWSCloudTrail', serviceName: 'AWS CloudTrail' },
//         { serviceCode: 'AmazonGuardDuty', serviceName: 'Amazon GuardDuty' },
//         { serviceCode: 'AWSSecurityHub', serviceName: 'AWS Security Hub' },
//       ]);
//     } finally {
//       setIsLoadingAWSServices(false);
//     }
//   };

//   // Fetch requests and build userExistingAccess
//   useEffect(() => {
//     const fetchRequests = async () => {
//       setIsLoading(true);
//       setError(null);
//       const fullName = localStorage.getItem('fullName');
//       const userRole = localStorage.getItem('role');

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
//           const filteredRequests = userRole === 'Manager'
//             ? data.requests
//             : data.requests.filter((req: APIRequest) => req.Username === fullName);
//           setRequests(filteredRequests);

//           // Build access map
//           const accessMap: Record<string, string[]> = {};
//           for (const req of filteredRequests) {
//             if (req.Status === 'applied') {
//               const service = req.Service.toLowerCase();
//               const access = req.AccessLevel?.toLowerCase();
//               if (accessMap[service]) {
//                 if (!accessMap[service].includes(access)) {
//                   accessMap[service].push(access);
//                 }
//               } else {
//                 accessMap[service] = [access];
//               }
//             }
//           }
//           setUserExistingAccess(accessMap);
//         }
//       } catch (error: any) {
//         console.error('Error fetching requests:', error);
//         setError(error.message || 'Error loading requests. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchRequests();
//   }, []);

//   // Fetch resource types when cloud provider changes
//   useEffect(() => {
//     if (form.getValues('cloud')) {
//       fetchResourceTypes();
//     } else {
//       setResourceTypes([]);
//     }
//   }, [form.getValues('cloud')]);

//   // Handle initial filter from navigation state
//   useEffect(() => {
//     if (location.state?.filterStatus) {
//       setFilterStatus(location.state.filterStatus);
//     }
//   }, [location.state]);

//   const getResourceOptions = () => {
//     if (!form.getValues('cloud')) return [];
//     const apiTypes = resourceTypes.map(service => service.serviceCode);
//     const customTypes = customResources[form.getValues('cloud')] || [];
//     return [...apiTypes, ...customTypes];
//   };

//   const handleCreateNewResource = () => {
//     if (form.getValues('cloud') === 'aws') {
//       setShowAWSServicesDropdown(true);
//       if (awsServices.length === 0) {
//         fetchAWSServices();
//       }
//     } else {
//       const customService = prompt('Enter custom service name:');
//       if (customService && customService.trim()) {
//         const serviceCode = customService.trim().toLowerCase().replace(/\s+/g, '-');
//         setCustomResources(prev => ({
//           ...prev,
//           [form.getValues('cloud')]: [...(prev[form.getValues('cloud')] || []), serviceCode],
//         }));
//         resourceTypeLabels[serviceCode] = customService.trim();
//         form.setValue('resourceType', serviceCode);
//       }
//     }
//   };

//   const handleAWSServiceSelect = (serviceCode: string, serviceName: string) => {
//     setCustomResources(prev => ({
//       ...prev,
//       [form.getValues('cloud')]: [...(prev[form.getValues('cloud')] || []), serviceCode],
//     }));
//     resourceTypeLabels[serviceCode] = serviceName;
//     form.setValue('resourceType', serviceCode);
//     setShowAWSServicesDropdown(false);
//   };

//   const onSubmit = async (data: z.infer<typeof formSchema>) => {
//     try {
//       setIsLoading(true);
//       const requestBody = {
//         Username: localStorage.getItem('fullName'),
//         Cloud: data.cloud,
//         Service: data.resourceType,
//         AccessLevel: data.accessLevel,
//         Role: localStorage.getItem('role'),
//         Manager: data.manager,
//         Reason: data.justification,
//       };

//       const response = await fetch(
//         'https://lp6t2xn0q4.execute-api.ap-south-1.amazonaws.com/prod/request_access',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(requestBody),
//         }
//       );

//       if (response.ok) {
//         const responseData = await response.json();
//         console.log('Request submitted successfully:', responseData);
//         alert('Request submitted successfully!');
//         form.reset();
//         setShowAWSServicesDropdown(false);
//         setIsNewRequestOpen(false);
//         window.location.reload();
//       } else {
//         const errorData = await response.json().catch(() => null);
//         const errorMessage = errorData?.message || `HTTP ${response.status}: ${response.statusText}`;
//         console.error('Failed to submit request:', errorMessage);
//         alert(`Failed to submit request: ${errorMessage}`);
//       }
//     } catch (error) {
//       console.error('Error submitting request:', error);
//       alert(`Error submitting request: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

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
//       gcp: '🔵',
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
//       minute: '2-digit',
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
//                 <Form {...form}>
//                   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                     <div className="grid grid-cols-2 gap-4">
//                       {/* Cloud Provider */}
//                       <FormField
//                         control={form.control}
//                         name="cloud"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Cloud Provider</FormLabel>
//                             <Select
//                               onValueChange={(value) => {
//                                 field.onChange(value);
//                                 form.setValue('resourceType', '');
//                               }}
//                               value={field.value}
//                               disabled={selectedProvider !== 'all'}
//                             >
//                               <FormControl>
//                                 <SelectTrigger>
//                                   <SelectValue placeholder="Select provider" />
//                                 </SelectTrigger>
//                               </FormControl>
//                               <SelectContent>
//                                 {cloudProviders.map((provider) => (
//                                   <SelectItem key={provider.id} value={provider.id}>
//                                     {provider.name}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       {/* Resource Type */}
//                       <FormField
//                         control={form.control}
//                         name="resourceType"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Resource Type</FormLabel>
//                             {!showAWSServicesDropdown ? (
//                               <Select
//                                 onValueChange={(value) => {
//                                   if (value === '__create_new__') {
//                                     handleCreateNewResource();
//                                   } else {
//                                     field.onChange(value);
//                                   }
//                                 }}
//                                 value={field.value}
//                                 disabled={!form.getValues('cloud') || isLoading}
//                               >
//                                 <FormControl>
//                                   <SelectTrigger>
//                                     <SelectValue placeholder={isLoading ? 'Loading resources...' : 'Select resource type'} />
//                                   </SelectTrigger>
//                                 </FormControl>
//                                 <SelectContent>
//                                   {getResourceOptions().length > 0 ? (
//                                     getResourceOptions().map((type) => (
//                                       <SelectItem value={type} key={type}>
//                                         {resourceTypes.find(service => service.serviceCode === type)?.serviceName || resourceTypeLabels[type] || type}
//                                       </SelectItem>
//                                     ))
//                                   ) : (
//                                     <SelectItem value="none" disabled>
//                                       No resources available
//                                     </SelectItem>
//                                   )}
//                                   <SelectItem value="__create_new__" key="__create_new__">
//                                     + Create new resource...
//                                   </SelectItem>
//                                 </SelectContent>
//                               </Select>
//                             ) : (
//                               <div className="space-y-2">
//                                 <SearchableDropdown
//                                   options={awsServices}
//                                   value={field.value}
//                                   onSelect={handleAWSServiceSelect}
//                                   placeholder="Search AWS services..."
//                                   isLoading={isLoadingAWSServices}
//                                 />
//                                 <Button
//                                   type="button"
//                                   variant="outline"
//                                   size="sm"
//                                   onClick={() => setShowAWSServicesDropdown(false)}
//                                 >
//                                   Back to basic resources
//                                 </Button>
//                               </div>
//                             )}
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       {/* Access Level */}
//                       <FormField
//                         control={form.control}
//                         name="accessLevel"
//                         render={({ field }) => {
//                           const alreadyGranted = userExistingAccess[form.getValues('resourceType')?.toLowerCase()] || [];
//                           return (
//                             <FormItem>
//                               <FormLabel>Access Level</FormLabel>
//                               <Select
//                                 onValueChange={field.onChange}
//                                 value={field.value}
//                               >
//                                 <FormControl>
//                                   <SelectTrigger>
//                                     <SelectValue placeholder="Select access level" />
//                                   </SelectTrigger>
//                                 </FormControl>
//                                 <SelectContent>
//                                   {accessLevels.map((level) => (
//                                     <SelectItem
//                                       key={level}
//                                       value={level}
//                                       disabled={alreadyGranted.includes(level)}
//                                     >
//                                       {accessLevelLabels[level]}
//                                     </SelectItem>
//                                   ))}
//                                 </SelectContent>
//                               </Select>
//                               <FormMessage />
//                             </FormItem>
//                           );
//                         }}
//                       />

//                       {/* Manager */}
//                       <FormField
//                         control={form.control}
//                         name="manager"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Manager</FormLabel>
//                             <Select
//                               onValueChange={field.onChange}
//                               value={field.value}
//                             >
//                               <FormControl>
//                                 <SelectTrigger>
//                                   <SelectValue placeholder="Select manager" />
//                                 </SelectTrigger>
//                               </FormControl>
//                               <SelectContent>
//                                 {userRoles.map((manager) => (
//                                   <SelectItem key={manager.credentials.username} value={manager.credentials.username}>
//                                     {manager.credentials.username}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       {/* Justification */}
//                       <FormField
//                         control={form.control}
//                         name="justification"
//                         render={({ field }) => (
//                           <FormItem className="col-span-2">
//                             <FormLabel>Justification</FormLabel>
//                             <FormControl>
//                               <Textarea
//                                 placeholder="Explain the reason for access"
//                                 className="resize-none"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>

//                     <div className="flex justify-end space-x-2">
//                       <Button
//                         type="button"
//                         variant="outline"
//                         onClick={() => {
//                           setIsNewRequestOpen(false);
//                           setShowAWSServicesDropdown(false);
//                           form.reset();
//                         }}
//                         disabled={isLoading}
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                         type="submit"
//                         disabled={isLoading}
//                         className="bg-primary hover:bg-primary/90"
//                       >
//                         {isLoading ? (
//                           <>
//                             <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                             Submitting...
//                           </>
//                         ) : (
//                           'Submit Request'
//                         )}
//                       </Button>
//                     </div>
//                   </form>
//                 </Form>
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
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Service
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Cloud
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Access Level
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Requested
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredRequests.map((request) => (
//                 <tr key={request.RequestID} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                     <div className="flex items-center">
//                       <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
//                       {capitalizeService(request.Service)}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     <div className="flex items-center">
//                       <span className="mr-2">{getCloudIcon(request.Cloud)}</span>
//                       {request.Cloud.toUpperCase()}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     <Badge variant="secondary" className="text-xs">
//                       {request.AccessLevel}
//                     </Badge>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     <div className="flex items-center space-x-2">
//                       {getStatusIcon(request.Status)}
//                       {getStatusBadge(request.Status)}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 mr-2" />
//                       {formatDate(request.RequestTime)}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
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
//                     {capitalizeService(selectedRequest.Service)}
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




// import React, { useState, useEffect, useMemo } from 'react';
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
//   Loader2,
//   Shield,
//   AlertCircle,
//   Plus,
//   ChevronDown,
//   Check
// } from 'lucide-react';
// import { z } from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
// import { useCloudProvider } from '@/context/CloudProviderContext';

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

// // Form Schema
// const formSchema = z.object({
//   cloud: z.string().nonempty('Cloud provider is required'),
//   resourceType: z.string().nonempty('Resource type is required'),
//   accessLevel: z.string().nonempty('Access level is required'),
//   manager: z.string().nonempty('Manager selection is required'),
//   justification: z.string().nonempty('Justification is required'),
// });

// // AWS Service Interface
// interface AWSService {
//   serviceName: string;
//   serviceCode: string;
// }

// // Custom Searchable Dropdown Component
// const SearchableDropdown = ({ 
//   options, 
//   value, 
//   onSelect, 
//   placeholder, 
//   isLoading = false,
//   className = ""
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
  
//   const filteredOptions = useMemo(() => {
//     if (!searchTerm) return options;
//     return options.filter(option => 
//       option.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       option.serviceCode.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [options, searchTerm]);

//   const selectedOption = options.find(opt => opt.serviceCode === value);

//   return (
//     <div className={`relative ${className}`}>
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full flex items-center justify-between px-3 py-2 text-sm border border-input rounded-md bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//       >
//         <span className={selectedOption ? "text-foreground" : "text-muted-foreground"}>
//           {selectedOption ? selectedOption.serviceName : placeholder}
//         </span>
//         <ChevronDown className="h-4 w-4 opacity-50" />
//       </button>
      
//       {isOpen && (
//         <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg">
//           <div className="p-2 border-b border-border">
//             <div className="relative">
//               <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search services..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-8 h-8"
//                 autoFocus
//               />
//             </div>
//           </div>
//           <div className="max-h-48 overflow-y-auto">
//             {isLoading ? (
//               <div className="flex items-center justify-center py-4">
//                 <Loader2 className="h-4 w-4 animate-spin" />
//                 <span className="ml-2 text-sm text-muted-foreground">Loading services...</span>
//               </div>
//             ) : filteredOptions.length > 0 ? (
//               filteredOptions.map((option) => (
//                 <button
//                   key={option.serviceCode}
//                   type="button"
//                   onClick={() => {
//                     onSelect(option.serviceCode, option.serviceName);
//                     setIsOpen(false);
//                     setSearchTerm('');
//                   }}
//                   className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground flex items-center justify-between"
//                 >
//                   <div>
//                     <div className="font-medium">{option.serviceName}</div>
//                     <div className="text-xs text-muted-foreground">{option.serviceCode}</div>
//                   </div>
//                   {value === option.serviceCode && <Check className="h-4 w-4" />}
//                 </button>
//               ))
//             ) : (
//               <div className="px-3 py-2 text-sm text-muted-foreground text-center">
//                 No services found
//               </div>
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
//   const [filterCloudProvider, setFilterCloudProvider] = useState<string>('all'); // New state for cloud filter
//   const [requests, setRequests] = useState<APIRequest[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedRequest, setSelectedRequest] = useState<APIRequest | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [resourceTypes, setResourceTypes] = useState<AWSService[]>([]);
//   const [awsServices, setAwsServices] = useState<AWSService[]>([]);
//   const [isLoadingAWSServices, setIsLoadingAWSServices] = useState(false);
//   const [customResources, setCustomResources] = useState<{ [key: string]: string[] }>({});
//   const [showAWSServicesDropdown, setShowAWSServicesDropdown] = useState(false);
//   const [userExistingAccess, setUserExistingAccess] = useState<Record<string, string[]>>({});
//   const [selectedProvider] = useState('all');
//   const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { cloudProvider, setCloudProvider } = useCloudProvider();

//   // Form setup
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       cloud: '',
//       resourceType: '',
//       accessLevel: '',
//       manager: '',
//       justification: '',
//     },
//   });

//   // Static data
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

//   const accessLevels = ['read', 'write'];
//   const accessLevelLabels: { [key: string]: string } = {
//     read: 'Read',
//     write: 'Write',
//   };

//   const userRoles = [
//     { id: 'manager', credentials: { username: 'sudheer_bellamkonda' } },
//     { id: 'manager', credentials: { username: 'muthyam_harshitha' } },
//     { id: 'manager', credentials: { username: 'shreya_gattikoppula' } },
//   ];

//   const fallbackResourceTypes: { [key: string]: string[] } = {
//     aws: ['s3', 'ec2', 'rds'],
//     azure: ['vm', 'storage'],
//     gcp: ['compute', 'storage'],
//   };

//   // Helper function to capitalize first letter of service name
//   const capitalizeService = (serviceName: string) => {
//     return serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
//   };

//   // Fetch resource types from API
//   const fetchResourceTypes = async () => {
//     if (!form.getValues('cloud')) {
//       setResourceTypes([]);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const email = localStorage.getItem('email');
//       if (!email) {
//         throw new Error('Email not found in localStorage');
//       }

//       const response = await fetch(
//         `https://hnqj1wzgmi.execute-api.ap-south-1.amazonaws.com/listservices?email=${encodeURIComponent(email)}`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.log('Error response body:', errorData);
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       const services = data.services || fallbackResourceTypes[form.getValues('cloud')] || [];
//       const mappedServices: AWSService[] = services.map((service: string) => ({
//         serviceName: resourceTypeLabels[service.toLowerCase()] || service,
//         serviceCode: service.toLowerCase().replace(/\s+/g, '-'),
//       }));
//       setResourceTypes(mappedServices);
//     } catch (error) {
//       console.error('Failed to fetch resource types:', error);
//       const fallbackServices = (fallbackResourceTypes[form.getValues('cloud')] || []).map((service: string) => ({
//         serviceName: resourceTypeLabels[service.toLowerCase()] || service,
//         serviceCode: service.toLowerCase().replace(/\s+/g, '-'),
//       }));
//       setResourceTypes(fallbackServices);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch AWS services for "Create new resource..."
//   const fetchAWSServices = async () => {
//     setIsLoadingAWSServices(true);
//     try {
//       const response = await fetch('https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/index.json');
//       if (!response.ok) {
//         throw new Error('Failed to fetch AWS services');
//       }
      
//       const data = await response.json();
//       const services: AWSService[] = [];
      
//       if (data.offers) {
//         Object.entries(data.offers).forEach(([serviceCode, serviceData]: [string, any]) => {
//           if (serviceData && typeof serviceData === 'object') {
//             let serviceName = serviceCode;
//             if (serviceData.serviceName) {
//               serviceName = serviceData.serviceName;
//             } else if (serviceData.name) {
//               serviceName = serviceData.name;
//             } else if (serviceData.displayName) {
//               serviceName = serviceName;
//             } else if (serviceData.description) {
//               serviceName = serviceData.description;
//             }
//             services.push({
//               serviceCode: serviceCode,
//               serviceName: serviceName,
//             });
//           }
//         });
//       }
      
//       const uniqueServices = services.filter((service, index, self) => 
//         index === self.findIndex(s => s.serviceCode === service.serviceCode)
//       );
      
//       uniqueServices.sort((a, b) => a.serviceName.localeCompare(b.serviceName));
//       setAwsServices(uniqueServices);
      
//       if (uniqueServices.length === 0) {
//         throw new Error('No services found in API response');
//       }
//     } catch (error) {
//       console.error('Error fetching AWS services:', error);
//       setAwsServices([
//         { serviceCode: 'AmazonS3', serviceName: 'Amazon Simple Storage Service (S3)' },
//         { serviceCode: 'AmazonEC2', serviceName: 'Amazon Elastic Compute Cloud (EC2)' },
//         { serviceCode: 'AmazonRDS', serviceName: 'Amazon Relational Database Service (RDS)' },
//         { serviceCode: 'AWSLambda', serviceName: 'AWS Lambda' },
//         { serviceCode: 'AmazonVPC', serviceName: 'Amazon Virtual Private Cloud (VPC)' },
//         { serviceCode: 'AmazonCloudFront', serviceName: 'Amazon CloudFront' },
//         { serviceCode: 'AmazonRoute53', serviceName: 'Amazon Route 53' },
//         { serviceCode: 'AmazonDynamoDB', serviceName: 'Amazon DynamoDB' },
//         { serviceCode: 'AmazonSNS', serviceName: 'Amazon Simple Notification Service (SNS)' },
//         { serviceCode: 'AmazonSQS', serviceName: 'Amazon Simple Queue Service (SQS)' },
//         { serviceCode: 'AmazonEKS', serviceName: 'Amazon Elastic Kubernetes Service (EKS)' },
//         { serviceCode: 'AmazonECS', serviceName: 'Amazon Elastic Container Service (ECS)' },
//         { serviceCode: 'AWSCloudFormation', serviceName: 'AWS CloudFormation' },
//         { serviceCode: 'AmazonCloudWatch', serviceName: 'Amazon CloudWatch' },
//         { serviceCode: 'AWSIAM', serviceName: 'AWS Identity and Access Management (IAM)' },
//         { serviceCode: 'AmazonKinesis', serviceName: 'Amazon Kinesis' },
//         { serviceCode: 'AmazonRedshift', serviceName: 'Amazon Redshift' },
//         { serviceCode: 'AmazonElastiCache', serviceName: 'Amazon ElastiCache' },
//         { serviceCode: 'AWSGlue', serviceName: 'AWS Glue' },
//         { serviceCode: 'AmazonSageMaker', serviceName: 'Amazon SageMaker' },
//         { serviceCode: 'AWSStepFunctions', serviceName: 'AWS Step Functions' },
//         { serviceCode: 'AmazonAPIGateway', serviceName: 'Amazon API Gateway' },
//         { serviceCode: 'AWSAppSync', serviceName: 'AWS AppSync' },
//         { serviceCode: 'AmazonCognito', serviceName: 'Amazon Cognito' },
//         { serviceCode: 'AWSSecretsManager', serviceName: 'AWS Secrets Manager' },
//         { serviceCode: 'AWSKMS', serviceName: 'AWS Key Management Service (KMS)' },
//         { serviceCode: 'AWSConfig', serviceName: 'AWS Config' },
//         { serviceCode: 'AWSCloudTrail', serviceName: 'AWS CloudTrail' },
//         { serviceCode: 'AmazonGuardDuty', serviceName: 'Amazon GuardDuty' },
//         { serviceCode: 'AWSSecurityHub', serviceName: 'AWS Security Hub' },
//       ]);
//     } finally {
//       setIsLoadingAWSServices(false);
//     }
//   };

//   // Fetch requests and build userExistingAccess
//   useEffect(() => {
//     const fetchRequests = async () => {
//       setIsLoading(true);
//       setError(null);
//       const fullName = localStorage.getItem('fullName');
//       const userRole = localStorage.getItem('role');

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
//           const filteredRequests = userRole === 'Manager'
//             ? data.requests
//             : data.requests.filter((req: APIRequest) => req.Username === fullName);
//           setRequests(filteredRequests);

//           // Build access map
//           const accessMap: Record<string, string[]> = {};
//           for (const req of filteredRequests) {
//             if (req.Status === 'applied') {
//               const service = req.Service.toLowerCase();
//               const access = req.AccessLevel?.toLowerCase();
//               if (accessMap[service]) {
//                 if (!accessMap[service].includes(access)) {
//                   accessMap[service].push(access);
//                 }
//               } else {
//                 accessMap[service] = [access];
//               }
//             }
//           }
//           setUserExistingAccess(accessMap);
//         }
//       } catch (error: any) {
//         console.error('Error fetching requests:', error);
//         setError(error.message || 'Error loading requests. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchRequests();
//   }, []);

//   // Fetch resource types when cloud provider changes
//   useEffect(() => {
//     if (form.getValues('cloud')) {
//       fetchResourceTypes();
//     } else {
//       setResourceTypes([]);
//     }
//   }, [form.getValues('cloud')]);

//   // Handle initial filter from navigation state
//   useEffect(() => {
//     if (location.state?.filterStatus) {
//       setFilterStatus(location.state.filterStatus);
//     }
//   }, [location.state]);

//   const getResourceOptions = () => {
//     if (!form.getValues('cloud')) return [];
//     const apiTypes = resourceTypes.map(service => service.serviceCode);
//     const customTypes = customResources[form.getValues('cloud')] || [];
//     return [...apiTypes, ...customTypes];
//   };

//   const handleCreateNewResource = () => {
//     if (form.getValues('cloud') === 'aws') {
//       setShowAWSServicesDropdown(true);
//       if (awsServices.length === 0) {
//         fetchAWSServices();
//       }
//     } else {
//       const customService = prompt('Enter custom service name:');
//       if (customService && customService.trim()) {
//         const serviceCode = customService.trim().toLowerCase().replace(/\s+/g, '-');
//         setCustomResources(prev => ({
//           ...prev,
//           [form.getValues('cloud')]: [...(prev[form.getValues('cloud')] || []), serviceCode],
//         }));
//         resourceTypeLabels[serviceCode] = customService.trim();
//         form.setValue('resourceType', serviceCode);
//       }
//     }
//   };

//   const handleAWSServiceSelect = (serviceCode: string, serviceName: string) => {
//     setCustomResources(prev => ({
//       ...prev,
//       [form.getValues('cloud')]: [...(prev[form.getValues('cloud')] || []), serviceCode],
//     }));
//     resourceTypeLabels[serviceCode] = serviceName;
//     form.setValue('resourceType', serviceCode);
//     setShowAWSServicesDropdown(false);
//   };

//   const onSubmit = async (data: z.infer<typeof formSchema>) => {
//     try {
//       setIsLoading(true);
//       const requestBody = {
//         Username: localStorage.getItem('fullName'),
//         Cloud: data.cloud,
//         Service: data.resourceType,
//         AccessLevel: data.accessLevel,
//         Role: localStorage.getItem('role'),
//         Manager: data.manager,
//         Reason: data.justification,
//       };

//       const response = await fetch(
//         'https://lp6t2xn0q4.execute-api.ap-south-1.amazonaws.com/prod/request_access',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(requestBody),
//         }
//       );

//       if (response.ok) {
//         const responseData = await response.json();
//         console.log('Request submitted successfully:', responseData);
//         alert('Request submitted successfully!');
//         form.reset();
//         setShowAWSServicesDropdown(false);
//         setIsNewRequestOpen(false);
//         window.location.reload();
//       } else {
//         const errorData = await response.json().catch(() => null);
//         const errorMessage = errorData?.message || `HTTP ${response.status}: ${response.statusText}`;
//         console.error('Failed to submit request:', errorMessage);
//         alert(`Failed to submit request: ${errorMessage}`);
//       }
//     } catch (error) {
//       console.error('Error submitting request:', error);
//       alert(`Error submitting request: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Updated filtering function to include cloud provider filter
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

//     // Add cloud provider filtering
//     if (cloudProvider !== 'all') {
//       filtered = filtered.filter((request) => request.Cloud.toLowerCase() === cloudProvider.toLowerCase());
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
//       gcp: '🔵',
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
//       minute: '2-digit',
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
//       {/* Updated Filters with Cloud Provider Filter */}
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
//             {/* Cloud Provider Filter */}
//             {/* <select
//               value={filterCloudProvider}
//               onChange={(e) => setFilterCloudProvider(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
//             >
//               <option value="all">All Providers</option>
//               <option value="aws">AWS</option>
//               <option value="azure">Azure</option>
//               <option value="gcp">GCP</option>
//             </select> */}

//             {/* Status Filter */}
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
//                 <Form {...form}>
//                   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                     <div className="grid grid-cols-2 gap-4">
//                       {/* Cloud Provider */}
//                       <FormField
//                         control={form.control}
//                         name="cloud"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Cloud Provider</FormLabel>
//                             <Select
//                               onValueChange={(value) => {
//                                 field.onChange(value);
//                                 form.setValue('resourceType', '');
//                               }}
//                               value={field.value}
//                               disabled={selectedProvider !== 'all'}
//                             >
//                               <FormControl>
//                                 <SelectTrigger>
//                                   <SelectValue placeholder="Select provider" />
//                                 </SelectTrigger>
//                               </FormControl>
//                               <SelectContent>
//                                 {cloudProviders.map((provider) => (
//                                   <SelectItem key={provider.id} value={provider.id}>
//                                     {provider.name}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       {/* Resource Type */}
//                       <FormField
//                         control={form.control}
//                         name="resourceType"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Resource Type</FormLabel>
//                             {!showAWSServicesDropdown ? (
//                               <Select
//                                 onValueChange={(value) => {
//                                   if (value === '__create_new__') {
//                                     handleCreateNewResource();
//                                   } else {
//                                     field.onChange(value);
//                                   }
//                                 }}
//                                 value={field.value}
//                                 disabled={!form.getValues('cloud') || isLoading}
//                               >
//                                 <FormControl>
//                                   <SelectTrigger>
//                                     <SelectValue placeholder={isLoading ? 'Loading resources...' : 'Select resource type'} />
//                                   </SelectTrigger>
//                                 </FormControl>
//                                 <SelectContent>
//                                   {getResourceOptions().length > 0 ? (
//                                     getResourceOptions().map((type) => (
//                                       <SelectItem value={type} key={type}>
//                                         {resourceTypes.find(service => service.serviceCode === type)?.serviceName || resourceTypeLabels[type] || type}
//                                       </SelectItem>
//                                     ))
//                                   ) : (
//                                     <SelectItem value="none" disabled>
//                                       No resources available
//                                     </SelectItem>
//                                   )}
//                                   <SelectItem value="__create_new__" key="__create_new__">
//                                     + Create new resource...
//                                   </SelectItem>
//                                 </SelectContent>
//                               </Select>
//                             ) : (
//                               <div className="space-y-2">
//                                 <SearchableDropdown
//                                   options={awsServices}
//                                   value={field.value}
//                                   onSelect={handleAWSServiceSelect}
//                                   placeholder="Search AWS services..."
//                                   isLoading={isLoadingAWSServices}
//                                 />
//                                 <Button
//                                   type="button"
//                                   variant="outline"
//                                   size="sm"
//                                   onClick={() => setShowAWSServicesDropdown(false)}
//                                 >
//                                   Back to basic resources
//                                 </Button>
//                               </div>
//                             )}
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       {/* Access Level */}
//                       <FormField
//                         control={form.control}
//                         name="accessLevel"
//                         render={({ field }) => {
//                           const alreadyGranted = userExistingAccess[form.getValues('resourceType')?.toLowerCase()] || [];
//                           return (
//                             <FormItem>
//                               <FormLabel>Access Level</FormLabel>
//                               <Select
//                                 onValueChange={field.onChange}
//                                 value={field.value}
//                               >
//                                 <FormControl>
//                                   <SelectTrigger>
//                                     <SelectValue placeholder="Select access level" />
//                                   </SelectTrigger>
//                                 </FormControl>
//                                 <SelectContent>
//                                   {accessLevels.map((level) => (
//                                     <SelectItem
//                                       key={level}
//                                       value={level}
//                                       disabled={alreadyGranted.includes(level)}
//                                     >
//                                       {accessLevelLabels[level]}
//                                     </SelectItem>
//                                   ))}
//                                 </SelectContent>
//                               </Select>
//                               <FormMessage />
//                             </FormItem>
//                           );
//                         }}
//                       />

//                       {/* Manager */}
//                       <FormField
//                         control={form.control}
//                         name="manager"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Manager</FormLabel>
//                             <Select
//                               onValueChange={field.onChange}
//                               value={field.value}
//                             >
//                               <FormControl>
//                                 <SelectTrigger>
//                                   <SelectValue placeholder="Select manager" />
//                                 </SelectTrigger>
//                               </FormControl>
//                               <SelectContent>
//                                 {userRoles.map((manager) => (
//                                   <SelectItem key={manager.credentials.username} value={manager.credentials.username}>
//                                     {manager.credentials.username}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       {/* Justification */}
//                       <FormField
//                         control={form.control}
//                         name="justification"
//                         render={({ field }) => (
//                           <FormItem className="col-span-2">
//                             <FormLabel>Justification</FormLabel>
//                             <FormControl>
//                               <Textarea
//                                 placeholder="Explain the reason for access"
//                                 className="resize-none"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>

//                     <div className="flex justify-end space-x-2">
//                       <Button
//                         type="button"
//                         variant="outline"
//                         onClick={() => {
//                           setIsNewRequestOpen(false);
//                           setShowAWSServicesDropdown(false);
//                           form.reset();
//                         }}
//                         disabled={isLoading}
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                         type="submit"
//                         disabled={isLoading}
//                         className="bg-primary hover:bg-primary/90"
//                       >
//                         {isLoading ? (
//                           <>
//                             <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                             Submitting...
//                           </>
//                         ) : (
//                           'Submit Request'
//                         )}
//                       </Button>
//                     </div>
//                   </form>
//                 </Form>
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
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Service
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Cloud
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Access Level
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Requested
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredRequests.map((request) => (
//                 <tr key={request.RequestID} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                     <div className="flex items-center">
//                       <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
//                       {capitalizeService(request.Service)}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     <div className="flex items-center">
//                       <span className="mr-2">{getCloudIcon(request.Cloud)}</span>
//                       {request.Cloud.toUpperCase()}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     <Badge variant="secondary" className="text-xs">
//                       {request.AccessLevel}
//                     </Badge>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     <div className="flex items-center space-x-2">
//                       {getStatusIcon(request.Status)}
//                       {getStatusBadge(request.Status)}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 mr-2" />
//                       {formatDate(request.RequestTime)}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
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
//                     {capitalizeService(selectedRequest.Service)}
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

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useCloudProvider } from '@/context/CloudProviderContext';

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

// Form Schema
const formSchema = z.object({
  cloud: z.string().nonempty('Cloud provider is required'),
  resourceType: z.string().nonempty('Resource type is required'),
  accessLevel: z.string().nonempty('Access level is required'),
  manager: z.string().nonempty('Manager selection is required'),
  justification: z.string().nonempty('Justification is required'),
});

// AWS Service Interface
interface AWSService {
  serviceName: string;
  serviceCode: string;
}

// Custom Searchable Dropdown Component
const SearchableDropdown = ({ 
  options, 
  value, 
  onSelect, 
  placeholder, 
  isLoading = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter(option => 
      option.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.serviceCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const selectedOption = options.find(opt => opt.serviceCode === value);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm border border-input rounded-md bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <span className={selectedOption ? "text-foreground" : "text-muted-foreground"}>
          {selectedOption ? selectedOption.serviceName : placeholder}
        </span>
        <span className="text-xs">▼</span>
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg">
          <div className="p-2 border-b border-border">
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8"
              autoFocus
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <span className="text-sm text-muted-foreground">Loading services...</span>
              </div>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.serviceCode}
                  type="button"
                  onClick={() => {
                    onSelect(option.serviceCode, option.serviceName);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{option.serviceName}</div>
                    <div className="text-xs text-muted-foreground">{option.serviceCode}</div>
                  </div>
                  {value === option.serviceCode && <span className="text-xs">✓</span>}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-muted-foreground text-center">
                No services found
              </div>
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
  const [filterCloudProvider, setFilterCloudProvider] = useState<string>('all'); // New state for cloud filter
  const [requests, setRequests] = useState<APIRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<APIRequest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resourceTypes, setResourceTypes] = useState<AWSService[]>([]);
  const [awsServices, setAwsServices] = useState<AWSService[]>([]);
  const [isLoadingAWSServices, setIsLoadingAWSServices] = useState(false);
  const [customResources, setCustomResources] = useState<{ [key: string]: string[] }>({});
  const [showAWSServicesDropdown, setShowAWSServicesDropdown] = useState(false);
  const [userExistingAccess, setUserExistingAccess] = useState<Record<string, string[]>>({});
  const [selectedProvider] = useState('all');
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { cloudProvider, setCloudProvider } = useCloudProvider();

  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cloud: '',
      resourceType: '',
      accessLevel: '',
      manager: '',
      justification: '',
    },
  });

  // Static data
  const cloudProviders = [
    { id: 'AWS', name: 'Amazon Web Services' },
    { id: 'Azure', name: 'Microsoft Azure' },
    { id: 'GCP', name: 'Google Cloud Platform' },
  ];

  const resourceTypeLabels: { [key: string]: string } = {
    s3: 'S3 Bucket',
    ec2: 'EC2 Instance',
    rds: 'RDS Database',
    vm: 'Virtual Machine',
    storage: 'Storage Account',
    compute: 'Compute Engine',
  };

  const accessLevels = ['read', 'write'];
  const accessLevelLabels: { [key: string]: string } = {
    read: 'Read',
    write: 'Write',
  };

  const userRoles = [
    { id: 'manager', credentials: { username: 'sudheer_bellamkonda' } },
    { id: 'manager', credentials: { username: 'muthyam_harshitha' } },
    { id: 'manager', credentials: { username: 'shreya_gattikoppula' } },
  ];

  const fallbackResourceTypes: { [key: string]: string[] } = {
    // aws: ['s3', 'ec2', 'rds'],
    Azure: ['vm', 'storage'],
    GCP: ['compute', 'storage'],
  };

  // Helper function to capitalize first letter of service name
  const capitalizeService = (serviceName: string) => {
    return serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
  };

  // Fetch resource types from API
  const fetchResourceTypes = async (cloudProviderParam?: string) => {
    const targetCloudProvider = cloudProviderParam || form.getValues('cloud');
    if (!targetCloudProvider) {
      setResourceTypes([]);
      return;
    }

    // Only fetch for AWS, as mentioned in requirements
    if (targetCloudProvider !== 'AWS') {
      const fallbackServices = (fallbackResourceTypes[targetCloudProvider] || []).map((service: string) => ({
        serviceName: resourceTypeLabels[service.toLowerCase()] || service,
        serviceCode: service.toLowerCase().replace(/\s+/g, '-'),
      }));
      setResourceTypes(fallbackServices);
      return;
    }

    setIsLoading(true);
    try {
      const email = localStorage.getItem('email');
      if (!email) {
        throw new Error('Email not found in localStorage');
      }

      const response = await fetch(
        `https://hnqj1wzgmi.execute-api.ap-south-1.amazonaws.com/listservices?email=${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error response body:', errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const services = data.services || fallbackResourceTypes[targetCloudProvider] || [];
      const mappedServices: AWSService[] = services.map((service: string) => ({
        serviceName: resourceTypeLabels[service.toLowerCase()] || service,
        serviceCode: service.toLowerCase().replace(/\s+/g, '-'),
      }));
      setResourceTypes(mappedServices);
    } catch (error) {
      console.error('Failed to fetch resource types:', error);
      const fallbackServices = (fallbackResourceTypes[targetCloudProvider] || []).map((service: string) => ({
        serviceName: resourceTypeLabels[service.toLowerCase()] || service,
        serviceCode: service.toLowerCase().replace(/\s+/g, '-'),
      }));
      setResourceTypes(fallbackServices);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch AWS services for "Create new resource..."
  const fetchAWSServices = async () => {
    setIsLoadingAWSServices(true);
    try {
      const response = await fetch('https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/index.json');
      if (!response.ok) {
        throw new Error('Failed to fetch AWS services');
      }
      
      const data = await response.json();
      const services: AWSService[] = [];
      
      if (data.offers) {
        Object.entries(data.offers).forEach(([serviceCode, serviceData]: [string, any]) => {
          if (serviceData && typeof serviceData === 'object') {
            let serviceName = serviceCode;
            if (serviceData.serviceName) {
              serviceName = serviceData.serviceName;
            } else if (serviceData.name) {
              serviceName = serviceData.name;
            } else if (serviceData.displayName) {
              serviceName = serviceName;
            } else if (serviceData.description) {
              serviceName = serviceData.description;
            }
            services.push({
              serviceCode: serviceCode,
              serviceName: serviceName,
            });
          }
        });
      }
      
      const uniqueServices = services.filter((service, index, self) => 
        index === self.findIndex(s => s.serviceCode === service.serviceCode)
      );
      
      uniqueServices.sort((a, b) => a.serviceName.localeCompare(b.serviceName));
      setAwsServices(uniqueServices);
      
      if (uniqueServices.length === 0) {
        throw new Error('No services found in API response');
      }
    } catch (error) {
      console.error('Error fetching AWS services:', error);
      setAwsServices([
        { serviceCode: 'AmazonS3', serviceName: 'Amazon Simple Storage Service (S3)' },
        { serviceCode: 'AmazonEC2', serviceName: 'Amazon Elastic Compute Cloud (EC2)' },
        { serviceCode: 'AmazonRDS', serviceName: 'Amazon Relational Database Service (RDS)' },
        { serviceCode: 'AWSLambda', serviceName: 'AWS Lambda' },
        { serviceCode: 'AmazonVPC', serviceName: 'Amazon Virtual Private Cloud (VPC)' },
        { serviceCode: 'AmazonCloudFront', serviceName: 'Amazon CloudFront' },
        { serviceCode: 'AmazonRoute53', serviceName: 'Amazon Route 53' },
        { serviceCode: 'AmazonDynamoDB', serviceName: 'Amazon DynamoDB' },
        { serviceCode: 'AmazonSNS', serviceName: 'Amazon Simple Notification Service (SNS)' },
        { serviceCode: 'AmazonSQS', serviceName: 'Amazon Simple Queue Service (SQS)' },
        { serviceCode: 'AmazonEKS', serviceName: 'Amazon Elastic Kubernetes Service (EKS)' },
        { serviceCode: 'AmazonECS', serviceName: 'Amazon Elastic Container Service (ECS)' },
        { serviceCode: 'AWSCloudFormation', serviceName: 'AWS CloudFormation' },
        { serviceCode: 'AmazonCloudWatch', serviceName: 'Amazon CloudWatch' },
        { serviceCode: 'AWSIAM', serviceName: 'AWS Identity and Access Management (IAM)' },
        { serviceCode: 'AmazonKinesis', serviceName: 'Amazon Kinesis' },
        { serviceCode: 'AmazonRedshift', serviceName: 'Amazon Redshift' },
        { serviceCode: 'AmazonElastiCache', serviceName: 'Amazon ElastiCache' },
        { serviceCode: 'AWSGlue', serviceName: 'AWS Glue' },
        { serviceCode: 'AmazonSageMaker', serviceName: 'Amazon SageMaker' },
        { serviceCode: 'AWSStepFunctions', serviceName: 'AWS Step Functions' },
        { serviceCode: 'AmazonAPIGateway', serviceName: 'Amazon API Gateway' },
        { serviceCode: 'AWSAppSync', serviceName: 'AWS AppSync' },
        { serviceCode: 'AmazonCognito', serviceName: 'Amazon Cognito' },
        { serviceCode: 'AWSSecretsManager', serviceName: 'AWS Secrets Manager' },
        { serviceCode: 'AWSKMS', serviceName: 'AWS Key Management Service (KMS)' },
        { serviceCode: 'AWSConfig', serviceName: 'AWS Config' },
        { serviceCode: 'AWSCloudTrail', serviceName: 'AWS CloudTrail' },
        { serviceCode: 'AmazonGuardDuty', serviceName: 'Amazon GuardDuty' },
        { serviceCode: 'AWSSecurityHub', serviceName: 'AWS Security Hub' },
      ]);
    } finally {
      setIsLoadingAWSServices(false);
    }
  };

  // Fetch requests and build userExistingAccess
  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      setError(null);
      const fullName = localStorage.getItem('fullName');
      const userRole = localStorage.getItem('role');

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
          const filteredRequests = userRole === 'Manager'
            ? data.requests
            : data.requests.filter((req: APIRequest) => req.Username === fullName);
          setRequests(filteredRequests);

          // Build access map
          const accessMap: Record<string, string[]> = {};
          for (const req of filteredRequests) {
            if (req.Status === 'applied') {
              const service = req.Service.toLowerCase();
              const access = req.AccessLevel?.toLowerCase();
              if (accessMap[service]) {
                if (!accessMap[service].includes(access)) {
                  accessMap[service].push(access);
                }
              } else {
                accessMap[service] = [access];
              }
            }
          }
          setUserExistingAccess(accessMap);
        }
      } catch (error: any) {
        console.error('Error fetching requests:', error);
        setError(error.message || 'Error loading requests. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Sync form cloud provider with context cloudProvider and fetch resource types
  useEffect(() => {
    if (cloudProvider && cloudProvider !== 'all') {
      form.setValue('cloud', cloudProvider);
      form.setValue('resourceType', ''); // Reset resource type when cloud changes
      fetchResourceTypes(cloudProvider);
    } else if (form.getValues('cloud')) {
      fetchResourceTypes();
    } else {
      setResourceTypes([]);
    }
  }, [cloudProvider, form]);

  // Fetch resource types when cloud provider changes in form
  useEffect(() => {
    const currentCloud = form.getValues('cloud');
    if (currentCloud) {
      fetchResourceTypes(currentCloud);
    } else {
      setResourceTypes([]);
    }
  }, [form.watch('cloud')]);

  // Handle initial filter from navigation state
  useEffect(() => {
    if (location.state?.filterStatus) {
      setFilterStatus(location.state.filterStatus);
    }
  }, [location.state]);

  const getResourceOptions = () => {
    if (!form.getValues('cloud')) return [];
    const apiTypes = resourceTypes.map(service => service.serviceCode);
    const customTypes = customResources[form.getValues('cloud')] || [];
    return [...apiTypes, ...customTypes];
  };

  const handleCreateNewResource = () => {
    if (form.getValues('cloud') === 'AWS') {
      setShowAWSServicesDropdown(true);
      if (awsServices.length === 0) {
        fetchAWSServices();
      }
    } else {
      const customService = prompt('Enter custom service name:');
      if (customService && customService.trim()) {
        const serviceCode = customService.trim().toLowerCase().replace(/\s+/g, '-');
        setCustomResources(prev => ({
          ...prev,
          [form.getValues('cloud')]: [...(prev[form.getValues('cloud')] || []), serviceCode],
        }));
        resourceTypeLabels[serviceCode] = customService.trim();
        form.setValue('resourceType', serviceCode);
      }
    }
  };

  const handleAWSServiceSelect = (serviceCode: string, serviceName: string) => {
    setCustomResources(prev => ({
      ...prev,
      [form.getValues('cloud')]: [...(prev[form.getValues('cloud')] || []), serviceCode],
    }));
    resourceTypeLabels[serviceCode] = serviceName;
    form.setValue('resourceType', serviceCode);
    setShowAWSServicesDropdown(false);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const requestBody = {
        Username: localStorage.getItem('fullName'),
        Cloud: data.cloud,
        Service: data.resourceType,
        AccessLevel: data.accessLevel,
        Role: localStorage.getItem('role'),
        Manager: data.manager,
        Reason: data.justification,
      };

      const response = await fetch(
        'https://lp6t2xn0q4.execute-api.ap-south-1.amazonaws.com/prod/request_access',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log('Request submitted successfully:', responseData);
        alert('Request submitted successfully!');
        form.reset();
        setShowAWSServicesDropdown(false);
        setIsNewRequestOpen(false);
        window.location.reload();
      } else {
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

  // Updated filtering function to include cloud provider filter
  const getFilteredRequests = (): APIRequest[] => {
    let filtered = requests;

    if (searchTerm) {
      filtered = filtered.filter(
        (request) =>
          request.Service.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.RequestID.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.Reason.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((request) => request.Status === filterStatus);
    }

    // Add cloud provider filtering
    if (cloudProvider !== 'all') {
      filtered = filtered.filter((request) => request.Cloud.toLowerCase() === cloudProvider.toLowerCase());
    }

    filtered.sort((a, b) => {
      return new Date(b.RequestTime).getTime() - new Date(a.RequestTime).getTime();
    });

    return filtered;
  };

  const filteredRequests = getFilteredRequests();

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
      minute: '2-digit',
    });
  };

  if (isLoading && !requests.length) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading request history...</p>
        </div>
      </div>
    );
  }

  if (error && !requests.length) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-xl">!</span>
          </div>
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
      {/* Updated Filters with Cloud Provider Filter */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by service, username, request ID, or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm min-w-[120px]"
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
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Cloud Provider */}
                      <FormField
                        control={form.control}
                        name="cloud"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cloud Provider</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                form.setValue('resourceType', '');
                                setShowAWSServicesDropdown(false);
                              }}
                              value={field.value}
                              disabled={cloudProvider !== 'all'}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select provider" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {cloudProviders.map((provider) => (
                                  <SelectItem key={provider.id} value={provider.id}>
                                    {provider.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Resource Type */}
                      <FormField
                        control={form.control}
                        name="resourceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Resource Type</FormLabel>
                            {!showAWSServicesDropdown ? (
                              <Select
                                onValueChange={(value) => {
                                  if (value === '__create_new__') {
                                    handleCreateNewResource();
                                  } else {
                                    field.onChange(value);
                                  }
                                }}
                                value={field.value}
                                disabled={!form.getValues('cloud') || isLoading}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder={isLoading ? 'Loading resources...' : 'Select resource type'} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {getResourceOptions().length > 0 ? (
                                    getResourceOptions().map((type) => (
                                      <SelectItem value={type} key={type}>
                                        {resourceTypes.find(service => service.serviceCode === type)?.serviceName || resourceTypeLabels[type] || type}
                                      </SelectItem>
                                    ))
                                  ) : (
                                    <SelectItem value="none" disabled>
                                      No resources available
                                    </SelectItem>
                                  )}
                                  {/* Only show "Create new resource" option for AWS */}
                                  {form.getValues('cloud') === 'AWS' && (
                                    <SelectItem value="__create_new__" key="__create_new__">
                                      + Create new resource...
                                    </SelectItem>
                                  )}
                                  {/* For non-AWS providers, show simple create option */}
                                  {form.getValues('cloud') && form.getValues('cloud') !== 'AWS' && (
                                    <SelectItem value="__create_new__" key="__create_new__">
                                      + Create new resource...
                                    </SelectItem>
                                  )}
                                </SelectContent>
                              </Select>
                            ) : (
                              <div className="space-y-2">
                                <SearchableDropdown
                                  options={awsServices}
                                  value={field.value}
                                  onSelect={handleAWSServiceSelect}
                                  placeholder="Search AWS services..."
                                  isLoading={isLoadingAWSServices}
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setShowAWSServicesDropdown(false)}
                                >
                                  Back to basic resources
                                </Button>
                              </div>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Access Level */}
                      <FormField
                        control={form.control}
                        name="accessLevel"
                        render={({ field }) => {
                          const alreadyGranted = userExistingAccess[form.getValues('resourceType')?.toLowerCase()] || [];
                          return (
                            <FormItem>
                              <FormLabel>Access Level</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select access level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {accessLevels.map((level) => (
                                    <SelectItem
                                      key={level}
                                      value={level}
                                      disabled={alreadyGranted.includes(level)}
                                    >
                                      {accessLevelLabels[level]}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      {/* Manager */}
                      <FormField
                        control={form.control}
                        name="manager"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Manager</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select manager" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {userRoles.map((manager) => (
                                  <SelectItem key={manager.credentials.username} value={manager.credentials.username}>
                                    {manager.credentials.username}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Justification */}
                      <FormField
                        control={form.control}
                        name="justification"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Justification</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Explain the reason for access"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsNewRequestOpen(false);
                          setShowAWSServicesDropdown(false);
                          form.reset();
                        }}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-primary hover:bg-primary/90"
                      >
                        {isLoading ? 'Submitting...' : 'Submit Request'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>

      {/* Requests Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Service</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Cloud</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Access Level</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Requested</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request, index) => (
                <tr key={request.RequestID} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">
                      {capitalizeService(request.Service)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-600 uppercase text-sm">
                      {request.Cloud}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="secondary" className="text-xs">
                      {request.AccessLevel}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(request.Status)}
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-600 text-sm">
                      {formatDate(request.RequestTime)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewRequest(request)}
                      className="text-sm"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">📄</span>
            </div>
            <p className="text-gray-500 mb-4">No requests found matching your criteria.</p>
            {filterStatus !== 'all' && (
              <Button
                variant="outline"
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
          <Card className="w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4"
              onClick={handleCloseModal}
            >
              ×
            </Button>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Request Details</h2>
              <div className="mb-4">
                {getStatusBadge(selectedRequest.Status)}
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Request ID</Label>
                  <div className="p-3 bg-gray-100 rounded-lg font-mono text-sm">
                    {selectedRequest.RequestID}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Username</Label>
                  <div className="p-3 bg-gray-100 rounded-lg text-sm">
                    {selectedRequest.Username}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Cloud Provider</Label>
                  <div className="p-3 bg-gray-100 rounded-lg text-sm uppercase">
                    {selectedRequest.Cloud}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Service</Label>
                  <div className="p-3 bg-gray-100 rounded-lg text-sm">
                    {capitalizeService(selectedRequest.Service)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Access Level</Label>
                  <div className="p-3 bg-gray-100 rounded-lg text-sm">
                    <Badge variant="secondary">{selectedRequest.AccessLevel}</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Manager</Label>
                  <div className="p-3 bg-gray-100 rounded-lg text-sm">
                    {selectedRequest.Manager}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Reason</Label>
                <div className="p-3 bg-gray-100 rounded-lg text-sm">
                  {selectedRequest.Reason}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Request Time</Label>
                  <div className="p-3 bg-gray-100 rounded-lg text-sm">
                    {formatDate(selectedRequest.RequestTime)}
                  </div>
                </div>
                {selectedRequest.ApplicationTime && (
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Application Time</Label>
                    <div className="p-3 bg-gray-100 rounded-lg text-sm">
                      {formatDate(selectedRequest.ApplicationTime)}
                    </div>
                  </div>
                )}
              </div>

              {selectedRequest.PolicyExpiry && (
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Policy Expiry</Label>
                  <div className="p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-sm">
                    {formatDate(selectedRequest.PolicyExpiry)}
                  </div>
                </div>
              )}

              {selectedRequest.Policy && (
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Policy Details</Label>
                  <div className="p-3 bg-gray-100 rounded-lg text-xs font-mono max-h-40 overflow-y-auto">
                    <pre>{JSON.stringify(selectedRequest.Policy, null, 2)}</pre>
                  </div>
                </div>
              )}
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