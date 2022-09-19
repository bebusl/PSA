import styled from "styled-components";

export const Box = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export const FlexBox = styled(Box)`
  display: flex;
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "center"};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : "center")};
  flex-direction: ${({ flexDirection }) =>
    flexDirection ? flexDirection : "column"};
  gap: ${({ gap }) => (gap ? gap : "auto")};
`;

export const FullSizeBox = styled(FlexBox)`
  width: 100vw;
  height: 95vh;
`;
