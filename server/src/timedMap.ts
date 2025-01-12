export class TimedMap<K, V> extends Map<K, V> {
    private time: number

    constructor(time: number, values?: readonly (readonly [K, V])[] | null) {
        super(values)
        this.time = time
    }

    set(key: K, value: V): this {
        super.set(key, value)
        setTimeout(() => {
            if (super.has(key)) super.delete(key)
        }, this.time)
        return this
    }
}
