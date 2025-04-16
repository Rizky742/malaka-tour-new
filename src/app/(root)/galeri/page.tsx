import React from 'react'
import BgUmroh from "@/assets/baru.jpg";



function Galeri() {
    return (
        <>
      
            <div
                className="h-80 w-full flex flex-col justify-center bg-cover"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${BgUmroh.src})`,
                    backgroundPosition: "center 400px",
                    backgroundSize: "cover",
                }}
            >
                <h1 className="text-white px-4 md:px-[124px] text-[50px] font-bold">Galeri</h1>
                <h1 className="text-white  px-4 md:px-[124px] text-[25px] font-medium">Galeri Tour Malaka</h1>
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 px-4 md:px-[124px] my-20'>
                <img className='w-full rounded-2xl' src={BgUmroh.src} />
                <img className='w-full rounded-2xl' src={BgUmroh.src} />
                <img className='w-full rounded-2xl' src={BgUmroh.src} />
                <img className='w-full rounded-2xl' src={BgUmroh.src} />
                <img className='w-full rounded-2xl' src={BgUmroh.src} />
                <img className='w-full rounded-2xl' src={BgUmroh.src} />
            </div>
         
        </>
    )
}

export default Galeri