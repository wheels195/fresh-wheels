"use client"

import { Suspense, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, PresentationControls, ContactShadows, useGLTF, Float } from "@react-three/drei"
import { motion } from "framer-motion-3d"

// Car model component
function CarModel() {
  const car = useRef()

  // We're using a placeholder car model (the duck) since we don't have a specific car model
  // In a real implementation, you would use an actual car model
  const { scene } = useGLTF("/assets/3d/duck.glb")

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <motion.primitive
        ref={car}
        object={scene}
        scale={15}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        initial={{ scale: 0, y: -5 }}
        animate={{ scale: 15, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 15,
          delay: 0.5,
        }}
      />
    </Float>
  )
}

// Water droplets effect (simulating car washing)
function WaterDroplets({ count = 50 }) {
  const drops = Array.from({ length: count }).map((_, i) => ({
    position: [(Math.random() - 0.5) * 10, Math.random() * 10, (Math.random() - 0.5) * 10],
    scale: Math.random() * 0.2 + 0.1,
  }))

  return (
    <group>
      {drops.map((drop, i) => (
        <motion.mesh
          key={i}
          position={drop.position}
          initial={{ y: 10, opacity: 0 }}
          animate={{
            y: -5,
            opacity: [0, 1, 0],
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 2,
            },
          }}
        >
          <sphereGeometry args={[drop.scale, 16, 16]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.7} roughness={0.1} metalness={0.1} />
        </motion.mesh>
      ))}
    </group>
  )
}

export default function RealisticCarScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 2, 10], fov: 45 }}>
        <color attach="background" args={["#0a0a0a"]} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

        <Suspense fallback={null}>
          <PresentationControls
            global
            zoom={0.8}
            rotation={[0, -Math.PI / 6, 0]}
            polar={[0, Math.PI / 6]}
            azimuth={[-Math.PI / 6, Math.PI / 6]}
          >
            <CarModel />
            <WaterDroplets count={30} />
          </PresentationControls>

          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} />

          <Environment preset="sunset" />
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  )
}
