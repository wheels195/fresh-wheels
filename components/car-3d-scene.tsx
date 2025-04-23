"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, useGLTF, ContactShadows } from "@react-three/drei"
import type { Group } from "three"
import { motion } from "framer-motion-3d"
import { MotionConfig } from "framer-motion"

function Car(props) {
  const group = useRef<Group>()
  // Since we don't have a specific car model, we'll use the duck as a placeholder
  // In a real implementation, you would replace this with an actual car model
  const { scene } = useGLTF("/assets/3d/duck.glb")

  // Rotate the car slowly
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
    }
  })

  return (
    <motion.group
      ref={group}
      {...props}
      initial={{ scale: 0, rotateX: 0 }}
      animate={{ scale: 15, rotateX: 0 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    >
      <primitive object={scene} />
    </motion.group>
  )
}

// Create a floating effect for the car
function FloatingCar() {
  const [hover, setHover] = useState(false)

  return (
    <motion.group
      position={[0, 0, 0]}
      animate={{
        y: hover ? 0.5 : 0,
      }}
      transition={{
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <Car />
    </motion.group>
  )
}

// Scene setup with proper camera and lighting
function Scene() {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 2, 10)
  }, [camera])

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <FloatingCar />
      <ContactShadows
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
        opacity={0.5}
        width={15}
        height={15}
        blur={2}
        far={1.5}
      />
      <Environment preset="sunset" />
    </>
  )
}

export default function Car3DScene() {
  return (
    <div className="absolute inset-0 z-0">
      <MotionConfig transition={{ duration: 0.5 }}>
        <Canvas shadows dpr={[1, 2]}>
          <Scene />
          <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />
        </Canvas>
      </MotionConfig>
    </div>
  )
}
