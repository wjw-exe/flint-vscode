# Flint Language — VSCode 插件 v3.1

Flint v3.1（Python 风格、编译型语言）的 VSCode 支持：

- `.fl` 语法高亮（关键字 / 类型 / 内置函数含 v3.1 `str`、`sqrt`、`gcd`、`clamp` / 位运算符 / 字符与字符串字面量 / 注释 / 数字）
- 一键运行当前文件：`Ctrl+Alt+R`（VM 模式）或命令面板 / 右键菜单
- 原生编译运行 `--native`（需要 gcc）
- **图形模式运行 `gfx`**（窗口 / 清屏 / 矩形 / 圆形 / 线条 / 字符 / 按键等内置, 跑贪吃蛇图形版）
- 编译当前文件为 `.exe`

## 安装

1. 安装 `flint-language-3.1.0.vsix`：VSCode → 扩展面板 → `...` → 从 VSIX 安装
2. 打开 `flint-windows` 文件夹（或任何 `.fl` 项目）
3. 打开 `.fl` 文件 → 右键或 `Ctrl+Alt+R` 运行

## 查找 flint.exe

自动查找顺序：
1. 设置 `flint.exePath`（用户设置中填写绝对路径）
2. 当前工作区的 `dist/flint.exe`
3. 当前工作区同级的 `flint-windows/dist/flint.exe`

## 命令

| 命令 | 快捷键 | 说明 |
|---|---|---|
| Flint: 运行当前文件 (VM) | Ctrl+Alt+R | `flint.exe run 文件` |
| Flint: 原生编译运行 (--native) | — | `flint.exe run --native 文件` |
| Flint: 编译为可执行文件 (.exe) | — | `flint.exe native 文件 -o 文件.exe` |
| Flint: 图形模式运行 (gfx) | — | `flint.exe gfx 文件`（窗口应用, 如 `gfx_snake.fl`） |