const { xxh3 } = require('../index.js');
const fs = require('fs');
const path = require('path');

// 大文件性能测试
async function testLargeFile() {
    // 创建一个 1GB 的测试文件
    const testFile = path.join(__dirname, 'test_large_file.bin');
    const fileSizeGB = 1;
    const fileSizeMB = fileSizeGB * 1024;
    
    console.log(`测试 ${fileSizeGB}GB 文件的哈希计算性能...`);
    
    // 检查文件是否存在
    if (!fs.existsSync(testFile)) {
        console.log(`创建 ${fileSizeGB}GB 测试文件...`);
        
        // 使用更安全的方法创建大文件
        const chunkSize = 1024 * 1024; // 1MB chunks
        const buffer = Buffer.alloc(chunkSize);
        buffer.fill('A');
        
        const fd = fs.openSync(testFile, 'w');
        
        try {
            for (let i = 0; i < fileSizeMB; i++) {
                fs.writeSync(fd, buffer);
                
                if (i % 100 === 0) {
                    console.log(`进度: ${((i / fileSizeMB) * 100).toFixed(1)}%`);
                }
            }
        } finally {
            fs.closeSync(fd);
        }
        
        console.log('大文件创建完成');
    } else {
        console.log('使用现有的大文件');
    }
    
    // 验证文件大小
    const stats = fs.statSync(testFile);
    const actualSizeGB = stats.size / (1024 * 1024 * 1024);
    console.log(`实际文件大小: ${actualSizeGB.toFixed(2)}GB`);
    
    console.log('\n开始哈希计算...');
    const startTime = process.hrtime.bigint();
    
    try {
        const hash = xxh3(testFile);
        
        const endTime = process.hrtime.bigint();
        const duration = Number(endTime - startTime) / 1000000; // 转换为毫秒
        const durationSeconds = duration / 1000;
        const speed = (actualSizeGB * 1024 / durationSeconds).toFixed(2); // MB/s
        
        console.log(`\n=== 大文件哈希性能测试结果 ===`);
        console.log(`文件大小: ${actualSizeGB.toFixed(2)}GB`);
        console.log(`哈希值: ${hash}`);
        console.log(`计算时间: ${duration.toFixed(0)}ms (${durationSeconds.toFixed(2)}秒)`);
        console.log(`处理速度: ${speed} MB/s`);
        
        if (durationSeconds < 1) {
            console.log('\n🎉 成功！哈希计算时间少于 1 秒！');
        } else if (durationSeconds < 2) {
            console.log('\n✅ 很好！哈希计算时间少于 2 秒！');
        } else {
            console.log(`\n⚠️  目标是 1 秒内完成，当前用时 ${durationSeconds.toFixed(2)} 秒`);
        }
        
    } catch (error) {
        console.error('哈希计算失败:', error);
    }
}

testLargeFile().catch(console.error);