"use client";
import { Search } from "lucide-react";

export default function TopBar() {
  return (
    <div className="absolute top-0 left-0 w-full z-40 px-6 pt-14 pb-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
      
      {/* 左侧占位 (为了让中间绝对居中) */}
      <div className="w-6" />

      {/* 中间 Tabs: Discover | For You | Deep */}
      <div className="flex items-center gap-6 text-[16px] font-bold pointer-events-auto drop-shadow-md">
        <button className="text-white/50 hover:text-white transition-colors">
          Discover
        </button>
        
        <button className="text-white relative flex flex-col items-center gap-1">
          For You
          {/* 选中状态的小圆点 */}
          <div className="w-1 h-1 bg-white rounded-full shadow-neon" />
        </button>
        
        <button className="text-white/50 hover:text-white transition-colors">
          Deep
        </button>
      </div>

      {/* 右侧：放大镜 */}
      <button className="text-white pointer-events-auto hover:scale-110 transition-transform">
        <Search size={22} strokeWidth={2.5} />
      </button>
      
    </div>
  );
}