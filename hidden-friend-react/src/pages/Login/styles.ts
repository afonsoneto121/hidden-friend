import  styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardLogin = styled.div`
  width: 350px;
  height: 400px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #111;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  
  .input {
    margin-bottom: 30px;
  }
  .button {
    align-self: flex-end;
    margin-top: 50px;
  }

  p { 
    align-self: center;
    margin-top: 50px;
    cursor: pointer;
    color: #3B8AD8;
    font-size: 16px;
  }
`;

export const CardRegistration = styled.div`
  width: 350px;
  height: 400px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #111;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  
  .input {
    margin-bottom: 20px;
  }
  .button {
    align-self: flex-end;
    margin-top: 50px;
  }

  p { 
    align-self: center;
    margin-top: 30px;
    cursor: pointer;
    color: #3B8AD8;
    font-size: 16px;
  }
`;