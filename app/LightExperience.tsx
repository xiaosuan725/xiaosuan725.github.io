"use client";

import dynamic from "next/dynamic";
import { LightLoading } from "./light/PageSurface";

const LightCanvas = dynamic(
  () => import("./light/LightCanvas").then((module) => module.LightCanvas),
  {
    loading: LightLoading,
    ssr: false,
  },
);

export function LightExperience() {
  return <LightCanvas />;
}
