import { useState } from "react";
import { 
  ChevronLeft, 
  Search, 
  ChevronDown, 
  ChevronRight,
  Send,
  Paperclip,
  StopCircle,
  Check,
  Loader2
} from "lucide-react";

export function AuditChatStreaming() {
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

          {/* AI Response - Streaming */}
          <div className="flex justify-start">
            <div className="max-w-[90%] bg-white rounded-lg border border-gray-200 shadow-sm">
              {/* Progress Stepper */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2 text-sm mb-3">
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
                  <div className="flex items-center gap-1 text-blue-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>合规分析中...</span>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: '67%' }}
                  />
                </div>
              </div>

              {/* Intermediate Results */}
              <div className="p-4 bg-blue-50 border-b border-blue-200">
                <div className="text-sm text-gray-700 mb-2">
                  已检索 12 个相关段落 · 识别到 6 个关键实体
                </div>
                <details className="text-xs">
                  <summary className="cursor-pointer text-blue-600 hover:underline">
                    查看已抽取的实体
                  </summary>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-white rounded border border-gray-200">保密期限=10年</span>
                    <span className="px-2 py-1 bg-white rounded border border-gray-200">违约金=合同金额30%</span>
                    <span className="px-2 py-1 bg-white rounded border border-gray-200">甲方=XX科技</span>
                    <span className="px-2 py-1 bg-white rounded border border-gray-200">乙方=XX证券</span>
                  </div>
                </details>
              </div>

              {/* Risk Cards - Partially Generated */}
              <div className="p-4 space-y-4">
                {/* High Risk - Complete */}
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

                {/* Medium Risk - Complete */}
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

                {/* Compliant - Being Generated */}
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
                      <span className="text-gray-900">违约金为合同金额的 30%,在合理范围<span className="inline-block w-0.5 h-4 bg-gray-900 animate-pulse ml-0.5" /></span>
                    </div>
                  </div>
                </div>

                {/* Skeleton Placeholders */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-[85%]" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-[60%]" />
                </div>
              </div>

              {/* Status Bar */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>⏳ 正在生成审计意见... 预计剩余 12 秒</span>
                  </div>
                  <button className="px-3 py-1.5 text-sm text-red-600 bg-white border border-red-300 rounded hover:bg-red-50 transition-colors flex items-center gap-1">
                    <StopCircle className="w-4 h-4" />
                    停止生成
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area - Disabled During Generation */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="输入审计指令..."
                rows={2}
                disabled
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg resize-none bg-gray-100 text-gray-400 cursor-not-allowed"
              />
              <button className="absolute right-2 bottom-2 p-2 text-gray-300 cursor-not-allowed">
                <Paperclip className="w-5 h-5" />
              </button>
            </div>
            <button 
              disabled
              className="px-6 py-2 text-white rounded-lg opacity-50 cursor-not-allowed flex items-center justify-center"
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
