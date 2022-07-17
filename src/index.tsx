import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@emotion/react";
import client from "./apollo";

import App from "./App";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";

const element = document.getElementById("root");
if (!element) throw Error("Root container missing in index.html");

const mode = "light";

const root = ReactDOM.createRoot(element);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme[mode]}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
