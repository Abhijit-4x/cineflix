import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from '../context/AuthContext'

const Navbar = () =>{

    const {user, logOut} = UserAuth()

    const handleLogout = async ()=> {
        try{
            await logOut()
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className="flex justify-between p-4 z-[100] fixed w-full">
             <Link to='/'>
                <h1 className="text-myblue text-2xl md:text-5xl font-semibold cursor-pointer">Cineflix</h1>
            </Link>
            {user?.email ? (
                <div>
                    <Link to='/account'>
                        <button className="border text-white  text-[0.5rem] md:text-[1rem] px-4 py-2 rounded-md mr-1 hover:bg-myblue hover:border-transparent hover:font-bold">
                            Account
                        </button>
                    </Link>
                    <Link to='/'>
                        <button className="border border-myblue bg-myblue text-white  text-[0.5rem] md:text-[1rem] rounded-md px-4 py-2 ml-1 hover:bg-transparent hover:border hover:text-myblue hover:font-bold"
                            onClick={handleLogout}
                            >
                            Log out
                        </button>                    
                    </Link>                
                </div>
            ) : (
                <div>
                    <Link to='/signin'>
                        <button className="border text-white  text-[0.5rem] md:text-[1rem] px-4 py-2 rounded-md mr-1 hover:bg-myblue hover:border-transparent hover:font-bold">
                            Sign in
                        </button>
                    </Link>
                    <Link to='/signup'>
                        <button className="border border-myblue bg-myblue text-white  text-[0.5rem] md:text-[1rem] rounded-md px-4 py-2 ml-1 hover:bg-transparent hover:border hover:text-myblue hover:font-bold">
                            Sign up
                        </button>                    
                    </Link>                
                </div>         
            )}
        </div>
    )
}

export default Navbar;

