# Kumo Edge Console Demo

一个使用 [Cloudflare Kumo](https://github.com/cloudflare/kumo) 构建的中文边缘服务控制台演示项目。

## 在线演示

GitHub Pages：<https://weepwood.github.io/kumo-demo/>

## 功能

- 使用 Kumo 的 `Button`、`Badge`、`Switch` 等组件构建真实产品界面
- 展示边缘服务状态、核心指标与智能策略
- 模拟生产部署进度和终端日志
- 支持桌面端、平板和移动端响应式布局
- 推送到 `main` 后自动部署至 GitHub Pages
- Pull Request 自动执行 TypeScript 检查和生产构建

## 本地运行

```bash
pnpm install
pnpm dev
```

生产构建：

```bash
pnpm build
pnpm preview
```

## 技术栈

- React 19
- TypeScript
- Vite
- `@cloudflare/kumo`
- GitHub Actions / GitHub Pages

## 说明

本项目是 Kumo 组件库的非官方演示，Cloudflare 与 Kumo 的名称及相关标识归其各自权利人所有。
