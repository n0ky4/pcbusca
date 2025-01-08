export function cleanTitle(title: string) {
    const toRemove = [
        'Air Cooler',
        'Cadeira',
        'Cadeira Gamer',
        'Computador',
        'Computador Gamer',
        'Computador com',
        'Cooler FAN',
        'Cooler FAN Gamer',
        'Cooler Fan',
        'Cooler Fan Gamer',
        'Cooler para Processador',
        'Cooler para Processador Gamer',
        'Fone de Ouvido',
        'Fonte',
        'Fonte Gamer',
        'Gabinete',
        'Gabinete Gamer',
        'Headset',
        'Headset Gamer',
        'Memória',
        'Memória Gamer',
        'Monitor',
        'Monitor Gamer',
        'Mouse',
        'Mouse Gamer',
        'Notebook',
        'Notebook Gamer',
        'PC Gamer',
        'Placa Mãe',
        'Placa de Video',
        'Placa de Vídeo',
        'Placa De Vídeo',
        'Placa De Video',
        'Placa-Mãe',
        'Processador',
        'Roteador',
        'Sem Fio',
        'Smartphone',
        'Teclado',
        'Teclado Gamer',
        'Teclado Mecânico',
        'Teclado Mecânico Gamer',
        'Water Cooler',
        'Water Cooler Gamer',
    ]

    let res = title.replace(/\s+/g, ' ').replace(/(\r\n|\n|\r)/gm, '')

    toRemove.forEach((str) => {
        res = res
            .replaceAll(str, '')
            .replaceAll(str.toLowerCase(), '')
            .replaceAll(str.toUpperCase(), '')
            .trim()
    })

    return res
}

export function truncate(str: string, n: number) {
    return str.length > n ? str.slice(0, n - 3) + '...' : str
}
