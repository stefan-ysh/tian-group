# Tian Group Website

**Tian Group Website** 是一个基于 **[NextJS](https://nextjs.org/) + [Tailwind CSS](https://tailwindcss.com/)** 开发的研究组官方网站，旨在展示Tian Group的研究成果、团队成员和最新动态。

## 特点

- ✅ 使用 **Next.js** 构建的现代化网站，支持服务端渲染和静态生成
- ✅ 使用 **Tailwind CSS** 进行样式设计，支持**Dark mode**
- ✅ **统一的内容管理系统**，通过Markdown文件管理所有内容
- ✅ **可复用组件架构**，包括新闻时间线、发布内容筛选等功能
- ✅ **优化的图像处理**和**字体加载**
- ✅ **移动端响应式设计**，在各种设备上提供良好的用户体验
- ✅ **SEO友好**的内容组织和元数据管理

<br>

## 项目结构

项目的主要结构如下:

```
/
├── app/
│   ├── (group)
│   │   ├── members
│   │   └── gallery
│   ├── (publications)
│   │   └── publications
│   ├── (homepage)
│   │   └── page.js
│   ├── layout.js
│   └── loading.js
├── public/
│   └── images/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   ├── components/
│   │   ├── atoms/
│   │   ├── common/
│   │   └── widgets/
│   ├── content/
│   │   ├── publications/
│   │   ├── awards/
│   │   ├── announcements/
│   │   └── events/
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   └── config.js
├── package.json
└── tailwind.config.js
```

## 内容管理

网站的内容管理基于Markdown文件，存储在`src/content`目录下:

- **publications/**: 研究组的学术出版物
- **awards/**: 获奖信息
- **announcements/**: 公告信息
- **events/**: 活动信息

所有这些内容都会被统一处理并作为新闻(News)项展示在首页的时间线上。

## 开发指南

### 安装

```bash
# 克隆仓库
git clone https://github.com/yourusername/tian-group.git
cd tian-group

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 命令

所有命令都在项目根目录下运行:

| 命令                    | 作用                                 |
| :---------------------- | :----------------------------------- |
| `npm install`           | 安装依赖                             |
| `npm run dev`           | 启动开发服务器，默认地址`localhost:3000` |
| `npm run build`         | 构建生产版本到`./dist/`              |
| `npm run start`         | 启动生产版本服务                     |
| `npm run format`        | 使用Prettier格式化代码               |
| `npm run lint`          | 运行ESLint检查代码                   |

## 贡献指南

欢迎为Tian Group网站做出贡献。如果您有任何想法、建议或发现任何问题，请随时开启讨论、提交issue或创建pull request。

### 贡献内容的一般步骤

1. Fork 这个仓库
2. 创建一个新的分支 (`git checkout -b feature/your-feature`)
3. 提交您的更改 (`git commit -m 'Add some feature'`)
4. 推送到您创建的分支 (`git push origin feature/your-feature`)
5. 创建一个Pull Request

### 添加新的出版物或其他内容

1. 在相应的目录(如`src/content/publications/`)中创建新的Markdown文件
2. 使用正确的frontmatter格式添加元数据
3. 撰写内容主体
4. 提交更改并创建Pull Request

## 许可证

本项目采用MIT许可证 - 详见LICENSE文件
