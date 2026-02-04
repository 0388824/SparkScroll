"use client";
import { useAppStore } from "@/store/useAppStore";
import { X, ArrowRight } from "lucide-react";

export default function ManualAsk() {
  const { setOverlay } = useAppStore();

  return (
    <div className="absolute inset-0 z-60 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 flex flex-col items-center justify-center px-6">
      
      {/* 核心输入区 */}
      <div className="w-full max-w-md relative group">
        
        {/* 霓虹发光边框装饰 */}
        <div className="absolute -inset-1 bg-gradient-to-r from-spark-blue to-purple-600 rounded-2xl blur opacity-30 group-focus-within:opacity-70 transition-opacity duration-500" />
        
        <div className="relative bg-[#0A0A12] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
          
          {/* --- 关闭按钮 (移入卡片内部右上角) --- */}
          <button 
            onClick={() => setOverlay('none')}
            className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* 输入框 */}
          <textarea 
            autoFocus
            placeholder="What sparks your mind about this?"
            className="w-full bg-transparent text-white text-xl font-medium placeholder:text-white/20 outline-none resize-none h-[120px] mt-2 pr-8" // pr-8 防止文字和关闭按钮重叠
          />

          {/* 发送/确认栏 */}
          <div className="flex justify-between items-center pt-4 border-t border-white/5">
            <span className="text-white/30 text-xs font-mono">AI ANALYZING...</span>
            
            {/* 闭环跳转：回到 SparkCard */}
            <button 
              onClick={() => setOverlay('sparkCard')} 
              className="w-10 h-10 rounded-full bg-spark-blue text-black flex items-center justify-center hover:scale-110 transition-transform shadow-neon"
            >
              <ArrowRight size={20} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}