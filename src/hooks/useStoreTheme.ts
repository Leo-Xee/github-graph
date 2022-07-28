import create from "zustand";

export type Theme = "light" | "dark";

type RootState = {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
};

const useStoreTheme = create<RootState>((set) => ({
  theme: "light",
  changeTheme: (theme) => set(() => ({ theme })),
}));

export default useStoreTheme;
