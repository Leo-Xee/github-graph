import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    background: string;
    font: string;
    "search-bg": string;
    "search-border": string;
    "box-shadow": string;
    icon: string;
    "icon-hover": string;
  }
}
