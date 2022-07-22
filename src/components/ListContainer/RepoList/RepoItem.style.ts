import styled from "@emotion/styled";

type LanguageColorProps = {
  color: string;
};

export const Container = styled.li`
  & a {
    display: flex;
    flex-direction: column;
    gap: 10px;
    cursor: pointer;
    padding: 15px;
  }

  & + & {
    border-top: ${({ theme }) => theme["search-border"]};
  }

  &:hover {
    background-color: ${({ theme }) => theme["search-hover"]};
  }
`;

export const Info = styled.div`
  & h2 {
    font-size: 1.8rem;
    font-weight: 900;
  }

  & p {
    font-size: 1.4rem;
  }
`;

export const InfoList = styled.ul`
  display: flex;
  gap: 10px;
`;

export const InfoItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  gap: 4px;
  font-weight: 600;
`;

export const LanguageColor = styled.span<LanguageColorProps>`
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;
