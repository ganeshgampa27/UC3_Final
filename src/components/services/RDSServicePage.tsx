// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import { Input } from '../ui/input';
// import { 
//   Database, 
//   Plus, 
//   Search, 
//   MoreHorizontal,
//   Activity,
//   HardDrive
// } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '../ui/dropdown-menu';

// const RDSServicePage = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const mockDatabases = [
//     {
//       id: 'db-1',
//       name: 'production-mysql',
//       engine: 'MySQL 8.0',
//       instance: 'db.t3.medium',
//       status: 'available',
//       region: 'us-east-1',
//       storage: '100 GB',
//       connections: 25
//     },
//     {
//       id: 'db-2',
//       name: 'staging-postgres',
//       engine: 'PostgreSQL 13',
//       instance: 'db.t3.small',
//       status: 'available',
//       region: 'us-west-2',
//       storage: '50 GB',
//       connections: 5
//     },
//     {
//       id: 'db-3',
//       name: 'analytics-mysql',
//       engine: 'MySQL 8.0',
//       instance: 'db.r5.large',
//       status: 'maintenance',
//       region: 'us-east-1',
//       storage: '500 GB',
//       connections: 0
//     }
//   ];

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'available':
//         return 'bg-green-500 text-white';
//       case 'maintenance':
//         return 'bg-orange-500 text-white';
//       case 'stopped':
//         return 'bg-red-500 text-white';
//       default:
//         return 'bg-gray-500 text-white';
//     }
//   };

//   const filteredDatabases = mockDatabases.filter(db =>
//     db.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     db.engine.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">RDS Databases</h1>
//           <p className="text-muted-foreground">Manage your AWS RDS database instances</p>
//         </div>
//         <Button className="bg-primary hover:bg-primary/90">
//           <Plus className="w-4 h-4 mr-2" />
//           Create Database
//         </Button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card className="bg-gradient-card">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Total Databases</p>
//                 <p className="text-3xl font-bold text-foreground">6</p>
//               </div>
//               <Database className="w-8 h-8 text-blue-500" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-card">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Active Connections</p>
//                 <p className="text-3xl font-bold text-foreground">30</p>
//               </div>
//               <Activity className="w-8 h-8 text-green-500" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-card">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Total Storage</p>
//                 <p className="text-3xl font-bold text-foreground">650 GB</p>
//               </div>
//               <HardDrive className="w-8 h-8 text-purple-500" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Your RDS Databases */}
//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <Database className="w-5 h-5 text-primary" />
//               <CardTitle>Your RDS Databases</CardTitle>
//             </div>
//             <div className="relative w-64">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//               <Input
//                 placeholder="Search databases..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </div>
//           <p className="text-sm text-muted-foreground">Manage your AWS RDS database instances</p>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {filteredDatabases.map((database) => (
//               <div key={database.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition-colors">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                     <Database className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-foreground">{database.name}</h3>
//                     <div className="flex items-center space-x-4 text-sm text-muted-foreground">
//                       <span>Engine: {database.engine}</span>
//                       <span>Instance: {database.instance}</span>
//                       <span>Storage: {database.storage}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <div className="text-sm text-muted-foreground">
//                     {database.connections} connections
//                   </div>
//                   <Badge className={getStatusColor(database.status)}>
//                     {database.status}
//                   </Badge>
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="sm">
//                         <MoreHorizontal className="w-4 h-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem>
//                         <Activity className="w-4 h-4 mr-2" />
//                         Monitor
//                       </DropdownMenuItem>
//                       <DropdownMenuItem>Connect</DropdownMenuItem>
//                       <DropdownMenuItem>Take Snapshot</DropdownMenuItem>
//                       <DropdownMenuItem>Modify</DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default RDSServicePage;

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  Database, 
  Plus, 
  Search, 
  MoreHorizontal,
  Activity,
  HardDrive
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../ui/dialog';

const RDSServicePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    engine: 'MySQL 8.0',
    instance: 'db.t3.medium',
    storage: '100',
    region: 'us-east-1',
  });

  const mockDatabases = [
    {
      id: 'db-1',
      name: 'production-mysql',
      engine: 'MySQL 8.0',
      instance: 'db.t3.medium',
      status: 'available',
      region: 'us-east-1',
      storage: '100 GB',
      connections: 25
    },
    {
      id: 'db-2',
      name: 'staging-postgres',
      engine: 'PostgreSQL 13',
      instance: 'db.t3.small',
      status: 'available',
      region: 'us-west-2',
      storage: '50 GB',
      connections: 5
    },
    {
      id: 'db-3',
      name: 'analytics-mysql',
      engine: 'MySQL 8.0',
      instance: 'db.r5.large',
      status: 'maintenance',
      region: 'us-east-1',
      storage: '500 GB',
      connections: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500 text-white';
      case 'maintenance':
        return 'bg-orange-500 text-white';
      case 'stopped':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const filteredDatabases = mockDatabases.filter(db =>
    db.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    db.engine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Creating RDS database:', formData);
    setIsModalOpen(false);
    setFormData({ name: '', engine: 'MySQL 8.0', instance: 'db.t3.medium', storage: '100', region: 'us-east-1' }); // Reset form
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">RDS Databases</h1>
          <p className="text-muted-foreground">Manage your AWS RDS database instances</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Database
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New RDS Database</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Database Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter database name"
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="engine" className="text-sm font-medium text-foreground">
                  Database Engine
                </label>
                <select
                  id="engine"
                  name="engine"
                  value={formData.engine}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-border bg-background py-2 px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="MySQL 8.0">MySQL 8.0</option>
                  <option value="PostgreSQL 13">PostgreSQL 13</option>
                  <option value="Aurora MySQL">Aurora MySQL</option>
                  <option value="Aurora PostgreSQL">Aurora PostgreSQL</option>
                </select>
              </div>
              <div>
                <label htmlFor="instance" className="text-sm font-medium text-foreground">
                  Instance Type
                </label>
                <select
                  id="instance"
                  name="instance"
                  value={formData.instance}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-border bg-background py-2 px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="db.t3.micro">db.t3.micro</option>
                  <option value="db.t3.small">db.t3.small</option>
                  <option value="db.t3.medium">db.t3.medium</option>
                  <option value="db.r5.large">db.r5.large</option>
                </select>
              </div>
              <div>
                <label htmlFor="storage" className="text-sm font-medium text-foreground">
                  Storage (GB)
                </label>
                <Input
                  id="storage"
                  name="storage"
                  type="number"
                  value={formData.storage}
                  onChange={handleInputChange}
                  placeholder="Enter storage size in GB"
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="region" className="text-sm font-medium text-foreground">
                  Region
                </label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-border bg-background py-2 px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="us-east-1">us-east-1</option>
                  <option value="us-west-2">us-west-2</option>
                  <option value="eu-west-1">eu-west-1</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Databases</p>
                <p className="text-3xl font-bold text-foreground">6</p>
              </div>
              <Database className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Connections</p>
                <p className="text-3xl font-bold text-foreground">30</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Storage</p>
                <p className="text-3xl font-bold text-foreground">650 GB</p>
              </div>
              <HardDrive className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Your RDS Databases */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-primary" />
              <CardTitle>Your RDS Databases</CardTitle>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search databases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Manage your AWS RDS database instances</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDatabases.map((database) => (
              <div key={database.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{database.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Engine: {database.engine}</span>
                      <span>Instance: {database.instance}</span>
                      <span>Storage: {database.storage}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-muted-foreground">
                    {database.connections} connections
                  </div>
                  <Badge className={getStatusColor(database.status)}>
                    {database.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Activity className="w-4 h-4 mr-2" />
                        Monitor
                      </DropdownMenuItem>
                      <DropdownMenuItem>Connect</DropdownMenuItem>
                      <DropdownMenuItem>Take Snapshot</DropdownMenuItem>
                      <DropdownMenuItem>Modify</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RDSServicePage;