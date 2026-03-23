## 🚀 快速开始 (Quick Start)

本项目完全基于 Docker Compose 进行容器化编排，支持一键私有化部署。

### 1. 克隆仓库

```Bash
git clone https://github.com/QFYlove/Offline-Audit-Workstation.git
cd Offline-Audit-Workstation
```
2. 准备模型权重
请确保本地已安装 Ollama 并拉取量化模型：

```Bash
ollama pull qwen2.5:7b-instruct-q4_K_M
```
3. 一键启动
```Bash
docker compose up -d
```
启动后，所有容器将被限制在 audit-internal 内部网络中，杜绝数据外泄风险。

4. 访问系统
在浏览器中打开：https://localhost:8443 开始使用。

🏗️ 系统架构
```Plaintext
用户上传文档 (PDF/Docx) 
  ├──> PyMuPDF 提取文本 & 结构化拆分
  ├──> bge-large-zh-v1.5 生成 1024 维向量
  └──> 写入本地 ChromaDB 持久化存储
  
发起审计查询 
  ├──> ChromaDB 相似度检索 (Top-K)
  └──> Qwen2.5-7B 多步子任务并行推理 (实体抽取 -> 规则比对)
       └──> WebSocket 实时流式响应至前端 Vue 界面
```
📊 评估与测试
本项目内建了自动化评估流水线，用于持续监测本地模型的分类准确率、高危召回率及实体抽取 F1 值，确保合规判定标准不退化。详见 tests/ 目录。
