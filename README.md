# Flint Language — VSCode 插件

Flint（Python 风格、编译型语言）的 VSCode 支持：

- `.fl` 语法高亮（关键字 / 类型 / 内置函数 / 位运算符 / 注释 / 字符串 / 数字）
- 一键运行当前文件：`Ctrl+Alt+R`（VM 模式）或命令面板 / 右键菜单
- 原生编译运行 `--native`（需要 gcc）
- 编译当前文件为 `.exe`

## 安装

1. 安装 `flint-language-1.0.0.vsix`：VSCode → 扩展面板 → `...` → 从 VSIX 安装
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