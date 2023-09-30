import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const ProtectedRoute = ({children}) => {
  
    const {user} = UserAuth()

    if(!user){
        alert('Sign-in first to watch your favourites');
        return <Navigate to='/signin' />

    }else{
        return children
    }

}

export default ProtectedRoute