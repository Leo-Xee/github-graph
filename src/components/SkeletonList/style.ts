import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const gradient = keyframes`
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
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  width: 500px;
  height: 120px;
  border-radius: 8px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2), 0px 3px 6px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 600px) {
    width: 90%;
  }
`;

export const Name = styled.div`
  width: 150px;
  height: 25px;
  border-radius: 8px;
  animation: ${gradient} 1.5s infinite ease-out;
`;

export const Desc = styled.div`
  width: 300px;
  height: 25px;
  border-radius: 8px;
  animation: ${gradient} 1.5s infinite ease-out;
`;

export const Issue = styled.div`
  width: 100px;
  height: 25px;
  border-radius: 8px;
  animation: ${gradient} 1.5s infinite ease-out;
`;

export const Date = styled.div`
  width: 100px;
  height: 25px;
  border-radius: 8px;
  animation: ${gradient} 1.5s infinite ease-out;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;
