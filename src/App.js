import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/style/GlobalStyle";

import LoginPage from "./components/pages/Login/LoginPage";
import SignInPage from "./components/pages/SignIn/SignInPage";
import TimelinePage from "./components/pages/Timeline/TimelinePage";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignInPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
