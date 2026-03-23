import { Shield, User, Lock, Database, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Dark Navy with Security Illustration */}
      <div className="w-[55%] relative overflow-hidden" style={{ backgroundColor: '#1D3557' }}>
        {/* Circuit Board Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M10 10h20v20h-20z M40 40h20v20h-20z M70 10h20v20h-20z M10 70h20v20h-20z" 
                      stroke="white" strokeWidth="1" fill="none"/>
                <circle cx="20" cy="20" r="2" fill="white"/>
                <circle cx="50" cy="50" r="2" fill="white"/>
                <circle cx="80" cy="20" r="2" fill="white"/>
                <circle cx="20" cy="80" r="2" fill="white"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>

        {/* Logo and Title */}
        <div className="absolute top-12 left-12 flex items-center gap-3 z-10">
          <Shield className="w-10 h-10 text-white" strokeWidth={1.5} />
          <span className="text-white text-2xl font-medium">离线数据审计工作站</span>
        </div>

        {/* Large Shield Icon */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Shield className="w-80 h-80 text-white opacity-10" strokeWidth={0.5} />
        </div>

        {/* Feature Badges */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-12 z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <span className="text-white/90 text-sm">物理断网运行</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Database className="w-8 h-8 text-white" />
            </div>
            <span className="text-white/90 text-sm">数据本地存储</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <span className="text-white/90 text-sm">全程审计追溯</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-[45%] bg-white flex items-center justify-center px-16">
        <div className="w-full max-w-md">
          {/* Login Form Card */}
          <div className="space-y-8">
            {/* Title */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 justify-center">
                <Lock className="w-6 h-6" style={{ color: '#1D3557' }} />
                <h2 className="text-2xl" style={{ color: '#1D3557' }}>安全登录</h2>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <label className="text-sm text-gray-700">用户名</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D3557] focus:border-transparent"
                    placeholder="请输入用户名"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm text-gray-700">密码</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D3557] focus:border-transparent"
                    placeholder="请输入密码"
                  />
                </div>
              </div>

              {/* Remember */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300"
                  style={{ accentColor: '#1D3557' }}
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                  记住本次登录
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 text-white rounded-md transition-colors hover:opacity-90"
                style={{ backgroundColor: '#1D3557' }}
              >
                登 录
              </button>

              {/* Notice */}
              <p className="text-xs text-gray-500 text-center">
                本系统仅限授权人员在内网环境中使用
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
