import Card from "@/components/card_paket";

const PaketSection = () => {
    return (
        <div className="py-9 md:px-32 bg-[#E0E0E0]">
            <h1 className="font-bold text-3xl text-center text-black">PAKET TERSEDIA</h1>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-11 py-16 px-4">
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
}

export default PaketSection;
