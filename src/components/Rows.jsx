import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md"

 



const Row = ({rowId, title, fetchURL}) =>{

    const [movies, setMovies] = useState([])
    // const [like, setLike] = useState( false )

    

    useEffect( () =>{
        axios.get(fetchURL).then( (response)=>{
            setMovies( response.data.results )
        } )
    },[fetchURL] )
    // console.log(movies)

    const slideLeft = ()=>{
        var slider = document.getElementById('slider' + rowId);
        slider.scrollLeft = slider.scrollLeft  - 500;
    }
    const slideRight = ()=>{
        var slider = document.getElementById('slider' + rowId);
        slider.scrollLeft = slider.scrollLeft  + 500;
    }

    return(
        <>
            <h2 className="text-white md:text-xl p-4" >{title}</h2>
            <div className="relative flex items-center group">
                <MdChevronLeft 
                    className="absolute z-10 bg-white left-0 rounded-full opacity-70 hover:opacity-95 cursor-pointer hidden group-hover:block"  
                    size={45} 
                    onClick={slideLeft}
                />
                <div id={'slider' + rowId} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative" >
                    {movies.map((item, id) => (
                        <Movie key={id}  item={item}/>
                    ))}
                </div>
                <MdChevronRight 
                    className="absolute z-10 bg-white right-0 rounded-full opacity-70 hover:opacity-95 cursor-pointer hidden group-hover:block"  
                    size={45} 
                    onClick={slideRight}
                />
            </div>
        </>
    )
}

export default Row;
