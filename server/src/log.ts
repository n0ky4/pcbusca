import Logger from '@nokya/aya'
import 'dotenv/config'

export const log = new Logger({
    prefix: '(pcbusca)',
    file: {
        use: true,
    },
})
