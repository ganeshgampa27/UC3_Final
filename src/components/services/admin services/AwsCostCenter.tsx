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
//   { date: '2024-01-01', ec2: 800, lambda: 550, s3: 300, rds: 400, total: 2050 },
//   { date: '2024-01-02', ec2: 820, lambda: 580, s3: 320, rds: 420, total: 2140 },
//   { date: '2024-01-03', ec2: 780, lambda: 620, s3: 310, rds: 430, total: 2140 },
//   { date: '2024-01-04', ec2: 850, lambda: 560, s3: 330, rds: 410, total: 2150 },
//   { date: '2024-01-05', ec2: 810, lambda: 590, s3: 300, rds: 420, total: 2120 },
//   { date: '2024-01-06', ec2: 830, lambda: 570, s3: 340, rds: 440, total: 2180 },
//   { date: '2024-01-07', ec2: 790, lambda: 600, s3: 320, rds: 430, total: 2140 },
// ];

// const serviceBreakdown = [
//   { name: 'EC2', value: 800, color: '#FF9900' },
//   { name: 'Lambda', value: 550, color: '#232F3E' },
//   { name: 'S3', value: 300, color: '#FF4F00' },
//   { name: 'RDS', value: 400, color: '#146EB4' },
//   { name: 'Elastic Beanstalk', value: 250, color: '#FF9900' },
// ];

// const resourceData = [
//   { service: 'EC2', resource: 'ec2-web-01', region: 'us-east-1', cost: 400, usage: '700 compute hrs', accessLevel: 'Owner', duration: '7 days', tags: ['prod', 'web'], approvalDate: '2024-01-01', status: 'Active' },
//   { service: 'Lambda', resource: 'lambda-user-auth', region: 'ap-south-1', cost: 250, usage: '60K invocations', accessLevel: 'Contributor', duration: '3 days', tags: ['prod', 'auth'], approvalDate: '2024-01-02', status: 'Active' },
//   { service: 'S3', resource: 's3-logs-prod', region: 'us-west-2', cost: 150, usage: '2.5TB storage', accessLevel: 'Reader', duration: '30 days', tags: ['prod', 'logs'], approvalDate: '2023-12-15', status: 'Active' },
//   { service: 'RDS', resource: 'rds-user-db', region: 'us-east-1', cost: 300, usage: '1.5M IOPS', accessLevel: 'Owner', duration: '1 day', tags: ['prod', 'database'], approvalDate: '2024-01-05', status: 'Expired' },
//   { service: 'Elastic Beanstalk', resource: 'eb-api-gateway', region: 'eu-west-1', cost: 200, usage: '150 app hrs', accessLevel: 'Contributor', duration: '5 days', tags: ['staging', 'api'], approvalDate: '2024-01-03', status: 'Active' },
// ];

// const insights = [
//   { type: 'alert', icon: AlertTriangle, title: 'Cost Spike Detected', message: 'EC2 instance cost up by 25% in 3 days', severity: 'high' },
//   { type: 'recommendation', icon: Lightbulb, title: 'Cost Optimization', message: 'Use Spot Instances for 40% savings', severity: 'medium' },
//   { type: 'access', icon: Shield, title: 'Access Insight', message: 'Owner access on unused RDS instance', severity: 'medium' },
//   { type: 'tagging', icon: Tag, title: 'Tagging Issue', message: '2 AWS resources missing env tags', severity: 'low' },
// ];

// export default function AwsCostCenter() {
//   const [dateRange, setDateRange] = useState<DateRange | undefined>({ from: subDays(new Date(), 7), to: new Date() });
//   const [selectedService, setSelectedService] = useState('all');
//   const [selectedRegion, setSelectedRegion] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showInsights, setShowInsights] = useState(true);

//   const COLORS = ['#FF9900', '#232F3E', '#FF4F00', '#146EB4', '#FF9900'];

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
//             <h1 className="text-3xl font-bold text-foreground">AWS Cost Center Dashboard</h1>
//             <p className="text-muted-foreground">Track and optimize your AWS cloud costs with detailed insights</p>
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
//               <SelectItem value="ec2">EC2</SelectItem>
//               <SelectItem value="lambda">Lambda</SelectItem>
//               <SelectItem value="s3">S3</SelectItem>
//               <SelectItem value="rds">RDS</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select value={selectedRegion} onValueChange={setSelectedRegion}>
//             <SelectTrigger className="w-48">
//               <SelectValue placeholder="Region" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Regions</SelectItem>
//               <SelectItem value="us-east-1">us-east-1</SelectItem>
//               <SelectItem value="us-west-2">us-west-2</SelectItem>
//               <SelectItem value="ap-south-1">ap-south-1</SelectItem>
//               <SelectItem value="eu-west-1">eu-west-1</SelectItem>
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
//             <div className="text-2xl font-bold text-foreground">$1,450.00</div>
//             <p className="text-xs text-destructive flex items-center gap-1 mt-1">
//               <TrendingUp size={12} />
//               +12% from last month
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-md transition-shadow">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Top Service</CardTitle>
//             <Server className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-lg font-bold text-foreground">EC2</div>
//             <p className="text-xs text-muted-foreground mt-1">$800.00 this month</p>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-md transition-shadow">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Top Resource</CardTitle>
//             <Database className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-lg font-bold text-foreground">ec2-web-01</div>
//             <p className="text-xs text-muted-foreground mt-1">$400.00 this month</p>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-md transition-shadow">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Accessed Services</CardTitle>
//             <Shield className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-foreground">6</div>
//             <p className="text-xs text-muted-foreground mt-1">Unique services accessed</p>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-md transition-shadow">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Idle Spend</CardTitle>
//             <AlertTriangle className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-destructive">$65.00</div>
//             <p className="text-xs text-muted-foreground mt-1">Unused resources</p>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-md transition-shadow">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Budget Usage</CardTitle>
//             <TrendingUp className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-foreground">62%</div>
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
//                 <Area type="monotone" dataKey="ec2" stackId="1" stroke="#FF9900" fill="#FF9900" fillOpacity={0.6} />
//                 <Area type="monotone" dataKey="lambda" stackId="1" stroke="#232F3E" fill="#232F3E" fillOpacity={0.6} />
//                 <Area type="monotone" dataKey="s3" stackId="1" stroke="#FF4F00" fill="#FF4F00" fillOpacity={0.6} />
//                 <Area type="monotone" dataKey="rds" stackId="1" stroke="#146EB4" fill="#146EB4" fillOpacity={0.6} />
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
//                 <Bar dataKey="cost" fill="#FF9900" />
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


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign, Server, Database, CalendarIcon, Filter, Download, Search, ChevronDown, AlertCircle, Lightbulb, Shield, Tag, ArrowLeft, RefreshCw, Activity, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar, ComposedChart, Area, AreaChart } from 'recharts';
import { format, subDays, startOfMonth, endOfMonth, parseISO } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';

// Colors for charts - MOVED TO TOP
const COLORS = ['#FF9900', '#232F3E', '#FF4F00', '#146EB4', '#00C853', '#9C27B0', '#FF5722', '#607D8B', '#795548', '#E91E63'];

export default function AwsCostCenter() {
  const [costData, setCostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({ 
    from: subDays(new Date(), 7), 
    to: new Date() 
  });
  const [selectedService, setSelectedService] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');

  const API_ENDPOINT = 'https://2t9y6e0jhe.execute-api.ap-south-1.amazonaws.com/GetCostCentreData';

  // Fetch data from API
  const fetchCostData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINT, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCostData(data);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch cost data: ${err.message}`);
      console.error('Error fetching cost data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCostData();
  }, []);

  // Process daily trend data for charts
  const processedDailyData = costData?.daily_total_trend?.map(item => ({
    date: item.date,
    cost: parseFloat(item.cost.toFixed(2)),
    formattedDate: format(parseISO(item.date), 'MMM dd')
  })) || [];

  // Process service breakdown data
  const processedServiceData = costData?.services?.filter(service => service.cost > 0)
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 10)
    .map((service, index) => ({
      name: service.service.replace(/^(AWS |Amazon )?/, ''),
      value: parseFloat(service.cost.toFixed(2)),
      fullName: service.service,
      color: COLORS[index % COLORS.length]
    })) || [];

  // Process top resources data
  const processedResourcesData = costData?.["Top Resources by Cost"]?.filter(resource => 
    resource.resource && resource.resource !== "" && resource.cost > 0
  ).slice(0, 10).map(resource => ({
    name: resource.resource.length > 15 ? resource.resource.substring(0, 15) + '...' : resource.resource,
    fullName: resource.resource,
    cost: parseFloat(resource.cost.toFixed(2))
  })) || [];

  // Process forecast data
  const processedForecastData = costData?.forecast?.slice(0, 15).map(item => ({
    date: item.date,
    forecast: parseFloat(item.forecast.toFixed(2)),
    formattedDate: format(parseISO(item.date), 'MMM dd')
  })) || [];

  // Combine daily and forecast data for trend visualization
  const combinedTrendData = [
    ...processedDailyData.map(item => ({ ...item, type: 'actual' })),
    ...processedForecastData.map(item => ({ 
      ...item, 
      cost: item.forecast, 
      type: 'forecast',
      formattedDate: format(parseISO(item.date), 'MMM dd')
    }))
  ];

  // Generate insights based on actual data
  const generateInsights = () => {
    if (!costData) return [];

    const insights = [];

    // Check for cost spikes in daily data
    if (processedDailyData.length >= 2) {
      const lastDay = processedDailyData[processedDailyData.length - 1];
      const prevDay = processedDailyData[processedDailyData.length - 2];
      const increase = ((lastDay.cost - prevDay.cost) / prevDay.cost) * 100;
      
      if (increase > 20) {
        insights.push({
          type: 'alert',
          icon: AlertTriangle,
          title: 'Cost Spike Detected',
          message: `Daily cost increased by ${increase.toFixed(1)}% from previous day`,
          severity: 'high'
        });
      }
    }

    // Service diversity insight
    if (costData.cards?.accessed_services) {
      insights.push({
        type: 'info',
        icon: Activity,
        title: 'Service Usage',
        message: `Currently using ${costData.cards.accessed_services} different AWS services`,
        severity: 'low'
      });
    }

    return insights;
  };

  const insights = generateInsights();

  // Filter services and resources based on search and selection
  const filteredServices = costData?.services?.filter(service => {
    const matchesSearch = service.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = selectedService === 'all' || service.service.toLowerCase().includes(selectedService.toLowerCase());
    return matchesSearch && matchesService && service.cost > 0;
  }) || [];

  const filteredResources = costData?.["Top Resources by Cost"]?.filter(resource => {
    if (!resource.resource || resource.resource === "" || resource.cost <= 0) return false;
    return resource.resource.toLowerCase().includes(searchTerm.toLowerCase());
  }) || [];

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-6 p-8">
          <div className="relative">
            <RefreshCw className="h-12 w-12 animate-spin mx-auto text-primary" />
            <div className="absolute inset-0 h-12 w-12 mx-auto border-4 border-primary/20 rounded-full animate-pulse" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Loading AWS Cost Data</h2>
            <p className="text-muted-foreground">Fetching your latest cost analytics and insights...</p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-6 max-w-md">
          <div className="relative">
            <AlertCircle className="h-16 w-16 mx-auto text-destructive" />
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full animate-ping" />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Unable to Load Cost Data</h2>
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Possible causes:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• API endpoint is temporarily unavailable</li>
                <li>• Network connectivity issues</li>
                <li>• Authentication or permission problems</li>
              </ul>
            </div>
          </div>
          <Button onClick={() => fetchCostData()} className="gap-2" size="lg">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Services detail view
  if (currentView === 'services') {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('dashboard')} 
            className="gap-2 hover:bg-accent"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Service Cost Details</h1>
            <p className="text-muted-foreground">Detailed breakdown of all AWS services and their costs</p>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                All Services Cost Breakdown
              </CardTitle>
              <Badge variant="secondary">
                {filteredServices.length} services
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    <SelectItem value="ec2">EC2 Services</SelectItem>
                    <SelectItem value="lambda">Lambda</SelectItem>
                    <SelectItem value="s3">S3</SelectItem>
                    <SelectItem value="bedrock">Bedrock</SelectItem>
                    <SelectItem value="waf">WAF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service Name</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Percentage of Total</TableHead>
                    <TableHead>Usage Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service, index) => (
                    <TableRow key={index} className="hover:bg-accent/50">
                      <TableCell>
                        <div className="font-medium">{service.service}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-lg">${service.cost.toFixed(2)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-3 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500" 
                              style={{ width: `${Math.min((service.cost / costData.summary.totalCost) * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium min-w-[3rem]">
                            {((service.cost / costData.summary.totalCost) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={service.cost > 1 ? 'default' : service.cost > 0.1 ? 'secondary' : 'outline'}>
                          {service.cost > 1 ? 'High Usage' : service.cost > 0.1 ? 'Medium Usage' : 'Low Usage'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredServices.length === 0 && (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">No services found</h3>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Resources detail view
  if (currentView === 'resources') {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('dashboard')} 
            className="gap-2 hover:bg-accent"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Resource Cost Details</h1>
            <p className="text-muted-foreground">Top resources by cost with detailed breakdown</p>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Top Resources by Cost
              </CardTitle>
              <Badge variant="secondary">
                {filteredResources.length} resources
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resource Name</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Percentage of Total</TableHead>
                    <TableHead>Cost Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources.slice(0, 20).map((resource, index) => (
                    <TableRow key={index} className="hover:bg-accent/50">
                      <TableCell>
                        <div className="font-medium" title={resource.resource}>
                          {resource.resource.length > 30 ? resource.resource.substring(0, 30) + '...' : resource.resource}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-lg">${resource.cost.toFixed(2)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-3 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500" 
                              style={{ width: `${Math.min((resource.cost / costData.summary.totalCost) * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium min-w-[3rem]">
                            {((resource.cost / costData.summary.totalCost) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={resource.cost > 5 ? 'destructive' : resource.cost > 1 ? 'default' : 'secondary'}>
                          {resource.cost > 5 ? 'High Cost' : resource.cost > 1 ? 'Medium Cost' : 'Low Cost'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredResources.length === 0 && (
                <div className="text-center py-12">
                  <Database className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">No resources found</h3>
                  <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main dashboard view
  return (
    <div className="space-y-2 p-2">
      {/* Header Section */}
      <div className="space-y-2">

        {/* Filters */}
        <div className="flex flex-wrap gap-4 p-4 bg-card rounded-lg border">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CalendarIcon size={16} />
                {dateRange?.from && dateRange?.to ? 
                  `${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd')}` : 
                  'Select date range'
                }
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Service Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="ec2">EC2</SelectItem>
              <SelectItem value="lambda">Lambda</SelectItem>
              <SelectItem value="s3">S3</SelectItem>
              <SelectItem value="bedrock">Bedrock</SelectItem>
              <SelectItem value="waf">WAF</SelectItem>
              <SelectItem value="dynamodb">DynamoDB</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="us-east-1">us-east-1</SelectItem>
              <SelectItem value="us-west-2">us-west-2</SelectItem>
              <SelectItem value="ap-south-1">ap-south-1</SelectItem>
              <SelectItem value="eu-west-1">eu-west-1</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Badge variant="secondary" className="gap-1">
              <Filter size={12} />
              {costData?.summary?.currency || 'USD'}
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Server size={12} />
              {costData?.cards?.accessed_services || 0} Services
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Activity size={12} />
              Live Data
            </Badge>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${costData?.summary?.totalCost?.toFixed(2) || '0.00'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Forecast: ${costData?.summary?.forecastTotal?.toFixed(2) || '0.00'}
            </p>
            {costData?.summary?.forecastTotal && costData?.summary?.totalCost && (
              <p className="text-xs flex items-center gap-1 mt-1">
                <TrendingUp size={12} />
                {(((costData.summary.forecastTotal - costData.summary.totalCost) / costData.summary.totalCost) * 100).toFixed(1)}% projected increase
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Service</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-foreground">
              {costData?.cards?.top_service?.service?.replace(/^(AWS |Amazon )?/, '') || 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              ${costData?.cards?.top_service?.cost?.toFixed(2) || '0.00'} this period
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Resource</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-foreground">
              {costData?.["Top Resources by Cost"]?.[0]?.resource || "N/A"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              ${(costData?.["Top Resources by Cost"]?.[0]?.cost || 0).toFixed(2)} this period
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Accessed Services</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {costData?.cards?.accessed_services || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Unique services accessed</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Daily Cost Trends & Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={combinedTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="formattedDate" 
                  tick={{ fontSize: 12 }}
                  stroke="#666"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#666"
                />
                <Tooltip 
                  formatter={(value, name) => [`${value}`, name === 'cost' ? 'Cost' : 'Forecast']}
                  labelStyle={{ color: '#666' }}
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #ccc', 
                    borderRadius: '6px' 
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="cost" 
                  stroke="#FF9900" 
                  strokeWidth={3}
                  dot={{ fill: '#FF9900', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#FF9900', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5" />
                Top Services by Cost
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setCurrentView('services')}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={processedServiceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {processedServiceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}`, 'Cost']}
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #ccc', 
                    borderRadius: '6px' 
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {processedResourcesData.length > 0 && (
          <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Top Resources by Cost
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setCurrentView('resources')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={processedResourcesData.slice(0, 8)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 11 }}
                    stroke="#666"
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#666"
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}`, 'Cost']}
                    labelFormatter={(label) => `Resource: ${processedResourcesData.find(r => r.name === label)?.fullName || label}`}
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #ccc', 
                      borderRadius: '6px' 
                    }}
                  />
                  <Bar dataKey="cost" fill="#FF9900" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Main Content with Insights Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Service Cost Breakdown
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      placeholder="Search services..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Name</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Percentage of Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredServices.slice(0, 10).map((service, index) => (
                      <TableRow key={index} className="hover:bg-accent/50 transition-colors">
                        <TableCell className="font-medium">{service.service}</TableCell>
                        <TableCell className="font-semibold">${service.cost.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-2 bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500" 
                                style={{ width: `${Math.min((service.cost / costData.summary.totalCost) * 100, 100)}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {((service.cost / costData.summary.totalCost) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={service.cost > 1 ? 'default' : service.cost > 0.1 ? 'secondary' : 'outline'}>
                            {service.cost > 1 ? 'Active' : service.cost > 0.1 ? 'Medium' : 'Low Usage'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredServices.length === 0 && (
                  <div className="text-center py-8">
                    <Search className="h-8 w-8 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">No services match your search criteria</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Sidebar */}
        <div className="xl:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {insights.length > 0 ? insights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <div
                    key={index}
                    className={cn(
                      "p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-sm",
                      insight.severity === 'high' ? "border-l-red-500 bg-red-50 dark:bg-red-950/20" :
                      insight.severity === 'medium' ? "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20" :
                      "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={cn(
                        "mt-0.5 flex-shrink-0",
                        insight.severity === 'high' ? "text-red-600" :
                        insight.severity === 'medium' ? "text-yellow-600" :
                        "text-blue-600"
                      )} size={18} />
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">{insight.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{insight.message}</p>
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="text-center text-muted-foreground py-6">
                  <Lightbulb className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">No insights available</p>
                  <p className="text-xs">Check back after more data is collected</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}