import * as process from "process"

require('dotenv').config()

let appConfig = {
    username: process.env.DMZJ_USERNAME,
    password: process.env.DMZJ_PASSWORD,
    qmsgKey: process.env.DMZJ_QMSG_KEY
}
export {appConfig}
