import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("Welcome message를 보여준다.", () => {
  render(<App />);
  const element = screen.getByRole("heading", {
    name: "Welcome to the React-Starter-Pack",
  });
  expect(element).toBeInTheDocument();
});
