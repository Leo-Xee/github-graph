import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const gradient = keyframes`
  0% {
    background-color: rgba(165, 165, 165, 0.1);
  }
  50% {
    background-color: rgba(165, 165, 165, 0.3);
  }
  100% {
    background-color: rgba(165, 165, 165, 0.1);
  }
`;

export const Container = styled.div`
  display: flex;
  padding: 15px;
  gap: 15px;
  border: ${({ theme }) => theme["search-border"]};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme["box-shadow"]};
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2.5;
`;

export const Image = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  animation: ${gradient} 1.5s infinite ease-out;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 7.5;
`;

export const Title = styled.div`
  width: 150px;
  height: 20px;
  border-radius: 4px;
  animation: ${gradient} 1.5s infinite ease-out;
`;

export const List = styled.div`
  width: 100px;
  height: 18px;
  border-radius: 4px;
  animation: ${gradient} 1.5s infinite ease-out;
`;
