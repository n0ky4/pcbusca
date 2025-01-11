const basePrefixStyle = 'padding: 0 3px; border-radius: 3px; font-weight: bold;'
const prefixes = {
    main: {
        prefix: 'pcbusca',
        style: 'background: #14b8a6; color: #0f172a;' + basePrefixStyle,
    },
    info: {
        prefix: 'info',
        style: 'background: #50b3fa; color: #0f172a;' + basePrefixStyle,
    },
    error: {
        prefix: 'error',
        style: 'background: #f56565; color: #0f172a;' + basePrefixStyle,
    },
    warn: {
        prefix: 'warn',
        style: 'background: #f6e05e; color: #0f172a;' + basePrefixStyle,
    },
}

export const log = {
    info: (...args: any[]) => {
        console.log(
            `%c${prefixes.main.prefix}%c %c${prefixes.info.prefix}%c`,
            prefixes.main.style,
            '',
            prefixes.info.style,
            '',
            ...args
        )
    },
    error: (...args: any[]) => {
        console.log(
            `%c${prefixes.main.prefix}%c %c${prefixes.error.prefix}%c`,
            prefixes.main.style,
            '',
            prefixes.error.style,
            '',
            ...args
        )
    },
    warn: (...args: any[]) => {
        console.log(
            `%c${prefixes.main.prefix}%c %c${prefixes.warn.prefix}%c`,
            prefixes.main.style,
            '',
            prefixes.warn.style,
            '',
            ...args
        )
    },
}
