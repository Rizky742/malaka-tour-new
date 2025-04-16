import React from 'react'
import ProfPic from "@/assets/about_profile.png";
function About() {
  return (
    <div className="w-full my-14 space-y-16">
    <h1 className="text-2xl font-bold text-center">Pendiri Malaka</h1>
    <div className="w-full flex flex-row items-center justify-center space-x-7">
      <div className="w-1/2">
        <img src={ProfPic.src} alt="" />
      </div>
      <div className="w-1/2 flex flex-col items-start justify-center space-y-11">
        <p className="text-3xl font-bold text-[#44A6D0]">
          Dr. Umar Sugeng Hariyono, S.I.P., S.E., M.M.
        </p>
        <p>
          Marsekal Muda TNI (Purn.) Dr. Umar Sugeng Hariyono, S.I.P., S.E.,
          M.M. (lahir 30 Mei 1962) adalah seorang Purnawirawan TNI-AU yang
          terakhir menjabat sebagai Asops Kasau. Umar, merupakan
          lulusan Akademi Angkatan Udara (1986). Jabatan sebelumnya jenderal
          bintang dua ini adalah Koorsahli Kasau.
        </p>
        <div>
          <p>Riwayat Pendidikan</p>
          <ul className="list-disc list-inside marker:text-[#44A6D0]">
            <li>S1 Ilmu Politik</li>
            <li>S1 Ekonomi</li>
            <li>S1 Manajemen</li>
            <li>S1 Administrasi Publik Negeri Makassar</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  )
}

export default About