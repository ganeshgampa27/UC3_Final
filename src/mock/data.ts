// Mock data for the application
// export const cloudProviders = [
//   {
//     id: 'aws',
//     name: 'Amazon Web Services',
//     status: 'connected' as const,
//     resources: 245,
//     cost: 12450
//   },
//   {
//     id: 'azure',
//     name: 'Microsoft Azure',
//     status: 'connected' as const,
//     resources: 180,
//     cost: 8920
//   },
//   {
//     id: 'gcp',
//     name: 'Google Cloud Platform',
//     status: 'connected' as const,
//     resources: 95,
//     cost: 5670
//   }
// ];


export const cloudProviders = [
  {
    id: 'aws',
    name: 'Amazon Web Services',
    status: 'connected',
    resources: 8,
    cost: 1200,
    region: 'us-east-1',
    services: ['EC2', 'S3', 'Lambda'],
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    status: 'connected',
    resources: 3,
    cost: 800,
    region: 'eastus',
    services: ['VM', 'Blob Storage', 'Functions'],
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
    status: 'connected',
    resources: 1,
    cost: 450,
    region: 'us-central1',
    services: ['Compute Engine', 'Cloud Storage'],
  },
];

// AWS Services
export const awsServices = [
  {
    id: 'ec2',
    name: 'EC2 - Elastic Compute Cloud',
    category: 'Compute',
    description: 'Virtual servers in the cloud',
    icon: '💻',
    status: 'available'
  },
  {
    id: 's3',
    name: 'S3 - Simple Storage Service',
    category: 'Storage',
    description: 'Object storage service',
    icon: '🗃️',
    status: 'available'
  },
  {
    id: 'rds',
    name: 'RDS - Relational Database Service',
    category: 'Database',
    description: 'Managed relational database',
    icon: '🗄️',
    status: 'available'
  },
  {
    id: 'lambda',
    name: 'Lambda',
    category: 'Compute',
    description: 'Serverless compute service',
    icon: '⚡',
    status: 'available'
  },
  {
    id: 'cloudfront',
    name: 'CloudFront',
    category: 'Networking',
    description: 'Content delivery network',
    icon: '🌐',
    status: 'available'
  },
  {
    id: 'iam',
    name: 'IAM - Identity and Access Management',
    category: 'Security',
    description: 'User access and permissions',
    icon: '🔐',
    status: 'available'
  }
];

// Azure Services
export const azureServices = [
  {
    id: 'virtual-machines',
    name: 'Virtual Machines',
    category: 'Compute',
    description: 'Scalable virtual machines',
    icon: '💻',
    status: 'available'
  },
  {
    id: 'blob-storage',
    name: 'Blob Storage',
    category: 'Storage',
    description: 'Object storage for the cloud',
    icon: '🗃️',
    status: 'available'
  },
  {
    id: 'sql-database',
    name: 'SQL Database',
    category: 'Database',
    description: 'Managed SQL database',
    icon: '🗄️',
    status: 'available'
  },
  {
    id: 'functions',
    name: 'Azure Functions',
    category: 'Compute',
    description: 'Event-driven serverless compute',
    icon: '⚡',
    status: 'available'
  },
  {
    id: 'cdn',
    name: 'Content Delivery Network',
    category: 'Networking',
    description: 'Global content delivery',
    icon: '🌐',
    status: 'available'
  },
  {
    id: 'active-directory',
    name: 'Active Directory',
    category: 'Security',
    description: 'Identity and access management',
    icon: '🔐',
    status: 'available'
  }
];

// GCP Services
export const gcpServices = [
  {
    id: 'compute-engine',
    name: 'Compute Engine',
    category: 'Compute',
    description: 'Virtual machines and containers',
    icon: '💻',
    status: 'available'
  },
  {
    id: 'cloud-storage',
    name: 'Cloud Storage',
    category: 'Storage',
    description: 'Object storage service',
    icon: '🗃️',
    status: 'available'
  },
  {
    id: 'cloud-sql',
    name: 'Cloud SQL',
    category: 'Database',
    description: 'Managed MySQL, PostgreSQL, SQL Server',
    icon: '🗄️',
    status: 'available'
  },
  {
    id: 'cloud-functions',
    name: 'Cloud Functions',
    category: 'Compute',
    description: 'Event-driven serverless platform',
    icon: '⚡',
    status: 'available'
  },
  {
    id: 'cloud-cdn',
    name: 'Cloud CDN',
    category: 'Networking',
    description: 'Content delivery network',
    icon: '🌐',
    status: 'available'
  },
  {
    id: 'cloud-iam',
    name: 'Cloud IAM',
    category: 'Security',
    description: 'Identity and access management',
    icon: '🔐',
    status: 'available'
  }
];

export const servicesByProvider = {
  aws: awsServices,
  azure: azureServices,
  gcp: gcpServices
};


// mock/data.ts
export interface CloudProvider {
  id: string;
  name: string;
  status: string;
  resources: number;
  cost: number;
  region: string;
  services: string[];
}

export interface RecentRequest {
  runtime: string;
  memory: any;
  timeout: any;
  id: string;
  title: string;
  cloud: string;
  accesslevel: string;
  user: string;
  requester: string;
  service: string;
  provider: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  createdAt: string;
  estimatedCost: number;
  description: string;
  rejectionReason?: string;
}

export interface DashboardStats {
  totalResources: string;
  activeUsers: string;
  uptime: number;
  costSavings: number;
  pendingRequests: number;
  monthlySpend: number;
  avgApprovalTime: string;
  monthlyBudget: number; // Added
}

export interface CostData {
  currentMonth: {
    total: number;
    aws: number;
    azure: number;
    gcp: number;
  };
  forecast: {
    nextMonth: number;
    confidence: number;
    trend: string;
  };
  breakdown: {
    compute: number;
    storage: number;
    networking: number;
    databases: number;
    other: number;
  };
  alerts: { // Added
    message: string;
    provider: string;
    severity: 'high' | 'medium';
  }[];
}



export const userRoles = [
  {
    id: 'employee',
    name: 'Employee',
    description: 'Request access to cloud resources and track usage',
    credentials: {
      username: 'john.doe@company.com',
      password: 'demo123',
    },
    permissions: ['view_resources', 'request_access', 'view_own_requests'],
    dashboardFeatures: [
      'Resource Request Dashboard',
      'Personal Usage Analytics',
      'Request History & Status',
      'Cost Tracking (Personal)',
      'Available Services Catalog',
    ],
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Approve requests and manage team access',
    credentials: {
      username: 'sarah.manager@company.com',
      password: 'demo123',
    },
    permissions: ['view_resources', 'approve_requests', 'manage_team', 'view_analytics'],
    dashboardFeatures: [
      'Team Overview Dashboard',
      'Approval Queue Management',
      'Team Cost Analytics',
      'Resource Allocation Reports',
      'Policy Management',
    ],
  },
  {
    id: 'admin',
    name: 'IT Admin',
    description: 'Full platform administration and infrastructure management',
    credentials: {
      username: 'admin@company.com',
      password: 'demo123',
    },
    permissions: ['full_access', 'manage_infrastructure', 'manage_policies', 'view_global_analytics'],
    dashboardFeatures: [
      'Global Infrastructure Control',
      'User & Role Management',
      'Policy Templates & Rules',
      'Global Cost Optimization',
      'Security & Compliance Dashboard',
    ],
  },
];

export const dashboardStats: DashboardStats = {
  totalResources: '2.8K',
  activeUsers: '156',
  uptime: 99.9,
  costSavings: 23400,
  pendingRequests: 12,
  monthlySpend: 202020,
  avgApprovalTime: '15 mins',
  monthlyBudget: 250000, // Added for Budget Overview
};

export const costData: CostData = {
  currentMonth: {
    total: 202020,
    aws: 89420,
    azure: 67320,
    gcp: 45280,
  },
  forecast: {
    nextMonth: 218500,
    confidence: 94,
    trend: 'increasing',
  },
  breakdown: {
    compute: 45,
    storage: 25,
    networking: 15,
    databases: 10,
    other: 5,
  },
  alerts: [
    // Added to support Cost Alerts
    {
      message: 'High compute usage detected',
      provider: 'aws',
      severity: 'high',
    },
    {
      message: 'Storage costs exceeding budget',
      provider: 'azure',
      severity: 'medium',
    },
  ],
};

export const recentRequests: RecentRequest[] = [
  {
    "id": "REQ-001",
    "cloud": "AWS",
    "service": "EC2",
    "accesslevel": "write",
    "status": "pending",
    "description": "Development environment for Q1 project",
    "requestDate": "2024-01-28",
    title: "",
    user: "",
    requester: "",
    provider: "",
    createdAt: "",
    estimatedCost: 0,
    runtime: "",
    memory: undefined,
    timeout: undefined
  },
  {
    "id": "REQ-002",
    "cloud": "Azure",
    "service": "SQL Database",
    "accesslevel": "full access",
    "status": "approved",
    "description": "Database for customer analytics platform",
    "requestDate": "2024-01-27",
    title: "",
    user: "",
    requester: "",
    provider: "",
    createdAt: "",
    estimatedCost: 0,
    runtime: "",
    memory: undefined,
    timeout: undefined
  },
  {
    "id": "REQ-003",
    "cloud": "GCP",
    "service": "BigQuery",
    "accesslevel": "read",
    "status": "rejected",
    "description": "Data warehousing solution",
    "requestDate": "2024-01-26",
    title: "",
    user: "",
    requester: "",
    provider: "",
    createdAt: "",
    estimatedCost: 0,
    runtime: "",
    memory: undefined,
    timeout: undefined
  },
  {
    "id": "REQ-004",
    "cloud": "AWS",
    "service": "S3 Bucket",
    "accesslevel": "write",
    "status": "pending",
    "description": "Storage for application assets",
    "requestDate": "2024-01-29",
    title: "",
    user: "",
    requester: "",
    provider: "",
    createdAt: "",
    estimatedCost: 0,
    runtime: "",
    memory: undefined,
    timeout: undefined
  },
  {
    "id": "REQ-005",
    "cloud": "Azure",
    "service": "Virtual Machines",
    "accesslevel": "full access",
    "status": "approved",
    "description": "Compute resources for web application",
    "requestDate": "2024-01-30",
    title: "",
    user: "",
    requester: "",
    provider: "",
    createdAt: "",
    estimatedCost: 0,
    runtime: "",
    memory: undefined,
    timeout: undefined
  }
];

export const accessLevels = [
  { id: 1, name: 'Read', description: 'View resources and configurations' },
  { id: 2, name: 'Write', description: 'Modify existing resources' },
  { id: 3, name: 'Full', description: 'Create, modify, and delete resources' },
];

// src/mock/data.ts
// ... (existing imports and interfaces: CloudProvider, RecentRequest, DashboardStats, CostData, etc.)

export interface MockRequest {
  id: string;
  type: 'resource_creation' | 'scale_up' | 'storage_increase' | 'new_service';
  title: string;
  description: string;
  requester: string;
  status: 'pending' | 'approved' | 'rejected';
  priority?: string;
  estimatedCost: number;
  provider: 'aws' | 'azure' | 'gcp';
  createdAt: string;
  approver: string;
}

export const mockRequests: MockRequest[] = [
  {
    id: 'REQ-001',
    type: 'resource_creation',
    title: 'New Development Environment',
    description: 'Request for AWS EC2 instance for development team',
    requester: 'john.doe@gmail.com',
    status: 'pending',
    estimatedCost: 450.0,
    provider: 'aws',
    createdAt: '2024-01-15T10:30:00Z',
    approver: 'jane.smith@gmail.com',
  },
  {
    id: 'REQ-002',
    type: 'scale_up',
    title: 'Production Database Scaling',
    description: 'Scale up Azure SQL Database for increased load',
    requester: 'mike.johnson@gmail.com',
    status: 'approved',
    estimatedCost: 1200.0,
    provider: 'azure',
    createdAt: '2024-01-14T14:20:00Z',
    approver: 'jane.smith@gmail.com',
  },
  {
    id: 'REQ-003',
    type: 'storage_increase',
    title: 'Additional Storage',
    description: 'Increase GCP Cloud Storage for data analytics',
    requester: 'john.doe@gmail.com',
    status: 'rejected',
    estimatedCost: 300.0,
    provider: 'gcp',
    createdAt: '2024-01-13T09:15:00Z',
    approver: 'jane.smith@gmail.com',
  },
  {
    id: 'REQ-004',
    type: 'new_service',
    title: 'Lambda Function Setup',
    description: 'Setup serverless function for image processing',
    requester: 'john.doe@gmail.com',
    status: 'approved',
    estimatedCost: 150.0,
    provider: 'aws',
    createdAt: '2024-01-12T11:45:00Z',
    approver: 'jane.smith@gmail.com',
  },
  {
    id: 'REQ-005',
    type: 'resource_creation',
    title: 'Test Environment',
    description: 'Setup testing environment for QA team',
    requester: 'sarah.wilson@gmail.com',
    status: 'pending',
    estimatedCost: 200.0,
    provider: 'azure',
    createdAt: '2024-01-11T15:20:00Z',
    approver: 'jane.smith@gmail.com',
  },
];

export interface Service {
  id: string;
  name: string;
  description: string;
  provider: 'aws' | 'azure' | 'gcp';
  estimatedCost: number;
  status: string;
}

// src/mock/data.ts
export const mockServices: Service[] = [
  // AWS Services
  {
    id: 'aws-ec2',
    name: 'EC2',
    description: 'Elastic Compute Cloud for virtual servers',
    provider: 'aws',
    estimatedCost: 100.0,
    status: 'active',
  },
  {
    id: 'aws-s3',
    name: 'S3',
    description: 'Simple Storage Service for object storage',
    provider: 'aws',
    estimatedCost: 50.0,
    status: 'active',
  },
  {
    id: 'aws-rds',
    name: 'RDS',
    description: 'Relational Database Service',
    provider: 'aws',
    estimatedCost: 200.0,
    status: 'active',
  },
  {
    id: 'aws-lambda',
    name: 'Lambda',
    description: 'Serverless computing platform',
    provider: 'aws',
    estimatedCost: 30.0,
    status: 'active',
  },
  {
    id: 'aws-ecs',
    name: 'ECS',
    description: 'Elastic Container Service',
    provider: 'aws',
    estimatedCost: 150.0,
    status: 'active',
  },
  // Azure Services
  {
    id: 'azure-vms',
    name: 'Virtual Machines',
    description: 'Azure Virtual Machines for scalable computing',
    provider: 'azure',
    estimatedCost: 120.0,
    status: 'active',
  },
  {
    id: 'azure-storage',
    name: 'Storage',
    description: 'Azure Blob Storage for data storage',
    provider: 'azure',
    estimatedCost: 60.0,
    status: 'active',
  },
  {
    id: 'azure-sql',
    name: 'SQL Database',
    description: 'Managed SQL database service',
    provider: 'azure',
    estimatedCost: 180.0,
    status: 'active',
  },
  {
    id: 'azure-functions',
    name: 'Functions',
    description: 'Serverless compute service',
    provider: 'azure',
    estimatedCost: 40.0,
    status: 'active',
  },
  {
    id: 'azure-containers',
    name: 'Container Instances',
    description: 'Run containers without managing servers',
    provider: 'azure',
    estimatedCost: 140.0,
    status: 'active',
  },
  // GCP Services
  {
    id: 'gcp-compute',
    name: 'Compute Engine',
    description: 'Virtual machines on Google Cloud',
    provider: 'gcp',
    estimatedCost: 110.0,
    status: 'active',
  },
  {
    id: 'gcp-storage',
    name: 'Cloud Storage',
    description: 'Object storage for unstructured data',
    provider: 'gcp',
    estimatedCost: 55.0,
    status: 'active',
  },
  {
    id: 'gcp-sql',
    name: 'Cloud SQL',
    description: 'Managed relational database service',
    provider: 'gcp',
    estimatedCost: 190.0,
    status: 'active',
  },
  {
    id: 'gcp-functions',
    name: 'Cloud Functions',
    description: 'Event-driven serverless computing',
    provider: 'gcp',
    estimatedCost: 35.0,
    status: 'active',
  },
  {
    id: 'gcp-run',
    name: 'Cloud Run',
    description: 'Managed platform for containerized applications',
    provider: 'gcp',
    estimatedCost: 130.0,
    status: 'active',
  },
];
