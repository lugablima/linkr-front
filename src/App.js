import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "./assets/style/GlobalStyle";
import UserProvider from "./contexts/UserContext";
import PostsProvider from "./contexts/PostsContext";
import InfiniteScrollProvider from "./contexts/InfiniteScrollContext";

import LoginPage from "./components/pages/Login/LoginPage";
import SignUpPage from "./components/pages/SignUp/SignUpPage";
import TimelinePage from "./components/pages/Timeline/TimelinePage";
import HashtagPage from "./components/pages/Timeline/HashtagPage";
import UserPage from "./components/pages/UserPage/UserPage";

function App() {
  return (
    <>
      <GlobalStyle />
      <UserProvider>
        <PostsProvider>
          <InfiniteScrollProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
                <Route path="/user/:id" element={<UserPage />} />
              </Routes>
            </BrowserRouter>
          </InfiniteScrollProvider>
        </PostsProvider>
      </UserProvider>
    </>
  );
}

export default App;
