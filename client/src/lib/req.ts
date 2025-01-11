import { Store } from 'shared'

type Event = 'start' | 'end' | 'data' | 'raw' | 'error'
export type ErrorTypeCode = {
    type: 'error'
    code: 'QUOTA_EXCEEDED' | 'RATE_LIMIT'
}
export type ErrorTypeStore = {
    type: 'store'
    store: Store
}

export type StreamError = ErrorTypeCode | ErrorTypeStore

export function streamSearch(query: string, stores?: Store[]) {
    if (stores && stores.length === 0) throw new Error('No stores provided')

    const events: Record<string, any> = {}

    async function request() {
        const reqBody: {
            query: string
            stores?: Store[]
        } = {
            query,
            ...(stores && { stores }),
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/stream-search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
        })

        if (!res.body) throw new Error('No body')
        const reader = res.body.getReader()

        while (true) {
            const { value, done } = await reader.read()
            if (done) break

            const decoder = new TextDecoder()

            const text = decoder.decode(value)
            dispatch('raw', text)

            const parts = text
                .split('␀')
                .map((part) => part.trim())
                .filter((part) => part)

            for (const part of parts) {
                try {
                    const parsed = JSON.parse(part)

                    const msg = parsed?.msg
                    const store = parsed?.store
                    const code = parsed?.code

                    if (msg === 'start') dispatch('start')
                    if (msg === 'end') dispatch('end')

                    if (msg === 'error') {
                        if (store) {
                            dispatch('error', { type: 'store', store } as ErrorTypeStore)
                        } else if (code) {
                            dispatch('error', { type: 'code', code } as unknown as ErrorTypeCode)
                        }
                    }

                    if (!msg && store) dispatch('data', parsed)
                } catch (err) {
                    console.error('Error parsing JSON:', err)
                }
            }
        }
    }

    function dispatch(event: Event, data?: any) {
        if (events[event]) events[event](data)
    }

    function on(event: Event, cb: (data?: any) => void) {
        events[event] = cb
    }

    function start() {
        request()
    }

    return { on, start }
}
