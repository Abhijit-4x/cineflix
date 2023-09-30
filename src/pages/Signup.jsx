import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signUp} = UserAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(password.length < 6 ){
            alert("Password must have minimum 6 characters.")
        }else{
            try{
                await signUp( email, password )
                navigate('/');
            }catch(error){
                console.log('----------error========')
                console.log(error.name)
                console.log(error.message)
                if( error.name === 'FirebaseError' && error.message === 'Firebase: Error (auth/email-already-in-use).' ){
                    // console.log('success error')
                    alert("You are already registered!!\nRedirecting you to sign-in page")
                    navigate('/signin')
                }
            }
        }
    }

  return (
    <>
        <div className='w-full h-screen'>
            <img
            className='hidden sm:block absolute w-full h-full object-cover'
            src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
            alt='/'
            />
            <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
            <div className='fixed w-full px-4 py-24 z-50' >
                <div className='bg-black/75 max-w-[450px]  h-[600px] mx-auto text-white rounded-md' >
                    <div className='max-w-[320px] mx-auto py-16'>
                        <h1 className=' text-3xl font-bold ' >Sign Up</h1>
                        <form className='w-full flex flex-col my-5' onSubmit={handleSubmit}>
                            <input className=' py-3 my-2 bg-gray-200 text-black text-center rounded-sm' 
                                onChange={(e)=>{setEmail(e.target.value)}} 
                                type="email" 
                                placeholder='Email' 
                                autoComplete='email'
                            />
                            <input className=' py-3 my-2 bg-gray-200 text-black text-center rounded-sm'
                                onChange={(e)=>{setPassword(e.target.value)}}
                                type="password"
                                placeholder='Password' 
                                autoComplete='current-password'
                            />
                            <button className=' bg-myblue rounded-md px-1 py-3 my-4 text-xl font-bold'
                                type='submit'
                                // onClick={handleSubmit}
                                >
                                Submit
                            </button>
                            <div className='flex flex-col text-gray-400'>
                                <div className='flex justify-between px-1 py-2'>
                                    <p><input className='mr-1' type="checkbox"/>Remember me</p>
                                    <p>Need help?</p>
                                </div>
                                <p className='mx-auto py-2'>
                                    Already signed up?
                                    <span className='text-white font-bold'> 
                                        <Link to='/signin'> Sign in</Link>
                                    </span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Signup