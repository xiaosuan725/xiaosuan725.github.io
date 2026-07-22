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

  // --- Row 1: top area, few sparse items ---
  slots.push({ cx: 20, cy: 6 });
  slots.push({ cx: 50, cy: 5 });
  slots.push({ cx: 80, cy: 7 });

  // --- Row 2: upper-mid ---
  slots.push({ cx: 12, cy: 16 });
  slots.push({ cx: 40, cy: 14 });
  slots.push({ cx: 62, cy: 15 });
  slots.push({ cx: 88, cy: 17 });

  // --- Row 3: above cat zone ---
  slots.push({ cx: 8, cy: 26 });
  slots.push({ cx: 28, cy: 24 });
  slots.push({ cx: 72, cy: 24 });
  slots.push({ cx: 92, cy: 27 });

  // --- Row 4: just above cat ---
  slots.push({ cx: 6, cy: 35 });
  slots.push({ cx: 24, cy: 37 });
  slots.push({ cx: 45, cy: 36 });
  slots.push({ cx: 55, cy: 37 });
  slots.push({ cx: 76, cy: 35 });
  slots.push({ cx: 94, cy: 36 });

  // --- Left side of cat ---
  slots.push({ cx: 5, cy: 50 });
  slots.push({ cx: 18, cy: 52 });
  slots.push({ cx: 5, cy: 63 });
  slots.push({ cx: 16, cy: 65 });

  // --- Right side of cat ---
  slots.push({ cx: 95, cy: 50 });
  slots.push({ cx: 82, cy: 53 });
  slots.push({ cx: 95, cy: 64 });
  slots.push({ cx: 84, cy: 66 });

  // --- Bottom-left corner ---
  slots.push({ cx: 8, cy: 80 });
  slots.push({ cx: 22, cy: 82 });

  // --- Bottom-right corner ---
  slots.push({ cx: 92, cy: 80 });
  slots.push({ cx: 78, cy: 83 });

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

    const jitterX = (rng2() - 0.5) * 3;
    const jitterY = (rng2() - 0.5) * 2.5;

    const isLong = picked[i].length > 4;
    const size = isLong ? 22 + rng2() * 22 : 28 + rng2() * 34;
    const opacity = 0.15 + rng2() * 0.28;
    const blur = rng2() * 0.45;

    fragments.push({
      text: picked[i],
      x: slot.cx + jitterX,
      y: slot.cy + jitterY,
      size,
      opacity,
      blur,
      offsetX: (rng2() - 0.5) * 2,
      offsetY: (rng2() - 0.5) * 1.5,
      skewX: (rng2() - 0.5) * 3.5,
      skewY: (rng2() - 0.5) * 2,
    });
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
