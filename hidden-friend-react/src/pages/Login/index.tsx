import { TextField, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { User } from '../models/user';
import { createUser, getUserById } from '../service/user';
import * as C from "./styles"

export const Login = () => {
  const navigate = useNavigate();
  let [isLogin, setIsLogin] = useState(true);
  let [user, setUser] = useState<User>();
  
  const toggleFormLogin = () => {
    setIsLogin(!isLogin);
  }
  const handleLogin = async () => {
    //Create a function for login 
    //Fake Request for login function
    const id = "6185e6bcf09c2dc61cd3a179";
    const userResult = await getUserById(id);
    console.log(userResult.name);
    navigate("/home")
  }

  const handleOnClickSave = async () => {
    const result = await createUser(user);
    // Create a context for the new user and redirect to home page
    navigate("/home")
  }

  const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      "username": event.target.value,
    });
  }
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      "password": event.target.value,
    });
  }
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      "name": event.target.value,
    });
  }

  return (
    <C.Container>
      {isLogin &&
        <C.CardLogin>
          <h2>Login</h2>
          <TextField
            className="input"
            fullWidth
            label="Login"
            variant="standard"
            onChange={handleChangeLogin}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="standard"
            onChange={handleChangePassword}
          />

          <Button
            className="button"
            variant="outlined"
            onClick={handleLogin}
          > Entrar</Button>

          <p onClick={toggleFormLogin}>Não tenho cadastro</p>

        </C.CardLogin>}

      {!isLogin &&
        <C.CardRegistration>
          <h2>Cadastro</h2>
          <TextField
            className="input"
            fullWidth
            label="Name"
            variant="standard"
            onChange={handleChangeName}
          />
          <TextField
            className="input"
            fullWidth
            label="User Name"
            variant="standard"
            onChange={handleChangeLogin}
          />

          <TextField
            fullWidth
            label="Password"
            variant="standard"
            type="password"
            onChange={handleChangePassword}
          />

          <Button
            className="button"
            variant="outlined"
            onClick={handleOnClickSave}
            >Cadastrar</Button>

          <p onClick={toggleFormLogin}>Login</p>
        </C.CardRegistration>
      }
    </C.Container>
  )
}
