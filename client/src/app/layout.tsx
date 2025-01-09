import { SettingsContextProvider } from '@/contexts/settings/SettingsContextProvider'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import { twMerge } from 'tailwind-merge'

const font = Rubik({
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'pcbusca',
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
            </body>
        </html>
    )
}
