/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content:  ['./src/**/*.{js,ts,jsx,tsx,vue}', './index.html'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: true, // Ensure preflight is enabled
  },
}

// modules.exports = {
//   purge: ['./src/**/*.{js,ts,jsx,tsx,vue}', './public/index.html'],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// }

