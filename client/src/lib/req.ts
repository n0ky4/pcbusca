type Event = 'start' | 'end' | 'data' | 'raw'
export function streamSearch(query: string) {
    const events: Record<string, any> = {}

    async function request() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/stream-search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
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
                    if (msg === 'start') dispatch('start')
                    if (msg === 'end') dispatch('end')

                    const store = parsed?.store
                    if (store) dispatch('data', parsed)
                } catch (err) {
                    console.error('Error parsing JSON:', err)
                    console.log('raw:', `"${text}"`)
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
