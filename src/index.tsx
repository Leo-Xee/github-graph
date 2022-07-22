import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";

import App from "./App";

const element = document.getElementById("root");
if (!element) throw Error("Root container missing in index.html");

const root = ReactDOM.createRoot(element);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
