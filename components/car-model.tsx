"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, PresentationControls, Stage, useGLTF } from "@react-three/drei"
import { motion } from "framer-motion-3d"

function CarModel({ modelPath }) {
  const group = useRef()
  const { scene } = useGLTF(modelPath)

  // Rotate the car slowly
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  return (
    <motion.group ref={group} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1.5, delay: 0.5 }}>
      <primitive object={scene} />
    </motion.group>
  )
}

export default function Car3D() {
  return (
    <div className="w-full h-[70vh] absolute inset-0 z-0">
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
        <color attach="background" args={["#0a0a0a"]} />
        <PresentationControls
          global
          zoom={0.8}
          rotation={[0, -Math.PI / 4, 0]}
          polar={[0, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <Stage environment="sunset" intensity={0.6} contactShadow shadows>
            <CarModel modelPath="/assets/3d/duck.glb" />
          </Stage>
        </PresentationControls>
        <Environment preset="sunset" />
      </Canvas>
    </div>
  )
}
