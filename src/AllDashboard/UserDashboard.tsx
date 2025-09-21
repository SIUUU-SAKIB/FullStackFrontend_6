import { useContext, useEffect, useState } from 'react';
import logo from '../assets/updated_logo.png';
import { Link, useParams } from 'react-router-dom';
import { useMeQuery } from '../redux/slices/authApi';
import { CgProfile } from 'react-icons/cg';
import {  MdOutlinePendingActions } from 'react-icons/md';
import { useGetParcelByUserQuery, useGetReceiverParcelQuery } from '../redux/slices/parcelApi';
import RegLoader from '../utils/RegLoader';
import { CiSearch } from 'react-icons/ci';
import Card from '../component/Card';
import { contextApi } from '../ContextProvider';
import { FaRegWindowClose } from 'react-icons/fa';
import { FaArrowRightLong } from "react-icons/fa6";

const UserDashboard = () => {

  const { id: userId } = useParams();
  const { data: meData, refetch: meRefetch } = useMeQuery(undefined);
  const { data: parcelData, isLoading: parcelLoading, isError: parcelError, refetch: parcelRefetch } = useGetParcelByUserQuery(userId);
  const { data: receiverData, isError, refetch: receiverRefetch } = useGetReceiverParcelQuery(meData?.currentUser?.email || meData?.currentUser?.user?.email)

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

useEffect(() => {
  meRefetch();
  parcelRefetch();
  const parcelFiltered = parcelData?.data?.[0]?.filter((e) => e.trackingNumber === trcNum) || [];
  const receiverFiltered = receiverData?.data?.filter((e) => e.trackingNumber === trcNum) || [];

  const filtered = [...parcelFiltered, ...receiverFiltered];

  setTrParcel(filtered);

}, [trcNum]);


console.log(trParcel)
  if (parcelLoading) {
    return <RegLoader />;
  }

  if (parcelError) {
    return <div>Error loading parcels!</div>;
  }

  function formatReadableDate(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  return (
    <div className="bg-[url('https://wallpapers.com/images/featured/cool-trucks-cdvn4ttk7o8geggz.jpg')] min-h-screen max-w-screen bg-center bg-cover bg-no-repeat relative">
      {(meData?.currentUser?.blocked === true || meData?.currentUser?.user?.blocked === true || meData?.currentUser?.isVerified === false || meData?.currentUser?.user?.isVerified === false) && (
        <div className="absolute top-0 left-0 w-full h-full bg-red-200/90 z-100 grid place-content-center">
          <p className="text-white font-extrabold z-200 text-6xl">OOPS YOU'RE BLOCKED OR NOT VERIFIED😔</p>
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
                Incoming Parcels: <span className="text-red-500 font-bold">{receiverData?.data.length}</span>
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <MdOutlinePendingActions />
              <p className="font-light">
                Your Parcels: <span className="text-red-500 font-bold">{parcelData?.data[0].length}</span>
              </p>
            </div>



          </div>
        </div>

        <div className={`flex-col items-start py-8 ${trcNum.length > 0 ? 'hidden' : 'flex'}`}>
          <div className="flex flex-col md:flex-row w-full items-center justify-center gap-2 md:gap-8 ">
            <div
              onClick={() => {
                setSent(false)
                setIncoming(true)
                setAll(false)
              }}
              className="md:max-w-[400px] min-w-[200px] flex items-center justify-center px-4 py-2 cursor-pointer rounded-xl z-10 gap-1 bg-white/90 hover:bg-white transition duration-200"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa8fp5rWKGjjrxB2RQATZs_4ozJkTLwQktRw&s"
                className="w-[40px] rounded-full"
              />
              <p className="text-xl font-medium">Incoming </p>
            </div>
            <div
              onClick={() => {
                setIncoming(false)
                setSent(true)
                setAll(false)
              }}
              className="md:max-w-[400px] min-w-[200px] flex items-center justify-center px-4 py-2 cursor-pointer rounded-xl z-10 gap-1 bg-white/90 hover:bg-white transition duration-200"
            >
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR50Ic3NJ6UqVUwxUTQ7iWSbesJzmLoBksCCw&s" className="w-[40px] rounded-full" />
              <p className="text-xl font-medium">Your parcels </p>
            </div>
          </div>


          <div className='max-w-screen-lg mx-auto z-10 flex gap-8 items-center justify-center'>
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
                  setTrack(tracking);
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
          <p className='text-center w-full z-10 text-white font-bold text-2xl border-b'>{`${sent ? "All Sent Parcels" : "Incoming Parcels"}`}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center justify-items-center gap-4 py-2">
            <Card
              parcel={parcelData}
              sent={sent}
              delivered={delivered}
              incoming={incoming}
              meData={meData}
              track={track}
              inRoute={inRoute}
              status={status}
              parcelRefetch={parcelRefetch}
            />
          </div>
        </div>

        <div className={`max-w-screen-lg mx-auto bg-white py-24 z-10 ${trcNum.length > 0 ? 'block' : 'hidden'} relative`}>
          <FaRegWindowClose
            onClick={() => setTrcNum('')}
            className="absolute top-4 right-4 text-4xl text-red-500 cursor-pointer"
          />
          <div className="max-w-screen-md mx-auto h-[100px] bg-white flex flex-col gap-2 items-center px-4">
            <p className="text-center font-bold text-3xl text-black/80">Tracking: {trcNum}</p>
            <p className="text-shadow-zinc-700">Expected Delivery Date: {trParcel[0]?.expectedDeliveryDate}</p>
          </div>

          <div className="flex relative gap-12 items-center px-4">
            <div
              className={`${trParcel[0]?.currentStatus === 'rejected' ? 'flex' : 'hidden'
                } absolute top-0 left-0 w-full h-full bg-red-100/90 items-center justify-center gap-4`}
            >
              <div
                className={`text-lg font-bold px-4 py-2 rounded-lg ${trParcel[0]?.currentStatus === 'rejected' ? 'bg-red-500/90' : 'bg-zinc-500'
                  } text-white`}
              >
                Rejected
              </div>
              <p className="font-bold text-xl">{trParcel[0]?.rejectedDate}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex gap-1 items-center">
                <div
                  className={`text-lg font-bold px-4 py-2 rounded-lg ${trParcel[0]?.currentStatus === 'pending' ? 'bg-yellow-500/90' : 'bg-zinc-500'
                    } text-white`}
                >
                  Pending
                </div>
                <FaArrowRightLong className="text-4xl text-gray-500" />
              </div>
              <p className="text-sm max-w-[150px] font-light italic">
                {trParcel[0]?.createdAt ? formatReadableDate(trParcel[0]?.createdAt) : ''}
              </p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center">
                <div
                  className={`text-lg font-bold px-4 py-2 rounded-lg ${trParcel[0]?.currentStatus === 'approved' ? 'bg-blue-500/90' : 'bg-zinc-500'
                    } text-white`}
                >
                  Approved
                </div>
                <FaArrowRightLong className="text-4xl text-gray-500" />
              </div>
              <p className="text-sm max-w-[150px] font-light italic">
                {trParcel[0]?.approvalDate ? formatReadableDate(trParcel[0]?.approvalDate) : ''}
              </p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center">
                <div
                  className={`text-lg font-bold px-4 py-2 rounded-lg ${trParcel[0]?.currentStatus === 'in_transit' ? 'bg-green-500/90' : 'bg-zinc-500'
                    } text-white`}
                >
                  In Route
                </div>
                <FaArrowRightLong className="text-4xl text-gray-500" />
              </div>
              <p className="text-sm max-w-[150px] font-light italic">
                {trParcel[0]?.transitDate ? formatReadableDate(trParcel[0]?.transitDate) : ''}
              </p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div
                className={`text-lg font-bold px-4 py-2 rounded-lg ${trParcel[0]?.currentStatus === 'delivered' ? 'bg-purple-500/90' : 'bg-zinc-500'
                  } text-white`}
              >
                Delivered
              </div>
              <p className="text-sm max-w-[150px] font-light italic">
                {trParcel[0]?.deliveredDate ? formatReadableDate(trParcel[0]?.deliveredDate) : ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
