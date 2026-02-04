"use client";
import { useAppStore } from "@/store/useAppStore";
import UniverseScene from "./UniverseScene";
import PlanetInterface from "./PlanetInterface";

export default function GalaxyView() {
  const { galaxyMode } = useAppStore();

  return (
    <div className="w-full h-screen bg-black absolute inset-0 z-0 animate-in fade-in duration-700">
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