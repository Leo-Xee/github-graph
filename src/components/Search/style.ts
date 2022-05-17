import styled from "@emotion/styled";

export const SearchBar = styled.div`
  position: relative;
  align-items: center;
  margin: 4rem auto;
  width: 400px;
  height: 50px;
  border: 2px solid black;
  border-radius: 30px;

  @media screen and (max-width: 600px) {
    width: 90%;
  }
`;

export const Input = styled.input`
  position: absolute;
  top: 14px;
  left: 25px;
  width: 250px;
  height: 20px;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 2rem;
  user-select: none;
`;
export const Button = styled.button`
  position: absolute;
  top: 3px;
  right: 10px;
  padding: 8px;
`;
