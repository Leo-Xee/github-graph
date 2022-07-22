import styled from "@emotion/styled";

type InfoListProps = {
  isFlexColumn: boolean;
};

export const Container = styled.li`
  & a {
    display: flex;
    padding: 15px;
    gap: 15px;
    cursor: pointer;
  }

  &:first-of-type {
    border-radius: 10px 10px 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 10px 10px;
  }

  & + & {
    border-top: ${({ theme }) => theme["search-border"]};
  }

  &:hover {
    background-color: ${({ theme }) => theme["search-hover"]};
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;

  & img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme["image-bg"]};
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 8;
  gap: 4px;

  & h2 {
    font-size: 1.6rem;
    font-weight: 900;

    & span {
      font-size: 1.4rem;
      color: ${({ theme }) => theme["font-light"]};
    }
  }

  & p {
    font-size: 1.2rem;
  }
`;

export const InfoList = styled.ul<InfoListProps>`
  display: flex;
  flex-direction: ${({ isFlexColumn }) => (isFlexColumn ? "column" : "row")};
  flex-direction: 
  gap: 4px;

  & li {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;
