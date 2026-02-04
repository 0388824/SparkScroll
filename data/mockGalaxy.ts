export interface MockPlanet {
  id: string;
  name: string; // e.g. "Finance", "Design"
  color: string;
  position: [number, number, number]; // 3D 坐标
  size: number;
  mockInsights: {
    id: string;
    content: string;
    date: string;
    tag: string;
  }[];
}

export const MOCK_GALAXY_DATA: MockPlanet[] = [
  {
    id: "finance",
    name: "Finance & Macro",
    color: "#00D9FF",
    position: [0, 0, 0], // 中心位置，或者根据布局调整
    size: 1.2,
    mockInsights: [
      { id: "m1", content: "Bitcoin is the only hedge against systematic fiat devaluation.", date: "JAN 20", tag: "Store of Value" },
      { id: "m2", content: "The yield curve inversion is signaling a recession within 6 months.", date: "JAN 15", tag: "Macro" }
    ]
  },
  {
    id: "design",
    name: "Design & Identity",
    color: "#FF2E54",
    position: [3, 1, -2],
    size: 1.0,
    mockInsights: [
      { id: "m3", content: "Minimalism is dead; texture and chaos are the new luxury.", date: "FEB 01", tag: "Aesthetics" },
      { id: "m4", content: "Functionality without soul is just engineering.", date: "JAN 28", tag: "Philosophy" }
    ]
  },
  {
    id: "ai",
    name: "AI & Synthetic",
    color: "#A020F0",
    position: [-3, 2, 1],
    size: 1.1,
    mockInsights: [
      { id: "m5", content: "LLMs are reasoning engines, not databases.", date: "FEB 03", tag: "Cognition" },
      { id: "m6", content: "The uncanny valley is shrinking faster than we predicted.", date: "JAN 30", tag: "Robotics" }
    ]
  },
  {
    id: "gaming",
    name: "Gaming",
    color: "#39FF14",
    position: [2, -2, 3],
    size: 0.9,
    mockInsights: [
      { id: "m7", content: "Emergent gameplay beats scripted narrative every time.", date: "JAN 12", tag: "Game Design" }
    ]
  },
  {
    id: "music",
    name: "Music Culture",
    color: "#FFFF00",
    position: [-2, -2, -2],
    size: 0.8,
    mockInsights: [
      { id: "m8", content: "Sampling is the collage art of the 21st century.", date: "JAN 05", tag: "Production" }
    ]
  },
  {
    id: "social",
    name: "Social Structure",
    color: "#FFA500",
    position: [0, 3, -4],
    size: 1.3,
    mockInsights: [
      { id: "m9", content: "Digital tribes are replacing national identities.", date: "FEB 02", tag: "Sociology" }
    ]
  }
];