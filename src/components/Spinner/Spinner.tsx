import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

type SpinnerProps = {
  size: number;
};

const spin = keyframes` 
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spin = styled.div<SpinnerProps>`
  margin: 0 12.5px;
  border: 2.5px solid ${({ theme }) => theme.icon};
  border-top: 2.5px solid ${({ theme }) => theme["icon-hover"]};
  border-radius: 50%;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  animation: ${spin} 1s linear infinite;
`;

function Spinner({ size }: SpinnerProps) {
  return <Spin size={size} />;
}

export default Spinner;
