import styled from "@emotion/styled";
import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

import useTheme from "@/hooks/useTheme";

type LayoutProps = {
  children: React.ReactNode;
};

const ThemeButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px;
  background-color: ${({ theme }) => theme["board-bg"]};
  box-shadow: ${({ theme }) => theme["box-shadow"]};
  border: ${({ theme }) => theme["search-border"]};
  border-radius: 50%;
  z-index: 10;
`;

function Layout({ children }: LayoutProps) {
  const [theme, toggleTheme] = useTheme();

  return (
    <div>
      <ThemeButton type="button" onClick={() => toggleTheme()}>
        {theme === "light" ? (
          <FaSun size={30} color="#f59f00" />
        ) : (
          <FaMoon size={30} color="#ffd43b" />
        )}
      </ThemeButton>
      {children}
    </div>
  );
}

export default Layout;
