import styled from "@emotion/styled";
import { gradient } from "../SkeletonProfile/SkeletonProfile.style";

export const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

export const Tab = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  font-size: 1.4rem;
`;
export const Count = styled.div`
  width: 30px;
  height: 20px;
  animation: ${gradient} 1.5s infinite ease-out;
  border-radius: 4px;
`;

export const Label = styled.div``;
