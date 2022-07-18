import create from "zustand";

type Tab = "followings" | "followers" | "repositories" | "stars";

type RootState = {
  tab: Tab;
  changeTab: (tab: Tab) => void;
};

const useStore = create<RootState>((set) => ({
  tab: "followings",
  changeTab: (tab) => set(() => ({ tab })),
}));

export default useStore;
