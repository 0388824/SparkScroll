import { create } from 'zustand';

export type ViewState = 'home' | 'sparks' | 'deep-dive' | 'galaxy' | 'me';
type GalaxyMode = 'orbit' | 'planet'; // 新增：轨道模式(ZoomOut) vs 星球模式(ZoomIn)

export interface GalaxyNode {
  id: string;
  sparkId: string;
  userInsight: string;
  topic: string; // 新增：必须知道属于哪个星球
  timestamp: number;
}

// ... SavedSpark interface 保持不变 ...
export interface SavedSpark {
  id: string;
  content: string;
  videoAuthor: string;
  videoId: number;
  timestamp: number;
}

interface AppState {
  activeTab: ViewState;
  previousTab: ViewState;
  
  // --- Galaxy 状态 ---
  galaxyMode: GalaxyMode; 
  focusedPlanet: string | null; // 当前看着哪个星球 (topic name)
  galaxyNodes: GalaxyNode[]; // 真实的用户数据

  // ... 其他现有状态 ...
  activeOverlay: 'none' | 'sparkCard' | 'manualAsk';
  currentVideoIndex: number;
  savedSparks: SavedSpark[];
  selectedSpark: SavedSpark | null;

  setActiveTab: (tab: ViewState) => void;
  setOverlay: (overlay: 'none' | 'sparkCard' | 'manualAsk') => void;
  setCurrentVideoIndex: (index: number) => void;
  addSpark: (spark: SavedSpark) => void;
  openDeepDive: (spark: SavedSpark) => void;
  addToGalaxy: (node: GalaxyNode) => void;
  goBack: () => void;
  
  // --- 新增动作 ---
  enterPlanetView: (topic: string) => void; // 进入微观视角
  enterOrbitView: () => void; // 进入宏观视角
}

export const useAppStore = create<AppState>((set) => ({
  activeTab: 'home',
  previousTab: 'home',
  
  galaxyMode: 'orbit', // 默认宏观
  focusedPlanet: null,
  galaxyNodes: [],

  // ... 其他初始状态 ...
  activeOverlay: 'none',
  currentVideoIndex: 0,
  savedSparks: [],
  selectedSpark: null,

  setActiveTab: (tab) => set((state) => ({ 
    activeTab: tab, 
    previousTab: state.activeTab !== tab ? state.activeTab : state.previousTab,
    // 如果直接点底部 Galaxy Tab，默认重置为宏观视角
    galaxyMode: tab === 'galaxy' ? 'orbit' : state.galaxyMode 
  })),

  // ... setOverlay, setCurrentVideoIndex, addSpark 保持不变 ...
  setOverlay: (overlay) => set({ activeOverlay: overlay }),
  setCurrentVideoIndex: (index) => set({ currentVideoIndex: index }),
  addSpark: (spark) => set((state) => {
      if (state.savedSparks.find(s => s.content === spark.content)) return state;
      return { savedSparks: [spark, ...state.savedSparks] };
  }),

  openDeepDive: (spark) => set((state) => ({ 
    selectedSpark: spark, 
    activeTab: 'deep-dive',
    previousTab: state.activeTab
  })),

  addToGalaxy: (node) => set((state) => ({
    galaxyNodes: [node, ...state.galaxyNodes]
  })),

  goBack: () => set((state) => ({ activeTab: state.previousTab })),

  // --- 新动作实现 ---
  enterPlanetView: (topic) => set({ 
    activeTab: 'galaxy', 
    galaxyMode: 'planet', 
    focusedPlanet: topic 
  }),

  enterOrbitView: () => set({ 
    activeTab: 'galaxy', 
    galaxyMode: 'orbit', 
    focusedPlanet: null 
  })
}));