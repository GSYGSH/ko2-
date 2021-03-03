const path = require('path')
const fileUtils = require('../utils/file_utils')
const ws = require('ws')
const wss = new ws.Server({
    port:9998
})


module.exports.listen = () => {
    wss.on('connection', client => {
        console.log('客户端连接成功');
    
        client.on('message', async msg => {
            /* payload获取 客户端msg,action获取客户端action */
            let payload = JSON.parse(msg)
            
            const action = payload.action
            if (action === 'getData') {
            /* 判断需要做什么,是获取数据就拼接完整路径，返还一个新增的data porperty */
                if (payload.chartName === 'hot') {
                    /* hot对应hotproduct文件 */
                    payload.chartName = 'hotproduct'
                }
                let filePath = '../data/koa_server/' + payload.chartName + '.json' 
                /* 拼接文件地址路径 */
                filePath = path.join(__dirname, filePath)
                /* 通过file_utils函数获取文件内容ret */
                const ret = await fileUtils.getFileJsonData(filePath)
                /* 挂载到payload对象上 */
                payload.data = ret
                /* 服务端=>客户端 */
                client.send(JSON.stringify(payload))
            } else {
            /* 原封不动将数据转发给每一个处于连接状态的客户端 */
            /*  wss.clients 所有客户端的连接 */
                wss.clients.forEach(client => {
                    client.send(msg)
                })
            }
            
        })
    })
}
