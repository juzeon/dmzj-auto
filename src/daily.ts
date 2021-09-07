import {appAxios, handleResponse, login, sleep} from "./includes"
import * as qs from 'qs'
import {LogHandler} from "./LogHandler"
import {appConfig} from "./config"

(async function daily() {
    let logHandler = new LogHandler()
    let userAuth = await login()

    // 签到
    let resp = await appAxios.get('http://nnv3api.dmzj1.com/task/sign?' + qs.stringify(userAuth))
    handleResponse(resp, logHandler)
    await sleep()

    // 视频签到翻倍
    resp = await appAxios.get('http://nnv3api.dmzj1.com/task/video_sign?' + qs.stringify(userAuth))
    handleResponse(resp, logHandler)
    await sleep()

    // 领取签到硬币奖励
    // 另：id=7 累计看十分钟漫画
    resp = await appAxios.get('http://nnv3api.dmzj1.com/task/get_reward?' + qs.stringify({...userAuth, id: 8}))
    handleResponse(resp, logHandler)
    await sleep()

    // 看视频*3
    for (let i of [0, 1, 2]) {
        resp = await appAxios.get('http://nnapi.dmzj1.com/dynamic/video?' + qs.stringify(userAuth))
        handleResponse(resp, logHandler)
        await sleep()
        resp = await appAxios.get('http://nnv3api.dmzj1.com/task/get_reward?' + qs.stringify({...userAuth, id: 9}))
        handleResponse(resp, logHandler)
        await sleep()
    }

    if (appConfig.sendLog) {
        logHandler.sendLog()
    }
})()

