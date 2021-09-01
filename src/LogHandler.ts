import {appAxios} from "./includes"
import {appConfig} from "./config"
import * as qs from 'qs'

export class LogHandler {
    private log: string = ''

    addLog(line: string) {
        this.log += line + '\n'
        console.log(line)
    }

    clearLog() {
        this.log = ''
    }

    async sendLog() {
        if (!this.log.length) {
            return
        }
        await appAxios.post('https://qmsg.zendee.cn/send/' + appConfig.qmsgKey, qs.stringify({
            msg: this.log.split('\n').filter(value => value.length !== 0).join('\n')
        }))
    }
}
