import styled from "styled-components";

export const Form = styled.form`
  background-color: white;
  padding: 5px 50px;
  border-radius: 100px;
`;

export const SearchInput = styled.input.attrs({ type: "text" })`
  border: none;
  width: 50vw;
`;

export const SubmitButton = styled.button.attrs({ type: "submit" })`
  background-color: inherit;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
