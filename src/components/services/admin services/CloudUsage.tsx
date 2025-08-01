import { Cloud, TrendingUp, Activity, Server } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { MetricCard } from "@/components/admin_components/MetricCard";
import { useCloudService } from "@/components/admin_components/CloudServiceProvider";

const dailyUsageData = [
  { date: 'Mon', aws: 2400, azure: 1200, gcp: 800 },
  { date: 'Tue', aws: 2600, azure: 1100, gcp: 750 },
  { date: 'Wed', aws: 2200, azure: 1300, gcp: 900 },
  { date: 'Thu', aws: 2800, azure: 1400, gcp: 850 },
  { date: 'Fri', aws: 3200, azure: 1600, gcp: 950 },
  { date: 'Sat', aws: 1800, azure: 900, gcp: 600 },
  { date: 'Sun', aws: 1600, azure: 800, gcp: 550 },
];

const monthlyTrendData = [
  { month: 'Jan', usage: 85, cost: 52000 },
  { month: 'Feb', usage: 78, cost: 48000 },
  { month: 'Mar', usage: 92, cost: 61000 },
  { month: 'Apr', usage: 88, cost: 58000 },
  { month: 'May', usage: 95, cost: 65000 },
  { month: 'Jun', usage: 97, cost: 67890 },
];

const resourceTypeData = [
  { type: 'Compute', instances: 145, utilizationRate: 78 },
  { type: 'Storage', instances: 89, utilizationRate: 85 },
  { type: 'Database', instances: 34, utilizationRate: 92 },
  { type: 'Network', instances: 67, utilizationRate: 68 },
  { type: 'Analytics', instances: 23, utilizationRate: 45 },
];

export default function CloudUsage() {
  const { selectedService } = useCloudService();

  const getMetrics = () => {
    const metrics = {
      all: {
        totalResources: 1234,
        avgUtilization: 78,
        monthlyCost: 67890,
        growthRate: 12
      },
      aws: {
        totalResources: 687,
        avgUtilization: 82,
        monthlyCost: 42340,
        growthRate: 15
      },
      azure: {
        totalResources: 423,
        avgUtilization: 75,
        monthlyCost: 18650,
        growthRate: 8
      },
      gcp: {
        totalResources: 124,
        avgUtilization: 68,
        monthlyCost: 6900,
        growthRate: 18
      }
    };
    return metrics[selectedService];
  };

  const metrics = getMetrics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cloud Usage Analytics</h1>
          <p className="text-muted-foreground">
            Monitor and analyze cloud resource utilization
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Total Resources"
          value={metrics.totalResources.toLocaleString()}
          change="+23 this week"
          changeType="positive"
          icon={<Server className="h-4 w-4" />}
        />
        <MetricCard
          title="Average Utilization"
          value={`${metrics.avgUtilization}%`}
          change="+5% improvement"
          changeType="positive"
          icon={<Activity className="h-4 w-4" />}
        />
        <MetricCard
          title="Monthly Cost"
          value={`$${metrics.monthlyCost.toLocaleString()}`}
          change="+5.2% from last month"
          changeType="negative"
          icon={<Cloud className="h-4 w-4" />}
        />
        <MetricCard
          title="Growth Rate"
          value={`+${metrics.growthRate}%`}
          change="Month over month"
          changeType="positive"
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Daily Usage Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Usage Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyUsageData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" className="text-muted-foreground" />
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
                    <Line type="monotone" dataKey="aws" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="azure" stroke="#06b6d4" strokeWidth={2} />
                    <Line type="monotone" dataKey="gcp" stroke="#8b5cf6" strokeWidth={2} />
                  </>
                ) : (
                  <Line 
                    type="monotone" 
                    dataKey={selectedService} 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2} 
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Cost Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Cost & Utilization Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resource Type Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Type Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resourceTypeData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="type" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="instances" fill="hsl(var(--primary))" name="Instances" />
              <Bar dataKey="utilizationRate" fill="hsl(var(--info))" name="Utilization %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Resource Details */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Utilization Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resourceTypeData.map((resource) => (
              <div key={resource.type} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold text-foreground">{resource.type}</h3>
                  <p className="text-sm text-muted-foreground">{resource.instances} instances</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{resource.utilizationRate}%</p>
                  <p className="text-sm text-muted-foreground">Utilization rate</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}