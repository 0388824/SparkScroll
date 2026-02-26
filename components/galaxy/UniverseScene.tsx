"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Text, Line } from "@react-three/drei";
import { useAppStore } from "@/store/useAppStore";
import { MOCK_GALAXY_DATA } from "@/data/mockGalaxy";
import { useMemo } from "react";
import * as THREE from "three";

// 单个星球组件
function Planet({ data, onClick }: any) {
  return (
    <group position={data.position} onClick={(e) => { e.stopPropagation(); onClick(data.name); }}>
      {/* 星球本体 */}
      <mesh>
        <sphereGeometry args={[data.size, 32, 32]} />
        <meshStandardMaterial color={data.color} emissive={data.color} emissiveIntensity={0.5} roughness={0.2} />
      </mesh>
      {/* 星球光晕 */}
      <mesh scale={[1.4, 1.4, 1.4]}>
        <sphereGeometry args={[data.size, 32, 32]} />
        <meshBasicMaterial color={data.color} transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>
      {/* 星球文字标签 */}
      <Text position={[0, data.size + 1, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
        {data.name.toUpperCase()}
      </Text>
    </group>
  );
}

// 连线组件
function Connections() {
  const points = useMemo(() => MOCK_GALAXY_DATA.map(p => new THREE.Vector3(...p.position)), []);
  return (
    <Line 
      points={points} 
      color="#00D9FF" 
      opacity={0.4}       // 线条透明度
      transparent 
      lineWidth={4}       // 线条粗细
      // closed 属性已移除，防止报错
    />
  );
}

export default function UniverseScene() {
  const { enterPlanetView } = useAppStore();

  return (
    <>
      {/* 顶部提示文字 */}
      <div className="absolute top-0 w-full z-10 pt-14 text-center pointer-events-none">
        <h1 className="text-white text-xl font-black tracking-widest uppercase drop-shadow-neon">Galaxy View</h1>
        <p className="text-white/40 text-xs mt-1">Pinch to zoom · Tap planet to explore</p>
      </div>

      {/* 3D 场景画布 */}
      <Canvas 
        camera={{ position: [0, 5, 10], fov: 50 }} 
        // 关键修复：限制最大像素比为 2，防止高分屏手机(iPhone)崩溃或过热
        dpr={[1, 2]} 
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Connections />
        
        {MOCK_GALAXY_DATA.map((planet) => (
          <Planet 
            key={planet.id} 
            data={planet} 
            onClick={(topic: string) => enterPlanetView(topic)} 
          />
        ))}

        {/* 关键修复：enablePan={false} 禁止双指平移，防止把星球拖出屏幕外 */}
        <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </>
  );
}