import { useState } from "react";
import { 
  ChevronLeft, 
  Search, 
  ChevronDown, 
  ChevronRight,
  Send,
  Paperclip,
  Copy,
  Download,
  RotateCw,
  Check
} from "lucide-react";

export function AuditChat() {
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [message, setMessage] = useState("");
  const [expandedDocs, setExpandedDocs] = useState<number[]>([0]);

  const documents = [
    {
      name: "XX公司保密协议_v3.pdf",
      chunks: [
        "第一条 保密信息的定义...",
        "第三条 保密义务...",
        "第 3.2 条（第 4 页）仅约束乙方，甲方无对等保密义务",
        "第 5.1 条（第 7 页）保密期限为 10 年",
        "第 8 条（第 10 页）违约金为合同金额的 30%",
        "第六条 保密信息的使用限制...",
      ],
      highlightedChunks: [2, 3, 4]
    },
    {
      name: "财务审计底稿_2026Q1.pdf",
      chunks: [
        "审计说明 第一部分...",
        "财务数据汇总表...",
      ],
      highlightedChunks: []
    },
  ];

  const quickPrompts = [
    "检查违约责任条款",
    "提取所有金额信息",
    "对比行业标准模板",
    "生成审计摘要"
  ];

  const toggleDocExpand = (index: number) => {
    if (expandedDocs.includes(index)) {
      setExpandedDocs(expandedDocs.filter(i => i !== index));
    } else {
      setExpandedDocs([...expandedDocs, index]);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Left Panel - Document Reference */}
      <div 
        className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
          leftPanelCollapsed ? 'w-0' : 'w-[35%]'
        }`}
        style={{ overflow: leftPanelCollapsed ? 'hidden' : 'visible' }}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">文档参考</span>
          </div>
          <button 
            onClick={() => setLeftPanelCollapsed(true)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索文档内容..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D3557] focus:border-transparent"
            />
          </div>
        </div>

        {/* Document Tree */}
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-2">
            {documents.map((doc, docIndex) => (
              <div key={docIndex} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleDocExpand(docIndex)}
                  className="w-full p-3 flex items-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  {expandedDocs.includes(docIndex) ? (
                    <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  )}
                  <span className="text-sm font-medium text-gray-900 truncate">
                    📄 {doc.name}
                  </span>
                </button>
                {expandedDocs.includes(docIndex) && (
                  <div className="px-3 pb-3 space-y-1">
                    {doc.chunks.map((chunk, chunkIndex) => (
                      <div 
                        key={chunkIndex}
                        className={`p-2 text-xs text-gray-600 rounded hover:bg-gray-50 cursor-pointer transition-colors ${
                          doc.highlightedChunks.includes(chunkIndex) ? 'border-l-2 border-yellow-400 bg-yellow-50' : ''
                        }`}
                      >
                        <div className="text-gray-400 mb-1">Chunk {chunkIndex + 1}</div>
                        <div className="line-clamp-2">{chunk}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Show Panel Button (when collapsed) */}
      {leftPanelCollapsed && (
        <button
          onClick={() => setLeftPanelCollapsed(false)}
          className="w-8 bg-gray-100 hover:bg-gray-200 flex items-center justify-center border-r border-gray-200 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </button>
      )}

      {/* Right Panel - Audit Chat */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-medium text-gray-900">XX公司IPO项目NDA审查</h2>
            <span className="px-2 py-1 text-xs rounded bg-red-50 text-red-600 border border-red-200">
              核心涉密
            </span>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* User Message */}
          <div className="flex justify-end">
            <div className="max-w-[80%] bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-sm text-gray-900 whitespace-pre-line">
                请审查这份NDA中是否存在以下风险:
                {'\n'}1. 保密义务是否双向对等
                {'\n'}2. 保密期限是否合理
                {'\n'}3. 违约金条款是否明确
                {'\n'}4. 是否缺少争议解决条款
              </div>
            </div>
          </div>

          {/* AI Response */}
          <div className="flex justify-start">
            <div className="max-w-[90%] bg-white rounded-lg border border-gray-200 shadow-sm">
              {/* Progress Stepper */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-4 h-4" />
                    <span>文档检索 (2.1s)</span>
                  </div>
                  <span className="text-gray-300">→</span>
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-4 h-4" />
                    <span>实体抽取 (8.3s)</span>
                  </div>
                  <span className="text-gray-300">→</span>
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-4 h-4" />
                    <span>合规分析 (22.7s)</span>
                  </div>
                </div>
              </div>

              {/* Risk Cards */}
              <div className="p-4 space-y-4">
                {/* High Risk */}
                <div className="border-l-4 border-red-500 bg-red-50 rounded-r-lg p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-red-600 font-medium">🔴 高风险</span>
                    <h4 className="font-medium text-gray-900">保密义务不对等</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">原文定位: </span>
                      <button className="text-blue-600 hover:underline">第 3.2 条(第 4 页)</button>
                    </div>
                    <div>
                      <span className="text-gray-600">问题: </span>
                      <span className="text-gray-900">仅约束乙方,甲方无对等保密义务</span>
                    </div>
                    <div>
                      <span className="text-gray-600">建议: </span>
                      <span className="text-gray-900">增加甲方同等保密义务条款</span>
                    </div>
                  </div>
                </div>

                {/* Medium Risk */}
                <div className="border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-yellow-700 font-medium">🟡 中风险</span>
                    <h4 className="font-medium text-gray-900">保密期限偏长</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">原文定位: </span>
                      <button className="text-blue-600 hover:underline">第 5.1 条(第 7 页)</button>
                    </div>
                    <div>
                      <span className="text-gray-600">问题: </span>
                      <span className="text-gray-900">保密期限为 10 年,超出行业惯例</span>
                    </div>
                    <div>
                      <span className="text-gray-600">建议: </span>
                      <span className="text-gray-900">协商缩短至 3 年</span>
                    </div>
                  </div>
                </div>

                {/* Compliant */}
                <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-green-600 font-medium">🟢 合规</span>
                    <h4 className="font-medium text-gray-900">违约金条款明确</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">原文定位: </span>
                      <button className="text-blue-600 hover:underline">第 8 条(第 10 页)</button>
                    </div>
                    <div>
                      <span className="text-gray-600">结论: </span>
                      <span className="text-gray-900">违约金为合同金额的 30%,在合理范围内</span>
                    </div>
                  </div>
                </div>

                {/* Missing */}
                <div className="border-l-4 border-gray-400 bg-gray-50 rounded-r-lg p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-gray-600 font-medium">⚪ 缺失</span>
                    <h4 className="font-medium text-gray-900">争议解决条款缺失</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">问题: </span>
                      <span className="text-gray-900">全文未发现仲裁或诉讼管辖约定</span>
                    </div>
                    <div>
                      <span className="text-gray-600">建议: </span>
                      <span className="text-gray-900">补充争议解决方式及管辖法院</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1">
                      <Copy className="w-4 h-4" />
                      复制结论
                    </button>
                    <button className="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      导出报告
                    </button>
                    <button className="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1">
                      <RotateCw className="w-4 h-4" />
                      重新分析
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    分析耗时 33.1 秒 · 引用 12 个文本块 · 模型: Qwen2.5-7B
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white p-4">
          {/* Quick Prompts */}
          <div className="mb-3 flex flex-wrap gap-2">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                className="px-3 py-1.5 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="输入审计指令..."
                rows={2}
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#1D3557] focus:border-transparent"
              />
              <button className="absolute right-2 bottom-2 p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
            </div>
            <button 
              className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
              style={{ backgroundColor: '#1D3557' }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
