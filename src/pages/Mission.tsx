
import lorry from '../assets/Lorry.jpeg'
const Mission = () => {
  return (
    <div className='max-w-screen-xl mx-auto py-16 grid grid-cols-2'>
        <img src={lorry} className='col-span-2 lg:col-span-1 h-100 w-full object-cover' />

      <div className='bg-zinc-900 flex gap-8 py-12 flex-col items-start justify-center col-span-2 lg:col-span-1 px-4'>
        <p className=' font-bold text-4xl text-white'>Our Mission</p>
        <p className='text-white/95 font-medium text-2xl  '>
            Metro Parcel service is a leading provider of transportation and logistics services across the India, China and Bangladesh.  We view ourselves as a partner with our customers, our employees, our community, and our environment.  We pride ourselves on exceeding customer expectations by delivering exceptional service with bottom line savings.
        </p>
      </div>
    </div>
  )
}

export default Mission