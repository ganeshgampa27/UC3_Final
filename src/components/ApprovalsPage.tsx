import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  Search, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  AlertCircle,
  DollarSign
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface ApprovalsPageProps {
  currentUser: any;
  selectedProvider: string;
}

const ApprovalsPage: React.FC<ApprovalsPageProps> = ({ currentUser, selectedProvider }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [approvalComment, setApprovalComment] = useState('');

  const mockPendingRequests = [
    {
      id: 'REQ-005',
      requester: 'Alice Johnson',
      requesterEmail: 'alice.johnson@company.com',
      service: 'AWS EC2',
      provider: 'aws',
      description: 'High-performance compute instance for machine learning workloads',
      justification: 'Need additional compute power for training ML models. Current instances are insufficient for the dataset size.',
      estimatedCost: '$350/month',
      submittedDate: '2024-01-16',
      priority: 'high',
      AccessLevel: 'Read-Only'
    },
    {
      id: 'REQ-006',
      requester: 'Bob Smith',
      requesterEmail: 'bob.smith@company.com',
      service: 'Azure Cosmos DB',
      provider: 'azure',
      description: 'NoSQL database for real-time analytics',
      justification: 'Replacing legacy database to improve performance and enable real-time analytics for customer insights.',
      estimatedCost: '$200/month',
      submittedDate: '2024-01-15',
      priority: 'medium',
      AccessLevel: 'Read-Write'
    },
    {
      id: 'REQ-007',
      requester: 'Carol Davis',
      requesterEmail: 'carol.davis@company.com',
      service: 'GCP BigQuery',
      provider: 'gcp',
      description: 'Data warehouse for analytics',
      justification: 'Need to migrate from on-premise data warehouse to cloud for better scalability and performance.',
      estimatedCost: '$180/month',
      submittedDate: '2024-01-14',
      priority: 'low',
      AccessLevel: 'Full Access'
    },
    {
      id: 'REQ-008',
      requester: 'David Wilson',
      requesterEmail: 'david.wilson@company.com',
      service: 'AWS Lambda Functions',
      provider: 'aws',
      description: 'Serverless functions for API processing',
      justification: 'Migrating from monolithic architecture to serverless to reduce costs and improve scalability.',
      estimatedCost: '$75/month',
      submittedDate: '2024-01-13',
      priority: 'medium',
      AccessLevel: 'Read-Only'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-orange-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'aws':
        return 'bg-orange-500';
      case 'azure':
        return 'bg-blue-500';
      case 'gcp':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredRequests = mockPendingRequests.filter(request => {
    const matchesSearch = request.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.AccessLevel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvider = selectedProvider === 'all' || request.provider === selectedProvider;
    return matchesSearch && matchesProvider;
  });

  const handleApprove = (request: any) => {
    console.log('Approving request:', request.id, 'Comment:', approvalComment);
    setSelectedRequest(null);
    setApprovalComment('');
  };

  const handleReject = (request: any) => {
    console.log('Rejecting request:', request.id, 'Comment:', approvalComment);
    setSelectedRequest(null);
    setApprovalComment('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pending Approvals</h1>
        <p className="text-muted-foreground">
          Review and approve team service requests
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-xl font-bold text-foreground">{mockPendingRequests.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="text-xl font-bold text-foreground">
                  {mockPendingRequests.filter(r => r.priority === 'high').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Cost</p>
                <p className="text-xl font-bold text-foreground">
                  ${mockPendingRequests.reduce((sum, r) => sum + parseInt(r.estimatedCost.replace(/[^\d]/g, '')), 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Wait Time</p>
                <p className="text-xl font-bold text-foreground">2.3 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search pending requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-medium transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-sm font-mono text-muted-foreground">
                      {request.id}
                    </span>
                    <Badge className={getPriorityColor(request.priority)}>
                      {request.priority} priority
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <div className={`w-3 h-3 rounded-full ${getProviderColor(request.provider)}`} />
                      <span className="text-xs text-muted-foreground uppercase">
                        {request.provider}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {request.service}
                  </h3>
                  
                  <p className="text-muted-foreground mb-3">
                    {request.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-foreground">Requester:</span>
                      <br />
                      <span className="text-muted-foreground">{request.requester}</span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Access Level:</span>
                      <br />
                      <span className="text-muted-foreground">{request.AccessLevel}</span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Submitted:</span>
                      <br />
                      <span className="text-muted-foreground">{request.submittedDate}</span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Est. Cost:</span>
                      <br />
                      <span className="text-muted-foreground">{request.estimatedCost}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                        <Eye className="w-4 h-4 mr-1" />
                        Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Review Request: {request?.id}</DialogTitle>
                      </DialogHeader>
                      {selectedRequest && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Request Details</h4>
                              <div className="space-y-2 text-sm">
                                <div><strong>Service:</strong> {selectedRequest.service}</div>
                                <div><strong>Provider:</strong> {selectedRequest.provider.toUpperCase()}</div>
                                <div><strong>Cost:</strong> {selectedRequest.estimatedCost}</div>
                                <div><strong>Priority:</strong> {selectedRequest.priority}</div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Requester Info</h4>
                              <div className="space-y-2 text-sm">
                                <div><strong>Name:</strong> {selectedRequest.requester}</div>
                                <div><strong>Email:</strong> {selectedRequest.requesterEmail}</div>
                                <div><strong>Department:</strong> {selectedRequest.department}</div>
                                <div><strong>Submitted:</strong> {selectedRequest.submittedDate}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Description</h4>
                            <p className="text-sm text-muted-foreground">{selectedRequest.description}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Business Justification</h4>
                            <p className="text-sm text-muted-foreground">{selectedRequest.justification}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Approval Comments (Optional)</h4>
                            <Textarea
                              value={approvalComment}
                              onChange={(e) => setApprovalComment(e.target.value)}
                              placeholder="Add comments about your decision..."
                              className="min-h-20"
                            />
                          </div>
                          
                          <div className="flex space-x-3">
                            <Button 
                              onClick={() => handleApprove(selectedRequest)}
                              className="flex-1 bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button 
                              onClick={() => handleReject(selectedRequest)}
                              variant="destructive"
                              className="flex-1"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No pending approvals
            </h3>
            <p className="text-muted-foreground">
              All requests have been processed. Great job!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApprovalsPage;