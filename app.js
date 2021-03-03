/* 

*/
/* const koa = require('koa')
const app = new koa()
app.use((ctx, next) => {
    console.log(ctx.request.url);
    ctx.response.body = 'hello world'
    next()
})
app.use((ctx, next) => {
    console.log(2);
    next()
})
app.use((ctx, next) => {
    console.log(3);
})
app.listen(3000) */

const koa = require('koa')
const app = new koa()

const respDurationMiddleware = require('./middleware/koa_response_duration')

const respHeaderMiddleware = require('./middleware/koa_response_header')

const respDataMiddleware = require('./middleware/koa_response_data')

app.use(respDurationMiddleware)
app.use(respHeaderMiddleware)
app.use(respDataMiddleware)

app.listen(8888)

const webSocketService = require('./service/web_socket_service')

/* 
    当某一个客户端连接成功后，就会对这个客户端进行 message 事件监听
*/
webSocketService.listen()