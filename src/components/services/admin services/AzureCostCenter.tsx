// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { AlertTriangle, TrendingUp, TrendingDown, DollarSign, Server, Database, Calendar as CalendarIcon, Filter, Download, Search, ChevronDown, AlertCircle, Lightbulb, Shield, Tag } from 'lucide-react';
// import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar, ComposedChart, Area, AreaChart } from 'recharts';
// import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
// import { DateRange } from 'react-day-picker';
// import { cn } from '@/lib/utils';

// // Sample data for the dashboard
// const costData = [
//   { date: '2024-01-01', functions: 620, vms: 890, storage: 340, cosmosdb: 450, total: 2300 },
//   { date: '2024-01-02', functions: 680, vms: 920, storage: 380, cosmosdb: 480, total: 2460 },
//   { date: '2024-01-03', functions: 740, vms: 850, storage: 360, cosmosdb: 520, total: 2470 },
//   { date: '2024-01-04', functions: 580, vms: 980, storage: 390, cosmosdb: 460, total: 2410 },
//   { date: '2024-01-05', functions: 720, vms: 870, storage: 370, cosmosdb: 490, total: 2450 },
//   { date: '2024-01-06', functions: 650, vms: 910, storage: 400, cosmosdb: 510, total: 2470 },
//   { date: '2024-01-07', functions: 700, vms: 860, storage: 350, cosmosdb: 480, total: 2390 },
// ];

// const serviceBreakdown = [
//   { name: 'Azure Functions', value: 620, color: '#0078d4' },
//   { name: 'Virtual Machines', value: 890, color: '#00bcf2' },
//   { name: 'Blob Storage', value: 340, color: '#40e0d0' },
//   { name: 'Cosmos DB', value: 450, color: '#1ba1e2' },
//   { name: 'App Service', value: 280, color: '#0086b3' },
// ];

// const resourceData = [
//   { service: 'Azure Functions', resource: 'func-user-auth-handler', region: 'East US', cost: 280, usage: '45K executions', accessLevel: 'Owner', duration: '3 days', tags: ['prod', 'auth'], approvalDate: '2024-01-01', status: 'Active' },
//   { service: 'Virtual Machine', resource: 'vm-web-01', region: 'West Europe', cost: 450, usage: '720 compute hrs', accessLevel: 'Contributor', duration: '7 days', tags: ['prod', 'web'], approvalDate: '2023-12-28', status: 'Active' },
//   { service: 'Blob Storage', resource: 'storage-logs-prod', region: 'Central India', cost: 180, usage: '2.4TB storage', accessLevel: 'Reader', duration: '30 days', tags: ['prod', 'logs'], approvalDate: '2023-12-15', status: 'Active' },
//   { service: 'Cosmos DB', resource: 'cosmos-user-profiles', region: 'East US', cost: 340, usage: '1.2M RUs', accessLevel: 'Owner', duration: '1 day', tags: ['prod', 'database'], approvalDate: '2024-01-05', status: 'Expired' },
//   { service: 'App Service', resource: 'app-api-gateway', region: 'West Europe', cost: 220, usage: '180 app hrs', accessLevel: 'Contributor', duration: '5 days', tags: ['staging', 'api'], approvalDate: '2024-01-02', status: 'Active' },
// ];

// const insights = [
//   { type: 'alert', icon: AlertTriangle, title: 'Cost Spike Detected', message: 'Azure Function login-fn cost increased by 35% in 3 days', severity: 'high' },
//   { type: 'recommendation', icon: Lightbulb, title: 'Cost Optimization', message: 'Move long-running VM to reserved instance for 40% savings', severity: 'medium' },
//   { type: 'access', icon: Shield, title: 'Access Insight', message: 'Owner-level access granted to unused SQL database', severity: 'medium' },
//   { type: 'tagging', icon: Tag, title: 'Tagging Issue', message: '2 Azure resources missing project tags', severity: 'low' },
// ];

// export default function AzureCostCenter() {
//   const [dateRange, setDateRange] = useState<DateRange | undefined>({ from: subDays(new Date(), 7), to: new Date() });
//   const [selectedService, setSelectedService] = useState('all');
//   const [selectedRegion, setSelectedRegion] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showInsights, setShowInsights] = useState(true);

//   const COLORS = ['#0078d4', '#00bcf2', '#40e0d0', '#1ba1e2', '#0086b3'];

//   const filteredResources = resourceData.filter(resource => {
//     const matchesSearch = resource.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          resource.service.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesService = selectedService === 'all' || resource.service.toLowerCase().includes(selectedService.toLowerCase());
//     const matchesRegion = selectedRegion === 'all' || resource.region === selectedRegion;
//     return matchesSearch && matchesService && matchesRegion;
//   });

//   return (
//     <div className="space-y-6">
//       {/* Header Section */}
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">Azure Cost Center Dashboard</h1>
//             <p className="text-muted-foreground">Track and optimize your Azure cloud costs with detailed insights</p>
//           </div>
//           <Button variant="outline" className="gap-2">
//             <Download size={16} />
//             Export Report
//           </Button>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 p-4 bg-card rounded-lg border">
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button variant="outline" className="gap-2">
//                 <CalendarIcon size={16} />
//                 {dateRange?.from && dateRange?.to ? 
//                   `${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd')}` : 
//                   'Select date range'
//                 }
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0" align="start">
//               <Calendar
//                 mode="range"
//                 selected={dateRange}
//                 onSelect={setDateRange}
//                 className="p-3 pointer-events-auto"
//               />
//             </PopoverContent>
//           </Popover>

//           <Select value={selectedService} onValueChange={setSelectedService}>
//             <SelectTrigger className="w-48">
//               <SelectValue placeholder="Service Type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Services</SelectItem>
//               <SelectItem value="functions">Azure Functions</SelectItem>
//               <SelectItem value="vm">Virtual Machines</SelectItem>
//               <SelectItem value="storage">Blob Storage</SelectItem>
//               <SelectItem value="cosmos">Cosmos DB</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select value={selectedRegion} onValueChange={setSelectedRegion}>
//             <SelectTrigger className="w-48">
//               <SelectValue placeholder="Region" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Regions</SelectItem>
//               <SelectItem value="East US">East US</SelectItem>
//               <SelectItem value="West Europe">West Europe</SelectItem>
//               <SelectItem value="Central India">Central India</SelectItem>
//             </SelectContent>
//           </Select>

//           <div className="flex gap-2">
//             <Badge variant="secondary" className="gap-1">
//               <Filter size={12} />
//               Production
//             </Badge>
//             <Badge variant="secondary" className="gap-1">
//               <Server size={12} />
//               High Usage
//             </Badge>
//           </div>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
//         <Card className="hover:shadow-md transition-shadow">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Total Cost</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-foreground">$1,550.00</div>
//             <p className="text-xs text-destructive flex items-center gap-1 mt-1">
//               <TrendingUp size={12} />
//               +18% from last month
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-md transition-shadow">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Top Service</CardTitle>
//             <Server className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-lg font-bold text-foreground">Virtual Machines</div>
//             <p className="text-xs text-muted-foreground mt-1">$890.00 this month</p>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-md transition-shadow">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Top Resource</CardTitle>
//             <Database className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-lg font-bold text-foreground">vm-web-01</div>
//             <p className="text-xs text-muted-foreground mt-1">$450.00 this month</p>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-md transition-shadow">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Accessed Services</CardTitle>
//             <Shield className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-foreground">7</div>
//             <p className="text-xs text-muted-foreground mt-1">Unique services accessed</p>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-md transition-shadow">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Idle Spend</CardTitle>
//             <AlertTriangle className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-destructive">$84.00</div>
//             <p className="text-xs text-muted-foreground mt-1">Unused resources</p>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-md transition-shadow">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Budget Usage</CardTitle>
//             <TrendingUp className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-foreground">68%</div>
//             <p className="text-xs text-success flex items-center gap-1 mt-1">
//               <TrendingDown size={12} />
//               Under budget
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Cost Trends Over Time</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <AreaChart data={costData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), 'MMM dd')} />
//                 <YAxis />
//                 <Tooltip 
//                   labelFormatter={(value) => format(new Date(value), 'MMM dd, yyyy')}
//                   formatter={(value, name) => [`$${value}`, name]}
//                 />
//                 <Area type="monotone" dataKey="functions" stackId="1" stroke="#0078d4" fill="#0078d4" fillOpacity={0.6} />
//                 <Area type="monotone" dataKey="vms" stackId="1" stroke="#00bcf2" fill="#00bcf2" fillOpacity={0.6} />
//                 <Area type="monotone" dataKey="storage" stackId="1" stroke="#40e0d0" fill="#40e0d0" fillOpacity={0.6} />
//                 <Area type="monotone" dataKey="cosmosdb" stackId="1" stroke="#1ba1e2" fill="#1ba1e2" fillOpacity={0.6} />
//               </AreaChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Top Services by Cost</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={serviceBreakdown}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {serviceBreakdown.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card className="lg:col-span-2">
//           <CardHeader>
//             <CardTitle>Top Resources by Cost</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={resourceData.slice(0, 10)}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="resource" />
//                 <YAxis />
//                 <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
//                 <Bar dataKey="cost" fill="#0078d4" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content with Insights Sidebar */}
//       <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
//         <div className="xl:col-span-3">
//           {/* Detailed Cost Breakdown Table */}
//           <Card>
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle>Resource Cost Breakdown</CardTitle>
//                 <div className="flex items-center gap-2">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
//                     <Input
//                       placeholder="Search resources..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="pl-10 w-64"
//                     />
//                   </div>
//                   <Button variant="outline" size="sm">
//                     <Download size={16} />
//                   </Button>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="overflow-x-auto">
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Service</TableHead>
//                       <TableHead>Resource Name</TableHead>
//                       <TableHead>Region</TableHead>
//                       <TableHead>Cost</TableHead>
//                       <TableHead>Usage</TableHead>
//                       <TableHead>Access Level</TableHead>
//                       <TableHead>Duration</TableHead>
//                       <TableHead>Tags</TableHead>
//                       <TableHead>Status</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {filteredResources.map((resource, index) => (
//                       <TableRow key={index}>
//                         <TableCell className="font-medium">{resource.service}</TableCell>
//                         <TableCell>{resource.resource}</TableCell>
//                         <TableCell>{resource.region}</TableCell>
//                         <TableCell className="font-semibold">${resource.cost}</TableCell>
//                         <TableCell>{resource.usage}</TableCell>
//                         <TableCell>
//                           <Badge variant={resource.accessLevel === 'Owner' ? 'destructive' : resource.accessLevel === 'Contributor' ? 'default' : 'secondary'}>
//                             {resource.accessLevel}
//                           </Badge>
//                         </TableCell>
//                         <TableCell>{resource.duration}</TableCell>
//                         <TableCell>
//                           <div className="flex gap-1">
//                             {resource.tags.map((tag) => (
//                               <Badge key={tag} variant="outline" className="text-xs">
//                                 {tag}
//                               </Badge>
//                             ))}
//                           </div>
//                         </TableCell>
//                         <TableCell>
//                           <Badge variant={resource.status === 'Active' ? 'default' : resource.status === 'Expired' ? 'destructive' : 'secondary'}>
//                             {resource.status}
//                           </Badge>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Insights Sidebar */}
//         {showInsights && (
//           <div className="xl:col-span-1">
//             <Card>
//               <CardHeader>
//                 <div className="flex items-center justify-between">
//                   <CardTitle>Insights & Recommendations</CardTitle>
//                   <Button variant="ghost" size="sm" onClick={() => setShowInsights(false)}>
//                     ×
//                   </Button>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {insights.map((insight, index) => {
//                   const Icon = insight.icon;
//                   return (
//                     <div
//                       key={index}
//                       className={cn(
//                         "p-3 rounded-lg border-l-4",
//                         insight.severity === 'high' ? "border-l-destructive bg-destructive/5" :
//                         insight.severity === 'medium' ? "border-l-yellow-500 bg-yellow-500/5" :
//                         "border-l-blue-500 bg-blue-500/5"
//                       )}
//                     >
//                       <div className="flex items-start gap-3">
//                         <Icon className={cn(
//                           "mt-0.5 flex-shrink-0",
//                           insight.severity === 'high' ? "text-destructive" :
//                           insight.severity === 'medium' ? "text-yellow-600" :
//                           "text-blue-600"
//                         )} size={16} />
//                         <div className="space-y-1">
//                           <p className="text-sm font-medium">{insight.title}</p>
//                           <p className="text-xs text-muted-foreground">{insight.message}</p>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign, Server, Database, Calendar as CalendarIcon, Filter, Download, Search, Shield, Lightbulb, Tag } from 'lucide-react';
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';
import { format, subDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';

const costData = [
  { date: '2024-01-01', functions: 620, vms: 890, storage: 340, cosmosdb: 450, total: 2300 },
  { date: '2024-01-02', functions: 680, vms: 920, storage: 380, cosmosdb: 480, total: 2460 },
  { date: '2024-01-03', functions: 740, vms: 850, storage: 360, cosmosdb: 520, total: 2470 },
  { date: '2024-01-04', functions: 580, vms: 980, storage: 390, cosmosdb: 460, total: 2410 },
  { date: '2024-01-05', functions: 720, vms: 870, storage: 370, cosmosdb: 490, total: 2450 },
  { date: '2024-01-06', functions: 650, vms: 910, storage: 400, cosmosdb: 510, total: 2470 },
  { date: '2024-01-07', functions: 700, vms: 860, storage: 350, cosmosdb: 480, total: 2390 },
];

const serviceBreakdown = [
  { name: 'Azure Functions', value: 620, color: '#0078d4' },
  { name: 'Virtual Machines', value: 890, color: '#00bcf2' },
  { name: 'Blob Storage', value: 340, color: '#40e0d0' },
  { name: 'Cosmos DB', value: 450, color: '#1ba1e2' },
  { name: 'App Service', value: 280, color: '#0086b3' },
];

const resourceData = [
  { service: 'Azure Functions', resource: 'func-user-auth-handler', region: 'East US', cost: 280, usage: '45K executions', accessLevel: 'Owner', duration: '3 days', tags: ['prod', 'auth'], approvalDate: '2024-01-01', status: 'Active' },
  { service: 'Virtual Machine', resource: 'vm-web-01', region: 'West Europe', cost: 450, usage: '720 compute hrs', accessLevel: 'Contributor', duration: '7 days', tags: ['prod', 'web'], approvalDate: '2023-12-28', status: 'Active' },
  { service: 'Blob Storage', resource: 'storage-logs-prod', region: 'Central India', cost: 180, usage: '2.4TB storage', accessLevel: 'Reader', duration: '30 days', tags: ['prod', 'logs'], approvalDate: '2023-12-15', status: 'Active' },
  { service: 'Cosmos DB', resource: 'cosmos-user-profiles', region: 'East US', cost: 340, usage: '1.2M RUs', accessLevel: 'Owner', duration: '1 day', tags: ['prod', 'database'], approvalDate: '2024-01-05', status: 'Expired' },
  { service: 'App Service', resource: 'app-api-gateway', region: 'West Europe', cost: 220, usage: '180 app hrs', accessLevel: 'Contributor', duration: '5 days', tags: ['staging', 'api'], approvalDate: '2024-01-02', status: 'Active' },
];

const insights = [
  { type: 'alert', icon: AlertTriangle, title: 'Cost Spike Detected', message: 'Azure Function login-fn cost increased by 35% in 3 days', severity: 'high' },
  { type: 'recommendation', icon: Lightbulb, title: 'Cost Optimization', message: 'Move long-running VM to reserved instance for 40% savings', severity: 'medium' },
  { type: 'access', icon: Shield, title: 'Access Insight', message: 'Owner-level access granted to unused SQL database', severity: 'medium' },
  { type: 'tagging', icon: Tag, title: 'Tagging Issue', message: '2 Azure resources missing project tags', severity: 'low' },
];

const forecastData = [
  { date: '2024-01-01', actual: 1200, forecast: 1200 },
  { date: '2024-01-02', actual: 1500, forecast: 1500 },
  { date: '2024-01-03', actual: 1900, forecast: 1900 },
  { date: '2024-01-04', actual: 2500, forecast: 2500 },
  { date: '2024-01-05', actual: 3100, forecast: 3100 },
  { date: '2024-01-06', actual: 3500, forecast: 3500 },
  { date: '2024-01-07', actual: 4200, forecast: 4200 },
  { date: '2024-01-08', actual: 5000, forecast: 5300 },
  { date: '2024-01-09', actual: 5800, forecast: 6400 },
  { date: '2024-01-10', actual: 6400, forecast: 7800 },
  { date: '2024-01-11', actual: 7000, forecast: 9200 },
  { date: '2024-01-12', actual: null, forecast: 10500 },
  { date: '2024-01-13', actual: null, forecast: 11800 },
  { date: '2024-01-14', actual: null, forecast: 13000 },
  { date: '2024-01-15', actual: null, forecast: 14300 },
];

export default function AzureCostCenter() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({ from: subDays(new Date(), 7), to: new Date() });
  const [selectedService, setSelectedService] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showInsights, setShowInsights] = useState(true);

  const COLORS = ['#0078d4', '#00bcf2', '#40e0d0', '#1ba1e2', '#0086b3'];

  const filteredResources = resourceData.filter(resource => {
    const matchesSearch = resource.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = selectedService === 'all' || resource.service.toLowerCase().includes(selectedService.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || resource.region === selectedRegion;
    return matchesSearch && matchesService && matchesRegion;
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Azure Cost Center Dashboard</h1>
            <p className="text-muted-foreground">Track and optimize your Azure cloud costs with detailed insights</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Export Report
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$1,550.00</div>
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> +18% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Service</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-foreground">Virtual Machines</div>
            <p className="text-xs text-muted-foreground mt-1">$890.00 this month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Resource</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-foreground">vm-web-01</div>
            <p className="text-xs text-muted-foreground mt-1">$450.00 this month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Accessed Services</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">7</div>
            <p className="text-xs text-muted-foreground mt-1">Unique services accessed</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Idle Spend</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">$84.00</div>
            <p className="text-xs text-muted-foreground mt-1">Unused resources</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Budget Usage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">68%</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingDown size={12} /> Under budget
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cost Forecasting</CardTitle>
          <p className="text-sm text-muted-foreground">Actual vs Predicted Costs for the selected period</p>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Actual Cost (to date)</p>
              <h3 className="text-2xl font-bold text-foreground">
                ${forecastData.filter(d => d.actual !== null).slice(-1)[0].actual}
              </h3>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Forecasted Total Cost</p>
              <h3 className="text-2xl font-bold text-blue-600">
                ${forecastData.slice(-1)[0].forecast}
              </h3>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), 'MMM dd')} />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => format(new Date(value), 'MMM dd, yyyy')}
                formatter={(value, name) => [`$${value}`, name === 'actual' ? 'Actual' : 'Forecast']}
              />
              <Area type="monotone" dataKey="actual" stroke="#0078d4" fill="#0078d4" fillOpacity={0.7} />
              <Area type="monotone" dataKey="forecast" stroke="#00bcf2" strokeDasharray="5 5" fill="#00bcf2" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cost Trends Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), 'MMM dd')} />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => format(new Date(value), 'MMM dd, yyyy')}
                  formatter={(value, name) => [`$${value}`, name]}
                />
                <Area type="monotone" dataKey="functions" stackId="1" stroke="#0078d4" fill="#0078d4" fillOpacity={0.6} />
                <Area type="monotone" dataKey="vms" stackId="1" stroke="#00bcf2" fill="#00bcf2" fillOpacity={0.6} />
                <Area type="monotone" dataKey="storage" stackId="1" stroke="#40e0d0" fill="#40e0d0" fillOpacity={0.6} />
                <Area type="monotone" dataKey="cosmosdb" stackId="1" stroke="#1ba1e2" fill="#1ba1e2" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Services by Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Resources by Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resourceData.slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="resource" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
                <Bar dataKey="cost" fill="#0078d4" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Resource Cost Breakdown</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      placeholder="Search resources..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter Service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Services</SelectItem>
                      <SelectItem value="azure functions">Azure Functions</SelectItem>
                      <SelectItem value="virtual machine">Virtual Machines</SelectItem>
                      <SelectItem value="blob storage">Blob Storage</SelectItem>
                      <SelectItem value="cosmos db">Cosmos DB</SelectItem>
                      <SelectItem value="app service">App Service</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="East US">East US</SelectItem>
                      <SelectItem value="West Europe">West Europe</SelectItem>
                      <SelectItem value="Central India">Central India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Access Level</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources.map((res, index) => (
                    <TableRow key={index}>
                      <TableCell>{res.service}</TableCell>
                      <TableCell>{res.resource}</TableCell>
                      <TableCell>{res.region}</TableCell>
                      <TableCell>${res.cost}</TableCell>
                      <TableCell>{res.usage}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{res.accessLevel}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={res.status === 'Active' ? 'default' : 'destructive'}>
                          {res.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="p-3 rounded-lg border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <insight.icon className={`h-4 w-4 ${insight.severity === 'high' ? 'text-red-500' : insight.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'}`} />
                    <h4 className="font-semibold text-sm">{insight.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">{insight.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
