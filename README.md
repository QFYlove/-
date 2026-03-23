# 🛡️ 高涉密离线数据审计工作站 (Offline Data Audit Workstation)

> 面向政企、金融等高涉密场景的轻量化本地 RAG 与离线大模型审计系统。

## 📖 项目简介

在金融合规审查、政企内部审计等场景中，数据出域面临严格的合规红线。本项目旨在提供一个 **100% 物理断网运行**的本地化 AI 审计解决方案。通过轻量级本地大模型（SLM）与检索增强生成（RAG）技术的结合，在常规消费级/边缘硬件上实现长文本合规逻辑的自动化审查。

👤 **作者**: 乔飞羽 

## ✨ 核心特性

* **🔒 绝对的数据合规**：所有计算（解析、Embedding、向量检索、LLM 推理）均在本地完成，支持等保三级及“零网络连接证明”的严苛环境。
* **💻 极致的低显存适配**：采用 `GGUF Q4_K_M` 量化策略，使 7B 参数模型（如 Qwen2.5-7B）能在单张 8GB 显存（如 RTX 4060 Ti）的显卡上流畅运行，单机部署成本降低 70%+。
* **🧠 多步 Prompt 链式推理 (CoT)**：通过将复杂审计任务拆解为“实体抽取 → 规则比对 → 意见生成”三个子任务，大幅降低小模型的幻觉率并提升结构化输出的稳定性。
* **⚡ 友好的弱网交互补偿**：原生支持 WebSocket 流式输出（Server-Sent Events），并结合前端骨架屏设计，有效缓解本地模型推理较慢带来的等待焦虑。

## 🛠️ 技术栈

* **前端交互**: Vue 3 + Element Plus
* **应用服务**: Python FastAPI
* **文档处理**: PyMuPDF + pdfplumber + LangChain TextSplitter
* **向量引擎**: ChromaDB (本地持久化) + `bge-large-zh-v1.5`
* **本地推理**: Ollama / llama.cpp + `Qwen2.5-7B-Instruct-Q4_K_M`
* **容器化**: Docker & Docker Compose

## 🚀 快速开始 (Quick Start)

本项目完全基于 Docker Compose 进行容器化编排，支持一键私有化部署。

### 1. 克隆仓库
```bash
git clone [https://github.com/QFYlove/Offline-Audit-Workstation.git](https://github.com/QFYlove/Offline-Audit-Workstation.git)
cd Offline-Audit-Workstation
2. 准备模型权重
请确保本地已安装 Ollama 并拉取量化模型：

Bash
ollama pull qwen2.5:7b-instruct-q4_K_M
3. 一键启动
Bash
docker compose up -d
启动后，所有容器将被限制在 audit-internal 内部网络中，杜绝数据外泄风险。

4. 访问系统
在浏览器中打开：https://localhost:8443 开始使用。

🏗️ 系统架构
Plaintext
用户上传文档 (PDF/Docx) 
  ├──> PyMuPDF 提取文本 & 结构化拆分
  ├──> bge-large-zh-v1.5 生成 1024 维向量
  └──> 写入本地 ChromaDB 持久化存储
  
发起审计查询 
  ├──> ChromaDB 相似度检索 (Top-K)
  └──> Qwen2.5-7B 多步子任务并行推理 (实体抽取 -> 规则比对)
       └──> WebSocket 实时流式响应至前端 Vue 界面
📊 评估与测试
本项目内建了自动化评估流水线，用于持续监测本地模型的分类准确率、高危召回率及实体抽取 F1 值，确保合规判定标准不退化。详见 tests/ 目录。
