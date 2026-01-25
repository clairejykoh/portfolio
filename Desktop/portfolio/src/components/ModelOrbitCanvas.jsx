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
  initialAzimuth = Math.PI * 0.1,
  initialPolar = Math.PI * 0.25,
  radius = 59,

  // NEW: mouse mapping
  azimuthRange = Math.PI * 1.2, // total swing left↔right (e.g., 1.2π = 216°)
  hoverOnly = true,            // only update while pointer is over canvas
  smoothing = 0.12,            // lerp for camera
}) {
  const controlsRef = useRef(null);
  const { camera, gl } = useThree();

  const state = useRef({
    azimuth: initialAzimuth,
    polar: initialPolar,
    radius,
    mouseNormX: 0,    // -1..+1
    isHovering: false,
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

    const getNormX = (clientX) => {
      const r = el.getBoundingClientRect();
      const x01 = (clientX - r.left) / r.width;      // 0..1
      return THREE.MathUtils.clamp(x01 * 2 - 1, -1, 1); // -1..1
    };

    const onMove = (e) => {
      if (hoverOnly && !state.current.isHovering) return;
      state.current.mouseNormX = getNormX(e.clientX);
    };

    const onEnter = () => {
      state.current.isHovering = true;
    };

    const onLeave = () => {
      state.current.isHovering = false;
    };

    // Use pointer events for consistency
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [gl, hoverOnly]);

  useFrame(() => {
    const c = controlsRef.current;
    if (!c) return;

    const s = state.current;

    // Map mouse x (-1..1) to azimuth around initialAzimuth
    const desiredAzimuth = initialAzimuth + s.mouseNormX * (azimuthRange / 2);

    // Smooth the azimuth itself (prevents jitter)
    s.azimuth = THREE.MathUtils.lerp(s.azimuth, desiredAzimuth, 0.08);

    spherical.set(s.radius, s.polar, s.azimuth);
    pos.setFromSpherical(spherical).add(targetVec);

    camera.position.lerp(pos, smoothing);
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
  height = 700,
}) {
  const target = useMemo(() => new THREE.Vector3(20, -20, 0), []);
  const [radius, setRadius] = useState(3);

  return (
    <div style={{ height, width: "100%" }}>
      <Canvas 
        camera={{ position: [10, 10, 10], fov: 45 }}
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
            onCentered={({ size }) => setRadius(Math.max(1.5, size * 0.15))}
          />
        </Suspense>

<ScrollOrbitRig
  target={target}
  radius={radius}
  initialAzimuth={Math.PI * 0.10}
  initialPolar={Math.PI * 0.25}
  azimuthRange={Math.PI * 1.2} // adjust: bigger = more rotation across screen
  hoverOnly={true}
/>
      </Canvas>
    </div>
  );
}

useGLTF.preload(`${import.meta.env.BASE_URL}models/penn.glb`);