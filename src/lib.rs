#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

use xxhash_rust::xxh3::xxh3_64;

#[napi]
pub fn xxh3(path: String) -> napi::Result<String> {
    // 直接读取文件内容并使用 xxh3_64 算法
    let data = std::fs::read(&path)
        .map_err(|e| napi::Error::from_reason(format!("读取失败: {}", e)))?;
    
    let hash = xxh3_64(&data);
    Ok(format!("{:016x}", hash))
}