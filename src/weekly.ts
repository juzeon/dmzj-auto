import {LogHandler} from "./LogHandler"
import {appAxios, handleResponse, login, sleep} from "./includes"
import * as qs from "qs"
import {appConfig} from "./config"
import {AxiosResponse} from "axios"

(async function weekly() {
    let logHandler = new LogHandler()
    let userAuth = await login()
    let resp: AxiosResponse

    // 看视频*3
    for (let i of [0, 1, 2]) {
        resp = await appAxios.get('http://nnapi.muwai.com/dynamic/video?' + qs.stringify(userAuth))
        handleResponse(resp, logHandler)
        await sleep()
        resp = await appAxios.get('http://nnv3api.muwai.com/task/get_reward?' + qs.stringify({...userAuth, id: 11}))
        handleResponse(resp, logHandler)
        await sleep()
    }

    // 分享
    resp = await appAxios.get('http://nnapi.muwai.com/dynamic/share?' + qs.stringify(userAuth))
    handleResponse(resp,logHandler)
    await sleep()
    resp = await appAxios.get('http://nnv3api.muwai.com/task/get_reward?' + qs.stringify({...userAuth, id: 12}))
    handleResponse(resp, logHandler)
    await sleep()

    if (appConfig.sendLog) {
        logHandler.sendLog()
    }
})()
