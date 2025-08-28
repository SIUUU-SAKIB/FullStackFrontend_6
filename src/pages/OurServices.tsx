import truck from '../assets/truck-removebg-preview.png'
import india from '../assets/Red_Map_of_India_on_Transparent_Background-removebg-preview.png';
import china from '../assets/ChatGPT_Image_Aug_25__2025__09_37_36_PM-removebg-preview.png'
const OurServices = () => {
    return (
        <div className='max-w-screen-xl mx-auto py-12'>
            {/* heading */}
            <div className='flex flex-col gap-4 py-4 items-center justify-center'>
                <p className='py-1 px-6 text-center bg-[var(--primary-color)] text-white font-bold transform skew-x-[-20deg]'>
                    OUR SERVICES
                </p>
                <p className='text-2xl md:text-4xl lg:text-6xl font-bold max-w-3xl text-center lg:hidden'>
                    We provide complete support<br /> for your parcel to reach destination without any hassle
                </p>
                <p className='text-6xl font-bold max-w-3xl text-center hidden lg:block'>
                    We provide complete support for your parcel to reach destination without any hassle
                </p>
            </div>
            {/* heading === */}

            {/* cards */}
            <div className='flex flex-col gap-8 items-center justify-center max-w-screen-xl mx-auto] py-8'>
                {/* card-1 */}
                <div className='grid grid-row-4 rounded-md bg-white shadow-xs items-center p-4 w-full place-items-center h-[450px] md:h-[550px] lg:h-[580px] mx-auto hover:border-8 hover:border-red-500 transition duration-75 ease-in cursor-pointer '>
                    <img src={truck} className='w-[300px] md:w-[350px] row-span-1 lg:w-[400px] object-contain' />
                    <div className='flex flex-col row-span-2 gap-6'>
                        <p className='font-bold text-2xl text-center'>Dedicated Services</p>
                        <p className='text-black/90 text-center max-w-screen-lg text-lg'>Tailored logistic solutions with dedcated vehicles and drivers committed solely to your parcel shipments</p>
                    </div>
                </div>

                {/* 3 cards */}
                <div className='grid grid-cols-1 mx-auto lg:grid-cols-3 max-w-screen-xl gap-4'>
                    {/* 1st card */}
                    <div className='grid grid-row-4 rounded-md px-4 bg-white shadow-xs items-center p-4 w-full place-items-center mx-auto hover:border-8 hover:border-red-500 transition duration-300 ease-in cursor-pointer'>
                        <img src={india} className='w-[300px] md:w-[350px] row-span-1 lg:w-[450px] object-contain' />
                        <div className='flex flex-col row-span-2 gap-6'>
                            <p className='font-bold text-center text-2xl'>India Cross Border Solution</p>
                            <p className='text-black/90 text-center max-w-screen-lg text-lg'>Efiicient logistics for shipping across Bangladesh-Inda border with full customs support</p>
                        </div>
                    </div>
                    {/* 2nd */}
                    <div className='grid grid-row-4 rounded-md px-4 bg-white shadow-xs items-center p-4 w-full place-items-center mx-auto hover:border-8 hover:border-red-500 transition duration-75 ease-in cursor-pointer'>
                        <img src={china} className='w-[300px] md:w-[350px] row-span-1 lg:w-[450px] object-contain' />
                        <div className='flex flex-col row-span-2 gap-6'>
                            <p className='font-bold text-center text-2xl'>China Cross Border Solutions</p>
                            <p className='text-black/90 text-center max-w-screen-lg text-lg'>Efiicient logistics for shipping across Bangladesh-China border with full customs support</p>
                        </div>
                    </div>
                    {/* 3rd */}
                    <div className='grid grid-row-4 rounded-md px-4 bg-white shadow-xs items-center p-4 w-full place-items-center mx-auto hover:border-8 hover:border-red-500 transition duration-75 ease-in cursor-pointer'>
                        <img src='https://cdn.prod.website-files.com/672544f2398bd9ac165adaa2/673f90050b6f5e54cb3bd67a_expedited%20icon.png' className='w-[300px] md:w-[350px] row-span-1 lg:w-[450px] object-contain' />
                        <div className='flex flex-col row-span-2 gap-6'>
                            <p className='font-bold text-center text-2xl'>Expedited Parcel Services</p>
                            <p className='text-black/90 text-center max-w-screen-lg text-lg'>Tailored logistic solutions with dedcated vehicles and drivers committed solely to your parcel shipments</p>
                        </div>
                    </div>
                </div>
                {/* 3 cards === */}
            </div>
            {/* cards === */}
        </div>
    )
}

export default OurServices