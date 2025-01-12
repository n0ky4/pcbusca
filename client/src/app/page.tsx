import { MAX_SEARCH_LENGTH, MIN_SEARCH_LENGTH } from 'shared'
import { Home } from './_components/Home'

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePage(req: PageProps) {
    const searchParams = await req.searchParams

    let query: string | undefined = searchParams?.['q']?.toString()?.trim()
    if (!query || query.length < MIN_SEARCH_LENGTH || query.length > MAX_SEARCH_LENGTH)
        query = undefined

    return <Home initialSearch={query} />
}
