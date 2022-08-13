import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styled from "styled-components";


export default function HeaderComponent() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const user = localStorage.getItem("user")
  const location = useLocation();
  const path = location.pathname;

  if ( path === ("/" || "/sign-up") ) {
    return (
      <>
      </>
    );
  } else {
    return (
        <>
          <Header>
            <Title onClick={() => navigate('/timeline')}>linkr</Title>
            {/* <SearchBar/> */}
            <User onClick={() => setShow(!show)}>
              {show ? <IoIosArrowUp size={30} /> : <IoIosArrowDown size={30} />}
              <UserPicture src={user.image} />
            </User>
          </Header>
          {show ? <Profile /> : null}
        </>
      );
  }
    
    
  
  
    

  

  function Profile() {
    return (
      <Container onClick={() => setShow(!show)}>
        <Profile onClick={() => logout()}>
          <ProfileItem>Logout</ProfileItem>
        </Profile>
      </Container>
    );
  }

  function logout() {
    localStorage.removeItem("user");
    navigate("/signin");
  }
}


const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 72px;
  background: #151515;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  overflow: visible;
`;

const Title = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 49px;
  line-height: 54px;
  letter-spacing: 0.05em;
  color: #ffffff;
  cursor: pointer;  

  width: 108px;
  height: 54px;
  left: 28px;
  top: 10px;

  font-family: 'Passion One';
`;

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  svg {
    color: #ffffff;
    margin-right: 10px;
  }
`;

const UserPicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;  
  cursor: pointer;
  background: #151515;
  border-radius: 0 0 0 30px;
  padding: 18px 30px;
  position: fixed;
  top: 60px;
  right: 0;
  z-index: 1;
`;

const ProfileItem = styled.h3`
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  letter-spacing: 0.05em;
  color: #ffffff;
`;