import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    light: {
      primary: string;
    };
    dark: {
      primary: string;
    };
  }
}
