import axios from "axios"
import * as qs from 'qs'
import {IUserAuth} from "./types"
import {appConfig} from "./config"

let appAxios = axios.create({
    transformResponse: (data) => {
        try {
            return JSON.parse(data)
        } catch (e) {
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

export function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

export {appAxios}
