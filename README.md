# Hello World · Vercel

一个可以直接部署到 Vercel 的极简项目：静态首页 + 一个 Serverless 接口。

## 目录结构

```
.
├── index.html        # 首页
├── styles.css        # 样式
├── script.js         # 前端逻辑（含调用 /api/hello）
├── api/
│   └── hello.js      # Vercel Serverless Function → /api/hello
├── vercel.json       # Vercel 项目配置
├── package.json      # scripts
└── .gitignore
```

## 本地运行

推荐用 Vercel CLI 跑，能把 `/api` 接口一起模拟：

```bash
npm install -g vercel   # 已装过可跳过
vercel login            # 首次使用需登录
vercel dev              # 默认 http://localhost:3000
```

访问 <http://localhost:3000>，点「测试后端接口」，应返回：

```json
{
  "message": "Hello, World!",
  "ok": true,
  "method": "GET",
  "time": "2026-01-01T00:00:00.000Z",
  "region": "local"
}
```

> 注意：直接双击 `index.html` 打开只能看到页面，`/api/hello` 会 404，因为接口需要 Vercel 运行时。

## 部署方式一：CLI（最快，30 秒）

```bash
cd 项目目录
vercel          # 首次会问几个问题：scope / 是否关联已有项目 / 项目名
vercel --prod   # 部署到生产环境，返回正式域名
```

想要别人能访问、但不想暴露生产地址，先跑 `vercel`（预览环境）看效果即可。

## 部署方式二：GitHub 自动部署（推荐长期用）

```bash
git init
git add .
git commit -m "feat: init hello world"
git branch -M main
git remote add origin https://github.com/xwh16668052911/hello-world.git
git push -u origin main
```

然后在 Vercel 控制台 → **Add New Project** → 导入这个仓库 → Framework Preset 选 **Other** → 直接 Deploy。
之后每次 `git push` 都会自动构建部署，PR 会生成独立的预览链接。

## 部署方式三：网页拖拽

打开 <https://vercel.com/new>，把整个项目文件夹拖进去即可上传部署（不需要 Git）。

## 配置说明

| 文件 | 作用 |
| --- | --- |
| `vercel.json` | `cleanUrls` 去掉 `.html` 后缀；给 `styles.css` 加了 5 分钟缓存 |
| `api/hello.js` | 放置在 `api/` 目录下会被自动识别为 Serverless Function，路径即 `/api/hello` |
| `package.json` | 没有依赖、没有构建步骤，Vercel 会直接当作静态项目处理 |

## 常见问题

**1. 部署成功但页面空白**
检查 `index.html` 是否在项目根目录。Vercel 默认把根目录作为输出目录。

**2. /api/hello 返回 404**
确认文件路径是 `api/hello.js`（不是 `api/hello/index.js` 之外的其他写法），且导出的是默认函数 `export default function handler(req, res)`。

**3. 想改成 Node 传统写法**
把 `api/hello.js` 换成：

```js
module.exports = (req, res) => {
  res.status(200).json({ message: 'Hello, World!' });
};
```

并删掉 `package.json` 里的 `"type": "module"`。

**4. 绑定自定义域名**
Vercel 项目 → Settings → Domains → 添加域名，按提示到 DNS 服务商配置 CNAME / A 记录。

## 下一步可以加什么

- 换成 Next.js：`npx create-next-app@latest`，Vercel 自动识别，无需配置
- 加环境变量：Vercel 控制台 Settings → Environment Variables，代码里用 `process.env.XXX`
- 加数据库：Vercel Storage 一键挂 Postgres / KV，适合做真正的增删改查
