"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text, Float, Line } from "@react-three/drei";
import { useAppStore } from "@/store/useAppStore";
import { MOCK_GALAXY_DATA } from "@/data/mockGalaxy";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Planet({ data, onClick }: any) {
  return (
    <group position={data.position} onClick={(e) => { e.stopPropagation(); onClick(data.name); }}>
      <mesh>
        <sphereGeometry args={[data.size, 32, 32]} />
        <meshStandardMaterial color={data.color} emissive={data.color} emissiveIntensity={0.5} roughness={0.2} />
      </mesh>
      {/* 光晕 */}
      <mesh scale={[1.4, 1.4, 1.4]}>
        <sphereGeometry args={[data.size, 32, 32]} />
        <meshBasicMaterial color={data.color} transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>
      <Text position={[0, data.size + 1, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
        {data.name.toUpperCase()}
      </Text>
    </group>
  );
}

function Connections() {
  const points = useMemo(() => MOCK_GALAXY_DATA.map(p => new THREE.Vector3(...p.position)), []);
  return <Line points={points} color="#00D9FF" opacity={0.1} transparent lineWidth={1} />;
}

export default function UniverseScene() {
  const { enterPlanetView } = useAppStore();

  return (
    <>
      <div className="absolute top-0 w-full z-10 pt-14 text-center pointer-events-none">
        <h1 className="text-white text-xl font-black tracking-widest uppercase drop-shadow-neon">Galaxy View</h1>
        <p className="text-white/40 text-xs mt-1">Pinch to zoom · Tap planet to explore</p>
      </div>

      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
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

        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </>
  );
}