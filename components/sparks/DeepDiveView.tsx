"use client";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { VIDEOS } from "@/data/videos";
import { ArrowLeft, RefreshCw, Zap, Check, Disc } from "lucide-react"; // 引入 Disc 图标作为星球

export default function DeepDiveView() {
  const { selectedSpark, setActiveTab, addToGalaxy, goBack, enterPlanetView } = useAppStore();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  
  // 本地状态：控制按钮是否已“变身”
  const [isSynced, setIsSynced] = useState(false);

  if (!selectedSpark) return null;

  const originalVideo = VIDEOS.find(v => v.id === selectedSpark.videoId);
  const questions = originalVideo?.catalystQuestions || ["Thought starter?"];
  const topic = originalVideo?.topic || "General"; // 关键：获取 Topic

  const rotateQuestion = () => setQuestionIndex((prev) => (prev + 1) % questions.length);

  const handleAction = () => {
    // 状态 1: 还未发送 -> 执行发送逻辑
    if (!isSynced) {
        if (!inputValue.trim()) return;

        // 存入 Store
        addToGalaxy({
            id: Date.now().toString(),
            sparkId: selectedSpark.id,
            userInsight: inputValue,
            topic: topic, // 比如 "Design & Identity"
            timestamp: Date.now(),
        });

        // 视觉反馈：变身
        setIsSynced(true);
    } 
    // 状态 2: 已经发送 -> 执行跳转逻辑
    else {
        // 直接跳转到对应星球的微观视角
        enterPlanetView(topic);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col animate-in slide-in-from-right duration-300">
      
      {/* ... TopBar & Content 保持不变 (省略以节省篇幅，请保留之前的代码) ... */}
      <div className="absolute top-0 w-full h-[350px] bg-spark-blue/10 blur-[50px] opacity-40 pointer-events-none z-0" />
      <div className="relative z-50 flex items-center justify-between px-6 pt-14 pb-4">
        <button onClick={goBack} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-90 transition-all shadow-lg"><ArrowLeft size={20} /></button>
        <h1 className="text-spark-blue text-xs font-black tracking-[2px] uppercase bg-black/50 backdrop-blur-sm px-4 py-1 rounded-full border border-spark-blue/10">#{topic}</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-2 pb-[160px] relative z-10 no-scrollbar">
         {/* ... Video, Spark, Catalyst (保持之前的代码不变) ... */}
         {/* 这里为了完整性，你可以直接把之前的代码粘贴回来 */}
         <div className="w-full h-[200px] rounded-2xl border border-spark-blue/20 bg-[#111] overflow-hidden mb-8 relative group shadow-2xl">
             {originalVideo?.type === 'local' ? <video src={originalVideo.src} className="w-full h-full object-cover opacity-60" muted /> : <img src={originalVideo?.src} className="w-full h-full object-cover opacity-60" />}
         </div>
         <div className="mb-10 pl-1"><p className="text-white text-[20px] font-bold leading-relaxed tracking-wide">"{selectedSpark.content}"</p></div>
         <div className="relative bg-[#0A0A10] border-l-[3px] border-spark-blue rounded-r-xl rounded-bl-xl p-6 shadow-lg"><p className="text-white/80 text-[16px] font-medium italic">{questions[questionIndex]}</p></div>
      </div>

      {/* --- 核心修改：Input Dock --- */}
      <div className="absolute bottom-[85px] w-full px-6 py-6 bg-gradient-to-t from-black via-black to-transparent z-30">
        <div className="relative group">
            <input 
                type="text" 
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    if (isSynced) setIsSynced(false); // 如果用户修改了内容，重置状态
                }}
                disabled={isSynced} // 发送后暂时锁定，防止乱改（可选）
                placeholder={isSynced ? "Added to Galaxy!" : "Write your insight..."}
                className={`w-full bg-[#111] border rounded-2xl py-4 pl-5 pr-14 text-white text-sm outline-none transition-all shadow-xl ${
                    isSynced ? "border-green-500/50 text-green-400" : "border-white/10 focus:border-spark-blue/50"
                }`}
            />
            
            {/* 两段式按钮 */}
            <button 
              onClick={handleAction}
              disabled={!inputValue.trim()}
              className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-500 flex items-center justify-center w-10 h-10 rounded-full ${
                isSynced 
                  ? "bg-green-500/20 text-green-400 scale-110 hover:bg-green-500/30" 
                  : inputValue.trim() ? "text-spark-blue scale-100 opacity-100" : "text-white opacity-20 cursor-not-allowed"
              }`}
            >
                {/* 状态 1: 闪电 (发送) -> 状态 2: 星球 (跳转) */}
                {isSynced ? <Disc size={20} className="animate-pulse" /> : <Zap size={20} fill="currentColor" />}
            </button>
        </div>
      </div>
    </div>
  );
}