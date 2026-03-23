# Figma 原型设计提示词 — 高涉密离线数据审计工作站

> 以下提示词按页面/组件拆分，可逐条喂给 Figma AI 或作为设计规范使用。

---

## 全局设计规范提示词

```
Design a enterprise-grade B2B desktop web application called "高涉密离线数据审计工作站" (Offline Data Audit Workstation).

Design system requirements:
- Style: Clean, professional, government/finance enterprise aesthetic. No playful elements.
- Primary color: #1D3557 (dark navy blue, conveys trust and security)
- Accent color: #E63946 (alert red, for high-risk indicators only)
- Success color: #2A9D8F (teal green)
- Warning color: #E9C46A (amber)
- Background: #F8F9FA (light gray), Cards: #FFFFFF
- Typography: System font stack, Chinese-friendly (PingFang SC / Microsoft YaHei)
- Border radius: 6px (subtle rounding, not playful)
- Spacing unit: 8px grid
- Min viewport: 1440x900 (desktop only, no mobile)
- Layout: Left sidebar navigation (240px collapsed/64px) + main content area
- Dark header bar with a shield/lock icon in the logo area to emphasize security
- Every page footer shows: "本系统运行于离线环境 · 数据不出域" in muted text
```

---

## 页面 1：登录页

```
Design a login page for a high-security offline audit workstation.

Layout:
- Full-screen split: left 55% illustration area (dark navy #1D3557 background with subtle circuit-board pattern and a large shield icon), right 45% login form on white.
- Top-left corner: product logo + name "离线数据审计工作站" in white on the dark side.
- Center of right panel: login form card.

Login form contains:
- Title: "安全登录" with a lock icon
- Input field: "用户名" with user icon prefix
- Input field: "密码" with lock icon prefix
- A checkbox: "记住本次登录"
- Primary button: "登 录" (full width, navy blue #1D3557)
- Below the button, small muted text: "本系统仅限授权人员在内网环境中使用"

Bottom of the dark left panel:
- Three small icon+text badges in a row:
  1. Shield icon + "物理断网运行"
  2. Database icon + "数据本地存储"
  3. Lock icon + "全程审计追溯"

No "forgot password" or "register" links — this is an admin-provisioned system.
```

---

## 页面 2：工作台首页（Dashboard）

```
Design a dashboard home page for an offline document audit system.

Top bar (64px height, white, bottom shadow):
- Left: Hamburger menu icon + breadcrumb "工作台 / 首页"
- Center: Empty
- Right: Bell notification icon (with red dot badge "3"), user avatar + name "张三 · 合规审计员", settings gear icon

Left sidebar (240px, dark navy #1D3557):
- Logo area at top: shield icon + "审计工作站" in white
- Navigation items (white text, 48px height each, with icons):
  1. 📊 工作台 (active state: left 3px white border + slightly lighter background)
  2. 📁 审计项目
  3. 📄 文档管理
  4. 💬 智能审计
  5. 📋 审计报告
  6. ⚙️ 系统设置
- Bottom of sidebar: system status indicator — a small green dot + "系统运行正常" + "模型: Qwen2.5-7B ✓"

Main content area (padding 24px):

Row 1 — Four stat cards in a horizontal row (equal width):
  Card 1: "进行中项目" big number "7" with a blue icon
  Card 2: "本月已审文档" big number "156" with a green icon
  Card 3: "发现高风险项" big number "23" with a red icon and red text
  Card 4: "模型可用率" big number "99.8%" with a teal icon

Row 2 — Two cards side by side (60% / 40% split):
  Left card: "近期审计项目" — a table with columns: 项目名称, 文档数, 风险等级(shown as colored badges: 高危=red, 中危=amber, 低危=green), 状态(进行中/已完成), 更新时间. Show 5 sample rows.
  Right card: "风险分布" — a donut chart showing risk distribution: 高风险 15%, 中风险 35%, 低风险 30%, 合规 20%. Use the red/amber/green/teal color scheme.

Row 3 — One full-width card:
  "系统状态监控" — three horizontal progress bars:
  - GPU 显存占用: 6.7GB / 8GB (83%, amber color)
  - CPU 使用率: 45% (green)
  - 磁盘空间: 128GB / 512GB (25%, green)
```

---

## 页面 3：新建审计项目

```
Design a "create new audit project" page as a step wizard form.

Top: breadcrumb "审计项目 / 新建项目"

A horizontal step indicator at the top of the content area with 3 steps:
  Step 1: "基本信息" (active, navy blue circle with number)
  Step 2: "上传文档" (inactive, gray)
  Step 3: "配置规则" (inactive, gray)
Connected by lines between circles.

Step 1 content (shown as active):
A white card form with the following fields:
- 项目名称 (text input, required asterisk, placeholder: "例：XX公司IPO项目NDA审查")
- 项目类型 (dropdown select: 合同审查 / 日志审计 / 财务审计 / 自定义)
- 风险等级 (radio buttons: 一般 / 重要 / 核心涉密, with colored indicators)
- 审计负责人 (text input with user search autocomplete)
- 项目描述 (textarea, 3 rows, optional)
- 保密等级标签 (tag selector: 内部 / 机密 / 绝密, displayed as colored tags)

Bottom right: "下一步" primary button (navy blue) + "取消" ghost button on the left.
```

---

## 页面 4：文档上传与解析状态

```
Design a document upload page that shows processing status for an offline audit system.

This is Step 2 of the project creation wizard (step indicator shows step 2 active).

Main content card:

Top section — Upload area:
- A large dashed-border dropzone (height 200px, light blue-gray background)
- Center icon: cloud-upload icon (but styled as a local folder icon since this is offline)
- Text: "拖拽文件到此处，或 点击上传" (点击上传 is a blue text link)
- Sub-text: "支持 PDF / Word / Excel / TXT，单文件最大 100MB"

Below the dropzone — Uploaded files list:
Show 4 sample files in a list, each row contains:
- File type icon (PDF icon in red, DOCX icon in blue)
- File name (truncated with ellipsis if too long)
- File size (e.g., "2.4 MB")
- Processing status with different states:
  Row 1: "XX公司保密协议_v3.pdf" — Status: ✅ "解析完成 · 已索引 42 个文本块" (green text)
  Row 2: "财务审计底稿_2026Q1.pdf" — Status: 🔄 "正在向量化... 67%" with a small progress bar (blue)
  Row 3: "内部通信记录.docx" — Status: 🔄 "正在提取文本..." with a spinning indicator
  Row 4: "交易流水_汇总.xlsx" — Status: ⏳ "等待处理" (gray text)
- Each row has a delete (trash) icon button on the far right

Bottom summary bar:
- Left: "共 4 个文件，已完成 1 个，处理中 2 个，等待中 1 个"
- Right: "上一步" ghost button + "下一步" primary button (disabled/grayed out until all files processed)
```

---

## 页面 5：智能审计对话界面（核心页面）

```
Design the main AI-powered audit chat interface. This is the most important page.

Layout: Two-panel layout.
- Left panel (35% width): Document reference panel
- Right panel (65% width): Chat/audit conversation panel
- A vertical draggable divider between them.

LEFT PANEL — Document Reference:
- Header: "文档参考" with a document icon, and a collapse button (chevron-left)
- Below header: a search input "搜索文档内容..."
- Document tree/list showing uploaded files as expandable items:
  - 📄 XX公司保密协议_v3.pdf
    - Chunk 1: "第一条 保密信息的定义..."  (truncated preview)
    - Chunk 2: "第三条 保密义务..."
    - ... (show 6-8 chunks)
  - 📄 财务审计底稿_2026Q1.pdf
    - ...
- When a chunk is referenced in the chat, it highlights with a yellow left border

RIGHT PANEL — Audit Chat:
- Header: project name "XX公司IPO项目NDA审查" with a tag "核心涉密" in red

Chat area (scrollable):

Message 1 — User message (right-aligned, light blue bubble):
"请审查这份NDA中是否存在以下风险：
1. 保密义务是否双向对等
2. 保密期限是否合理
3. 违约金条款是否明确
4. 是否缺少争议解决条款"

Message 2 — System response (left-aligned, white card with subtle shadow):

At the top of the response, a progress stepper (horizontal, compact):
  ✅ 文档检索 (2.1s) → ✅ 实体抽取 (8.3s) → ✅ 合规分析 (22.7s)

Then the structured audit result, displayed as colored cards/sections:

🔴 高风险 Card (left red border, light red background #FFF5F5):
  Title: "保密义务不对等"
  原文定位: "第 3.2 条（第 4 页）" — clickable link that highlights left panel
  问题: "仅约束乙方，甲方无对等保密义务"
  建议: "增加甲方同等保密义务条款"

🟡 中风险 Card (left amber border, light yellow background #FFFBEB):
  Title: "保密期限偏长"
  原文定位: "第 5.1 条（第 7 页）"
  问题: "保密期限为 10 年，超出行业惯例"
  建议: "协商缩短至 3 年"

🟢 合规 Card (left green border, light green background #F0FFF4):
  Title: "违约金条款明确"
  原文定位: "第 8 条（第 10 页）"
  结论: "违约金为合同金额的 30%，在合理范围内"

⚪ 缺失 Card (left gray border, light gray background #F7FAFC):
  Title: "争议解决条款缺失"
  问题: "全文未发现仲裁或诉讼管辖约定"
  建议: "补充争议解决方式及管辖法院"

Below the result cards:
- A row of action buttons: "📋 复制结论" "📥 导出报告" "🔄 重新分析" (ghost button style)
- Small text: "分析耗时 33.1 秒 · 引用 12 个文本块 · 模型: Qwen2.5-7B"

Chat input area (bottom, fixed):
- A textarea input (2 rows, expandable) with placeholder "输入审计指令..."
- Right side of input: Send button (navy blue, arrow-up icon)
- Left side of input: attachment (paperclip) icon + "快捷指令" dropdown button
- Above the input: suggested quick prompts as clickable chips:
  "检查违约责任条款" "提取所有金额信息" "对比行业标准模板" "生成审计摘要"
```

---

## 页面 6：审计进行中状态（流式输出 + 骨架屏）

```
Design the "audit in progress" state of the chat interface, showing streaming output with skeleton loading.

Same layout as the chat page, but the latest AI response is in a "generating" state:

The response card shows:

Progress stepper (horizontal):
  ✅ 文档检索 (2.1s) → ✅ 实体抽取 (8.3s) → 🔄 合规分析中...
  Below the stepper: a thin progress bar at 67%, animated.

中间结果预览 (already visible):
- A small info box: "已检索 12 个相关段落 · 识别到 6 个关键实体"
- A collapsed/expandable section "查看已抽取的实体" showing:
  保密期限=10年 | 违约金=合同金额30% | 甲方=XX科技 | 乙方=XX证券

Below that — the streaming text area:
- First two risk cards are fully rendered (same as page 5)
- The third card is partially rendered — text is appearing character by character with a blinking cursor at the end
- Below the cursor: 2-3 skeleton placeholder lines (gray animated pulse rectangles, varying widths: 100%, 85%, 60%) representing content not yet generated

Bottom status line:
- "⏳ 正在生成审计意见... 预计剩余 12 秒"
- A "⏹ 停止生成" button (red ghost button)

The send button in the input area is disabled/grayed during generation.
```

---

## 页面 7：审计报告导出预览

```
Design an audit report preview/export page.

Top bar: breadcrumb "审计报告 / XX公司IPO项目NDA审查 - 审计报告"

Layout: Centered content area (max-width 900px) styled like a print-ready document preview, with a toolbar above it.

Toolbar (horizontal, above the preview):
- Left: "导出格式" segmented control: [PDF] [Excel] [Word] (PDF selected)
- Center: page indicator "第 1 页 / 共 3 页" with prev/next arrows
- Right: "🖨️ 打印" button + "📥 下载" primary button

Report preview (white card with subtle page shadow, A4 aspect ratio):

Report header:
- Top-left: company logo placeholder
- Top-right: 密级标签 "【机密】" in red bordered box
- Title: "合同合规审计报告" (centered, large bold)
- Subtitle table with: 项目名称, 审计日期, 审计人员, 文档数量, 报告编号

Report body:
- Section 1: "审计概要" — a brief paragraph summary
- Section 2: "风险总览" — a horizontal bar chart showing 1 高风险, 1 中风险, 1 合规, 1 缺失
- Section 3: "逐项审计结论" — structured entries matching the chat results:
  Each entry has: 序号, 风险等级(colored badge), 问题标题, 合同原文引用(in a quoted gray box), 问题分析, 修改建议
- Footer of each page: "本报告由离线审计工作站自动生成 · 仅供内部参考" + page number

The preview should look like a real professional audit document, clean and print-ready.
```

---

## 页面 8：系统设置页

```
Design a system settings page for the offline audit workstation.

Left sidebar navigation shows "系统设置" as active.

Main content: A vertical tab layout on the left (200px) + settings content on the right.

Vertical tabs:
1. 模型管理 (active)
2. 用户管理
3. 审计规则
4. 系统日志
5. 关于系统

Tab 1 — 模型管理 content:

Section: "推理模型"
A card showing the currently active model:
- Model name: "Qwen2.5-7B-Instruct" with a green "运行中" badge
- Details grid: 量化格式: Q4_K_M | 显存占用: 5.5 GB | 参数量: 7.6B | 上下文长度: 32K
- Performance stats: 平均推理速度: 22 tokens/s | 今日调用次数: 347
- Action buttons: "重启模型" (ghost) + "切换模型" (ghost)

Section: "Embedding 模型"
Similar card for: "bge-large-zh-v1.5" with green "运行中" badge
- 维度: 1024 | 显存占用: 1.2 GB

Section: "硬件状态"
Three horizontal bars:
- GPU: NVIDIA RTX 4060 Ti — 显存 6.7/8.0 GB (progress bar, amber at 83%)
- RAM: 18.4/32.0 GB (progress bar, green)
- Disk: 127/512 GB (progress bar, green)

Section: "模型仓库（本地）"
A table listing locally available models:
| 模型名称 | 参数量 | 格式 | 大小 | 状态 |
| Qwen2.5-7B-Instruct | 7.6B | Q4_K_M | 4.5 GB | 运行中 🟢 |
| GLM-4-9B-Chat | 9.4B | Q4_K_M | 6.2 GB | 已下载 ⚪ |
| Llama-3.1-8B | 8.0B | Q4_K_M | 5.1 GB | 已下载 ⚪ |
Each row has a "加载" button (for inactive models) or "卸载" button (for active).
```

---

## 组件：空状态与引导

```
Design empty state illustrations for:

1. "暂无审计项目" — A simple line illustration of an empty folder with a magnifying glass. Below: "还没有审计项目" subtext "点击「新建项目」开始您的第一次审计" and a "新建项目" primary button.

2. "暂无对话记录" — A simple line illustration of a chat bubble with a sparkle icon. Below: "开始智能审计" subtext "上传文档后，在这里与AI审计助手对话" and suggested prompt chips below.

Style: Minimal line art, using only navy blue (#1D3557) and light gray. No colorful illustrations. Professional and understated.
```

---

## 交互原型连线说明

```
Prototype flow connections for Figma:

1. Login → [点击"登录"] → Dashboard (with fade transition)
2. Dashboard → [点击侧栏"审计项目"] → Project List
3. Dashboard → [点击"新建项目"按钮] → New Project Wizard Step 1
4. New Project Step 1 → [点击"下一步"] → Step 2 (Upload) with slide-left transition
5. Upload Step 2 → [文件处理完成后点击"下一步"] → Step 3 (Rules Config)
6. Step 3 → [点击"创建项目"] → Chat Interface (smart animate)
7. Chat Interface → [用户发送消息] → Streaming State (dissolve transition)
8. Streaming State → [生成完成] → Full Result State
9. Chat Interface → [点击"导出报告"] → Report Preview (overlay panel, slide from right)
10. Sidebar → [点击"系统设置"] → Settings Page

Transition defaults: 300ms ease-in-out, smart animate where possible.
```
