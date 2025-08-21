import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./components/LoginModal";
import DashboardPage from "./components/DashboardPage";
import ManagerDashboard from "./components/ManagerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import RegistrationForm from "./components/Registration";
import RequestHistoryPage from "./components/RequestHistoryPage";
import ApprovalsPage from "./components/ApprovalsPage";
import RoleManagement from "./components/RoleManagementPage";
import TeamManagementPage from "./components/TeamManagementPage";
import OverviewPage from "./components/OverviewPage";
import OverviewPageUser from "./components/OverviewPageUser";
import ApprovedServicesPage from "./components/ApprovedServices";
import RequestsPage from "./components/RequestsPage";
import EC2ServicePage from "./components/services/EC2ServicePage";
import S3ServicePage from "./components/services/S3ServicePage";
import RDSServicePage from "./components/services/RDSServicePage";
import LambdaServicePage from "./components/services/LambdaServicePage";
import { CloudProviderProvider } from "./context/CloudProviderContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
        <CloudProviderProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/register" element={<RegistrationForm />} />


{/* Dashboard routes with persistent layout */}
            <Route path="/dashboard" element={<DashboardPage />}>
              {/* Redirect /dashboard to /dashboard/overview */}
              <Route index element={<Navigate to="/dashboard/overview" replace />} />
              <Route path="overview" element={<OverviewPageUser />} />
              <Route path="approved-services" element={<ApprovedServicesPage/>} />
              <Route path="requests" element={<RequestsPage />} />
             
              {/* Add infrastructure routes if needed */}
              <Route path="infrastructure">
                <Route index element={<EC2ServicePage/>} />
                <Route path="ec2" element={<EC2ServicePage/>} />
                <Route path="s3" element={<S3ServicePage/>} />
                 <Route path="rds" element={<RDSServicePage/>} /> {/*-----------no api created */}
                <Route path="lambda" element={<LambdaServicePage/>} />  {/*---------no api created */}
              </Route>
            </Route>
 


          {/* Manager Dashboard with nested routes */}
          <Route path="/manager-dashboard" element={<ManagerDashboard />}>
            <Route index element={<OverviewPage />} />
          
            <Route path="request-history" element={<RequestHistoryPage />} />
            <Route path="approvals" element={<ApprovalsPage />} />
            <Route path="role-management" element={<RoleManagement />} />
            <Route path="team-management" element={<TeamManagementPage />} />
          </Route>

{/*--------------------------------------------- started work on admin page*/}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />



          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </CloudProviderProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
