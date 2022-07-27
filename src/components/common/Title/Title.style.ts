import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const move = keyframes`
 0% {
   background-position: 0%;
 } 
 100% {
   background-position: 100%;
 } 
`;

export const Container = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 17%;
`;

export const Heading = styled.h1`
  margin: 5rem auto 2rem;
  width: fit-content;
  padding: 0 1rem;
  text-align: center;
  line-height: 1;
  font-size: 10rem;
  font-weight: 900;
  letter-spacing: -4px;
  color: transparent;
  background-size: 400%;
  background-position: -100%;
  background-image: linear-gradient(to left, #6741d9 0%, #fa5252 50%, #3b5bdb 100%);
  background-clip: text;
  -webkit-background-clip: text;
  user-select: none;
  animation: ${move} 4s infinite alternate-reverse;
`;

export const Description = styled.p`
  padding: 0 2rem;
  letter-spacing: -1px;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  user-select: none;
`;
