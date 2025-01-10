import type { Config } from 'tailwindcss'

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                cherryred: {
                    50: '#FEE6EA',
                    100: '#FECDD5',
                    200: '#FC9CAA',
                    300: '#FB6A80',
                    400: '#F93956',
                    500: '#F7072B',
                    600: '#C60623',
                    700: '#95041A',
                    800: '#630311',
                    900: '#320109',
                    950: '#190104',
                },
            },
        },
    },
    plugins: [],
} satisfies Config
