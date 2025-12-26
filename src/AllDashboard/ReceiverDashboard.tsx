import { useContext, useEffect, useState } from 'react';
import logo from '../assets/updated_logo.png';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useMeQuery } from '../redux/slices/authApi';
import { CgProfile } from 'react-icons/cg';
import { MdOutlinePendingActions } from 'react-icons/md';
import { useGetParcelByUserQuery, useGetReceiverParcelQuery } from '../redux/slices/parcelApi';
import RegLoader from '../utils/RegLoader';
import { CiSearch } from 'react-icons/ci';
import Card from '../component/Card';
import { contextApi } from '../ContextProvider';

import Tracking from '../component/Tracking';
import RecCard from '../redux/services/RecCard';


const ReceiverDashboard = () => {

  const { id: userId } = useParams();
  const { data: meData, refetch: meRefetch } = useMeQuery(undefined);
  const { data: parcelData, isLoading: parcelLoading, isError: parcelError, refetch: parcelRefetch } = useGetParcelByUserQuery(meData?.currentUser?.email);
const navigate = useNavigate()
  const { data: receiverData, isError, refetch: receiverRefetch } = useGetReceiverParcelQuery(meData?.currentUser?.email)
  const [incoming, setIncoming] = useState(false);
  const [sent, setSent] = useState(true);
  const [delivered, setDelivered] = useState('');
  const [pending, setPending] = useState('')
  const [inRoute, setInRoute] = useState('')
  const [approved, setApproved] = useState('')
  const [status, setStatus] = useState('')
  const [track, setTrack] = useState('');
  const [tracking, setTracking] = useState('');
  const [rejected, setRejected] = useState('')
  const { trcNum, setTrcNum } = useContext(contextApi);
  const [trParcel, setTrParcel] = useState([]);
  const [all, setAll] = useState(false);
console.log(meData)
  if (parcelLoading) {
    return <RegLoader />;
  }
// useEffect(() => {
//   if (meData?.currentUser?.email) {
//     receiverRefetch();
//   }
// }, [meData?.currentUser?.email]);

  if (parcelError) {
    return <div>Error loading parcels!</div>;
  }


  return (
    <div className="bg-[url('https://wallpapers.com/images/featured/cool-trucks-cdvn4ttk7o8geggz.jpg')] min-h-screen max-w-screen bg-center bg-cover bg-no-repeat relative">
      {(meData?.currentUser?.blocked || !meData?.currentUser?.isVerified) && (
        <div className="absolute top-0 left-0 w-full h-full bg-red-500/95 z-100 grid place-content-center backdrop-blur-sm">
          <p className="text-white font-extrabold z-200 text-6xl text-center">{meData?.currentUser?.blocked ? "Your account has been blocked"
            : "Your account is not verified yet"}</p>
          <p className='text-white font-semibold text-xl text-shadow-2xs text-center  py-4'>{!meData?.currentUser?.blocked ? "Please wait for an admin to review your account"
            : "Please wait for admin to unblock you"}</p>
          <Link className='text-xl text-center' to={'/'}>Return to home</Link>
        </div>
      )}
      <div className="overlay h-full w-full left-0 top-0 absolute bg-black/50"></div>

      <div className="max-w-screen-xl mx-auto min-h-screen bg-white/20 flex flex-col items-center py-6">
        <p className="z-10 font-bold text-white text-4xl">Dashboard</p>
        <div className="flex items-center justify-evenly py-4 my-2 px-2 bg-black/30 w-full z-10">
          <Link to={'/'}>
            <img className="w-[200px] lg:w-[300px] cursor-pointer" src={logo} alt="Logo" />
          </Link>
          <div className="flex flex-col items-start text-white">
            <div className="flex gap-1 items-center">
              <CgProfile />
              <p className="font-regular text-lg">{meData?.currentUser?.name || meData?.currentUser?.user?.name}</p>
            </div>
            <div className="flex gap-1 items-center">
              <MdOutlinePendingActions />
              <p className="font-light">
                Your Parcels: <span className="text-red-500 font-bold">{receiverData?.data?.length}</span>
              </p>
            </div>



          </div>
        </div>

        <div className={`flex-col items-start py-8 ${trcNum.length > 0 ? 'hidden' : 'flex'}`}>



          <div className='max-w-screen-2xl mx-auto z-10 flex gap-8 items-center justify-center'>
            <div className=" mx-auto my-4 bg-white z-10 flex items-center justify-between px-4 rounded-sm py-1">
              <input
                onChange={(e) => setTracking(e.target.value)}
                placeholder="Tracking Number"
                className="border-none focus:outline-none py-2 w-full"
              />
              <CiSearch
                className="text-2xl cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/dashboard/more_info/${tracking}`)
                }}
              />
            </div>

            {
              all === false && <select
                className=" p-3 rounded-lg h-[50px] text-lg text-gray-700 bg-white border-2 border-gray-300 
  focus:outline-none focus:border-indigo-500 hover:bg-gray-50 transition ease-in-out duration-200"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="inRoute">In Route</option>
                <option value="delivered">Delivered</option>
                <option value="rejected">Rejected</option>
              </select>
            }

          </div>
          <p className='text-center w-full z-10 text-white font-bold text-2xl border-b'>{parcelData?.data[0]?.length === 0 ? "" :"All Parcels"}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center justify-items-center gap-4 py-2 w-full">
           {
            receiverData?.data.length === 0 ? (<p className='text-2xl font-bold  text-white z-10'>No parcel to show</p>) :( <RecCard
              parcel={receiverData}
              sent={sent}
              delivered={delivered}
              incoming={incoming}
              meData={meData}
              track={track}
              inRoute={inRoute}
              status={status}
              parcelRefetch={parcelRefetch}
            />)
           }
          </div>
        </div>

        <div className={`max-w-screen-lg mx-auto bg-white py-24 z-10 ${trcNum.length > 0 ? 'block' : 'hidden'} relative`}>
          <Tracking />
          

        </div>
      </div>
    </div>
  );
};

export default ReceiverDashboard;
