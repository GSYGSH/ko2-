//处理业务逻辑中间件，读取某个json文件得数据
const path = require('path')
const fileUtils = require('../utils/file_utils')
module.exports = async (ctx, next) => {
    const url = ctx.request.url

    // 访问/api/seller => 读取../data/koa_server/seller.json
    let filePath = url.replace('/api', '')//seller
    
    filePath = '../data/koa_server' + filePath + '.json'
    
    filePath = path.join(__dirname, filePath)
    
    const ret = await fileUtils.getFileJsonData(filePath)
    ctx.response.body = ret

    console.log(filePath);
    await next()
}