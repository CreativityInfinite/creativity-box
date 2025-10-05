# Creativity Hunt

以对话为入口，智能推荐优质 AI 工具与解决方案，助力创造力无限。

## ✨ 特性

- 🤖 **智能对话推荐** - 通过自然语言对话获得个性化 AI 工具推荐
- 🎨 **Bento Grid 布局** - 优雅的卡片式布局，展示工具信息
- 🌓 **深色/浅色主题** - 支持主题切换，适应不同使用习惯
- 📱 **响应式设计** - 完美适配桌面端、平板和移动端
- 🔍 **智能搜索** - 支持关键词搜索和标签筛选
- 🏷️ **场景导航** - 基于使用场景的快速入口
- ⚡ **无整页刷新** - 流畅的单页应用体验

## 🚀 快速开始

### 环境要求

- Node.js 18+
- pnpm

### 安装依赖

```bash
pnpm install
```

### 开发运行

```bash
pnpm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
pnpm run build
pnpm run start
```

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **组件**: shadcn/ui
- **主题**: next-themes
- **图标**: Lucide React
- **语言**: TypeScript

## 📁 项目结构

```
creativity-box/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── components/            # React组件
│   ├── ui/               # shadcn/ui组件
│   ├── bento-card.tsx    # Bento卡片组件
│   ├── chat-panel.tsx    # 对话面板
│   └── ...
├── content/              # 数据文件
│   ├── tools.json        # 工具数据
│   ├── tags.json         # 标签数据
│   └── scenes.json       # 场景数据
├── lib/                  # 工具函数
│   └── types.ts          # TypeScript类型定义
└── public/               # 静态资源
```

## 🎯 当前功能

### M1 冲刺完成功能

- ✅ 首页 Bento Grid 布局
- ✅ 对话搜索栏和聊天面板
- ✅ 场景入口卡片
- ✅ 工具卡片展示
- ✅ 主题切换
- ✅ 响应式设计
- ✅ 基础数据模型（20+工具，8+场景）

### 演示数据

项目包含 20+个 AI 工具的演示数据，涵盖：

- 聊天助手（ChatGPT、Claude 等）
- 图像生成（Midjourney、Stable Diffusion 等）
- 编程工具（GitHub Copilot、Cursor 等）
- 写作工具（Notion AI、Grammarly 等）
- 设计工具（Figma、Canva 等）
- 音频工具（ElevenLabs、Murf 等）

## 🗺️ 开发路线图

- [ ] **M2**: 工具详情页与数据模型完善
- [ ] **M3**: 搜索与推荐引擎增强
- [ ] **M4**: 多语言支持(I18N)
- [ ] **M5**: 部署与文档完善
- [ ] **M6**: 性能优化与可访问性
- [ ] **M7**: 外部 LLM 集成与向量检索

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔗 相关项目

- [Creativity Infinite](https://creativityinfinite.com) - 官方网站
- [Creativity Kits](https://github.com/creativityinfinite/creativity-kits) - 工具集合
- [Creativity Code](https://github.com/creativityinfinite/creativity-code) - 代码助手

---

**Creativity Hunt** - 让 AI 工具发现变得简单而智能 ✨
