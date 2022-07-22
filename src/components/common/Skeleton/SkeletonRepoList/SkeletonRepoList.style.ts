import styled from "@emotion/styled";
import { gradient } from "../SkeletonProfile/SkeletonProfile.style";

export const List = styled.ul`
  margin: 15px 0;
  border: ${({ theme }) => theme["search-border"]};
  border-radius: 10px;
`;

export const Item = styled.li`
  display: flex;
  gap: 15px;
  height: 120px;
  padding: 15px;

  & + & {
    border-top: ${({ theme }) => theme["search-border"]};
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 8;
`;
export const Name = styled.div`
  width: 160px;
  height: 20px;
  border-radius: 4px;
  animation: ${gradient} 1.5s infinite ease-out;
`;

export const Description = styled.div`
  width: 260px;
  height: 30px;
  border-radius: 4px;
  animation: ${gradient} 1.5s infinite ease-out;
`;
export const InfoList = styled.div`
  display: flex;
  gap: 10px;
`;

export const InfoItem = styled.div`
  width: 60px;
  height: 20px;
  border-radius: 4px;
  animation: ${gradient} 1.5s infinite ease-out;
`;
