export function cleanTitle(title: string): string {
    const toRemove = [
        'Computador com',
        'Cooler para Processador',
        'Placa de Video',
        'Placa de Vídeo',
        'Teclado Gamer Mecânico',
        'Teclado Gamer Mecanico',
        'Teclado Mecânico',
        'Teclado Mecanico',
        'Teclado Optico',
        'Teclado Óptico',
        'Fone de Ouvido',
        'Mouse pad',
        'Cooler FAN',
        'Cooler Fan',
        'Air Cooler',
        'Water Cooler',
        'Sem Fio',
        // sem variação (remover depois)
        'PC',
        'Placa-Mãe',
        'Teclado',
        'Roteador',
        'Smartphone',
        'Fonte',
        'Gabinete',
        'Headset',
        'Memória',
        'Monitor',
        'Mousepad',
        'Mouse',
        'Notebook',
        'Placa Mãe',
        'Processador',
        'Cadeira',
        'Computador',
    ]

    // variações "Gamer " (remover primeiro)
    const allKeywords = [...toRemove.map((str) => `${str} Gamer`), ...toRemove]

    // combinar todas as palavras em um regex
    const keywordsRegex = new RegExp(`\\b(${allKeywords.join('|')})\\b`, 'gi')

    let cleanedTitle = title
        .replace(keywordsRegex, '') // remover palavras-chave (case-insensitive)
        .replace(/\s+/g, ' ') // remover espaços duplicados
        .trim()

    if (cleanedTitle.startsWith(', ')) cleanedTitle = cleanedTitle.slice(2)

    return cleanedTitle
}

export function truncate(str: string, n: number) {
    return str.length > n ? str.slice(0, n - 3) + '...' : str
}
