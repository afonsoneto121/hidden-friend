import { User } from "../models/user";

var headers = new Headers();
headers.append("Content-Type", "application/json");

export const createUser = async(user: User | undefined) => {
  var raw = JSON.stringify(user);
  
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: raw,
  };
  return await fetch("http://localhost:8080/user/", requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const getUserById = async(id: string) => {
  var requestOptions = {
    method: 'GET'
  };
  
  return await fetch(`http://localhost:8080/user/${id}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const getAllUsers = async() => {
  var requestOptions = {
    method: 'GET'
  };
  
  return await fetch(`http://localhost:8080/user/`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}