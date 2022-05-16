import styled from "@emotion/styled";

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin: 4rem auto;
  width: 350px;
  height: 50px;
  border: 2px solid black;
  border-radius: 30px;
`;

export const Input = styled.input`
  margin-left: 30px;
  width: 250px;
  height: 20px;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 2rem;
  user-select: none;
`;
export const Button = styled.button`
  margin-left: 20px;
  padding: 8px;
`;
