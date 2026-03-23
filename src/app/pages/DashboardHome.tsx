import { 
  FolderOpen, 
  FileCheck, 
  AlertTriangle, 
  Activity,
  ChevronRight 
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export function DashboardHome() {
  const stats = [
    { label: "进行中项目", value: "7", color: "#1D3557", icon: FolderOpen },
    { label: "本月已审文档", value: "156", color: "#2A9D8F", icon: FileCheck },
    { label: "发现高风险项", value: "23", color: "#E63946", icon: AlertTriangle },
    { label: "模型可用率", value: "99.8%", color: "#2A9D8F", icon: Activity },
  ];

  const projects = [
    { name: "XX公司IPO项目NDA审查", docs: 42, risk: "高危", status: "进行中", time: "2026-03-22 14:30" },
    { name: "2026年度财务审计", docs: 128, risk: "中危", status: "进行中", time: "2026-03-21 09:15" },
    { name: "供应商合同合规性审查", docs: 67, risk: "低危", status: "已完成", time: "2026-03-20 16:45" },
    { name: "内部管理制度审计", docs: 34, risk: "低危", status: "进行中", time: "2026-03-19 11:20" },
    { name: "关联交易专项审计", docs: 89, risk: "中危", status: "已完成", time: "2026-03-18 15:00" },
  ];

  const riskData = [
    { name: "高风险", value: 15, color: "#E63946" },
    { name: "中风险", value: 35, color: "#E9C46A" },
    { name: "低风险", value: 30, color: "#2A9D8F" },
    { name: "合规", value: 20, color: "#6B7280" },
  ];

  const getRiskBadgeStyle = (risk: string) => {
    const styles = {
      "高危": "bg-red-50 text-red-600 border-red-200",
      "中危": "bg-yellow-50 text-yellow-700 border-yellow-200",
      "低危": "bg-green-50 text-green-600 border-green-200",
    };
    return styles[risk as keyof typeof styles] || "";
  };

  const getStatusStyle = (status: string) => {
    return status === "进行中" 
      ? "text-blue-600" 
      : "text-gray-500";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                  <div 
                    className="text-3xl font-semibold"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                </div>
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: stat.color + '15' }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Projects and Risk Distribution Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">近期审计项目</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">{project.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{project.time}</div>
                  </div>
                  <div className="flex items-center gap-4 ml-4">
                    <div className="text-sm text-gray-600">{project.docs} 个文档</div>
                    <span className={`px-2 py-1 text-xs rounded border ${getRiskBadgeStyle(project.risk)}`}>
                      {project.risk}
                    </span>
                    <span className={`text-sm ${getStatusStyle(project.status)} min-w-[60px]`}>
                      {project.status}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">风险分布</h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry: any) => (
                    <span className="text-sm text-gray-700">
                      {value} {entry.payload.value}%
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* System Status Monitoring */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">系统状态监控</h3>
        </div>
        <div className="p-6 space-y-6">
          {/* GPU Memory */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">GPU 显存占用</span>
              <span className="text-gray-600">6.7GB / 8GB (83%)</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all"
                style={{ width: '83%', backgroundColor: '#E9C46A' }}
              />
            </div>
          </div>

          {/* CPU Usage */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">CPU 使用率</span>
              <span className="text-gray-600">45%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all"
                style={{ width: '45%', backgroundColor: '#2A9D8F' }}
              />
            </div>
          </div>

          {/* Disk Space */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">磁盘空间</span>
              <span className="text-gray-600">128GB / 512GB (25%)</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all"
                style={{ width: '25%', backgroundColor: '#2A9D8F' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
