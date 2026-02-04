"use client";
import { useAppStore } from "@/store/useAppStore";
import HomeView from "@/components/home/HomeView";
import SparksView from "@/components/sparks/SparksView";
import DeepDiveView from "@/components/sparks/DeepDiveView"; // 1. 引入组件
import GalaxyView from "@/components/galaxy/GalaxyView"; 
import SparkCard from "@/components/home/SparkCard";
import ManualAsk from "@/components/home/ManualAsk";

export default function Page() {
  const { activeTab, activeOverlay } = useAppStore();

  return (
    <>
      {/* Home: 只有在 home tab 时显示，其他时候隐藏 */}
      <div className={activeTab === 'home' ? 'block' : 'hidden'}>
        <HomeView />
      </div>
      
      {/* 2. 注册路由：确保 deep-dive 能被渲染 */}
      {activeTab === 'sparks' && <SparksView />}
      {activeTab === 'deep-dive' && <DeepDiveView />} {/* <--- 关键！没这行就黑屏 */}
      {activeTab === 'galaxy' && <GalaxyView />}
      
      {/* Overlays */}
      {activeOverlay === 'sparkCard' && <SparkCard />}
      {activeOverlay === 'manualAsk' && <ManualAsk />}
    </>
  );
}