import { Link } from 'react-router-dom';
import video from '../assets/hero_video.mp4'
import Navbar from '../component/Navbar';
import { useContext } from 'react';
import { contextApi } from '../ContextProvider';
import { useMeQuery } from '../redux/slices/authApi';

interface HeroProps {
  onScrollClick: () => void
}
const Hero: React.FC<HeroProps> = ({ onScrollClick }) => {
  const { userId } = useContext(contextApi) || {}
  const { data } = useMeQuery(undefined)
  console.log(data)
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={video}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
      <Navbar />

      <div className="relative z-10 flex flex-col items-center justify-center h-2/3  text-white">
        <h1 className="text-7xl font-bold text-center">When Time <span className='italic'>Matters</span>,<br />
          Our Team <span className='italic'>Delivers</span>.</h1>
        <p className="text-lg mt-4 text-center text-white/70 font-semibold">Your Complete Transportation and Logistics Solution!
        </p>
        <div className='mt-4 flex items-center justify-center gap-2 lg:gap-8 flex-col lg:flex-row'>
          <div className='flex gap-4'>

            <Link to={`/parcel-form/${userId}`} onClick={onScrollClick} className='px-21 py-4 bg-[var(--primary-color)]  text-center text-white font-regular text-xl hover:bg-red-600 cursor-pointer transition duration-75 font-bold italic'>Send parcel</Link>


          </div>

          <Link to={"/about"} className='px-12 py-4 bg-transparent border-1 border-[var(--primary-color)]  text-center text-white font-regular text-xl hover:bg-red-600 cursor-pointer transition duration-75 '>What sets up apart?</Link>
        </div>
      </div>
    </div>
  );
}
export default Hero