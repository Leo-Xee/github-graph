import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

type TitleProps = {
  title: string;
};

const move = keyframes`
 0% {
   background-position: 0%;
 } 
 100% {
   background-position: 100%;
 } 
`;

const Heading = styled.h1`
  margin: 5rem auto;
  width: fit-content;
  padding: 0 1rem;
  line-height: 1;
  font-size: 7rem;
  font-weight: 900;
  letter-spacing: -6px;
  color: transparent;
  background-size: 400%;
  background-position: -100%;
  background-image: linear-gradient(to left, #6741d9 0%, #fa5252 50%, #3b5bdb 100%);
  background-clip: text;
  -webkit-background-clip: text;
  user-select: none;
  animation: ${move} 5s infinite alternate-reverse;
`;
function Title({ title }: TitleProps) {
  return <Heading>{title}</Heading>;
}

export default Title;
