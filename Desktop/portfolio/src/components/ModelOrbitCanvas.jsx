// ModelOrbitCanvas.jsx
import React, { useEffect, useMemo, useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Environment } from "@react-three/drei";

function Model({ url, onCentered }) {
  const { scene } = useGLTF(url);

 useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);

    const size = box.getSize(new THREE.Vector3()).length();
    onCentered?.({ size });

    scene.traverse((child) => {
      if (child.isMesh) {
        // Hide original surface
        child.material.visible = false;

        // Create white edge lines
        const edges = new THREE.EdgesGeometry(child.geometry, 1);
        const line = new THREE.LineSegments(
          edges,
          new THREE.LineBasicMaterial({ color: 0xffffff })
        );

        line.renderOrder = 1;
        child.add(line);
      }
    });
  }, [scene, onCentered]);

  return <primitive object={scene} />;
}

function ScrollOrbitRig({
  target,
  initialAzimuth = Math.PI * 0.29,
  initialPolar = Math.PI * 0.25,
  radius = 3,
  scrollSpeed = 0.0015,
  clampPolar = [0.15, Math.PI - 0.15],
}) {
  const controlsRef = useRef(null);
  const { camera, gl } = useThree();

  const state = useRef({
    azimuth: initialAzimuth,
    polar: initialPolar,
    radius,
  });

  // keep radius in sync if it changes after load
  useEffect(() => {
    state.current.radius = radius;
  }, [radius]);

  const pos = useMemo(() => new THREE.Vector3(), []);
  const spherical = useMemo(() => new THREE.Spherical(), []);
  const targetVec = useMemo(() => target.clone(), [target]);

  useEffect(() => {
    const el = gl.domElement;

    const onWheel = (e) => {
      e.preventDefault();
      state.current.azimuth += e.deltaY * scrollSpeed;
      state.current.polar = THREE.MathUtils.clamp(
        state.current.polar,
        clampPolar[0],
        clampPolar[1]
      );
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [gl, scrollSpeed, clampPolar]);

  useFrame(() => {
    const c = controlsRef.current;
    if (!c) return;

    const { azimuth, polar, radius: r } = state.current;

    spherical.set(r, polar, azimuth);
    pos.setFromSpherical(spherical).add(targetVec);

    camera.position.lerp(pos, 0.12);
    c.target.copy(targetVec);
    c.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      enableRotate={false}
    />
  );
}

export default function ModelOrbitCanvas({
  url = `${import.meta.env.BASE_URL}models/penn.glb`,
  height = 600,
}) {
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const [radius, setRadius] = useState(3);

  return (
    <div style={{ height, width: "100%" }}>
      <Canvas 
        camera={{ position: [0, 0, 3], fov: 45 }}
  gl={{ antialias: true }}
  onCreated={({ gl }) => {
    gl.setClearColor(0x000000, 1);
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
  }}>
        <ambientLight intensity={2.0} />
        <directionalLight position={[-50, 100, 100]} intensity={1.2} />

        <Suspense fallback={<Html center>Loading…</Html>}>
          <Model
            url={url}
            onCentered={({ size }) => setRadius(Math.max(1.8, size * 0.8))}
          />
        </Suspense>

        <ScrollOrbitRig target={target} radius={radius} scrollSpeed={0.0015} />
      </Canvas>
    </div>
  );
}

useGLTF.preload(`${import.meta.env.BASE_URL}models/penn.glb`);