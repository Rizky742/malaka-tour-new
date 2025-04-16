import React from 'react'
import BgUmroh from "@/assets/baru.jpg";
import Card from './components/cards';
function PaketLayanan() {
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
                <h1 className="text-white px-4 md:px-[124px] text-[50px] font-bold">Paket Layanan</h1>
                <h1 className="text-white  px-4 md:px-[124px] text-[25px] font-medium">Paket Layanan MALAKA</h1>
                <div className='grid grid-cols-3'>

                </div>
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7 px-4 md:px-[124px] my-20'>
                <Card image={BgUmroh.src} rating={4.6} title='Paket Gold' />
                <Card image={BgUmroh.src} rating={4.6} title='Paket Gold' />
                <Card image={BgUmroh.src} rating={4.6} title='Paket Gold' />
                <Card image={BgUmroh.src} rating={4.6} title='Paket Gold' />
                <Card image={BgUmroh.src} rating={4.6} title='Paket Gold' />
                <Card image={BgUmroh.src} rating={4.6} title='Paket Gold' />
                <Card image={BgUmroh.src} rating={4.6} title='Paket Gold' />
                <Card image={BgUmroh.src} rating={4.6} title='Paket Gold' />
            </div>
         
        </>
    )
}

export default PaketLayanan