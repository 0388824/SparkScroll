"use client";
import { useAppStore } from "@/store/useAppStore";
import { Home, Zap, Plus, Disc, User } from "lucide-react"; // Disc 用来代替 Galaxy 图标

export default function BottomNav() {
  const { activeTab, setActiveTab, setOverlay } = useAppStore();

  // 通用样式类
  const navItemClass = (tabName: string) => `
    flex flex-col items-center gap-1 transition-colors duration-300
    ${activeTab === tabName ? "text-white" : "text-white/40 hover:text-white/70"}
  `;

  return (
    <div className="fixed bottom-0 w-full h-[85px] bg-black/90 backdrop-blur-xl border-t border-white/10 z-40 px-6 pb-4 pt-3">
      <div className="flex justify-between items-center h-full">
        
        {/* 1. Home Tab */}
        <button 
          onClick={() => setActiveTab('home')}
          className={navItemClass('home')}
        >
          <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        {/* 2. Sparks Tab */}
        <button 
          onClick={() => setActiveTab('sparks')}
          className={navItemClass('sparks')}
        >
          <Zap size={24} strokeWidth={activeTab === 'sparks' ? 2.5 : 2} fill={activeTab === 'sparks' ? "currentColor" : "none"} />
          <span className="text-[10px] font-bold">Sparks</span>
        </button>

        {/* 3. Create Button (中间加号) */}
        <button 
          onClick={() => setOverlay('manualAsk')} // 点击加号直接唤起提问框
          className="relative top-[-5px]"
        >
          <div className="w-[48px] h-[32px] bg-white rounded-xl border-x-[3px] border-x-gray-300 flex items-center justify-center hover:scale-105 transition-transform active:scale-95">
            <Plus size={20} className="text-black" strokeWidth={3} />
          </div>
        </button>

        {/* 4. Galaxy Tab */}
        <button 
          onClick={() => setActiveTab('galaxy')}
          className={navItemClass('galaxy')}
        >
          {/* 这里用 Disc 模拟星球/星系图标 */}
          <Disc size={24} strokeWidth={activeTab === 'galaxy' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Galaxy</span>
        </button>

        {/* 5. Me Tab (Profile) */}
        <button 
          onClick={() => setActiveTab('me')}
          className={navItemClass('me')}
        >
          <User size={24} strokeWidth={activeTab === 'me' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Me</span>
        </button>

      </div>
    </div>
  );
}