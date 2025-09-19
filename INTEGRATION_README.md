# 蜱虫检测应用 - 前后端集成指南

## 概述
这个应用现在使用Azure ChatGPT-5-mini API进行蜱虫检测，完全替代了之前的YOLO本地模型。新的架构更简单、更轻量，不需要下载大型模型文件。

## 文件结构
```
Tick-detection/
├── main.py                    # FastAPI后端服务器
├── tick_detection_app/        # React前端应用
├── start_dev.bat             # Windows启动脚本
├── start_dev.sh              # Linux/Mac启动脚本
└── INTEGRATION_README.md     # 本文件
```

## 快速启动

### Windows用户
1. 双击运行 `start_dev.bat`
2. 等待两个服务器启动完成

### Linux/Mac用户
1. 在终端中运行：`./start_dev.sh`
2. 等待两个服务器启动完成

### 手动启动
如果你想手动启动：

1. **启动后端**：
   ```bash
   python main.py
   ```
   后端将在 http://localhost:8000 运行

2. **启动前端**：
   ```bash
   cd tick_detection_app
   npm run dev
   ```
   前端将在 http://localhost:3000 运行

## API配置

### 后端 (main.py)
- 使用Azure ChatGPT-5-mini API
- 端点：`/detect-tick`
- 接受图片文件上传
- 将图片转换为base64发送给Azure API
- 返回中文检测结果（"是"、"不是"或"不确定"）

### 前端配置
- 开发环境：使用代理 `/api` -> `http://localhost:8000`
- 生产环境：直接连接 `http://localhost:8000`

## 使用说明

1. 打开浏览器访问 http://localhost:3000
2. 点击"蜱虫识别"页面
3. 上传图片或拍照
4. 点击"开始AI分析"
5. 查看检测结果

## 故障排除

### 后端无法启动
- 检查Python依赖：`pip install -r requirements.txt`
- 检查端口8000是否被占用
- 确保Azure API密钥有效

### 前端无法启动
- 检查Node.js依赖：`cd tick_detection_app && npm install`
- 检查端口3000是否被占用

### API连接失败
- 确保后端在8000端口运行
- 检查浏览器控制台是否有CORS错误
- 验证Azure API密钥是否正确

## 开发说明

### 修改API端点
在 `tick_detection_app/src/config/api.ts` 中修改：
```typescript
export const API_CONFIG = {
  baseURL: isLocalhost ? '/api' : 'http://localhost:8000',
  detectTick: '/detect-tick',
};
```

### 修改代理配置
在 `tick_detection_app/vite.config.ts` 中修改：
```typescript
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
  },
}
```

## 部署

### 生产环境部署
1. 构建前端：`cd tick_detection_app && npm run build`
2. 启动后端：`python main.py`
3. 配置反向代理（如Nginx）将前端静态文件和后端API请求路由到正确位置

### 环境变量
建议将Azure API密钥设置为环境变量：
```bash
export AZURE_API_KEY="your-api-key-here"
```

然后在main.py中使用：
```python
import os
API_KEY = os.getenv("AZURE_API_KEY", "default-key")
```
