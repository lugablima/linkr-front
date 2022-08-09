import styled from "styled-components";
import axios from "axios";

import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

export default function SignUpPage() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [username, setUsername] = useState("");
const [pictureUrl, setPictureUrl] = useState("");

    return(
        <h1>Pagina de Cadastro</h1>
    );
}