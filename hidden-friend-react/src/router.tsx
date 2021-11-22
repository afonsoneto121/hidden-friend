import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NewGroup } from './pages/Group'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { isAuthenticated } from './pages/service/auth/auth'

/* type Props = {
  component: JSX.Element,
  rest: any
}
const PrivateRoute = ({ component, ...rest }: Props) => (
  <Route
    {...rest}
    
    children={({matche})=> isAuthenticated ? {component}}


  />
); */
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/group/new" element={<NewGroup />}/>

      </Routes>
    </BrowserRouter>
  )
}
