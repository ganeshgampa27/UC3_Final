// import React, { useState } from "react";
// import { Button } from "./ui/button";
// import { Card } from "./ui/card";
// import { Badge } from "./ui/badge";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import {
//   Users,
//   UserPlus,
//   Search,
//   Filter,
//   MoreHorizontal,
//   Mail,
//   Phone,
//   Calendar,
//   Edit3,
//   Trash2,
//   Settings,
//   Shield,
//   CheckCircle,
//   Clock,
//   AlertCircle,
//   TrendingUp,
//   BarChart3,
//   Award,
//   Target,
//   X,
//   Trash,
// } from "lucide-react";

// // Interfaces
// interface User {
//   id: string;
//   name: string;
//   username: string;
//   permissions: string[];
// }

// interface TeamMember {
//   id: string;
//   name: string;
//   email: string;
//   role: "employee" | "manager" | "admin";
//   department: "Engineering" | "Marketing" | "Finance" | "HR";
//   status: "active" | "inactive" | "pending";
//   joinDate: string;
//   lastActive: string;
//   requests: {
//     total: number;
//     approved: number;
//     pending: number;
//     rejected: number;
//   };
//   performance: {
//     approvalRate: number;
//     avgResponseTime: number;
//     productivity: number;
//   };
//   permissions: string[];
// }

// interface DepartmentStat {
//   name: "Engineering" | "Marketing" | "Finance" | "HR";
//   requests: number;
//   approvalRate: number;
//   productivity: number;
//   members: number;
// }

// interface TeamManagementPageProps {
//   currentUser: User;
//   selectedProvider: string;
// }

// const TeamManagementPage: React.FC<TeamManagementPageProps> = ({ currentUser, selectedProvider }) => {
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [filterDepartment, setFilterDepartment] = useState<string>("all");
//   const [filterStatus, setFilterStatus] = useState<string>("all");
//   const [activeTab, setActiveTab] = useState<"members" | "departments">("members");
//   const [showAddForm, setShowAddForm] = useState<boolean>(false);
//   const [newMember, setNewMember] = useState<{
//     name: string;
//     email: string;
//     role: "employee" | "manager" | "admin";
//     department: "Engineering" | "Marketing" | "Finance" | "HR";
//     status: "active" | "inactive" | "pending";
//   }>({
//     name: "",
//     email: "",
//     role: "employee",
//     department: "Engineering",
//     status: "active",
//   });
//   const [showEditForm, setShowEditForm] = useState<boolean>(false);
//   const [editMember, setEditMember] = useState<TeamMember | null>(null);

//   const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
//     {
//       id: "member-1",
//       name: "John Doe",
//       email: "john.doe@gmail.com",
//       role: "employee",
//       department: "Engineering",
//       status: "active",
//       joinDate: "2023-06-15",
//       lastActive: "2024-01-15T14:30:00Z",
//       requests: {
//         total: 23,
//         approved: 21,
//         pending: 1,
//         rejected: 1,
//       },
//       performance: {
//         approvalRate: 91,
//         avgResponseTime: 2.1,
//         productivity: 88,
//       },
//       permissions: ["create_requests", "view_resources"],
//     },
//     {
//       id: "member-2",
//       name: "Mike Johnson",
//       email: "mike.johnson@gmail.com",
//       role: "employee",
//       department: "Marketing",
//       status: "active",
//       joinDate: "2023-08-20",
//       lastActive: "2024-01-14T16:45:00Z",
//       requests: {
//         total: 18,
//         approved: 16,
//         pending: 2,
//         rejected: 0,
//       },
//       performance: {
//         approvalRate: 89,
//         avgResponseTime: 1.8,
//         productivity: 92,
//       },
//       permissions: ["create_requests", "view_resources"],
//     },
//     {
//       id: "member-3",
//       name: "Sarah Wilson",
//       email: "sarah.wilson@gmail.com",
//       role: "employee",
//       department: "Finance",
//       status: "inactive",
//       joinDate: "2023-04-10",
//       lastActive: "2024-01-10T11:20:00Z",
//       requests: {
//         total: 15,
//         approved: 14,
//         pending: 0,
//         rejected: 1,
//       },
//       performance: {
//         approvalRate: 93,
//         avgResponseTime: 2.5,
//         productivity: 75,
//       },
//       permissions: ["create_requests", "view_resources"],
//     },
//     {
//       id: "member-4",
//       name: "David Brown",
//       email: "david.brown@gmail.com",
//       role: "employee",
//       department: "HR",
//       status: "active",
//       joinDate: "2023-09-01",
//       lastActive: "2024-01-15T13:00:00Z",
//       requests: {
//         total: 12,
//         approved: 10,
//         pending: 1,
//         rejected: 1,
//       },
//       performance: {
//         approvalRate: 83,
//         avgResponseTime: 3.2,
//         productivity: 78,
//       },
//       permissions: ["create_requests", "view_resources"],
//     },
//   ]);

//   const [departmentStats, setDepartmentStats] = useState<DepartmentStat[]>(() => {
//     const initialStats: Omit<DepartmentStat, "members">[] = [
//       { name: "Engineering", requests: 23, approvalRate: 91, productivity: 88 },
//       { name: "Marketing", requests: 18, approvalRate: 89, productivity: 92 },
//       { name: "Finance", requests: 15, approvalRate: 93, productivity: 75 },
//       { name: "HR", requests: 12, approvalRate: 83, productivity: 78 },
//     ];
//     return initialStats.map((dept) => ({
//       ...dept,
//       members: teamMembers.filter((member) => member.department === dept.name).length,
//     }));
//   });

//   const getFilteredMembers = (): TeamMember[] => {
//     let filtered = teamMembers;

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (member) =>
//           member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           member.department.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (filterDepartment !== "all") {
//       filtered = filtered.filter((member) => member.department === filterDepartment);
//     }

//     if (filterStatus !== "all") {
//       filtered = filtered.filter((member) => member.status === filterStatus);
//     }

//     return filtered;
//   };

//   const filteredMembers = getFilteredMembers();

//   const getStatusBadge = (status: string) => {
//     const statusConfig: {
//       [key: string]: { color: string; label: string };
//     } = {
//       active: {
//         color: "text-cloud-emerald border-cloud-emerald",
//         label: "Active",
//       },
//       inactive: { color: "text-cloud-red border-cloud-red", label: "Inactive" },
//       pending: {
//         color: "text-cloud-orange border-cloud-orange",
//         label: "Pending",
//       },
//     };

//     const config = statusConfig[status] || statusConfig.pending;
//     return (
//       <Badge variant="outline" className={`text-xs ${config.color}`}>
//         {config.label}
//       </Badge>
//     );
//   };

//   const getPerformanceColor = (score: number): string => {
//     if (score >= 90) return "text-cloud-emerald";
//     if (score >= 80) return "text-cloud-blue";
//     if (score >= 70) return "text-cloud-orange";
//     return "text-cloud-red";
//   };

//   const handleAddMember = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const newId = `member-${Date.now()}`;
//     const today = new Date().toISOString().split("T")[0];
//     // Generate random data
//     const totalRequests = Math.floor(Math.random() * 30) + 5; // Random 5-35
//     const approvedRequests = Math.floor(Math.random() * totalRequests); // Random 0-total
//     const pendingRequests = Math.floor(Math.random() * (totalRequests - approvedRequests)); // Random 0-(total-approved)
//     const rejectedRequests = totalRequests - approvedRequests - pendingRequests; // Remaining
//     const approvalRate = totalRequests > 0 ? Math.round((approvedRequests / totalRequests) * 100) : 0; // Percentage
//     const avgResponseTime = Number((Math.random() * 4 + 1).toFixed(1)); // Random 1.0-5.0 hours
//     const productivity = Math.floor(Math.random() * 30) + 70; // Random 70-100
//     const newTeamMember: TeamMember = {
//       id: newId,
//       name: newMember.name,
//       email: newMember.email,
//       role: newMember.role,
//       department: newMember.department,
//       status: newMember.status,
//       joinDate: today,
//       lastActive: new Date().toISOString(),
//       requests: {
//         total: totalRequests,
//         approved: approvedRequests,
//         pending: pendingRequests,
//         rejected: rejectedRequests,
//       },
//       performance: {
//         approvalRate,
//         avgResponseTime,
//         productivity,
//       },
//       permissions: ["create_requests", "view_resources"],
//     };

//     setDepartmentStats(
//       departmentStats.map((dept) =>
//         dept.name === newMember.department
//           ? { ...dept, members: dept.members + 1 }
//           : dept
//       )
//     );
//     setTeamMembers([...teamMembers, newTeamMember]);
//     setNewMember({
//       name: "",
//       email: "",
//       role: "employee",
//       department: "Engineering",
//       status: "active",
//     });
//     setShowAddForm(false);
//   };

//   const handleEditMember = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!editMember) return;

//     const originalMember = teamMembers.find((member) => member.id === editMember.id);
//     if (originalMember && originalMember.department !== editMember.department) {
//       setDepartmentStats(
//         departmentStats.map((dept) => {
//           if (dept.name === originalMember.department) {
//             return { ...dept, members: Math.max(0, dept.members - 1) };
//           }
//           if (dept.name === editMember.department) {
//             return { ...dept, members: dept.members + 1 };
//           }
//           return dept;
//         })
//       );
//     }

//     setTeamMembers(
//       teamMembers.map((member) =>
//         member.id === editMember.id ? { ...editMember } : member
//       )
//     );
//     setEditMember(null);
//     setShowEditForm(false);
//   };

//   const handleEditClick = (member: TeamMember) => {
//     setEditMember({ ...member });
//     setShowEditForm(true);
//   };

//   const handleCancel = () => {
//     setNewMember({
//       name: "",
//       email: "",
//       role: "employee",
//       department: "Engineering",
//       status: "active",
//     });
//     setShowAddForm(false);
//   };

//   const handleDeleteMember = (memberId: string) => {
//     const memberToDelete = teamMembers.find((member) => member.id === memberId);
//     if (memberToDelete) {
//       setDepartmentStats(
//         departmentStats.map((dept) =>
//           dept.name === memberToDelete.department
//             ? { ...dept, members: Math.max(0, dept.members - 1) }
//             : dept
//         )
//       );
//     }
//     setTeamMembers(teamMembers.filter((member) => member.id !== memberId));
//   };

//   const renderMembers = () => (
//     <div className="space-y-2">
//       {filteredMembers.map((member) => (
//         <div
//           key={member.id}
//           className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
//         >
//           <div className="flex items-start justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-gradient-to-br from-cloud-purple to-cloud-blue rounded-full flex items-center justify-center text-white font-medium">
//                 {member.name
//                   .split(" ")
//                   .map((n) => n[0])
//                   .join("")}
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center space-x-3 mb-2">
//                   <h3 className="font-medium text-gray-900">{member.name}</h3>
//                   {getStatusBadge(member.status)}
//                 </div>
//                 <div className="flex items-center space-x-6 text-sm text-gray-500">
//                   <div className="flex items-center">
//                     <Mail className="w-4 h-4 mr-1" />
//                     <span>{member.email}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="font-medium">{member.department}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Calendar className="w-4 h-4 mr-1" />
//                     <span>
//                       Joined: {new Date(member.joinDate).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-6 text-sm text-gray-500 mt-2">
//                   <div className="flex items-center">
//                     <CheckCircle className="w-4 h-4 mr-1 text-cloud-emerald" />
//                     <span>
//                       {member.requests.approved}/{member.requests.total} approved
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     <TrendingUp className="w-4 h-4 mr-1" />
//                     <span
//                       className={getPerformanceColor(member.performance.approvalRate)}
//                     >
//                       {member.performance.approvalRate}% success rate
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     <Award className="w-4 h-4 mr-1" />
//                     <span
//                       className={getPerformanceColor(member.performance.productivity)}
//                     >
//                       {member.performance.productivity}% productivity
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => handleEditClick(member)}
//               >
//                 <Edit3 className="w-4 h-4 mr-1" />
//                 Edit
//               </Button>
//               <Button
//                 variant="destructive"
//                 size="sm"
//                 onClick={() => handleDeleteMember(member.id)}
//               >
//                 <Trash2 className="w-4 h-4 mr-1" />
//                 Delete
//               </Button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   const renderDepartments = () => (
//     <div className="space-y-4">
//       {departmentStats.map((dept) => (
//         <Card key={dept.name} className="p-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-gradient-to-br from-cloud-emerald to-cloud-blue rounded-full flex items-center justify-center text-white font-medium">
//                 {dept.name.charAt(0)}
//               </div>
//               <div>
//                 <h3 className="font-medium text-gray-900">{dept.name}</h3>
//                 <p className="text-sm text-gray-500">{dept.members} members</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-6 text-sm">
//               <div className="text-center">
//                 <p className="font-medium">{dept.requests}</p>
//                 <p className="text-gray-500">Requests</p>
//               </div>
//               <div className="text-center">
//                 <p className={`font-medium ${getPerformanceColor(dept.approvalRate)}`}>
//                   {dept.approvalRate}%
//                 </p>
//                 <p className="text-gray-500">Approval Rate</p>
//               </div>
//               <div className="text-center">
//                 <p className={`font-medium ${getPerformanceColor(dept.productivity)}`}>
//                   {dept.productivity}%
//                 </p>
//                 <p className="text-gray-500">Productivity</p>
//               </div>
//             </div>
//           </div>
//         </Card>
//       ))}
//     </div>
//   );

//   return (
//     <div className="space-y-3">
//       {/* Modals */}
//       {showEditForm && editMember && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <Card className="w-full max-w-lg p-6 relative">
//             <Button
//               variant="ghost"
//               size="sm"
//               className="absolute top-2 right-2"
//               onClick={() => {
//                 setEditMember(null);
//                 setShowEditForm(false);
//               }}
//             >
//               <X className="w-4 h-4" />
//             </Button>
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Member</h2>
//             <form onSubmit={handleEditMember} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="edit-name" className="text-gray-700">
//                     Name
//                   </Label>
//                   <Input
//                     id="edit-name"
//                     type="text"
//                     value={editMember.name}
//                     onChange={(e) =>
//                       setEditMember({ ...editMember, name: e.target.value })
//                     }
//                     placeholder="Enter name"
//                     className="h-10 border-gray-300 focus:border-cloud-purple focus:ring-cloud-purple"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="edit-email" className="text-gray-700">
//                     Email
//                   </Label>
//                   <Input
//                     id="edit-email"
//                     type="email"
//                     value={editMember.email}
//                     onChange={(e) =>
//                       setEditMember({ ...editMember, email: e.target.value })
//                     }
//                     placeholder="Enter email"
//                     className="h-10 border-gray-300 focus:border-cloud-purple focus:ring-cloud-purple"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="edit-role" className="text-gray-700">
//                     Role
//                   </Label>
//                   <select
//                     id="edit-role"
//                     value={editMember.role}
//                     onChange={(e) =>
//                       setEditMember({ ...editMember, role: e.target.value as TeamMember["role"] })
//                     }
//                     className="w-full h-10 border border-gray-300 rounded-lg text-sm focus:border-cloud-purple focus:ring-cloud-purple"
//                   >
//                     <option value="employee">Employee</option>
//                     <option value="manager">Manager</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="edit-department" className="text-gray-700">
//                     Department
//                   </Label>
//                   <select
//                     id="edit-department"
//                     value={editMember.department}
//                     onChange={(e) =>
//                       setEditMember({
//                         ...editMember,
//                         department: e.target.value as TeamMember["department"],
//                       })
//                     }
//                     className="w-full h-10 border border-gray-300 rounded-lg text-sm focus:border-cloud-purple focus:ring-cloud-purple"
//                   >
//                     <option value="Engineering">Engineering</option>
//                     <option value="Marketing">Marketing</option>
//                     <option value="Finance">Finance</option>
//                     <option value="HR">HR</option>
//                   </select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="edit-status" className="text-gray-700">
//                     Status
//                   </Label>
//                   <select
//                     id="edit-status"
//                     value={editMember.status}
//                     onChange={(e) =>
//                       setEditMember({
//                         ...editMember,
//                         status: e.target.value as TeamMember["status"],
//                       })
//                     }
//                     className="w-full h-10 border border-gray-300 rounded-lg text-sm focus:border-cloud-purple focus:ring-cloud-purple"
//                   >
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                     <option value="pending">Pending</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="flex justify-end space-x-2">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="sm"
//                   onClick={() => {
//                     setEditMember(null);
//                     setShowEditForm(false);
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   size="sm"
//                   className="bg-cloud-purple text-white hover:bg-cloud-purple-600"
//                 >
//                   Save Changes
//                 </Button>
//               </div>
//             </form>
//           </Card>
//         </div>
//       )}
//       {showAddForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <Card className="w-full max-w-lg p-6 relative">
//             <Button
//               variant="ghost"
//               size="sm"
//               className="absolute top-2 right-2"
//               onClick={handleCancel}
//             >
//               <X className="w-4 h-4" />
//             </Button>
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Member</h2>
//             <form onSubmit={handleAddMember} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name" className="text-gray-700">
//                     Name
//                   </Label>
//                   <Input
//                     id="name"
//                     type="text"
//                     value={newMember.name}
//                     onChange={(e) =>
//                       setNewMember({ ...newMember, name: e.target.value })
//                     }
//                     placeholder="Enter name"
//                     className="h-10 border-gray-300 focus:border-cloud-purple focus:ring-cloud-purple"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="email" className="text-gray-700">
//                     Email
//                   </Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={newMember.email}
//                     onChange={(e) =>
//                       setNewMember({ ...newMember, email: e.target.value })
//                     }
//                     placeholder="Enter email"
//                     className="h-10 border-gray-300 focus:border-cloud-purple focus:ring-cloud-purple"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="role" className="text-gray-700">
//                     Role
//                   </Label>
//                   <select
//                     id="role"
//                     value={newMember.role}
//                     onChange={(e) =>
//                       setNewMember({ ...newMember, role: e.target.value as TeamMember["role"] })
//                     }
//                     className="w-full h-10 border border-gray-300 rounded-lg text-sm focus:border-cloud-purple focus:ring-cloud-purple"
//                   >
//                     <option value="employee">Employee</option>
//                     <option value="manager">Manager</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="department" className="text-gray-700">
//                     Department
//                   </Label>
//                   <select
//                     id="department"
//                     value={newMember.department}
//                     onChange={(e) =>
//                       setNewMember({
//                         ...newMember,
//                         department: e.target.value as TeamMember["department"],
//                       })
//                     }
//                     className="w-full h-10 border border-gray-300 rounded-lg text-sm focus:border-cloud-purple focus:ring-cloud-purple"
//                   >
//                     <option value="Engineering">Data Engineer</option>
//                     <option value="Marketing">Devops Engineer</option>
//                     <option value="Finance">Data Analyst</option>
//                     <option value="HR">IT Engineer</option>
//                   </select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="status" className="text-gray-700">
//                     Status
//                   </Label>
//                   <select
//                     id="status"
//                     value={newMember.status}
//                     onChange={(e) =>
//                       setNewMember({
//                         ...newMember,
//                         status: e.target.value as TeamMember["status"],
//                       })
//                     }
//                     className="w-full h-10 border border-gray-300 rounded-lg text-sm focus:border-cloud-purple focus:ring-cloud-purple"
//                   >
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                     <option value="pending">Pending</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="flex justify-end space-x-2">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="sm"
//                   onClick={handleCancel}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   size="sm"
//                   className="bg-cloud-purple text-white hover:bg-cloud-purple-600"
//                 >
//                   Add Member
//                 </Button>
//               </div>
//             </form>
//           </Card>
//         </div>
//       )}
//       {/* Header */}
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Members</p>
//               <p className="text-2xl font-bold">{filteredMembers.length}</p>
//             </div>
//             <Users className="w-8 h-8 text-cloud-blue" />
//           </div>
//         </Card>
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Active Members</p>
//               <p className="text-2xl font-bold">
//                 {filteredMembers.filter((m) => m.status === "active").length}
//               </p>
//             </div>
//             <CheckCircle className="w-8 h-8 text-cloud-emerald" />
//           </div>
//         </Card>
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Avg. Approval Rate</p>
//               <p className="text-2xl font-bold">
//                 {Math.round(
//                   filteredMembers.reduce(
//                     (acc, m) => acc + m.performance.approvalRate,
//                     0
//                   ) / (filteredMembers.length || 1)
//                 )}
//                 %
//               </p>
//             </div>
//             <TrendingUp className="w-8 h-8 text-cloud-emerald" />
//           </div>
//         </Card>
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Avg. Productivity</p>
//               <p className="text-2xl font-bold">
//                 {Math.round(
//                   filteredMembers.reduce(
//                     (acc, m) => acc + m.performance.productivity,
//                     0
//                   ) / (filteredMembers.length || 1)
//                 )}
//                 %
//               </p>
//             </div>
//             <BarChart3 className="w-8 h-8 text-cloud-purple" />
//           </div>
//         </Card>
//       </div>
//       {/* Tabs */}
//       <div className="">
//         <div className="flex justify-between items-center">
//           <nav className="flex space-x-8">
//             <button
//               onClick={() => setActiveTab("members")}
//               className={`py-2 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === "members"
//                   ? "border-cloud-purple text-cloud-purple"
//                   : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//               }`}
//             >
//               Team Members
//             </button>
//             <button
//               onClick={() => setActiveTab("departments")}
//               className={`py-2 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === "departments"
//                   ? "border-cloud-purple text-cloud-purple"
//                   : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//               }`}
//             >
//               Departments
//             </button>
//           </nav>
//           <div className="flex items-center space-x-2">
//             <Button size="sm" onClick={() => setShowAddForm(!showAddForm)}>
//               <UserPlus className="w-4 h-4 mr-2" />
//               Add Member
//             </Button>
//           </div>
//         </div>
//       </div>
//       {/* Filters */}
//       <Card className="p-4">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search team members..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-9"
//               />
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <select
//               value={filterDepartment}
//               onChange={(e) => setFilterDepartment(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
//             >
//               <option value="all">All Departments</option>
//               <option value="Engineering">Engineering</option>
//               <option value="Marketing">Marketing</option>
//               <option value="Finance">Finance</option>
//               <option value="HR">HR</option>
//             </select>
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
//             >
//               <option value="all">All Status</option>
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//               <option value="pending">Pending</option>
//             </select>
//           </div>
//         </div>
//       </Card>
//       {/* Content */}
//       <Card className="p-5">
//         {activeTab === "members" ? renderMembers() : renderDepartments()}
//         {filteredMembers.length === 0 && activeTab === "members" && (
//           <div className="text-center py-8">
//             <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-500">No team members found matching your criteria.</p>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// };

// export default TeamManagementPage;


import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Users,
  UserPlus,
  Search,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Edit3,
  Trash2,
  X
} from "lucide-react";

// Interface for team member (adjust as needed):
interface TeamMember {
  id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
}

const TeamManagementPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({ fullName: "", email: "", role: "" });

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const res = await fetch(
          "https://dmsntmbne5.execute-api.ap-south-1.amazonaws.com/registerget"
        );
        const data = await res.json();
        console.log(data)
        const normalized = data.map((u: any) => ({
          id: u.UserID,
          fullName: u.FullName,
          email: u.Email,
          role: u.Role,
          createdAt: u.CreatedAt,
        }));
        setTeamMembers(normalized);
      } catch (error) {
        console.error("Failed to fetch team members:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTeamMembers();
  }, []);

  const filtered = teamMembers.filter(
    (m) =>
      m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-6 text-center">Loading team members…</div>;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Team Members</h1>
        <Button onClick={() => setShowAddForm(true)}>
          <UserPlus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search members…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Members</p>
              <p className="text-xl font-bold">{teamMembers.length}</p>
            </div>
            <Users className="text-blue-500 h-6 w-6" />
          </div>
        </Card>
        {/* Add stats like created date or other metrics if needed */}
      </div>

      {/* Members List */}
      <div className="space-y-2">
        {filtered.map((member) => (
          <Card key={member.id} className="p-4 flex justify-between items-center">
            <div>
              <div className="font-medium">{member.fullName}</div>
              <div className="text-sm text-gray-500">{member.email}</div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => {/* edit logic */}}>
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="sm" onClick={() => {/* delete logic */}}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Member Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-full max-w-md p-6 relative">
            <Button className="absolute top-2 right-2" variant="ghost" onClick={() => setShowAddForm(false)}>
              <X className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold mb-4">Add New Member</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Add logic to call backend POST and update state
                setShowAddForm(false);
              }}
              className="space-y-4"
            >
              <div>
                <Label>Full Name</Label>
                <Input value={newMember.fullName} onChange={(e) => setNewMember({ ...newMember, fullName: e.target.value })} required />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" value={newMember.email} onChange={(e) => setNewMember({ ...newMember, email: e.target.value })} required />
              </div>
              <div>
                <Label>Role</Label>
                <Input value={newMember.role} onChange={(e) => setNewMember({ ...newMember, role: e.target.value })} required />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                <Button type="submit">Add</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TeamManagementPage;
