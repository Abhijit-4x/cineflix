import React, { useState } from "react";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { Link } from "react-router-dom";

const Movie = ({item})=> {

    const [like, setLike] = useState(false);
    // const [saved, setSaved] = useState(false);
    const {user} = UserAuth();

    const dbUser = doc( db, 'users', `${user?.email}` )

    const saveMovie = async ()=>{
        if(user?.email){
            setLike(!like)
            // setSaved(true)
            await updateDoc( dbUser, { savedMovies:arrayUnion({
                    id:item?.id,
                    title:item?.title,
                    img:item?.backdrop_path,
                    date:item?.release_date,
                    overview:item?.overview
                    })
                } 
            )
        }else{
            alert("Please login first!")
        }
    }


    return(

        <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 my-1">
            <img className="w-full block" src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
            <div className="absolute w-full h-full top-0 left-0 text-white opacity-100 bg-black/30  lg:hover:bg-black/80 lg:hover:opacity-80 p-2">
                <Link to='/play' >
                    <p className="whitespace-normal h-full flex justify-center items-center text-xs md:text-sm font-bold" >{item?.title}</p>
                </Link>
                <p className="absolute top-4 left-4 text-gray-300 text-sm md:text-lg" onClick={saveMovie} >{like ? <FaHeart /> : <FaRegHeart /> }</p>
            </div>
        </div>
    )
}

export default Movie