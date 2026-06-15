"use client";

import { Canvas } from "@react-three/fiber";
import WaterPlane from "./WaterPlane";

/**
 * Thin R3F wrapper. Imported dynamically (ssr:false) so three.js never
 * touches the server render. A CSS gradient stands in until it mounts.
 */
export default function WaterCanvas() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: false, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 1], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
    >
      <WaterPlane />
    </Canvas>
  );
}
