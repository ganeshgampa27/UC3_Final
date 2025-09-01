// import React, { useState, useEffect } from 'react';
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
 


// import React, { useState, useEffect } from 'react';
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



import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Database,
  Plus,
  Search,
  MoreHorizontal,
  FolderOpen,
  Settings,
  Upload,
  Download,
  Loader2,
  X,
  Users,
  BarChart3,
  FileText,
  Activity,
  RefreshCw,
  AlertCircle
} from "lucide-react";

const GenericServicePage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'standard',
    status: 'active'
  });

  // Service configuration based on serviceId
  const getServiceConfig = (id: string) => {
    const configs: { [key: string]: any } = {
      'analytics': {
        title: 'Analytics Dashboard',
        description: 'Monitor and analyze your data insights',
        icon: BarChart3,
        iconColor: 'text-blue-600',
        bgColor: 'bg-blue-100',
        itemName: 'Report',
        itemNamePlural: 'Reports',
        mockItems: [
          { id: 1, name: 'Monthly Sales Report', type: 'Sales Analytics', status: 'Active', created: '2024-01-15', items: 1250 },
          { id: 2, name: 'User Engagement Analysis', type: 'User Analytics', status: 'Active', created: '2024-01-10', items: 890 },
          { id: 3, name: 'Revenue Trends', type: 'Financial Analytics', status: 'Processing', created: '2024-01-08', items: 2340 }
        ]
      },
      'users': {
        title: 'User Management',
        description: 'Manage user accounts and permissions',
        icon: Users,
        iconColor: 'text-green-600',
        bgColor: 'bg-green-100',
        itemName: 'User',
        itemNamePlural: 'Users',
        mockItems: [
          { id: 1, name: 'John Smith', type: 'Administrator', status: 'Active', created: '2024-01-20', items: 45 },
          { id: 2, name: 'Sarah Johnson', type: 'Editor', status: 'Active', created: '2024-01-18', items: 23 },
          { id: 3, name: 'Mike Davis', type: 'Viewer', status: 'Inactive', created: '2024-01-15', items: 12 }
        ]
      },
      'reports': {
        title: 'Reports Center',
        description: 'Generate and manage your reports',
        icon: FileText,
        iconColor: 'text-purple-600',
        bgColor: 'bg-purple-100',
        itemName: 'Report',
        itemNamePlural: 'Reports',
        mockItems: [
          { id: 1, name: 'Q1 Performance Report', type: 'Quarterly', status: 'Completed', created: '2024-01-25', items: 156 },
          { id: 2, name: 'Weekly Analytics Summary', type: 'Weekly', status: 'Generating', created: '2024-01-22', items: 89 },
          { id: 3, name: 'Customer Feedback Report', type: 'Custom', status: 'Draft', created: '2024-01-20', items: 234 }
        ]
      },
      'default': {
        title: 'Service Dashboard',
        description: 'Manage your service resources',
        icon: Database,
        iconColor: 'text-gray-600',
        bgColor: 'bg-gray-100',
        itemName: 'Item',
        itemNamePlural: 'Items',
        mockItems: [
          { id: 1, name: 'Sample Resource 1', type: 'Standard', status: 'Active', created: '2024-01-20', items: 45 },
          { id: 2, name: 'Sample Resource 2', type: 'Premium', status: 'Active', created: '2024-01-18', items: 23 },
          { id: 3, name: 'Sample Resource 3', type: 'Basic', status: 'Inactive', created: '2024-01-15', items: 12 }
        ]
      }
    };
    return configs[id?.toLowerCase() || ''] || configs['default'];
  };

  const config = getServiceConfig(serviceId || '');
  const IconComponent = config.icon;

  // Simulate API calls
  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setItems(config.mockItems);
    } catch (err) {
      setError('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (itemData: any) => {
    try {
      setCreating(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newItem = {
        id: Date.now(),
        name: itemData.name,
        type: itemData.type,
        status: itemData.status,
        created: new Date().toLocaleDateString(),
        items: Math.floor(Math.random() * 100)
      };
      
      setItems(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      throw new Error('Failed to create item');
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [serviceId]);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert(`Please enter a ${config.itemName.toLowerCase()} name`);
      return;
    }

    try {
      await createItem(formData);
      setIsModalOpen(false);
      setFormData({ name: '', description: '', type: 'standard', status: 'active' });
      alert(`${config.itemName} created successfully!`);
    } catch (err: any) {
      alert(`Failed to create ${config.itemName.toLowerCase()}: ${err.message}`);
    }
  };

  // Calculate stats
  const totalItems = items.length;
  const activeItems = items.filter(item => item.status.toLowerCase() === 'active').length;
  const totalSubItems = items.reduce((sum, item) => sum + (item.items || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading {config.title.toLowerCase()}...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 p-6">
        <div className="text-center py-8">
          <div className="text-red-500 mb-4 text-lg font-semibold">
            <AlertCircle className="w-6 h-6 inline mr-2" />
            Error Loading Data
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchItems}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
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
          <h1 className="text-3xl font-bold text-gray-900">{config.title}</h1>
          <p className="text-gray-600">{config.description}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchItems}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create {config.itemName}
          </button>
        </div>
      </div>

      {/* Create Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Create New {config.itemName}</h3>
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
                  {config.itemName} Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={`Enter ${config.itemName.toLowerCase()} name`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter description (optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="basic">Basic</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                  <option value="pending">Pending</option>
                </select>
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
                  `Create ${config.itemName}`
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
              <p className="text-sm font-medium text-gray-600">Total {config.itemNamePlural}</p>
              <p className="text-3xl font-bold text-gray-900">{totalItems}</p>
            </div>
            <IconComponent className={`w-8 h-8 ${config.iconColor}`} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Items</p>
              <p className="text-3xl font-bold text-gray-900">{activeItems}</p>
            </div>
            <Activity className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Records</p>
              <p className="text-3xl font-bold text-gray-900">{totalSubItems.toLocaleString()}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
              <h3 className="text-lg font-medium text-gray-900">
                Your {config.itemNamePlural} ({filteredItems.length})
              </h3>
            </div>
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={`Search ${config.itemNamePlural.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-600">{config.description}</p>
        </div>
        <div className="p-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8">
              <IconComponent className={`w-12 h-12 ${config.iconColor} mx-auto mb-4 opacity-50`} />
              <div className="text-gray-500 mb-2">
                {searchTerm ? `No ${config.itemNamePlural.toLowerCase()} match your search.` : `No ${config.itemNamePlural.toLowerCase()} found.`}
              </div>
              {!searchTerm && (
                <p className="text-sm text-gray-400 mb-4">
                  Get started by creating your first {config.itemName.toLowerCase()}
                </p>
              )}
              {!searchTerm && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create {config.itemName}
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 ${config.bgColor} rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Type: {item.type}</span>
                        <span>Records: {item.items?.toLocaleString()}</span>
                        <span>Created: {item.created}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status.toLowerCase() === 'active'
                        ? 'bg-green-100 text-green-800'
                        : item.status.toLowerCase() === 'processing' || item.status.toLowerCase() === 'generating'
                        ? 'bg-yellow-100 text-yellow-800'
                        : item.status.toLowerCase() === 'completed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                    <div className="relative">
                      <button
                        onClick={() => setShowDropdown(showDropdown === item.id.toString() ? null : item.id.toString())}
                        className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      {showDropdown === item.id.toString() && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                          <div className="py-1">
                            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <FolderOpen className="w-4 h-4 mr-2" />
                              Open {config.itemName}
                            </button>
                            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <Settings className="w-4 h-4 mr-2" />
                              Settings
                            </button>
                            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <Download className="w-4 h-4 mr-2" />
                              Export
                            </button>
                            <div className="border-t border-gray-100"></div>
                            <button className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50">
                              Delete
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

export default GenericServicePage;