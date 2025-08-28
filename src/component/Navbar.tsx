import { FiAlignRight } from 'react-icons/fi'
import logo from '../assets/updated_logo.png'
import { IoCloseOutline } from 'react-icons/io5'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useMeQuery } from '../redux/slices/authApi';

interface NavPopudProps {
    setPopup: (value: boolean) => void;
    popUp: boolean;
}

const Navbar = () => {
    const [popUp, setPopup] = useState<boolean>(false)
const {data} = useMeQuery(undefined)
console.log(data)
    return (
        <div className='max-w-screen flex flex-col items-start justify-center relative'>
            {/* UPPER NAV */}
            <div className='flex gap-2 flex-col py-4 items-center justify-center w-full font-regular bg-[var(--primary-color)] lg:bg-transparent text-lg text-white lg:text-[16px] lg:pl-28 lg:flex-row lg:justify-start lg:px-8 border-b-[0.2px] border-white/20 '>
                <p>Call Us: 01796-0000000</p>
                <p>Email Us: metropf@metroparcelserivce.com</p>
            </div>
            {/* UPPER NAV === */}
            {/* LOWER NAV */}
            <div className="flex min-w-screen lg:px-30 mx-auto justify-between items-center">
                <Link to={'/'}>
                    <img className='w-[200px] lg:w-[300px] cursor-pointer' src={logo} alt="Logo" />
                </Link>

                <div className='lg:hidden'>
                    <FiAlignRight onClick={() => { setPopup(true) }} className='text-2xl text-white mr-4 cursor-pointer' />
                    <NavPopud setPopup={setPopup} popUp={popUp} />
                </div>
                {/* Lg nav */}
                <ul className='hidden lg:flex items-center gap-8 text-white font-semibold text-lg mb-8'>
                    <Link to={'/'}><li className='cursor-pointer '>Home</li></Link>
                    <Link to={'/service-page'}><li className='cursor-pointer'>Services</li>
                    </Link>
                    <Link to={'/about'}><li className='cursor-pointer'>About</li></Link>
                   <div>
                    {
                        data?.currentUser? (
                            <div className='flex gap-2 items-center cursor-pointer'>

                                {/* <p className='text-semibold text-blue-500 underline'>{data.currentUser.user.name.split(' ')[0]}</p> */}
                                <img src='https://img.freepik.com/premium-vector/user-icon-icon_1076610-59410.jpg?w=200' className='w-[20px] rounded-full border-white'/>
                            </div>
                        ):(
                             <div className='flex gap-4'>
                        <Link to={'/register'}>SignUp</Link>
                        <Link to={'/login'}>Login</Link>
                    </div>
                        )
                    }
                   </div>
                </ul>
                <button className='px-12 py-4 bg-[var(--primary-color)]  text-center text-white font-regular text-xl hover:bg-red-500 cursor-pointer transition duration-75 mt-4 mr-8 mb-8 hidden lg:block'>Contact Us</button>
                {/* lg nav === */}
            </div>
            {/* LOWER NAV === */}
        </div>
    )
}

const NavPopud = ({ setPopup, popUp }: NavPopudProps) => {
    return (
        <div className={`absolute top-24 ${popUp === true ? "right-0" : "-right-300"}  bg-white flex flex-col gap-4 py-4 transition-all duration-400 min-w-screen md:min-w-1/2 ease-in-out min-h-screen z-100`}>
            <div className='flex justify-between items-center  -mt-2'>
                <Link to={'/'}>
                    <img className='w-[200px] cursor-pointer' src={logo} alt="Logo" />
                </Link>
                <IoCloseOutline onClick={() => { setPopup(false) }} className='text-4xl mr-2 font-regular cursor-pointer' />
            </div>
            <ul className='flex gap-4 flex-col items-start justify-center font-regular text-xl px-4 ml-2'>
                <Link to={'/'}><li className='cursor-pointer'>Home</li></Link>
                <Link to={'/service-page'}><li className='cursor-pointer'>Services</li>
                </Link>
                <Link to={'/about'}><li className='cursor-pointer'>About</li></Link>
                <div className='flex flex-col gap-4'>
                    <Link to={'/register'}>SignUp</Link>
                    <Link to={'/login'}>Login</Link>
                </div>
            </ul>
            <button className='px-12 py-4 bg-[var(--primary-color)] w-[90%] text-center mx-auto text-white font-regular text-xl hover:bg-red-500 cursor-pointer transition duration-75 mt-4'>Contact Us</button>
        </div>
    )
}

export default Navbar