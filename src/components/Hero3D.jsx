import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function EnergyCore({ color }) {
    const meshRef = useRef();

    useFrame((state, delta) => {
        meshRef.current.rotation.y += delta * 0.5;
        meshRef.current.rotation.x += delta * 0.2;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef}>
                <octahedronGeometry args={[1.5, 0]} />
                <meshStandardMaterial
                    color={color || "#EC1D24"}
                    wireframe
                    emissive={color || "#EC1D24"}
                    emissiveIntensity={2}
                    toneMapped={false}
                />
            </mesh>
            <mesh scale={1.2}>
                <icosahedronGeometry args={[1, 1]} />
                <meshBasicMaterial color="#000" transparent opacity={0.8} />
            </mesh>
        </Float>
    );
}

export default function Hero3D({ color }) {
    return (
        <div className="w-full h-full absolute inset-0 z-0 opacity-80 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color={color || "#EC1D24"} />
                <EnergyCore color={color} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} enablePan={false} />
            </Canvas>
        </div>
    );
}
