import { Building2, DollarSign } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useCloudService } from "@/components/admin_components/CloudServiceProvider";
import { MetricCard } from "@/components/admin_components/MetricCard";

const departmentData = [
  { 
    name: "Engineering", 
    totalUsers: 1245, 
    awsSpend: 35000, 
    azureSpend: 15000, 
    gcpSpend: 8000,
    totalSpend: 58000
  },
  { 
    name: "Data Science", 
    totalUsers: 456, 
    awsSpend: 22000, 
    azureSpend: 18000, 
    gcpSpend: 12000,
    totalSpend: 52000
  },
  { 
    name: "Marketing", 
    totalUsers: 234, 
    awsSpend: 8000, 
    azureSpend: 5000, 
    gcpSpend: 3000,
    totalSpend: 16000
  },
  { 
    name: "Sales", 
    totalUsers: 189, 
    awsSpend: 3000, 
    azureSpend: 2000, 
    gcpSpend: 1000,
    totalSpend: 6000
  },
  { 
    name: "HR", 
    totalUsers: 67, 
    awsSpend: 1500, 
    azureSpend: 800, 
    gcpSpend: 400,
    totalSpend: 2700
  },
];

const COLORS = ['#3b82f6', '#06b6d4', '#8b5cf6', '#f59e0b', '#ef4444'];

export default function Departments() {
  const { selectedService } = useCloudService();

  const getFilteredData = () => {
    if (selectedService === 'all') return departmentData;
    
    return departmentData.map(dept => ({
      ...dept,
      spend: selectedService === 'aws' ? dept.awsSpend : 
             selectedService === 'azure' ? dept.azureSpend : 
             dept.gcpSpend
    }));
  };

  const getTotalDepartments = () => 5;

  const getTotalSpend = () => {
    const totals = {
      all: 134700,
      aws: 69500,
      azure: 40800,
      gcp: 24400
    };
    return totals[selectedService];
  };

  const getAverageSpend = () => {
    return Math.round(getTotalSpend() / getTotalDepartments());
  };

  const filteredData = getFilteredData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Departments</h1>
          <p className="text-muted-foreground">
            Track cloud usage and spending by department
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Total Departments"
          value={getTotalDepartments()}
          change="All departments active"
          changeType="positive"
          icon={<Building2 className="h-4 w-4" />}
        />
        <MetricCard
          title="Total Department Spend"
          value={`$${getTotalSpend().toLocaleString()}`}
          change="+6% from last month"
          changeType="negative"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="Average Spend/Department"
          value={`$${getAverageSpend().toLocaleString()}`}
          change="+3% from last month"
          changeType="negative"
          icon={<DollarSign className="h-4 w-4" />}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Department Spending Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Department Spending Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                {selectedService === 'all' ? (
                  <>
                    <Bar dataKey="awsSpend" fill="#f59e0b" name="AWS" />
                    <Bar dataKey="azureSpend" fill="#06b6d4" name="Azure" />
                    <Bar dataKey="gcpSpend" fill="#8b5cf6" name="GCP" />
                  </>
                ) : (
                  <Bar dataKey="spend" fill="hsl(var(--primary))" name={selectedService.toUpperCase()} />
                )}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={filteredData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey={selectedService === 'all' ? 'totalSpend' : 'spend'}
                  label={({ name, value }) => `${name}: $${value?.toLocaleString()}`}
                >
                  {filteredData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`$${value?.toLocaleString()}`, 'Spend']}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Department Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredData.map((dept, index) => (
              <div key={dept.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{dept.name}</h3>
                    <p className="text-sm text-muted-foreground">{dept.totalUsers} users</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    ${selectedService === 'all' ? dept.totalSpend.toLocaleString() : 
                      (selectedService === 'aws' ? dept.awsSpend : 
                       selectedService === 'azure' ? dept.azureSpend : 
                       dept.gcpSpend).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedService === 'all' ? 'Total spend' : `${selectedService.toUpperCase()} spend`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}