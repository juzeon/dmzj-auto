import {appAxios, login} from "./includes"
import * as qs from 'qs'
import {LogHandler} from "./LogHandler"

(async function sign() {
    let logHandler = new LogHandler()
    let userAuth = await login()
    let resp = await appAxios.get('http://nnv3api.dmzj1.com/task/sign?' + qs.stringify(userAuth))
    if (resp.data.code !== 0) {
        logHandler.addLog(resp.data.msg)
    }
    resp = await appAxios.get('http://nnv3api.dmzj1.com/task/video_sign?' + qs.stringify(userAuth))
    if (resp.data.code !== 0) {
        logHandler.addLog(resp.data.msg)
    }
    logHandler.sendLog()
})()

