# @small-zip/xxh3

这是一个使用 Rust 编写的 XXH3 生成工具，通过 NAPI-RS 与 Node.js 进行绑定，支持多种操作系统和架构。

## 项目概述
本项目使用 Rust 实现 XXH3 哈希计算功能，并通过 NAPI-RS 封装为 Node.js 模块，支持在不同的操作系统和架构上运行，包括 Windows、macOS 和 Linux。

## 功能特性
- 提供 `xxh3` 函数用于计算指定文件的 XXH3 哈希值。  

## 支持的平台和架构
- **Windows**: `win32-x64-msvc`, `win32-ia32-msvc`, `win32-arm64-msvc`
- **macOS**: `darwin-x64`, `darwin-arm64`

## 安装
```bash
npm install @small-zip/xxh3
```

## 使用示例
```javascript
const xxh3 = require('@small-zip/xxh3');
const filePath = 'path/to/your/file';
const hash = xxh3.xxh3(filePath);
console.log(`XXH3 hash of ${filePath}: ${hash}`); 
```