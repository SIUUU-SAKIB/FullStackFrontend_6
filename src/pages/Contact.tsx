import React from 'react'
import Navbar from '../component/Navbar'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import Swal from 'sweetalert2'
const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        e.target.name.value = ''
        e.target.email.value = ''
        e.target.address.value = ''
        e.target.query.value = ''
        e.target.phone.value = ''
        Swal.fire({
            position: "top-bottom",
            icon: "success",
            title: "Your query sent 😍",
            showConfirmButton: false,
            timer: 1500
        });
    }
    return (
        <div className='min-w-screen relative'>
            <div className='bg-[url("https://cdn.prod.website-files.com/672544f2398bd9ac165adaa2/673a237aaab857de30d1cb01_trucks-highway-mountain-sunset%20Large.jpeg")] h-[500px] bg-cover bg-center'>
                <div className='absolute top-0 left-o h-[500px] w-full bg-black/60'></div>
                <Navbar />

                <div className='flex h-64 flex-col items-center justify-center gap-4'>
                    <p className='py-1 px-6 text-center bg-[var(--primary-color)] text-white font-bold transform skew-x-[-20deg] text-xl'>
                        Metro Parcel Service
                    </p>
                    <p className='text-5xl md:text-8xl text-white font-extrabold text-center z-10'>Contact Us</p>
                    <p className='text-lg font-bold text-center text-white z-10'>Trusted Expedited Parcel Service Since 1288 – Delivering on Time, Every Time.</p>
                </div>
            </div>
            <div className='max-w-screen-xl gap-8 flex mx-auto px-8 md:px-2 py-12 flex-col-reverse items-center  md:flex-row'>
                {/* form */}
                <form onSubmit={handleSubmit} className="max-w-screen-lg w-full lg:w-1/2 mx-auto py-16 flex flex-col gap-4 items-center justify-center bg-white shadow-lg px-4">
                    <div className="flex flex-col gap-4 w-full ">

                        {/* Receiver information */}
                        <div className="gap-2 flex flex-col">
                            <label className="text-4xl text-black/70 font-bold text-center">Contact Us</label>
                            <input name='name' type="text" required className="border-none py-4 px-4 text-lg text-black/70 font-medium focus:outline-none focus:rounded-lg bg-zinc-100" placeholder="Name" />
                            <input name='phone' type="text" required className="border-none py-4 px-4 text-lg text-black/70 font-medium focus:outline-none focus:rounded-lg bg-zinc-100" placeholder="Phone Number" />
                            <input name='email' type="text" required className="border-none py-4 px-4 text-lg text-black/70 font-medium focus:outline-none focus:rounded-lg bg-zinc-100" placeholder="Email" />
                            <input name='address' type="text" className="border-none py-4 px-4 text-lg text-black/70 font-medium focus:outline-none focus:rounded-lg bg-zinc-100" placeholder="Address (optional)" />
                        </div>
                    </div>

                    {/* Description */}
                    <input name='query' type="text" className="border-none py-4 px-4 text-lg text-black/70 font-medium focus:outline-none focus:rounded-lg bg-zinc-100 w-full" placeholder="Write your query" />


                    <button className="w-full px-2 py-4 bg-[var(--primary-color)] text-white font-semibold text-xl hover:bg-red-500 transition duration-300 cursor-pointer" type="submit">
                        Send Query
                    </button>
                </form>
                {/* form //// */}
                {/* text */}
                <div className='flex flex-col  gap-4 items-start w-full lg:w-1/2'>
                    <p className='font-bold text-lg text-red-500 uppercase'>Get in touch with us</p>
                    <p className='text-5xl font-bold'>Reliable Shipping
                        Every Time
                        Everywhere</p>
                    <p className='text-lg font-medium text-black/50'>At Metro Parcel & Freight, we’re here to make sure your shipments move seamlessly across the U.S., Canada, and Mexico. We handle all the details, so you can trust your freight will arrive safely and on time.</p>
                    <div className='flex flex-col gap-4 pt-4 items-start'>
                        <p className='text-xl font-bold'>Contact Us</p>
                        <div className='flex gap-4'>
                            <div className='p-1.5 rounded-full bg-red-500'><FiMapPin className='text-white text-lg' /></div>
                            <p className='text-lg text-black/50'>Sylhet, Bangladesh</p>
                        </div>
                        <div className='flex gap-4'>
                            <div className='p-1.5 rounded-full bg-red-500'><FiMail className='text-white text-lg' /></div>
                            <p className='text-lg text-black/50 hover:text-red-500 cursor-pointer transition-all duration-100'>metroparcel@gmail.com</p>
                        </div>



                        <div className='flex gap-4'>
                            <div className='p-1.5 rounded-full bg-red-500'><FiPhone className='text-white text-lg' /></div>
                            <p className='text-lg text-black/50 hover:text-red-500 cursor-pointer transition-all duration-100'>880-1796-414-761</p>
                        </div>
                    </div>
                </div>


                {/* texdt //// */}
            </div>
        </div>
    )
}

export default Contact