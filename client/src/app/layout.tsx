import { SettingsContextProvider } from '@/contexts/settings/SettingsContextProvider'
import '@/styles/globals.css'
import type { Metadata, Viewport } from 'next'
import { Rubik } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'

const font = Rubik({
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'pcbusca',
    description: 'pesquise por produtos em diversas lojas uauuu!!',
    authors: [
        {
            name: 'nokya',
            url: 'https://nokya.me/',
        },
    ],
    keywords: ['pcbusca', 'pesquisa', 'produtos', 'lojas', 'comparação', 'comparador de preços'],
    icons: '/favicon.svg',
}

export const viewport: Viewport = {
    themeColor: '#5eead4',
    colorScheme: 'dark',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='pt-BR'>
            <body className={twMerge(font.className, 'antialiased', 'text-white bg-slate-950')}>
                <SettingsContextProvider>{children}</SettingsContextProvider>
                <Toaster
                    toastOptions={{
                        duration: 3000,
                    }}
                />
            </body>
        </html>
    )
}
