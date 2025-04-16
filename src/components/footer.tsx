/* eslint-disable @next/next/no-img-element */
import React from 'react'
import LogoMalaka from "@/assets/logo_malaka_baru.png";
// import { Facebook, Instagram } from "lucide-react"
import { FaFacebook, FaInstagram } from "react-icons/fa";


export default function Footer() {
    return (
        <footer className='px-4 md:px-[124px] bg-[#44A6D0] md:items-start py-14 space-y-5'>
            <img
                src={LogoMalaka.src}
                alt="Logo Malaka Tour Travel"
                className="w-14"
            />
            <div className='flex flex-col w-full itm  md:flex-row  md:items-start justify-between space-x-12 space-y-10'>
                <div className='flex flex-col text-white w-full md:w-1/3'>
                    <h1 className='font-bold mb-2'>MALAKA TOUR & TRAVEL</h1>
                    <p className='font-light'>Malaka Tour & Travel didirikan oleh Marsda (Purn) DR.H. Umar Sugeng Hariyono dan Ny Hj Dwiana Ikafitri Narukaya, S.IP pada tanggal 11 Mei 2013 dengan tujuan membimbing jamaah Umrah dan Haji yang berangkat ke Tanah Suci dengan mengharap Keberkahan Allah Swt.
                        Malaka Tour & Travel telah memiliki Izin PPIU NO.U.133 THN 2021.
                    </p>
                </div>
                <div className='flex flex-col text-white w-full md:w-1/4'>
                    <h1 className='font-bold mb-2'>KONTAK KAMI</h1>
                    <p className='font-light'>0812-1106-022 (IBU DEWI)</p>
                    <p className='font-light'>JL. Raya Bogor KM 29,3 No. 32 RT. 004 / RW 001 Cimanggis Depok</p>
                    <p className='font-light'>(021) 2286 7313</p>
                </div>
                <div className='flex flex-col text-white md:w-1/4'>
                    <h1 className='font-bold mb-2'>PEMBAYARAN</h1>
                    <p className='font-light'>KE REKENING An. PT MALAKA PERSADA PRATAMA
                        <br></br>BSI CIMANGGIS
                        1052129369
                    </p>
                </div>
                <div className='flex flex-col text-white  md:w-1/4'>
                    <h1 className='font-bold mb-2'>IKUTI KAMI</h1>
                    <div className='flex space-x-4 flex-row items-center text-4xl'>
                        <FaFacebook />
                        <FaInstagram />
                    </div>
                </div>
            </div>
        </footer>
    )
}
