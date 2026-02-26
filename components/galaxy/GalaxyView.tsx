"use client";
import { useAppStore } from "@/store/useAppStore";
import UniverseScene from "./UniverseScene";
import PlanetInterface from "./PlanetInterface";

export default function GalaxyView() {
  const { galaxyMode } = useAppStore();

  return (
    // 修改点：
    // 1. absolute -> fixed (防止手机下拉刷新把页面拖走，锁死在屏幕上)
    // 2. h-screen -> h-[100dvh] (动态计算高度，扣除手机浏览器底栏，解决移动端显示不全问题)
    // 3. z-0 确保背景层级正确
    <div className="fixed inset-0 w-full h-[100dvh] bg-black z-0 overflow-hidden">
      {galaxyMode === 'orbit' ? (
        // 模式 1: 宏观宇宙 (3D)
        <UniverseScene />
      ) : (
        // 模式 2: 微观星球 (UI)
        <PlanetInterface />
      )}
    </div>
  );
}