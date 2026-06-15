"use client";

import dynamic from "next/dynamic";

const WaterCanvas = dynamic(() => import("./WaterCanvas"), {
  ssr: false,
  loading: () => <GradientFallback />,
});

function GradientFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(to bottom, #F5F0E6 0%, #EFE8D9 42%, #E7DDC9 52%, #CBD3CC 70%, #7E6E73 100%)",
      }}
    />
  );
}

export default function WaterBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <WaterCanvas />
    </div>
  );
}
