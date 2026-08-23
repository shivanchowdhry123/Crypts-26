"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const MAX_DIST = 130;
const PARTICLE_COUNT = 60;
const PARTICLE_SPEED = 0.35;

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  
  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * PARTICLE_SPEED;
    this.vy = (Math.random() - 0.5) * PARTICLE_SPEED;
    this.r = Math.random() * 1.8 + 0.6;
  }

  move(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }
}

function ParticleNetwork() {
  const { size, pointer } = useThree();
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => new Particle(size.width, size.height));
  }, [size.width, size.height]);

  const { positions, colors, pointPositions } = useMemo(() => {
    // Max possible lines = N * (N - 1) / 2
    // We add 1 for the mouse pointer
    const maxLines = (PARTICLE_COUNT + 1) * PARTICLE_COUNT / 2;
    return {
      positions: new Float32Array(maxLines * 6), // 2 vertices per line, 3 coords per vertex
      colors: new Float32Array(maxLines * 6),
      pointPositions: new Float32Array(PARTICLE_COUNT * 3),
    };
  }, []);

  useFrame(() => {
    let lineIndex = 0;
    
    // Update particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles[i].move(size.width, size.height);
      
      // Update point positions (centered around 0,0 for Three.js coordinates)
      pointPositions[i * 3] = particles[i].x - size.width / 2;
      pointPositions[i * 3 + 1] = -(particles[i].y - size.height / 2);
      pointPositions[i * 3 + 2] = 0;
    }

    // Mouse coordinates in pixel space (matching particle coordinate system)
    const mouseX = (pointer.x * size.width) / 2 + size.width / 2;
    const mouseY = -(pointer.y * size.height) / 2 + size.height / 2;
    
    const allNodes = [{ x: mouseX, y: mouseY, r: 0 }, ...particles];

    for (let i = 0; i < allNodes.length; i++) {
      for (let j = i + 1; j < allNodes.length; j++) {
        const dx = allNodes[i].x - allNodes[j].x;
        const dy = allNodes[i].y - allNodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.35;
          
          // Convert to Three.js coordinates
          const x1 = allNodes[i].x - size.width / 2;
          const y1 = -(allNodes[i].y - size.height / 2);
          const x2 = allNodes[j].x - size.width / 2;
          const y2 = -(allNodes[j].y - size.height / 2);

          // Line start
          positions[lineIndex * 6] = x1;
          positions[lineIndex * 6 + 1] = y1;
          positions[lineIndex * 6 + 2] = 0;
          
          colors[lineIndex * 6] = 0;     // R
          colors[lineIndex * 6 + 1] = 0.95; // G (243/255)
          colors[lineIndex * 6 + 2] = 1;    // B (255/255)

          // Line end
          positions[lineIndex * 6 + 3] = x2;
          positions[lineIndex * 6 + 4] = y2;
          positions[lineIndex * 6 + 5] = 0;

          colors[lineIndex * 6 + 3] = 0;
          colors[lineIndex * 6 + 4] = 0.95;
          colors[lineIndex * 6 + 5] = 1;

          // Instead of using vertex colors with alpha which can be tricky in LineBasicMaterial,
          // we modify the brightness based on distance. 
          // For a better look in ThreeJS, we scale the color channels by alpha.
          for(let c=0; c<6; c++) {
              colors[lineIndex * 6 + c] *= alpha * 2.5; // Boost visibility
          }

          lineIndex++;
        }
      }
    }

    if (linesRef.current) {
      const geometry = linesRef.current.geometry;
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;
      geometry.setDrawRange(0, lineIndex * 2);
    }
    
    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            args={[pointPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={2} color="#00f3ff" transparent opacity={0.55} sizeAttenuation={false} />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            args={[colors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </>
  );
}

export default function WebGLBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 100], fov: 75 }}
        orthographic
        gl={{ alpha: true, antialias: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <ParticleNetwork />
      </Canvas>
    </div>
  );
}
