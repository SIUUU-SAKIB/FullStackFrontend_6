import { useContext, useEffect, useState } from 'react';
import logo from '../assets/updated_logo.png';
import { Link, useParams } from 'react-router-dom';
import { useMeQuery } from '../redux/slices/authApi';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineApproval, MdOutlinePendingActions } from 'react-icons/md';
import { AiOutlineDeliveredProcedure } from 'react-icons/ai';
import { useGetParcelByUserQuery } from '../redux/slices/parcelApi';
import RegLoader from '../utils/RegLoader';

import { CiSearch } from 'react-icons/ci';
import Card from '../component/Card';
import { contextApi } from '../ContextProvider';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { IoCloseCircleOutline } from 'react-icons/io5';

// Type declarations
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  blocked?: boolean;
}

interface MeData {
  currentUser: User | { user: User };
}

interface SenderReceiver {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Parcel {
  _id: string;
  currentStatus: string;
  trackingNumber: string;
  sender: SenderReceiver;
  receiver: SenderReceiver;
  weight: number;
  expectedDeliveryDate: string;
  shippingCost: string;
  fragile: boolean;
  createdAt?: string; // Optional
  transitDate?: string; // Optional
  deliveredDate?: string; // Optional
  rejectedDate?: string; // Optional
  approvalDate?: string; // Optional
}



interface ContextType {
  trcNum: string;
  setTrcNum: (value: string) => void;
}

const UserDashboard: React.FC = () => {
  const { id: userId } = useParams<{ id: string }>();
  const { data: meData, refetch: meRefetch } = useMeQuery(undefined);
  const { data: parcelData, isLoading: parcelLoading, isError: parcelError, refetch } = useGetParcelByUserQuery(userId);

  const [pending, setPending] = useState<boolean>(false);
  const [approved, setApproved] = useState<boolean>(false);
  const [delivered, setDelivered] = useState<boolean>(false);
  const [track, setTrack] = useState<string>('');
  const [tracking, setTracking] = useState<string>('');
  const { trcNum, setTrcNum } = useContext(contextApi) as ContextType;
  const [trParcel, setTrParcel] = useState<Parcel[]>([]);
  const [all, setAll] = useState<boolean>(false);

  useEffect(() => {
    meRefetch();
    refetch();
    if (parcelData?.data?.length > 0) {
      const filtered = parcelData.data.filter((e: Parcel) => e.trackingNumber === trcNum);
      setTrParcel(filtered);
    }
  }, [trcNum, parcelData, meRefetch, refetch]);

  if (parcelLoading) {
    return <RegLoader />;
  }

  if (parcelError) {
    return <div>Error loading parcels!</div>;
  }

  function formatReadableDate(dateString?: string): string {
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
    <div
      className="bg-[url('https://wallpapers.com/images/featured/cool-trucks-cdvn4ttk7o8geggz.jpg')] min-h-screen max-w-screen bg-center bg-cover bg-no-repeat relative"
    >
      {(meData?.currentUser?.blocked === true || meData?.currentUser?.user?.blocked === true || meData?.currentUser?.isVerified === false || meData?.currentUser?.user?.isVerified === false) && (
        <div className="absolute top-0 left-0 w-full h-full bg-red-200/90 z-100 grid place-content-center">
          <p className="text-white font-extrabold z-200 text-6xl">OOPS YOU'RE BLOCKED OR NOT VERIFIED😔</p>
        </div>
      )}
      {/* overlay */}
      <div className="overlay h-full w-full left-0 top-0 absolute bg-black/50"></div>
      {/* overlay /// */}

      <div className="max-w-screen-xl mx-auto min-h-screen bg-white/20 flex flex-col items-center py-6">
        <p className="z-10 font-bold text-white text-4xl">Sender Dashboard</p>
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
                Pending Parcels: <span className="text-red-500 font-bold">{parcelData?.data?.filter((e: Parcel) => e.currentStatus === 'pending').length}</span>
              </p>
            </div>
            <div className="flex items-center gap-1">
              <MdOutlineApproval />
              <p className="font-light">
                Approved Parcels: <span className="text-blue-600 font-bold">{parcelData?.data?.filter((e: Parcel) => e.currentStatus === 'approved').length}</span>
              </p>
            </div>
            <div className="flex items-center gap-1">
              <AiOutlineDeliveredProcedure />
              <p className="font-light">
                Delivered Parcels: <span className="text-green-600 font-bold">{parcelData?.data?.filter((e: Parcel) => e.currentStatus === 'delivered').length}</span>
              </p>
            </div>
            <div className="flex items-center gap-1">
              <AiOutlineDeliveredProcedure />
              <p className="font-light">
                Rejected Parcels: <span className="text-red-600 font-bold">{parcelData?.data?.filter((e: Parcel) => e.currentStatus === 'rejected').length}</span>
              </p>
            </div>
          </div>
        </div>

        {/* main body */}
        <div className={`flex-col items-start py-8 ${trcNum.length > 0 ? 'hidden' : 'flex'}`}>
          {/* top cards */}
          <div className="flex flex-col md:flex-row w-full items-center justify-center gap-2 md:gap-8 ">
            <div
              onClick={() => {
                setDelivered(false);
                setApproved(false);
                setAll(true);
              }}
              className="md:max-w-[400px] min-w-[200px] flex items-center justify-center px-4 py-2 cursor-pointer rounded-xl z-10 gap-1 bg-white/90 hover:bg-white transition duration-200"
            >
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST3sTKnTAeNrTTuF2lGY7h73ByTICHmlfIXg&s" className="w-[40px] rounded-full" />
              <p className="text-xl font-medium">All</p>
            </div>
            <div
              onClick={() => {
                setPending(false);
                setDelivered(false);
                setApproved(true);
              }}
              className="md:max-w-[400px] min-w-[200px] flex items-center justify-center px-4 py-2 cursor-pointer rounded-xl z-10 gap-1 bg-white/90 hover:bg-white transition duration-200"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz_5B7JbaaxkVB1lJNZ57OQkmz4RYJ_oQntm7Gu8asuUZxu2h9KwbEWJLTf9LTMky4fW4&usqp=CAU"
                className="w-[40px] rounded-full"
              />
              <p className="text-xl font-medium">Approved </p>
            </div>
            <div
              onClick={() => {
                setPending(false);
                setDelivered(true);
                setApproved(false);
                refetch();
              }}
              className="md:max-w-[400px] min-w-[200px] flex items-center justify-center px-4 py-2 cursor-pointer rounded-xl z-10 gap-1 bg-white/90 hover:bg-white transition duration-200"
            >
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR50Ic3NJ6UqVUwxUTQ7iWSbesJzmLoBksCCw&s" className="w-[40px] rounded-full" />
              <p className="text-xl font-medium">Delivered</p>
            </div>
          </div>
          <div className="max-w-screen-lg mx-auto my-4 bg-white z-10 flex items-center justify-between px-4 rounded-sm py-1">
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
          {/* cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center justify-items-center gap-4 py-2">
            {/* card */}
            <Card
              all={all}
              refetch={refetch}
              parcel={parcelData }
              pending={pending}
              delivered={delivered}
              approved={approved}
              meData={meData as MeData}
              track={track}
            />
            {/* card */}
          </div>
          {/* cards/// */}
        </div>
        {/* main body //// */}

        {/* parcel tracking information */}
        <div
          className={`max-w-screen-lg mx-auto bg-white py-24 z-10 ${trcNum.length > 0 ? 'block' : 'hidden'} relative`}
        >
          <IoCloseCircleOutline
            onClick={() => setTrcNum('')}
            className="absolute top-4 right-4 text-4xl text-red-500 cursor-pointer"
          />

          {/* Tracking Header */}
          <div className="max-w-screen-md mx-auto h-[100px] bg-white flex flex-col gap-2 items-center px-4">
            <p className="text-center font-bold text-3xl text-black/80">Tracking: {trcNum}</p>
            <p className="text-shadow-zinc-700">Expected Delivery Date: {trParcel[0]?.expectedDeliveryDate}</p>
          </div>

          {/* Parcel Status */}
          <div className="flex relative gap-12 items-center px-4">
            {/* rejected */}
            <div
              className={`${
                trParcel[0]?.currentStatus === 'rejected' ? 'flex' : 'hidden'
              } absolute top-0 left-0 w-full h-full bg-red-100/90 items-center justify-center gap-4`}
            >
              <div
                className={`text-lg font-bold px-4 py-2 rounded-lg ${
                  trParcel[0]?.currentStatus === 'rejected'
                    ? 'bg-red-500/90'
                    : 'bg-zinc-500'
                } text-white`}
              >
                Rejected
              </div>
              <p className="font-bold text-xl">{trParcel[0]?.rejectedDate}</p>
            </div>
            {/* Pending */}
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex gap-1 items-center">
                <div
                  className={`text-lg font-bold px-4 py-2 rounded-lg ${
                    trParcel[0]?.currentStatus === 'pending'
                      ? 'bg-yellow-500/90'
                      : 'bg-zinc-500'
                  } text-white`}
                >
                  Pending
                </div>
                <IoIosArrowRoundForward className="text-4xl text-gray-500" />
              </div>
              <p className="text-sm max-w-[150px] font-light italic">
                {trParcel[0]?.createdAt ? formatReadableDate(trParcel[0]?.createdAt) : ''}
              </p>
            </div>

            {/* Approved */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center">
                <div
                  className={`text-lg font-bold px-4 py-2 rounded-lg ${
                    trParcel[0]?.currentStatus === 'approved'
                      ? 'bg-blue-500/90'
                      : 'bg-zinc-500'
                  } text-white`}
                >
                  Approved
                </div>
                <IoIosArrowRoundForward className="text-4xl text-gray-500" />
              </div>
              <p className="text-sm max-w-[150px] font-light italic">
                {trParcel[0]?.approvalDate ? formatReadableDate(trParcel[0]?.approvalDate) : ''}
              </p>
            </div>

            {/* In Transit */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center">
                <div
                  className={`text-lg font-bold px-4 py-2 rounded-lg ${
                    trParcel[0]?.currentStatus === 'in_transit'
                      ? 'bg-green-500/90'
                      : 'bg-zinc-500'
                  } text-white`}
                >
                  In Route
                </div>
                <IoIosArrowRoundForward className="text-4xl text-gray-500" />
              </div>
              <p className="text-sm max-w-[150px] font-light italic">
                {trParcel[0]?.transitDate ? formatReadableDate(trParcel[0]?.transitDate) : ''}
              </p>
            </div>

            {/* Delivered */}
            <div className="flex flex-col items-center gap-1">
              <div
                className={`text-lg font-bold px-4 py-2 rounded-lg ${
                  trParcel[0]?.currentStatus === 'delivered'
                    ? 'bg-purple-500/90'
                    : 'bg-zinc-500'
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
