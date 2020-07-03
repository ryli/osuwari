# Deno 开发的小工具

- [format-time](./format-time/)
- [wifi](./wifi/)

## 用法

### 1. 直接运行
```shell
deno run https://raw.githubusercontent.com/ryli/osuwari/1.0.0/format-time/index.ts 1593689136
```

### 2. 安装脚本(推荐)
```shell
# 安装
# 根据情况，指定权限： --allow-net
# -n 后面配置命令名称
deno install [--allow-net] -n ft https://raw.githubusercontent.com/ryli/osuwari/1.0.0/format-time/index.ts

# 使用
ft 1593689136
```
