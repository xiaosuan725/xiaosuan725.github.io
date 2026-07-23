import type { CSSProperties, Ref } from "react";
import type { LightingSettings } from "./config";
import { FloatingText } from "./FloatingText";

type PageSurfaceProps = {
  lighting: LightingSettings;
  onLightingChange: (patch: Partial<LightingSettings>) => void;
  onReset: () => void;
  preview?: boolean;
  sourceRef?: Ref<HTMLDivElement>;
  onPhraseClick?: (text: string) => void;
};

export function PageSurface({
  lighting,
  sourceRef,
  onPhraseClick,
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
        src="/cat.png"
        alt=""
        draggable={false}
      />
      <FloatingText onPhraseClick={onPhraseClick} />
    </div>
  );
}

export function LightPreview({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className={`scene-preview${hidden ? " is-hidden" : ""}`} aria-hidden="true" inert>
      <div className="preview-placeholder" />
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
