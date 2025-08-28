
import Navbar from '../component/Navbar'
import OurServices from './OurServices'

const ServicePage = () => {
    return (
        <div className='min-w-screen object-contain object-center relative'>
            <div className='bg-[url("https://cdn.prod.website-files.com/672544f2398bd9ac165adaa2/673a236880806ed847a84990_vecteezy_usa-montana-april-28-2018-car-on-an-asphalt-road-against_50534625.jpeg")] h-[500px] bg-cover bg-center'>
            <div className='absolute top-0 left-o h-[500px] w-full bg-black/60'></div>
                <Navbar />

                <div className='flex h-64 flex-col items-center justify-center gap-4'>
                    <p className='text-5xl md:text-7xl text-white font-extrabold text-center z-10'>Our Services</p>
                    <p className='text-lg font-bold text-center text-white z-10'>Reliable logistics tailored to your needs, from expedited to cross-border services.</p>
                </div>
            </div>
            <OurServices/>
        </div>
    )
}

export default ServicePage