// import { Users, Server, DollarSign, TrendingUp, Activity, Target, Zap, ShieldCheck, ArrowUpRight, ArrowDownRight } from "lucide-react";
// import { MetricCard } from "@/components/MetricCard";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { useCloudService } from "@/components/CloudServiceProvider";
// import {
//   LineChart,
//   Line,
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   ComposedChart,
// } from "recharts";

// // Service-specific data for each cloud provider
// const servicesData = {
//   all: {
//     services: [
//       { name: 'Compute', aws: 25000, azure: 18000, gcp: 12000 },
//       { name: 'Storage', aws: 15000, azure: 12000, gcp: 8000 },
//       { name: 'Database', aws: 20000, azure: 15000, gcp: 10000 },
//       { name: 'Networking', aws: 8000, azure: 6000, gcp: 4000 },
//       { name: 'Analytics', aws: 12000, azure: 9000, gcp: 7000 },
//     ],
//     trends: [
//       { month: 'Jan', cost: 68000, forecast: 70000, alerts: 12 },
//       { month: 'Feb', cost: 72000, forecast: 74000, alerts: 8 },
//       { month: 'Mar', cost: 75000, forecast: 77000, alerts: 15 },
//       { month: 'Apr', cost: 78000, forecast: 80000, alerts: 10 },
//       { month: 'May', cost: 82000, forecast: 83000, alerts: 18 },
//       { month: 'Jun', cost: 85000, forecast: 87000, alerts: 14 },
//     ]
//   },
//   aws: {
//     services: [
//       { name: 'S3', cost: 8500, usage: 95, trend: '+12%' },
//       { name: 'Lambda', cost: 3200, usage: 78, trend: '+8%' },
//       { name: 'Glue', cost: 1800, usage: 65, trend: '+15%' },
//       { name: 'Athena', cost: 950, usage: 45, trend: '+5%' },
//       { name: 'EC2', cost: 15600, usage: 88, trend: '+3%' },
//       { name: 'RDS', cost: 7200, usage: 92, trend: '+7%' },
//     ],
//     trends: [
//       { month: 'Jan', cost: 42000, forecast: 43000, alerts: 8 },
//       { month: 'Feb', cost: 43500, forecast: 44000, alerts: 6 },
//       { month: 'Mar', cost: 45000, forecast: 46000, alerts: 10 },
//       { month: 'Apr', cost: 46200, forecast: 47000, alerts: 7 },
//       { month: 'May', cost: 48000, forecast: 49000, alerts: 12 },
//       { month: 'Jun', cost: 49500, forecast: 50000, alerts: 9 },
//     ]
//   },
//   azure: {
//     services: [
//       { name: 'Blob Storage', cost: 4200, usage: 89, trend: '+10%' },
//       { name: 'Functions', cost: 1800, usage: 72, trend: '+14%' },
//       { name: 'AI/ML', cost: 2500, usage: 68, trend: '+22%' },
//       { name: 'Synapse', cost: 3200, usage: 75, trend: '+18%' },
//       { name: 'Virtual Machines', cost: 8900, usage: 85, trend: '+6%' },
//       { name: 'SQL Database', cost: 4100, usage: 91, trend: '+4%' },
//     ],
//     trends: [
//       { month: 'Jan', cost: 18000, forecast: 18500, alerts: 3 },
//       { month: 'Feb', cost: 18800, forecast: 19200, alerts: 2 },
//       { month: 'Mar', cost: 19500, forecast: 20000, alerts: 4 },
//       { month: 'Apr', cost: 20200, forecast: 20800, alerts: 2 },
//       { month: 'May', cost: 21000, forecast: 21500, alerts: 5 },
//       { month: 'Jun', cost: 21800, forecast: 22200, alerts: 4 },
//     ]
//   },
//   gcp: {
//     services: [
//       { name: 'Compute Engine', cost: 3800, usage: 82, trend: '+9%' },
//       { name: 'App Engine', cost: 1200, usage: 65, trend: '+12%' },
//       { name: 'GKE', cost: 2100, usage: 71, trend: '+16%' },
//       { name: 'Cloud Storage', cost: 1800, usage: 88, trend: '+7%' },
//       { name: 'BigQuery', cost: 2200, usage: 79, trend: '+11%' },
//       { name: 'Cloud Functions', cost: 850, usage: 58, trend: '+13%' },
//     ],
//     trends: [
//       { month: 'Jan', cost: 8000, forecast: 8200, alerts: 1 },
//       { month: 'Feb', cost: 8400, forecast: 8600, alerts: 0 },
//       { month: 'Mar', cost: 8800, forecast: 9000, alerts: 1 },
//       { month: 'Apr', cost: 9200, forecast: 9400, alerts: 1 },
//       { month: 'May', cost: 9600, forecast: 9800, alerts: 2 },
//       { month: 'Jun', cost: 10000, forecast: 10200, alerts: 1 },
//     ]
//   }
// };

// const departmentUsageData = [
//   { department: 'Engineering', aws: 35000, azure: 15000, gcp: 8000 },
//   { department: 'Data Science', aws: 22000, azure: 18000, gcp: 12000 },
//   { department: 'Marketing', aws: 8000, azure: 5000, gcp: 3000 },
//   { department: 'Sales', aws: 3000, azure: 2000, gcp: 1000 },
// ];

// export default function Dashboard() {
//   const { selectedService } = useCloudService();

//   const getMetricsForService = () => {
//     const baseMetrics = {
//       all: {
//         totalUsers: 2847,
//         activeResources: 1234,
//         monthlySpend: 67890,
//         budgetUtilization: 97
//       },
//       aws: {
//         totalUsers: 1523,
//         activeResources: 687,
//         monthlySpend: 42340,
//         budgetUtilization: 89
//       },
//       azure: {
//         totalUsers: 856,
//         activeResources: 423,
//         monthlySpend: 18650,
//         budgetUtilization: 76
//       },
//       gcp: {
//         totalUsers: 468,
//         activeResources: 124,
//         monthlySpend: 6900,
//         budgetUtilization: 45
//       }
//     };
//     return baseMetrics[selectedService];
//   };

//   const getCurrentServiceData = () => {
//     return servicesData[selectedService];
//   };

//   const metrics = getMetricsForService();
//   const currentData = getCurrentServiceData();

//   return (
//     <div className="space-y-6">
//       {/* Metrics Grid */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <MetricCard
//           title="Total Users"
//           value={metrics.totalUsers.toLocaleString()}
//           change="+12% from last month"
//           changeType="positive"
//           icon={<Users className="h-4 w-4" />}
//         />
//         <MetricCard
//           title="Active Resources"
//           value={metrics.activeResources.toLocaleString()}
//           change="+8% from last month"
//           changeType="positive"
//           icon={<Server className="h-4 w-4" />}
//         />
//         <MetricCard
//           title="Monthly Spend"
//           value={`$${metrics.monthlySpend.toLocaleString()}`}
//           change="+5.2% from last month"
//           changeType="negative"
//           icon={<DollarSign className="h-4 w-4" />}
//         />
//         <MetricCard
//           title="Budget Utilization"
//           value={`${metrics.budgetUtilization}%`}
//           change="Near budget limit"
//           changeType={metrics.budgetUtilization > 90 ? "negative" : "positive"}
//           icon={<TrendingUp className="h-4 w-4" />}
//         />
//       </div>

//       {/* Cost Trends Chart */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Activity className="h-5 w-5" />
//             Cost & Forecast Trends - {selectedService.toUpperCase()}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <ComposedChart data={currentData.trends}>
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
//                 dataKey="cost" 
//                 fill="#3b82f6" 
//                 fillOpacity={0.3}
//                 stroke="#3b82f6"
//                 strokeWidth={2}
//                 name="Actual Cost"
//               />
//               <Line 
//                 type="monotone" 
//                 dataKey="forecast" 
//                 stroke="#ef4444" 
//                 strokeWidth={2}
//                 strokeDasharray="5 5"
//                 name="Forecast"
//               />
//               <Bar 
//                 dataKey="alerts" 
//                 fill="#f59e0b" 
//                 name="Cost Alerts"
//               />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* Service-specific Analysis */}
//       {selectedService !== 'all' ? (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Target className="h-5 w-5" />
//               {selectedService.toUpperCase()} Services Analysis
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//               {currentData.services.map((service, index) => (
//                 <div key={service.name} className="p-4 border rounded-lg bg-card">
//                   <div className="flex items-center justify-between mb-2">
//                     <h3 className="font-semibold text-sm">{service.name}</h3>
//                     <Badge variant={service.trend.startsWith('+') ? "destructive" : "default"}>
//                       {service.trend}
//                     </Badge>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">Monthly Cost:</span>
//                       <span className="font-medium">${service.cost.toLocaleString()}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">Usage:</span>
//                       <span className="font-medium">{service.usage}%</span>
//                     </div>
//                     <div className="w-full bg-muted rounded-full h-2">
//                       <div 
//                         className="bg-primary h-2 rounded-full" 
//                         style={{ width: `${service.usage}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       ) : (
//         // Multi-cloud comparison for 'all' option
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Target className="h-5 w-5" />
//               Multi-Cloud Service Comparison
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={currentData.services}>
//                 <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//                 <XAxis dataKey="name" className="text-muted-foreground" />
//                 <YAxis className="text-muted-foreground" />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: 'hsl(var(--popover))',
//                     border: '1px solid hsl(var(--border))',
//                     borderRadius: '8px'
//                   }}
//                 />
//                 <Bar dataKey="aws" fill="#f59e0b" name="AWS" />
//                 <Bar dataKey="azure" fill="#06b6d4" name="Azure" />
//                 <Bar dataKey="gcp" fill="#8b5cf6" name="GCP" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       )}

//       {/* Department Usage */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Department-wise Cloud Usage</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={departmentUsageData}>
//               <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//               <XAxis dataKey="department" className="text-muted-foreground" />
//               <YAxis className="text-muted-foreground" />
//               <Tooltip 
//                 contentStyle={{ 
//                   backgroundColor: 'hsl(var(--popover))',
//                   border: '1px solid hsl(var(--border))',
//                   borderRadius: '8px'
//                 }}
//               />
//               <Bar dataKey="aws" fill="#f59e0b" name="AWS" />
//               <Bar dataKey="azure" fill="#06b6d4" name="Azure" />
//               <Bar dataKey="gcp" fill="#8b5cf6" name="GCP" />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


//commented on 29/07

// import React from "react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Users,
//   Server,
//   DollarSign,
//   TrendingUp,
//   Activity,
//   Target,
//   Zap,
//   ShieldCheck,
//   AlertTriangle,
//   Filter,
//   Calendar,
// } from "lucide-react";
// import { MetricCard } from "@/components/MetricCard";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { useCloudService } from "@/components/CloudServiceProvider";
// import {
//   LineChart,
//   Line,
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   ComposedChart,
// } from "recharts";

// // Enhanced data for cross-provider comparison
// const servicesData = {
//   all: {
//     services: [
//       { name: "Compute", aws: 25000, azure: 18000, gcp: 12000 },
//       { name: "Storage", aws: 15000, azure: 12000, gcp: 8000 },
//       { name: "Database", aws: 20000, azure: 15000, gcp: 10000 },
//       { name: "Networking", aws: 8000, azure: 6000, gcp: 4000 },
//       { name: "Analytics", aws: 12000, azure: 9000, gcp: 7000 },
//     ],
//     trends: [
//       { month: "Jan", cost: 68000, forecast: 70000, alerts: 12 },
//       { month: "Feb", cost: 72000, forecast: 74000, alerts: 8 },
//       { month: "Mar", cost: 75000, forecast: 77000, alerts: 15 },
//       { month: "Apr", cost: 78000, forecast: 80000, alerts: 10 },
//       { month: "May", cost: 82000, forecast: 83000, alerts: 18 },
//       { month: "Jun", cost: 85000, forecast: 87000, alerts: 14 },
//     ],
//   },
//   aws: {
//     services: [
//       { name: "S3", cost: 8500, usage: 95, trend: "+12%", resources: 120, users: 300 },
//       { name: "Lambda", cost: 3200, usage: 78, trend: "+8%", resources: 80, users: 150 },
//       { name: "Glue", cost: 1800, usage: 65, trend: "+15%", resources: 40, users: 50 },
//       { name: "Athena", cost: 950, usage: 45, trend: "+5%", resources: 20, users: 30 },
//       { name: "EC2", cost: 15600, usage: 88, trend: "+3%", resources: 200, users: 400 },
//       { name: "RDS", cost: 7200, usage: 92, trend: "+7%", resources: 100, users: 200 },
//     ],
//     trends: [
//       { month: "Jan", cost: 42000, forecast: 43000, alerts: 8 },
//       { month: "Feb", cost: 43500, forecast: 44000, alerts: 6 },
//       { month: "Mar", cost: 45000, forecast: 46000, alerts: 10 },
//       { month: "Apr", cost: 46200, forecast: 47000, alerts: 7 },
//       { month: "May", cost: 48000, forecast: 49000, alerts: 12 },
//       { month: "Jun", cost: 49500, forecast: 50000, alerts: 9 },
//     ],
//   },
//   azure: {
//     services: [
//       { name: "Blob Storage", cost: 4200, usage: 89, trend: "+10%", resources: 90, users: 200 },
//       { name: "Functions", cost: 1800, usage: 72, trend: "+14%", resources: 50, users: 100 },
//       { name: "AI/ML", cost: 2500, usage: 68, trend: "+22%", resources: 30, users: 80 },
//       { name: "Synapse", cost: 3200, usage: 75, trend: "+18%", resources: 60, users: 120 },
//       { name: "Virtual Machines", cost: 8900, usage: 85, trend: "+6%", resources: 150, users: 300 },
//       { name: "SQL Database", cost: 4100, usage: 91, trend: "+4%", resources: 80, users: 180 },
//     ],
//     trends: [
//       { month: "Jan", cost: 18000, forecast: 18500, alerts: 3 },
//       { month: "Feb", cost: 18800, forecast: 19200, alerts: 2 },
//       { month: "Mar", cost: 19500, forecast: 20000, alerts: 4 },
//       { month: "Apr", cost: 20200, forecast: 20800, alerts: 2 },
//       { month: "May", cost: 21000, forecast: 21500, alerts: 5 },
//       { month: "Jun", cost: 21800, forecast: 22200, alerts: 4 },
//     ],
//   },
//   gcp: {
//     services: [
//       { name: "Compute Engine", cost: 3800, usage: 82, trend: "+9%", resources: 70, users: 150 },
//       { name: "App Engine", cost: 1200, usage: 65, trend: "+12%", resources: 30, users: 60 },
//       { name: "GKE", cost: 2100, usage: 71, trend: "+16%", resources: 50, users: 100 },
//       { name: "Cloud Storage", cost: 1800, usage: 88, trend: "+7%", resources: 60, users: 120 },
//       { name: "BigQuery", cost: 2200, usage: 79, trend: "+11%", resources: 40, users: 80 },
//       { name: "Cloud Functions", cost: 850, usage: 58, trend: "+13%", resources: 20, users: 40 },
//     ],
//     trends: [
//       { month: "Jan", cost: 8000, forecast: 8200, alerts: 1 },
//       { month: "Feb", cost: 8400, forecast: 8600, alerts: 0 },
//       { month: "Mar", cost: 8800, forecast: 9000, alerts: 1 },
//       { month: "Apr", cost: 9200, forecast: 9400, alerts: 1 },
//       { month: "May", cost: 9600, forecast: 9800, alerts: 2 },
//       { month: "Jun", cost: 10000, forecast: 10200, alerts: 1 },
//     ],
//   },
// };

// // Enhanced department data
// const departmentUsageData = [
//   {
//     department: "Engineering",
//     aws: { cost: 35000, resources: 500, users: 800, alerts: 5 },
//     azure: { cost: 15000, resources: 300, users: 400, alerts: 3 },
//     gcp: { cost: 8000, resources: 150, users: 200, alerts: 1 },
//   },
//   {
//     department: "Data Science",
//     aws: { cost: 22000, resources: 300, users: 500, alerts: 4 },
//     azure: { cost: 18000, resources: 250, users: 350, alerts: 2 },
//     gcp: { cost: 12000, resources: 200, users: 300, alerts: 2 },
//   },
//   {
//     department: "Marketing",
//     aws: { cost: 8000, resources: 100, users: 150, alerts: 1 },
//     azure: { cost: 5000, resources: 80, users: 100, alerts: 0 },
//     gcp: { cost: 3000, resources: 50, users: 80, alerts: 0 },
//   },
//   {
//     department: "Sales",
//     aws: { cost: 3000, resources: 50, users: 80, alerts: 0 },
//     azure: { cost: 2000, resources: 40, users: 60, alerts: 0 },
//     gcp: { cost: 1000, resources: 20, users: 40, alerts: 0 },
//   },
// ];

// // Alert data
// const alertsData = [
//   { provider: "AWS", department: "Engineering", message: "EC2 cost spike detected", severity: "high", timestamp: "2025-06-15" },
//   { provider: "Azure", department: "Data Science", message: "Synapse budget overrun", severity: "medium", timestamp: "2025-06-10" },
//   { provider: "GCP", department: "Engineering", message: "BigQuery usage limit neared", severity: "low", timestamp: "2025-06-12" },
//   { provider: "AWS", department: "Data Science", message: "S3 storage cost increased", severity: "medium", timestamp: "2025-06-08" },
//   { provider: "Azure", department: "Engineering", message: "VM idle resources detected", severity: "low", timestamp: "2025-06-05" },
// ];

// // Cost distribution for pie chart
// const costDistributionData = [
//   { name: "AWS", value: 42340 },
//   { name: "Azure", value: 18650 },
//   { name: "GCP", value: 6900 },
// ];

// const COLORS = ["#f59e0b", "#06b6d4", "#8b5cf6"];

// export default function Dashboard() {
//   const { selectedService } = useCloudService();
//   const [selectedDepartment, setSelectedDepartment] = useState("all");
//   const [selectedTimeRange, setSelectedTimeRange] = useState("6m");
//   const [alertSeverity, setAlertSeverity] = useState("all");

//   const getMetricsForService = () => {
//     const baseMetrics = {
//       all: {
//         totalUsers: 2847,
//         activeResources: 1234,
//         monthlySpend: 67890,
//         budgetUtilization: 97,
//         costPerUser: 23.84, // monthlySpend / totalUsers
//       },
//       aws: {
//         totalUsers: 1523,
//         activeResources: 687,
//         monthlySpend: 42340,
//         budgetUtilization: 89,
//         costPerUser: 27.80,
//       },
//       azure: {
//         totalUsers: 856,
//         activeResources: 423,
//         monthlySpend: 18650,
//         budgetUtilization: 76,
//         costPerUser: 21.79,
//       },
//       gcp: {
//         totalUsers: 468,
//         activeResources: 124,
//         monthlySpend: 6900,
//         budgetUtilization: 45,
//         costPerUser: 14.74,
//       },
//     };
//     return baseMetrics[selectedService];
//   };

//   const getCurrentServiceData = () => {
//     return servicesData[selectedService];
//   };

//   const filterTrendsByTimeRange = (trends) => {
//     if (selectedTimeRange === "6m") return trends;
//     const months = parseInt(selectedTimeRange);
//     return trends.slice(-months);
//   };

//   const filteredDepartmentData = selectedDepartment === "all"
//     ? departmentUsageData
//     : departmentUsageData.filter((d) => d.department === selectedDepartment);

//   const filteredAlerts = alertSeverity === "all"
//     ? alertsData
//     : alertsData.filter((a) => a.severity === alertSeverity);

//   const metrics = getMetricsForService();
//   const currentData = getCurrentServiceData();

//   return (
//     <div className="space-y-6">
//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 p-4 bg-card rounded-lg border">
//         <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
//           <SelectTrigger className="w-48">
//             <SelectValue placeholder="Departmentпродук:Department" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Departments</SelectItem>
//             {departmentUsageData.map((d) => (
//               <SelectItem key={d.department} value={d.department}>{d.department}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//         <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
//           <SelectTrigger className="w-48">
//             <SelectValue placeholder="Time Range" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="3m">Last 3 Months</SelectItem>
//             <SelectItem value="6m">Last 6 Months</SelectItem>
//             <SelectItem value="12m">Last 12 Months</SelectItem>
//           </SelectContent>
//         </Select>
//         <Button variant="outline" className="gap-2">
//           <Filter size={16} />
//           Apply Filters
//         </Button>
//       </div>

//       {/* Metrics Grid */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
//         <MetricCard
//           title="Total Users"
//           value={metrics.totalUsers.toLocaleString()}
//           change="+12% from last month"
//           changeType="positive"
//           icon={<Users className="h-4 w-4" />}
//         />
//         <MetricCard
//           title="Active Resources"
//           value={metrics.activeResources.toLocaleString()}
//           change="+8% from last month"
//           changeType="positive"
//           icon={<Server className="h-4 w-4" />}
//         />
//         <MetricCard
//           title="Monthly Spend"
//           value={`$${metrics.monthlySpend.toLocaleString()}`}
//           change="+5.2% from last month"
//           changeType="negative"
//           icon={<DollarSign className="h-4 w-4" />}
//         />
//         <MetricCard
//           title="Budget Utilization"
//           value={`${metrics.budgetUtilization}%`}
//           change="Near budget limit"
//           changeType={metrics.budgetUtilization > 90 ? "negative" : "positive"}
//           icon={<TrendingUp className="h-4 w-4" />}
//         />
//         <MetricCard
//           title="Cost Per User"
//           value={`$${metrics.costPerUser.toFixed(2)}`}
//           change="Stable"
//           changeType="positive"
//           icon={<Zap className="h-4 w-4" />}
//         />
//       </div>

//       {/* Cost Trends Chart */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Activity className="h-5 w-5" />
//             Cost & Forecast Trends - {selectedService.toUpperCase()}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <ComposedChart data={filterTrendsByTimeRange(currentData.trends)}>
//               <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//               <XAxis dataKey="month" className="text-muted-foreground" />
//               <YAxis className="text-muted-foreground" />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "hsl(var(--popover))",
//                   border: "1px solid hsl(var(--border))",
//                   borderRadius: "8px",
//                 }}
//               />
//               <Area
//                 type="monotone"
//                 dataKey="cost"
//                 fill="#3b82f6"
//                 fillOpacity={0.3}
//                 stroke="#3b82f6"
//                 strokeWidth={2}
//                 name="Actual Cost"
//               />
//               <Line
//                 type="monotone"
//                 dataKey="forecast"
//                 stroke="#ef4444"
//                 strokeWidth={2}
//                 strokeDasharray="5 5"
//                 name="Forecast"
//               />
//               <Bar dataKey="alerts" fill="#f59e0b" name="Cost Alerts" />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* Cost Distribution Across Providers */}
//       {selectedService === "all" && (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <DollarSign className="h-5 w-5" />
//               Cost Distribution Across Providers
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={costDistributionData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {costDistributionData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   formatter={(value) => [`$${value.toLocaleString()}`, "Cost"]}
//                   contentStyle={{
//                     backgroundColor: "hsl(var(--popover))",
//                     border: "1px solid hsl(var(--border))",
//                     borderRadius: "8px",
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       )}

//       {/* Service-specific Analysis */}
//       {selectedService !== "all" ? (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Target className="h-5 w-5" />
//               {selectedService.toUpperCase()} Services Analysis
//               <Link to={`/cost-centers/${selectedService}`}>
//                 <Button variant="outline" size="sm" className="ml-4">
//                   View Cost Center
//                 </Button>
//               </Link>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//               {currentData.services.map((service) => (
//                 <div key={service.name} className="p-4 border rounded-lg bg-card">
//                   <div className="flex items-center justify-between mb-2">
//                     <h3 className="font-semibold text-sm">{service.name}</h3>
//                     <Badge variant={service.trend.startsWith("+") ? "destructive" : "default"}>
//                       {service.trend}
//                     </Badge>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">Monthly Cost:</span>
//                       <span className="font-medium">${service.cost.toLocaleString()}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">Usage:</span>
//                       <span className="font-medium">{service.usage}%</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">Resources:</span>
//                       <span className="font-medium">{service.resources}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">Users:</span>
//                       <span className="font-medium">{service.users}</span>
//                     </div>
//                     <div className="w-full bg-muted rounded-full h-2">
//                       <div
//                         className="bg-primary h-2 rounded-full"
//                         style={{ width: `${service.usage}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       ) : (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Target className="h-5 w-5" />
//               Multi-Cloud Service Comparison
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={currentData.services}>
//                 <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//                 <XAxis dataKey="name" className="text-muted-foreground" />
//                 <YAxis className="text-muted-foreground" />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "hsl(var(--popover))",
//                     border: "1px solid hsl(var(--border))",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <Bar dataKey="aws" fill="#f59e0b" name="AWS" />
//                 <Bar dataKey="azure" fill="#06b6d4" name="Azure" />
//                 <Bar dataKey="gcp" fill="#8b5cf6" name="GCP" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       )}

//       {/* Department Usage Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Users className="h-5 w-5" />
//             Department-wise Usage Details
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
//             <Table className="min-w-[600px]">
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Department</TableHead>
//                   <TableHead>Provider</TableHead>
//                   <TableHead>Cost</TableHead>
//                   <TableHead>Resources</TableHead>
//                   <TableHead>Users</TableHead>
//                   <TableHead>Alerts</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredDepartmentData.map((dept) => (
//                   <React.Fragment key={dept.department}>
//                     {["aws", "azure", "gcp"].map((provider) => (
//                       <TableRow key={`${dept.department}-${provider}`}>
//                         <TableCell>{dept.department}</TableCell>
//                         <TableCell className="font-medium">{provider.toUpperCase()}</TableCell>
//                         <TableCell>${dept[provider].cost.toLocaleString()}</TableCell>
//                         <TableCell>{dept[provider].resources}</TableCell>
//                         <TableCell>{dept[provider].users}</TableCell>
//                         <TableCell>
//                           <Badge variant={dept[provider].alerts > 0 ? "destructive" : "default"}>
//                             {dept[provider].alerts}
//                           </Badge>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </React.Fragment>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Resource Utilization Comparison */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Server className="h-5 w-5" />
//             Resource Utilization by Department
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={filteredDepartmentData}>
//               <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//               <XAxis dataKey="department" className="text-muted-foreground" />
//               <YAxis className="text-muted-foreground" />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "hsl(var(--popover))",
//                   border: "1px solid hsl(var(--border))",
//                   borderRadius: "8px",
//                 }}
//               />
//               <Bar dataKey="aws.resources" fill="#f59e0b" name="AWS Resources" />
//               <Bar dataKey="azure.resources" fill="#06b6d4" name="Azure Resources" />
//               <Bar dataKey="gcp.resources" fill="#8b5cf6" name="GCP Resources" />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* Alert Summary */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <AlertTriangle className="h-5 w-5" />
//             Critical Alerts Summary
//           </CardTitle>
//           <Select value={alertSeverity} onValueChange={setAlertSeverity}>
//             <SelectTrigger className="w-32">
//               <SelectValue placeholder="Severity" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Severities</SelectItem>
//               <SelectItem value="high">High</SelectItem>
//               <SelectItem value="medium">Medium</SelectItem>
//               <SelectItem value="low">Low</SelectItem>
//             </SelectContent>
//           </Select>
//         </CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
//             <Table className="min-w-[600px]">
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Provider</TableHead>
//                   <TableHead>Department</TableHead>
//                   <TableHead>Message</TableHead>
//                   <TableHead>Severity</TableHead>
//                   <TableHead>Timestamp</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredAlerts.map((alert, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{alert.provider}</TableCell>
//                     <TableCell>{alert.department}</TableCell>
//                     <TableCell>{alert.message}</TableCell>
//                     <TableCell>
//                       <Badge
//                         variant={
//                           alert.severity === "high"
//                             ? "destructive"
//                             : alert.severity === "medium"
//                             ? "default"
//                             : "secondary"
//                         }
//                       >
//                         {alert.severity}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>{alert.timestamp}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


//commented 10:14
// import React from "react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Users,
//   Server,
//   DollarSign,
//   TrendingUp,
//   Activity,
//   Target,
//   Zap,
//   ShieldCheck,
//   AlertTriangle,
//   Filter,
//   Calendar,
//   Globe,
// } from "lucide-react";
// import { MetricCard } from "@/components/MetricCard";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { useCloudService } from "@/components/CloudServiceProvider";
// import {
//   LineChart,
//   Line,
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   ComposedChart,
// } from "recharts";

// // Define types for servicesData
// interface Service {
//   name: string;
//   aws?: number;
//   azure?: number;
//   gcp?: number;
//   cost?: number;
//   usage?: number;
//   trend?: string;
//   resources?: number;
//   users?: number;
// }

// interface Trend {
//   month: string;
//   cost: number;
//   forecast: number;
//   alerts: number;
// }

// interface HistoricalCost {
//   month: string;
//   aws?: number;
//   azure?: number;
//   gcp?: number;
//   cost?: number;
// }

// interface ServiceData {
//   services: Service[];
//   trends: Trend[];
//   historicalCosts: HistoricalCost[];
// }

// // Enhanced data for cross-provider comparison
// const servicesData: Record<string, ServiceData> = {
//   all: {
//     services: [
//       { name: "Compute", aws: 25000, azure: 18000, gcp: 12000 },
//       { name: "Storage", aws: 15000, azure: 12000, gcp: 8000 },
//       { name: "Database", aws: 20000, azure: 15000, gcp: 10000 },
//       { name: "Networking", aws: 8000, azure: 6000, gcp: 4000 },
//       { name: "Analytics", aws: 12000, azure: 9000, gcp: 7000 },
//     ],
//     trends: [
//       { month: "Jan", cost: 68000, forecast: 70000, alerts: 12 },
//       { month: "Feb", cost: 72000, forecast: 74000, alerts: 8 },
//       { month: "Mar", cost: 75000, forecast: 77000, alerts: 15 },
//       { month: "Apr", cost: 78000, forecast: 80000, alerts: 10 },
//       { month: "May", cost: 82000, forecast: 83000, alerts: 18 },
//       { month: "Jun", cost: 85000, forecast: 87000, alerts: 14 },
//     ],
//     historicalCosts: [
//       { month: "Jan", aws: 42000, azure: 18000, gcp: 8000 },
//       { month: "Feb", aws: 43500, azure: 18800, gcp: 8400 },
//       { month: "Mar", aws: 45000, azure: 19500, gcp: 8800 },
//       { month: "Apr", aws: 46200, azure: 20200, gcp: 9200 },
//       { month: "May", aws: 48000, azure: 21000, gcp: 9600 },
//       { month: "Jun", aws: 49500, azure: 21800, gcp: 10000 },
//     ],
//   },
//   aws: {
//     services: [
//       { name: "S3", cost: 8500, usage: 95, trend: "+12%", resources: 120, users: 300 },
//       { name: "Lambda", cost: 3200, usage: 78, trend: "+8%", resources: 80, users: 150 },
//       { name: "Glue", cost: 1800, usage: 65, trend: "+15%", resources: 40, users: 50 },
//       { name: "Athena", cost: 950, usage: 45, trend: "+5%", resources: 20, users: 30 },
//       { name: "EC2", cost: 15600, usage: 88, trend: "+3%", resources: 200, users: 400 },
//       { name: "RDS", cost: 7200, usage: 92, trend: "+7%", resources: 100, users: 200 },
//     ],
//     trends: [
//       { month: "Jan", cost: 42000, forecast: 43000, alerts: 8 },
//       { month: "Feb", cost: 43500, forecast: 44000, alerts: 6 },
//       { month: "Mar", cost: 45000, forecast: 46000, alerts: 10 },
//       { month: "Apr", cost: 46200, forecast: 47000, alerts: 7 },
//       { month: "May", cost: 48000, forecast: 49000, alerts: 12 },
//       { month: "Jun", cost: 49500, forecast: 50000, alerts: 9 },
//     ],
//     historicalCosts: [
//       { month: "Jan", cost: 42000 },
//       { month: "Feb", cost: 43500 },
//       { month: "Mar", cost: 45000 },
//       { month: "Apr", cost: 46200 },
//       { month: "May", cost: 48000 },
//       { month: "Jun", cost: 49500 },
//     ],
//   },
//   azure: {
//     services: [
//       { name: "Blob Storage", cost: 4200, usage: 89, trend: "+10%", resources: 90, users: 200 },
//       { name: "Functions", cost: 1800, usage: 72, trend: "+14%", resources: 50, users: 100 },
//       { name: "AI/ML", cost: 2500, usage: 68, trend: "+22%", resources: 30, users: 80 },
//       { name: "Synapse", cost: 3200, usage: 75, trend: "+18%", resources: 60, users: 120 },
//       { name: "Virtual Machines", cost: 8900, usage: 85, trend: "+6%", resources: 150, users: 300 },
//       { name: "SQL Database", cost: 4100, usage: 91, trend: "+4%", resources: 80, users: 180 },
//     ],
//     trends: [
//       { month: "Jan", cost: 18000, forecast: 18500, alerts: 3 },
//       { month: "Feb", cost: 18800, forecast: 19200, alerts: 2 },
//       { month: "Mar", cost: 19500, forecast: 20000, alerts: 4 },
//       { month: "Apr", cost: 20200, forecast: 20800, alerts: 2 },
//       { month: "May", cost: 21000, forecast: 21500, alerts: 5 },
//       { month: "Jun", cost: 21800, forecast: 22200, alerts: 4 },
//     ],
//     historicalCosts: [
//       { month: "Jan", cost: 18000 },
//       { month: "Feb", cost: 18800 },
//       { month: "Mar", cost: 19500 },
//       { month: "Apr", cost: 20200 },
//       { month: "May", cost: 21000 },
//       { month: "Jun", cost: 21800 },
//     ],
//   },
//   gcp: {
//     services: [
//       { name: "Compute Engine", cost: 3800, usage: 82, trend: "+9%", resources: 70, users: 150 },
//       { name: "App Engine", cost: 1200, usage: 65, trend: "+12%", resources: 30, users: 60 },
//       { name: "GKE", cost: 2100, usage: 71, trend: "+16%", resources: 50, users: 100 },
//       { name: "Cloud Storage", cost: 1800, usage: 88, trend: "+7%", resources: 60, users: 120 },
//       { name: "BigQuery", cost: 2200, usage: 79, trend: "+11%", resources: 40, users: 80 },
//       { name: "Cloud Functions", cost: 850, usage: 58, trend: "+13%", resources: 20, users: 40 },
//     ],
//     trends: [
//       { month: "Jan", cost: 8000, forecast: 8200, alerts: 1 },
//       { month: "Feb", cost: 8400, forecast: 8600, alerts: 0 },
//       { month: "Mar", cost: 8800, forecast: 9000, alerts: 1 },
//       { month: "Apr", cost: 9200, forecast: 9400, alerts: 1 },
//       { month: "May", cost: 9600, forecast: 9800, alerts: 2 },
//       { month: "Jun", cost: 10000, forecast: 10200, alerts: 1 },
//     ],
//     historicalCosts: [
//       { month: "Jan", cost: 8000 },
//       { month: "Feb", cost: 8400 },
//       { month: "Mar", cost: 8800 },
//       { month: "Apr", cost: 9200 },
//       { month: "May", cost: 9600 },
//       { month: "Jun", cost: 10000 },
//     ],
//   },
// };

// // Enhanced department data
// const departmentUsageData = [
//   {
//     department: "Engineering",
//     aws: { cost: 35000, resources: 500, users: 800, alerts: 5 },
//     azure: { cost: 15000, resources: 300, users: 400, alerts: 3 },
//     gcp: { cost: 8000, resources: 150, users: 200, alerts: 1 },
//   },
//   {
//     department: "Data Science",
//     aws: { cost: 22000, resources: 300, users: 500, alerts: 4 },
//     azure: { cost: 18000, resources: 250, users: 350, alerts: 2 },
//     gcp: { cost: 12000, resources: 200, users: 300, alerts: 2 },
//   },
//   {
//     department: "Marketing",
//     aws: { cost: 8000, resources: 100, users: 150, alerts: 1 },
//     azure: { cost: 5000, resources: 80, users: 100, alerts: 0 },
//     gcp: { cost: 3000, resources: 50, users: 80, alerts: 0 },
//   },
//   {
//     department: "Sales",
//     aws: { cost: 3000, resources: 50, users: 80, alerts: 0 },
//     azure: { cost: 2000, resources: 40, users: 60, alerts: 0 },
//     gcp: { cost: 1000, resources: 20, users: 40, alerts: 0 },
//   },
// ];

// // Alert data
// const alertsData = [
//   { provider: "AWS", department: "Engineering", message: "EC2 cost spike detected", severity: "high", timestamp: "2025-06-15" },
//   { provider: "Azure", department: "Data Science", message: "Synapse budget overrun", severity: "medium", timestamp: "2025-06-10" },
//   { provider: "GCP", department: "Engineering", message: "BigQuery usage limit neared", severity: "low", timestamp: "2025-06-12" },
//   { provider: "AWS", department: "Data Science", message: "S3 storage cost increased", severity: "medium", timestamp: "2025-06-08" },
//   { provider: "Azure", department: "Engineering", message: "VM idle resources detected", severity: "low", timestamp: "2025-06-05" },
// ];

// // Cost distribution for pie chart
// const costDistributionData = [
//   { name: "AWS", value: 42340 },
//   { name: "Azure", value: 18650 },
//   { name: "GCP", value: 6900 },
// ];

// // Region cost data
// const regionCostData = [
//   { region: "US-East", aws: 20000, azure: 10000, gcp: 5000 },
//   { region: "US-West", aws: 15000, azure: 8000, gcp: 4000 },
//   { region: "EU-Central", aws: 10000, azure: 6000, gcp: 3000 },
//   { region: "Asia-Pacific", aws: 7340, azure: 4650, gcp: 1900 },
// ];

// const COLORS = ["#f59e0b", "#06b6d4", "#8b5cf6"];

// export default function Dashboard() {
//   const { selectedService } = useCloudService();
//   const [selectedDepartment, setSelectedDepartment] = useState("all");
//   const [selectedTimeRange, setSelectedTimeRange] = useState("6m");
//   const [alertSeverity, setAlertSeverity] = useState("all");

//   const getMetricsForService = () => {
//     const baseMetrics = {
//       all: {
//         totalUsers: 2847,
//         activeResources: 1234,
//         monthlySpend: 67890,
//         budgetUtilization: 97,
//         costPerUser: 23.84,
//         activeAlerts: alertsData.length,
//         forecastAccuracy: 97.5,
//       },
//       aws: {
//         totalUsers: 1523,
//         activeResources: 687,
//         monthlySpend: 42340,
//         budgetUtilization: 89,
//         costPerUser: 27.80,
//         activeAlerts: alertsData.filter(a => a.provider === "AWS").length,
//         forecastAccuracy: 98.2,
//       },
//       azure: {
//         totalUsers: 856,
//         activeResources: 423,
//         monthlySpend: 18650,
//         budgetUtilization: 76,
//         costPerUser: 21.79,
//         activeAlerts: alertsData.filter(a => a.provider === "Azure").length,
//         forecastAccuracy: 96.8,
//       },
//       gcp: {
//         totalUsers: 468,
//         activeResources: 124,
//         monthlySpend: 6900,
//         budgetUtilization: 45,
//         costPerUser: 14.74,
//         activeAlerts: alertsData.filter(a => a.provider === "GCP").length,
//         forecastAccuracy: 97.0,
//       },
//     };
//     return baseMetrics[selectedService];
//   };

//   const getCurrentServiceData = () => {
//     return servicesData[selectedService];
//   };

//   const filterTrendsByTimeRange = (trends: Trend[] | HistoricalCost[]) => {
//     if (selectedTimeRange === "6m") return trends;
//     const months = parseInt(selectedTimeRange);
//     return trends.slice(-months);
//   };

//   const filteredDepartmentData = selectedDepartment === "all"
//     ? departmentUsageData
//     : departmentUsageData.filter((d) => d.department === selectedDepartment);

//   const filteredAlerts = alertSeverity === "all"
//     ? alertsData
//     : alertsData.filter((a) => a.severity === alertSeverity);

//   const metrics = getMetricsForService();
//   const currentData = getCurrentServiceData();

//   return (
//     <div className="space-y-6">
//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 p-4 bg-card rounded-lg border">
//         <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
//           <SelectTrigger className="w-48">
//             <SelectValue placeholder="Department" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Departments</SelectItem>
//             {departmentUsageData.map((d) => (
//               <SelectItem key={d.department} value={d.department}>{d.department}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//         <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
//           <SelectTrigger className="w-48">
//             <SelectValue placeholder="Time Range" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="3m">Last 3 Months</SelectItem>
//             <SelectItem value="6m">Last 6 Months</SelectItem>
//             <SelectItem value="12m">Last 12 Months</SelectItem>
//           </SelectContent>
//         </Select>
//         <Button variant="outline" className="gap-2">
//           <Filter size={16} />
//           Apply Filters
//         </Button>
//       </div>

//       {/* Enhanced Metrics Grid */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <MetricCard
//           title="Total Users"
//           value={metrics.totalUsers.toLocaleString()}
//           change="+12% from last month"
//           changeType="positive"
//           icon={<Users className="h-4 w-4" />}
//         />
//         <MetricCard
//           title="Active Resources"
//           value={metrics.activeResources.toLocaleString()}
//           change="+8% from last month"
//           changeType="positive"
//           icon={<Server className="h-4 w-4" />}
//         />
//         <MetricCard
//           title="Monthly Spend"
//           value={`$${metrics.monthlySpend.toLocaleString()}`}
//           change="+5.2% from last month"
//           changeType="negative"
//           icon={<DollarSign className="h-4 w-4" />}
//         />
//         <MetricCard
//           title="Budget Utilization"
//           value={`${metrics.budgetUtilization}%`}
//           change="Near budget limit"
//           changeType={metrics.budgetUtilization > 90 ? "negative" : "positive"}
//           icon={<TrendingUp className="h-4 w-4" />}
//         />
//         <MetricCard
//           title="Cost Per User"
//           value={`$${metrics.costPerUser.toFixed(2)}`}
//           change="Stable"
//           changeType="positive"
//           icon={<Zap className="h-4 w-4" />}
//         />
//         <MetricCard
//           title="Active Alerts"
//           value={metrics.activeAlerts}
//           change={metrics.activeAlerts > 5 ? "High alert volume" : "Normal range"}
//           changeType={metrics.activeAlerts > 5 ? "negative" : "positive"}
//           icon={<AlertTriangle className="h-4 w-4" />}
//         />
//         <MetricCard
//           title="Forecast Accuracy"
//           value={`${metrics.forecastAccuracy.toFixed(1)}%`}
//           change={metrics.forecastAccuracy < 95 ? "Needs improvement" : "Highly accurate"}
//           changeType={metrics.forecastAccuracy < 95 ? "negative" : "positive"}
//           icon={<Target className="h-4 w-4" />}
//         />
//       </div>

//       {/* Historical Cost Comparison */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <DollarSign className="h-5 w-5" />
//             Historical Cost Comparison - {selectedService.toUpperCase()}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={filterTrendsByTimeRange(currentData.historicalCosts)}>
//               <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//               <XAxis dataKey="month" className="text-muted-foreground" />
//               <YAxis className="text-muted-foreground" />
//               <Tooltip
//                 formatter={(value) => [`$${value.toLocaleString()}`, "Cost"]}
//                 contentStyle={{
//                   backgroundColor: "hsl(var(--popover))",
//                   border: "1px solid hsl(var(--border))",
//                   borderRadius: "8px",
//                 }}
//               />
//               {selectedService === "all" ? (
//                 <>
//                   <Line type="monotone" dataKey="aws" stroke="#f59e0b" name="AWS" strokeWidth={2} />
//                   <Line type="monotone" dataKey="azure" stroke="#06b6d4" name="Azure" strokeWidth={2} />
//                   <Line type="monotone" dataKey="gcp" stroke="#8b5cf6" name="GCP" strokeWidth={2} />
//                 </>
//               ) : (
//                 <Line
//                   type="monotone"
//                   dataKey="cost"
//                   stroke={selectedService === "aws" ? "#f59e0b" : selectedService === "azure" ? "#06b6d4" : "#8b5cf6"}
//                   name={selectedService.toUpperCase()}
//                   strokeWidth={2}
//                 />
//               )}
//             </LineChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* Cost Trends Chart */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Activity className="h-5 w-5" />
//             Cost & Forecast Trends - {selectedService.toUpperCase()}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <ComposedChart data={filterTrendsByTimeRange(currentData.trends)}>
//               <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//               <XAxis dataKey="month" className="text-muted-foreground" />
//               <YAxis className="text-muted-foreground" />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "hsl(var(--popover))",
//                   border: "1px solid hsl(var(--border))",
//                   borderRadius: "8px",
//                 }}
//               />
//               <Area
//                 type="monotone"
//                 dataKey="cost"
//                 fill="#3b82f6"
//                 fillOpacity={0.3}
//                 stroke="#3b82f6"
//                 strokeWidth={2}
//                 name="Actual Cost"
//               />
//               <Line
//                 type="monotone"
//                 dataKey="forecast"
//                 stroke="#ef4444"
//                 strokeWidth={2}
//                 strokeDasharray="5 5"
//                 name="Forecast"
//               />
//               <Bar dataKey="alerts" fill="#f59e0b" name="Cost Alerts" />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* Cost Distribution Across Providers */}
//       {selectedService === "all" && (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <DollarSign className="h-5 w-5" />
//               Cost Distribution Across Providers
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={costDistributionData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {costDistributionData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   formatter={(value) => [`$${value.toLocaleString()}`, "Cost"]}
//                   contentStyle={{
//                     backgroundColor: "hsl(var(--popover))",
//                     border: "1px solid hsl(var(--border))",
//                     borderRadius: "8px",
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       )}

//       {/* Cost Breakdown by Region */}
//       {selectedService === "all" && (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Globe className="h-5 w-5" />
//               Cost Breakdown by Region
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
//               <Table className="min-w-[600px]">
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Region</TableHead>
//                     <TableHead>AWS</TableHead>
//                     <TableHead>Azure</TableHead>
//                     <TableHead>GCP</TableHead>
//                     <TableHead>Total</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {regionCostData.map((region) => (
//                     <TableRow key={region.region}>
//                       <TableCell>{region.region}</TableCell>
//                       <TableCell>${region.aws.toLocaleString()}</TableCell>
//                       <TableCell>${region.azure.toLocaleString()}</TableCell>
//                       <TableCell>${region.gcp.toLocaleString()}</TableCell>
//                       <TableCell>${(region.aws + region.azure + region.gcp).toLocaleString()}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Service-specific Analysis */}
//       {selectedService !== "all" ? (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Target className="h-5 w-5" />
//               {selectedService.toUpperCase()} Services Analysis
//               <Link to={`/cost-centers/${selectedService}`}>
//                 <Button variant="outline" size="sm" className="ml-4">
//                   View Cost Center
//                 </Button>
//               </Link>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//               {currentData.services.map((service) => (
//                 <div key={service.name} className="p-4 border rounded-lg bg-card">
//                   <div className="flex items-center justify-between mb-2">
//                     <h3 className="font-semibold text-sm">{service.name}</h3>
//                     <Badge variant={service.trend?.startsWith("+") ? "destructive" : "default"}>
//                       {service.trend}
//                     </Badge>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">Monthly Cost:</span>
//                       <span className="font-medium">${service.cost?.toLocaleString()}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">Usage:</span>
//                       <span className="font-medium">{service.usage}%</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">Resources:</span>
//                       <span className="font-medium">{service.resources}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">Users:</span>
//                       <span className="font-medium">{service.users}</span>
//                     </div>
//                     <div className="w-full bg-muted rounded-full h-2">
//                       <div
//                         className="bg-primary h-2 rounded-full"
//                         style={{ width: `${service.usage}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       ) : (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Target className="h-5 w-5" />
//               Multi-Cloud Service Comparison
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={currentData.services}>
//                 <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//                 <XAxis dataKey="name" className="text-muted-foreground" />
//                 <YAxis className="text-muted-foreground" />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "hsl(var(--popover))",
//                     border: "1px solid hsl(var(--border))",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <Bar dataKey="aws" fill="#f59e0b" name="AWS" />
//                 <Bar dataKey="azure" fill="#06b6d4" name="Azure" />
//                 <Bar dataKey="gcp" fill="#8b5cf6" name="GCP" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       )}

//       {/* Department Usage Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Users className="h-5 w-5" />
//             Department-wise Usage Details
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
//             <Table className="min-w-[600px]">
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Department</TableHead>
//                   <TableHead>Provider</TableHead>
//                   <TableHead>Cost</TableHead>
//                   <TableHead>Resources</TableHead>
//                   <TableHead>Users</TableHead>
//                   <TableHead>Alerts</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredDepartmentData.map((dept) => (
//                   <React.Fragment key={dept.department}>
//                     {["aws", "azure", "gcp"].map((provider) => (
//                       <TableRow key={`${dept.department}-${provider}`}>
//                         <TableCell>{dept.department}</TableCell>
//                         <TableCell className="font-medium">{provider.toUpperCase()}</TableCell>
//                         <TableCell>${dept[provider].cost.toLocaleString()}</TableCell>
//                         <TableCell>{dept[provider].resources}</TableCell>
//                         <TableCell>{dept[provider].users}</TableCell>
//                         <TableCell>
//                           <Badge variant={dept[provider].alerts > 0 ? "destructive" : "default"}>
//                             {dept[provider].alerts}
//                           </Badge>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </React.Fragment>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Resource Utilization Comparison */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Server className="h-5 w-5" />
//             Resource Utilization by Department
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={filteredDepartmentData}>
//               <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//               <XAxis dataKey="department" className="text-muted-foreground" />
//               <YAxis className="text-muted-foreground" />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "hsl(var(--popover))",
//                   border: "1px solid hsl(var(--border))",
//                   borderRadius: "8px",
//                 }}
//               />
//               <Bar dataKey="aws.resources" fill="#f59e0b" name="AWS Resources" />
//               <Bar dataKey="azure.resources" fill="#06b6d4" name="Azure Resources" />
//               <Bar dataKey="gcp.resources" fill="#8b5cf6" name="GCP Resources" />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* Alert Summary */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <AlertTriangle className="h-5 w-5" />
//             Critical Alerts Summary
//           </CardTitle>
//           <Select value={alertSeverity} onValueChange={setAlertSeverity}>
//             <SelectTrigger className="w-32">
//               <SelectValue placeholder="Severity" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Severities</SelectItem>
//               <SelectItem value="high">High</SelectItem>
//               <SelectItem value="medium">Medium</SelectItem>
//               <SelectItem value="low">Low</SelectItem>
//             </SelectContent>
//           </Select>
//         </CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
//             <Table className="min-w-[600px]">
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Provider</TableHead>
//                   <TableHead>Department</TableHead>
//                   <TableHead>Message</TableHead>
//                   <TableHead>Severity</TableHead>
//                   <TableHead>Timestamp</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredAlerts.map((alert, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{alert.provider}</TableCell>
//                     <TableCell>{alert.department}</TableCell>
//                     <TableCell>{alert.message}</TableCell>
//                     <TableCell>
//                       <Badge
//                         variant={
//                           alert.severity === "high"
//                             ? "destructive"
//                             : alert.severity === "medium"
//                             ? "default"
//                             : "secondary"
//                         }
//                       >
//                         {alert.severity}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>{alert.timestamp}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }







// import React from "react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Users,
//   Server,
//   DollarSign,
//   TrendingUp,
//   Activity,
//   Target,
//   Zap,
//   ShieldCheck,
//   AlertTriangle,
//   Filter,
//   Calendar,
//   Globe,
// } from "lucide-react";
// // import { MetricCard } from "@/components/MetricCard";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// // import { CloudService, useCloudService } from "@/components/CloudServiceProvider";
// import {
//   LineChart,
//   Line,
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   ComposedChart,
//   Legend,
// } from "recharts";
// import { CloudService, useCloudService } from "@/components/admin_components/CloudServiceProvider";
// import { MetricCard } from "@/components/admin_components/MetricCard";

// // Define types for servicesData
// interface Service {
//   name: string;
//   aws?: number;
//   azure?: number;
//   gcp?: number;
//   cost?: number;
//   usage?: number;
//   trend?: string;
//   resources?: number;
//   users?: number;
// }

// interface Trend {
//   month: string;
//   cost: number;
//   forecast: number;
//   alerts: number;
// }

// interface HistoricalCost {
//   month: string;
//   aws?: number;
//   azure?: number;
//   gcp?: number;
//   cost?: number;
// }

// interface ServiceData {
//   services: Service[];
//   trends: Trend[];
//   historicalCosts: HistoricalCost[];
// }

// // Enhanced data for cross-provider comparison
// const servicesData: Record<string, ServiceData> = {
//   all: {
//     services: [
//       { name: "Compute", aws: 25000, azure: 18000, gcp: 12000 },
//       { name: "Storage", aws: 15000, azure: 12000, gcp: 8000 },
//       { name: "Database", aws: 20000, azure: 15000, gcp: 10000 },
//       { name: "Networking", aws: 8000, azure: 6000, gcp: 4000 },
//       { name: "Analytics", aws: 12000, azure: 9000, gcp: 7000 },
//     ],
//     trends: [
//       { month: "Jan", cost: 68000, forecast: 70000, alerts: 12 },
//       { month: "Feb", cost: 72000, forecast: 74000, alerts: 8 },
//       { month: "Mar", cost: 75000, forecast: 77000, alerts: 15 },
//       { month: "Apr", cost: 78000, forecast: 80000, alerts: 10 },
//       { month: "May", cost: 82000, forecast: 83000, alerts: 18 },
//       { month: "Jun", cost: 85000, forecast: 87000, alerts: 14 },
//     ],
//     historicalCosts: [
//       { month: "Jan", aws: 42000, azure: 18000, gcp: 8000 },
//       { month: "Feb", aws: 43500, azure: 18800, gcp: 8400 },
//       { month: "Mar", aws: 45000, azure: 19500, gcp: 8800 },
//       { month: "Apr", aws: 46200, azure: 20200, gcp: 9200 },
//       { month: "May", aws: 48000, azure: 21000, gcp: 9600 },
//       { month: "Jun", aws: 49500, azure: 21800, gcp: 10000 },
//     ],
//   },
//   aws: {
//     services: [
//       { name: "S3", cost: 8500, usage: 95, trend: "+12%", resources: 120, users: 300 },
//       { name: "Lambda", cost: 3200, usage: 78, trend: "+8%", resources: 80, users: 150 },
//       { name: "Glue", cost: 1800, usage: 65, trend: "+15%", resources: 40, users: 50 },
//       { name: "Athena", cost: 950, usage: 45, trend: "+5%", resources: 20, users: 30 },
//       { name: "EC2", cost: 15600, usage: 88, trend: "+3%", resources: 200, users: 400 },
//       { name: "RDS", cost: 7200, usage: 92, trend: "+7%", resources: 100, users: 200 },
//     ],
//     trends: [
//       { month: "Jan", cost: 42000, forecast: 43000, alerts: 8 },
//       { month: "Feb", cost: 43500, forecast: 44000, alerts: 6 },
//       { month: "Mar", cost: 45000, forecast: 46000, alerts: 10 },
//       { month: "Apr", cost: 46200, forecast: 47000, alerts: 7 },
//       { month: "May", cost: 48000, forecast: 49000, alerts: 12 },
//       { month: "Jun", cost: 49500, forecast: 50000, alerts: 9 },
//     ],
//     historicalCosts: [
//       { month: "Jan", cost: 42000 },
//       { month: "Feb", cost: 43500 },
//       { month: "Mar", cost: 45000 },
//       { month: "Apr", cost: 46200 },
//       { month: "May", cost: 48000 },
//       { month: "Jun", cost: 49500 },
//     ],
//   },
//   azure: {
//     services: [
//       { name: "Blob Storage", cost: 4200, usage: 89, trend: "+10%", resources: 90, users: 200 },
//       { name: "Functions", cost: 1800, usage: 72, trend: "+14%", resources: 50, users: 100 },
//       { name: "AI/ML", cost: 2500, usage: 68, trend: "+22%", resources: 30, users: 80 },
//       { name: "Synapse", cost: 3200, usage: 75, trend: "+18%", resources: 60, users: 120 },
//       { name: "Virtual Machines", cost: 8900, usage: 85, trend: "+6%", resources: 150, users: 300 },
//       { name: "SQL Database", cost: 4100, usage: 91, trend: "+4%", resources: 80, users: 180 },
//     ],
//     trends: [
//       { month: "Jan", cost: 18000, forecast: 18500, alerts: 3 },
//       { month: "Feb", cost: 18800, forecast: 19200, alerts: 2 },
//       { month: "Mar", cost: 19500, forecast: 20000, alerts: 4 },
//       { month: "Apr", cost: 20200, forecast: 20800, alerts: 2 },
//       { month: "May", cost: 21000, forecast: 21500, alerts: 5 },
//       { month: "Jun", cost: 21800, forecast: 22200, alerts: 4 },
//     ],
//     historicalCosts: [
//       { month: "Jan", cost: 18000 },
//       { month: "Feb", cost: 18800 },
//       { month: "Mar", cost: 19500 },
//       { month: "Apr", cost: 20200 },
//       { month: "May", cost: 21000 },
//       { month: "Jun", cost: 21800 },
//     ],
//   },
//   gcp: {
//     services: [
//       { name: "Compute Engine", cost: 3800, usage: 82, trend: "+9%", resources: 70, users: 150 },
//       { name: "App Engine", cost: 1200, usage: 65, trend: "+12%", resources: 30, users: 60 },
//       { name: "GKE", cost: 2100, usage: 71, trend: "+16%", resources: 50, users: 100 },
//       { name: "Cloud Storage", cost: 1800, usage: 88, trend: "+7%", resources: 60, users: 120 },
//       { name: "BigQuery", cost: 2200, usage: 79, trend: "+11%", resources: 40, users: 80 },
//       { name: "Cloud Functions", cost: 850, usage: 58, trend: "+13%", resources: 20, users: 40 },
//     ],
//     trends: [
//       { month: "Jan", cost: 8000, forecast: 8200, alerts: 1 },
//       { month: "Feb", cost: 8400, forecast: 8600, alerts: 0 },
//       { month: "Mar", cost: 8800, forecast: 9000, alerts: 1 },
//       { month: "Apr", cost: 9200, forecast: 9400, alerts: 1 },
//       { month: "May", cost: 9600, forecast: 9800, alerts: 2 },
//       { month: "Jun", cost: 10000, forecast: 10200, alerts: 1 },
//     ],
//     historicalCosts: [
//       { month: "Jan", cost: 8000 },
//       { month: "Feb", cost: 8400 },
//       { month: "Mar", cost: 8800 },
//       { month: "Apr", cost: 9200 },
//       { month: "May", cost: 9600 },
//       { month: "Jun", cost: 10000 },
//     ],
//   },
// };

// // Enhanced department data
// const departmentUsageData = [
//   {
//     department: "Engineering",
//     aws: { cost: 35000, resources: 500, users: 800, alerts: 5 },
//     azure: { cost: 15000, resources: 300, users: 400, alerts: 3 },
//     gcp: { cost: 8000, resources: 150, users: 200, alerts: 1 },
//   },
//   {
//     department: "Data Science",
//     aws: { cost: 22000, resources: 300, users: 500, alerts: 4 },
//     azure: { cost: 18000, resources: 250, users: 350, alerts: 2 },
//     gcp: { cost: 12000, resources: 200, users: 300, alerts: 2 },
//   },
//   {
//     department: "Marketing",
//     aws: { cost: 8000, resources: 100, users: 150, alerts: 1 },
//     azure: { cost: 5000, resources: 80, users: 100, alerts: 0 },
//     gcp: { cost: 3000, resources: 50, users: 80, alerts: 0 },
//   },
//   {
//     department: "Sales",
//     aws: { cost: 3000, resources: 50, users: 80, alerts: 0 },
//     azure: { cost: 2000, resources: 40, users: 60, alerts: 0 },
//     gcp: { cost: 1000, resources: 20, users: 40, alerts: 0 },
//   },
// ];

// // Alert data
// const alertsData = [
//   { provider: "AWS", department: "Engineering", message: "EC2 cost spike detected", severity: "high", timestamp: "2025-06-15" },
//   { provider: "Azure", department: "Data Science", message: "Synapse budget overrun", severity: "medium", timestamp: "2025-06-10" },
//   { provider: "GCP", department: "Engineering", message: "BigQuery usage limit neared", severity: "low", timestamp: "2025-06-12" },
//   { provider: "AWS", department: "Data Science", message: "S3 storage cost increased", severity: "medium", timestamp: "2025-06-08" },
//   { provider: "Azure", department: "Engineering", message: "VM idle resources detected", severity: "low", timestamp: "2025-06-05" },
// ];

// // Cost distribution for pie chart
// const costDistributionData = [
//   { name: "AWS", value: 42340 },
//   { name: "Azure", value: 18650 },
//   { name: "GCP", value: 6900 },
// ];

// // Region cost data
// const regionCostData = [
//   { region: "US-East", aws: 20000, azure: 10000, gcp: 5000 },
//   { region: "US-West", aws: 15000, azure: 8000, gcp: 4000 },
//   { region: "EU-Central", aws: 10000, azure: 6000, gcp: 3000 },
//   { region: "Asia-Pacific", aws: 7340, azure: 4650, gcp: 1900 },
// ];

// const COLORS = ["#f59e0b", "#06b6d4", "#8b5cf6"];

// const cloudServices = [
//   { value: 'all', label: 'All Services' },
//   { value: 'aws', label: 'Amazon AWS' },
//   { value: 'azure', label: 'Microsoft Azure' },
//   { value: 'gcp', label: 'Google Cloud Platform' },
// ];

// export default function Dashboard() {
//   const { selectedService, setSelectedService } = useCloudService();
//   const [selectedDepartment, setSelectedDepartment] = useState("all");
//   const [selectedTimeRange, setSelectedTimeRange] = useState("6m");
//   const [alertSeverity, setAlertSeverity] = useState("all");
//   const [isUsersOpen, setIsUsersOpen] = useState(false);
//   const [isResourcesOpen, setIsResourcesOpen] = useState(false);
//   const [isSpendOpen, setIsSpendOpen] = useState(false);
//   const [isBudgetOpen, setIsBudgetOpen] = useState(false);
//   const [isCostPerUserOpen, setIsCostPerUserOpen] = useState(false); // Corrected state
//   const [isAlertsOpen, setIsAlertsOpen] = useState(false);
//   const [isForecastOpen, setIsForecastOpen] = useState(false);
//   // const { selectedService, setSelectedService } = useCloudService();

//   const getMetricsForService = () => {
//     const baseMetrics = {
//       all: {
//         totalUsers: 2847,
//         activeResources: 1234,
//         monthlySpend: "$67890",
//         budgetUtilization: 97,
//         costPerUser: "$23.84",
//         activeAlerts: alertsData.length,
//         forecastAccuracy: 97.5,
//       },
//       aws: {
//         totalUsers: 1523,
//         activeResources: 687,
//         monthlySpend: "$42340",
//         budgetUtilization: 89,
//         costPerUser: "$27.80",
//         activeAlerts: alertsData.filter(a => a.provider === "AWS").length,
//         forecastAccuracy: 98.2,
//       },
//       azure: {
//         totalUsers: 856,
//         activeResources: 423,
//         monthlySpend: "$18650",
//         budgetUtilization: 76,
//         costPerUser: "$21.79",
//         activeAlerts: alertsData.filter(a => a.provider === "Azure").length,
//         forecastAccuracy: 96.8,
//       },
//       gcp: {
//         totalUsers: 468,
//         activeResources: 124,
//         monthlySpend: "$6900",
//         budgetUtilization: 45,
//         costPerUser: "$14.74",
//         activeAlerts: alertsData.filter(a => a.provider === "GCP").length,
//         forecastAccuracy: 97.0,
//       },
//     };
//     return baseMetrics[selectedService];
//   };

//   const getCurrentServiceData = () => {
//     return servicesData[selectedService];
//   };

//   const filterTrendsByTimeRange = (trends: Trend[] | HistoricalCost[]) => {
//     if (selectedTimeRange === "6m") return trends;
//     const months = parseInt(selectedTimeRange);
//     return trends.slice(-months);
//   };

//   const filteredDepartmentData = selectedDepartment === "all"
//     ? departmentUsageData
//     : departmentUsageData.filter((d) => d.department === selectedDepartment);

//   const filteredAlerts = alertSeverity === "all"
//     ? alertsData
//     : alertsData.filter((a) => a.severity === alertSeverity);

//   const metrics = getMetricsForService();
//   const currentData = getCurrentServiceData();

//   return (
//     <div className="space-y-6">
//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 p-4 bg-card rounded-lg border space-x-12">
//         <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
//           <SelectTrigger className="w-48">
//             <SelectValue placeholder="Department" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Departments</SelectItem>
//             {departmentUsageData.map((d) => (
//               <SelectItem key={d.department} value={d.department}>{d.department}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//         <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
//           <SelectTrigger className="w-48">
//             <SelectValue placeholder="Time Range" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="3m">Last 3 Months</SelectItem>
//             <SelectItem value="6m">Last 6 Months</SelectItem>
//             <SelectItem value="12m">Last 12 Months</SelectItem>
//           </SelectContent>
//         </Select>
//         <Button variant="outline" className="gap-2">
//           <Filter size={16} />
//           Apply Filters
//         </Button>

//         <Select
//           value={selectedService}
//           onValueChange={(value: CloudService) => setSelectedService(value)}
//         >
//           <SelectTrigger className="w-48 bg-background">
//             <SelectValue />
//           </SelectTrigger>
//           <SelectContent className="bg-popover border">
//             {cloudServices.map((service) => (
//               <SelectItem key={service.value} value={service.value}>
//                 {service.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Enhanced Metrics Grid */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <MetricCard
//           title="Total Users"
//           value={metrics.totalUsers}
//           change="+12% from last month"
//           changeType="positive"
//           icon={<Users className="h-4 w-4" />}
//           // onClick={() => setIsUsersOpen(!isUsersOpen)}
//         />
//         <MetricCard
//           title="Active Resources"
//           value={metrics.activeResources}
//           change="+8% from last month"
//           changeType="positive"
//           icon={<Server className="h-4 w-4" />}
//           // onClick={() => setIsResourcesOpen(!isResourcesOpen)}
//         />
//         <MetricCard
//           title="Monthly Spend"
//           value={metrics.monthlySpend}
//           change="+5.2% from last month"
//           changeType="negative"
//           icon={<DollarSign className="h-4 w-4" />}
//           // onClick={() => setIsSpendOpen(!isSpendOpen)}
//         />
//         <MetricCard
//           title="Budget Utilization"
//           value={metrics.budgetUtilization}
//           change="Near budget limit"
//           changeType={metrics.budgetUtilization > 90 ? "negative" : "positive"}
//           icon={<TrendingUp className="h-4 w-4" />}
//           // onClick={() => setIsBudgetOpen(!isBudgetOpen)}
//         />
//         <MetricCard
//           title="Cost Per User"
//           value={metrics.costPerUser} // Pass as number, formatted in MetricCard
//           change="Stable"
//           changeType="positive"
//           icon={<Zap className="h-4 w-4" />}
//           // onClick={() => setIsCostPerUserOpen(!isCostPerUserOpen)}
//         />
//         <MetricCard
//           title="Active Alerts"
//           value={metrics.activeAlerts}
//           change={metrics.activeAlerts > 5 ? "High alert volume" : "Normal range"}
//           changeType={metrics.activeAlerts > 5 ? "negative" : "positive"}
//           icon={<AlertTriangle className="h-4 w-4" />}
//           // onClick={() => setIsAlertsOpen(!isAlertsOpen)}
//         />
//         <MetricCard
//           title="Forecast Accuracy"
//           value={metrics.forecastAccuracy}
//           change={metrics.forecastAccuracy < 95 ? "Needs improvement" : "Highly accurate"}
//           changeType={metrics.forecastAccuracy < 95 ? "negative" : "positive"}
//           icon={<Target className="h-4 w-4" />}
//           // onClick={() => setIsForecastOpen(!isForecastOpen)}
//         />
//       </div>

//       {/* Related Content Sections */}
//       {isUsersOpen && (
//         <Card className="transition-all duration-300">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Users className="h-5 w-5" />
//               User Distribution Details
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table className="min-w-[600px]">
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Department</TableHead>
//                   <TableHead>AWS Users</TableHead>
//                   <TableHead>Azure Users</TableHead>
//                   <TableHead>GCP Users</TableHead>
//                   <TableHead>Total Users</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredDepartmentData.map((dept) => (
//                   <TableRow key={dept.department}>
//                     <TableCell>{dept.department}</TableCell>
//                     <TableCell>{dept.aws.users}</TableCell>
//                     <TableCell>{dept.azure.users}</TableCell>
//                     <TableCell>{dept.gcp.users}</TableCell>
//                     <TableCell>{dept.aws.users + dept.azure.users + dept.gcp.users}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       )}
//       {isResourcesOpen && (
//         <Card className="transition-all duration-300">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Server className="h-5 w-5" />
//               Resource Utilization Trends
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={filterTrendsByTimeRange(currentData.trends)}>
//                 <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//                 <XAxis dataKey="month" className="text-muted-foreground" />
//                 <YAxis className="text-muted-foreground" />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "hsl(var(--popover))",
//                     border: "1px solid hsl(var(--border))",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <Bar dataKey="cost" fill="#3b82f6" name="Active Resources (Cost Proxy)" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       )}
//       {isSpendOpen && (
//         <Card className="transition-all duration-300">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <DollarSign className="h-5 w-5" />
//               Monthly Spend Breakdown
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table className="min-w-[600px]">
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Service</TableHead>
//                   <TableHead>AWS</TableHead>
//                   <TableHead>Azure</TableHead>
//                   <TableHead>GCP</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {currentData.services.map((service) => (
//                   <TableRow key={service.name}>
//                     <TableCell>{service.name}</TableCell>
//                     <TableCell>${service.aws?.toLocaleString() || "N/A"}</TableCell>
//                     <TableCell>${service.azure?.toLocaleString() || "N/A"}</TableCell>
//                     <TableCell>${service.gcp?.toLocaleString() || "N/A"}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       )}
//       {isBudgetOpen && (
//         <Card className="transition-all duration-300">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <TrendingUp className="h-5 w-5" />
//               Budget Utilization Status
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-lg">Budget Utilization: {metrics.budgetUtilization}% as of {new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
//             {metrics.budgetUtilization > 90 && (
//               <Badge variant="destructive" className="mt-2">Alert: Near Budget Limit</Badge>
//             )}
//             <Table className="min-w-[600px] mt-4">
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Provider</TableHead>
//                   <TableHead>Budget %</TableHead>
//                   <TableHead>Alerts</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {["aws", "azure", "gcp"].map((provider) => (
//                   <TableRow key={provider}>
//                     <TableCell>{provider.toUpperCase()}</TableCell>
//                     <TableCell>{getMetricsForService()[provider].budgetUtilization}%</TableCell>
//                     <TableCell>{getMetricsForService()[provider].activeAlerts}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       )}
//       {isCostPerUserOpen && (
//         <Card className="transition-all duration-300">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Zap className="h-5 w-5" />
//               Cost Per User Trends
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={filterTrendsByTimeRange(currentData.trends.map(t => ({ ...t, costPerUser: metrics.costPerUser })))}>
//                 <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//                 <XAxis dataKey="month" className="text-muted-foreground" />
//                 <YAxis className="text-muted-foreground" />
//                 <Tooltip
//                   formatter={(value) => [`$${value.toFixed(2)}`, "Cost Per User"]}
//                   contentStyle={{
//                     backgroundColor: "hsl(var(--popover))",
//                     border: "1px solid hsl(var(--border))",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <Line type="monotone" dataKey="costPerUser" stroke="#3b82f6" name="Cost Per User" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       )}
//       {isAlertsOpen && (
//         <Card className="transition-all duration-300">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <AlertTriangle className="h-5 w-5" />
//               Active Alerts Details
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table className="min-w-[600px]">
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Provider</TableHead>
//                   <TableHead>Department</TableHead>
//                   <TableHead>Message</TableHead>
//                   <TableHead>Severity</TableHead>
//                   <TableHead>Timestamp</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredAlerts.map((alert, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{alert.provider}</TableCell>
//                     <TableCell>{alert.department}</TableCell>
//                     <TableCell>{alert.message}</TableCell>
//                     <TableCell>
//                       <Badge
//                         variant={
//                           alert.severity === "high"
//                             ? "destructive"
//                             : alert.severity === "medium"
//                               ? "default"
//                               : "secondary"
//                         }
//                       >
//                         {alert.severity}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>{alert.timestamp}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       )}
//       {isForecastOpen && (
//         <Card className="transition-all duration-300">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Target className="h-5 w-5" />
//               Forecast Accuracy Details
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <ComposedChart data={filterTrendsByTimeRange(currentData.trends)}>
//                 <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//                 <XAxis dataKey="month" className="text-muted-foreground" />
//                 <YAxis className="text-muted-foreground" />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "hsl(var(--popover))",
//                     border: "1px solid hsl(var(--border))",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="cost"
//                   fill="#3b82f6"
//                   fillOpacity={0.3}
//                   stroke="#3b82f6"
//                   strokeWidth={2}
//                   name="Actual Cost"
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="forecast"
//                   stroke="#ef4444"
//                   strokeWidth={2}
//                   strokeDasharray="5 5"
//                   name="Forecast"
//                 />
//               </ComposedChart>
//             </ResponsiveContainer>
//             <p className="mt-4">Accuracy: {metrics.forecastAccuracy}% as of {new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
//           </CardContent>
//         </Card>
//       )}

//       {/* Historical Cost Comparison
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <DollarSign className="h-5 w-5" />
//             Historical Cost Comparison - {selectedService.toUpperCase()}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={filterTrendsByTimeRange(currentData.historicalCosts)}>
//               <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//               <XAxis dataKey="month" className="text-muted-foreground" />
//               <YAxis className="text-muted-foreground" />
//               <Tooltip
//                 formatter={(value) => [`$${value.toLocaleString()}`, "Cost"]}
//                 contentStyle={{
//                   backgroundColor: "hsl(var(--popover))",
//                   border: "1px solid hsl(var(--border))",
//                   borderRadius: "8px",
//                 }}
//               />
//               {selectedService === "all" ? (
//                 <>
//                   <Line type="monotone" dataKey="aws" stroke="#f59e0b" name="AWS" strokeWidth={2} />
//                   <Line type="monotone" dataKey="azure" stroke="#06b6d4" name="Azure" strokeWidth={2} />
//                   <Line type="monotone" dataKey="gcp" stroke="#8b5cf6" name="GCP" strokeWidth={2} />
//                 </>
//               ) : (
//                 <Line
//                   type="monotone"
//                   dataKey="cost"
//                   stroke={selectedService === "aws" ? "#f59e0b" : selectedService === "azure" ? "#06b6d4" : "#8b5cf6"}
//                   name={selectedService.toUpperCase()}
//                   strokeWidth={2}
//                 />
//               )}
//             </LineChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card> */}

//       {/* Historical Cost Comparison */}
// <Card>
//   <CardHeader>
//     <CardTitle className="flex items-center gap-2">
//       <DollarSign className="h-5 w-5" />
//       Historical Cost Comparison - {selectedService.toUpperCase()}
//     </CardTitle>
//   </CardHeader>
//   <CardContent>
//     <ResponsiveContainer width="100%" height={320}>
//       <LineChart data={filterTrendsByTimeRange(currentData.historicalCosts)}>
//         <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//         <XAxis dataKey="month" className="text-muted-foreground" />
//         <YAxis className="text-muted-foreground" />
//         <Tooltip
//           formatter={(value) => [`$${value.toLocaleString()}`, "Cost"]}
//           contentStyle={{
//             backgroundColor: "hsl(var(--popover))",
//             border: "1px solid hsl(var(--border))",
//             borderRadius: "8px",
//           }}
//         />
//         {/* ✅ Add Legend to display service name & color */}
//         <Legend
//           verticalAlign="top"
//           align="right"
//           wrapperStyle={{
//             paddingBottom: "10px",
//             fontSize: "14px",
//           }}
//         />

//         {/* ✅ Show all services if 'All' is selected, otherwise show the single service */}
//         {selectedService === "all" ? (
//           <>
//             <Line
//               type="monotone"
//               dataKey="aws"
//               stroke="#f59e0b"
//               name="AWS"
//               strokeWidth={2}
//               dot={{ r: 4 }}
//               activeDot={{ r: 6 }}
//             />
//             <Line
//               type="monotone"
//               dataKey="azure"
//               stroke="#06b6d4"
//               name="Azure"
//               strokeWidth={2}
//               dot={{ r: 4 }}
//               activeDot={{ r: 6 }}
//             />
//             <Line
//               type="monotone"
//               dataKey="gcp"
//               stroke="#8b5cf6"
//               name="GCP"
//               strokeWidth={2}
//               dot={{ r: 4 }}
//               activeDot={{ r: 6 }}
//             />
//           </>
//         ) : (
//           <Line
//             type="monotone"
//             dataKey="cost"
//             stroke={
//               selectedService === "aws"
//                 ? "#f59e0b"
//                 : selectedService === "azure"
//                 ? "#06b6d4"
//                 : "#8b5cf6"
//             }
//             name={selectedService.toUpperCase()}
//             strokeWidth={2}
//             dot={{ r: 4 }}
//             activeDot={{ r: 6 }}
//           />
//         )}
//       </LineChart>
//     </ResponsiveContainer>
//   </CardContent>
// </Card>


//       Cost Trends Chart
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Activity className="h-5 w-5" />
//             Cost & Forecast Trends - {selectedService.toUpperCase()}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <ComposedChart data={filterTrendsByTimeRange(currentData.trends)}>
//               <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//               <XAxis dataKey="month" className="text-muted-foreground" />
//               <YAxis className="text-muted-foreground" />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "hsl(var(--popover))",
//                   border: "1px solid hsl(var(--border))",
//                   borderRadius: "8px",
//                 }}
//               />
//               <Area
//                 type="monotone"
//                 dataKey="cost"
//                 fill="#3b82f6"
//                 fillOpacity={0.3}
//                 stroke="#3b82f6"
//                 strokeWidth={2}
//                 name="Actual Cost"
//               />
//               <Line
//                 type="monotone"
//                 dataKey="forecast"
//                 stroke="#ef4444"
//                 strokeWidth={2}
//                 strokeDasharray="5 5"
//                 name="Forecast"
//               />
//               <Bar dataKey="alerts" fill="#f59e0b" name="Cost Alerts" />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* Cost Distribution Across Providers */}
//       {selectedService === "all" && (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <DollarSign className="h-5 w-5" />
//               Cost Distribution Across Providers
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={costDistributionData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {costDistributionData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   formatter={(value) => [`$${value.toLocaleString()}`, "Cost"]}
//                   contentStyle={{
//                     backgroundColor: "hsl(var(--popover))",
//                     border: "1px solid hsl(var(--border))",
//                     borderRadius: "8px",
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       )}

//       {/* Cost Breakdown by Region */}
//       {selectedService === "all" && (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Globe className="h-5 w-5" />
//               Cost Breakdown by Region
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
//               <Table className="min-w-[600px]">
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Region</TableHead>
//                     <TableHead>AWS</TableHead>
//                     <TableHead>Azure</TableHead>
//                     <TableHead>GCP</TableHead>
//                     <TableHead>Total</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {regionCostData.map((region) => (
//                     <TableRow key={region.region}>
//                       <TableCell>{region.region}</TableCell>
//                       <TableCell>${region.aws.toLocaleString()}</TableCell>
//                       <TableCell>${region.azure.toLocaleString()}</TableCell>
//                       <TableCell>${region.gcp.toLocaleString()}</TableCell>
//                       <TableCell>${(region.aws + region.azure + region.gcp).toLocaleString()}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Service-specific Analysis */}
//       {selectedService !== "all" ? (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Target className="h-5 w-5" />
//               {selectedService.toUpperCase()} Services Analysis
//               <Link to={`/cost-centers/${selectedService}`}>
//                 <Button variant="outline" size="sm" className="ml-4">
//                   View Cost Center
//                 </Button>
//               </Link>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//               {currentData.services.map((service) => (
//                 <div key={service.name} className="p-4 border rounded-lg bg-card">
//                   <div className="flex items-center justify-between mb-2">
//                     <h3 className="font-semibold text-sm">{service.name}</h3>
//                     <Badge variant={service.trend?.startsWith("+") ? "destructive" : "default"}>
//                       {service.trend}
//                     </Badge>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">Monthly Cost:</span>
//                       <span className="font-medium">${service.cost?.toLocaleString()}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">Usage:</span>
//                       <span className="font-medium">{service.usage}%</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">Resources:</span>
//                       <span className="font-medium">{service.resources}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">Users:</span>
//                       <span className="font-medium">{service.users}</span>
//                     </div>
//                     <div className="w-full bg-muted rounded-full h-2">
//                       <div
//                         className="bg-primary h-2 rounded-full"
//                         style={{ width: `${service.usage}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       ) : (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Target className="h-5 w-5" />
//               Multi-Cloud Service Comparison
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={currentData.services}>
//                 <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//                 <XAxis dataKey="name" className="text-muted-foreground" />
//                 <YAxis className="text-muted-foreground" />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "hsl(var(--popover))",
//                     border: "1px solid hsl(var(--border))",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <Bar dataKey="aws" fill="#f59e0b" name="AWS" />
//                 <Bar dataKey="azure" fill="#06b6d4" name="Azure" />
//                 <Bar dataKey="gcp" fill="#8b5cf6" name="GCP" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       )}

//       {/* Department Usage Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Users className="h-5 w-5" />
//             Department-wise Usage Details
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
//             <Table className="min-w-[600px]">
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Department</TableHead>
//                   <TableHead>Provider</TableHead>
//                   <TableHead>Cost</TableHead>
//                   <TableHead>Resources</TableHead>
//                   <TableHead>Users</TableHead>
//                   <TableHead>Alerts</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredDepartmentData.map((dept) => (
//                   <React.Fragment key={dept.department}>
//                     {["aws", "azure", "gcp"].map((provider) => (
//                       <TableRow key={`${dept.department}-${provider}`}>
//                         <TableCell>{dept.department}</TableCell>
//                         <TableCell className="font-medium">{provider.toUpperCase()}</TableCell>
//                         <TableCell>${dept[provider].cost.toLocaleString()}</TableCell>
//                         <TableCell>{dept[provider].resources}</TableCell>
//                         <TableCell>{dept[provider].users}</TableCell>
//                         <TableCell>
//                           <Badge variant={dept[provider].alerts > 0 ? "destructive" : "default"}>
//                             {dept[provider].alerts}
//                           </Badge>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </React.Fragment>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Resource Utilization Comparison */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Server className="h-5 w-5" />
//             Resource Utilization by Department
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={filteredDepartmentData}>
//               <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//               <XAxis dataKey="department" className="text-muted-foreground" />
//               <YAxis className="text-muted-foreground" />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "hsl(var(--popover))",
//                   border: "1px solid hsl(var(--border))",
//                   borderRadius: "8px",
//                 }}
//               />
//               <Bar dataKey="aws.resources" fill="#f59e0b" name="AWS Resources" />
//               <Bar dataKey="azure.resources" fill="#06b6d4" name="Azure Resources" />
//               <Bar dataKey="gcp.resources" fill="#8b5cf6" name="GCP Resources" />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* Alert Summary */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <AlertTriangle className="h-5 w-5" />
//             Critical Alerts Summary
//           </CardTitle>
//           <Select value={alertSeverity} onValueChange={setAlertSeverity}>
//             <SelectTrigger className="w-32">
//               <SelectValue placeholder="Severity" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Severities</SelectItem>
//               <SelectItem value="high">High</SelectItem>
//               <SelectItem value="medium">Medium</SelectItem>
//               <SelectItem value="low">Low</SelectItem>
//             </SelectContent>
//           </Select>
//         </CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
//             <Table className="min-w-[600px]">
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Provider</TableHead>
//                   <TableHead>Department</TableHead>
//                   <TableHead>Message</TableHead>
//                   <TableHead>Severity</TableHead>
//                   <TableHead>Timestamp</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredAlerts.map((alert, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{alert.provider}</TableCell>
//                     <TableCell>{alert.department}</TableCell>
//                     <TableCell>{alert.message}</TableCell>
//                     <TableCell>
//                       <Badge
//                         variant={
//                           alert.severity === "high"
//                             ? "destructive"
//                             : alert.severity === "medium"
//                               ? "default"
//                               : "secondary"
//                         }
//                       >
//                         {alert.severity}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>{alert.timestamp}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Server,
  DollarSign,
  TrendingUp,
  Activity,
  Target,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Filter,
  Calendar,
  Globe,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
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
  ComposedChart,
  Legend,
} from "recharts";
// import { CloudService, useCloudService } from "@/components/admin_components/CloudServiceProvider";
import { MetricCard } from "@/components/admin_components/MetricCard";
import { useCloudProvider } from "@/context/CloudProviderContext";

// Define types for servicesData
interface Service {
  name: string;
  AWS?: number;
  Azure?: number;
  GCP?: number;
  cost?: number;
  usage?: number;
  trend?: string;
  resources?: number;
  users?: number;
}

interface Trend {
  month: string;
  cost: number;
  forecast: number;
  alerts: number;
}

interface HistoricalCost {
  month: string;
  AWS?: number;
  Azure?: number;
  GCP?: number;
  cost?: number;
}

interface ServiceData {
  services: Service[];
  trends: Trend[];
  historicalCosts: HistoricalCost[];
}

interface APIResponse {
  summary: {
    totalCost: number;
    forecastTotal: number;
    currency: string;
    period: {
      start: string;
      end: string;
    };
  };
  daily_total_trend: Array<{
    date: string;
    cost: number;
  }>;
  daily_service_trend: Array<{
    date: number;
    [serviceName: string]: number;
  }>;
  forecast: Array<{
    date: string;
    forecast: number;
  }>;
  services: Array<{
    service: string;
    cost: number;
  }>;
  resources: Array<{
    account: string;
    cost: number;
  }>;
  cards: {
    total_cost: number;
    top_service: {
      service: string;
      cost: number;
    };
    top_resource: {
      account: string;
      cost: number;
    };
    accessed_services: number;
    idle_spend: number;
    budget_usage: any;
  };
  "Top Resources by Cost": Array<{
    resource: string;
    cost: number;
  }>;
}

// Mock data for Azure and GCP (unchanged)
const mockAzureGcpData: Record<string, ServiceData> = {
  azure: {
    services: [
      { name: "Blob Storage", cost: 4200, usage: 89, trend: "+10%", resources: 90, users: 200 },
      { name: "Functions", cost: 1800, usage: 72, trend: "+14%", resources: 50, users: 100 },
      { name: "AI/ML", cost: 2500, usage: 68, trend: "+22%", resources: 30, users: 80 },
      { name: "Synapse", cost: 3200, usage: 75, trend: "+18%", resources: 60, users: 120 },
      { name: "Virtual Machines", cost: 8900, usage: 85, trend: "+6%", resources: 150, users: 300 },
      { name: "SQL Database", cost: 4100, usage: 91, trend: "+4%", resources: 80, users: 180 },
    ],
    trends: [
      { month: "Jan", cost: 18000, forecast: 18500, alerts: 3 },
      { month: "Feb", cost: 18800, forecast: 19200, alerts: 2 },
      { month: "Mar", cost: 19500, forecast: 20000, alerts: 4 },
      { month: "Apr", cost: 20200, forecast: 20800, alerts: 2 },
      { month: "May", cost: 21000, forecast: 21500, alerts: 5 },
      { month: "Jun", cost: 21800, forecast: 22200, alerts: 4 },
    ],
    historicalCosts: [
      { month: "Jan", cost: 18000 },
      { month: "Feb", cost: 18800 },
      { month: "Mar", cost: 19500 },
      { month: "Apr", cost: 20200 },
      { month: "May", cost: 21000 },
      { month: "Jun", cost: 21800 },
    ],
  },
  gcp: {
    services: [
      { name: "Compute Engine", cost: 3800, usage: 82, trend: "+9%", resources: 70, users: 150 },
      { name: "App Engine", cost: 1200, usage: 65, trend: "+12%", resources: 30, users: 60 },
      { name: "GKE", cost: 2100, usage: 71, trend: "+16%", resources: 50, users: 100 },
      { name: "Cloud Storage", cost: 1800, usage: 88, trend: "+7%", resources: 60, users: 120 },
      { name: "BigQuery", cost: 2200, usage: 79, trend: "+11%", resources: 40, users: 80 },
      { name: "Cloud Functions", cost: 850, usage: 58, trend: "+13%", resources: 20, users: 40 },
    ],
    trends: [
      { month: "Jan", cost: 8000, forecast: 8200, alerts: 1 },
      { month: "Feb", cost: 8400, forecast: 8600, alerts: 0 },
      { month: "Mar", cost: 8800, forecast: 9000, alerts: 1 },
      { month: "Apr", cost: 9200, forecast: 9400, alerts: 1 },
      { month: "May", cost: 9600, forecast: 9800, alerts: 2 },
      { month: "Jun", cost: 10000, forecast: 10200, alerts: 1 },
    ],
    historicalCosts: [
      { month: "Jan", cost: 8000 },
      { month: "Feb", cost: 8400 },
      { month: "Mar", cost: 8800 },
      { month: "Apr", cost: 9200 },
      { month: "May", cost: 9600 },
      { month: "Jun", cost: 10000 },
    ],
  },
};

// Enhanced department data (unchanged)
const departmentUsageData = [
  {
    department: "Engineering",
    AWS: { cost: 35000, resources: 500, users: 800, alerts: 5 },
    Azure: { cost: 15000, resources: 300, users: 400, alerts: 3 },
    GCP: { cost: 8000, resources: 150, users: 200, alerts: 1 },
  },
  {
    department: "Data Science",
    AWS: { cost: 22000, resources: 300, users: 500, alerts: 4 },
    Azure: { cost: 18000, resources: 250, users: 350, alerts: 2 },
    GCP: { cost: 12000, resources: 200, users: 300, alerts: 2 },
  },
  {
    department: "Marketing",
    AWS: { cost: 8000, resources: 100, users: 150, alerts: 1 },
    Azure: { cost: 5000, resources: 80, users: 100, alerts: 0 },
    GCP: { cost: 3000, resources: 50, users: 80, alerts: 0 },
  },
  {
    department: "Sales",
    AWS: { cost: 3000, resources: 50, users: 80, alerts: 0 },
    Azure: { cost: 2000, resources: 40, users: 60, alerts: 0 },
    GCP: { cost: 1000, resources: 20, users: 40, alerts: 0 },
  },
];

// Alert data (unchanged)
const alertsData = [
  { provider: "AWS", department: "Engineering", message: "EC2 cost spike detected", severity: "high", timestamp: "2025-06-15" },
  { provider: "Azure", department: "Data Science", message: "Synapse budget overrun", severity: "medium", timestamp: "2025-06-10" },
  { provider: "GCP", department: "Engineering", message: "BigQuery usage limit neared", severity: "low", timestamp: "2025-06-12" },
  { provider: "AWS", department: "Data Science", message: "S3 storage cost increased", severity: "medium", timestamp: "2025-06-08" },
  { provider: "Azure", department: "Engineering", message: "VM idle resources detected", severity: "low", timestamp: "2025-06-05" },
];

// Region cost data (unchanged for Azure/GCP)
const regionCostData = [
  { region: "US-East", AWS: 20000, Azure: 10000, GCP: 5000 },
  { region: "US-West", AWS: 15000, Azure: 8000, GCP: 4000 },
  { region: "EU-Central", AWS: 10000, Azure: 6000, GCP: 3000 },
  { region: "Asia-Pacific", AWS: 7340, Azure: 4650, GCP: 1900 },
];

const COLORS = ["#f59e0b", "#06b6d4", "#8b5cf6"];

const cloudServices = [
  { value: 'all', label: 'All Services' },
  { value: 'AWS', label: 'Amazon AWS' },
  { value: 'Azure', label: 'Microsoft Azure' },
  { value: 'GCP', label: 'Google Cloud Platform' },
];

// Helper function to transform API data
const transformAPIDataToServiceData = (apiData: APIResponse): ServiceData => {
  // Transform services data
  const services = apiData.services.map(service => ({
    name: service.service.replace(/^Amazon /, '').replace(/^AWS /, ''),
    cost: Math.round(service.cost),
    usage: Math.min(95, Math.max(45, Math.round(service.cost * 10 + 45))), // Simulated usage based on cost
    trend: service.cost > 1 ? "+8%" : "+3%", // Simulated trend
    resources: Math.round(service.cost * 5 + 20), // Simulated resources
    users: Math.round(service.cost * 10 + 50), // Simulated users
  }));

  // Transform daily trends to monthly format
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const trends: Trend[] = [];
  const historicalCosts: HistoricalCost[] = [];

  // Group daily data by month for the last 6 months
  const dailyTrends = apiData.daily_total_trend;
  const monthlyData: { [key: string]: { cost: number, count: number, forecast: number } } = {};

  dailyTrends.forEach(day => {
    const date = new Date(day.date);
    const monthYear = `${monthNames[date.getMonth()]}`;
    
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { cost: 0, count: 0, forecast: 0 };
    }
    monthlyData[monthYear].cost += day.cost;
    monthlyData[monthYear].count += 1;
  });

  // Add forecast data
  const forecastData = apiData.forecast.slice(0, 6); // First 6 forecast entries
  let forecastIndex = 0;

  Object.keys(monthlyData).forEach(month => {
    const avgCost = Math.round(monthlyData[month].cost / monthlyData[month].count * 30); // Estimate monthly cost
    const forecast = forecastIndex < forecastData.length ? Math.round(forecastData[forecastIndex].forecast * 30) : avgCost * 1.1;
    
    trends.push({
      month,
      cost: avgCost,
      forecast,
      alerts: Math.floor(Math.random() * 10) + 1, // Simulated alerts
    });

    historicalCosts.push({
      month,
      cost: avgCost,
    });

    forecastIndex++;
  });

  return {
    services,
    trends,
    historicalCosts,
  };
};

export default function Dashboard() {
  // const { selectedService, setSelectedService } = useCloudProvider(); 
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedTimeRange, setSelectedTimeRange] = useState("6m");
  const [alertSeverity, setAlertSeverity] = useState("all");
  const [awsData, setAwsData] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

    const { cloudProvider, setCloudProvider } = useCloudProvider();


  // State for expandable sections (unchanged)
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isSpendOpen, setIsSpendOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isCostPerUserOpen, setIsCostPerUserOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isForecastOpen, setIsForecastOpen] = useState(false);

  // Fetch AWS data from API
  useEffect(() => {
    const fetchAWSData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://2t9y6e0jhe.execute-api.ap-south-1.amazonaws.com/GetCostCentreData');
        
        if (!response.ok) {
          throw new Error('Failed to fetch AWS data');
        }
        
        const apiData: APIResponse = await response.json();
        const transformedData = transformAPIDataToServiceData(apiData);
        setAwsData(transformedData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch AWS data');
        console.error('Error fetching AWS data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAWSData();
  }, []);

  // Create combined services data
  const getServicesData = (): Record<string, ServiceData> => {
    const baseData: Record<string, ServiceData> = { ...mockAzureGcpData };
    
    if (awsData) {
      baseData.aws = awsData;
    
      // Create "all" view by combining AWS (real) + Azure + GCP (mock)
      baseData.all = {
        services: [
          { name: "Compute", AWS: awsData.services.find(s => s.name.includes('Compute'))?.cost || 0, Azure: 18000, GCP: 12000 },
          { name: "Storage", AWS: awsData.services.find(s => s.name.includes('Storage'))?.cost || 0, Azure: 12000, GCP: 8000 },
          { name: "Database", AWS: awsData.services.find(s => s.name.includes('Database') || s.name.includes('DynamoDB'))?.cost || 0, Azure: 15000, GCP: 10000 },
          { name: "Networking", AWS: awsData.services.find(s => s.name.includes('VPC') || s.name.includes('CloudFront'))?.cost || 0, Azure: 6000, GCP: 4000 },
          { name: "Analytics", AWS: awsData.services.find(s => s.name.includes('Glue') || s.name.includes('Athena'))?.cost || 0, Azure: 9000, GCP: 7000 },
        ],
        trends: awsData.trends.map((trend, index) => ({
          ...trend,
          cost: trend.cost + mockAzureGcpData.azure.trends[index]?.cost + mockAzureGcpData.gcp.trends[index]?.cost,
          forecast: trend.forecast + mockAzureGcpData.azure.trends[index]?.forecast + mockAzureGcpData.gcp.trends[index]?.forecast,
          alerts: trend.alerts + mockAzureGcpData.azure.trends[index]?.alerts + mockAzureGcpData.gcp.trends[index]?.alerts,
        })),
        historicalCosts: awsData.historicalCosts.map((cost, index) => ({
          ...cost,
          AWS: cost.cost || 0,
          Azure: mockAzureGcpData.azure.historicalCosts[index]?.cost || 0,
          GCP: mockAzureGcpData.gcp.historicalCosts[index]?.cost || 0,
        })),
      };


    }

    return baseData;
  };

  const getMetricsForService = () => {
    const servicesData = getServicesData();
    const baseMetrics = {
      all: {
        totalUsers: 2847,
        activeResources: 1234,
        monthlySpend: awsData ? `$${Math.round(awsData.trends[awsData.trends.length - 1]?.cost + 26650)}` : "$67890",
        budgetUtilization: 97,
        costPerUser: "$23.84",
        activeAlerts: alertsData.length,
        forecastAccuracy: 97.5,
      },
      AWS: {
        totalUsers: 1523,
        activeResources: awsData ? awsData.services.reduce((sum, s) => sum + (s.resources || 0), 0) : 687,
        monthlySpend: awsData ? `$${Math.round(awsData.trends[awsData.trends.length - 1]?.cost)}` : "$42340",
        budgetUtilization: 89,
        costPerUser: awsData ? `$${(awsData.trends[awsData.trends.length - 1]?.cost / 1523).toFixed(2)}` : "$27.80",
        activeAlerts: alertsData.filter(a => a.provider === "AWS").length,
        forecastAccuracy: 98.2,
      },
      Azure: {
        totalUsers: 856,
        activeResources: 423,
        monthlySpend: "$18650",
        budgetUtilization: 76,
        costPerUser: "$21.79",
        activeAlerts: alertsData.filter(a => a.provider === "Azure").length,
        forecastAccuracy: 96.8,
      },
      GCP: {
        totalUsers: 468,
        activeResources: 124,
        monthlySpend: "$6900",
        budgetUtilization: 45,
        costPerUser: "$14.74",
        activeAlerts: alertsData.filter(a => a.provider === "GCP").length,
        forecastAccuracy: 97.0,
      },
    };
    return baseMetrics[cloudProvider];
  };

  const getCurrentServiceData = () => {
    const servicesData = getServicesData();
    return servicesData[cloudProvider.toLowerCase()];
  };

  const filterTrendsByTimeRange = (trends: Trend[] | HistoricalCost[]) => {
    if (selectedTimeRange === "6m") return trends;
    const months = parseInt(selectedTimeRange);
    return trends.slice(-months);
  };

  // const filteredDepartmentData = selectedDepartment === "all"
  //   ? departmentUsageData
  //   : departmentUsageData.filter((d) => d.department === selectedDepartment);

  // const filteredAlerts = alertSeverity === "all"
  //   ? alertsData
  //   : alertsData.filter((a) => a.severity === alertSeverity);

  // Create cost distribution data
  const getCostDistributionData = () => {
    const servicesData = getServicesData();
    if (!awsData) return [
      { name: "AWS", value: 42340 },
      { name: "Azure", value: 18650 },
      { name: "GCP", value: 6900 },
    ];
    
    return [
      { name: "AWS", value: Math.round(awsData.trends[awsData.trends.length - 1]?.cost || 0) },
      { name: "Azure", value: 18650 },
      { name: "GCP", value: 6900 },
    ];
  };

  const metrics = getMetricsForService();
  const currentData = getCurrentServiceData();
  const costDistributionData = getCostDistributionData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading AWS data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!currentData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">No data available</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 p-4 bg-card rounded-lg border space-x-12">
        {/* <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departmentUsageData.map((d) => (
              <SelectItem key={d.department} value={d.department}>{d.department}</SelectItem>
            ))}
          </SelectContent>
        </Select> */}
        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="12m">Last 12 Months</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2">
          <Filter size={16} />
          Apply Filters
        </Button>

        <Select
          value={cloudProvider}
          onValueChange={(value) => setCloudProvider(value)}
          
        >
          <SelectTrigger className="w-48 bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border">
            {cloudServices.map((service) => (
              <SelectItem key={service.value} value={service.value}>
                {service.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Enhanced Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <MetricCard
          title="Total Users"
          value={metrics.totalUsers}
          change="+12% from last month"
          changeType="positive"
          icon={<Users className="h-4 w-4" />}
        />
        <MetricCard
          title="Active Resources"
          value={metrics.activeResources}
          change="+8% from last month"
          changeType="positive"
          icon={<Server className="h-4 w-4" />}
        />
        <MetricCard
          title="Monthly Spend"
          value={metrics.monthlySpend}
          change="+5.2% from last month"
          changeType="negative"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="Budget Utilization"
          value={metrics.budgetUtilization}
          change="Near budget limit"
          changeType={metrics.budgetUtilization > 90 ? "negative" : "positive"}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        {/* <MetricCard
          title="Cost Per User"
          value={metrics.costPerUser}
          change="Stable"
          changeType="positive"
          icon={<Zap className="h-4 w-4" />}
        /> */}
        {/* <MetricCard
          title="Active Alerts"
          value={metrics.activeAlerts}
          change={metrics.activeAlerts > 5 ? "High alert volume" : "Normal range"}
          changeType={metrics.activeAlerts > 5 ? "negative" : "positive"}
          icon={<AlertTriangle className="h-4 w-4" />}
        /> */}
      </div>

      {/* Historical Cost Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Historical Cost Comparison - {cloudProvider.toUpperCase()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={filterTrendsByTimeRange(currentData.historicalCosts)}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`, "Cost"]}
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{
                  paddingBottom: "10px",
                  fontSize: "14px",
                }}
              />

              {cloudProvider === "all" ? (
                <>
                  <Line
                    type="monotone"
                    dataKey="aws"
                    stroke="#f59e0b"
                    name="AWS"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="azure"
                    stroke="#06b6d4"
                    name="Azure"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="gcp"
                    stroke="#8b5cf6"
                    name="GCP"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </>
              ) : (
                <Line
                  type="monotone"
                  dataKey="cost"
                  stroke={
                    cloudProvider === "AWS"
                      ? "#f59e0b"
                      : cloudProvider === "Azure"
                      ? "#06b6d4"
                      : "#8b5cf6"
                  }
                  name={cloudProvider.toUpperCase()}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cost Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Cost & Forecast Trends - {cloudProvider.toUpperCase()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={filterTrendsByTimeRange(currentData.trends)}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="cost"
                fill="#3b82f6"
                fillOpacity={0.3}
                stroke="#3b82f6"
                strokeWidth={2}
                name="Actual Cost"
              />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Forecast"
              />
              <Bar dataKey="alerts" fill="#f59e0b" name="Cost Alerts" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cost Distribution Across Providers */}
      {cloudProvider === "all" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Cost Distribution Across Providers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, "Cost"]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Cost Breakdown by Region */}
      {cloudProvider === "all" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Cost Breakdown by Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Region</TableHead>
                    <TableHead>AWS</TableHead>
                    <TableHead>Azure</TableHead>
                    <TableHead>GCP</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regionCostData.map((region) => (
                    <TableRow key={region.region}>
                      <TableCell>{region.region}</TableCell>
                      <TableCell>${region.AWS.toLocaleString()}</TableCell>
                      <TableCell>${region.Azure.toLocaleString()}</TableCell>
                      <TableCell>${region.GCP.toLocaleString()}</TableCell>
                      <TableCell>${(region.AWS + region.Azure + region.GCP).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Service-specific Analysis */}
      {cloudProvider !== "all" ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              {cloudProvider.toUpperCase()} Services Analysis
              <Link to={`/cost-centers/${cloudProvider}`}>
                <Button variant="outline" size="sm" className="ml-4">
                  View Cost Center
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {currentData.services.map((service) => (
                <div key={service.name} className="p-4 border rounded-lg bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm">{service.name}</h3>
                    <Badge variant={service.trend?.startsWith("+") ? "destructive" : "default"}>
                      {service.trend}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Monthly Cost:</span>
                      <span className="font-medium">${service.cost?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Usage:</span>
                      <span className="font-medium">{service.usage}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Resources:</span>
                      <span className="font-medium">{service.resources}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Users:</span>
                      <span className="font-medium">{service.users}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${service.usage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Multi-Cloud Service Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentData.services}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="AWS" fill="#f59e0b" name="AWS" />
                <Bar dataKey="Azure" fill="#06b6d4" name="Azure" />
                <Bar dataKey="GCP" fill="#8b5cf6" name="GCP" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Department Usage Table
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Department-wise Usage Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Resources</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Alerts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartmentData.map((dept) => (
                  <React.Fragment key={dept.department}>
                    {["aws", "azure", "gcp"].map((provider) => (
                      <TableRow key={`${dept.department}-${provider}`}>
                        <TableCell>{dept.department}</TableCell>
                        <TableCell className="font-medium">{provider.toUpperCase()}</TableCell>
                        <TableCell>${dept[provider].cost.toLocaleString()}</TableCell>
                        <TableCell>{dept[provider].resources}</TableCell>
                        <TableCell>{dept[provider].users}</TableCell>
                        <TableCell>
                          <Badge variant={dept[provider].alerts > 0 ? "destructive" : "default"}>
                            {dept[provider].alerts}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card> */}

      {/* Resource Utilization Comparison
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Resource Utilization by Department
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredDepartmentData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="department" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="aws.resources" fill="#f59e0b" name="AWS Resources" />
              <Bar dataKey="azure.resources" fill="#06b6d4" name="Azure Resources" />
              <Bar dataKey="gcp.resources" fill="#8b5cf6" name="GCP Resources" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}
{/* 
      // Alert Summary 
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Critical Alerts Summary
          </CardTitle>
          <Select value={alertSeverity} onValueChange={setAlertSeverity}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Provider</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.map((alert, index) => (
                  <TableRow key={index}>
                    <TableCell>{alert.provider}</TableCell>
                    <TableCell>{alert.department}</TableCell>
                    <TableCell>{alert.message}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          alert.severity === "high"
                            ? "destructive"
                            : alert.severity === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {alert.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>{alert.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}