export interface PhraseData {
  text: string;
  bvid?: string;
  /** Fine-tune position delta in % of page size */
  dx?: number;
  dy?: number;
}

export const PHRASES: PhraseData[] = [
  { text: "我好累", bvid: "BV1ZE411r7tq" },
  { text: "好好活下去", bvid: "BV12b9VBEEg5" },
  { text: "迷茫", bvid: "BV1biR4YvEce" },
  { text: "加油", bvid: "BV1Sb41157hz" },
  { text: "爱", bvid: "BV1Gy4y1M7WN" },
  { text: "一切都失去了意义", bvid: "BV14fUFYVErT" },
  { text: "无病呻吟", bvid: "BV1NK4y137iy" },
  { text: "想开点", bvid: "BV1Ah4y1x71b" },
  { text: "离开", bvid: "BV1hJqYBuEoP", dy: -6 },
]

// export const PHRASES: PhraseData[] = [
//   { text: "离开" },
//   { text: "劳累" },
//   { text: "你就是装的" },
//   { text: "害怕" },
//   { text: "帮助" },
//   { text: "控制不住情绪" },
//   { text: "无病呻吟" },
//   { text: "健康", bvid: "BV1ZE411r7tq", dy: 6 },
//   { text: "曾经", dy: -8 },
//   { text: "关爱" },
//   { text: "对不起" },
//   { text: "好好活下去" },
//   { text: "严重" },
//   { text: "治疗" },
//   { text: "我也是" },
//   { text: "可以被治愈的" },
//   { text: "你很好" },
//   { text: "安慰" },
//   { text: "想开点" },
//   { text: "会好起来的" },
//   { text: "死" },
//   { text: "弄虚作假" },
//   { text: "理解" },
//   { text: "哭" },
//   { text: "忍耐" },
//   { text: "别矫情，你好着呢" },
//   { text: "药" },
//   { text: "微笑" },
//   { text: "心理承受能力差" },
//   { text: "阳光" },
//   { text: "加油" },
//   { text: "孤独" },
//   { text: "我没事" },
//   { text: "乐观" },
//   { text: "幸福" },
//   { text: "装" },
//   { text: "你很懂吗" },
//   { text: "你怎么还不去死" },
//   { text: "我想逃" },
//   { text: "勇敢" },
//   { text: "一切都失去了意义" },
//   { text: "快乐" },
//   { text: "谁来救救我" },
//   { text: "痛苦" },
// ];

export function getBvId(text: string): string {
  return PHRASES.find((p) => p.text === text)?.bvid ?? "";
}
