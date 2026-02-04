/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // 注意这里变了，不再是 'tailwindcss'
  },
};

export default config;