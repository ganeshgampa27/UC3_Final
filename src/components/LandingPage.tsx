import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  ArrowRight,
  Cloud,
  Shield,
  Users,
  TrendingUp,
  Zap,
  Globe,
  Sparkles,
} from "lucide-react";
import {
  cloudProviders,
  userRoles,
  dashboardStats,
  costData,
  accessLevels
} from "../mock/data";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [activeProvider, setActiveProvider] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveProvider((prev) => (prev + 1) % cloudProviders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTryDemo = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground border-b border-primary">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="w-8 h-8 text-primary-foreground" />
              <span className="text-xl font-semibold">UnifiedCloudControlCenter</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-sm font-mono uppercase tracking-wider hover:text-primary-light transition-colors"
              >
                Features
              </a>
              <a
                href="#roles"
                className="text-sm font-mono uppercase tracking-wider hover:text-primary-light transition-colors"
              >
                Roles
              </a>
              {/* <a
                href="#demo"
                className="text-sm font-mono uppercase tracking-wider hover:text-primary-light transition-colors"
              >
                Demo
              </a> */}
            </nav>
            <Button
              onClick={handleTryDemo}
              variant="secondary"
              className="font-mono text-sm uppercase tracking-wider"
            >
              Login/Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="space-y-4">
                {/* Badge */}
                <div className="inline-flex items-center space-x-2 bg-card border border-primary/20 rounded-full px-4 py-1 mt-4 shadow-soft">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    Next-Gen Cloud Management Platform
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold leading-tight text-foreground">
                  One Portal for
                  <br />
                  <span className="text-primary">All Cloud Needs</span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-lg">
                  Unified multi-cloud management platform for enterprise IT teams.
                  Control AWS, Azure, and GCP from a single interface.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleTryDemo}
                  className="bg-gradient-primary text-primary-foreground hover:opacity-90 font-mono text-sm uppercase tracking-wider px-8 py-4 shadow-medium"
                >
                  Login/Sign Up <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {dashboardStats.totalResources}
                  </div>
                  <div className="text-sm text-primary font-mono uppercase">
                    Resources
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {dashboardStats.activeUsers}
                  </div>
                  <div className="text-sm text-primary font-mono uppercase">
                    Active Users
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{dashboardStats.uptime}%</div>
                  <div className="text-sm text-primary font-mono uppercase">
                    Uptime
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Cloud Provider Selector */}
            <div className="relative">
              <Card className="p-8 shadow-large bg-gradient-card">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-card-foreground">Cloud Providers</h3>
                  <Badge
                    variant="outline"
                    className="text-cloud-emerald border-cloud-emerald"
                  >
                    All Connected
                  </Badge>
                </div>

                <div className="space-y-4">
                  {cloudProviders.map((provider, index) => (
                    <div
                      key={provider.id}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-500 cursor-pointer ${
                        activeProvider === index
                          ? "border-primary bg-primary-light shadow-soft"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setActiveProvider(index)}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            provider.status === "connected"
                              ? "bg-cloud-emerald"
                              : "bg-cloud-red"
                          }`}
                        ></div>
                        <span className="font-medium text-card-foreground">{provider.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-mono text-card-foreground">
                          {provider.resources} resources
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${provider.cost.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Enterprise-Grade Multi-Cloud Control
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Streamline your cloud operations with role-based access, automated
              workflows, and real-time cost visibility across all major cloud
              providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-large transition-shadow duration-300 bg-gradient-card">
              <div className="mb-6">
                <div className="w-12 h-12 bg-cloud-emerald text-white rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                  Access Level Management
                </h3>
                <p className="text-muted-foreground">
                  Control access to AWS, Azure, and GCP services with Read, Write, or Full permissions for precise action management.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-mono text-muted-foreground">
                  SUPPORTED ACCESS LEVELS
                </div>
                <div className="flex flex-wrap gap-2">
                  {accessLevels.map((level) => (
                    <Badge
                      key={level.id}
                      variant="secondary"
                      className="text-xs"
                    >
                      {level.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-large transition-shadow duration-300 bg-gradient-card">
              <div className="mb-6">
                <div className="w-12 h-12 bg-cloud-orange text-white rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                  Infrastructure Control
                </h3>
                <p className="text-muted-foreground">
                  Seamless setup of services across AWS, Azure, and GCP through infrastructure-level workflows.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-mono text-muted-foreground">
                  APPROVAL TIME
                </div>
                <div className="text-2xl font-bold text-card-foreground">~15 mins</div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-large transition-shadow duration-300 bg-gradient-card">
              <div className="mb-6">
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                  Cost Optimization
                </h3>
                <p className="text-muted-foreground">
                  Real-time cost tracking, budget alerts, and forecasting across
                  all cloud providers with actionable insights.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-mono text-muted-foreground">
                  MONTHLY SAVINGS
                </div>
                <div className="text-2xl font-bold text-cloud-emerald">
                  ${dashboardStats.costSavings.toLocaleString()}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Role-Based Dashboards Preview */}
      <section id="roles" className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Tailored Dashboards for Every Role
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Different roles see different views. From resource requests to
              global oversight, each dashboard is optimized for specific
              workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userRoles.map((role, index) => (
              <Card
                key={role.id}
                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-large ${
                  selectedRole === index ? "ring-2 ring-primary shadow-glow" : ""
                }`}
                onClick={() =>
                  setSelectedRole(selectedRole === index ? null : index)
                }
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index === 0
                          ? "bg-cloud-emerald"
                          : index === 1
                          ? "bg-cloud-blue"
                          : "bg-primary"
                      }`}
                    >
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-card-foreground">{role.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {role.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 transition-transform text-muted-foreground ${
                      selectedRole === index ? "rotate-90" : ""
                    }`}
                  />
                </div>

                {selectedRole === index && (
                  <div className="space-y-4 pt-4 border-t border-border">
                    <div>
                      <div className="text-sm font-mono text-muted-foreground mb-2">
                        DASHBOARD FEATURES
                      </div>
                      <div className="space-y-1">
                        {role.dashboardFeatures.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm text-card-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-mono text-muted-foreground mb-2">
                        DEMO CREDENTIALS
                      </div>
                      <div className="bg-muted p-3 rounded text-sm font-mono">
                        <div className="text-muted-foreground">Username: {role.credentials.username}</div>
                        <div className="text-muted-foreground">Password: {role.credentials.password}</div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo CTA Section */}
      <section id="demo" className="py-20 bg-primary-light">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              Experience Multi-Cloud Control
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Try our interactive demo with dummy data that simulates real-world
              multi-cloud scenarios. No setup required - just pick your role and
              explore.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={handleTryDemo}
                className="bg-gradient-primary text-primary-foreground hover:opacity-90 font-mono text-sm uppercase tracking-wider px-8 py-4 shadow-medium"
              >
                Start Demo Experience
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <Card className="p-6 bg-gradient-card">
                <div className="text-sm font-mono text-muted-foreground mb-2">
                  SIMULATED DATA
                </div>
                <div className="text-2xl font-bold mb-2 text-card-foreground">
                  ${costData.currentMonth.total.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Monthly cloud spend across all providers
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card">
                <div className="text-sm font-mono text-muted-foreground mb-2">
                  ACTIVE REQUESTS
                </div>
                <div className="text-2xl font-bold mb-2 text-card-foreground">
                  {dashboardStats.pendingRequests}
                </div>
                <div className="text-sm text-muted-foreground">
                  Pending approval workflows
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card">
                <div className="text-sm font-mono text-muted-foreground mb-2">
                  FORECAST ACCURACY
                </div>
                <div className="text-2xl font-bold mb-2 text-card-foreground">
                  {costData.forecast.confidence}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Cost prediction confidence
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="w-6 h-6" />
                <span className="text-lg font-semibold">
                  UC3
                </span>
              </div>
              <p className="text-primary-foreground/70 text-sm">
                Unified multi-cloud management platform for enterprise IT teams.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-sm text-primary-foreground/70">
                <div>AWS Integration</div>
                <div>Azure Integration</div>
                <div>GCP Integration</div>
                <div>Multi-Cloud Control</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <div className="space-y-2 text-sm text-primary-foreground/70">
                <div>Role-Based Access</div>
                <div>Cost Management</div>
                <div>Workflow Automation</div>
                <div>Real-time Monitoring</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-primary-foreground/70">
                <div>Documentation</div>
                <div>Live Demo</div>
                <div>Enterprise Trial</div>
                <div>Contact Sales</div>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/70">
            <p>
              © 2024 CloudUnify. All rights reserved. Built for enterprise IT
              teams.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;