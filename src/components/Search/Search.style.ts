import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;
  top: 20px;
  left: 30px;
  width: 350px;
  height: 50px;
  padding: 0 10px 0 20px;
  background-color: ${({ theme }) => theme["search-bg"]};
  border: ${({ theme }) => theme["search-border"]};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme["box-shadow"]};
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Lable = styled.label`
  flex: 7.5;
  height: 30px;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  height: 30px;
  font-size: 1.8rem;
  letter-spacing: -1px;
`;

export const ButtonContainer = styled.span`
  display: flex;
  justify-content: end;
  flex: 2.5;
`;

export const Button = styled.button`
  padding: 0 10px;

  &:last-child {
    border-left: ${({ theme }) => theme["search-border"]};
    padding-right: 0;
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
