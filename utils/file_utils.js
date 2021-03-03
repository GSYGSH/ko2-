/* 读取文件工具方法 */
const fs = require('fs')
module.exports.getFileJsonData = (filePath) => {
    return new Promise((res, rej) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                rej(err)
            } else {
                res(data)
            }
        })
    })
}