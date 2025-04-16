import React from 'react';

export default function AboutSection() {
    return (
        <div className='px-4 md:px-[124px] flex flex-col md:flex-row h-auto md:h-screen py-10 md:py-0 space-y-10 md:space-y-0 md:space-x-10 justify-between items-center bg-white'>
            {/* Bagian Teks */}
            <div className='md:flex-1 text-black flex flex-col space-y-4'>
                <h1 className='text-3xl md:text-4xl font-semibold text-center md:text-left'>
                    PT. MALAKA PERSADA PRATAMA
                </h1>
                <p className='text-base md:text-[1.2rem] text-center md:text-left'>
                    Malaka Tour & Travel didirikan oleh Marsda (Purn) DR.H. Umar Sugeng Hariyono dan Ny Hj Dwiana Ikafitri Narukaya, S.IP pada tanggal 11 Mei 2013 dengan tujuan membimbing jamaah Umrah dan Haji yang berangkat ke Tanah Suci dengan mengharap Keberkahan Allah Swt.
                    Malaka Tour & Travel telah memiliki Izin PPIU NO.U.133 THN 2021.
                </p>
            </div>

            {/* Bagian Video */}
            <div className='md:flex-1 w-full md:w-auto h-64 md:h-full md:py-64'>
                <iframe
                    className='rounded-2xl w-full h-full'
                    src="https://www.youtube.com/embed/rVC30YjLsTw?si=zz6RP-kuvncK-usE"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
            </div>
        </div>
    );
}