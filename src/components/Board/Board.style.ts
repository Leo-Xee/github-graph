import styled from "@emotion/styled";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 390px;
  height: 100vh;
  padding-top: 90px;
  background-color: ${({ theme }) => theme["search-bg"]};
  box-shadow: ${({ theme }) => theme["box-shadow"]};
`;

export const Profile = styled.div`
  display: flex;
  gap: 15px;
  padding: 15px;
  width: 350px;
  border: ${({ theme }) => theme["search-border"]};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme["box-shadow"]};
  overflow-y: scroll;
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
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 7.5;
  letter-spacing: -1px;

  & h1 {
    font-size: 2rem;
    font-weight: 900;

    & span {
      font-size: 1.6rem;
      color: ${({ theme }) => theme["font-light"]};
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
