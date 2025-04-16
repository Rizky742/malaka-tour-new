
import Hajj from '@/assets/hajj.png'
import Makkah from '@/assets/makkah.png'
const CardPaket = () => {
    return (
        <div className="bg-[#44A6D0] py-3 w-full h-[36rem] flex-flex-col justify-center rounded-2xl text-white space-y-3 items-center">
            <div className='flex flex-row items-center justify-center'>
                <img src={Hajj.src} alt="" />
                <p className='text-center text-xl font-bold  '>Umrah <span className=''>Bronze</span></p>
            </div>
            <img className='w-full h-fit' src={Makkah.src} alt="" />
            <div className='space-y-6'>
                <p className='px-6'><span className='font-bold'>Pilihan Hotel:</span> Hotel Hilton, Hotel Taiba Front, Hotel Golden Tulip Az Zahabi, Hotel Al Aqeeq Madinah, Hotel Maden, dll.</p>
                <p className='px-6'><span className='font-bold'>Pilihan Maskapai:</span> Pilihan Maskapai: Saudia Airlines, Oman Air.</p>
            </div>
            <div className='flex justify-center'>
                <span className='text-center cursor-pointer bg-white px-5 py-2 text-[#44A6D0] rounded-md'>Lihat Detail</span>
            </div>
        </div>

    )
}

export default CardPaket;