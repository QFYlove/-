import { useState } from "react";
import { Check, Upload, CloudUpload, FileText, X, Loader2 } from "lucide-react";

export function NewProjectWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("合同审查");
  const [riskLevel, setRiskLevel] = useState("重要");
  const [auditor, setAuditor] = useState("");
  const [description, setDescription] = useState("");
  const [securityLevel, setSecurityLevel] = useState<string[]>(["机密"]);

  const steps = [
    { number: 1, label: "基本信息" },
    { number: 2, label: "上传文档" },
    { number: 3, label: "配置规则" },
  ];

  const uploadedFiles = [
    { name: "XX公司保密协议_v3.pdf", size: "2.4 MB", type: "pdf", status: "completed", progress: 100 },
    { name: "财务审计底稿_2026Q1.pdf", size: "5.8 MB", type: "pdf", status: "processing", progress: 67 },
    { name: "内部通信记录.docx", size: "1.2 MB", type: "docx", status: "processing", progress: 0 },
    { name: "交易流水_汇总.xlsx", size: "3.5 MB", type: "xlsx", status: "waiting", progress: 0 },
  ];

  const getFileIcon = (type: string) => {
    return <FileText className={`w-5 h-5 ${type === 'pdf' ? 'text-red-500' : 'text-blue-500'}`} />;
  };

  const getStatusDisplay = (file: typeof uploadedFiles[0]) => {
    if (file.status === "completed") {
      return (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <Check className="w-4 h-4" />
          <span>解析完成 · 已索引 42 个文本块</span>
        </div>
      );
    } else if (file.status === "processing") {
      return (
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
          <span className="text-blue-600 text-sm">正在向量化... {file.progress}%</span>
          <div className="w-32 h-1 bg-gray-200 rounded-full ml-2">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{ width: `${file.progress}%` }}
            />
          </div>
        </div>
      );
    } else {
      return <span className="text-gray-500 text-sm">⏳ 等待处理</span>;
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">审计项目 / 新建项目</div>

      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    currentStep >= step.number
                      ? 'bg-[#1D3557] text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
                </div>
                <span className={`mt-2 text-sm ${currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-32 h-0.5 mx-4 ${currentStep > step.number ? 'bg-[#1D3557]' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                项目名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="例：XX公司IPO项目NDA审查"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D3557] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">项目类型</label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D3557] focus:border-transparent"
              >
                <option>合同审查</option>
                <option>日志审计</option>
                <option>财务审计</option>
                <option>自定义</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">风险等级</label>
              <div className="flex gap-4">
                {["一般", "重要", "核心涉密"].map((level) => (
                  <label key={level} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="riskLevel"
                      value={level}
                      checked={riskLevel === level}
                      onChange={(e) => setRiskLevel(e.target.value)}
                      className="w-4 h-4"
                      style={{ accentColor: '#1D3557' }}
                    />
                    <span className="text-sm text-gray-700">{level}</span>
                    <div 
                      className={`w-3 h-3 rounded-full ${
                        level === "一般" ? "bg-green-500" :
                        level === "重要" ? "bg-yellow-500" :
                        "bg-red-500"
                      }`}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">审计负责人</label>
              <input
                type="text"
                value={auditor}
                onChange={(e) => setAuditor(e.target.value)}
                placeholder="搜索用户名..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D3557] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">项目描述</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="可选"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D3557] focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">保密等级标签</label>
              <div className="flex gap-3">
                {["内部", "机密", "绝密"].map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      if (securityLevel.includes(level)) {
                        setSecurityLevel(securityLevel.filter(l => l !== level));
                      } else {
                        setSecurityLevel([...securityLevel, level]);
                      }
                    }}
                    className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                      securityLevel.includes(level)
                        ? level === "内部" ? "bg-blue-50 border-blue-300 text-blue-700" :
                          level === "机密" ? "bg-yellow-50 border-yellow-300 text-yellow-700" :
                          "bg-red-50 border-red-300 text-red-700"
                        : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Upload Documents */}
        {currentStep === 2 && (
          <div className="space-y-6">
            {/* Upload Dropzone */}
            <div className="border-2 border-dashed border-blue-300 rounded-lg bg-blue-50/30 p-12">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <div className="mb-2">
                  <span className="text-gray-700">拖拽文件到此处,或 </span>
                  <button className="text-blue-600 hover:underline">点击上传</button>
                </div>
                <div className="text-sm text-gray-500">
                  支持 PDF / Word / Excel / TXT,单文件最大 100MB
                </div>
              </div>
            </div>

            {/* Uploaded Files List */}
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  {getFileIcon(file.type)}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm truncate">{file.name}</div>
                    <div className="text-xs text-gray-500">{file.size}</div>
                  </div>
                  <div className="flex-1">
                    {getStatusDisplay(file)}
                  </div>
                  <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="pt-4 border-t border-gray-200 text-sm text-gray-600">
              共 4 个文件,已完成 1 个,处理中 2 个,等待中 1 个
            </div>
          </div>
        )}

        {/* Step 3: Configure Rules */}
        {currentStep === 3 && (
          <div className="text-center py-12 text-gray-500">
            规则配置页面(示意)
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
          className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          disabled={currentStep === 1}
        >
          上一步
        </button>
        <div className="flex gap-3">
          <button className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            取消
          </button>
          <button
            onClick={() => currentStep < 3 && setCurrentStep(currentStep + 1)}
            className="px-6 py-2 text-white rounded-md hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#1D3557' }}
            disabled={currentStep === 2 && uploadedFiles.some(f => f.status !== "completed")}
          >
            {currentStep === 3 ? "创建项目" : "下一步"}
          </button>
        </div>
      </div>
    </div>
  );
}
