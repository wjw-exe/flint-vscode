'use strict';
// Flint Language — VSCode 插件: 语法高亮 + 一键运行(VM/原生) + 编译为 exe
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

// 查找 flint.exe: ① 设置 exePath → ② 从当前打开文件目录逐级向上扫描
//    (每级查 dist/flint.exe 与 flint-windows/dist/flint.exe) → ③ workspace 兜底。
// 修复: 直接打开单个 .fl 文件(无 workspace 文件夹)时也能找到 exe。
function findFlintExe(doc) {
    const cfg = vscode.workspace.getConfiguration('flint');
    const configured = cfg.get('exePath', '');
    if (configured && fs.existsSync(configured)) return configured;
    const roots = [];
    if (doc) roots.push(path.dirname(doc.uri.fsPath));
    const ws = vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0];
    if (ws) roots.push(ws.uri.fsPath);
    const seen = new Set();
    for (const root of roots) {
        let cur = root;
        for (let i = 0; i < 8 && !seen.has(cur); i++) {
            seen.add(cur);
            const c1 = path.join(cur, 'dist', 'flint.exe');
            if (fs.existsSync(c1)) return c1;
            const c2 = path.join(cur, 'flint-windows', 'dist', 'flint.exe');
            if (fs.existsSync(c2)) return c2;
            const parent = path.dirname(cur);
            if (parent === cur) break;
            cur = parent;
        }
    }
    return '';
}

function activeDoc() {
    const doc = vscode.window.activeTextEditor && vscode.window.activeTextEditor.document;
    return doc && doc.languageId === 'flint' ? doc : null;
}

function runInTerminal(exe, args, cwd, name) {
    const term = vscode.window.createTerminal({ name: name || 'Flint', cwd: cwd });
    term.show();
    const q = (s) => '"' + s + '"';
    term.sendText(q(exe) + ' ' + args.map(q).join(' '));
}

function activate(context) {
    context.subscriptions.push(
        vscode.commands.registerCommand('flint.run', () => {
            const doc = activeDoc();
            if (!doc) return vscode.window.showWarningMessage('请先打开一个 .fl 文件');
            const exe = findFlintExe(doc);
            if (!exe) return vscode.window.showErrorMessage('未找到 flint.exe: 请设置 flint.exePath, 或将项目放在 flint-windows 同级目录');
            runInTerminal(exe, ['run', doc.uri.fsPath], path.dirname(doc.uri.fsPath));
        }),
        vscode.commands.registerCommand('flint.runNative', () => {
            const doc = activeDoc();
            if (!doc) return vscode.window.showWarningMessage('请先打开一个 .fl 文件');
            const exe = findFlintExe(doc);
            if (!exe) return vscode.window.showErrorMessage('未找到 flint.exe');
            runInTerminal(exe, ['run', '--native', doc.uri.fsPath], path.dirname(doc.uri.fsPath), 'Flint (native)');
        }),
        vscode.commands.registerCommand('flint.compile', () => {
            const doc = activeDoc();
            if (!doc) return vscode.window.showWarningMessage('请先打开一个 .fl 文件');
            const exe = findFlintExe(doc);
            if (!exe) return vscode.window.showErrorMessage('未找到 flint.exe');
            const out = path.join(path.dirname(doc.uri.fsPath), path.basename(doc.uri.fsPath, '.fl') + '.exe');
            runInTerminal(exe, ['native', doc.uri.fsPath, '-o', out], path.dirname(doc.uri.fsPath), 'Flint compile');
        }),
        vscode.commands.registerCommand('flint.gfx', () => {
            const doc = activeDoc();
            if (!doc) return vscode.window.showWarningMessage('请先打开一个 .fl 文件');
            const exe = findFlintExe(doc);
            if (!exe) return vscode.window.showErrorMessage('未找到 flint.exe');
            runInTerminal(exe, ['gfx', doc.uri.fsPath], path.dirname(doc.uri.fsPath), 'Flint gfx');
        })
    );
}

exports.activate = activate;
exports.deactivate = function () {};