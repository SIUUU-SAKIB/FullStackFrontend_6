import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation, useMeQuery } from '../redux/slices/authApi';
import { contextApi } from '../ContextProvider';
import Swal from 'sweetalert2';
import { FiAlignRight, FiCheck } from 'react-icons/fi';
import logo from '../assets/updated_logo.png';
import { IoCloseOutline } from 'react-icons/io5';
import { RxCross1 } from 'react-icons/rx';
import RegLoader from '../utils/RegLoader';

// Define types for MeData and CurrentUser
interface CurrentUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
}

interface MeData {
  currentUser: CurrentUser;
}

interface NavPopudProps {
  setPopup: (value: boolean) => void;
  popUp: boolean;
  userId: string;
  data: MeData | undefined; // Allow data to be undefined while loading
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [popUp, setPopup] = useState<boolean>(false);
  const [logout, { isLoading, isError }] = useLogoutMutation();


  const { data, refetch } = useMeQuery(undefined);

  const [modal, setModal] = useState(false);
  const { setUserId, userId } = useContext(contextApi) || {};
  const userIdStr = userId ?? '';

  useEffect(() => {
    if (data?.currentUser?._id && setUserId) {
      setUserId(data.currentUser._id);
    } else if (data?.currentUser?.user?._id && setUserId) {
      setUserId(data.currentUser.user._id);
    }
  }, [data, setUserId]);

  if (isLoading) {
    return <RegLoader />;
  }

  if (isError) {
    console.log('Something went wrong');
  }

  const getDashboardLink = () => {
    const { role } = data?.currentUser?.user || data?.currentUser || {};

    if (role === 'admin' || role === 'super_admin') {
      return `/dashboard/adminDashboard`;
    } else {
      return `/dashboard/userDashboard/${userIdStr}`
    }
  };

  const logOutBtn = () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logout({});
          refetch();
          document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          console.log("token removed")
          document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          setModal(false);
          navigate('/');
          window.location.reload();
          Swal.fire({
            title: 'Successfully logged out!',
            icon: 'success',
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div className="max-w-screen flex flex-col items-start justify-center relative">
      <div className="flex gap-2 flex-col py-4 items-center justify-center w-full font-regular bg-[var(--primary-color)] lg:bg-transparent text-lg text-white lg:text-[16px] lg:pl-28 lg:flex-row lg:justify-start lg:px-8 border-b-[0.2px] border-white/20 ">
        <p>Call Us: 01796-0000000</p>
        <p>Email Us: metropf@metroparcelserivce.com</p>
      </div>

      <div className="flex min-w-screen lg:px-30 mx-auto justify-between items-center">
        <Link to={'/'}>
          <img className="w-[200px] lg:w-[300px] cursor-pointer" src={logo} alt="Logo" />
        </Link>

        <div className="lg:hidden">
          <FiAlignRight onClick={() => { setPopup(true); }} className="text-2xl text-white mr-4 cursor-pointer" />
          <NavPopud data={data} userId={userIdStr} setPopup={setPopup} popUp={popUp} />
        </div>

        <ul className="hidden lg:flex items-center gap-8 text-white font-semibold text-lg mb-8">
          <Link to={'/'}><li className="cursor-pointer active:">Home</li></Link>
          <Link to={'/service-page'}><li className="cursor-pointer">Services</li></Link>
          <Link to={'/about'}><li className="cursor-pointer">About</li></Link>
          <div>
            {data?.currentUser ? (
              <div className="flex gap-2 items-center cursor-pointer relative z-100">
                <img onClick={() => setModal(modal => modal === true ? false : true)} src="https://img.freepik.com/premium-vector/user-icon-icon_1076610-59410.jpg?w=200" className="w-[40px] rounded-full border-white" />

                <div className={`absolute top-12 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 p-4 w-[250px] rounded-lg shadow-lg ${modal ? "block" : "hidden"} transition duration-300`}>
                  <p className="font-semibold text-white">
                    {data?.currentUser?.name || data?.currentUser?.user?.name}
                  </p>
                  <p className="font-semibold text-white">
                    {data.currentUser?.email || data.currentUser?.user?.email}
                  </p>
                  <div className="flex gap-2 items-center text-white">
                    Verified
                    {data.currentUser?.isVerified === false || data.currentUser?.user?.isVerified === false ? (
                      <RxCross1 className="text-white text-xl font-bold bg-red-400 rounded-full p-1" />
                    ) : (
                      <FiCheck className="text-white font-bold bg-green-400 text-xl rounded-full p-1" />
                    )}
                  </div>
                  <Link to={`/dashboard/userDashboard/${userIdStr}`}><p className="cursor-pointer">Dashboard</p></Link>
                  <p onClick={logOutBtn} className="cursor-pointer">Logout</p>
                  <div className="absolute h-[5px] w-[100%] bg-red-500 top-0 right-0 rounded-t-lg"></div>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to={'/register'}>SignUp</Link>
                <Link to={'/login'}>Login</Link>
              </div>
            )}
          </div>
        </ul>
        <Link className="hidden lg:block" to={getDashboardLink()}>
          <button disabled={data === undefined} className="px-12 py-4 bg-[var(--primary-color)] text-center text-white font-regular text-xl hover:bg-red-500 cursor-pointer transition duration-75 mt-4 mr-8 mb-8">
            Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

const NavPopud: React.FC<NavPopudProps> = ({ setPopup, popUp, userId, data }) => {
  return (
    <div className={`absolute top-24 ${popUp === true ? "right-0" : "-right-300"} bg-white flex flex-col gap-4 py-4 transition-all duration-400 min-w-screen md:min-w-1/2 ease-in-out min-h-screen z-100`}>
      <div className="flex justify-between items-center -mt-2">
        <Link to={'/'}>
          <img className="w-[200px] cursor-pointer" src={logo} alt="Logo" />
        </Link>
        <IoCloseOutline onClick={() => { setPopup(false); }} className="text-4xl mr-2 font-regular cursor-pointer" />
      </div>
      <ul className="flex gap-4 flex-col items-start justify-center font-regular text-xl px-4 ml-2">
        <Link to={'/'}><li className="cursor-pointer">Home</li></Link>
        <Link to={'/service-page'}><li className="cursor-pointer">Services</li></Link>
        <Link to={'/about'}><li className="cursor-pointer">About</li></Link>
        <div className="flex flex-col gap-4">
          <Link to={'/register'}>SignUp</Link>
          <Link to={'/login'}>Login</Link>
        </div>
      </ul>
   
    </div>
  );
};

export default Navbar;
