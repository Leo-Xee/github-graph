import React from "react";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import theme from "./styles/theme";
import Home from "@/pages/Home";
import UserDetail from "@/pages/UserDetail/UserDetail";
import NotFound from "@/pages/NotFound";
import GlobalStyle from "./styles/GlobalStyle";
import useTheme from "./hooks/useTheme";
import Layout from "./components/common/Layout";

function App() {
  const [mode] = useTheme();

  return (
    <ThemeProvider theme={theme[mode]}>
      <GlobalStyle />
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/:username" element={<UserDetail />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
