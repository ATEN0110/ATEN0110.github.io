# Windows Cursor文件检查脚本
Write-Host "🔍 开始检查Windows系统中的Cursor文件..." -ForegroundColor Green
Write-Host ""

# 定义可能的Cursor文件位置
$cursorPaths = @(
    "$env:APPDATA\Cursor",
    "$env:LOCALAPPDATA\Cursor", 
    "$env:USERPROFILE\.cursor",
    "$env:USERPROFILE\AppData\Local\Cursor",
    "$env:USERPROFILE\AppData\Roaming\Cursor",
    "$env:PROGRAMFILES\Cursor",
    "$env:PROGRAMFILES(X86)\Cursor",
    "$env:USERPROFILE\Documents\Cursor",
    "$env:USERPROFILE\Desktop\Cursor",
    "$env:USERPROFILE\Downloads\Cursor"
)

# 检查注册表
Write-Host "📋 检查注册表..." -ForegroundColor Yellow
$registryPaths = @(
    "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*",
    "HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*",
    "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*"
)

$cursorInRegistry = $false
foreach ($regPath in $registryPaths) {
    $entries = Get-ItemProperty $regPath | Where-Object { $_.DisplayName -like "*Cursor*" }
    if ($entries) {
        Write-Host "⚠️  发现注册表项:" -ForegroundColor Red
        $entries | ForEach-Object { Write-Host "   $($_.DisplayName)" -ForegroundColor Red }
        $cursorInRegistry = $true
    }
}

if (-not $cursorInRegistry) {
    Write-Host "✅ 注册表中没有发现Cursor相关项" -ForegroundColor Green
}

Write-Host ""

# 检查文件系统
Write-Host "📁 检查文件系统..." -ForegroundColor Yellow
$foundFiles = @()

foreach ($path in $cursorPaths) {
    if (Test-Path $path) {
        Write-Host "⚠️  发现目录: $path" -ForegroundColor Red
        $foundFiles += $path
        
        # 显示目录内容
        try {
            $items = Get-ChildItem $path -Recurse | Measure-Object
            Write-Host "   包含 $($items.Count) 个文件/文件夹" -ForegroundColor Yellow
        } catch {
            Write-Host "   无法访问目录内容" -ForegroundColor Yellow
        }
    }
}

# 全局搜索Cursor文件
Write-Host ""
Write-Host "🔍 全局搜索Cursor相关文件..." -ForegroundColor Yellow
try {
    $globalSearch = Get-ChildItem -Path "C:\" -Name "*cursor*" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 10
    if ($globalSearch) {
        Write-Host "⚠️  发现可能的Cursor文件:" -ForegroundColor Red
        $globalSearch | ForEach-Object { Write-Host "   $_" -ForegroundColor Yellow }
    } else {
        Write-Host "✅ 全局搜索未发现明显的Cursor文件" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  全局搜索被限制或超时" -ForegroundColor Yellow
}

# 检查进程
Write-Host ""
Write-Host "📋 检查运行中的Cursor进程..." -ForegroundColor Yellow
$cursorProcesses = Get-Process | Where-Object { $_.ProcessName -like "*cursor*" }
if ($cursorProcesses) {
    Write-Host "⚠️  发现运行中的Cursor进程:" -ForegroundColor Red
    $cursorProcesses | ForEach-Object { Write-Host "   $($_.ProcessName) (PID: $($_.Id))" -ForegroundColor Red }
} else {
    Write-Host "✅ 没有发现运行中的Cursor进程" -ForegroundColor Green
}

# 检查环境变量
Write-Host ""
Write-Host "🔧 检查环境变量..." -ForegroundColor Yellow
$pathVar = $env:PATH -split ';'
$cursorInPath = $pathVar | Where-Object { $_ -like "*cursor*" }
if ($cursorInPath) {
    Write-Host "⚠️  PATH中发现Cursor路径:" -ForegroundColor Red
    $cursorInPath | ForEach-Object { Write-Host "   $_" -ForegroundColor Red }
} else {
    Write-Host "✅ PATH中没有发现Cursor路径" -ForegroundColor Green
}

# 总结
Write-Host ""
Write-Host "📊 检查总结:" -ForegroundColor Cyan
if ($foundFiles.Count -eq 0 -and -not $cursorInRegistry -and -not $cursorProcesses -and -not $cursorInPath) {
    Write-Host "🎉 恭喜！Cursor文件已完全清理干净！" -ForegroundColor Green
} else {
    Write-Host "⚠️  发现以下残留:" -ForegroundColor Red
    if ($foundFiles.Count -gt 0) {
        Write-Host "   - 文件系统: $($foundFiles.Count) 个目录" -ForegroundColor Red
    }
    if ($cursorInRegistry) {
        Write-Host "   - 注册表项" -ForegroundColor Red
    }
    if ($cursorProcesses) {
        Write-Host "   - 运行中的进程" -ForegroundColor Red
    }
    if ($cursorInPath) {
        Write-Host "   - 环境变量" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "🧹 建议清理步骤:" -ForegroundColor Yellow
    Write-Host "1. 手动删除发现的目录" -ForegroundColor Cyan
    Write-Host "2. 使用注册表编辑器删除相关项" -ForegroundColor Cyan
    Write-Host "3. 重启电脑确保进程完全停止" -ForegroundColor Cyan
    Write-Host "4. 清理环境变量中的Cursor路径" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "按任意键退出..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")