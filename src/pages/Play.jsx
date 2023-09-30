import React from 'react'
// import video from '../assets/sample2.mp4'

const Play = () => {
  return (
    <>
        <div className='flex flex-col'>
            <div className='fixed w-full h-[10vh] bg-gray-900'></div>
            <div className='w-full h-[60vh] md:h-[80vh] bg-gray-800'>
                {/* <video controls autoPlay src='' className='w-full h-full object:cover'/> */}
                <iframe 
                  className='w-full h-full object-cover'
                  src="https://www.veed.io/embed/65a391bd-82ea-4a03-b945-0e0bd04bb2d5"
                  frameborder="0" 
                  title="vonka-bhai" 
                  webkitallowfullscreen 
                  mozallowfullscreen 
                  oallowfullscreen 
                  msallowfullscreen 
                  allowfullscreen = "true"
                />
            </div>
            <div 
                className='text-white  text-2xl md:text-5xl p-[5vw] md:p-[2vw]' 
                >
                    <span className='block text-gray-400 text-xl py-[1vh] '>Now playing :</span>
                    Addu-bhai
                </div>
        </div>

    </>
  )
}

export default Play

