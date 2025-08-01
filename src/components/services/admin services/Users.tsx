import { Users as UsersIcon, Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useCloudService } from "@/components/admin_components/CloudServiceProvider";
import { MetricCard } from "@/components/admin_components/MetricCard";

const userData = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john@company.com", 
    department: "Engineering", 
    awsSpend: 2340, 
    azureSpend: 1200, 
    gcpSpend: 450,
    status: "active"
  },
  { 
    id: 2, 
    name: "Sarah Wilson", 
    email: "sarah@company.com", 
    department: "Data Science", 
    awsSpend: 3200, 
    azureSpend: 2100, 
    gcpSpend: 890,
    status: "active"
  },
  { 
    id: 3, 
    name: "Mike Johnson", 
    email: "mike@company.com", 
    department: "Marketing", 
    awsSpend: 890, 
    azureSpend: 450, 
    gcpSpend: 200,
    status: "inactive"
  },
  { 
    id: 4, 
    name: "Emily Chen", 
    email: "emily@company.com", 
    department: "Engineering", 
    awsSpend: 4100, 
    azureSpend: 1800, 
    gcpSpend: 1200,
    status: "active"
  },
];

export default function Users() {
  const { selectedService } = useCloudService();

  const getFilteredData = () => {
    if (selectedService === 'all') return userData;
    
    return userData.map(user => ({
      ...user,
      totalSpend: selectedService === 'aws' ? user.awsSpend : 
                 selectedService === 'azure' ? user.azureSpend : 
                 user.gcpSpend
    }));
  };

  const getTotalUsers = () => {
    const metrics = {
      all: 2847,
      aws: 1523,
      azure: 856,
      gcp: 468
    };
    return metrics[selectedService];
  };

  const getActiveUsers = () => {
    const metrics = {
      all: 2456,
      aws: 1342,
      azure: 734,
      gcp: 380
    };
    return metrics[selectedService];
  };

  const filteredData = getFilteredData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users Management</h1>
          <p className="text-muted-foreground">
            Manage users and track their cloud service usage
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Total Users"
          value={getTotalUsers().toLocaleString()}
          change="+15 new this month"
          changeType="positive"
          icon={<UsersIcon className="h-4 w-4" />}
        />
        <MetricCard
          title="Active Users"
          value={getActiveUsers().toLocaleString()}
          change="86% active rate"
          changeType="positive"
          icon={<UsersIcon className="h-4 w-4" />}
        />
        <MetricCard
          title="Avg Monthly Spend/User"
          value={selectedService === 'all' ? '$24' : 
                selectedService === 'aws' ? '$28' : 
                selectedService === 'azure' ? '$22' : '$15'}
          change="+8% from last month"
          changeType="negative"
          icon={<UsersIcon className="h-4 w-4" />}
        />
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>User Details</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Email</TableHead>
                {selectedService === 'all' ? (
                  <>
                    <TableHead>AWS Spend</TableHead>
                    <TableHead>Azure Spend</TableHead>
                    <TableHead>GCP Spend</TableHead>
                  </>
                ) : (
                  <TableHead>{selectedService.toUpperCase()} Spend</TableHead>
                )}
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  {selectedService === 'all' ? (
                    <>
                      <TableCell>${user.awsSpend.toLocaleString()}</TableCell>
                      <TableCell>${user.azureSpend.toLocaleString()}</TableCell>
                      <TableCell>${user.gcpSpend.toLocaleString()}</TableCell>
                    </>
                  ) : (
                    <TableCell>${(selectedService === 'aws' ? user.awsSpend : 
                                  selectedService === 'azure' ? user.azureSpend : 
                                  user.gcpSpend).toLocaleString()}</TableCell>
                  )}
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}