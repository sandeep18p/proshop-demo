import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
//outlet is basically what we want to return when we are loggedin and navigate is to navigate to another page when not logged in
import { useSelector } from 'react-redux'


export const PrivateRoute = () => {
  
    const {userInfo} = useSelector(state=>state.auth);

  return (
    userInfo ? <Outlet/> : <Navigate to="/login" replace/>
  )
}
