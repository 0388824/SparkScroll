export interface VideoData {
  id: number;
  author: string;
  desc: string;
  hasSpark: boolean;
  type: "local" | "youtube" | "image";
  src: string;
  stats: {
    likes: string;
    comments: string;
    shares: string;
  };
  topic?: string;
  sparks: string[]; // 这是金句（Spark Card里用的）
  
  // --- 新增字段：Catalyst 问题库 (Deep Dive里用的) ---
  catalystQuestions: string[]; 
}

export const VIDEOS: VideoData[] = [
  {
    id: 1,
    author: "@PorscheUSA",
    desc: "The 911 didn't just take him home, it carried him into the life he had always dreamed of. #Porsche #911",
    hasSpark: false, 
    type: "local",
    src: "/videos/porsche.mp4", 
    stats: { likes: "1.9K", comments: "80", shares: "109" },
    topic: "Design & Identity",
    sparks: [
      "Is a car mere transport, or a physical vessel for the future version of yourself?",
      "True design aligns mechanism with ambition.",
      "The destination is irrelevant when the machine is an extension of your soul."
    ],
    // --- 专门针对 Deep Dive 的提问 ---
    catalystQuestions: [
      "Does your current environment accelerate your purpose or hold you back?",
      "What is the physical 'vessel' that would carry you to your best self?",
      "If you stripped away the utility, what 'feeling' does your work provide?"
    ]
  },
  {
    id: 2,
    author: "@AndreiJikh",
    desc: "Investors Don't Trust The Fed. Ending QT usually means something is breaking in the financial system. #Bitcoin #Fed",
    hasSpark: true, 
    type: "local",
    src: "/videos/bitcoin.mp4",
    stats: { likes: "6.2K", comments: "640", shares: "2.1K" },
    topic: "Finance & Macro",
    sparks: [
      "The risk isn't in the model, but in pricing 10 years of efficiency into today's market.",
      "Bitcoin is the canary in the coal mine.",
      "Efficiency bubbles burst when narrative outpaces utility."
    ],
    // --- 专门针对 Deep Dive 的提问 ---
    catalystQuestions: [
      "Where else in your life are you pricing in 'future gains' that haven't happened yet?",
      "What is the 'canary in the coal mine' for your own industry?",
      "Are you optimizing for efficiency or resilience?"
    ]
  },
];