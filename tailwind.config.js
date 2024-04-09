/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{html,js}',
        './*.html',
        './node_modules/flowbite/**/*.js',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
            },
            letterSpacing: {
                custom: '0.02em', // Use your desired value
            },
            height: {
                200: '200px', // Default
                250: '250px', // sm
                300: '300px', // md
                360: '360px', // lg
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};
