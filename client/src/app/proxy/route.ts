import { NextRequest, NextResponse } from 'next/server'
import { parse } from 'tldts'

const ALLOWED_DOMAINS = ['pichau.com.br', 'kabum.com.br', 'terabyteshop.com.br']

const isAllowed = (url: string) => {
    const { domain } = parse(url)
    if (!domain) return false
    return ALLOWED_DOMAINS.includes(domain)
}

export async function GET(req: NextRequest) {
    const { nextUrl } = req

    const url = nextUrl.searchParams?.get('url')
    if (!url || !isAllowed(url)) return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })

    const response = await fetch(url)
    const buffer = await response.arrayBuffer()
    const bufferArray = new Uint8Array(buffer)

    return new NextResponse(bufferArray, {
        headers: {
            'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    })
}
