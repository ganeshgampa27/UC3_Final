// import React, { useState } from 'react';
// import { Button } from './ui/button';
// import { Card } from './ui/card';
// import { Badge } from './ui/badge';
// import { Input } from './ui/input';
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
// } from 'lucide-react';
// import { mockRequests } from '../mock/data';

// // Interfaces
// interface User {
//   id: string;
//   name: string;
//   username: string;
//   permissions: string[];
// }

// interface Request {
//   id: string;
//   title: string;
//   description: string;
//   requester: string;
//   provider: string;
//   status: 'approved' | 'pending' | 'rejected';
//   estimatedCost: number;
//   createdAt: string;
// }

// interface RequestHistoryPageProps {
//   currentUser: User;
//   selectedProvider: string;
// }

// interface InfoBlockProps {
//   label: string;
//   value: string;
//   multiline?: boolean;
// }

// const RequestHistoryPage: React.FC<RequestHistoryPageProps> = ({ currentUser, selectedProvider }) => {
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [filterStatus, setFilterStatus] = useState<string>('all');
//   const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'cost'>('newest');
//   const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

//   const InfoBlock: React.FC<InfoBlockProps> = ({ label, value, multiline = false }) => (
//     <div>
//       <h3 className="text-sm font-medium text-gray-500 uppercase">{label}</h3>
//       <p className={`mt-1 text-gray-900 ${multiline ? 'whitespace-pre-line' : 'font-medium'}`}>
//         {value}
//       </p>
//     </div>
//   );

//   const getFilteredRequests = (): Request[] => {
//     let filtered = mockRequests as Request[];

//     if (selectedProvider !== 'all') {
//       filtered = filtered.filter((request) => request.provider === selectedProvider);
//     }

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (request) =>
//           request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           request.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           request.id.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (filterStatus !== 'all') {
//       filtered = filtered.filter((request) => request.status === filterStatus);
//     }

//     filtered.sort((a, b) => {
//       if (sortBy === 'newest') {
//         return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//       } else if (sortBy === 'oldest') {
//         return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
//       } else if (sortBy === 'cost') {
//         return b.estimatedCost - a.estimatedCost;
//       }
//       return 0;
//     });

//     return filtered;
//   };

//   const filteredRequests = getFilteredRequests();

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'approved':
//         return <CheckCircle className="w-4 h-4 text-cloud-emerald" />;
//       case 'rejected':
//         return <XCircle className="w-4 h-4 text-cloud-red" />;
//       default:
//         return <Clock className="w-4 h-4 text-cloud-orange" />;
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     const statusConfig: {
//       [key: string]: { color: string; label: string };
//     } = {
//       approved: { color: 'text-cloud-emerald border-cloud-emerald', label: 'Approved' },
//       rejected: { color: 'text-cloud-red border-cloud-red', label: 'Rejected' },
//       pending: { color: 'text-cloud-orange border-cloud-orange', label: 'Pending' },
//     };

//     const config = statusConfig[status] || statusConfig.pending;
//     return (
//       <Badge variant="outline" className={`text-xs ${config.color}`}>
//         {config.label}
//       </Badge>
//     );
//   };

//   const handleViewClick = (request: Request) => {
//     setSelectedRequest(request);
//   };

//   const closeModal = () => {
//     setSelectedRequest(null);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Requests</p>
//               <p className="text-2xl font-bold">{filteredRequests.length}</p>
//             </div>
//             <FileText className="w-8 h-8 text-cloud-blue" />
//           </div>
//         </Card>
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Approved</p>
//               <p className="text-2xl font-bold">
//                 {filteredRequests.filter((r) => r.status === 'approved').length}
//               </p>
//             </div>
//             <CheckCircle className="w-8 h-8 text-cloud-emerald" />
//           </div>
//         </Card>
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Pending</p>
//               <p className="text-2xl font-bold">
//                 {filteredRequests.filter((r) => r.status === 'pending').length}
//               </p>
//             </div>
//             <Clock className="w-8 h-8 text-cloud-orange" />
//           </div>
//         </Card>
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Rejected</p>
//               <p className="text-2xl font-bold">
//                 {filteredRequests.filter((r) => r.status === 'rejected').length}
//               </p>
//             </div>
//             <XCircle className="w-8 h-8 text-cloud-red" />
//           </div>
//         </Card>
//       </div>

//       {/* Filters */}
//       <Card className="p-4">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search requests..."
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
//               <option value="approved">Approved</option>
//               <option value="pending">Pending</option>
//               <option value="rejected">Rejected</option>
//             </select>
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'cost')}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
//             >
//               <option value="newest">Newest First</option>
//               <option value="oldest">Oldest First</option>
//               <option value="cost">Highest Cost</option>
//             </select>
//           </div>
//         </div>
//       </Card>

//       {/* Requests Table */}
//       <Card className="p-6">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Title
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Requester
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Provider
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
                
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredRequests.map((request) => (
//                 <tr key={request.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {request.id}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {request.title}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <div className="flex items-center">
//                       <User className="w-4 h-4 mr-1" />
//                       {request.requester}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
//                     {request.provider}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <div className="flex items-center space-x-2">
//                       {getStatusIcon(request.status)}
//                       {getStatusBadge(request.status)}
//                     </div>
//                   </td>
                  
//                   {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 mr-1" />
//                       {new Date(request.createdAt).toLocaleDateString()}
//                     </div>
//                   </td> */}
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => handleViewClick(request)}
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

//       {/* Modal Popup */}
//       {selectedRequest && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto">
//             {/* Header */}
//             <div className="flex justify-between items-center border-b pb-4 mb-6">
//               <h2 className="text-2xl font-semibold text-gray-800">Request Details</h2>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={closeModal}
//                 className="text-gray-600 hover:bg-gray-100"
//               >
//                 <X className="w-5 h-5" />
//               </Button>
//             </div>

//             {/* Info Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <InfoBlock label="Request ID" value={selectedRequest.id} />
//               <InfoBlock label="Title" value={selectedRequest.title} />
//               <div className="md:col-span-2">
//                 <InfoBlock label="Description" value={selectedRequest.description} multiline />
//               </div>
//               <div>
//                 <h3 className="text-sm font-medium text-gray-500 uppercase">Status</h3>
//                 <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
//               </div>
//               <InfoBlock label="Requester" value={selectedRequest.requester} />
//               <InfoBlock label="Provider" value={selectedRequest.provider} />
//               <InfoBlock
//                 label="Estimated Cost"
//                 value={`$${selectedRequest.estimatedCost.toFixed(2)}`}
//               />
//               <InfoBlock
//                 label="Created At"
//                 value={new Date(selectedRequest.createdAt).toLocaleString()}
//               />
//             </div>

//             {/* Footer */}
//             <div className="mt-8 flex justify-end">
//               <Button
//                 variant="outline"
//                 onClick={closeModal}
//                 className="border-gray-300 text-gray-700 hover:bg-gray-100"
//               >
//                 Close
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RequestHistoryPage;






































import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
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
  Edit3
} from 'lucide-react';
import { mockRequests } from '../mock/data';

// Interfaces
interface User {
  id: string;
  name: string;
  username: string;
  permissions: string[];
}

interface Request {
  id: string;
  title: string;
  description: string;
  requester: string;
  provider: string;
  status: 'approved' | 'pending' | 'rejected';
  estimatedCost: number;
  createdAt: string;
}

interface RequestHistoryPageProps {
  currentUser: User;
  selectedProvider: string;
}

const RequestHistoryPage: React.FC<RequestHistoryPageProps> = ({ currentUser, selectedProvider }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'cost'>('newest');
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [editRequest, setEditRequest] = useState<Request | null>(null);

  const getFilteredRequests = (): Request[] => {
    let filtered = requests;

    if (selectedProvider !== 'all') {
      filtered = filtered.filter((request) => request.provider === selectedProvider);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (request) =>
          request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((request) => request.status === filterStatus);
    }

    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === 'cost') {
        return b.estimatedCost - a.estimatedCost;
      }
      return 0;
    });

    return filtered;
  };

  const filteredRequests = getFilteredRequests();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-cloud-emerald" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-cloud-red" />;
      default:
        return <Clock className="w-4 h-4 text-cloud-orange" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: {
      [key: string]: { color: string; label: string };
    } = {
      approved: { color: 'text-cloud-emerald border-cloud-emerald', label: 'Approved' },
      rejected: { color: 'text-cloud-red border-cloud-red', label: 'Rejected' },
      pending: { color: 'text-cloud-orange border-cloud-orange', label: 'Pending' },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Badge variant="outline" className={`text-xs ${config.color}`}>
        {config.label}
      </Badge>
    );
  };

  const handleEditClick = (request: Request) => {
    setEditRequest({ ...request });
  };

  const handleEditRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editRequest) return;

    setRequests(
      requests.map((request) =>
        request.id === editRequest.id ? { ...editRequest } : request
      )
    );
    setEditRequest(null);
  };

  const handleCancel = () => {
    setEditRequest(null);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold">{filteredRequests.length}</p>
            </div>
            <FileText className="w-8 h-8 text-cloud-blue" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold">
                {filteredRequests.filter((r) => r.status === 'approved').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-cloud-emerald" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold">
                {filteredRequests.filter((r) => r.status === 'pending').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-cloud-orange" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold">
                {filteredRequests.filter((r) => r.status === 'rejected').length}
              </p>
            </div>
            <XCircle className="w-8 h-8 text-cloud-red" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'cost')}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="cost">Highest Cost</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Requests Table */}
      <Card className="p-6">
        <div className="w-full">
          <table className="table-auto w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requester
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-500 truncate max-w-[100px]">
                    {request.id}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 truncate max-w-[200px]">
                    {request.title}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 truncate max-w-[150px]">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {request.requester}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 capitalize truncate max-w-[100px]">
                    {request.provider}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(request.status)}
                      {getStatusBadge(request.status)}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(request)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
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
          </div>
        )}
      </Card>

      {/* Edit Modal */}
      {editRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg p-6 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleCancel}
            >
              <X className="w-4 h-4" />
            </Button>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Request</h2>
            <form onSubmit={handleEditRequest} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-id" className="text-gray-700">
                    Request ID
                  </Label>
                  <Input
                    id="edit-id"
                    type="text"
                    value={editRequest.id}
                    disabled
                    className="h-10 border-gray-300 bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-title" className="text-gray-700">
                    Title
                  </Label>
                  <Input
                    id="edit-title"
                    type="text"
                    value={editRequest.title}
                    onChange={(e) =>
                      setEditRequest({ ...editRequest, title: e.target.value })
                    }
                    placeholder="Enter title"
                    className="h-10 border-gray-300 focus:border-cloud-purple focus:ring-cloud-purple"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description" className="text-gray-700">
                  Description
                </Label>
                <Input
                  id="edit-description"
                  type="text"
                  value={editRequest.description}
                  onChange={(e) =>
                    setEditRequest({ ...editRequest, description: e.target.value })
                  }
                  placeholder="Enter description"
                  className="h-10 border-gray-300 focus:border-cloud-purple focus:ring-cloud-purple"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-provider" className="text-gray-700">
                    Provider
                  </Label>
                  <select
                    id="edit-provider"
                    value={editRequest.provider}
                    onChange={(e) =>
                      setEditRequest({ ...editRequest, provider: e.target.value })
                    }
                    className="w-full h-10 border border-gray-300 rounded-lg text-sm focus:border-cloud-purple focus:ring-cloud-purple"
                  >
                    <option value="all">All</option>
                    <option value="aws">AWS</option>
                    <option value="azure">Azure</option>
                    <option value="gcp">GCP</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status" className="text-gray-700">
                    Status
                  </Label>
                  <select
                    id="edit-status"
                    value={editRequest.status}
                    onChange={(e) =>
                      setEditRequest({ ...editRequest, status: e.target.value as Request['status'] })
                    }
                    className="w-full h-10 border border-gray-300 rounded-lg text-sm focus:border-cloud-purple focus:ring-cloud-purple"
                  >
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-estimatedCost" className="text-gray-700">
                  Estimated Cost ($)
                </Label>
                <Input
                  id="edit-estimatedCost"
                  type="number"
                  value={editRequest.estimatedCost}
                  onChange={(e) =>
                    setEditRequest({ ...editRequest, estimatedCost: Number(e.target.value) })
                  }
                  placeholder="Enter estimated cost"
                  className="h-10 border-gray-300 focus:border-cloud-purple focus:ring-cloud-purple"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-cloud-purple text-white hover:bg-cloud-purple-600"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RequestHistoryPage;