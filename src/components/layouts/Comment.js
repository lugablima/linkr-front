import styled from "styled-components";

export default function Comment({ comment: { name, photo, comment, followedByUser } }) {
  return (
    <Container>
      <MainContainer>
        <img src={photo} alt={name} />
        <RightSide>
          <div>
            <h5>{name}</h5>
            <h6>{followedByUser && "• following"}</h6>
          </div>
          <h6>{comment}</h6>
        </RightSide>
      </MainContainer>
      <Border />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 0 20px;
  background: transparent;
`;

const MainContainer = styled.div`
  width: 100%;
  min-height: 68px;
  display: flex;
  align-items: flex-start;
  padding: 12px 5px 16px;

  img {
    width: 39px;
    height: 39px;
    border-radius: 304px;
    margin-right: 18px;
  }
`;

const RightSide = styled.div`
  width: 100%;

  & > div {
    display: flex;
    font: 700 14px/17px "Lato", sans-serif;
    margin-bottom: 3px;

    h5 {
      color: #f3f3f3;
      margin-right: 4px;
    }

    h6 {
      color: #565656;
    }
  }

  & > h6 {
    width: 100%;
    font: 400 14px/17px "Lato", sans-serif;
    color: #acacac;
    word-break: break-all;
    word-wrap: normal;
  }
`;

const Border = styled.div`
  width: 100%;
  border: 1px solid #353535;
  margin: 0 auto;
`;
