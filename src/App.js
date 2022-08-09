import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/style/reset.css";
import "./assets/style/index.css";
import LoginPage from "./components/pages/Login/LoginPage";
import SignInPage from "./components/pages/SignIn/SignInPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/sign-up" element={<SignInPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
