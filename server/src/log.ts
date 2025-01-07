import Logger from '@nokya/aya'
import 'dotenv/config'

export const log = new Logger({
    prefix: '(pcbusca)',
})

export const t = process.env.BENCHMARK === 'true' ? console.time : () => {}
export const te = process.env.BENCHMARK === 'true' ? console.timeEnd : () => {}

// export const log = {
//     info: (..._) => {},
//     error: (..._) => {},
//     warn: (..._) => {},
//     debug: (..._) => {},
// }
