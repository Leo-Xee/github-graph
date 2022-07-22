import styled from "@emotion/styled";

type ContainerProps = {
  isActive: boolean;
};

export const Container = styled.section<ContainerProps>`
  position: relative;
  top: 20px;
  left: 20px;
  z-index: 5;
  width: 370px;
  height: 55px;
  padding: 0 0 0 20px;
  background-color: ${({ theme }) => theme["search-bg"]};
  border: ${({ theme }) => theme["search-border"]};
  box-shadow: ${({ theme }) => theme["box-shadow"]};
  border-radius: ${({ isActive }) => (isActive ? `10px 10px 0 0` : `10px`)};
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Lable = styled.label`
  flex: 7;
  height: 30px;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  height: 30px;
  font-size: 1.8rem;
  letter-spacing: -1px;
  background-color: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }
`;

export const ButtonContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: end;
  flex: 3;
`;

export const Button = styled.button`
  padding: 0 10px;

  &:first-of-type {
    border-right: ${({ theme }) => theme["search-border"]};
  }

  .search,
  .clean {
    color: ${({ theme }) => theme.icon};
  }

  .search_active,
  .clean:hover {
    color: ${({ theme }) => theme["icon-hover"]};
  }
`;

export const Recommandation = styled.div`
  position: absolute;
  left: -1px;
  width: 370px;
  background-color: ${({ theme }) => theme["board-bg"]};
  border: ${({ theme }) => theme["search-border"]};
  border-radius: 0 0 10px 10px;
  box-shadow: ${({ theme }) => theme["box-shadow"]};
`;

export const SearchItem = styled.li`
  & button {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 8px 0 8px 20px;
    cursor: pointer;

    & img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background-color: ${({ theme }) => theme["image-bg"]};
    }

    & p {
      letter-spacing: -1px;
      font-size: 1.8rem;
      & span {
        font-size: 1.6rem;
        color: ${({ theme }) => theme["font-light"]};
      }
    }

    &:hover {
      background-color: ${({ theme }) => theme["search-hover"]};
    }

    &:last-child {
      border-radius: 0 0 10px 10px;
    }
  }
`;
