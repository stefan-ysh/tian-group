# AI 论文总结功能 - 测试和部署指南

## 本地开发测试

### 1. 环境准备

```bash
# 1. 复制环境变量示例文件
cp .env.example .env.local

# 2. 编辑 .env.local 并填入你的 API 密钥
# NEXT_PUBLIC_SILICONFLOW_BASE_URL=https://api.siliconflow.cn
# NEXT_PUBLIC_SILICONFLOW_API=your_actual_api_key
# NEXT_PUBLIC_MODEL=Qwen/Qwen2.5-7B-Instruct

# 3. 安装依赖
npm install

# 4. 启动开发服务器
npm run dev
```

### 2. 功能测试

#### 测试清单

- [ ] **基本功能测试**
  - [ ] 点击魔法棒图标能打开弹窗
  - [ ] AI 总结能正常生成
  - [ ] 流式内容实时显示
  - [ ] Markdown 格式正确渲染
  - [ ] LaTeX 数学公式正确显示

- [ ] **错误处理测试**
  - [ ] 无效 API Key 时显示错误
  - [ ] 网络中断时的处理
  - [ ] 点击取消能中断请求
  - [ ] 重试按钮能重新发起请求

- [ ] **缓存测试**
  - [ ] 第一次生成正常
  - [ ] 第二次访问返回缓存内容
  - [ ] 24小时后缓存失效

- [ ] **国际化测试**
  - [ ] 中文界面显示正确
  - [ ] 英文界面显示正确
  - [ ] AI 总结语言与界面语言一致

- [ ] **响应式测试**
  - [ ] 桌面端显示正常
  - [ ] 平板端显示正常
  - [ ] 移动端显示正常

### 3. 性能测试

```bash
# 使用浏览器开发者工具监控：
# 1. Network 面板查看流式请求
# 2. Console 查看日志输出
# 3. Performance 检查渲染性能
```

## 生产环境部署

### 1. Vercel 部署

```bash
# 1. 在 Vercel 项目设置中添加环境变量
# Settings > Environment Variables

# 必需的环境变量：
# NEXT_PUBLIC_SILICONFLOW_BASE_URL
# NEXT_PUBLIC_SILICONFLOW_API
# NEXT_PUBLIC_MODEL

# 2. 部署
git push origin main  # Vercel 会自动部署
```

### 2. 其他平台部署

#### Docker 部署

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# 依赖安装
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 构建
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 设置环境变量
ARG NEXT_PUBLIC_SILICONFLOW_BASE_URL
ARG NEXT_PUBLIC_SILICONFLOW_API
ARG NEXT_PUBLIC_MODEL

ENV NEXT_PUBLIC_SILICONFLOW_BASE_URL=$NEXT_PUBLIC_SILICONFLOW_BASE_URL
ENV NEXT_PUBLIC_SILICONFLOW_API=$NEXT_PUBLIC_SILICONFLOW_API
ENV NEXT_PUBLIC_MODEL=$NEXT_PUBLIC_MODEL

RUN npm run build

# 运行
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
```

```bash
# 构建和运行
docker build -t tian-group \
  --build-arg NEXT_PUBLIC_SILICONFLOW_BASE_URL=your_url \
  --build-arg NEXT_PUBLIC_SILICONFLOW_API=your_key \
  --build-arg NEXT_PUBLIC_MODEL=your_model \
  .

docker run -p 3000:3000 tian-group
```

## 监控和维护

### 1. 日志监控

检查以下日志：

```bash
# 服务器端日志（查找 API: 开头的日志）
# - AI 请求和响应
# - 缓存命中情况
# - 错误信息

# 客户端日志（浏览器 Console）
# - 流式数据接收
# - 解析错误
# - 用户操作
```

### 2. 性能监控

关键指标：

- **API 响应时间**: 应该在 2-5 秒内开始返回流数据
- **缓存命中率**: 应该 > 50%（取决于用户行为）
- **错误率**: 应该 < 1%

### 3. 常见问题处理

#### API 配额用尽

```typescript
// 在 route.ts 中添加配额检查
if (error.message.includes('quota')) {
  return NextResponse.json(
    { error: 'API 配额已用尽，请稍后再试' },
    { status: 429 }
  );
}
```

#### 响应超时

```typescript
// 设置超时时间
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 30000); // 30秒

const response = await fetch(url, {
  signal: controller.signal,
  // ...
});

clearTimeout(timeout);
```

## 安全检查

### 1. API Key 安全

- [ ] API Key 不出现在客户端代码中
- [ ] 使用环境变量管理
- [ ] 生产环境使用不同的 Key
- [ ] 定期轮换 API Key

### 2. 内容验证

- [ ] 验证输入长度限制
- [ ] 清理 Markdown 中的恶意内容
- [ ] 限制请求频率（考虑添加 rate limiting）

### 3. CORS 配置

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'your-domain.com' },
          { key: 'Access-Control-Allow-Methods', value: 'POST' },
        ],
      },
    ];
  },
};
```

## 优化建议

### 1. 成本优化

- 使用缓存减少 API 调用
- 考虑使用更便宜的模型
- 实现请求频率限制

### 2. 性能优化

- 压缩响应数据
- 使用 CDN 加速
- 实现服务端缓存

### 3. 用户体验优化

- 添加加载进度提示
- 支持暗色主题
- 添加快捷键支持

## 回滚计划

如果功能出现严重问题：

```bash
# 1. 禁用 AI 功能
# 在代码中添加功能开关
const AI_SUMMARY_ENABLED = process.env.NEXT_PUBLIC_AI_SUMMARY_ENABLED === 'true';

# 2. 回滚到上一个版本
git revert <commit-hash>
git push origin main

# 3. 清除缓存
# 重启应用或清空缓存存储
```

## 技术支持

如遇问题，请检查：

1. [项目文档](./AI_SUMMARY_FEATURE.md)
2. [API 提供商文档](https://docs.siliconflow.cn)
3. [Next.js 文档](https://nextjs.org/docs)
4. GitHub Issues

---

**维护者**: 田甜研究组
**最后更新**: 2025-10-11
