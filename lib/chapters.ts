const ASSET_BASE = "/assets";

export type ChapterId = "prologue" | "ch1" | "ch2" | "ch3" | "ch4" | "ch5" | "giftbox" | "finale" | "fin";

export interface PhotoChapterData {
  id: ChapterId;
  type: "photo";
  pinHeightVh: number;
  baseImage: string;
  writeImage: string;
  subtitle: string;
  handwritingTitle?: string;
  handwritingLines?: string[];
}

export interface LetterChapterData {
  id: ChapterId;
  type: "letter";
  pinHeightVh: number;
  date: string;
  title: string;
  body: { text: string; highlight?: boolean }[];
  signature: string;
}

export interface GiftBoxChapterData {
  id: "giftbox";
  type: "giftbox";
  pinHeightVh: number;
  text: string;
}

export interface TicketChapterData {
  id: ChapterId;
  type: "ticket";
  pinHeightVh: number;
  subtitle: string;
  cardLines: [string, string, string];
}

export interface PrologueData {
  id: "prologue";
  type: "prologue";
  pinHeightVh: number;
}

export interface FinChapterData {
  id: "fin";
  type: "fin";
  pinHeightVh: number;
}

export type SectionData =
  | PrologueData
  | PhotoChapterData
  | LetterChapterData
  | GiftBoxChapterData
  | TicketChapterData
  | FinChapterData;

export const SUBTITLES: Record<string, string> = {
  ch1: "05/24 — すべてが変わった日",
  ch2: "景色が変わる日常",
  ch3: "幸福とあなた",
  ch4: "感謝だけではきっと表せない",
  ch5: "いつもありがとう。",
  finale: "次の旅行はバリ島で始めよう。",
};

export const SECTIONS: SectionData[] = [
  { id: "prologue", type: "prologue", pinHeightVh: 120 },
  {
    id: "ch1", type: "photo", pinHeightVh: 310,
    baseImage: `${ASSET_BASE}/ch1_base.png?v=1`, writeImage: `${ASSET_BASE}/ch1_write.png?v=1`, subtitle: SUBTITLES.ch1,
    handwritingTitle: "あの日から、全部変わった。",
    handwritingLines: [
      "ようやく出会えた素敵な人。",
      "パンケーキの甘さよりも",
      "君の所作や彩りのある服装に",
      "視線が映っていた。",
      "歩幅やあの景色の匂いまで",
      "全て記憶にある。",
    ],
  },
  {
    id: "ch2", type: "photo", pinHeightVh: 280,
    baseImage: `${ASSET_BASE}/ch2_base.png`, writeImage: `${ASSET_BASE}/ch2_write.png`, subtitle: SUBTITLES.ch2,
    handwritingTitle: "ここにいる、それだけでよかった。",
    handwritingLines: [
      "冗談で始まった美術館へのドライブ。",
      "この旅行で初めて、小さな喧嘩をしたことを覚えてる。",
      "怖さもあったけど、距離が限りなく縮まった瞬間。",
    ],
  },
  {
    id: "ch3", type: "photo", pinHeightVh: 260,
    baseImage: `${ASSET_BASE}/ch3_base.png`, writeImage: `${ASSET_BASE}/ch3_write.png`, subtitle: SUBTITLES.ch3,
    handwritingTitle: "この瞬間が、幸せだった。",
    handwritingLines: [
      "料理も思い出も一緒に手作りした夜。",
      "心の温まる素敵な1日でした。",
      "早く猫のワインを一緒に飲もうね。",
    ],
  },
  {
    id: "ch4", type: "photo", pinHeightVh: 400,
    baseImage: `${ASSET_BASE}/ch4_base.png?v=1`, writeImage: `${ASSET_BASE}/ch4_write.png?v=1`, subtitle: SUBTITLES.ch4,
    handwritingTitle: "どこへでも、一緒に行きたい。",
    handwritingLines: [
      "できるなら、まだ見たことの景色を一緒に見たい。",
      "まだ知らない経験や思い出を作りたい。",
      "出来るならば、焼き直しじゃない思い出がいい。",
      "あなただけとの思い出が欲しい。",
      "",
      "",
      "ヨーロッパやアメリカ、南米やトルコ？",
      "どこがいいかな。",
    ],
  },
  {
    id: "ch5",
    type: "letter",
    pinHeightVh: 420,
    date: "2026年3月12日",
    title: "ゆまちゃんへ。",
    body: [
      { text: "いつも、私の夢を聞いてくれてありがとう。どんなに突拍子もない話でも、ちゃんと聞いて、応援してくれること、ずっと嬉しかった。" },
      { text: "好きな景色も、好きな時間も、好きなご飯も、考えていることまで一緒で、あなたといると、不思議な気持ちになる。きっとあなたとだけだと思っている。", highlight: true },
      { text: "大学院の研究で大変なのに、それでも前を向いて頑張っているゆまちゃんが、本当に大好き。" },
      { text: "2025年は、あなたと過ごした日々で満ちていた。小さな瞬間も、大きな決断も、全部覚えている。" },
      { text: "これからも、一緒に景色を変えていこう。" },
    ],
    signature: "— 感謝と愛を込めて",
  },
  { id: "giftbox", type: "giftbox", pinHeightVh: 280, text: "私からのささやかなプレゼント。" },
  { id: "finale", type: "ticket", pinHeightVh: 340, subtitle: SUBTITLES.finale, cardLines: ["Destination: Bali", "Valid: 2026", "Gift: 2 tickets"] },
  { id: "fin", type: "fin", pinHeightVh: 200 },
];
