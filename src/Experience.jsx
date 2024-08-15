import { useEffect, useRef, useState } from "react";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function Experience() {
  const { scene: computer } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );
  const { scene: desk } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/desk/model.gltf"
  );
  const { scene: headphone } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/headphones/model.gltf"
  );
  const { scene: glass } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/soda-glass/model.gltf"
  );
  const { scene: plant } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/plant/model.gltf"
  );

  const [startAnimation, setStartAnimation] = useState(false);
  const duration = 1500;
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);

  // Load the wall and floor textures
  const wallMap = useLoader(
    THREE.TextureLoader,
    '/textures/wall.jpg',
    (texture) => {
      console.log('Wall Texture loaded successfully');
    },
    (error) => {
      console.error('Error loading Wall Texture:', error);
    }
  );

  const floorMap = useLoader(
    THREE.TextureLoader,
    '/textures/woodenfloor.jpg',
    (texture) => {
      console.log('Floor Texture loaded successfully');
    },
    (error) => {
      console.error('Error loading Floor Texture:', error);
    }
  );

  useFrame(({ clock }) => {
    if (cameraRef.current && startAnimation) {
      const elapsed = clock.getElapsedTime() * 1000;
      const progress = Math.min(elapsed / duration, 1);

      const startPosition = new THREE.Vector3(5, 5, 5);
      const endPosition = new THREE.Vector3(0, 4, 4);
      cameraRef.current.position.lerpVectors(
        startPosition,
        endPosition,
        progress
      );

      if (progress === 1) {
        setStartAnimation(false);
      }
    }

    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  useEffect(() => {
    setStartAnimation(true);
  }, []);

  return (
    <>
      <Environment preset="city" />
      <color args={["#ffffff"]} attach="background" />
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[5, 5, 5]}
        fov={65}
      />

      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={1.0}
        panSpeed={1.0}
        rotateSpeed={1.0}
      />

      {/* Floor */}
      <mesh position={[0, -3.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          map={floorMap} // Apply the wooden floor texture
        />
      </mesh>

      {/* Right Wall */}
      <mesh position={[15, 6.4, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial
          map={wallMap} // Apply the wall texture
        />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 6.4, -15]} rotation={[0, 0, 0]}>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial
          map={wallMap} // Apply the wall texture
        />
      </mesh>

      {/* Baseboards */}
      {/* Right Wall Baseboard */}
      <mesh position={[14.75, -3, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[30, 1, 0.5]} />
        <meshStandardMaterial color="#aaaaaa" />
      </mesh>

      {/* Back Wall Baseboard */}
      <mesh position={[0, -3, -14.75]} rotation={[0, 0, 0]}>
        <boxGeometry args={[30, 1, 0.5]} />
        <meshStandardMaterial color="#aaaaaa" />
      </mesh>

      <primitive object={computer} position={[0, 0, 0]} />
      <primitive
        object={desk}
        scale={4}
        position={[0.6, -127.24, -18]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <primitive
        object={headphone}
        scale={0.8}
        position={[3, 1.34, 1.3]}
        rotation={[Math.PI / 2, 0, Math.PI]}
      />
      <primitive
        object={glass}
        scale={3}
        position={[-2.5, 0.42, 0]}
        rotation={[0, Math.PI, 0]}
      />
      <primitive
        object={plant}
        scale={1}
        position={[4, 0.7, -3]}
        rotation={[0, Math.PI, 0]}
      />
    </>
  );
}
