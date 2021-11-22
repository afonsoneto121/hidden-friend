import { User } from "../models/user";
import * as ServiceAuth from "../service/auth/auth"

const URL_API = process.env.REACT_APP_API_URL;
const token = ServiceAuth.getToken()

var headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Authorization", `Bearer ${token}`);

export const createUser = async(user: User | undefined) => {
  var raw = JSON.stringify(user);
  
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: raw,
  };
  return await fetch(`${URL_API}/user/`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const getUserById = async(id: string) => {
  var requestOptions = {
    method: 'GET',
    headers: headers,
  };
  
  return await fetch(`${URL_API}/user/${id}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const getAllUsers = async() => {
  var requestOptions = {
    method: 'GET',
    headers: headers,
  };

  
  return await fetch(`${URL_API}/user/`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const login = async(userName: string | undefined, password: string | undefined) =>{

  var raw = JSON.stringify({
    "username": userName,
    "password": password,
  });
  
  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: raw,
  };
  
  return await fetch(`${URL_API}/login`, requestOptions)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return null
    })
    .catch(error => console.log('error', error));
}