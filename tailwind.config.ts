import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // 针对你现在的根目录结构进行匹配
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 定义 3.2 版核心电光蓝
        'spark-blue': '#00D9FF',
      },
      boxShadow: {
        // 用于 Orb 和卡片的霓虹光效
        'neon': '0 0 15px rgba(0, 217, 255, 0.4)',
        'neon-intense': '0 0 30px rgba(0, 217, 255, 0.6)',
      }
    },
  },
  plugins: [],
};
export default config;