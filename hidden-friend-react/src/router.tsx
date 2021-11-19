import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NewGroup } from './pages/Group'
import { Home } from './pages/Home'
import { Login } from './pages/Login'

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
