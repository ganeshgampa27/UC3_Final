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
//   Upload,
//   Loader2,
//   X
// } from 'lucide-react';
 
// const S3ServicePage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [buckets, setBuckets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [creating, setCreating] = useState(false);
//   const [error, setError] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     region: 'us-east-1',
//     versioning: 'Disabled',
//   });
 
//   // API endpoints
//   const API_BASE = 'https://gjo6zkvzob.execute-api.ap-south-1.amazonaws.com';
//   const CREATE_API_BASE = 'https://q9rsioedc1.execute-api.ap-south-1.amazonaws.com';
 
//   // Fetch buckets from API
//   const fetchBuckets = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(`${API_BASE}/buckets`);
     
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
     
//       const data = await response.json();
     
//       // Transform API data to match component format
//       const transformedBuckets = data.buckets.map((bucket, index) => ({
//         id: `bucket-${index}`,
//         name: bucket.name,
//         region: bucket.region,
//         created: new Date(bucket.creationDate).toLocaleDateString(),
//         objects: Math.floor(Math.random() * 10000), // Placeholder since not in API
//         size: generateRandomSize(), // Placeholder since not in API
//         versioning: Math.random() > 0.5 ? 'Enabled' : 'Disabled' // Placeholder
//       }));
     
//       setBuckets(transformedBuckets);
//     } catch (err) {
//       console.error('Error fetching buckets:', err);
//       setError(`Failed to fetch buckets: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   // Generate random size for display (placeholder)
//   const generateRandomSize = () => {
//     const sizes = ['156 MB', '2.3 GB', '4.7 GB', '892 MB', '1.2 GB', '345 MB'];
//     return sizes[Math.floor(Math.random() * sizes.length)];
//   };
 
//   // Create new bucket
//   const createBucket = async (bucketData) => {
//     try {
//       setCreating(true);
//       const response = await fetch(`${CREATE_API_BASE}/S3CreateBucket`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           bucketName: bucketData.name,
//           region: bucketData.region,
//           versioning: bucketData.versioning
//         }),
//       });
 
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
 
//       const result = await response.json();
//       console.log('Bucket created successfully:', result);
     
//       // Refresh buckets list after creation
//       await fetchBuckets();
     
//       return result;
//     } catch (err) {
//       console.error('Error creating bucket:', err);
//       throw err;
//     } finally {
//       setCreating(false);
//     }
//   };
 
//   // Load buckets on component mount
//   useEffect(() => {
//     fetchBuckets();
//   }, []);
 
//   const filteredBuckets = buckets.filter(bucket =>
//     bucket.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
 
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
 
//   const handleSubmit = async () => {
//     if (!formData.name.trim()) {
//       alert('Please enter a bucket name');
//       return;
//     }
 
//     try {
//       await createBucket(formData);
//       setIsModalOpen(false);
//       setFormData({ name: '', region: 'us-east-1', versioning: 'Disabled' });
//       alert('Bucket created successfully!');
//     } catch (err) {
//       alert(`Failed to create bucket: ${err.message}`);
//     }
//   };
 
//   // Calculate stats from real data
//   const totalBuckets = buckets.length;
//   const totalObjects = buckets.reduce((sum, bucket) => sum + bucket.objects, 0);
//   const formatObjectCount = (count) => {
//     if (count >= 1000) {
//       return `${(count / 1000).toFixed(1)}K`;
//     }
//     return count.toString();
//   };
 
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="flex items-center gap-2 text-gray-600">
//           <Loader2 className="w-6 h-6 animate-spin" />
//           <span>Loading S3 buckets...</span>
//         </div>
//       </div>
//     );
//   }
 
//   if (error) {
//     return (
//       <div className="space-y-6 p-6">
//         <div className="text-center py-8">
//           <div className="text-red-500 mb-4 text-lg font-semibold">⚠️ Error Loading Buckets</div>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={fetchBuckets}
//             className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             <Database className="w-4 h-4 mr-2" />
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }
 
//   return (
//     <div className="space-y-6 p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">S3 Buckets</h1>
//           <p className="text-gray-600">Manage your AWS S3 storage buckets</p>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={fetchBuckets}
//             className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             <Database className="w-4 h-4 mr-2" />
//             Refresh
//           </button>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             Create Bucket
//           </button>
//         </div>
//       </div>
 
//       {/* Create Bucket Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
//           <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-medium text-gray-900">Create New S3 Bucket</h3>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="text-gray-400 hover:text-gray-600 focus:outline-none"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//             <div className="px-6 py-4 space-y-4">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                   Bucket Name
//                 </label>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="Enter bucket name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
//                   Region
//                 </label>
//                 <select
//                   id="region"
//                   name="region"
//                   value={formData.region}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="us-east-1">us-east-1</option>
//                   <option value="us-west-2">us-west-2</option>
//                   <option value="eu-west-1">eu-west-1</option>
//                   <option value="ap-south-1">ap-south-1</option>
//                   <option value="eu-north-1">eu-north-1</option>
//                   <option value="eu-central-1">eu-central-1</option>
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="versioning" className="block text-sm font-medium text-gray-700 mb-1">
//                   Versioning
//                 </label>
//                 <select
//                   id="versioning"
//                   name="versioning"
//                   value={formData.versioning}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="Enabled">Enabled</option>
//                   <option value="Disabled">Disabled</option>
//                 </select>
//               </div>
//             </div>
//             <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 disabled={creating}
//                 className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 disabled={creating}
//                 className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//               >
//                 {creating ? (
//                   <>
//                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                     Creating...
//                   </>
//                 ) : (
//                   'Create Bucket'
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
 
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Buckets</p>
//               <p className="text-3xl font-bold text-gray-900">{totalBuckets}</p>
//             </div>
//             <Database className="w-8 h-8 text-blue-500" />
//           </div>
//         </div>
 
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Objects</p>
//               <p className="text-3xl font-bold text-gray-900">{formatObjectCount(totalObjects)}</p>
//             </div>
//             <FolderOpen className="w-8 h-8 text-green-500" />
//           </div>
//         </div>
 
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Regions</p>
//               <p className="text-3xl font-bold text-gray-900">
//                 {new Set(buckets.map(b => b.region)).size}
//               </p>
//             </div>
//             <Database className="w-8 h-8 text-purple-500" />
//           </div>
//         </div>
//       </div>
 
//       {/* Your S3 Buckets */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <Database className="w-5 h-5 text-blue-600" />
//               <h3 className="text-lg font-medium text-gray-900">Your S3 Buckets ({filteredBuckets.length})</h3>
//             </div>
//             <div className="relative w-64">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-4 w-4 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search buckets..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//           </div>
//           <p className="mt-1 text-sm text-gray-600">Manage your AWS S3 storage buckets</p>
//         </div>
//         <div className="p-6">
//           {filteredBuckets.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               {searchTerm ? 'No buckets match your search.' : 'No buckets found.'}
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {filteredBuckets.map((bucket) => (
//                 <div key={bucket.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                       <Database className="w-5 h-5 text-blue-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">{bucket.name}</h3>
//                       <div className="flex items-center space-x-4 text-sm text-gray-500">
//                         <span>Region: {bucket.region}</span>
//                         <span>Objects: {bucket.objects.toLocaleString()}</span>
//                         <span>Size: {bucket.size}</span>
//                         <span>Created: {bucket.created}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       bucket.versioning === 'Enabled'
//                         ? 'bg-green-100 text-green-800'
//                         : 'bg-gray-100 text-gray-800'
//                     }`}>
//                       {bucket.versioning}
//                     </span>
//                     <div className="relative">
//                       <button
//                         onClick={() => setShowDropdown(showDropdown === bucket.id ? null : bucket.id)}
//                         className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
//                       >
//                         <MoreHorizontal className="w-4 h-4" />
//                       </button>
//                       {showDropdown === bucket.id && (
//                         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
//                           <div className="py-1">
//                             <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                               <FolderOpen className="w-4 h-4 mr-2" />
//                               Open Bucket
//                             </button>
//                             <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                               <Upload className="w-4 h-4 mr-2" />
//                               Upload Files
//                             </button>
//                             <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                               <Download className="w-4 h-4 mr-2" />
//                               Download
//                             </button>
//                             <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                               Properties
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default S3ServicePage;














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
//   Upload,
//   Loader2,
//   X
// } from 'lucide-react';
 
// const S3ServicePage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [buckets, setBuckets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [creating, setCreating] = useState(false);
//   const [error, setError] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     region: 'us-east-1',
//     versioning: 'Disabled',
//   });
 
//   // API endpoints
//   const API_BASE = 'https://gjo6zkvzob.execute-api.ap-south-1.amazonaws.com';
//   const CREATE_API_BASE = 'https://q9rsioedc1.execute-api.ap-south-1.amazonaws.com';
 
//   // Fetch buckets from API
//   const fetchBuckets = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(`${API_BASE}/buckets`);
     
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
     
//       const data = await response.json();
     
//       // Transform API data to match component format
//       const transformedBuckets = data.buckets.map((bucket, index) => ({
//         id: `bucket-${index}`,
//         name: bucket.name,
//         region: bucket.region,
//         created: new Date(bucket.creationDate).toLocaleDateString(),
//         objects: Math.floor(Math.random() * 10000), // Placeholder since not in API
//         size: generateRandomSize(), // Placeholder since not in API
//         versioning: Math.random() > 0.5 ? 'Enabled' : 'Disabled' // Placeholder
//       }));
     
//       setBuckets(transformedBuckets);
//     } catch (err) {
//       console.error('Error fetching buckets:', err);
//       setError(`Failed to fetch buckets: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   // Generate random size for display (placeholder)
//   const generateRandomSize = () => {
//     const sizes = ['156 MB', '2.3 GB', '4.7 GB', '892 MB', '1.2 GB', '345 MB'];
//     return sizes[Math.floor(Math.random() * sizes.length)];
//   };
 
//   // Create new bucket
//   const createBucket = async (bucketData) => {
//     try {
//       setCreating(true);
      
//       // Only send the fields that the Lambda function expects
//       const requestBody = {
//         bucketName: bucketData.name,
//         region: bucketData.region
//         // Note: versioning is not sent to the API as it's not handled by the Lambda
//       };
      
//       console.log('Sending request:', requestBody); // Debug log
      
//       const response = await fetch(`${CREATE_API_BASE}/S3CreateBucket`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestBody),
//       });
 
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.log('Error response:', errorText); // Debug log
//         throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
//       }
 
//       const result = await response.json();
//       console.log('Bucket created successfully:', result);
     
//       // Refresh buckets list after creation
//       await fetchBuckets();
     
//       return result;
//     } catch (err) {
//       console.error('Error creating bucket:', err);
//       throw err;
//     } finally {
//       setCreating(false);
//     }
//   };
 
//   // Load buckets on component mount
//   useEffect(() => {
//     fetchBuckets();
//   }, []);
 
//   const filteredBuckets = buckets.filter(bucket =>
//     bucket.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
 
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
 
//   const handleSubmit = async () => {
//     if (!formData.name.trim()) {
//       alert('Please enter a bucket name');
//       return;
//     }

//     // Validate bucket name format
//     const bucketNameRegex = /^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/;
//     if (!bucketNameRegex.test(formData.name)) {
//       alert('Invalid bucket name format. Bucket name must be 3-63 characters long, contain only lowercase letters, numbers, dots, and hyphens, and start and end with a lowercase letter or number.');
//       return;
//     }
 
//     try {
//       await createBucket(formData);
//       setIsModalOpen(false);
//       setFormData({ name: '', region: 'us-east-1', versioning: 'Disabled' });
//       alert('Bucket created successfully!');
//     } catch (err) {
//       alert(`Failed to create bucket: ${err.message}`);
//     }
//   };
 
//   // Calculate stats from real data
//   const totalBuckets = buckets.length;
//   const totalObjects = buckets.reduce((sum, bucket) => sum + bucket.objects, 0);
//   const formatObjectCount = (count) => {
//     if (count >= 1000) {
//       return `${(count / 1000).toFixed(1)}K`;
//     }
//     return count.toString();
//   };
 
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="flex items-center gap-2 text-gray-600">
//           <Loader2 className="w-6 h-6 animate-spin" />
//           <span>Loading S3 buckets...</span>
//         </div>
//       </div>
//     );
//   }
 
//   if (error) {
//     return (
//       <div className="space-y-6 p-6">
//         <div className="text-center py-8">
//           <div className="text-red-500 mb-4 text-lg font-semibold">⚠️ Error Loading Buckets</div>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={fetchBuckets}
//             className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             <Database className="w-4 h-4 mr-2" />
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }
 
//   return (
//     <div className="space-y-6 p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">S3 Buckets</h1>
//           <p className="text-gray-600">Manage your AWS S3 storage buckets</p>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={fetchBuckets}
//             className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             <Database className="w-4 h-4 mr-2" />
//             Refresh
//           </button>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             Create Bucket
//           </button>
//         </div>
//       </div>
 
//       {/* Create Bucket Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
//           <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-medium text-gray-900">Create New S3 Bucket</h3>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="text-gray-400 hover:text-gray-600 focus:outline-none"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//             <div className="px-6 py-4 space-y-4">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                   Bucket Name
//                 </label>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="Enter bucket name (lowercase, 3-63 chars)"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 <p className="mt-1 text-xs text-gray-500">
//                   Must be 3-63 characters, lowercase letters, numbers, dots, and hyphens only
//                 </p>
//               </div>
//               <div>
//                 <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
//                   Region
//                 </label>
//                 <select
//                   id="region"
//                   name="region"
//                   value={formData.region}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="us-east-1">US East (N. Virginia) </option>
//                   <option value="us-east-2">US East (Ohio) </option>
//                   <option value="us-west-1">US West (N. California) </option>
//                   <option value="us-west-2">US West (Oregon) </option>
//                   <option value="ap-south-1">Asia Pacific (Mumbai) </option>
//                   <option value="ap-northeast-1">Asia Pacific (Tokyo) </option>
//                   <option value="ap-southeast-1">Asia Pacific (Singapore) </option>
//                   <option value="ap-southeast-2">Asia Pacific (Sydney) </option>
//                   <option value="eu-west-1">Europe (Ireland) </option>
//                   <option value="eu-central-1">Europe (Frankfurt) </option>
//                   <option value="sa-east-1">South America (São Paulo) </option>
//                 </select>
//               </div>
//               <div>

//                 <p className="mt-1 text-xs text-gray-500">
//                   This setting is for display purposes only and won't affect the actual bucket creation
//                 </p>
//               </div>
//             </div>
//             <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 disabled={creating}
//                 className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 disabled={creating}
//                 className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//               >
//                 {creating ? (
//                   <>
//                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                     Creating...
//                   </>
//                 ) : (
//                   'Create Bucket'
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
 
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Buckets</p>
//               <p className="text-3xl font-bold text-gray-900">{totalBuckets}</p>
//             </div>
//             <Database className="w-8 h-8 text-blue-500" />
//           </div>
//         </div>
 
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Objects</p>
//               <p className="text-3xl font-bold text-gray-900">{formatObjectCount(totalObjects)}</p>
//             </div>
//             <FolderOpen className="w-8 h-8 text-green-500" />
//           </div>
//         </div>
 
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Regions</p>
//               <p className="text-3xl font-bold text-gray-900">
//                 {new Set(buckets.map(b => b.region)).size}
//               </p>
//             </div>
//             <Database className="w-8 h-8 text-purple-500" />
//           </div>
//         </div>
//       </div>
 
//       {/* Your S3 Buckets */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <Database className="w-5 h-5 text-blue-600" />
//               <h3 className="text-lg font-medium text-gray-900">Your S3 Buckets ({filteredBuckets.length})</h3>
//             </div>
//             <div className="relative w-64">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-4 w-4 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search buckets..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//           </div>
//           <p className="mt-1 text-sm text-gray-600">Manage your AWS S3 storage buckets</p>
//         </div>
//         <div className="p-6">
//           {filteredBuckets.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               {searchTerm ? 'No buckets match your search.' : 'No buckets found.'}
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {filteredBuckets.map((bucket) => (
//                 <div key={bucket.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                       <Database className="w-5 h-5 text-blue-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">{bucket.name}</h3>
//                       <div className="flex items-center space-x-4 text-sm text-gray-500">
//                         <span>Region: {bucket.region}</span>
//                         <span>Objects: {bucket.objects.toLocaleString()}</span>
//                         <span>Size: {bucket.size}</span>
//                         <span>Created: {bucket.created}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       bucket.versioning === 'Enabled'
//                         ? 'bg-green-100 text-green-800'
//                         : 'bg-gray-100 text-gray-800'
//                     }`}>
//                       {bucket.versioning}
//                     </span>
//                     <div className="relative">
//                       <button
//                         onClick={() => setShowDropdown(showDropdown === bucket.id ? null : bucket.id)}
//                         className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
//                       >
//                         <MoreHorizontal className="w-4 h-4" />
//                       </button>
//                       {showDropdown === bucket.id && (
//                         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
//                           <div className="py-1">
//                             <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                               <FolderOpen className="w-4 h-4 mr-2" />
//                               Open Bucket
//                             </button>
//                             <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                               <Upload className="w-4 h-4 mr-2" />
//                               Upload Files
//                             </button>
//                             <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                               <Download className="w-4 h-4 mr-2" />
//                               Download
//                             </button>
//                             <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                               Properties
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default S3ServicePage;




import React, { useState, useEffect } from 'react';
import {
  Database,
  Plus,
  Search,
  MoreHorizontal,
  FolderOpen,
  Download,
  Upload,
  Loader2,
  X
} from 'lucide-react';
 
const S3ServicePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buckets, setBuckets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    region: 'us-east-1',
    versioning: 'Disabled',
  });
 
  // API endpoints
  const API_BASE = 'https://gjo6zkvzob.execute-api.ap-south-1.amazonaws.com';
  const CREATE_API_BASE = 'https://q9rsioedc1.execute-api.ap-south-1.amazonaws.com';
 
  // Fetch buckets from API
  const fetchBuckets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE}/buckets`);
     
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
     
      const data = await response.json();
     
      // Transform API data to match component format
      const transformedBuckets = data.buckets.map((bucket, index) => ({
        id: `bucket-${index}`,
        name: bucket.name,
        region: bucket.region,
        created: new Date(bucket.creationDate).toLocaleDateString(),
        objects: Math.floor(Math.random() * 10000), // Placeholder since not in API
        size: generateRandomSize(), // Placeholder since not in API
        versioning: Math.random() > 0.5 ? 'Enabled' : 'Disabled' // Placeholder
      }));
     
      setBuckets(transformedBuckets);
    } catch (err) {
      console.error('Error fetching buckets:', err);
      setError(`Failed to fetch buckets: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
 
  // Generate random size for display (placeholder)
  const generateRandomSize = () => {
    const sizes = ['156 MB', '2.3 GB', '4.7 GB', '892 MB', '1.2 GB', '345 MB'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };
 
  // Create new bucket
  const createBucket = async (bucketData) => {
    try {
      setCreating(true);
      
      // Only send the fields that the Lambda function expects
      const requestBody = {
        bucketName: bucketData.name,
        region: bucketData.region
        // Note: versioning is not sent to the API as it's not handled by the Lambda
      };
      
      console.log('Sending request:', requestBody); // Debug log
      
      const response = await fetch(`${CREATE_API_BASE}/S3CreateBucket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
 
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText); // Debug log
        throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
      }
 
      const result = await response.json();
      console.log('Bucket created successfully:', result);
     
      // Refresh buckets list after creation
      await fetchBuckets();
     
      return result;
    } catch (err) {
      console.error('Error creating bucket:', err);
      throw err;
    } finally {
      setCreating(false);
    }
  };
 
  // Load buckets on component mount
  useEffect(() => {
    fetchBuckets();
  }, []);
 
  const filteredBuckets = buckets.filter(bucket =>
    bucket.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert('Please enter a bucket name');
      return;
    }

    // Validate bucket name format
    const bucketNameRegex = /^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/;
    if (!bucketNameRegex.test(formData.name)) {
      alert('Invalid bucket name format. Bucket name must be 3-63 characters long, contain only lowercase letters, numbers, dots, and hyphens, and start and end with a lowercase letter or number.');
      return;
    }
 
    try {
      await createBucket(formData);
      setIsModalOpen(false);
      setFormData({ name: '', region: 'us-east-1', versioning: 'Disabled' });
      alert('Bucket created successfully!');
    } catch (err) {
      alert(`Failed to create bucket: ${err.message}`);
    }
  };
 
  // Calculate stats from real data
  const totalBuckets = buckets.length;
  const totalObjects = buckets.reduce((sum, bucket) => sum + bucket.objects, 0);
  const formatObjectCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };
 
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading S3 buckets...</span>
        </div>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="space-y-6 p-6">
        <div className="text-center py-8">
          <div className="text-red-500 mb-4 text-lg font-semibold">⚠️ Error Loading Buckets</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchBuckets}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Database className="w-4 h-4 mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }
 
  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">S3 Buckets</h1>
          <p className="text-gray-600">Manage your AWS S3 storage buckets</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchBuckets}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Database className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Bucket
          </button>
        </div>
      </div>
 
      {/* Create Bucket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Create New S3 Bucket</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Bucket Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter bucket name (lowercase, 3-63 chars)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Must be 3-63 characters, lowercase letters, numbers, dots, and hyphens only
                </p>
              </div>
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                  Region
                </label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                 <option value="us-east-1">US East (N. Virginia) </option>
                  <option value="us-east-2">US East (Ohio) </option>
                  <option value="us-west-1">US West (N. California) </option>
                   <option value="us-west-2">US West (Oregon) </option>
                  <option value="ap-south-1">Asia Pacific (Mumbai) </option>
                   <option value="ap-northeast-1">Asia Pacific (Tokyo) </option>
                   <option value="ap-southeast-1">Asia Pacific (Singapore) </option>
                   <option value="ap-southeast-2">Asia Pacific (Sydney) </option>
                   <option value="eu-west-1">Europe (Ireland) </option>
                   <option value="eu-central-1">Europe (Frankfurt) </option>
                   <option value="sa-east-1">South America (São Paulo) </option>
                </select>
              </div>
              <div>
                <p className="mt-1 text-xs text-gray-500">
                  This setting is for display purposes only and won't affect the actual bucket creation
                </p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={creating}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={creating}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {creating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Bucket'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
 
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Buckets</p>
              <p className="text-3xl font-bold text-gray-900">{totalBuckets}</p>
            </div>
            <Database className="w-8 h-8 text-blue-500" />
          </div>
        </div>
 
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Objects</p>
              <p className="text-3xl font-bold text-gray-900">{formatObjectCount(totalObjects)}</p>
            </div>
            <FolderOpen className="w-8 h-8 text-green-500" />
          </div>
        </div>
 
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Regions</p>
              <p className="text-3xl font-bold text-gray-900">
                {new Set(buckets.map(b => b.region)).size}
              </p>
            </div>
            <Database className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>
 
      {/* Your S3 Buckets */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900">Your S3 Buckets ({filteredBuckets.length})</h3>
            </div>
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search buckets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-600">Manage your AWS S3 storage buckets</p>
        </div>
        <div className="p-6">
          {filteredBuckets.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'No buckets match your search.' : 'No buckets found.'}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBuckets.map((bucket) => (
                <div key={bucket.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Database className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{bucket.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Region: {bucket.region}</span>
                        <span>Objects: {bucket.objects.toLocaleString()}</span>
                        <span>Size: {bucket.size}</span>
                        <span>Created: {bucket.created}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      bucket.versioning === 'Enabled'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {bucket.versioning}
                    </span>
                    <div className="relative">
                      <button
                        onClick={() => setShowDropdown(showDropdown === bucket.id ? null : bucket.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      {showDropdown === bucket.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                          <div className="py-1">
                            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <FolderOpen className="w-4 h-4 mr-2" />
                              Open Bucket
                            </button>
                            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Files
                            </button>
                            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </button>
                            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Properties
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default S3ServicePage;