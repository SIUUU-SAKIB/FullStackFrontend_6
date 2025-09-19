import { useState } from 'react';
import Navbar from '../component/Navbar';
import { IoEye } from 'react-icons/io5';
import { IoMdEyeOff } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useCreateAdminMutation, useMeQuery } from '../redux/slices/authApi';
import RegLoader from '../utils/RegLoader';
import Swal from 'sweetalert2';

const CreateAdmin: React.FC = () => {
    const [eye, setEye] = useState<boolean>(false);
    const [eye2, setEye2] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [conPass, setConPass] = useState<string>('');
    const [alert, setAlert] = useState<boolean>(false);
    const [createAdmin, { isLoading }] = useCreateAdminMutation();
    const navigate = useNavigate();
    const { refetch } = useMeQuery(undefined);

    if (isLoading) {
        return <RegLoader />;
    }

    const submitRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== conPass) {
            setAlert(true);
            return;
        } else {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to make this user admin?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, do it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await createAdmin({
                            name,
                            email,
                            password,
                            role: "admin"
                        });

                        refetch();
                        navigate('/dashboard/adminDashboard');

                    } catch (error: any) {
                        console.log("Admin creation failed");
                        if (error.data.message === 'admin already exist') {
                            Swal.fire("Ooops! Admin already exists");
                            return;
                        }
                    }
                    Swal.fire({
                        title: "Success",
                        text: "Admin created successfully",
                        icon: "success"
                    });
                }
            });

            setName('');
            setEmail('');
            setPassword('');
            setConPass('');
        }
    };

    return (
        <div className='min-w-screen'>
            <div className='bg-[url("https://cdn.prod.website-files.com/672544f2398bd9ac165adaa2/673a237aaab857de30d1cb01_trucks-highway-mountain-sunset%20Large.jpeg")] h-[500px] bg-cover bg-center'>
                <div className='absolute top-0 left-o h-[500px] w-full bg-black/60'></div>
                <Navbar />

                <div className='flex h-64 flex-col items-center justify-center gap-4'>
                    <p className='text-5xl md:text-8xl text-white font-extrabold text-center z-10'>Create Admin</p>
                </div>
            </div>
            {/* form */}
            <div className='py-16 max-w-screen-xl mx-auto  bg-zinc-50'>
                <form onSubmit={submitRegister} className='max-w-screen-sm mx-auto flex flex-col items-center justify-center gap-4 py-8 px-4 bg-white  shadow-sm'>
                    <h1 className='font-bold text-4xl text-center '>Register</h1>
                    <div className='flex flex-col w-full gap-8  px-4 py-8'>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type='text'
                            placeholder='Name'
                            required
                            className='border-none py-4 px-4 text-lg text-black/70 font-medium focus:outline-none focus:rounded-lg bg-zinc-100'
                        />

                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type='email'
                            placeholder='Email*'
                            required
                            className='border-none bg-zinc-100 p-4 text-lg text-black/70 font-medium focus:outline-none  focus:rounded-lg'
                        />

                        <div className='flex bg-zinc-100 items-center justify-between w-full'>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type={eye ? 'text' : 'password'}
                                placeholder="Password"
                                required
                                className="py-4 px-4 text-lg text-black/70 font-medium focus:outline-none focus:ring-0 border-none focus:rounded-lg bg-zinc-100 w-full autofill:bg-zinc-100 autofill:text-black/70"
                            />

                            <div>
                                <IoMdEyeOff onClick={() => setEye(true)} className={`text-xl mr-4 cursor-pointer ${eye === true ? 'hidden' : 'block'}`} />
                                <IoEye onClick={() => setEye(false)} className={`text-xl mr-4 cursor-pointer ${eye === true ? 'block' : 'hidden'} `} />
                            </div>
                        </div>

                        <div className={`flex ${alert === true ? "flex-col" : "flex-row"} items-start justify-between w-full`}>
                            <div className='flex bg-zinc-100 items-center justify-between w-full'>
                                <input
                                    onChange={(e) => setConPass(e.target.value)}
                                    value={conPass}
                                    type={eye2 === true ? 'text' : 'password'}
                                    placeholder='Confirm Password'
                                    required
                                    className={`border-none py-4 px-4 text-lg text-black/70 font-medium focus:outline-none focus:rounded-lg ${alert === true ? "bg-red-200" : "bg-zinc-100"}  w-full`}
                                />
                                <div>
                                    <IoMdEyeOff onClick={() => setEye2(true)} className={`text-xl mr-4 cursor-pointer ${eye2 === true ? 'hidden' : 'block'}`} />
                                    <IoEye onClick={() => setEye2(false)} className={`text-xl mr-4 cursor-pointer ${eye2 === true ? 'block' : 'hidden'} `} />
                                </div>
                            </div>
                            <p className={`text-red-500 font-bold ${alert === true ? 'block' : "hidden"}`}>Password do not match</p>
                        </div>
                        <button type='submit' className='text-lg bg-red-500/70 py-4 cursor-pointer text-white font-semibold'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateAdmin;
