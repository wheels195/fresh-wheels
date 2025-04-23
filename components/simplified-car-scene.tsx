"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage } from "@react-three/drei"

// Simple car representation using basic Three.js geometries
function SimpleCar() {
  return (
    <group position={[0, 0, 0]}>
      {/* Car body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 0.8, 6]} />
        <meshStandardMaterial color="#cc0000" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Car roof */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2.5, 0.7, 3]} />
        <meshStandardMaterial color="#cc0000" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Wheels */}
      <mesh position={[-1, -0.5, 1.5]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.7} />
      </mesh>
      <mesh position={[1, -0.5, 1.5]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.7} />
      </mesh>
      <mesh position={[-1, -0.5, -1.5]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.7} />
      </mesh>
      <mesh position={[1, -0.5, -1.5]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.7} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.8, -1.2]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[2.4, 0.1, 1.2]} />
        <meshStandardMaterial color="#aaddff" transparent opacity={0.7} metalness={0.2} roughness={0} />
      </mesh>
    </group>
  )
}

// Water droplets using simple spheres
function WaterDroplets() {
  return (
    <group>
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 6, Math.random() * 5, (Math.random() - 0.5) * 6]}>
          <sphereGeometry args={[0.05 + Math.random() * 0.05, 8, 8]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  )
}

export default function SimplifiedCarScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [5, 3, 5], fov: 50 }}>
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

        <Suspense fallback={null}>
          <Stage environment="sunset" intensity={0.5}>
            <SimpleCar />
            <WaterDroplets />
          </Stage>
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
