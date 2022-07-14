import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    background: string;
    font: string;
    "font-light": string;
    "search-bg": string;
    "search-border": string;
    "search-hover": string;
    "image-bg": string;
    "box-shadow": string;
    icon: string;
    "icon-hover": string;
  }
}
