var headers = new Headers();
headers.append("Content-Type", "application/json");

export const getAllGroups = async() => {
  var requestOptions = {
    method: 'GET',
  };
  
  return await fetch("http://localhost:8080/group/", requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export const gettUserGroup = async(id: string) => {
  var requestOptions = {
    method: 'GET',
  };
  
  return fetch(`http://localhost:8080/group/${id}/users`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}