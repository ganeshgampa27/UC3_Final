// import { NavLink, useLocation } from "react-router-dom";
// import { 
//   LayoutDashboard, 
//   Users, 
//   Building2, 
//   Cloud, 
//   DollarSign,
//   CreditCard,
//   Cloud as CloudIcon
// } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar";

// const navigationItems = [
//   { title: "Dashboard", url: "/", icon: LayoutDashboard },
//   { title: "Users", url: "/users", icon: Users },
//   { title: "Departments", url: "/departments", icon: Building2 },
//   { title: "Cloud Usage", url: "/cloud-usage", icon: Cloud },
//   { title: "Costs & Budgets", url: "/costs-budgets", icon: DollarSign },
//   { title: "Azure Cost Center", url: "/azure-cost-center", icon: CreditCard },
//   { title: "GCP Cost Center", url: "/Gcp", icon: CreditCard },
//   { title: "AWS Cost Center", url: "/AwsCostCenter", icon: CreditCard }


// ];

// export function AppSidebar() {
//   const { state } = useSidebar();
//   const location = useLocation();
//   const currentPath = location.pathname;

//   const isActive = (path: string) => {
//     if (path === '/') {
//       return currentPath === '/';
//     }
//     return currentPath.startsWith(path);
//   };

//   const getNavCls = (active: boolean) =>
//     active 
//       ? "bg-primary text-primary-foreground hover:bg-primary-hover" 
//       : "hover:bg-accent text-muted-foreground hover:text-foreground";

//   return (
//     <Sidebar className={state === "collapsed" ? "w-16" : "w-64"}>
//       <SidebarContent className="bg-card border-r">
//         <div className="p-4 border-b">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
//               <CloudIcon className="w-5 h-5 text-primary-foreground" />
//             </div>
//             {state !== "collapsed" && (
//               <div>
//                 <h2 className="font-semibold text-lg text-foreground">CloudCost</h2>
//                 <p className="text-sm text-muted-foreground">Admin Dashboard</p>
//               </div>
//             )}
//           </div>
//         </div>

//         <SidebarGroup>
//           {state !== "collapsed" && (
//             <SidebarGroupLabel className="text-muted-foreground px-4 py-2">
//               Main Navigation
//             </SidebarGroupLabel>
//           )}
//           <SidebarGroupContent>
//             <SidebarMenu className="px-2">
//               {navigationItems.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild className="w-full">
//                     <NavLink 
//                       to={item.url} 
//                       end={item.url === '/'}
//                       className={getNavCls(isActive(item.url))}
//                     >
//                       <item.icon className="w-5 h-5" />
//                       {state !== "collapsed" && <span className="ml-3">{item.title}</span>}
//                     </NavLink>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }





// import { NavLink, useLocation } from "react-router-dom";
// import { 
//   LayoutDashboard, 
//   CreditCard,
//   Cloud as CloudIcon,
//   ChevronDown,
//   ChevronUp
// } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubItem,
//   SidebarMenuSubButton,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { useState } from "react";

// const navigationItems = [
//   { title: "Dashboard", url: "/", icon: LayoutDashboard },
//   {
//     title: "Cost Centers",
//     icon: CreditCard,
//     subItems: [
//       { title: "Azure Cost Center", url: "/cost-centers/azure", icon: CreditCard },
//       { title: "AWS Cost Center", url: "/cost-centers/aws", icon: CreditCard },
//       { title: "GCP Cost Center", url: "/cost-centers/gcp", icon: CreditCard },
//     ],
//   },
// ];

// export function AppSidebar() {
//   const { state } = useSidebar();
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const [expanded, setExpanded] = useState({ "Cost Centers": true }); // State to manage sub-menu expansion

//   const isActive = (path) => {
//     if (path === "/") {
//       return currentPath === "/";
//     }
//     return currentPath.startsWith(path);
//   };

//   const getNavCls = (active) =>
//     active 
//       ? "bg-primary text-primary-foreground hover:bg-primary-hover" 
//       : "hover:bg-accent text-muted-foreground hover:text-foreground";

//   const toggleSubMenu = (title) => {
//     setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
//   };

//   return (
//     <Sidebar className={state === "collapsed" ? "w-16" : "w-64"}>
//       <SidebarContent className="bg-card border-r">
//         <div className="p-4 border-b">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
//               <CloudIcon className="w-5 h-5 text-primary-foreground" />
//             </div>
//             {state !== "collapsed" && (
//               <div>
//                 <h2 className="font-semibold text-lg text-foreground">CloudCost</h2>
//                 <p className="text-sm text-muted-foreground">Admin Dashboard</p>
//               </div>
//             )}
//           </div>
//         </div>

//         <SidebarGroup>
//           {state !== "collapsed" && (
//             <SidebarGroupLabel className="text-muted-foreground px-4 py-2">
//               Main Navigation
//             </SidebarGroupLabel>
//           )}
//           <SidebarGroupContent>
//             <SidebarMenu className="px-2">
//               {navigationItems.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   {item.subItems ? (
//                     <>
//                       <SidebarMenuButton
//                         asChild
//                         className={getNavCls(isActive("/cost-centers"))}
//                         onClick={() => toggleSubMenu(item.title)}
//                       >
//                         <div className="flex items-center justify-between w-full">
//                           <div className="flex items-center">
//                             <item.icon className="w-5 h-5" />
//                             {state !== "collapsed" && <span className="ml-3">{item.title}</span>}
//                           </div>
//                           {state !== "collapsed" && (
//                             expanded[item.title] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
//                           )}
//                         </div>
//                       </SidebarMenuButton>
//                       {expanded[item.title] && state !== "collapsed" && (
//                         <SidebarMenuSub>
//                           {item.subItems.map((subItem) => (
//                             <SidebarMenuSubItem key={subItem.title}>
//                               <SidebarMenuSubButton asChild>
//                                 <NavLink
//                                   to={subItem.url}
//                                   className={getNavCls(isActive(subItem.url))}
//                                 >
//                                   <subItem.icon className="w-5 h-5 ml-4" />
//                                   <span className="ml-3">{subItem.title}</span>
//                                 </NavLink>
//                               </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                           ))}
//                         </SidebarMenuSub>
//                       )}
//                     </>
//                   ) : (
//                     <SidebarMenuButton asChild className="w-full">
//                       <NavLink 
//                         to={item.url} 
//                         end={item.url === "/"}
//                         className={getNavCls(isActive(item.url))}
//                       >
//                         <item.icon className="w-5 h-5" />
//                         {state !== "collapsed" && <span className="ml-3">{item.title}</span>}
//                       </NavLink>
//                     </SidebarMenuButton>
//                   )}
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }











// import { NavLink, useLocation } from "react-router-dom";
// import { 
//   LayoutDashboard, 
//   Cloud as AwsIcon,
//   CloudRain as AzureIcon,
//   Globe as GcpIcon,
//   Cloud as CloudIcon,
//   ChevronDown,
//   ChevronUp,
//   Menu
// } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubItem,
//   SidebarMenuSubButton,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { useState } from "react";

// const navigationItems = [
//   { title: "Dashboard", url: "/", icon: LayoutDashboard },
//   {
//     title: "Cost Centers",
//     icon: CloudIcon,
//     subItems: [
//       { title: "Azure Cost Center", url: "/cost-centers/azure", icon: AzureIcon },
//       { title: "AWS Cost Center", url: "/cost-centers/aws", icon: AwsIcon },
//       { title: "GCP Cost Center", url: "/cost-centers/gcp", icon: GcpIcon },
//     ],
//   },
// ];

// export function AppSidebar() {
//   const { state } = useSidebar(); // Only use state for reference if needed
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const [isCollapsed, setIsCollapsed] = useState(false); // Local state for collapse
//   const [expanded, setExpanded] = useState({ "Cost Centers": true }); // State to manage sub-menu expansion

//   const isActive = (path) => {
//     if (path === "/") {
//       return currentPath === "/";
//     }
//     return currentPath.startsWith(path);
//   };

//   const getNavCls = (active) =>
//     active 
//       ? "bg-primary text-primary-foreground hover:bg-primary-hover" 
//       : "hover:bg-accent text-muted-foreground hover:text-foreground";

//   const toggleSubMenu = (title) => {
//     setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
//   };

//   const handleToggleSidebar = () => {
//     setIsCollapsed((prev) => !prev);
//   };

//   const handleNavClick = () => {
//     if (isCollapsed) {
//       setIsCollapsed(false);
//     }
//   };

//   return (
//     <Sidebar className={isCollapsed ? "w-16" : "w-64"}>
//       <SidebarContent className="bg-card border-r h-full flex flex-col">
//         <div className="p-4 border-b flex items-center justify-between">
//           {isCollapsed ? (
//             <button
//               onClick={handleToggleSidebar}
//               className="p-2 rounded hover:bg-accent focus:outline-none"
//               aria-label="Expand sidebar"
//             >
//               <Menu className="w-5 h-5 text-muted-foreground" />
//             </button>
//           ) : (
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
//                 <CloudIcon className="w-5 h-5 text-primary-foreground" />
//               </div>
//               <div>
//                 <h2 className="font-semibold text-lg text-foreground">CloudCost</h2>
//                 <p className="text-sm text-muted-foreground">Admin Dashboard</p>
//               </div>
//             </div>
//           )}
//           <button
//             onClick={handleToggleSidebar}
//             className="p-2 rounded hover:bg-accent focus:outline-none"
//             aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
//           >
//             <Menu className="w-5 h-5 text-muted-foreground" />
//           </button>
//         </div>

//         {!isCollapsed && (
//           <div className="flex-1 overflow-auto">
//             <SidebarGroup>
//               <SidebarGroupLabel className="text-muted-foreground px-4 py-2">
//                 Main Navigation
//               </SidebarGroupLabel>
//               <SidebarGroupContent>
//                 <SidebarMenu className="px-2">
//                   {navigationItems.map((item) => (
//                     <SidebarMenuItem key={item.title}>
//                       {item.subItems ? (
//                         <>
//                           <SidebarMenuButton
//                             asChild
//                             className={getNavCls(isActive("/cost-centers"))}
//                             onClick={() => {
//                               toggleSubMenu(item.title);
//                               handleNavClick();
//                             }}
//                           >
//                             <div className="flex items-center justify-between w-full">
//                               <div className="flex items-center">
//                                 <item.icon className="w-5 h-5" />
//                                 <span className="ml-3">{item.title}</span>
//                               </div>
//                               {expanded[item.title] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//                             </div>
//                           </SidebarMenuButton>
//                           {expanded[item.title] && (
//                             <SidebarMenuSub>
//                               {item.subItems.map((subItem) => (
//                                 <SidebarMenuSubItem key={subItem.title}>
//                                   <SidebarMenuSubButton asChild>
//                                     <NavLink
//                                       to={subItem.url}
//                                       className={getNavCls(isActive(subItem.url))}
//                                       onClick={handleNavClick}
//                                     >
//                                       <subItem.icon className="w-5 h-5 ml-4" />
//                                       <span className="ml-3">{subItem.title}</span>
//                                     </NavLink>
//                                   </SidebarMenuSubButton>
//                                 </SidebarMenuSubItem>
//                               ))}
//                             </SidebarMenuSub>
//                           )}
//                         </>
//                       ) : (
//                         <SidebarMenuButton asChild className="w-full">
//                           <NavLink 
//                             to={item.url} 
//                             end={item.url === "/"}
//                             className={getNavCls(isActive(item.url))}
//                             onClick={handleNavClick}
//                           >
//                             <item.icon className="w-5 h-5" />
//                             <span className="ml-3">{item.title}</span>
//                           </NavLink>
//                         </SidebarMenuButton>
//                       )}
//                     </SidebarMenuItem>
//                   ))}
//                 </SidebarMenu>
//               </SidebarGroupContent>
//             </SidebarGroup>
//           </div>
//         )}
//       </SidebarContent>
//     </Sidebar>
//   );
// }




// import { NavLink, useLocation } from "react-router-dom";
// import { 
//   LayoutDashboard, 
//   Cloud as AwsIcon,
//   CloudRain as AzureIcon,
//   Globe as GcpIcon,
//   Cloud as CloudIcon,
//   ChevronDown,
//   ChevronUp,
//   Menu
// } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubItem,
//   SidebarMenuSubButton,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { useState } from "react";

// const navigationItems = [
//   { title: "Dashboard", url: "/", icon: LayoutDashboard },
//   {
//     title: "Cost Centers",
//     icon: CloudIcon,
//     subItems: [
//       { title: "Azure Cost Center", url: "/cost-centers/azure", icon: AzureIcon },
//       { title: "AWS Cost Center", url: "/cost-centers/aws", icon: AwsIcon },
//       { title: "GCP Cost Center", url: "/cost-centers/gcp", icon: GcpIcon },
//     ],
//   },
// ];

// export function AppSidebar() {
//   const { state } = useSidebar(); // Only use state for reference if needed
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const [isCollapsed, setIsCollapsed] = useState(false); // Local state for collapse
//   const [expanded, setExpanded] = useState({ "Cost Centers": true }); // State to manage sub-menu expansion

//   const isActive = (path) => {
//     if (path === "/") {
//       return currentPath === "/";
//     }
//     return currentPath.startsWith(path);
//   };

//   const getNavCls = (active) =>
//     active 
//       ? "bg-primary text-primary-foreground hover:bg-primary-hover" 
//       : "hover:bg-accent text-muted-foreground hover:text-foreground";

//   const toggleSubMenu = (title) => {
//     setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
//   };

//   const handleToggleSidebar = () => {
//     setIsCollapsed((prev) => !prev);
//   };

//   const handleNavClick = () => {
//     if (isCollapsed) {
//       setIsCollapsed(false);
//     }
//   };

//   return (
//     <Sidebar className={isCollapsed ? "w-16" : "w-64"}>
//       <SidebarContent className="bg-card border-r h-full flex flex-col">
//         <div className="p-4 border-b flex items-center justify-between">
//           {isCollapsed ? (
//             <button
//               onClick={handleToggleSidebar}
//               className="p-2 rounded hover:bg-accent focus:outline-none"
//               aria-label="Expand sidebar"
//             >
//               <Menu className="w-5 h-5 text-muted-foreground" />
//             </button>
//           ) : (
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
//                 <CloudIcon className="w-5 h-5 text-primary-foreground" />
//               </div>
//               <div>
//                 <h2 className="font-semibold text-lg text-foreground">CloudCost</h2>
//                 <p className="text-sm text-muted-foreground">Admin Dashboard</p>
//               </div>
//             </div>
//           )}
//           <button
//             onClick={handleToggleSidebar}
//             className="p-2 rounded hover:bg-accent focus:outline-none"
//             aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
//           >
//             <Menu className="w-5 h-5 text-muted-foreground" />
//           </button>
//         </div>

//         <div className="flex-1 overflow-auto">
//           <SidebarGroup>
//             <SidebarGroupLabel className={isCollapsed ? "hidden" : "text-muted-foreground px-4 py-2"}>
//               Main Navigation
//             </SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu className="px-2">
//                 {navigationItems.map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     {item.subItems ? (
//                       <>
//                         <SidebarMenuButton
//                           asChild
//                           className={getNavCls(isActive("/cost-centers"))}
//                           onClick={() => {
//                             toggleSubMenu(item.title);
//                             handleNavClick();
//                           }}
//                         >
//                           <div className="flex items-center justify-between w-full">
//                             <div className="flex items-center">
//                               <item.icon className="w-5 h-5" />
//                               {isCollapsed ? null : <span className="ml-3">{item.title}</span>}
//                             </div>
//                             {isCollapsed ? null : (
//                               expanded[item.title] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
//                             )}
//                           </div>
//                         </SidebarMenuButton>
//                         {expanded[item.title] && !isCollapsed && (
//                           <SidebarMenuSub>
//                             {item.subItems.map((subItem) => (
//                               <SidebarMenuSubItem key={subItem.title}>
//                                 <SidebarMenuSubButton asChild>
//                                   <NavLink
//                                     to={subItem.url}
//                                     className={getNavCls(isActive(subItem.url))}
//                                     onClick={handleNavClick}
//                                   >
//                                     <subItem.icon className="w-5 h-5 ml-4" />
//                                     {isCollapsed ? null : <span className="ml-3">{subItem.title}</span>}
//                                   </NavLink>
//                                 </SidebarMenuSubButton>
//                               </SidebarMenuSubItem>
//                             ))}
//                           </SidebarMenuSub>
//                         )}
//                       </>
//                     ) : (
//                       <SidebarMenuButton asChild className="w-full">
//                         <NavLink 
//                           to={item.url} 
//                           end={item.url === "/"}
//                           className={getNavCls(isActive(item.url))}
//                           onClick={handleNavClick}
//                         >
//                           <item.icon className="w-5 h-5" />
//                           {isCollapsed ? null : <span className="ml-3">{item.title}</span>}
//                         </NavLink>
//                       </SidebarMenuButton>
//                     )}
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </div>
//       </SidebarContent>
//     </Sidebar>
//   );
// }








// import { NavLink, useLocation } from "react-router-dom";
// import { 
//   LayoutDashboard, 
//   Cloud as AwsIcon,
//   CloudRain as AzureIcon,
//   Globe as GcpIcon,
//   Cloud as CloudIcon,
//   ChevronDown,
//   ChevronUp,
//   Menu
// } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubItem,
//   SidebarMenuSubButton,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { useState, Dispatch, SetStateAction } from "react";

// // Define prop types for AppSidebar
// interface AppSidebarProps {
//   isCollapsed?: boolean;
//   setIsCollapsed?: Dispatch<SetStateAction<boolean>>;
// }

// const navigationItems = [
//   { title: "Dashboard", url: "/", icon: LayoutDashboard },
//   {
//     title: "Cost Centers",
//     icon: CloudIcon,
//     subItems: [
//       { title: "Azure Cost Center", url: "/cost-centers/azure", icon: AzureIcon },
//       { title: "AWS Cost Center", url: "/cost-centers/aws", icon: AwsIcon },
//       { title: "GCP Cost Center", url: "/cost-centers/gcp", icon: GcpIcon },
//     ],
//   },
// ];

// export function AppSidebar({ isCollapsed, setIsCollapsed }: AppSidebarProps) {
//   const { state } = useSidebar(); // Only use state for reference if needed
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const [localIsCollapsed, setLocalIsCollapsed] = useState(isCollapsed || false); // Fallback to local state

//   const [expanded, setExpanded] = useState({ "Cost Centers": true }); // State to manage sub-menu expansion

//   const isActive = (path) => {
//     if (path === "/") {
//       return currentPath === "/";
//     }
//     return currentPath.startsWith(path);
//   };

//   const getNavCls = (active) =>
//     active 
//       ? "bg-primary text-primary-foreground hover:bg-primary-hover" 
//       : "hover:bg-accent text-muted-foreground hover:text-foreground";

//   const toggleSubMenu = (title) => {
//     setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
//   };

//   const handleToggleSidebar = () => {
//     const newCollapsedState = !localIsCollapsed;
//     setLocalIsCollapsed(newCollapsedState);
//     if (setIsCollapsed) {
//       setIsCollapsed(newCollapsedState); // Sync with parent
//       console.log("Toggled sidebar, new state:", newCollapsedState); // Debug
//     }
//   };

//   const handleNavClick = () => {
//     if (localIsCollapsed) {
//       const newCollapsedState = false;
//       setLocalIsCollapsed(newCollapsedState);
//       if (setIsCollapsed) {
//         setIsCollapsed(newCollapsedState); // Sync with parent
//         console.log("Nav clicked, expanded sidebar, new state:", newCollapsedState); // Debug
//       }
//     }
//   };

//   return (
//     <Sidebar className={localIsCollapsed ? "w-16" : "w-64"}>
//       <SidebarContent className="bg-card border-r h-full flex flex-col">
//         <div className="p-4 border-b flex items-center justify-between">
//           {localIsCollapsed ? (
//             <button
//               onClick={handleToggleSidebar}
//               className="p-2 rounded hover:bg-accent focus:outline-none"
//               aria-label="Expand sidebar"
//             >
//               <Menu className="w-5 h-5 text-muted-foreground" />
//             </button>
//           ) : (
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
//                 <CloudIcon className="w-5 h-5 text-primary-foreground" />
//               </div>
//               <div>
//                 <h2 className="font-semibold text-lg text-foreground">CloudCost</h2>
//                 <p className="text-sm text-muted-foreground">Admin Dashboard</p>
//               </div>
//             </div>
//           )}
//           <button
//             onClick={handleToggleSidebar}
//             className="p-2 rounded hover:bg-accent focus:outline-none"
//             aria-label={localIsCollapsed ? "Expand sidebar" : "Collapse sidebar"}
//           >
//             <Menu className="w-5 h-5 text-muted-foreground" />
//           </button>
//         </div>

//         <div className="flex-1 overflow-auto">
//           <SidebarGroup>
//             <SidebarGroupLabel className={localIsCollapsed ? "hidden" : "text-muted-foreground px-4 py-2"}>
//               Main Navigation
//             </SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu className="px-2">
//                 {navigationItems.map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     {item.subItems ? (
//                       <>
//                         <SidebarMenuButton
//                           asChild
//                           className={getNavCls(isActive("/cost-centers"))}
//                           onClick={() => {
//                             toggleSubMenu(item.title);
//                             handleNavClick();
//                           }}
//                         >
//                           <div className="flex items-center justify-between w-full">
//                             <div className="flex items-center">
//                               <item.icon className="w-5 h-5" />
//                               {localIsCollapsed ? null : <span className="ml-3">{item.title}</span>}
//                             </div>
//                             {localIsCollapsed ? null : (
//                               expanded[item.title] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
//                             )}
//                           </div>
//                         </SidebarMenuButton>
//                         {expanded[item.title] && !localIsCollapsed && (
//                           <SidebarMenuSub>
//                             {item.subItems.map((subItem) => (
//                               <SidebarMenuSubItem key={subItem.title}>
//                                 <SidebarMenuSubButton asChild>
//                                   <NavLink
//                                     to={subItem.url}
//                                     className={getNavCls(isActive(subItem.url))}
//                                     onClick={handleNavClick}
//                                   >
//                                     <subItem.icon className="w-5 h-5 ml-4" />
//                                     {localIsCollapsed ? null : <span className="ml-3">{subItem.title}</span>}
//                                   </NavLink>
//                                 </SidebarMenuSubButton>
//                               </SidebarMenuSubItem>
//                             ))}
//                           </SidebarMenuSub>
//                         )}
//                       </>
//                     ) : (
//                       <SidebarMenuButton asChild className="w-full">
//                         <NavLink 
//                           to={item.url} 
//                           end={item.url === "/"}
//                           className={getNavCls(isActive(item.url))}
//                           onClick={handleNavClick}
//                         >
//                           <item.icon className="w-5 h-5" />
//                           {localIsCollapsed ? null : <span className="ml-3">{item.title}</span>}
//                         </NavLink>
//                       </SidebarMenuButton>
//                     )}
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </div>
//       </SidebarContent>
//     </Sidebar>
//   );
// }






// import { NavLink, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Cloud as AwsIcon,
//   CloudRain as AzureIcon,
//   Globe as GcpIcon,
//   Cloud as CloudIcon,
//   ChevronDown,
//   ChevronUp,
//   Menu
// } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubItem,
//   SidebarMenuSubButton
// } from "@/components/ui/sidebar";
// import { useState, Dispatch, SetStateAction, useEffect } from "react";

// // ✅ Define prop types for AppSidebar
// interface AppSidebarProps {
//   isCollapsed: boolean;
//   setIsCollapsed: Dispatch<SetStateAction<boolean>>;
//   isMobile?: boolean; // ✅ NEW PROP for responsiveness
// }

// // ✅ Navigation items
// const navigationItems = [
//   { title: "Dashboard", url: "/", icon: LayoutDashboard },
//   {
//     title: "Cost Centers",
//     icon: CloudIcon,
//     subItems: [
//       { title: "Azure Cost Center", url: "/cost-centers/azure", icon: AzureIcon },
//       { title: "AWS Cost Center", url: "/cost-centers/aws", icon: AwsIcon },
//       { title: "GCP Cost Center", url: "/cost-centers/gcp", icon: GcpIcon },
//     ],
//   },
// ];

// export function AppSidebar({ isCollapsed, setIsCollapsed, isMobile }: AppSidebarProps) {
//   const location = useLocation();
//   const currentPath = location.pathname;

//   // ✅ Local expansion state for submenus
//   const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({ "Cost Centers": true });

//   // ✅ Collapse sidebar automatically when on mobile
//   useEffect(() => {
//     if (isMobile) {
//       setIsCollapsed(true);
//     }
//   }, [isMobile, setIsCollapsed]);

//   // ✅ Highlight active links
//   const isActive = (path: string) => {
//     if (path === "/") return currentPath === "/";
//     return currentPath.startsWith(path);
//   };

//   // ✅ Classes for active/inactive nav items
//   const getNavCls = (active: boolean) =>
//     active
//       ? "bg-primary text-primary-foreground hover:bg-primary/90"
//       : "hover:bg-accent text-muted-foreground hover:text-foreground";

//   // ✅ Toggle submenus
//   const toggleSubMenu = (title: string) => {
//     setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
//   };

//   // ✅ Handles toggle button click (expand/collapse sidebar)
//   const handleToggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   // ✅ Handles navigation clicks (auto-close on mobile)
//   const handleNavClick = () => {
//     if (isMobile) {
//       setIsCollapsed(true); // Close sidebar when user clicks a nav item on mobile
//     }
//   };

//   return (
//     <Sidebar className={`${isCollapsed ? "w-16" : "w-64"} transition-all duration-300`}>
//       <SidebarContent className="bg-card border-r h-full flex flex-col">
        
//         {/* ✅ HEADER SECTION */}
//         <div className="p-4 border-b h-16 mt-2 flex items-center justify-between">
//           {!isCollapsed && (
//             <div className="flex items-center  gap-2">
//               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
//                 <CloudIcon className="w-5 h-5 text-primary-foreground" />
//               </div>
//               <div>
//                 <h2 className="font-semibold text-lg text-foreground">CloudCost</h2>
//                 {/* <p className="text-sm text-muted-foreground"></p> */}
//               </div>
//             </div>
//           )}

//           {/* ✅ Toggle button always visible */}
//           <button
//             onClick={handleToggleSidebar}
//             className="p-2 rounded hover:bg-accent focus:outline-none"
//             aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
//           >
//             <Menu className="w-5 h-5 text-muted-foreground" />
//           </button>
//         </div>

//         {/* ✅ MAIN NAVIGATION */}
//         <div className="flex-1 overflow-auto">
//           <SidebarGroup>
//             <SidebarGroupLabel className={isCollapsed ? "hidden" : "text-muted-foreground px-4 py-2"}>
//               Main Navigation
//             </SidebarGroupLabel>

//             <SidebarGroupContent>
//               <SidebarMenu className="px-2">
//                 {navigationItems.map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     {item.subItems ? (
//                       <>
//                         {/* ✅ Parent menu button */}
//                         <SidebarMenuButton
//                           asChild
//                           className={getNavCls(isActive("/cost-centers"))}
//                           onClick={() => toggleSubMenu(item.title)}
//                         >
//                           <div className="flex items-center justify-between w-full">
//                             <div className="flex items-center"
//                             >
//                               <item.icon className="w-5 h-5" />
//                               {!isCollapsed && <span className="ml-3">{item.title}</span>}
//                             </div>
//                             {!isCollapsed && (
//                               expanded[item.title] ? (
//                                 <ChevronUp className="w-4 h-4" />
//                               ) : (
//                                 <ChevronDown className="w-4 h-4" />
//                               )
//                             )}
//                           </div>
//                         </SidebarMenuButton>

//                         {/* ✅ Submenu */}
//                         {expanded[item.title] && !isCollapsed && (
//                           <SidebarMenuSub>
//                             {item.subItems.map((subItem) => (
//                               <SidebarMenuSubItem key={subItem.title}>
//                                 <SidebarMenuSubButton asChild>
//                                   <NavLink
//                                     to={subItem.url}
//                                     className={getNavCls(isActive(subItem.url))}
//                                     onClick={handleNavClick}
//                                   >
//                                     <subItem.icon className="w-5 h-5 ml-4" />
//                                     {!isCollapsed && <span className="ml-3">{subItem.title}</span>}
//                                   </NavLink>
//                                 </SidebarMenuSubButton>
//                               </SidebarMenuSubItem>
//                             ))}
//                           </SidebarMenuSub>
//                         )}
//                       </>
//                     ) : (
//                       /* ✅ Regular menu item */
//                       <SidebarMenuButton asChild className="w-full">
//                         <NavLink
//                           to={item.url}
//                           end={item.url === "/"}
//                           className={getNavCls(isActive(item.url))}
//                           onClick={handleNavClick}
//                         >
//                           <item.icon className="w-5 h-5" />
//                           {!isCollapsed && <span className="ml-3">{item.title}</span>}
//                         </NavLink>
//                       </SidebarMenuButton>
//                     )}
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </div>
//       </SidebarContent>
//     </Sidebar>
//   );
// }


///////////////////////////////////////////////////////////////////////////////////////




// import { NavLink, useLocation } from "react-router-dom"; 
// import {
//   LayoutDashboard,
//   Cloud as AwsIcon,
//   CloudRain as AzureIcon,
//   Globe as GcpIcon,
//   Cloud as CloudIcon,
//   ChevronDown,
//   ChevronUp,
//   Menu
// } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubItem,
//   SidebarMenuSubButton
// } from "@/components/ui/sidebar";
// import { useState, Dispatch, SetStateAction, useEffect } from "react";

// interface AppSidebarProps {
//   isCollapsed: boolean;
//   setIsCollapsed: Dispatch<SetStateAction<boolean>>;
//   isMobile?: boolean;
// }

// const navigationItems = [
//   { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
//   {
//     title: "Cost Centers",
//     icon: CloudIcon,
//     subItems: [
//       { title: "Azure Cost Center", url: "/cost-centers/azure", icon: AzureIcon },
//       { title: "AWS Cost Center", url: "/cost-centers/aws", icon: AwsIcon },
//       { title: "GCP Cost Center", url: "/cost-centers/gcp", icon: GcpIcon },
//     ],
//   },
// ];

// export function AppSidebar({ isCollapsed, setIsCollapsed, isMobile }: AppSidebarProps) {
//   const location = useLocation();
//   const currentPath = location.pathname;

//   const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({ "Cost Centers": true });

//   useEffect(() => {
//     if (isMobile) {
//       setIsCollapsed(true);
//     }
//   }, [isMobile, setIsCollapsed]);

//   const isActive = (path: string) => {
//     if (path === "/") return currentPath === "/";
//     return currentPath.startsWith(path);
//   };

//   const getNavCls = (active: boolean) =>
//     active
//       ? "bg-primary text-primary-foreground hover:bg-primary/90"
//       : "hover:bg-accent text-muted-foreground hover:text-foreground";

//   const toggleSubMenu = (title: string) => {
//     setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
//   };

//   const handleToggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   // ✅ Handles navigation clicks
//   const handleNavClick = () => {
//     // 📌 If sidebar is collapsed, expand it when clicking any icon
//     if (isCollapsed) {
//       setIsCollapsed(false);
//     }

//     // 📌 On mobile, clicking any nav item should close sidebar
//     if (isMobile) {
//       setIsCollapsed(true);
//     }
//   };

//   return (
//     <Sidebar className={`${isCollapsed ? "w-16" : "w-64"} transition-all duration-300`}>
//       <SidebarContent className="bg-card border-r h-full flex flex-col">
        
//         {/* ✅ HEADER SECTION */}
//         <div className="p-4 border-b h-16 mt-2 flex items-center justify-between">
//           {!isCollapsed && (
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
//                 <CloudIcon className="w-5 h-5 text-primary-foreground" />
//               </div>
//               <div>
//                 <h2 className="font-semibold text-lg text-foreground">CloudCost</h2>
//               </div>
//             </div>
//           )}

//           {/* ✅ Toggle button */}
//           <button
//             onClick={handleToggleSidebar}
//             className="p-2 rounded hover:bg-accent focus:outline-none"
//             aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
//           >
//             <Menu className="w-5 h-5 text-muted-foreground" />
//           </button>
//         </div>

//         {/* ✅ MAIN NAVIGATION */}
//         <div className="flex-1 overflow-auto">
//           <SidebarGroup>
//             {/* <SidebarGroupLabel className={isCollapsed ? "hidden" : "text-muted-foreground px-4 py-2"}>
//               Main Navigation
//             </SidebarGroupLabel> */}

//             <SidebarGroupContent>
//               <SidebarMenu className="px-2">
//                 {navigationItems.map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     {item.subItems ? (
//                       <>
//                         {/* ✅ Parent menu button */}
//                         <SidebarMenuButton
//                           asChild
//                           className={getNavCls(isActive("/cost-centers"))}
//                           onClick={() => {
//                             if (isCollapsed) {
//                               setIsCollapsed(false); // 📌 Expand sidebar when collapsed and clicking parent
//                             } else {
//                               toggleSubMenu(item.title);
//                             }
//                           }}
//                         >
//                           <div className="flex items-center justify-between w-full">
//                             <div className="flex items-center">
//                               <item.icon className="w-5 h-5" />
//                               {!isCollapsed && <span className="ml-3">{item.title}</span>}
//                             </div>
//                             {!isCollapsed && (
//                               expanded[item.title] ? (
//                                 <ChevronUp className="w-4 h-4" />
//                               ) : (
//                                 <ChevronDown className="w-4 h-4" />
//                               )
//                             )}
//                           </div>
//                         </SidebarMenuButton>

//                         {/* ✅ Submenu */}
//                         {expanded[item.title] && !isCollapsed && (
//                           <SidebarMenuSub>
//                             {item.subItems.map((subItem) => (
//                               <SidebarMenuSubItem key={subItem.title}>
//                                 <SidebarMenuSubButton asChild>
//                                   <NavLink
//                                     to={subItem.url}
//                                     className={getNavCls(isActive(subItem.url))}
//                                     onClick={handleNavClick}
//                                   >
//                                     <subItem.icon className="w-5 h-5 ml-4" />
//                                     {!isCollapsed && <span className="ml-3">{subItem.title}</span>}
//                                   </NavLink>
//                                 </SidebarMenuSubButton>
//                               </SidebarMenuSubItem>
//                             ))}
//                           </SidebarMenuSub>
//                         )}
//                       </>
//                     ) : (
//                       /* ✅ Regular menu item */
//                       <SidebarMenuButton asChild className="w-full">
//                         <NavLink
//                           to={item.url}
//                           end={item.url === "/"}
//                           className={getNavCls(isActive(item.url))}
//                           onClick={handleNavClick}
//                         >
//                           <item.icon className="w-5 h-5" />
//                           {!isCollapsed && <span className="ml-3">{item.title}</span>}
//                         </NavLink>
//                       </SidebarMenuButton>
//                     )}
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </div>
//       </SidebarContent>
//     </Sidebar>
//   );
// }


import {
  LayoutDashboard,
  Cloud as AwsIcon,
  CloudRain as AzureIcon,
  Globe as GcpIcon,
  Cloud as CloudIcon,
  ChevronDown,
  ChevronUp,
  Menu
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar";
import { useState, Dispatch, SetStateAction, useEffect } from "react";

interface AppSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
  isMobile?: boolean;
  activeTab: string;
  onNavigate: (tab: string) => void;
}

const navigationItems = [
  { title: "Dashboard", tab: "dashboard", icon: LayoutDashboard },
  {
    title: "Cost Centers",
    icon: CloudIcon,
    subItems: [
      { title: "Azure Cost Center", tab: "cost-centers-azure", icon: AzureIcon },
      { title: "AWS Cost Center", tab: "cost-centers-aws", icon: AwsIcon },
      { title: "GCP Cost Center", tab: "cost-centers-gcp", icon: GcpIcon },
    ],
  },
];

export function AppSidebar({ isCollapsed, setIsCollapsed, isMobile, activeTab, onNavigate }: AppSidebarProps) {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({ "Cost Centers": true });

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile, setIsCollapsed]);

  const isActive = (tab: string) => {
    return activeTab === tab;
  };

  const isCostCenterActive = () => {
    return activeTab.startsWith('cost-centers');
  };

  const getNavCls = (active: boolean) =>
    active
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "hover:bg-accent text-muted-foreground hover:text-foreground";

  const toggleSubMenu = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNavClick = (tab?: string) => {
    // If sidebar is collapsed, expand it when clicking any icon
    if (isCollapsed) {
      setIsCollapsed(false);
    }

    // Navigate to the tab if provided
    if (tab) {
      onNavigate(tab);
    }

    // On mobile, clicking any nav item should close sidebar
    if (isMobile && tab) {
      setIsCollapsed(true);
    }
  };

  return (
    <Sidebar className={`${isCollapsed ? "w-16" : "w-64"} transition-all duration-300`}>
      <SidebarContent className="bg-card border-r h-full flex flex-col">
        
        {/* HEADER SECTION */}
        <div className="p-4 border-b h-16 mt-2 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <CloudIcon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-lg text-foreground">CloudCost</h2>
              </div>
            </div>
          )}

          {/* Toggle button */}
          <button
            onClick={handleToggleSidebar}
            className="p-2 rounded hover:bg-accent focus:outline-none"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* MAIN NAVIGATION */}
        <div className="flex-1 overflow-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="px-2">
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.subItems ? (
                      <>
                        {/* Parent menu button */}
                        <SidebarMenuButton
                          className={getNavCls(isCostCenterActive())}
                          onClick={() => {
                            if (isCollapsed) {
                              setIsCollapsed(false);
                            } else {
                              toggleSubMenu(item.title);
                            }
                          }}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                              <item.icon className="w-5 h-5" />
                              {!isCollapsed && <span className="ml-3">{item.title}</span>}
                            </div>
                            {!isCollapsed && (
                              expanded[item.title] ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )
                            )}
                          </div>
                        </SidebarMenuButton>

                        {/* Submenu */}
                        {expanded[item.title] && !isCollapsed && (
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  className={getNavCls(isActive(subItem.tab))}
                                  onClick={() => handleNavClick(subItem.tab)}
                                >
                                  <subItem.icon className="w-5 h-5 ml-4" />
                                  {!isCollapsed && <span className="ml-3">{subItem.title}</span>}
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        )}
                      </>
                    ) : (
                      /* Regular menu item */
                      <SidebarMenuButton 
                        className={`w-full ${getNavCls(isActive(item.tab))}`}
                        onClick={() => handleNavClick(item.tab)}
                      >
                        <item.icon className="w-5 h-5" />
                        {!isCollapsed && <span className="ml-3">{item.title}</span>}
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}