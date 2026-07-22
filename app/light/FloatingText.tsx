import { useMemo } from "react";

const PHRASES = [
  "离开", "劳累", "你就是装的", "害怕", "帮助", "控制不住情绪",
  "无病呻吟", "健康", "曾经", "关爱", "对不起", "好好活下去",
  "严重", "治疗", "我也是", "可以被治愈的", "你很好", "安慰",
  "想开点", "会好起来的", "死", "弄虚作假", "理解", "哭",
  "忍耐", "别矫情，你好着呢", "药", "微笑", "心理承受能力差",
  "阳光", "加油", "孤独", "我没事", "乐观", "幸福", "装",
  "你很懂吗", "你怎么还不去死", "我想逃", "勇敢",
  "一切都失去了意义", "快乐", "谁来救救我", "痛苦",
];

// Fine-tune individual phrase positions (delta in % of page size).
// Positive deltaY = move down, negative = move up.
const ADJUST: Record<string, { dx?: number; dy?: number }> = {
  "曾经": { dy: -8 },
  "健康": { dy: 6 },
};

interface Fragment {
  text: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  blur: number;
  offsetX: number;
  offsetY: number;
  skewX: number;
  skewY: number;
}

function seedRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Cat at bottom-center (x: 33-66%, y: 45-100%).
// Text only above and on the sides, NOT below the cat.
// Each slot has explicit x/y % and gets exactly one phrase.
function buildSlots(): { cx: number; cy: number }[] {
  const slots: { cx: number; cy: number }[] = [];

  // Hand-placed for organic distribution. Minimum ~12% between neighbors.

  // --- Top cluster ---
  slots.push({ cx: 15, cy: 5 });  slots.push({ cx: 42, cy: 4 });
  slots.push({ cx: 72, cy: 6 });  slots.push({ cx: 90, cy: 8 });

  // --- Upper-left cluster ---
  slots.push({ cx: 8, cy: 17 });  slots.push({ cx: 30, cy: 16 });

  // --- Upper-right ---
  slots.push({ cx: 68, cy: 15 }); slots.push({ cx: 88, cy: 18 });

  // --- Mid-left ---
  slots.push({ cx: 6, cy: 28 });  slots.push({ cx: 25, cy: 30 });
  slots.push({ cx: 48, cy: 27 });

  // --- Mid-right ---
  slots.push({ cx: 73, cy: 28 }); slots.push({ cx: 93, cy: 26 });

  // --- Just above cat ---
  slots.push({ cx: 16, cy: 39 }); slots.push({ cx: 38, cy: 40 });
  slots.push({ cx: 60, cy: 38 }); slots.push({ cx: 82, cy: 40 });

  // --- Left of cat ---
  slots.push({ cx: 8, cy: 53 });  slots.push({ cx: 22, cy: 58 });

  // --- Right of cat ---
  slots.push({ cx: 80, cy: 55 }); slots.push({ cx: 92, cy: 60 });

  // --- Bottom corners ---
  slots.push({ cx: 10, cy: 76 }); slots.push({ cx: 28, cy: 78 });
  slots.push({ cx: 88, cy: 75 }); slots.push({ cx: 74, cy: 80 });

  // --- Bottom far ---
  slots.push({ cx: 16, cy: 90 }); slots.push({ cx: 84, cy: 91 });

  return slots;
}

function generateFragments(): Fragment[] {
  const rng = seedRandom(42);
  const slots = buildSlots();

  // Shuffle
  for (let i = slots.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [slots[i], slots[j]] = [slots[j], slots[i]];
  }

  const fragments: Fragment[] = [];
  const used = new Set<string>();
  const picked: string[] = [];

  for (const phrase of PHRASES) {
    if (used.has(phrase)) continue;
    used.add(phrase);
    picked.push(phrase);
    if (picked.length >= slots.length) break;
  }

  for (let i = 0; i < picked.length; i++) {
    const slot = slots[i];
    const rng2 = seedRandom(i * 137 + 99);

    const jitterX = (rng2() - 0.5) * 2;
    const jitterY = (rng2() - 0.5) * 1.5;

    const isLong = picked[i].length > 4;
    const size = isLong ? 22 + rng2() * 22 : 28 + rng2() * 34;

    // Clamp position to avoid overflow off the page-source.
    // Long text needs more right-side padding (text renders rightward from x).
    const charCount = picked[i].length;
    const estimatedWidthPercent = (charCount * size) / 13.44; // 1344px = 100%
    const padLeft = 4 + size / 18;
    const padRight = Math.max(padLeft, 4 + estimatedWidthPercent * 1.1);
    const padY = 4 + size / 12;
    const rawX = slot.cx + jitterX;
    const rawY = slot.cy + jitterY;
    const x = Math.max(padLeft, Math.min(100 - padRight, rawX));
    const y = Math.max(padY, Math.min(100 - padY, rawY));

    const opacity = 0.15 + rng2() * 0.28;
    const blur = rng2() * 0.45;

    fragments.push({
      text: picked[i],
      x,
      y,
      size,
      opacity,
      blur,
      offsetX: (rng2() - 0.5) * 2,
      offsetY: (rng2() - 0.5) * 1.5,
      skewX: (rng2() - 0.5) * 3.5,
      skewY: (rng2() - 0.5) * 2,
    });
  }

  // Apply per-phrase adjustments from config
  for (const f of fragments) {
    const adj = ADJUST[f.text];
    if (adj?.dx != null) f.x = Math.max(4, Math.min(96, f.x + adj.dx));
    if (adj?.dy != null) f.y = Math.max(4, Math.min(96, f.y + adj.dy));
  }

  return fragments;
}

export function FloatingText() {
  const fragments = useMemo(() => generateFragments(), []);

  return (
    <div className="floating-text-layer" aria-hidden="true">
      {fragments.map((f, i) => (
        <span
          key={i}
          className="floating-fragment"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            fontSize: `${f.size}px`,
            opacity: f.opacity,
            filter: f.blur > 0.35 ? `blur(${f.blur}px)` : undefined,
            transform: `translate(${f.offsetX}px, ${f.offsetY}px) skew(${f.skewX}deg, ${f.skewY}deg)`,
          }}
        >
          {f.text}
        </span>
      ))}
    </div>
  );
}
