import axios, {AxiosResponse} from "axios"
import * as qs from 'qs'
import {IUserAuth} from "./types"
import {appConfig} from "./config"
import {LogHandler} from "./LogHandler"

let appAxios = axios.create({
    transformResponse: (data) => {
        try {
            let json = JSON.parse(data)
            console.log(json)
            return json
        } catch (e) {
            console.log(data)
            return data
        }
    },
    headers: {
        'User-Agent': 'Android,DMZJ1,9',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

export async function login() {
    let resp = await appAxios.post('https://nnuser.dmzj1.com/loginV2/m_confirm', qs.stringify({
        nickname: appConfig.username,
        passwd: appConfig.password
    }))
    return <IUserAuth>{
        uid: resp.data.data.uid,
        token: resp.data.data.dmzj_token
    }
}

export function sleep() {
    return new Promise((resolve) => {
        setTimeout(resolve, appConfig.sleep)
    })
}

export function handleResponse(resp: AxiosResponse, logHandler: LogHandler) {
    if (resp.data.code !== 0) {
        logHandler.addLog(resp.data.msg)
    }
}

export {appAxios}
