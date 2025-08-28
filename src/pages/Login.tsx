import { useState } from 'react'
import Navbar from '../component/Navbar'
import { IoEye } from 'react-icons/io5'
import { IoMdEyeOff } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useLoginMutation, useMeQuery, useRegisterMutation } from '../redux/slices/authApi'
import RegLoader from '../utils/RegLoader'

const Login = () => {
  
  const [eye, setEye] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [login, { isLoading }] = useLoginMutation()
  const { data } = useMeQuery(undefined)
console.log(data)
  if (isLoading) {
    return <RegLoader />
  }
  const submitRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await login({
        email,
        password,
      }).unwrap()
      console.log('success 😍😍😍', res)
      console.log(res.message, res.statusCode)

    } catch (error) {
      console.log("Register failed", error)
    }

    setEmail('')
    setPassword('')



  }
  return (
    <div className='min-w-screen'>
      <div className='bg-[url("https://cdn.prod.website-files.com/672544f2398bd9ac165adaa2/673a237aaab857de30d1cb01_trucks-highway-mountain-sunset%20Large.jpeg")] h-[500px] bg-cover bg-center'>
        <div className='absolute top-0 left-o h-[500px] w-full bg-black/60'></div>
        <Navbar />

        <div className='flex h-64 flex-col items-center justify-center gap-4'>
          <p className='text-5xl md:text-8xl text-white font-extrabold text-center z-10'>Login Now</p>
        </div>
      </div>
      {/* form */}
      <div className='py-16 max-w-screen-xl mx-auto  bg-zinc-50'>
        <form onSubmit={submitRegister} className='max-w-screen-sm mx-auto flex flex-col items-center justify-center gap-4 py-8 px-4 bg-white  shadow-sm'>
          <h1 className='font-bold text-4xl text-center '>Login</h1>
          <div className='flex flex-col w-full gap-8  px-4 py-8'>

            <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder='Email*' required className='border-none bg-zinc-100 p-4 text-lg text-black/70 font-medium 
             focus:outline-none  focus:rounded-lg'/>


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


            <button type='submit' className='text-lg bg-red-500/70 py-4 cursor-pointer text-white font-semibold'>Submit</button>
          </div>

          <p className='text-md font-medium'>Not registered yet? <Link to={'/register'}>Register</Link></p>
        </form>
      </div>

      {/* form === */}
    </div>
  )
}

export default Login