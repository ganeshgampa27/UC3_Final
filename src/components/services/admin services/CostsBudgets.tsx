// import { DollarSign, TrendingDown, AlertTriangle, Target } from "lucide-react";
// import { MetricCard } from "@/components/MetricCard";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useCloudService } from "@/components/CloudServiceProvider";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   ComposedChart,
//   Area,
//   AreaChart,
// } from "recharts";

// const budgetData = [
//   { 
//     service: 'Compute (EC2)', 
//     budget: 25000, 
//     spent: 22300, 
//     forecast: 24500, 
//     status: 'on-track' 
//   },
//   { 
//     service: 'Storage (S3)', 
//     budget: 15000, 
//     spent: 16200, 
//     forecast: 17800, 
//     status: 'over-budget' 
//   },
//   { 
//     service: 'Database (RDS)', 
//     budget: 20000, 
//     spent: 18500, 
//     forecast: 19200, 
//     status: 'on-track' 
//   },
//   { 
//     service: 'Networking', 
//     budget: 8000, 
//     spent: 7200, 
//     forecast: 7800, 
//     status: 'under-budget' 
//   },
// ];

// const costTrendData = [
//   { month: 'Jan', actual: 52000, budget: 55000, forecast: 53000 },
//   { month: 'Feb', actual: 48000, budget: 55000, forecast: 49000 },
//   { month: 'Mar', actual: 61000, budget: 60000, forecast: 62000 },
//   { month: 'Apr', actual: 58000, budget: 60000, forecast: 59000 },
//   { month: 'May', actual: 65000, budget: 65000, forecast: 66000 },
//   { month: 'Jun', actual: 67890, budget: 70000, forecast: 69000 },
// ];

// const serviceBreakdownData = [
//   { service: 'EC2 Instances', cost: 22300, percentage: 33 },
//   { service: 'S3 Storage', cost: 16200, percentage: 24 },
//   { service: 'RDS Database', cost: 18500, percentage: 27 },
//   { service: 'CloudFront CDN', cost: 4800, percentage: 7 },
//   { service: 'Lambda Functions', cost: 3200, percentage: 5 },
//   { service: 'Others', cost: 2890, percentage: 4 },
// ];

// export default function CostsBudgets() {
//   const { selectedService } = useCloudService();

//   const getMetrics = () => {
//     const metrics = {
//       all: {
//         totalBudget: 70000,
//         totalSpent: 67890,
//         budgetUtilization: 97,
//         savings: 2110
//       },
//       aws: {
//         totalBudget: 45000,
//         totalSpent: 42340,
//         budgetUtilization: 94,
//         savings: 2660
//       },
//       azure: {
//         totalBudget: 20000,
//         totalSpent: 18650,
//         budgetUtilization: 93,
//         savings: 1350
//       },
//       gcp: {
//         totalBudget: 8000,
//         totalSpent: 6900,
//         budgetUtilization: 86,
//         savings: 1100
//       }
//     };
//     return metrics[selectedService];
//   };

//   const metrics = getMetrics();

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">Costs & Budgets</h1>
//           <p className="text-muted-foreground">
//             Monitor spending and manage budgets across cloud services
//           </p>
//         </div>
//       </div>

//       {/* Metrics */}
//       <div className="grid gap-4 md:grid-cols-4">
//         <MetricCard
//           title="Total Budget"
//           value={`$${metrics.totalBudget.toLocaleString()}`}
//           change="Monthly budget"
//           changeType="neutral"
//           icon={<Target className="h-4 w-4" />}
//         />
//         <MetricCard
//           title="Total Spent"
//           value={`$${metrics.totalSpent.toLocaleString()}`}
//           change={`${metrics.budgetUtilization}% of budget`}
//           changeType={metrics.budgetUtilization > 90 ? "negative" : "positive"}
//           icon={<DollarSign className="h-4 w-4" />}
//         />
//         <MetricCard
//           title="Budget Utilization"
//           value={`${metrics.budgetUtilization}%`}
//           change={metrics.budgetUtilization > 90 ? "Near limit" : "On track"}
//           changeType={metrics.budgetUtilization > 90 ? "negative" : "positive"}
//           icon={<AlertTriangle className="h-4 w-4" />}
//         />
//         <MetricCard
//           title="Potential Savings"
//           value={`$${metrics.savings.toLocaleString()}`}
//           change="Optimization opportunities"
//           changeType="positive"
//           icon={<TrendingDown className="h-4 w-4" />}
//         />
//       </div>

//       {/* Budget vs Actual Chart */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Budget vs Actual Spending</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <ComposedChart data={costTrendData}>
//               <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//               <XAxis dataKey="month" className="text-muted-foreground" />
//               <YAxis className="text-muted-foreground" />
//               <Tooltip 
//                 contentStyle={{ 
//                   backgroundColor: 'hsl(var(--popover))',
//                   border: '1px solid hsl(var(--border))',
//                   borderRadius: '8px'
//                 }}
//               />
//               <Area 
//                 type="monotone" 
//                 dataKey="budget" 
//                 fill="hsl(var(--muted))" 
//                 fillOpacity={0.3}
//                 name="Budget"
//               />
//               <Line 
//                 type="monotone" 
//                 dataKey="actual" 
//                 stroke="hsl(var(--primary))" 
//                 strokeWidth={3}
//                 name="Actual"
//               />
//               <Line 
//                 type="monotone" 
//                 dataKey="forecast" 
//                 stroke="hsl(var(--warning))" 
//                 strokeDasharray="5 5"
//                 strokeWidth={2}
//                 name="Forecast"
//               />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       <div className="grid gap-6 md:grid-cols-2">
//         {/* Service Cost Breakdown */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Service Cost Breakdown</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={serviceBreakdownData}>
//                 <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//                 <XAxis dataKey="service" className="text-muted-foreground" angle={-45} textAnchor="end" height={80} />
//                 <YAxis className="text-muted-foreground" />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: 'hsl(var(--popover))',
//                     border: '1px solid hsl(var(--border))',
//                     borderRadius: '8px'
//                   }}
//                 />
//                 <Bar dataKey="cost" fill="hsl(var(--primary))" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         {/* Budget Status */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Budget Status by Service</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {budgetData.map((item) => {
//                 const utilization = (item.spent / item.budget) * 100;
//                 const statusColor = item.status === 'over-budget' ? 'destructive' : 
//                                    item.status === 'on-track' ? 'default' : 'secondary';
                
//                 return (
//                   <div key={item.service} className="space-y-2">
//                     <div className="flex items-center justify-between">
//                       <h4 className="text-sm font-medium text-foreground">{item.service}</h4>
//                       <Badge variant={statusColor as any}>
//                         {item.status.replace('-', ' ')}
//                       </Badge>
//                     </div>
//                     <div className="flex items-center justify-between text-sm text-muted-foreground">
//                       <span>${item.spent.toLocaleString()} / ${item.budget.toLocaleString()}</span>
//                       <span>{Math.round(utilization)}%</span>
//                     </div>
//                     <Progress 
//                       value={utilization} 
//                       className="h-2"
//                     />
//                     <div className="text-xs text-muted-foreground">
//                       Forecast: ${item.forecast.toLocaleString()}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Cost Optimization Recommendations */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Cost Optimization Recommendations</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div className="flex items-start gap-3 p-4 bg-accent rounded-lg">
//               <TrendingDown className="w-5 h-5 text-success mt-0.5" />
//               <div>
//                 <h4 className="font-semibold text-foreground">Right-size EC2 Instances</h4>
//                 <p className="text-sm text-muted-foreground">
//                   Potential savings of $2,340/month by optimizing underutilized instances
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3 p-4 bg-accent rounded-lg">
//               <TrendingDown className="w-5 h-5 text-success mt-0.5" />
//               <div>
//                 <h4 className="font-semibold text-foreground">S3 Storage Optimization</h4>
//                 <p className="text-sm text-muted-foreground">
//                   Move infrequently accessed data to cheaper storage classes - save $1,200/month
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3 p-4 bg-accent rounded-lg">
//               <TrendingDown className="w-5 h-5 text-success mt-0.5" />
//               <div>
//                 <h4 className="font-semibold text-foreground">Reserved Instance Purchases</h4>
//                 <p className="text-sm text-muted-foreground">
//                   Commit to 1-year terms for predictable workloads - save up to 30%
//                 </p>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


import { useState } from "react";
import {
  DollarSign,
  TrendingDown,
  AlertTriangle,
  Target,
  Zap,
  Server,
  Database,
  Cloud,
  Activity,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Area,
  BarChart,
} from "recharts";
import { useCloudService } from "@/components/admin_components/CloudServiceProvider";
import { MetricCard } from "@/components/admin_components/MetricCard";

// ✅ Existing Data
const budgetData = [
  { service: "Compute (EC2)", budget: 25000, spent: 22300, forecast: 24500, status: "on-track" },
  { service: "Storage (S3)", budget: 15000, spent: 16200, forecast: 17800, status: "over-budget" },
  { service: "Database (RDS)", budget: 20000, spent: 18500, forecast: 19200, status: "on-track" },
  { service: "Networking", budget: 8000, spent: 7200, forecast: 7800, status: "under-budget" },
];

const costTrendData = [
  { month: "Jan", actual: 52000, budget: 55000, forecast: 53000 },
  { month: "Feb", actual: 48000, budget: 55000, forecast: 49000 },
  { month: "Mar", actual: 61000, budget: 60000, forecast: 62000 },
  { month: "Apr", actual: 58000, budget: 60000, forecast: 59000 },
  { month: "May", actual: 65000, budget: 65000, forecast: 66000 },
  { month: "Jun", actual: 67890, budget: 70000, forecast: 69000 },
];

const serviceBreakdownData = [
  { service: "EC2 Instances", cost: 22300, percentage: 33 },
  { service: "S3 Storage", cost: 16200, percentage: 24 },
  { service: "RDS Database", cost: 18500, percentage: 27 },
  { service: "CloudFront CDN", cost: 4800, percentage: 7 },
  { service: "Lambda Functions", cost: 3200, percentage: 5 },
  { service: "Others", cost: 2890, percentage: 4 },
];

// ✅ New Mock Data for Cost Breakdown Table
const mockData = [
  {
    id: "1",
    service: "Lambda",
    resourceName: "user-auth-handler",
    region: "us-east-1",
    cost: 125.45,
    usage: "2.4M invocations",
    accessLevel: "Admin",
    accessDuration: "30 days",
    tags: ["project:auth", "env:prod", "team:backend"],
    approvalDate: "2024-01-15",
    status: "Active",
    icon: Zap,
  },
  {
    id: "2",
    service: "EC2",
    resourceName: "prod-web-server-01",
    region: "us-west-2",
    cost: 98.76,
    usage: "720 hours",
    accessLevel: "Write",
    accessDuration: "60 days",
    tags: ["project:web", "env:prod"],
    approvalDate: "2024-01-10",
    status: "Active",
    icon: Server,
  },
  {
    id: "3",
    service: "RDS",
    resourceName: "main-database",
    region: "us-east-1",
    cost: 87.32,
    usage: "720 hours",
    accessLevel: "Read",
    accessDuration: "90 days",
    tags: ["project:db", "env:prod", "backup:enabled"],
    approvalDate: "2024-01-05",
    status: "Active",
    icon: Database,
  },
  {
    id: "4",
    service: "S3",
    resourceName: "data-backup-bucket",
    region: "us-east-1",
    cost: 45.67,
    usage: "2.3TB stored",
    accessLevel: "Write",
    accessDuration: "Unlimited",
    tags: ["project:backup", "compliance:required"],
    approvalDate: "2024-01-01",
    status: "Active",
    icon: Cloud,
  },
  {
    id: "5",
    service: "CloudWatch",
    resourceName: "monitoring-logs",
    region: "us-east-1",
    cost: 23.45,
    usage: "150GB logs",
    accessLevel: "Read",
    accessDuration: "30 days",
    tags: ["project:monitoring", "env:prod"],
    approvalDate: "2024-01-20",
    status: "Expired",
    icon: Activity,
  },
];

export default function CostsBudgets() {
  const { selectedService } = useCloudService();

  const getMetrics = () => {
    const metrics = {
      all: { totalBudget: 70000, totalSpent: 67890, budgetUtilization: 97, savings: 2110 },
      aws: { totalBudget: 45000, totalSpent: 42340, budgetUtilization: 94, savings: 2660 },
      azure: { totalBudget: 20000, totalSpent: 18650, budgetUtilization: 93, savings: 1350 },
      gcp: { totalBudget: 8000, totalSpent: 6900, budgetUtilization: 86, savings: 1100 },
    };
    return metrics[selectedService];
  };

  const metrics = getMetrics();

  // ✅ Table State
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("cost");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState(new Set());

  const itemsPerPage = 10;

  // ✅ Table Sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const toggleRow = (id: string) => {
    const newExpandedRows = new Set(expandedRows);
    newExpandedRows.has(id) ? newExpandedRows.delete(id) : newExpandedRows.add(id);
    setExpandedRows(newExpandedRows);
  };

  const filteredData = mockData
    .filter((item) =>
      item.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.resourceName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortDirection === "asc") return a[sortField] > b[sortField] ? 1 : -1;
      return a[sortField] < b[sortField] ? 1 : -1;
    });

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      {/* ✅ Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Costs & Budgets</h1>
          <p className="text-muted-foreground">
            Monitor spending and manage budgets across cloud services
          </p>
        </div>
      </div>

      {/* ✅ Metrics Section */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Total Budget"
          value={`$${metrics.totalBudget.toLocaleString()}`}
          change="Monthly budget"
          changeType="neutral"
          icon={<Target className="h-4 w-4" />}
        />
        <MetricCard
          title="Total Spent"
          value={`$${metrics.totalSpent.toLocaleString()}`}
          change={`${metrics.budgetUtilization}% of budget`}
          changeType={metrics.budgetUtilization > 90 ? "negative" : "positive"}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="Budget Utilization"
          value={`${metrics.budgetUtilization}%`}
          change={metrics.budgetUtilization > 90 ? "Near limit" : "On track"}
          changeType={metrics.budgetUtilization > 90 ? "negative" : "positive"}
          icon={<AlertTriangle className="h-4 w-4" />}
        />
        <MetricCard
          title="Potential Savings"
          value={`$${metrics.savings.toLocaleString()}`}
          change="Optimization opportunities"
          changeType="positive"
          icon={<TrendingDown className="h-4 w-4" />}
        />
      </div>

      {/* ✅ Budget vs Actual Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Budget vs Actual Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={costTrendData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="budget" fill="hsl(var(--muted))" fillOpacity={0.3} name="Budget" />
              <Line type="monotone" dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={3} name="Actual" />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="hsl(var(--warning))"
                strokeDasharray="5 5"
                strokeWidth={2}
                name="Forecast"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ✅ Service Breakdown & Budget Status */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Service Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceBreakdownData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="service" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cost" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Status by Service</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetData.map((item) => {
                const utilization = (item.spent / item.budget) * 100;
                const statusColor =
                  item.status === "over-budget"
                    ? "destructive"
                    : item.status === "on-track"
                    ? "default"
                    : "secondary";

                return (
                  <div key={item.service} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-foreground">{item.service}</h4>
                      <Badge variant={statusColor as any}>{item.status.replace("-", " ")}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        ${item.spent.toLocaleString()} / ${item.budget.toLocaleString()}
                      </span>
                      <span>{Math.round(utilization)}%</span>
                    </div>
                    <Progress value={utilization} className="h-2" />
                    <div className="text-xs text-muted-foreground">Forecast: ${item.forecast.toLocaleString()}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ✅ Cost Optimization Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Optimization Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-accent rounded-lg">
              <TrendingDown className="w-5 h-5 text-success mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground">Right-size EC2 Instances</h4>
                <p className="text-sm text-muted-foreground">
                  Potential savings of $2,340/month by optimizing underutilized instances
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-accent rounded-lg">
              <TrendingDown className="w-5 h-5 text-success mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground">S3 Storage Optimization</h4>
                <p className="text-sm text-muted-foreground">
                  Move infrequently accessed data to cheaper storage classes - save $1,200/month
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-accent rounded-lg">
              <TrendingDown className="w-5 h-5 text-success mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground">Reserved Instance Purchases</h4>
                <p className="text-sm text-muted-foreground">
                  Commit to 1-year terms for predictable workloads - save up to 30%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ✅ NEW: Detailed Cost Breakdown Table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Detailed Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Box */}
          <input
            type="text"
            placeholder="Search service or resource..."
            className="border p-2 rounded w-full mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Table */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th onClick={() => handleSort("service")} className="cursor-pointer p-2">
                  Service
                </th>
                <th onClick={() => handleSort("resourceName")} className="cursor-pointer p-2">
                  Resource
                </th>
                <th onClick={() => handleSort("region")} className="cursor-pointer p-2">
                  Region
                </th>
                <th onClick={() => handleSort("cost")} className="cursor-pointer p-2">
                  Cost ($)
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <>
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleRow(item.id)}
                  >
                    <td className="p-2 flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-primary" /> {item.service}
                    </td>
                    <td className="p-2">{item.resourceName}</td>
                    <td className="p-2">{item.region}</td>
                    <td className="p-2">${item.cost.toFixed(2)}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          item.status === "Expired"
                            ? "bg-red-200 text-red-800"
                            : "bg-green-200 text-green-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>

                  {/* Expanded Row */}
                  {expandedRows.has(item.id) && (
                    <tr>
                      <td colSpan={5} className="bg-gray-100 p-4">
                        <div className="text-sm">
                          <strong>Usage:</strong> {item.usage} <br />
                          <strong>Access Level:</strong> {item.accessLevel} <br />
                          <strong>Access Duration:</strong> {item.accessDuration} <br />
                          <strong>Tags:</strong> {item.tags.join(", ")} <br />
                          <strong>Approval Date:</strong> {item.approvalDate}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Prev
            </button>
            <span>Page {currentPage}</span>
            <button
              disabled={paginatedData.length < itemsPerPage}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Next
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
