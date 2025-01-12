import { Store } from 'shared'
import { log } from './log'

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

export interface ParseBuffer {
    messages: any[]
    remainingBuffer: string
}

const IN_SEP = '[['
const OUT_SEP = ']]'

// função para parsear o buffer de maneira apropriada,
// já que muitas das vezes, receberemos uma string
// incompleta, o que causaria um erro ao tentar usar
// o JSON.parse. Por isso também adotamos um padrão
// de separação de mensagens onde sabemos o início
// e o fim de cada mensagem => [[ {...} ]]
function parseBuffer(buffer: string): ParseBuffer {
    const messages: any[] = []
    let currentBuffer = buffer

    while (true) {
        // pegar o índice (posição) dos separadores de início e fim
        const startIndex = currentBuffer.indexOf(IN_SEP)
        const endIndex = currentBuffer.indexOf(OUT_SEP)

        // se não encontrarmos nenhum dos separadores, mantemos
        // o buffer e saímos do loop
        if (startIndex === -1 || endIndex === -1) {
            break
        }

        // aqui, encontramos um caso onde o separador de fim vem antes
        // de um separador de início. Nesse caso, removemos a parte
        // do buffer que não faz sentido e continuamos a busca
        if (endIndex < startIndex) {
            currentBuffer = currentBuffer.slice(endIndex + OUT_SEP.length)
            continue
        }

        // a partir daqui, sabemos que temos um início e um fim.

        try {
            // tentar parsear a mensagem entre separadores
            const jsonStr = currentBuffer.slice(startIndex + IN_SEP.length, endIndex) // mensagem crua
            const parsed = JSON.parse(jsonStr)
            messages.push(parsed)

            // remover essa parte processada do buffer e continuar a busca
            currentBuffer = currentBuffer.slice(endIndex + OUT_SEP.length)
        } catch (err) {
            // aqui ocorreu um erro ao tentar parsear a mensagem.
            // novamente, removemos a parte do buffer que não faz
            // sentido e continuamos
            currentBuffer = currentBuffer.slice(endIndex + OUT_SEP.length)
            log.error('erro ao parsear mensagem', err, currentBuffer)
        }
    }

    // retornar as mensagens processadas e o buffer restante
    return {
        messages,
        remainingBuffer: currentBuffer,
    }
}

export function streamSearch(query: string, stores?: Store[]) {
    if (stores && stores.length === 0) throw new Error('No stores provided')

    const events: Record<string, any> = {}

    const handleEvent = (parsed: any) => {
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
    }

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
        const decoder = new TextDecoder()

        let buffer = ''

        // a cada mensagem recebida, processamos o buffer
        while (true) {
            const { value, done } = await reader.read()
            if (done) break

            const text = decoder.decode(value, { stream: true })
            buffer += text

            // processar o buffer e atualizar o buffer restante
            const { messages, remainingBuffer } = parseBuffer(buffer)
            buffer = remainingBuffer

            // processar todas as mensagens completas
            for (const message of messages) {
                handleEvent(message)
            }
        }

        // processar as mensagens restantes, caso existam
        const { messages } = parseBuffer(buffer)
        for (const message of messages) {
            handleEvent(message)
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
