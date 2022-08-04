import styled from "@emotion/styled";

export const Container = styled.div`
  width: 90%;
  overflow-y: auto;
`;

export const Profile = styled.div`
  display: flex;
  padding: 15px;
  gap: 15px;
  border: ${({ theme }) => theme["search-border"]};
  border-radius: 10px;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2.5;

  & img {
    width: 70px;
    height: 70px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme["image-bg"]};
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 7.5;
  letter-spacing: -1px;

  & h1 a {
    cursor: pointer;
    font-weight: 900;

    & span {
      font-size: 1.6rem;
      color: ${({ theme }) => theme["font-light"]};
    }

    & span:first-of-type {
      font-size: 2rem;
      color: ${({ theme }) => theme.font};
    }

    &:hover {
      text-decoration: underline;
    }
  }

  & ul {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 1.6rem;

    & li {
      display: flex;
      align-items: center;
      gap: 5px;

      & a:hover {
        text-decoration: underline;
        color: #228be6;
      }
    }
  }
`;
