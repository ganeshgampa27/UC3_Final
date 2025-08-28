
// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import { Button } from "./ui/button";
// import { Badge } from "./ui/badge";
// import { Input } from "./ui/input";
// import { Textarea } from "./ui/textarea";
// import {
//   Search,
//   CheckCircle,
//   XCircle,
//   Eye,
//   Cloud,
//   Shield,
//   Users,
// } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "./ui/dialog";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "./ui/tabs";

// interface Request {
//   RequestID: string;
//   Username: string;
//   Service: string;
//   Role: string;
//   Status: string;
//   Reason: string;
//   RequestTime: string;
//   AccessLevel: string;
//   Cloud: string;
//   Policy?: any;
// }

// const ApprovalsPage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
//   const [approvalComment, setApprovalComment] = useState("");
//   const [requests, setRequests] = useState<Request[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedProvider, setSelectedProvider] = useState("all");

//   // Fetch requests
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(
//           "https://9y40j38nv9.execute-api.ap-south-1.amazonaws.com/list_requests"
//         );
//         if (!res.ok) throw new Error("Failed to fetch requests");
//         const data = await res.json();

//         const filtered = data.requests.filter(
//           (req: Request) =>
//             req.Status === "pending" &&
//             (selectedProvider === "all" ||
//               req.Cloud.toLowerCase() === selectedProvider.toLowerCase())
//         );
//         setRequests(filtered);
//       } catch (err) {
//         setError("Unable to load requests. Please try again later.");
//         console.error("Error fetching requests:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, [selectedProvider]);

//   // Helpers
//   const getPriorityColor = (accessLevel: string) => {
//     const level = accessLevel.toLowerCase();
//     if (level.includes("full") || level.includes("admin")) {
//       return "bg-red-500 text-white";
//     } else if (level.includes("write") || level.includes("modify")) {
//       return "bg-orange-500 text-white";
//     } else if (level.includes("read")) {
//       return "bg-green-500 text-white";
//     } else {
//       return "bg-gray-500 text-white";
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleString("en-IN", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const handleApprove = async (request: Request) => {
//     try {
//       const payload = {
//         ...request,
//         Status: "approved",
//         Notes: approvalComment,
//       };

//       const res = await fetch(
//         `https://zfn7ztag31.execute-api.ap-south-1.amazonaws.com/dev/approve_access/${request.RequestID}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (!res.ok) throw new Error("Failed to approve request");

//       setRequests((prev) =>
//         prev.filter((r) => r.RequestID !== request.RequestID)
//       );
//       setSelectedRequest(null);
//       setApprovalComment("");
//     } catch (error) {
//       console.error("Approval error:", error);
//     }
//   };

//   const handleReject = async (request: Request) => {
//     try {
//       const payload = {
//         ...request,
//         Status: "rejected",
//         Notes: approvalComment,
//       };

//       const res = await fetch(
//         `https://zfn7ztag31.execute-api.ap-south-1.amazonaws.com/dev/approve_access/${request.RequestID}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (!res.ok) throw new Error("Failed to reject request");

//       setRequests((prev) =>
//         prev.filter((r) => r.RequestID !== request.RequestID)
//       );
//       setSelectedRequest(null);
//       setApprovalComment("");
//     } catch (error) {
//       console.error("Rejection error:", error);
//     }
//   };

//   // Derived Data
//   const highPriorityCount = requests.filter((r) =>
//     r.AccessLevel.toLowerCase().includes("full")
//   ).length;

//   const filteredRequests = requests.filter((request) => {
//     return (
//       request.Service.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.AccessLevel.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   // UI
//   if (loading) return <p>Loading requests...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="space-y-8">
//       {/* Dashboard Header */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card>
//           <CardContent className="flex items-center justify-between p-6">
//             <div>
//               <p className="text-sm text-muted-foreground">Total Pending</p>
//               <h2 className="text-2xl font-bold">{requests.length}</h2>
//             </div>
//             <Cloud className="w-8 h-8 text-blue-500" />
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="flex items-center justify-between p-6">
//             <div>
//               <p className="text-sm text-muted-foreground">High Priority</p>
//               <h2 className="text-2xl font-bold">{highPriorityCount}</h2>
//             </div>
//             <Shield className="w-8 h-8 text-red-500" />
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="flex items-center justify-between p-6">
//             <div>
//               <p className="text-sm text-muted-foreground">Requesters</p>
//               <h2 className="text-2xl font-bold">{requests.length}</h2>
//             </div>
//             <Users className="w-8 h-8 text-green-500" />
//           </CardContent>
//         </Card>
//       </div>

//       {/* Search */}
//       <Card>
//         <CardContent className="p-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
//             <Input
//               placeholder="Search requests by service, user, or access..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Requests Table */}
//       {filteredRequests.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse border border-gray-200">
//             <thead className="bg-gray-100">
//               <tr className="text-left">
//                 <th className="p-3">Service</th>
//                 <th className="p-3">User</th>
//                 <th className="p-3">Role</th>
//                 <th className="p-3">Access</th>
//                 <th className="p-3">Cloud</th>
//                 <th className="p-3">Requested</th>
//                 <th className="p-3">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredRequests.map((req) => (
//                 <tr key={req.RequestID} className="border-b hover:bg-gray-50">
//                   <td className="p-3 font-medium uppercase">{req.Service}</td>
//                   <td className="p-3">{req.Username}</td>
//                   <td className="p-3">{req.Role}</td>
//                   <td className="p-3">
//                     <Badge className={getPriorityColor(req.AccessLevel)}>
//                       {req.AccessLevel}
//                     </Badge>
//                   </td>
//                   <td className="p-3">{req.Cloud}</td>
//                   <td className="p-3">{formatDate(req.RequestTime)}</td>
//                   <td className="p-3">
//                     <Dialog>
//                       <DialogTrigger asChild>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => setSelectedRequest(req)}
//                         >
//                           <Eye className="w-4 h-4 mr-1" />
//                           Review
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent className="max-w-2xl">
//                         <DialogHeader>
//                           <DialogTitle>
//                             Review Request: {req.Service.toUpperCase()}
//                           </DialogTitle>
//                         </DialogHeader>

//                         {selectedRequest && (
//                           <><Tabs defaultValue="details" className="mt-4">
//                             <TabsList>
//                               <TabsTrigger value="details">Details</TabsTrigger>
//                               <TabsTrigger value="policy">Policy</TabsTrigger>
//                               <TabsTrigger value="comments">Comments</TabsTrigger>
//                             </TabsList>

//                             <TabsContent value="details" className="space-y-3">
//                               <div className="grid grid-cols-2 gap-4 text-sm">
//                                 <div>
//                                   <strong>Service:</strong> {req.Service}
//                                   <br />
//                                   <strong>Cloud:</strong> {req.Cloud}
//                                   <br />
//                                   <strong>Access:</strong> {req.AccessLevel}
//                                 </div>
//                                 <div>
//                                   <strong>User:</strong> {req.Username}
//                                   <br />
//                                   <strong>Role:</strong> {req.Role}
//                                   <br />
//                                   <strong>Requested:</strong>{" "}
//                                   {formatDate(req.RequestTime)}
//                                 </div>
//                               </div>
//                               <div>
//                                 <strong>Business Justification:</strong>
//                                 <p className="mt-1 p-2 bg-gray-100 rounded text-sm">
//                                   {req.Reason}
//                                 </p>
//                               </div>
//                             </TabsContent>

//                             <TabsContent value="policy">
//                               {req.Policy ? (
//                                 <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-48">
//                                   {JSON.stringify(req.Policy, null, 2)}
//                                 </pre>
//                               ) : (
//                                 <p className="text-sm text-muted-foreground">
//                                   No policy generated.
//                                 </p>
//                               )}
//                             </TabsContent>

//                             <TabsContent value="comments">
//                               <Textarea
//                                 value={approvalComment}
//                                 onChange={(e) => setApprovalComment(e.target.value)}
//                                 placeholder="Add comments about your decision..." />
//                             </TabsContent>
//                           </Tabs><div className="flex space-x-3 mt-6">
//                               <Button
//                                 onClick={() => handleApprove(req)}
//                                 className="flex-1 bg-green-600 hover:bg-green-700"
//                               >
//                                 <CheckCircle className="w-4 h-4 mr-2" />
//                                 Approve
//                               </Button>
//                               <Button
//                                 onClick={() => handleReject(req)}
//                                 variant="destructive"
//                                 className="flex-1"
//                               >
//                                 <XCircle className="w-4 h-4 mr-2" />
//                                 Reject
//                               </Button>
//                             </div></>
//                         )}
//                       </DialogContent>
//                     </Dialog>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <Card>
//           <CardContent className="p-12 text-center">
//             <CheckCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
//             <h3 className="text-lg font-medium">No pending approvals</h3>
//             <p className="text-muted-foreground">
//               All requests have been processed. 🎉
//             </p>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default ApprovalsPage;


import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Search, CheckCircle, XCircle, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface Request {
  RequestID: string;
  Username: string;
  Service: string;
  Role: string;
  Status: string;
  Reason: string;
  RequestTime: string;
  AccessLevel: string;
  Cloud: string;
}

const ApprovalsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [approvalComment, setApprovalComment] = useState("");
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://9y40j38nv9.execute-api.ap-south-1.amazonaws.com/list_requests"
        );
        if (!res.ok) throw new Error("Failed to fetch requests");
        const data = await res.json();

        const filtered = data.requests.filter(
          (req: Request) => req.Status === "pending"
        );
        setRequests(filtered);
      } catch (err) {
        setError("Unable to load requests. Please try again later.");
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Helpers
  const getPriorityColor = (accessLevel: string) => {
    const level = accessLevel.toLowerCase();
    if (level.includes("full") || level.includes("admin")) {
      return "bg-red-500 text-white";
    } else if (level.includes("write") || level.includes("modify")) {
      return "bg-orange-500 text-white";
    } else if (level.includes("read")) {
      return "bg-green-500 text-white";
    } else {
      return "bg-gray-500 text-white";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleApprove = async (request: Request) => {
    try {
      const payload = {
        ...request,
        Status: "approved",
        Notes: approvalComment,
      };

      const res = await fetch(
        `https://zfn7ztag31.execute-api.ap-south-1.amazonaws.com/dev/approve_access/${request.RequestID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to approve request");

      setRequests((prev) =>
        prev.filter((r) => r.RequestID !== request.RequestID)
      );
      setSelectedRequest(null);
      setApprovalComment("");
    } catch (error) {
      console.error("Approval error:", error);
    }
  };

  const handleReject = async (request: Request) => {
    try {
      const payload = {
        ...request,
        Status: "rejected",
        Notes: approvalComment,
      };

      const res = await fetch(
        `https://zfn7ztag31.execute-api.ap-south-1.amazonaws.com/dev/approve_access/${request.RequestID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to reject request");

      setRequests((prev) =>
        prev.filter((r) => r.RequestID !== request.RequestID)
      );
      setSelectedRequest(null);
      setApprovalComment("");
    } catch (error) {
      console.error("Rejection error:", error);
    }
  };

  // Derived Data
  const filteredRequests = requests.filter((request) => {
    return (
      request.Service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.AccessLevel.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // UI
  if (loading) return <p>Loading requests...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-8">
      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search requests by service, user, or access..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      {filteredRequests.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3">Service</th>
                <th className="p-3">User</th>
                <th className="p-3">Access</th>
                <th className="p-3">Requested</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.RequestID} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">
                    {req.Service.replace(/\b\w/g, (char) => char.toUpperCase())}
                  </td>
                  <td className="p-3">{req.Username}</td>
                  <td className="p-3">
                    <Badge className={getPriorityColor(req.AccessLevel)}>
                      {req.AccessLevel}
                    </Badge>
                  </td>
                  <td className="p-3">{formatDate(req.RequestTime)}</td>
                  <td className="p-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedRequest(req)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl"> {/* wider modal */}
                        <DialogHeader>
                          <DialogTitle>
                            Access Request for {req.Username}
                          </DialogTitle>
                        </DialogHeader>

                        {selectedRequest && (
                          <div className="space-y-6 text-sm mt-2">
                            {/* Grid layout */}
                            <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                              <div>
                                <strong>Requester:</strong> {req.Username}
                              </div>
                              <div>
                                <strong>Request Date:</strong>{" "}
                                {formatDate(req.RequestTime)}
                              </div>
                              <div>
                                <strong>Cloud Service:</strong> {req.Cloud}
                              </div>
                              <div>
                                <strong>Resource Type:</strong>{" "}
                                {req.Service.charAt(0).toUpperCase() +
                                  req.Service.slice(1)}
                              </div>
                              <div>
                                <strong>Access Level:</strong> {req.AccessLevel}
                              </div>
                              <div>
                                <strong>Role:</strong> {req.Role}
                              </div>
                            </div>

                            {/* Business Justification */}
                            <div>
                              <strong>Business Justification:</strong>
                              <p className="mt-1 p-2 bg-gray-100 rounded">
                                {req.Reason}
                              </p>
                            </div>

                            {/* Manager Comment */}
                            <div>
                              <strong>Manager Comment:</strong>
                              <Textarea
                                placeholder="Add your comments here..."
                                value={approvalComment}
                                onChange={(e) =>
                                  setApprovalComment(e.target.value)
                                }
                                className="mt-1"
                              />
                            </div>

                            {/* Action buttons */}
                            <div className="flex justify-end space-x-3 pt-4">
                              <Button
                                variant="outline"
                                onClick={() => setSelectedRequest(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => handleReject(req)}
                                variant="destructive"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </Button>
                              <Button
                                onClick={() => handleApprove(req)}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No pending approvals</h3>
            <p className="text-muted-foreground">
              All requests have been processed. 🎉
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApprovalsPage;


