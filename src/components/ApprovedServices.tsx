import React, { useState } from 'react';
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
} from 'lucide-react';
import { recentRequests, cloudProviders } from '../mock/data';

// Interface for RecentRequest
interface RecentRequest {
  id: string;
  title: string;
  user: string;
  requester: string;
  service: string;
  cloud: string;
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

interface ApprovedServicesPageProps {
  selectedProvider: string;
}

const ApprovedServicesPage: React.FC<ApprovedServicesPageProps> = ({ selectedProvider }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [providerFilter, setProviderFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewingRequest, setViewingRequest] = useState<RecentRequest | null>(null);

  // Filter only approved requests
  const approvedRequests = recentRequests.filter(request => request.status === 'approved');

  const filteredServices = approvedRequests.filter(request => {
    const matchesSearch =
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.cloud.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.accesslevel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProvider = providerFilter === 'all' || request.cloud === providerFilter;
    const matchesSelectedProvider = selectedProvider === 'all' || request.cloud === selectedProvider;
    return matchesSearch && matchesProvider && matchesSelectedProvider;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime();
      case 'oldest':
        return new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime();
      case 'cost-high':
        return b.estimatedCost - a.estimatedCost;
      case 'cost-low':
        return a.estimatedCost - b.estimatedCost;
      default:
        return 0;
    }
  });

  const getProviderColor = (provider: string) => {
    switch (provider) {
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
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const totalApprovedCost = sortedServices.reduce((sum, service) => sum + service.estimatedCost, 0);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Services</p>
              <p className="text-2xl font-bold">{sortedServices.length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Access</p>
              <p className="text-2xl font-bold">{Math.floor(sortedServices.length * 0.9)}</p>
            </div>
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Cost</p>
              <p className="text-2xl font-bold">${totalApprovedCost.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold">
                {
                  sortedServices.filter(s => 
                    new Date(s.requestDate).getMonth() === new Date().getMonth() &&
                    new Date(s.requestDate).getFullYear() === new Date().getFullYear()
                  ).length
                }
              </p>
            </div>
            <Calendar className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
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
          <div className="flex gap-2">
            <Select value={providerFilter} onValueChange={setProviderFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Cloud Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                {cloudProviders.map(provider => (
                  <SelectItem key={provider.id} value={provider.id}>
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="cost-high">Cost: High to Low</SelectItem>
                <SelectItem value="cost-low">Cost: Low to High</SelectItem>
              </SelectContent>
            </Select> */}
            
          </div>
        </div>
      </Card>

      {/* Services Table */}
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
            {sortedServices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No approved services found
                </TableCell>
              </TableRow>
            ) : (
              sortedServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getProviderColor(service.cloud)}>
                      {service.cloud.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{service.service}</TableCell>
                  <TableCell>{service.accesslevel}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(service.status)}>
                      {getStatusIcon(service.status)}
                      <span className="ml-1">{service.status.toUpperCase()}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>{service.requestDate}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setViewingRequest(service)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
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
              <p><strong>Cloud:</strong> {viewingRequest.cloud.toUpperCase()}</p>
              <p><strong>Resource Type:</strong> {viewingRequest.service}</p>
              <p><strong>Access Level:</strong> {viewingRequest.accesslevel}</p>
              <p><strong>Status:</strong> {viewingRequest.status.toUpperCase()}</p>
              <p><strong>Description:</strong> {viewingRequest.description}</p>
              <p><strong>Request Date:</strong> {viewingRequest.requestDate}</p>
              <p><strong>Title:</strong> {viewingRequest.title || 'N/A'}</p>
              <p><strong>User:</strong> {viewingRequest.user || 'N/A'}</p>
              <p><strong>Requester:</strong> {viewingRequest.requester || 'N/A'}</p>
              <p><strong>Created At:</strong> {viewingRequest.createdAt ? new Date(viewingRequest.createdAt).toLocaleString() : 'N/A'}</p>
              <p><strong>Estimated Cost:</strong> ${viewingRequest.estimatedCost.toLocaleString()}</p>
              <p><strong>Rejection Reason:</strong> {viewingRequest.rejectionReason || 'N/A'}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApprovedServicesPage;