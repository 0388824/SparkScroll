"use client";
import { useAppStore } from "@/store/useAppStore";
import { Zap, Clock, ArrowRight } from "lucide-react";

export default function SparksView() {
  const { savedSparks, openDeepDive } = useAppStore(); // 确保引入了 openDeepDive

  return (
    <div className="w-full min-h-screen bg-[#050505] pt-[110px] pb-[100px] px-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8 px-2">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tighter uppercase">Spark Buffer</h1>
          <p className="text-white/40 text-xs font-mono mt-1">24H RETENTION CYCLE</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-spark-blue/10 flex items-center justify-center border border-spark-blue/20">
          <Zap size={20} className="text-spark-blue fill-current" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {savedSparks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
            <Zap size={48} className="text-white mb-4" strokeWidth={1} />
            <p className="text-sm font-medium">No sparks collected yet.</p>
          </div>
        ) : (
          savedSparks.map((spark) => (
            <button 
              key={spark.id} 
              onClick={() => openDeepDive(spark)} // 确保这里调用正常
              className="relative group w-full text-left bg-[#121218] border border-white/5 rounded-2xl p-5 hover:bg-[#1A1A24] hover:border-spark-blue/50 transition-all duration-300 active:scale-[0.98]"
            >
              <div className="absolute left-0 top-4 bottom-4 w-1 bg-gradient-to-b from-spark-blue to-transparent rounded-r-full opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-start gap-4">
                <p className="text-white/90 text-lg font-medium leading-relaxed mb-4 line-clamp-2">
                  {spark.content}
                </p>
                <ArrowRight className="text-spark-blue opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={20} />
              </div>
              <div className="flex justify-between items-center border-t border-white/5 pt-3 group-hover:border-white/10">
                <span className="text-spark-blue text-xs font-bold uppercase tracking-wider">
                  {spark.videoAuthor}
                </span>
                <div className="flex items-center gap-1 text-white/30 text-xs font-mono">
                  <Clock size={12} />
                  <span>23:59:00</span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}