import React from "react";
import VisiPic from "@/assets/visi_picture.png";

function Visi() {
  return (
    <div className="w-full flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-7 px-4 md:px-[124px] py-10">
      <div className="md:w-1/2 w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Visi & Misi</h1>
        <div className="flex flex-col space-y-6">
          <div className="w-full border border-gray-300 rounded-lg px-6 py-4 text-center shadow-md">
            <p className="text-xl text-[#44A6D0] font-bold mb-2">VISI</p>
            <p className="text-sm leading-relaxed">
              Menjadikan perusahaan sebagai yang terpercaya dengan mengedepankan
              kejujuran dan pelayanan terbaik kepada jamaah.
            </p>
          </div>
          <div className="w-full border border-gray-300 rounded-lg px-6 py-4 shadow-md">
            <p className="text-xl text-[#44A6D0] font-bold text-center mb-3">MISI</p>
            <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed marker:text-[#44A6D0] marker:text-base">
              <li>Memberikan pelayanan terbaik kepada jamaah</li>
              <li>Memberikan kepuasan dan kenyamanan kepada setiap jamaah dengan pelayanan yang berkualitas</li>
              <li>Memberikan pelayanan ibadah sesuai dengan Sunnah Rasulullah SAW</li>
              <li>Membimbing jamaah dengan rasa tanggung jawab</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 w-full flex items-center justify-center">
        <img src={VisiPic.src} alt="Visi Misi" className="w-full max-w-md" />
      </div>
    </div>
  );
}

export default Visi;
