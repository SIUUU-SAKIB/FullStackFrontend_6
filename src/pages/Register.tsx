import { useState } from 'react'
import Navbar from '../component/Navbar'
import { IoEye } from 'react-icons/io5'
import { IoMdEyeOff } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useMeQuery, useRegisterMutation } from '../redux/slices/authApi'
import RegLoader from '../utils/RegLoader'

const Register = () => {
    const [eye, setEye] = useState<boolean>(false)
    const [eye2, setEye2] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [conPass, setConPass] = useState<string>('')
    const [alert, setAlert] = useState<boolean>(false)
    const [role, setRole] = useState<string>('')
    const [register, { isLoading}] = useRegisterMutation()
    const {data} = useMeQuery(undefined)
    if(data === undefined) {
        console.log('loggout successful')
    }
    console.log(data)
    if (isLoading) {
        return <RegLoader />
    }
    const submitRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== conPass) {
            setAlert(true)
            return
        } else {
            try {
                const res = await register({
                    name,
                    email,
                    password,
                    role
                }).unwrap()
                console.log('success 😍😍😍', res)
                console.log(res.message, res.statusCode)
     
            } catch (error) {
                console.log("Register failed", error)
            }
            setName('')
            setEmail('')
            setPassword('')
            setConPass('')
        }

    }
    return (
        <div className='min-w-screen'>
            <div className='bg-[url("https://cdn.prod.website-files.com/672544f2398bd9ac165adaa2/673a237aaab857de30d1cb01_trucks-highway-mountain-sunset%20Large.jpeg")] h-[500px] bg-cover bg-center'>
                <div className='absolute top-0 left-o h-[500px] w-full bg-black/60'></div>
                <Navbar />

                <div className='flex h-64 flex-col items-center justify-center gap-4'>
                    <p className='text-5xl md:text-8xl text-white font-extrabold text-center z-10'>Register Now</p>
                </div>
            </div>
            {/* form */}
            <div className='py-16 max-w-screen-xl mx-auto  bg-zinc-50'>
                <form onSubmit={submitRegister} className='max-w-screen-sm mx-auto flex flex-col items-center justify-center gap-4 py-8 px-4 bg-white  shadow-sm'>
                    <h1 className='font-bold text-4xl text-center '>Register</h1>
                    <div className='flex flex-col w-full gap-8  px-4 py-8'>
                        <input onChange={(e) => setName(e.target.value)} value={name} type='text' placeholder='Name' required className='border-none py-4 px-4 text-lg text-black/70 font-medium 
             focus:outline-none focus:rounded-lg bg-zinc-100' />

                        <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder='Email*' required className='border-none bg-zinc-100 p-4 text-lg text-black/70 font-medium 
             focus:outline-none  focus:rounded-lg'/>
                        {/* role */}
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className="border-none py-4 px-4 text-lg text-black/40 font-medium 
             focus:outline-none focus:rounded-lg bg-zinc-100"
                        >
                            <option className='border-none' value="">Choose you role</option>
                            <option value="sender">sender</option>
                            <option value="receiver">receiver</option>
                        </select>
                        {/* role === */}

                        <div className='flex bg-zinc-100 items-center justify-between w-full'>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type={eye ? 'text' : 'password'}
                                placeholder="Password"
                                required
                                className="
    py-4 px-4 text-lg text-black/70 font-medium
    focus:outline-none focus:ring-0 border-none focus:rounded-lg
    bg-zinc-100 w-full
    autofill:bg-zinc-100 autofill:text-black/70
  "
                            />

                            <div>
                                <IoMdEyeOff onClick={() => setEye(true)} className={`text-xl mr-4 cursor-pointer ${eye === true ? 'hidden' : 'block'}`} />
                                <IoEye onClick={() => setEye(false)} className={`text-xl mr-4 cursor-pointer ${eye === true ? 'block' : 'hidden'} `} />
                            </div>
                        </div>


                        <div className={`flex ${alert === true ? "flex-col" : "flex-row"} items-start justify-between w-full`}>
                            <div className='flex bg-zinc-100 items-center justify-between w-full'>
                                <input onChange={(e) => setConPass(e.target.value)} value={conPass} type={eye2 === true ? 'text' : 'password'} placeholder='Confirm Password' required className={`border-none py-4 px-4 text-lg text-black/70 font-medium 
             focus:outline-none focus:rounded-lg ${alert === true ? "bg-red-200" : "bg-zinc-100"}  w-full`} />
                                <div>
                                    <IoMdEyeOff onClick={() => setEye2(true)} className={`text-xl mr-4 cursor-pointer ${eye2 === true ? 'hidden' : 'block'}`} />
                                    <IoEye onClick={() => setEye2(false)} className={`text-xl mr-4 cursor-pointer ${eye2 === true ? 'block' : 'hidden'} `} />
                                </div>
                            </div>
                            <p className={`text-red-500 font-bold ${alert === true ? 'block' : "hidden"}`}>Password do not match</p>
                        </div>
                        <button type='submit' className='text-lg bg-red-500/70 py-4 cursor-pointer text-white font-semibold'>Submit</button>
                    </div>

                    <p className='text-md font-medium'>Already a member? <Link to={'/login'}>Login</Link></p>
                </form>
            </div>

            {/* form === */}
        </div>
    )
}

export default Register