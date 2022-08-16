import { useLocation } from "react-router-dom";

export default function UserPage() {
  const location = useLocation();
  const { username } = location.state;

  return <h1>Eu sou a UserPage {username}</h1>;
}
