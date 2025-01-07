export class KabumError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'KabumError'
    }
}

export class PichauError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'PichauError'
    }
}

export class TerabyteError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'TerabyteError'
    }
}
