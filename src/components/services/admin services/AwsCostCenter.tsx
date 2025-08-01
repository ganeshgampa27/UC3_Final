import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign, Server, Database, Calendar as CalendarIcon, Filter, Download, Search, ChevronDown, AlertCircle, Lightbulb, Shield, Tag } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar, ComposedChart, Area, AreaChart } from 'recharts';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';

// Sample data for the dashboard
const costData = [
  { date: '2024-01-01', ec2: 800, lambda: 550, s3: 300, rds: 400, total: 2050 },
  { date: '2024-01-02', ec2: 820, lambda: 580, s3: 320, rds: 420, total: 2140 },
  { date: '2024-01-03', ec2: 780, lambda: 620, s3: 310, rds: 430, total: 2140 },
  { date: '2024-01-04', ec2: 850, lambda: 560, s3: 330, rds: 410, total: 2150 },
  { date: '2024-01-05', ec2: 810, lambda: 590, s3: 300, rds: 420, total: 2120 },
  { date: '2024-01-06', ec2: 830, lambda: 570, s3: 340, rds: 440, total: 2180 },
  { date: '2024-01-07', ec2: 790, lambda: 600, s3: 320, rds: 430, total: 2140 },
];

const serviceBreakdown = [
  { name: 'EC2', value: 800, color: '#FF9900' },
  { name: 'Lambda', value: 550, color: '#232F3E' },
  { name: 'S3', value: 300, color: '#FF4F00' },
  { name: 'RDS', value: 400, color: '#146EB4' },
  { name: 'Elastic Beanstalk', value: 250, color: '#FF9900' },
];

const resourceData = [
  { service: 'EC2', resource: 'ec2-web-01', region: 'us-east-1', cost: 400, usage: '700 compute hrs', accessLevel: 'Owner', duration: '7 days', tags: ['prod', 'web'], approvalDate: '2024-01-01', status: 'Active' },
  { service: 'Lambda', resource: 'lambda-user-auth', region: 'ap-south-1', cost: 250, usage: '60K invocations', accessLevel: 'Contributor', duration: '3 days', tags: ['prod', 'auth'], approvalDate: '2024-01-02', status: 'Active' },
  { service: 'S3', resource: 's3-logs-prod', region: 'us-west-2', cost: 150, usage: '2.5TB storage', accessLevel: 'Reader', duration: '30 days', tags: ['prod', 'logs'], approvalDate: '2023-12-15', status: 'Active' },
  { service: 'RDS', resource: 'rds-user-db', region: 'us-east-1', cost: 300, usage: '1.5M IOPS', accessLevel: 'Owner', duration: '1 day', tags: ['prod', 'database'], approvalDate: '2024-01-05', status: 'Expired' },
  { service: 'Elastic Beanstalk', resource: 'eb-api-gateway', region: 'eu-west-1', cost: 200, usage: '150 app hrs', accessLevel: 'Contributor', duration: '5 days', tags: ['staging', 'api'], approvalDate: '2024-01-03', status: 'Active' },
];

const insights = [
  { type: 'alert', icon: AlertTriangle, title: 'Cost Spike Detected', message: 'EC2 instance cost up by 25% in 3 days', severity: 'high' },
  { type: 'recommendation', icon: Lightbulb, title: 'Cost Optimization', message: 'Use Spot Instances for 40% savings', severity: 'medium' },
  { type: 'access', icon: Shield, title: 'Access Insight', message: 'Owner access on unused RDS instance', severity: 'medium' },
  { type: 'tagging', icon: Tag, title: 'Tagging Issue', message: '2 AWS resources missing env tags', severity: 'low' },
];

export default function AwsCostCenter() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({ from: subDays(new Date(), 7), to: new Date() });
  const [selectedService, setSelectedService] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showInsights, setShowInsights] = useState(true);

  const COLORS = ['#FF9900', '#232F3E', '#FF4F00', '#146EB4', '#FF9900'];

  const filteredResources = resourceData.filter(resource => {
    const matchesSearch = resource.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = selectedService === 'all' || resource.service.toLowerCase().includes(selectedService.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || resource.region === selectedRegion;
    return matchesSearch && matchesService && matchesRegion;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AWS Cost Center Dashboard</h1>
            <p className="text-muted-foreground">Track and optimize your AWS cloud costs with detailed insights</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Export Report
          </Button>
        </div>

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
              <SelectItem value="rds">RDS</SelectItem>
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
              Production
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Server size={12} />
              High Usage
            </Badge>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$1,450.00</div>
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <TrendingUp size={12} />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Service</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-foreground">EC2</div>
            <p className="text-xs text-muted-foreground mt-1">$800.00 this month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Resource</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-foreground">ec2-web-01</div>
            <p className="text-xs text-muted-foreground mt-1">$400.00 this month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Accessed Services</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">6</div>
            <p className="text-xs text-muted-foreground mt-1">Unique services accessed</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Idle Spend</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">$65.00</div>
            <p className="text-xs text-muted-foreground mt-1">Unused resources</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Budget Usage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">62%</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingDown size={12} />
              Under budget
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
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
                <Area type="monotone" dataKey="ec2" stackId="1" stroke="#FF9900" fill="#FF9900" fillOpacity={0.6} />
                <Area type="monotone" dataKey="lambda" stackId="1" stroke="#232F3E" fill="#232F3E" fillOpacity={0.6} />
                <Area type="monotone" dataKey="s3" stackId="1" stroke="#FF4F00" fill="#FF4F00" fillOpacity={0.6} />
                <Area type="monotone" dataKey="rds" stackId="1" stroke="#146EB4" fill="#146EB4" fillOpacity={0.6} />
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
                <Bar dataKey="cost" fill="#FF9900" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Main Content with Insights Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          {/* Detailed Cost Breakdown Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Resource Cost Breakdown</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      placeholder="Search resources..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Download size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Resource Name</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Access Level</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResources.map((resource, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{resource.service}</TableCell>
                        <TableCell>{resource.resource}</TableCell>
                        <TableCell>{resource.region}</TableCell>
                        <TableCell className="font-semibold">${resource.cost}</TableCell>
                        <TableCell>{resource.usage}</TableCell>
                        <TableCell>
                          <Badge variant={resource.accessLevel === 'Owner' ? 'destructive' : resource.accessLevel === 'Contributor' ? 'default' : 'secondary'}>
                            {resource.accessLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>{resource.duration}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {resource.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={resource.status === 'Active' ? 'default' : resource.status === 'Expired' ? 'destructive' : 'secondary'}>
                            {resource.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Sidebar */}
        {showInsights && (
          <div className="xl:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Insights & Recommendations</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowInsights(false)}>
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (
                    <div
                      key={index}
                      className={cn(
                        "p-3 rounded-lg border-l-4",
                        insight.severity === 'high' ? "border-l-destructive bg-destructive/5" :
                        insight.severity === 'medium' ? "border-l-yellow-500 bg-yellow-500/5" :
                        "border-l-blue-500 bg-blue-500/5"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={cn(
                          "mt-0.5 flex-shrink-0",
                          insight.severity === 'high' ? "text-destructive" :
                          insight.severity === 'medium' ? "text-yellow-600" :
                          "text-blue-600"
                        )} size={16} />
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{insight.title}</p>
                          <p className="text-xs text-muted-foreground">{insight.message}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}