import styled from "@emotion/styled";

export const Container = styled.li`
  & a {
    display: flex;
    padding: 15px;
    gap: 15px;
    cursor: pointer;
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
  gap: 5px;

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

export const InfoList = styled.ul`
  display: flex;
  gap: 10px;

  & li {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;