"use client";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { VIDEOS } from "@/data/videos";
import { RotateCcw, Keyboard, Plus, Check, ArrowRight, X } from "lucide-react";

export default function SparkCard() {
  // 1. 确保这里析构出了 openDeepDive
  const { setOverlay, currentVideoIndex, addSpark, openDeepDive } = useAppStore();
  
  const [sparkIndex, setSparkIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const currentVideo = VIDEOS[currentVideoIndex];
  const topic = currentVideo?.topic || "Unknown";
  const sparks = currentVideo?.sparks || ["Thinking..."];
  const currentSparkContent = sparks[sparkIndex];

  const rotateSpark = () => {
    setSparkIndex((prev) => (prev + 1) % sparks.length);
    setIsAdded(false);
  };

  const handleAdd = () => {
    if (isAdded) return;
    addSpark({
      id: Date.now().toString(),
      content: currentSparkContent,
      videoAuthor: currentVideo.author,
      videoId: currentVideo.id,
      timestamp: Date.now(),
    });
    setIsAdded(true);
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end pb-[110px] px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setOverlay('none')} />

      <div className="relative w-full bg-[#1A1A24]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden transition-all duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-spark-blue shadow-neon" />
            <span className="text-spark-blue text-xs font-bold tracking-widest uppercase">{topic}</span>
          </div>
          <button onClick={() => setOverlay('none')} className="text-white/40 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Spark Content */}
        <h2 key={sparkIndex} className="text-white text-xl font-medium leading-relaxed mb-8 animate-in slide-in-from-bottom-2 fade-in duration-300">
          {currentSparkContent}
        </h2>

        {/* Added Feedback */}
        {isAdded && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-full border border-green-500/50 flex items-center gap-2 animate-in zoom-in duration-200 z-10">
            <Check size={12} className="text-green-400" />
            <span>Added to Sparks</span>
          </div>
        )}

        {/* Toolbar */}
        <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
          <div className="flex gap-6">
            <button onClick={rotateSpark} className="text-white/40 hover:text-white hover:rotate-180 transition-all duration-500">
              <RotateCcw size={24} strokeWidth={1.5} />
            </button>
            <button onClick={() => setOverlay('manualAsk')} className="text-white/40 hover:text-white transition-colors hover:text-spark-blue">
              <Keyboard size={24} strokeWidth={1.5} />
            </button>
            <button onClick={handleAdd} className={`transition-all duration-300 ${isAdded ? "text-green-400 scale-110" : "text-white/40 hover:text-white"}`}>
              {isAdded ? <Check size={24} strokeWidth={2.5} /> : <Plus size={24} strokeWidth={1.5} />}
            </button>
          </div>

          {/* 2. Deep Dive 按钮：保存 -> 跳转 */}
          <button 
            onClick={() => {
              // A. 构造数据
              const sparkData = {
                id: Date.now().toString(),
                content: currentSparkContent,
                videoAuthor: currentVideo.author,
                videoId: currentVideo.id,
                timestamp: Date.now(),
              };
              
              // B. 强制保存
              addSpark(sparkData);
              
              // C. 关闭当前遮罩
              setOverlay('none');
              
              // D. 执行跳转
              openDeepDive(sparkData);
            }}
            className="flex items-center gap-2 text-white font-bold pr-2 group"
          >
            <span className="text-sm group-hover:text-spark-blue transition-colors">Deep Dive</span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-spark-blue border border-spark-blue/30 group-hover:bg-spark-blue group-hover:text-black transition-all">
              <ArrowRight size={16} strokeWidth={3} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}