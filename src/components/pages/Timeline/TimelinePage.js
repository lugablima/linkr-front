import styled from "styled-components";

function PublicationCard() {
  return (
    <PublicationCardContainer>
      <img href="#" alt="Usuário" />
      <div>
        <h6>What are you going to share today?</h6>
        <input placeholder="http://..." />
        <input placeholder="Awesome article about #javascript" />
        <button type="submit">Publish</button>
      </div>
    </PublicationCardContainer>
  );
}

export default function TimelinePage() {
  return (
    <Container>
      <h1>timeline</h1>
      <PublicationCard />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 611px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;

  & > h1 {
    font: 700 43px/64px "Oswald";
    color: #fff;
    margin-bottom: 43px;
  }
`;

const PublicationCardContainer = styled.div`
  width: 100%;
  height: 209px;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin: 16px 22px 16px 18px;
  display: flex;

  & > img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    object-fit: cover;
    margin-right: 18px;
    align-self: flex-start;
  }

  & > h6 {
    font: 300 20px/24px "Lato";
    text-align: left;
    color: #707070;
    margin: 5px 0 16px;
  }

  input {
    width: 82.32%;
    max-width: 503px;
    background: #efefef;
    border-radius: 5px;
    margin-bottom: 5px;
    outline: none;
    font: 300 15px/18px "Lato";
    color: #000;
  }

  input::placeholder {
    color: #949494;
  }

  input[placeholder="http://..."]
  {
    height: 30px;
    padding: 5px 13px 7px;
  }

  input[placeholder~="Awesome"] {
    height: 66px;
    padding: 8px 12px;
  }
`;
