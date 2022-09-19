import { FlexBox, FullSizeBox } from "../components/shared/Box";
import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
    from{
                -webkit-transform: translateY(+50px);
        transform: translateY(+50px);
        opacity: 0;
    }to{   
        -webkit-transform: translateY(0);
        transform: translateY(0);
        opacity: 1;
    }
`;

export const Container = styled(FullSizeBox).attrs({
  gap: "130px",
})`
  background-color: #0a1b62;
  padding: 300px 0;
`;

export const SubBanner = styled.div`
  width: 50%;
  margin: 10% 0;
  &:first-child {
    animation: ${slideUp} 2s ease-out;
    //animation-name : slideUp, animation-duration:2s, animation-timing-function:ease-out;과 같음
  }
  &:nth-child(2) {
    text-align: right;
  }
  & p {
    color: white;
    text-align: left;
    margin: 0;
  }
`;

export const Banner = styled(FlexBox).attrs({
  flexDirection: "row",
})`
  width: 600px;
  height: 300px;
  display: flex;
`;

export const ReviewContainer = styled.div`
  max-width: 1300px;
  margin: 5% 0;
`;

// color
// 배경색 #0a1b62; 메인화면
