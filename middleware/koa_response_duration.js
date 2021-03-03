/* 计算服务器消耗时长得中间件 */
module.exports = async (ctx, next) => {
    /* 
        1.记录开始时间
        2.让内层中间件得到执行
        3.记录结束时间
        4.设置响应头 X-Response-Time
    */
    const start = Date.now()

    await next()

    const end = Date.now()

    const duration = end - start

    ctx.set('X-Response-Time',duration + 'ms')
}