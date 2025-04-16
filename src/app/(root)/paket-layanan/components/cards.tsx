import React from 'react';
import Star from './star';
import { Hotel, Plane } from 'lucide-react'
import { Button } from '@/components/ui/button';

function Card({
    image,
    title,
    rating = 0
}: {
    image: string;
    title: string;
    rating?: number;
}) {
    // Batasi rating antara 0-5


    return (
        <div className='max-w-96 border rounded-xl overflow-clip hover:shadow-lg transition-shadow'>
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className='p-5 space-y-3'>
                <p className='text-2xl font-semibold'>{title}</p>
                <div className="flex items-center">
                    <Star rating={rating} />
                    <span className="ml-2 text-gray-600 text-sm font-medium">
                        {rating}
                    </span>
                </div>
                <div className='flex items-center text-[#44A6D0] space-x-2'>
                    <Plane className='w-7' />
                    <p>Saudia Airlines, Oman Air</p>
                </div>
                <div className='flex items-center text-[#44A6D0] space-x-2'>
                    <Hotel className='w-9' />
                    <p>Hotel Hilton, Hotel Taiba Front, Hotel Golden Tulip Az Zahabi, dll</p>
                </div>
                <Button  className='w-full bg-[#44A6D0]' >Tabung Sekarang</Button>
            </div>
        </div>
    );
}

export default Card;