import React from 'react'
import Navbar from '../component/Navbar'

const About = () => {
    return (
        <div className='min-w-screen relative'>
            <div className='bg-[url("https://cdn.prod.website-files.com/672544f2398bd9ac165adaa2/673a237aaab857de30d1cb01_trucks-highway-mountain-sunset%20Large.jpeg")] h-[500px] bg-cover bg-center'>
                <div className='absolute top-0 left-o h-[500px] w-full bg-black/60'></div>
                <Navbar />

                <div className='flex h-64 flex-col items-center justify-center gap-4'>
                    <p className='py-1 px-6 text-center bg-[var(--primary-color)] text-white font-bold transform skew-x-[-20deg] text-xl'>
                        Metro Parcel Service
                    </p>
                    <p className='text-5xl md:text-8xl text-white font-extrabold text-center z-10'>About Us</p>
                    <p className='text-lg font-bold text-center text-white z-10'>Trusted Expedited Parcel Service Since 1288 – Delivering on Time, Every Time.</p>
                </div>
            </div>

            <div className='flex flex-col lg:flex-row items-start justify-center py-12 px-8 max-w-screen-xl mx-auto'>
                <p className='text-5xl font-bold lg:w-1/2'>Your Trusted Partner for 24/7 Transportation Solutions .</p>

                <div className='lg:w-1/2'>
                    <p className='text-xl text-black/70 py-4'>Since 1988, Metro Parcel & Freight has been a trusted leader in the transportation industry, known for delivering tailored logistics solutions with precision and reliability. Recognized as a carrier of choice, we prioritize exceptional service, offering 24/7 availability to ensure your freight is always on the move.</p>
              


                    <p className='text-xl text-black/70 py-4'>
                        Our services include ground expedite, dedicated truckloads, flatbed shipments, cross-border solutions for Mexico and Canada, expedited freight, hazmat transportation, warehousing, and specialized freight services. Equipped with advanced technology and a customer-first approach, we guarantee safe, timely, and efficient deliveries.</p>
                    <p className='text-xl text-black/70 py-4'>
                        At Metro Parcel & Freight, we don’t just move goods—we drive your success. Partner with us to keep your business moving forward, on time, every time.</p>

                </div>

            </div>
        </div>
    )
}

export default About