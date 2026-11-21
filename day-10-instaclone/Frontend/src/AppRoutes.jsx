import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Features/auth/Pages/Login'
import Register from './Features/auth/Pages/Register'

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </>
  )
}

export default AppRoutes
