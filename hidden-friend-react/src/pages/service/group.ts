import { Group } from "../models/group"
import { User } from "../models/user";
import * as ServiceAuth from "../service/auth/auth"

const URL_API = process.env.REACT_APP_API_URL;

export const getAllGroups = async () => {
  const token = ServiceAuth.getToken()
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);
  var requestOptions = {
    method: 'GET',
    headers: headers
  };


  return await fetch(`${URL_API}/group/`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const gettGroupByID = async (id: string) => {
  const token = ServiceAuth.getToken()
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: 'GET',
    headers: headers
  };

  return fetch(`${URL_API}/group/${id}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const gettUserGroup = async (id: string) => {
  const token = ServiceAuth.getToken()
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: 'GET',
    headers: headers
  };

  return fetch(`${URL_API}/group/${id}/users`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const createGroup = async (group: Group) => {
  const token = ServiceAuth.getToken()
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  var raw = JSON.stringify(group);

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: raw,
  };

  return await fetch(`${URL_API}/group/`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const generateMatches = async (user: User, idGroup: string) => {
  const token = ServiceAuth.getToken()
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  var raw = JSON.stringify(user);
  
  var requestOptions = {
    method: 'PUT',
    headers: headers,
    body: raw,
  };
  
  fetch(`http://localhost:8080/group/${idGroup}/generate`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}