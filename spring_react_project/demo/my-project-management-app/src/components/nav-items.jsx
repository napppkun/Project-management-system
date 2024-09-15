import { HomeIcon, LogInIcon, UserPlusIcon, SearchIcon, FileTextIcon, ShieldIcon } from "lucide-react";
import Index from "./Index.jsx";
import Register from "./Register.jsx";
import SearchPage from "./SearchPage.jsx";
import AdminProjectManagement from "./AdminProjectManagement.jsx";
//import StudentProjectSubmission from "./pages/StudentProjectSubmission.jsx";
//import AdminProjectManagement from "./pages/AdminProjectManagement.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="bi bi-house" />,
    page: <Index />,
  },
  {
    title: "Login",
    to: "/login",
    icon: <LogInIcon className="bi bi-box-arrow-in-right" />,
    page: <div>Login Page</div>, // Placeholder for login page
  },
  {
    title: "Register",
    to: "/register",
    icon: <UserPlusIcon className="bi bi-person-plus" />,
    page: <Register />,
  },
  {
    title: "Advanced Search",
    to: "/search",
    icon: <SearchIcon className="bi bi-search" />,
    page: <SearchPage />,
  },
  {    
    to: "/admin",    
    page: <AdminProjectManagement />,
  }  
  
];