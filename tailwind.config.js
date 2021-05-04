const defaultTheme = require('tailwindcss/defaultTheme')


module.exports = {
    purge: {
        content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
        options: {
            safelist: ['h-full'],
        },
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ['Heebo', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                neutral: {
                    50: "#F7F7F7",
                    100: "#E1E1E1",
                    200: "#CFCFCF",
                    300: "#B1B1B1",
                    400: "#9E9E9E",
                    500: "#7E7E7E",
                    600: "#626262",
                    700: "#515151",
                    800: "#3B3B3B",
                    900: "#222222",
                },
                primary: {
                    50: "#F0FCF9",
                    100: "#C6F7E9",
                    200: "#8EEDD1",
                    300: "#5FE3C0",
                    400: "#2DCCA7",
                    500: "#17B897",
                    600: "#079A82",
                    700: "#048271",
                    800: "#016457",
                    900: "#004440",
                },
                supporting: {
                    50: "#FFFBEA",
                    100: "#FFF3C4",
                    200: "#FCE588",
                    300: "#FADB5F",
                    400: "#F7C948",
                    500: "#F0B429",
                    600: "#DE911D",
                    700: "#CB6E17",
                    800: "#B44D12",
                    900: "#8D2B0B",
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
    ]
}
