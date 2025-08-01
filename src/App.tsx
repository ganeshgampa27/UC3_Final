import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import ManagerDashboard from "./components/ManagerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Dashboard from "./components/services/admin services/Dashboard";
import Users from "./components/services/admin services/Users";
import Departments from "./components/services/admin services/Departments";
import CloudUsage from "./components/services/admin services/CloudUsage";
import CostsBudgets from "./components/services/admin services/CostsBudgets";
import AzureCostCenter from "./components/services/admin services/AzureCostCenter";
import GcpCostCenter from "./components/services/admin services/Gcp";
import AwsCostCenter from "./components/services/admin services/AwsCostCenter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}

{/*--------------------------------------------- started work on admin page*/}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />



          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
