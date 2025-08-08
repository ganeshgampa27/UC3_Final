// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import { Input } from '../ui/input';
// import { 
//   Server, 
//   Plus, 
//   Search, 
//   MoreHorizontal,
//   Power,
//   PowerOff,
//   Settings
// } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '../ui/dropdown-menu';

// const EC2ServicePage = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const mockInstances = [
//     {
//       id: 'i-1234567890abcdef0',
//       name: 'web-server-01',
//       type: 't3.medium',
//       region: 'us-east-1',
//       status: 'running',
//       launchTime: '2024-01-15 10:30:00',
//       publicIp: '54.123.45.67',
//       privateIp: '10.0.1.100'
//     },
//     {
//       id: 'i-abcdef1234567890',
//       name: 'db-server-01',
//       type: 't3.large',
//       region: 'us-east-1',
//       status: 'stopped',
//       launchTime: '2024-01-10 14:20:00',
//       publicIp: '-',
//       privateIp: '10.0.1.101'
//     },
//     {
//       id: 'i-567890abcdef1234',
//       name: 'api-server-01',
//       type: 't3.small',
//       region: 'us-west-2',
//       status: 'running',
//       launchTime: '2024-01-12 09:15:00',
//       publicIp: '35.123.45.68',
//       privateIp: '10.0.2.100'
//     }
//   ];

//   const getStatusColor = (status: string) => {
//     return status === 'running' ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
//   };

//   const filteredInstances = mockInstances.filter(instance =>
//     instance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     instance.type.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">EC2 Instances</h1>
//           <p className="text-muted-foreground">Manage your AWS EC2 instances</p>
//         </div>
//         <Button className="bg-primary hover:bg-primary/90">
//           <Plus className="w-4 h-4 mr-2" />
//           Launch Instance
//         </Button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card className="bg-gradient-card">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Total EC2 Instances</p>
//                 <p className="text-3xl font-bold text-foreground">12</p>
//               </div>
//               <div className="flex space-x-1">
//                 <div className="w-8 h-4 bg-blue-500 rounded-sm"></div>
//                 <div className="w-8 h-4 bg-blue-400 rounded-sm"></div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-card">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Active EC2 Instances</p>
//                 <p className="text-3xl font-bold text-foreground">3</p>
//               </div>
//               <div className="flex space-x-1">
//                 <div className="w-8 h-4 bg-green-500 rounded-sm"></div>
//                 <div className="w-8 h-4 bg-green-400 rounded-sm"></div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Your EC2 Instances */}
//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <Server className="w-5 h-5 text-primary" />
//               <CardTitle>Your EC2 Instances</CardTitle>
//             </div>
//             <div className="relative w-64">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//               <Input
//                 placeholder="Search instances..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </div>
//           <p className="text-sm text-muted-foreground">Manage your AWS EC2 instances</p>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {filteredInstances.map((instance) => (
//               <div key={instance.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition-colors">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                     <Server className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-foreground">{instance.name}</h3>
//                     <div className="flex items-center space-x-4 text-sm text-muted-foreground">
//                       <span>Type: {instance.type}</span>
//                       <span>Region: {instance.region}</span>
//                       <span>IP: {instance.publicIp}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <Badge className={getStatusColor(instance.status)}>
//                     {instance.status === 'running' ? (
//                       <Power className="w-3 h-3 mr-1" />
//                     ) : (
//                       <PowerOff className="w-3 h-3 mr-1" />
//                     )}
//                     {instance.status}
//                   </Badge>
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="sm">
//                         <MoreHorizontal className="w-4 h-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem>
//                         <Settings className="w-4 h-4 mr-2" />
//                         Manage
//                       </DropdownMenuItem>
//                       <DropdownMenuItem>
//                         {instance.status === 'running' ? 'Stop' : 'Start'} Instance
//                       </DropdownMenuItem>
//                       <DropdownMenuItem>Connect</DropdownMenuItem>
//                       <DropdownMenuItem>View Details</DropdownMenuItem>
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

// export default EC2ServicePage;











// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import { Input } from '../ui/input';
// import { 
//   Server, 
//   Plus, 
//   Search, 
//   MoreHorizontal,
//   Power,
//   PowerOff,
//   Settings
// } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '../ui/dropdown-menu';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from '../ui/dialog';

// const EC2ServicePage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     type: 't3.medium',
//     region: 'us-east-1',
//   });

//   const mockInstances = [
//     {
//       id: 'i-1234567890abcdef0',
//       name: 'web-server-01',
//       type: 't3.medium',
//       region: 'us-east-1',
//       status: 'running',
//       launchTime: '2024-01-15 10:30:00',
//       publicIp: '54.123.45.67',
//       privateIp: '10.0.1.100'
//     },
//     {
//       id: 'i-abcdef1234567890',
//       name: 'db-server-01',
//       type: 't3.large',
//       region: 'us-east-1',
//       status: 'stopped',
//       launchTime: '2024-01-10 14:20:00',
//       publicIp: '-',
//       privateIp: '10.0.1.101'
//     },
//     {
//       id: 'i-567890abcdef1234',
//       name: 'api-server-01',
//       type: 't3.small',
//       region: 'us-west-2',
//       status: 'running',
//       launchTime: '2024-01-12 09:15:00',
//       publicIp: '35.123.45.68',
//       privateIp: '10.0.2.100'
//     }
//   ];

//   const getStatusColor = (status: string) => {
//     return status === 'running' ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
//   };

//   const filteredInstances = mockInstances.filter(instance =>
//     instance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     instance.type.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     console.log('Launching EC2 instance:', formData);
//     setIsModalOpen(false);
//     setFormData({ name: '', type: 't3.medium', region: 'us-east-1' }); // Reset form
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">EC2 Instances</h1>
//           <p className="text-muted-foreground">Manage your AWS EC2 instances</p>
//         </div>
//         <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//           <DialogTrigger asChild>
//             <Button className="bg-primary hover:bg-primary/90">
//               <Plus className="w-4 h-4 mr-2" />
//               Launch Instance
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Launch New EC2 Instance</DialogTitle>
//             </DialogHeader>
//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="name" className="text-sm font-medium text-foreground">
//                   Instance Name
//                 </label>
//                 <Input
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="Enter instance name"
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="type" className="text-sm font-medium text-foreground">
//                   Instance Type
//                 </label>
//                 <select
//                   id="type"
//                   name="type"
//                   value={formData.type}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full rounded-md border border-border bg-background py-2 px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                 >
//                   <option value="t3.micro">t3.micro</option>
//                   <option value="t3.small">t3.small</option>
//                   <option value="t3.medium">t3.medium</option>
//                   <option value="t3.large">t3.large</option>
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="region" className="text-sm font-medium text-foreground">
//                   Region
//                 </label>
//                 <select
//                   id="region"
//                   name="region"
//                   value={formData.region}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full rounded-md border border-border bg-background py-2 px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                 >
//                   <option value="us-east-1">us-east-1</option>
//                   <option value="us-west-2">us-west-2</option>
//                   <option value="eu-west-1">eu-west-1</option>
//                 </select>
//               </div>
//             </div>
//             <DialogFooter>
//               <Button
//                 variant="outline"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button onClick={handleSubmit}>
//                 Submit
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card className="bg-gradient-card">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Total EC2 Instances</p>
//                 <p className="text-3xl font-bold text-foreground">12</p>
//               </div>
//               {/* <div className="flex space-x-1">
//                 <div className="w-8 h-4 bg-blue-500 rounded-sm"></div>
//                 <div className="w-8 h-4 bg-blue-400 rounded-sm"></div>
//               </div> */}
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-card">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Active EC2 Instances</p>
//                 <p className="text-3xl font-bold text-foreground">3</p>
//               </div>
//               {/* <div className="flex space-x-1">
//                 <div className="w-8 h-4 bg-green-500 rounded-sm"></div>
//                 <div className="w-8 h-4 bg-green-400 rounded-sm"></div>
//               </div> */}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Your EC2 Instances */}
//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <Server className="w-5 h-5 text-primary" />
//               <CardTitle>Your EC2 Instances</CardTitle>
//             </div>
//             <div className="relative w-64">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//               <Input
//                 placeholder="Search instances..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </div>
//           <p className="text-sm text-muted-foreground">Manage your AWS EC2 instances</p>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {filteredInstances.map((instance) => (
//               <div key={instance.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition-colors">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                     <Server className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-foreground">{instance.name}</h3>
//                     <div className="flex items-center space-x-4 text-sm text-muted-foreground">
//                       <span>Type: {instance.type}</span>
//                       <span>Region: {instance.region}</span>
//                       <span>IP: {instance.publicIp}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <Badge className={getStatusColor(instance.status)}>
//                     {instance.status === 'running' ? (
//                       <Power className="w-3 h-3 mr-1" />
//                     ) : (
//                       <PowerOff className="w-3 h-3 mr-1" />
//                     )}
//                     {instance.status}
//                   </Badge>
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="sm">
//                         <MoreHorizontal className="w-4 h-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem>
//                         <Settings className="w-4 h-4 mr-2" />
//                         Manage
//                       </DropdownMenuItem>
//                       <DropdownMenuItem>
//                         {instance.status === 'running' ? 'Stop' : 'Start'} Instance
//                       </DropdownMenuItem>
//                       <DropdownMenuItem>Connect</DropdownMenuItem>
//                       <DropdownMenuItem>View Details</DropdownMenuItem>
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

// export default EC2ServicePage;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import {
  Server,
  Plus,
  Search,
  MoreHorizontal,
  Power,
  PowerOff,
  Settings
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
 
const EC2ServicePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 't3.medium',
    region: 'us-east-1',
  });
 
  const mockInstances = [
    {
      id: 'i-1234567890abcdef0',
      name: 'web-server-01',
      type: 't3.medium',
      region: 'us-east-1',
      status: 'running',
      launchTime: '2024-01-15 10:30:00',
      publicIp: '54.123.45.67',
      privateIp: '10.0.1.100'
    },
    {
      id: 'i-abcdef1234567890',
      name: 'db-server-01',
      type: 't3.large',
      region: 'us-east-1',
      status: 'stopped',
      launchTime: '2024-01-10 14:20:00',
      publicIp: '-',
      privateIp: '10.0.1.101'
    },
    {
      id: 'i-567890abcdef1234',
      name: 'api-server-01',
      type: 't3.small',
      region: 'us-west-2',
      status: 'running',
      launchTime: '2024-01-12 09:15:00',
      publicIp: '35.123.45.68',
      privateIp: '10.0.2.100'
    }
  ];
 
  const getStatusColor = (status: string) => {
    return status === 'running' ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
  };
 
  const filteredInstances = mockInstances.filter(instance =>
    instance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instance.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = () => {
    console.log('Launching EC2 instance:', formData);
    setIsModalOpen(false);
    setFormData({ name: '', type: 't3.medium', region: 'us-east-1' }); // Reset form
  };
 
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">EC2 Instances</h1>
          <p className="text-muted-foreground">Manage your AWS EC2 instances</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Launch Instance
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Launch New EC2 Instance</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Instance Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter instance name"
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="type" className="text-sm font-medium text-foreground">
                  Instance Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-border bg-background py-2 px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="t3.micro">t3.micro</option>
                  <option value="t3.small">t3.small</option>
                  <option value="t3.medium">t3.medium</option>
                  <option value="t3.large">t3.large</option>
                </select>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total EC2 Instances</p>
                <p className="text-3xl font-bold text-foreground">12</p>
              </div>
              {/* <div className="flex space-x-1">
                <div className="w-8 h-4 bg-blue-500 rounded-sm"></div>
                <div className="w-8 h-4 bg-blue-400 rounded-sm"></div>
              </div> */}
            </div>
          </CardContent>
        </Card>
 
        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active EC2 Instances</p>
                <p className="text-3xl font-bold text-foreground">3</p>
              </div>
              {/* <div className="flex space-x-1">
                <div className="w-8 h-4 bg-green-500 rounded-sm"></div>
                <div className="w-8 h-4 bg-green-400 rounded-sm"></div>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </div>
 
      {/* Your EC2 Instances */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Server className="w-5 h-5 text-primary" />
              <CardTitle>Your EC2 Instances</CardTitle>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search instances..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Manage your AWS EC2 instances</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInstances.map((instance) => (
              <div key={instance.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Server className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{instance.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Type: {instance.type}</span>
                      <span>Region: {instance.region}</span>
                      <span>IP: {instance.publicIp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(instance.status)}>
                    {instance.status === 'running' ? (
                      <Power className="w-3 h-3 mr-1" />
                    ) : (
                      <PowerOff className="w-3 h-3 mr-1" />
                    )}
                    {instance.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Settings className="w-4 h-4 mr-2" />
                        Manage
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {instance.status === 'running' ? 'Stop' : 'Start'} Instance
                      </DropdownMenuItem>
                      <DropdownMenuItem>Connect</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
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
 
export default EC2ServicePage;
 