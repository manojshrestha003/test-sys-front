import * as React from "react";
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  Settings, 
  Bell, 
  LogOut, 
  Shield,
  type LucideIcon,
} from "lucide-react";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
import { routes } from "@/app/routes/routes";
import { GlobalSearch } from "@/common/components/Search";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface DashboardMenuItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

const dashboardMenuItems: DashboardMenuItem[] = [
  { label: "Overview", path: routes.DASHBOARD, icon: Home },
  { label: "Users", path: "/users", icon: Users },
  { label: "Settings", path: "/settings", icon: Settings },
];

export function AdminLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [cookies] = useCookies(["user_name", "user_email"]);
  const userName = typeof cookies.user_name === "string" ? cookies.user_name.trim() : "";
  const nameParts = userName.split(/\s+/).filter(Boolean);
  const initials = nameParts.length > 1
    ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
    : userName.slice(0, 2);
  const avatarInitials = initials.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <header className="h-16 border-b border-slate-200 bg-white sticky top-0 z-30 px-4 sm:px-6 flex items-center 
      justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2 font-bold text-lg text-slate-900">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Shield className="w-5 h-5" />
            </div>
            <span>Test System</span>
          </div>
        </div>

        {/* Search Bar */}
       {/* Global Search Component Wrapper */}
<div className="hidden sm:block w-full max-w-sm">
  <GlobalSearch />
</div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 relative
           transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600" />
          </button>
          
          <div className="h-8 w-px bg-slate-200 my-auto mx-1" />

          {/* User Profile Avatar */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm flex items-center
             justify-center border
             border-indigo-200">
              {avatarInitials}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-slate-900">{cookies?.user_name}</p>
              <p className="text-[10px] text-slate-500">{cookies?.user_email}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">

        {/* Overlay for Mobile Sidebar */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)} 
            className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
          />
        )}

        {/* SIDEBAR */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between
          transition-transform duration-200 ease-in-out pt-16 md:pt-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          <div className="p-4 space-y-1">
            <p className="px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2">
              Menu
            </p>

            {dashboardMenuItems.map((item) => (
              <SidebarItem key={item.path} {...item} />
            ))}
          </div>

          {/* Bottom Logout Section */}
          <div className="p-4 border-t border-slate-200">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50
             transition-colors">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}


function SidebarItem({ 
  icon: Icon,
  label, 
  path,
}: { 
  icon: LucideIcon;
  label: string; 
  path: string;
}) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => `
        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
        ${isActive 
          ? "bg-indigo-50 text-indigo-600 font-semibold" 
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }
      `}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </NavLink>
  );
}