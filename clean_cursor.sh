#!/bin/bash

echo "🧹 开始清理Cursor相关文件..."

# 停止所有Cursor进程
echo "📋 停止Cursor进程..."
pkill -f "cursor-nightly" 2>/dev/null || echo "没有找到运行的Cursor进程"

# 删除VM Daemon环境下的Cursor文件
echo "🗑️ 删除VM Daemon环境下的Cursor文件..."
rm -rf /home/ubuntu/.vm-daemon/vm-daemon-cursor-data
rm -rf /home/ubuntu/.vm-daemon/bin/vm-daemon-cursor-*

# 删除配置目录
echo "🗑️ 删除配置目录..."
rm -rf /home/ubuntu/.config/Cursor\ Nightly
rm -rf /home/ubuntu/.cursor-server
rm -rf /home/ubuntu/.cursor-nightly

# 查找并删除其他可能的Cursor文件
echo "🔍 查找其他Cursor文件..."
find /home/ubuntu -name "*cursor*" -type d 2>/dev/null | while read dir; do
    echo "删除目录: $dir"
    rm -rf "$dir"
done

echo "✅ Cursor文件清理完成！"
echo ""
echo "📝 下一步："
echo "1. 从 https://cursor.sh 下载最新稳定版本"
echo "2. 解压到 /opt/cursor/"
echo "3. 创建软链接: sudo ln -sf /opt/cursor/cursor /usr/local/bin/cursor"
echo "4. 验证版本: cursor --version"