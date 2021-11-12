import { TextField, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addLogin } from '../../redux/login/loginSlice';
import { User } from '../models/user';
import { createUser, getUserById } from '../service/user';
import * as C from "./styles"

export const Login = () => {
  let [isLogin, setIsLogin] = useState(true);
  let [user, setUser] = useState<User>();
  
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const toggleFormLogin = () => {
    setIsLogin(!isLogin);
  }
  const handleLogin = async () => {
    
    const id = "6185e6bcf09c2dc61cd3a179";
    const userResult: User = await getUserById(id);
    console.log(userResult);
    dispatch(addLogin(userResult));
    navigate("/home");
  }

  const handleOnClickSave = async () => {
    const result = await createUser(user);
    
    dispatch(addLogin(result));
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
