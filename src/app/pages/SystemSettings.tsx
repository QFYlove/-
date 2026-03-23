import { useState } from "react";
import { Activity, HardDrive, Cpu, PlayCircle, StopCircle } from "lucide-react";

export function SystemSettings() {
  const [activeTab, setActiveTab] = useState("model");

  const tabs = [
    { id: "model", label: "模型管理" },
    { id: "users", label: "用户管理" },
    { id: "rules", label: "审计规则" },
    { id: "logs", label: "系统日志" },
    { id: "about", label: "关于系统" },
  ];

  const localModels = [
    { name: "Qwen2.5-7B-Instruct", params: "7.6B", format: "Q4_K_M", size: "4.5 GB", status: "running" },
    { name: "GLM-4-9B-Chat", params: "9.4B", format: "Q4_K_M", size: "6.2 GB", status: "downloaded" },
    { name: "Llama-3.1-8B", params: "8.0B", format: "Q4_K_M", size: "5.1 GB", status: "downloaded" },
  ];

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Vertical Tabs */}
      <div className="w-[200px] bg-white border-r border-gray-200 p-4">
        <div className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full px-4 py-2 text-left text-sm rounded transition-colors ${
                activeTab === tab.id
                  ? "bg-[#1D3557] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-50 overflow-auto">
        <div className="p-6">
          {/* Model Management Tab */}
          {activeTab === "model" && (
            <div className="space-y-6">
              {/* Inference Model Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">推理模型</h3>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <h4 className="text-xl font-medium text-gray-900">Qwen2.5-7B-Instruct</h4>
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded border border-green-300">
                          运行中
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-6 text-sm">
                        <div>
                          <span className="text-gray-600">量化格式:</span>
                          <span className="ml-2 text-gray-900 font-medium">Q4_K_M</span>
                        </div>
                        <div>
                          <span className="text-gray-600">显存占用:</span>
                          <span className="ml-2 text-gray-900 font-medium">5.5 GB</span>
                        </div>
                        <div>
                          <span className="text-gray-600">参数量:</span>
                          <span className="ml-2 text-gray-900 font-medium">7.6B</span>
                        </div>
                        <div>
                          <span className="text-gray-600">上下文长度:</span>
                          <span className="ml-2 text-gray-900 font-medium">32K</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="text-xs text-gray-600">平均推理速度</div>
                        <div className="text-lg font-medium text-gray-900">22 tokens/s</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="text-xs text-gray-600">今日调用次数</div>
                        <div className="text-lg font-medium text-gray-900">347</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                      重启模型
                    </button>
                    <button className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                      切换模型
                    </button>
                  </div>
                </div>
              </div>

              {/* Embedding Model Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Embedding 模型</h3>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <h4 className="text-xl font-medium text-gray-900">bge-large-zh-v1.5</h4>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded border border-green-300">
                      运行中
                    </span>
                  </div>
                  <div className="flex gap-8 text-sm">
                    <div>
                      <span className="text-gray-600">维度:</span>
                      <span className="ml-2 text-gray-900 font-medium">1024</span>
                    </div>
                    <div>
                      <span className="text-gray-600">显存占用:</span>
                      <span className="ml-2 text-gray-900 font-medium">1.2 GB</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hardware Status Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">硬件状态</h3>
                <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                  {/* GPU */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">GPU: NVIDIA RTX 4060 Ti</span>
                      </div>
                      <span className="text-sm text-gray-600">显存 6.7/8.0 GB</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ width: '83%', backgroundColor: '#E9C46A' }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-right text-gray-500">83%</div>
                  </div>

                  {/* RAM */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">RAM</span>
                      </div>
                      <span className="text-sm text-gray-600">18.4/32.0 GB</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ width: '57%', backgroundColor: '#2A9D8F' }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-right text-gray-500">57%</div>
                  </div>

                  {/* Disk */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">Disk</span>
                      </div>
                      <span className="text-sm text-gray-600">127/512 GB</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ width: '25%', backgroundColor: '#2A9D8F' }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-right text-gray-500">25%</div>
                  </div>
                </div>
              </div>

              {/* Local Model Repository */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">模型仓库(本地)</h3>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          模型名称
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          参数量
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          格式
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          大小
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          状态
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {localModels.map((model, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{model.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{model.params}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{model.format}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{model.size}</td>
                          <td className="px-6 py-4">
                            {model.status === "running" ? (
                              <span className="flex items-center gap-1.5 text-sm text-green-600">
                                <span className="w-2 h-2 bg-green-500 rounded-full" />
                                运行中
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                                <span className="w-2 h-2 bg-gray-400 rounded-full" />
                                已下载
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {model.status === "running" ? (
                              <button className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1">
                                <StopCircle className="w-4 h-4" />
                                卸载
                              </button>
                            ) : (
                              <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                <PlayCircle className="w-4 h-4" />
                                加载
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Other Tabs Placeholder */}
          {activeTab !== "model" && (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center text-gray-500">
              {tabs.find(t => t.id === activeTab)?.label} 页面(示意)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
