import create from "zustand";

export type Tab = "followings" | "followers" | "repositories" | "stars";

type RootState = {
  tab: Tab;
  changeTab: (tab: Tab) => void;
};

const useStoreTheme = create<RootState>((set) => ({
  tab: "followings",
  changeTab: (tab) => set(() => ({ tab })),
}));

export default useStoreTheme;
