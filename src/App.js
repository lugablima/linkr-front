import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/style/GlobalStyle";
import PostsProvider from "./contexts/PostsContext";
import UserProvider from "./contexts/UserContext";

import LoginPage from "./components/pages/Login/LoginPage";
import SignUpPage from "./components/pages/SignUp/SignUpPage";
import TimelinePage from "./components/pages/Timeline/TimelinePage";
import HeaderComponent from "./components/layouts/HeaderComponent"

function App() {
  return (
    <>
      <GlobalStyle />
      <PostsProvider>
        <UserProvider>
        <BrowserRouter>
        
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/header" element={<HeaderComponent />} />
            
          </Routes>
        </BrowserRouter>
        </UserProvider>  
      </PostsProvider>
    </>
  );
}

export default App;
