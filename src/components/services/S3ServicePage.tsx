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
//   FolderOpen,
//   Download,
//   Upload
// } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '../ui/dropdown-menu';

// const S3ServicePage = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const mockBuckets = [
//     {
//       id: 'bucket-1',
//       name: 'my-app-assets',
//       region: 'us-east-1',
//       objects: 1245,
//       size: '2.3 GB',
//       created: '2024-01-15',
//       versioning: 'Enabled'
//     },
//     {
//       id: 'bucket-2',
//       name: 'backup-storage',
//       region: 'us-west-2',
//       objects: 89,
//       size: '156 MB',
//       created: '2024-01-10',
//       versioning: 'Disabled'
//     },
//     {
//       id: 'bucket-3',
//       name: 'logs-archive',
//       region: 'us-east-1',
//       objects: 5678,
//       size: '4.7 GB',
//       created: '2024-01-05',
//       versioning: 'Enabled'
//     }
//   ];

//   const filteredBuckets = mockBuckets.filter(bucket =>
//     bucket.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">S3 Buckets</h1>
//           <p className="text-muted-foreground">Manage your AWS S3 storage buckets</p>
//         </div>
//         <Button className="bg-primary hover:bg-primary/90">
//           <Plus className="w-4 h-4 mr-2" />
//           Create Bucket
//         </Button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card className="bg-gradient-card">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Total Buckets</p>
//                 <p className="text-3xl font-bold text-foreground">8</p>
//               </div>
//               <Database className="w-8 h-8 text-blue-500" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-card">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Total Objects</p>
//                 <p className="text-3xl font-bold text-foreground">7.2K</p>
//               </div>
//               <FolderOpen className="w-8 h-8 text-green-500" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-card">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Total Storage</p>
//                 <p className="text-3xl font-bold text-foreground">7.2 GB</p>
//               </div>
//               <Database className="w-8 h-8 text-purple-500" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Your S3 Buckets */}
//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <Database className="w-5 h-5 text-primary" />
//               <CardTitle>Your S3 Buckets</CardTitle>
//             </div>
//             <div className="relative w-64">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//               <Input
//                 placeholder="Search buckets..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </div>
//           <p className="text-sm text-muted-foreground">Manage your AWS S3 storage buckets</p>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {filteredBuckets.map((bucket) => (
//               <div key={bucket.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition-colors">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                     <Database className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-foreground">{bucket.name}</h3>
//                     <div className="flex items-center space-x-4 text-sm text-muted-foreground">
//                       <span>Region: {bucket.region}</span>
//                       <span>Objects: {bucket.objects.toLocaleString()}</span>
//                       <span>Size: {bucket.size}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <Badge variant={bucket.versioning === 'Enabled' ? 'default' : 'secondary'}>
//                     {bucket.versioning}
//                   </Badge>
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="sm">
//                         <MoreHorizontal className="w-4 h-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem>
//                         <FolderOpen className="w-4 h-4 mr-2" />
//                         Open Bucket
//                       </DropdownMenuItem>
//                       <DropdownMenuItem>
//                         <Upload className="w-4 h-4 mr-2" />
//                         Upload Files
//                       </DropdownMenuItem>
//                       <DropdownMenuItem>
//                         <Download className="w-4 h-4 mr-2" />
//                         Download
//                       </DropdownMenuItem>
//                       <DropdownMenuItem>Properties</DropdownMenuItem>
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

// export default S3ServicePage;














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
  FolderOpen,
  Download,
  Upload
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

const S3ServicePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    region: 'us-east-1',
    versioning: 'Disabled',
  });

  const mockBuckets = [
    {
      id: 'bucket-1',
      name: 'my-app-assets',
      region: 'us-east-1',
      objects: 1245,
      size: '2.3 GB',
      created: '2024-01-15',
      versioning: 'Enabled'
    },
    {
      id: 'bucket-2',
      name: 'backup-storage',
      region: 'us-west-2',
      objects: 89,
      size: '156 MB',
      created: '2024-01-10',
      versioning: 'Disabled'
    },
    {
      id: 'bucket-3',
      name: 'logs-archive',
      region: 'us-east-1',
      objects: 5678,
      size: '4.7 GB',
      created: '2024-01-05',
      versioning: 'Enabled'
    }
  ];

  const filteredBuckets = mockBuckets.filter(bucket =>
    bucket.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Creating S3 bucket:', formData);
    setIsModalOpen(false);
    setFormData({ name: '', region: 'us-east-1', versioning: 'Disabled' }); // Reset form
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">S3 Buckets</h1>
          <p className="text-muted-foreground">Manage your AWS S3 storage buckets</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Bucket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New S3 Bucket</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Bucket Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter bucket name"
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
              <div>
                <label htmlFor="versioning" className="text-sm font-medium text-foreground">
                  Versioning
                </label>
                <select
                  id="versioning"
                  name="versioning"
                  value={formData.versioning}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-border bg-background py-2 px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Enabled">Enabled</option>
                  <option value="Disabled">Disabled</option>
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
                <p className="text-sm font-medium text-muted-foreground">Total Buckets</p>
                <p className="text-3xl font-bold text-foreground">8</p>
              </div>
              <Database className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Objects</p>
                <p className="text-3xl font-bold text-foreground">7.2K</p>
              </div>
              <FolderOpen className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Storage</p>
                <p className="text-3xl font-bold text-foreground">7.2 GB</p>
              </div>
              <Database className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Your S3 Buckets */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-primary" />
              <CardTitle>Your S3 Buckets</CardTitle>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search buckets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Manage your AWS S3 storage buckets</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBuckets.map((bucket) => (
              <div key={bucket.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{bucket.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Region: {bucket.region}</span>
                      <span>Objects: {bucket.objects.toLocaleString()}</span>
                      <span>Size: {bucket.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={bucket.versioning === 'Enabled' ? 'default' : 'secondary'}>
                    {bucket.versioning}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <FolderOpen className="w-4 h-4 mr-2" />
                        Open Bucket
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Files
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>Properties</DropdownMenuItem>
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

export default S3ServicePage;