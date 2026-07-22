import type { CSSProperties, Ref } from "react";
import { INITIAL_LIGHT, type LightingSettings } from "./config";

type PageSurfaceProps = {
  lighting: LightingSettings;
  onLightingChange: (patch: Partial<LightingSettings>) => void;
  onReset: () => void;
  preview?: boolean;
  sourceRef?: Ref<HTMLDivElement>;
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function PageSurface({
  lighting,
  preview = false,
  sourceRef,
}: PageSurfaceProps) {
  return (
    <div
      ref={sourceRef}
      className="page-source"
      style={{ "--lamp-color": lighting.color } as CSSProperties}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="page-bg"
        src={`${BASE_PATH}/cat.png`}
        alt=""
        draggable={false}
      />
    </div>
  );
}

const ignoreLightingChange = () => {};
const ignoreReset = () => {};

export function LightPreview({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className={`scene-preview${hidden ? " is-hidden" : ""}`} aria-hidden="true" inert>
      <PageSurface
        lighting={INITIAL_LIGHT}
        onLightingChange={ignoreLightingChange}
        onReset={ignoreReset}
        preview
      />
    </div>
  );
}

export function LightLoading() {
  return (
    <main className="experience-shell" aria-label="Interactive light study">
      <LightPreview />
      <div className="scene-status" aria-live="polite">
        <span /> LOADING INTERACTIVE LIGHT
      </div>
    </main>
  );
}
