"use client";
import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { VIDEOS } from "@/data/videos";
import TopBar from "./TopBar"; // <--- 1. 引入组件

export default function HomeView() {
  const { setOverlay, setCurrentVideoIndex, activeTab } = useAppStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // ... (handleScroll 和 useEffect 逻辑完全保持不变) ...
  const handleScroll = () => {
    if (containerRef.current) {
      const scrollPosition = containerRef.current.scrollTop;
      const height = containerRef.current.clientHeight;
      const index = Math.round(scrollPosition / height);
      if (index !== activeIndex && VIDEOS[index]) {
        setActiveIndex(index);
        setCurrentVideoIndex(index); 
      }
    }
  };

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      const shouldPlay = activeTab === 'home' && index === activeIndex;
      if (shouldPlay) {
        video.play().catch((err) => console.log("Autoplay prevented:", err));
      } else {
        video.pause();
      }
    });
  }, [activeIndex, activeTab]);

  const currentVideo = VIDEOS[activeIndex];
  if (!currentVideo) return null;
  const hasSpark = currentVideo.hasSpark;

  return (
    <div className="relative w-full h-screen bg-black">
      
      {/* --- 2. 插入 TopBar (只在 Home 显示) --- */}
      <TopBar />

      {/* 视频滚动容器 */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar scroll-smooth"
      >
        {VIDEOS.map((video, index) => (
          <div key={video.id} className="relative w-full h-full snap-start snap-always shrink-0 overflow-hidden bg-black">
            {video.type === "local" ? (
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                src={video.src}
                className="w-full h-full object-cover pointer-events-none"
                loop
                playsInline
              />
            ) : null}
            <div className="absolute bottom-0 w-full h-[250px] bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Orb 交互区 */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-8 z-30">
         {/* ... (Orb 代码保持不变) ... */}
         <button 
          onClick={() => hasSpark ? setOverlay('sparkCard') : setOverlay('manualAsk')}
          className="relative group cursor-pointer transition-all duration-700"
        >
          <div className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-500 ${hasSpark ? "opacity-40 animate-ping" : "opacity-0"}`} style={{ backgroundColor: hasSpark ? '#00D9FF' : 'transparent' }} />
          <div className="relative w-[54px] h-[54px] rounded-full flex items-center justify-center border-2 transition-all duration-500" style={{ borderColor: hasSpark ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.3)', backgroundColor: hasSpark ? '#00D9FF' : 'rgba(255,255,255,0.05)', boxShadow: hasSpark ? '0 0 30px rgba(0, 217, 255, 0.6)' : 'none', transform: hasSpark ? 'scale(1)' : 'scale(0.9)' }}>
            <div className={`rounded-full bg-white transition-all ${hasSpark ? "w-4 h-4 animate-pulse" : "w-2 h-2 opacity-40"}`} />
          </div>
        </button>

         {/* 社交按钮 ... (保持不变) ... */}
         <div className="flex flex-col gap-6 items-center">
            <button className="flex flex-col items-center gap-1"><Heart size={28} className="text-white/90 drop-shadow-md" /><span className="text-white/90 text-xs font-bold shadow-black">{currentVideo.stats.likes}</span></button>
            <button className="flex flex-col items-center gap-1"><MessageCircle size={28} className="text-white/90 drop-shadow-md" /><span className="text-white/90 text-xs font-bold shadow-black">{currentVideo.stats.comments}</span></button>
            <button className="flex flex-col items-center gap-1"><Share2 size={28} className="text-white/90 drop-shadow-md" /><span className="text-white/90 text-xs font-bold shadow-black">Share</span></button>
         </div>
      </div>

      {/* 底部信息区 */}
      <div className="absolute bottom-[100px] left-6 right-20 z-10 pointer-events-none">
        <h3 className="text-white font-bold text-lg drop-shadow-md">{currentVideo.author}</h3>
        <p className="text-white/90 text-sm mt-2 line-clamp-3 leading-relaxed drop-shadow-md">{currentVideo.desc}</p>
      </div>

    </div>
  );
}