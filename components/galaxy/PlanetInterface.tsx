"use client";
import { useAppStore } from "@/store/useAppStore";
import { MOCK_GALAXY_DATA } from "@/data/mockGalaxy";
import { ArrowLeft, Zap } from "lucide-react";

export default function PlanetInterface() {
  const { focusedPlanet, enterOrbitView, galaxyNodes } = useAppStore();

  // 1. 找到当前星球的 Mock 数据
  const currentPlanetMock = MOCK_GALAXY_DATA.find(p => p.name === focusedPlanet) || MOCK_GALAXY_DATA[0];

  // 2. 筛选真实用户数据 (匹配 Topic)
  const realUserInsights = galaxyNodes.filter(node => node.topic === focusedPlanet);

  return (
    <div className="w-full h-screen bg-[#080810] flex flex-col relative overflow-hidden">
      
      {/* 背景纹理 (左侧星球局部) */}
      <div 
        className="absolute -left-[50%] top-0 w-full h-full rounded-full blur-[80px] opacity-30 pointer-events-none"
        style={{ background: currentPlanetMock.color }}
      />

      {/* Top Bar */}
      <div className="relative z-50 flex items-center px-6 pt-14 pb-4">
        <button onClick={enterOrbitView} className="text-white/80 hover:text-white p-2 -ml-2">
          <ArrowLeft size={28} />
        </button>
        <h1 className="flex-1 text-center text-white text-lg font-black tracking-widest uppercase">
          {focusedPlanet}
        </h1>
        <div className="w-8" />
      </div>

      {/* Stats */}
      <div className="px-8 mb-6 flex gap-8 z-10">
        <div>
          <div className="text-3xl font-black text-white">{realUserInsights.length + currentPlanetMock.mockInsights.length}</div>
          <div className="text-[10px] text-white/40 font-bold uppercase">Total Insights</div>
        </div>
        <div>
          <div className="text-3xl font-black text-white">3</div>
          <div className="text-[10px] text-white/40 font-bold uppercase">Active Links</div>
        </div>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto px-6 pb-[120px] z-10 no-scrollbar space-y-4">
        
        {/* --- 真实用户数据 (高亮显示) --- */}
        {realUserInsights.map((node) => (
          <div key={node.id} className="bg-white/10 border border-spark-blue/50 rounded-2xl p-5 animate-in slide-in-from-bottom-5 duration-500">
             <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-spark-blue uppercase">Just Added · You</span>
                <div className="w-2 h-2 bg-spark-blue rounded-full animate-pulse" />
             </div>
             <p className="text-white text-[15px] font-medium leading-relaxed">
               {node.userInsight}
             </p>
          </div>
        ))}

        {/* --- Mock 数据 (填充背景) --- */}
        {currentPlanetMock.mockInsights.map((item) => (
          <div key={item.id} className="bg-white/5 border border-white/5 rounded-2xl p-5 opacity-80">
             <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-white/30 uppercase">{item.date} · {item.tag}</span>
             </div>
             <p className="text-white/80 text-[15px] leading-relaxed">
               {item.content}
             </p>
          </div>
        ))}
        
      </div>
    </div>
  );
}