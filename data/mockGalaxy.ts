// @/data/mockGalaxy.ts

export interface CognitionNode {
  id: string;
  date: string;
  tag: string;
  content: string; // 列表页显示的核心观点
  thought_flow: string; // 点击后 Deep Dive 显示的深度思考
}

export interface PlanetData {
  id: string;
  name: string;
  color: string;
  size: number;
  position: [number, number, number];
  mockInsights: CognitionNode[];
  linked_to?: string[];
}

export const MOCK_GALAXY_DATA: PlanetData[] = [
  {
    id: "planet_tech",
    name: "Tech & Engineering", 
    color: "#00D9FF", 
    size: 2.1,
    position: [0, 0, 0], 
    mockInsights: [
      {
        id: "tech_001",
        date: "2026-02-26",
        tag: "Privacy Display",
        content: "Switchable hardware is a trade-off: We gain functional privacy at the permanent cost of transparency.",
        thought_flow: "Analyzing the leap from passive films to active electromagnetic louver layers in Samsung S26 Ultra. Realizing that hardware transparency is becoming a programmable dynamic variable."
      },
      {
        id: "tech_002",
        date: "2026-02-26",
        tag: "Medieval Armor",
        content: "Armor is a material engineering boundary; the mace is a kinetic bypass of that boundary.",
        thought_flow: "Deconstructing combat mechanics in KCD2: Why blunt weapons are the hard counter to plate armor through kinetic impact vs. surface hardness."
      }
    ]
  },
  {
    id: "planet_biz_strategy",
    name: "Business Strategy", 
    color: "#FFD700", 
    size: 1.6,
    position: [6, 2, -4], 
    mockInsights: [
      {
        id: "biz_001",
        date: "2026-02-26",
        tag: "F&B Bias",
        content: "Retention is the only hard currency of truth. Vocal reviews are often 'post-truth' noise.",
        thought_flow: "Identifying how social pressure masks true customer preference in dine-in scenarios. Because leaving is embarrassing, ordering doesn't equal satisfaction."
      }
    ]
  },
  {
    id: "planet_legal",
    name: "Legal Logic", 
    color: "#FF4D4D", 
    size: 2.0, 
    position: [-5, 4, 3], 
    mockInsights: [
      {
        id: "legal_001", // 路径 1: 工伤
        date: "2026-02-26",
        tag: "Labor Law",
        content: "Labor law is a systemic risk re-distribution mechanism, shielding individuals from operational friction.",
        thought_flow: "Deconstructing why 'personal error' doesn't negate industrial compensation. Scaling the logic to high-value industrial equipment damage as a systemic cost."
      },
      {
        id: "legal_002", // 路径 2: 交通法
        date: "2026-02-26",
        tag: "Traffic Law",
        content: "Motorist liability is a 'Hazard Tax' on the kinetic energy released into public spaces.",
        thought_flow: "Challenging the 'duty of observation' from a physics perspective. Realizing that law prioritizes system-wide risk pooling over individual micro-fairness."
      }
    ]
  },
  {
    id: "planet_governance",
    name: "Governance & Power", 
    color: "#4169E1", 
    size: 2.2,
    position: [4, -4, 6], 
    mockInsights: [
      {
        id: "gov_001",
        date: "2026-02-26",
        tag: "Power Structure",
        content: "Stability is achieved either by making rebellion structurally impossible or by making it an expensive trade.",
        thought_flow: "Comparing Western Feudalism's political trading vs. Chinese Imperial structural elimination of defection via bureaucratic rotation."
      },
      {
        id: "gov_002",
        date: "2026-02-26",
        tag: "Cognitive Control",
        content: "The ultimate power is not force, but the removal of the capacity to conceive rebellion through algorithms.",
        thought_flow: "Re-imagining Orwell's 1984 in 2026: Shift from 'deleting the past' to 'optimizing the neural present' via predictive feedback loops."
      }
    ]
  }
];