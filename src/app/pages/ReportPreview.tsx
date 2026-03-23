import { useState } from "react";
import { ChevronLeft, ChevronRight, Printer, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

export function ReportPreview() {
  const [format, setFormat] = useState<"pdf" | "excel" | "word">("pdf");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const riskData = [
    { name: "高风险", value: 1, color: "#E63946" },
    { name: "中风险", value: 1, color: "#E9C46A" },
    { name: "合规", value: 1, color: "#2A9D8F" },
    { name: "缺失", value: 1, color: "#6B7280" },
  ];

  const auditItems = [
    {
      index: 1,
      risk: "高风险",
      title: "保密义务不对等",
      quote: "第 3.2 条：乙方应对甲方提供的所有信息承担保密义务，保密期限为合同终止后十年。",
      analysis: "该条款仅约束乙方承担保密义务，而未对甲方设定相应的保密责任。这种单方面的保密义务约定在法律上可能被认定为显失公平，不符合合同对等原则。",
      suggestion: "建议在合同中增加甲方的对等保密义务条款，明确双方均应对在合作过程中获知的对方商业秘密承担同等的保密责任。"
    },
    {
      index: 2,
      risk: "中风险",
      title: "保密期限偏长",
      quote: "第 5.1 条：保密期限为合同终止后十年。",
      analysis: "十年的保密期限显著超出行业惯例（通常为3-5年）。过长的保密期限可能给乙方带来不合理的持续性负担，并可能影响其正常业务开展。",
      suggestion: "建议将保密期限协商调整为合同终止后3年，既能保护商业秘密，又符合行业惯例。"
    },
    {
      index: 3,
      risk: "合规",
      title: "违约金条款明确",
      quote: "第 8 条：任何一方违反本协议的保密条款，应向守约方支付相当于合同金额30%的违约金。",
      analysis: "违约金条款设定明确，比例为合同金额的30%，在司法实践中通常被认定为合理范围内（一般不超过合同金额的30%）。该条款具有可执行性。",
      suggestion: "该条款符合法律规定，建议保持。"
    },
  ];

  const getRiskBadge = (risk: string) => {
    const styles = {
      "高风险": "bg-red-50 text-red-600 border-red-300",
      "中风险": "bg-yellow-50 text-yellow-700 border-yellow-300",
      "合规": "bg-green-50 text-green-600 border-green-300",
      "缺失": "bg-gray-50 text-gray-600 border-gray-300",
    };
    return styles[risk as keyof typeof styles] || "";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">
        审计报告 / XX公司IPO项目NDA审查 - 审计报告
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between">
          {/* Format Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 mr-2">导出格式</span>
            <div className="inline-flex rounded-lg border border-gray-300 bg-white">
              <button
                onClick={() => setFormat("pdf")}
                className={`px-4 py-2 text-sm rounded-l-lg transition-colors ${
                  format === "pdf"
                    ? "bg-[#1D3557] text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                PDF
              </button>
              <button
                onClick={() => setFormat("excel")}
                className={`px-4 py-2 text-sm border-x border-gray-300 transition-colors ${
                  format === "excel"
                    ? "bg-[#1D3557] text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Excel
              </button>
              <button
                onClick={() => setFormat("word")}
                className={`px-4 py-2 text-sm rounded-r-lg transition-colors ${
                  format === "word"
                    ? "bg-[#1D3557] text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Word
              </button>
            </div>
          </div>

          {/* Page Indicator */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-sm text-gray-700">
              第 {currentPage} 页 / 共 {totalPages} 页
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Printer className="w-4 h-4" />
              打印
            </button>
            <button 
              className="px-4 py-2 text-white rounded hover:opacity-90 transition-opacity flex items-center gap-2"
              style={{ backgroundColor: '#1D3557' }}
            >
              <Download className="w-4 h-4" />
              下载
            </button>
          </div>
        </div>
      </div>

      {/* Report Preview */}
      <div className="max-w-[900px] mx-auto">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-12" style={{ aspectRatio: '210/297' }}>
          {/* Report Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-6">
              <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                LOGO
              </div>
              <div className="px-4 py-2 border-2 border-red-600 text-red-600 font-medium rounded">
                【机密】
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
              合同合规审计报告
            </h1>

            {/* Info Table */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm border-t border-b border-gray-300 py-4">
              <div className="flex">
                <span className="text-gray-600 w-24">项目名称:</span>
                <span className="text-gray-900 font-medium">XX公司IPO项目NDA审查</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-24">审计日期:</span>
                <span className="text-gray-900">2026年3月23日</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-24">审计人员:</span>
                <span className="text-gray-900">张三</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-24">文档数量:</span>
                <span className="text-gray-900">4 份</span>
              </div>
              <div className="flex col-span-2">
                <span className="text-gray-600 w-24">报告编号:</span>
                <span className="text-gray-900">AUDIT-2026-0323-001</span>
              </div>
            </div>
          </div>

          {/* Section 1: Summary */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">
              一、审计概要
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              本次审计针对XX公司IPO项目相关的保密协议（NDA）进行了全面的合规性审查。
              审计过程中运用AI智能分析技术，对协议条款进行了逐项审查，重点关注保密义务对等性、
              期限合理性、违约责任明确性及争议解决机制完整性。经审计，共发现1项高风险问题、
              1项中风险问题、1项合规条款，以及1项缺失条款，具体情况详见下文。
            </p>
          </div>

          {/* Section 2: Risk Overview Chart */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">
              二、风险总览
            </h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskData} layout="vertical">
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={80} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Section 3: Detailed Audit Results */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300">
              三、逐项审计结论
            </h2>
            <div className="space-y-6">
              {auditItems.map((item) => (
                <div key={item.index} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-900 font-medium">{item.index}.</span>
                    <span className={`px-2 py-1 text-xs rounded border ${getRiskBadge(item.risk)}`}>
                      {item.risk}
                    </span>
                    <span className="font-medium text-gray-900">{item.title}</span>
                  </div>
                  
                  <div className="ml-6 text-sm space-y-2">
                    <div>
                      <span className="font-medium text-gray-700">合同原文:</span>
                      <div className="mt-1 p-3 bg-gray-50 border-l-4 border-gray-300 text-gray-600 italic">
                        {item.quote}
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-700">问题分析:</span>
                      <p className="mt-1 text-gray-600 leading-relaxed">{item.analysis}</p>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-700">修改建议:</span>
                      <p className="mt-1 text-gray-600 leading-relaxed">{item.suggestion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-300 flex justify-between text-xs text-gray-500">
            <span>本报告由离线审计工作站自动生成 · 仅供内部参考</span>
            <span>第 {currentPage} 页</span>
          </div>
        </div>
      </div>
    </div>
  );
}
