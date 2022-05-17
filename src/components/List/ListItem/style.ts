import styled from "@emotion/styled";

export const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 500px;
  padding: 10px;
  font-size: 2rem;
  border-radius: 8px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2), 0px 3px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  @media screen and (max-width: 600px) {
    width: 90%;
  }
`;

export const Name = styled.div`
  font-weight: 700;
`;

export const Description = styled.div`
  font-size: 1.5rem;
`;

export const Language = styled.div``;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
`;
