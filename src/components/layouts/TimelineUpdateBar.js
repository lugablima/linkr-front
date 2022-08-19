import styled from "styled-components";
import { GoSync } from "react-icons/go";

export default function TimelineUpdateBar({ newsPosts, updateTimeline }) {
  return (
    <Container onClick={() => updateTimeline()}>
      <h6>{newsPosts.length} new posts, load more!</h6>
      <ReloadIonIcon />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 61px;
  background: #1877f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin: 11px 0 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & > h6 {
    font: 400 16px/19px "Lato", sans-serif;
    margin-right: 14px;
    color: #fff;
  }
`;

const ReloadIonIcon = styled(GoSync)`
  width: 22px;
  height: 22px;
  color: #fff;
`;
