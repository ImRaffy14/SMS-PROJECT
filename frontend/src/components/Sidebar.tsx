import { useState } from "react";
import {  
  Users, 
  BarChart3, 
  LogOut, 
  Menu,
  EthernetPort,
  Columns3,
  TabletSmartphone,
  Blocks,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { logout } from "@/api/auth";
import toast from "react-hot-toast";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", path: "/", icon: <BarChart3 size={20} />, label: "Dashboard" },
    { id: "communication", path: "/communication", icon: <EthernetPort size={20} />, label: "Communication" },
    { id: "mobileapp", path: "/mobileApp", icon: <TabletSmartphone size={20} />, label: "Mobile Application" },
    { id: "feeCustomization", path: "/feeCustomization", icon: <Columns3 size={20} />, label: "Few Customizations" },
    { id: "smsInteg", path: "/smsInteg", icon: <Blocks size={20} />, label: "SMS Data" },
    { id: "users", path: "/users", icon: <Users size={20} />, label: "Users" },
  ];

  const navigate = useNavigate()

  const handleLogout = async () => {
    const result = await logout()
    toast.success(result.message)
    navigate('/login')
  }

  return (
    <div className={`bg-white border-r ${collapsed ? "w-16" : "w-64"} flex flex-col transition-all duration-300`}>
      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={20} />
        </Button>
      </div>
      
      <div className="flex-1 py-4">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center ${collapsed ? "justify-center" : "justify-start"} px-3 py-2 w-full rounded-md ${
                  isActive 
                    ? "bg-blue-100 text-blue-700" 
                    : "text-gray-700 hover:bg-gray-100"
                } transition-colors duration-200`
              }
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="ml-3 font-medium">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t">
        <button 
          className={`flex items-center ${collapsed ? "justify-center" : "justify-start"} w-full text-red-600 hover:bg-red-50 px-3 py-2 rounded-md`}
          onClick={() => handleLogout()}
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-3 font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;