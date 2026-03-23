import { Outlet, useNavigate, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  FolderOpen, 
  FileText, 
  MessageSquare, 
  FileBarChart, 
  Settings, 
  Bell, 
  User,
  Shield,
  Menu
} from "lucide-react";
import { useState } from "react";

export function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "工作台", path: "/dashboard" },
    { icon: FolderOpen, label: "审计项目", path: "/dashboard/projects" },
    { icon: FileText, label: "文档管理", path: "/dashboard/documents" },
    { icon: MessageSquare, label: "智能审计", path: "/dashboard/audit-chat" },
    { icon: FileBarChart, label: "审计报告", path: "/dashboard/report" },
    { icon: Settings, label: "系统设置", path: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Left Sidebar */}
      <div 
        className="flex flex-col transition-all duration-300"
        style={{ 
          width: collapsed ? '64px' : '240px',
          backgroundColor: '#1D3557' 
        }}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Shield className="w-6 h-6 text-white flex-shrink-0" />
          {!collapsed && (
            <span className="ml-3 text-white font-medium">审计工作站</span>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full h-12 flex items-center px-6 text-white/90 hover:bg-white/5 transition-colors relative ${
                  isActive ? 'bg-white/10' : ''
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />
                )}
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="ml-3 text-sm">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* System Status */}
        {!collapsed && (
          <div className="p-6 border-t border-white/10">
            <div className="flex items-start gap-2 text-xs text-white/70">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-1 flex-shrink-0" />
              <div>
                <div>系统运行正常</div>
                <div className="mt-1">模型: Qwen2.5-7B ✓</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div className="text-sm text-gray-600">
              工作台 / 首页
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-md transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-sm text-gray-700">张三 · 合规审计员</span>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="py-3 text-center text-xs text-gray-400 border-t border-gray-200 bg-white">
          本系统运行于离线环境 · 数据不出域
        </div>
      </div>
    </div>
  );
}
