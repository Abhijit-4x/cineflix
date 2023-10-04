import React, {useState, useEffect} from 'react';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';


const Account = () => {

  const {user} = UserAuth();
  const [movies, setMovies] = useState([]);

  

  useEffect( ()=>{
    onSnapshot( doc( db, 'users', `${user?.email}` ),(doc)=>{
      setMovies( doc.data()?.savedMovies );
    } )
  }, [user?.email] );

  const movieRef = doc( db, 'users', `${user?.email}` );

  const deleteShow = async (passedID)=>{
    try{
      const result = movies.filter( (item)=>item?.id !== passedID );
      await updateDoc( movieRef, {
        savedMovies: result
      } );
    }catch(error){
      console.log(error);
    }
  }


  const truncateString = ( str) => {

    let num = 100;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      // true for mobile device
      num = 50;
      console.log('mobiel mode---------------')
    }else{
      // false for not mobile device
      num = 180;
    }

    if(str?.length > num){
        return str.slice(0, num) + '....'
    }else{
        return str
    }
  }







  return (
    <>
        <div className='w-full text-white' >
          <img
            className='w-full h-[300px] md:h-[400px] object-cover'
            src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
            alt='/'
          />
          <div className=' bg-black/60 w-full absolute top-0 left-0 h-[401px]'></div>
          <div className='w-full absolute top-[20%] p-[5vw] md:p-8'>
            <h1 className=' text-[3rem] md:text-[5rem] font-bold' >My shows</h1>
          </div>
          <div className=' flex flex-col' >
            
              {movies.map((item, id) => (
                <div key={id} className="w-full h-auto cursor-pointer relative p-[1vw] my-1 ">
                    <Link to='/play'><img className="w-[40vw] lg:w-[20vw] object-cover rounded inline-block" src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title} /></Link>
                    <div className="absolute inline-block p-[1vw] w-[58vw] lg:w-[78vw] ">
                      <div className='flex flex-col '>
                        <div className='flex justify-between' >
                          <Link to='/play'><p className="white-space-normal text-sm sm:text-xl md:text-3xl font-bold items-center  h-full text-center mb-2" >{item?.title}</p></Link>
                          <button 
                            className="white-space-normal text-sm sm:text-xl md:text-xl items-center h-full text-center scale-[0.7] lg:scale-[1] mt-[-0.2rem] lg:mt-[-1rem] mb-2 border text-gray-400 border-gray-400 rounded p-[0.3rem]
                            hover:border-red-300 hover:text-red-300 bg-none" 
                            onClick={()=>{ deleteShow(item?.id) }}
                            >
                              Remove
                          </button>
                        </div>
                        <p className="white-space-normal text-xs sm:text-sm md:text-md text-gray-500 items-center justify-left h-full text-left" >Release :{item?.date}</p>
                        <p className="white-space-normal overflow-hidden text-sm sm:text-sm md:text-xl text-gray-200 items-center  h-full text-left pt-1 lg:py-5 " >
                          {truncateString(item?.overview)}
                        </p>
                      </div>
                    </div>
                </div>
              ))}
          </div>
      </div>    
    </>
  )
}

export default Account