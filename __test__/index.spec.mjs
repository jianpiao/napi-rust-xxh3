import test from 'ava';
import { xxh3 } from '../index.js';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 获取当前模块的文件路径和目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test.serial('xxh3 应该正确计算本地文件内容的 XXH32 哈希值', async (t) => {
  const tempFilePath = join(__dirname, 'temp_test_file.txt');
  const fileContent = 'hello world';
  const expected = 'd447b1ea40e6988b';

  try {
    // 创建临时文件
    await writeFile(tempFilePath, fileContent);

    // 读取文件内容并计算 XXH32
    const result = xxh3(tempFilePath);
    t.is(result, expected);
  } catch (error) {
    t.fail(`测试过程中出现错误: ${error.message}`);
  } finally {
    // 删除临时文件
    try {
      await unlink(tempFilePath);
    } catch (error) {
      console.warn(`删除临时文件时出错: ${error.message}`);
    }
  }
});