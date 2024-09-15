import { HomeIcon, LogInIcon, UserPlusIcon, SearchIcon, FileTextIcon, ShieldIcon } from "lucide-react";
import AdminProjectManagement from "./AdminProjectManagement.jsx";
//import StudentProjectSubmission from "./pages/StudentProjectSubmission.jsx";
//import AdminProjectManagement from "./pages/AdminProjectManagement.jsx";

export const navItems = [  
   {
    title: "Project",
    to: "/admin",
    icon: <HomeIcon className="bi bi-house" />,
    page: <AdminProjectManagement />,
   }
  
];