import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";

export default function LoadingTailSpin() {
  return (
    <Container>
      <TailSpin width="36" height="36" color="#6D6D6D" ariaLabel="tail-spin-loading" />
      <MessageLoading>Loading more posts...</MessageLoading>
    </Container>
  );
}

const Container = styled.div`
  width: 226px;
  margin: 83px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MessageLoading = styled.h6`
  font: 400 22px/26px "Lato", sans-serif;
  color: #6d6d6d;
  margin-top: 16px;
`;
