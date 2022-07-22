import create from "zustand";

export type Tab = "followings" | "followers" | "repositories" | "stars";
export type Theme = "light" | "dark";

type RootState = {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
  tab: Tab;
  changeTab: (tab: Tab) => void;
};

const useStore = create<RootState>((set) => ({
  theme: "light",
  changeTheme: (theme) => set(() => ({ theme })),
  tab: "followings",
  changeTab: (tab) => set(() => ({ tab })),
}));

export default useStore;
