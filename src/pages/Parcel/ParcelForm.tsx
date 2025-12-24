import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../component/Navbar';
import { useCreateParcelMutation } from '../../redux/slices/parcelApi';
import RegLoader from '../../utils/RegLoader';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { contextApi } from '../../ContextProvider';
import Swal from 'sweetalert2';
import { useMeQuery } from '../../redux/slices/authApi';
import { Link } from 'react-router-dom';
interface ErrorData {
  message?: string;
}
const showToast = () => {
  Toastify({
    text: "Parcel sent successfully 😍😍",
    duration: 3000,
    gravity: "top",
    position: "center",
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    stopOnFocus: true,
  }).showToast();
}

const ParcelForm: React.FC = () => {
  const [createParcel, { isLoading }] = useCreateParcelMutation();
  const { data: meData, refetch: meRefetch } = useMeQuery(undefined);
  const { userId } = useContext(contextApi) ?? {};
  const [senderName, setSenderName] = useState<string>('');
  const [senderEmail, setSenderEmail] = useState<string>('');
  const [senderPhone, setSenderPhone] = useState<string>('');
  const [senderAddress, setSenderAddress] = useState<string>('');
  const [receiverName, setReceiverName] = useState<string>('');
  const [receiverEmail, setReceiverEmail] = useState<string>('');
  const [receiverPhone, setReceiverPhone] = useState<string>('');
  const [receiverAddress, setReceiverAddress] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [fragile, setFragile] = useState<string>('Fragile?');
  const [weight, setWeight] = useState<string>('');


  useEffect(() => {
    meRefetch();
  }, [ meRefetch, meData]);
useEffect(() => {
setSenderName(meData?.currentUser?.name)
setSenderEmail(meData?.currentUser?.email)
},[createParcel])
  if (isLoading) {
    return <RegLoader />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parcel = {
      userId,
      receiverEmail,
      sender: {
        name: senderName,
        phone: senderPhone,
        email: senderEmail,
        address: senderAddress,
      },
      receiver: {
        name: receiverName,
        phone: receiverPhone,
        email: receiverEmail,
        address: receiverAddress,
      },
      weight: weight + "KG",
      contentDescription: description,
      fragile: fragile === "yes" ? true : false,
    };

    try {
      const res = await createParcel(parcel);

      if (res?.error) {
        if ('data' in res.error) {
          const errorData = res.error.data as ErrorData;
          if (errorData.message === 'Receiver does not exist on our database') {
            Swal.fire("Oops! Wrong Receiver Email");
            return;
          }

          console.log('Error:', errorData.message);
        } else {

          console.error("SerializedError", res.error);
          Swal.fire("Something went wrong!");
        }
      } else {
        showToast();
      }
    } catch (error: any) {
      console.error("Something went wrong", error);
      Swal.fire("Something went wrong!");
    }

    // RESET FORM
    setWeight('');
    setFragile('');
    setDescription('');
    setReceiverAddress('');
    setReceiverPhone('');
    setReceiverName('');
    setReceiverEmail('');
    setSenderAddress('');
    setSenderEmail('');
    setSenderPhone('');
    setSenderName('');
  };

  return (
    <div className="min-w-screen relative">
      {(meData?.currentUser?.blocked || !meData?.currentUser?.isVerified) && (
        <div className="absolute top-0 left-0 w-full h-full bg-red-500/95 z-100 grid place-content-center backdrop-blur-sm">
          <p className="text-white font-extrabold z-200 text-6xl text-center">{meData?.currentUser?.blocked ? "Your account has been blocked"
            : "Your account is not verified yet"}</p>
          <p className='text-white font-semibold text-xl text-shadow-2xs text-center  py-4'>{!meData?.currentUser?.blocked ? "Please wait for an admin to review your account"
            : "Please wait for admin to unblock you"}</p>
          <Link className='text-xl text-center' to={'/'}>Return to home</Link>
        </div>
      )}
      {
        meData?.currentUser?.role !== "sender" && <div className="absolute top-0 left-0 w-full h-full bg-red-500/95 z-100 grid place-content-center backdrop-blur-sm"><p className='text-white font-extrabold text-6xl text-shadow-2xs text-center py-4'>Pleae register as a sender to send parcel</p>
          <Link className='text-xl  text-center' to={'/'}>Return to home</Link></div>
      }

      <div className="bg-[url('https://cdn.prod.website-files.com/672544f2398bd9ac165adaa2/673a237aaab857de30d1cb01_trucks-highway-mountain-sunset%20Large.jpeg')] h-[300px] bg-cover bg-center">
        <div className="absolute top-0 left-o h-[300px] w-full bg-black/60"></div>
        <Navbar />
        <div className="flex h-24 flex-col items-center justify-center gap-4">
          <p className="text-5xl md:text-8xl text-white font-extrabold text-center z-10">Send Parcel</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-screen-lg mx-auto py-16 flex flex-col gap-4 items-center justify-center bg-white shadow-lg px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">

          {/* Sender information */}
          <div className="gap-2 flex flex-col">
            <label className="text-2xl text-black/70 font-semibold text-center">Sender Information</label>
            <input value={senderName} onChange={(e) => setSenderName(e.target.value)} required className="border-none py-4 px-4 text-lg text-black/70 font-medium focus:outline-none focus:rounded-lg bg-zinc-100" placeholder="Sender Name" />
            <input value={senderPhone} onChange={(e) => setSenderPhone(e.target.value)} required className="border-none py-4 px-4 text-lg text-black/70 font-medium focus:outline-none focus:rounded-lg bg-zinc-100" placeholder="Phone Number" />
            <input value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} required className="border-none py-4 px-4 text-lg text-black/70 font-medium focus:outline-none focus:rounded-lg bg-zinc-100" placeholder="Email" />
            <input value={senderAddress} onChange={(e) => setSenderAddress(e.target.value)} required className="border-none py-4 px-4 text-lg text-black/70 font-medium focus:outline-none focus:rounded-lg bg-zinc-100" placeholder="Address" />
          </div>

          {/* Receiver information */}
          <div className="gap-2 flex flex-col">
            <label className="text-2xl text-black/70 font-semibold text-center">Receiver Information</label>
            <input type="text" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} required className="border-none py-4 px-4 text-lg text-black/70 font-medium focus:outline-none focus:rounded-lg bg-zinc-100" placeholder="Receiver Name" />
            <input type="text" value={receiverPhone} onChange={(e) => setReceiverPhone(e.target.value)} required className="border-none py-4 px-4 text-lg text-black/70 font-medium focus:outline-none focus:rounded-lg bg-zinc-100" placeholder="Phone Number" />
            <input type="text" value={receiverEmail} onChange={(e) => setReceiverEmail(e.target.value)} required className="border-none py-4 px-4 text-lg text-black/70 font-medium focus:outline-none focus:rounded-lg bg-zinc-100" placeholder="Email" />
            <input type="text" value={receiverAddress} onChange={(e) => setReceiverAddress(e.target.value)} required className="border-none py-4 px-4 text-lg text-black/70 font-medium focus:outline-none focus:rounded-lg bg-zinc-100" placeholder="Address" />
          </div>
        </div>

        {/* Description */}
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="border-none py-4 px-4 text-lg text-black/70 font-medium focus:outline-none focus:rounded-lg bg-zinc-100 w-full" placeholder="Content Description" />

        {/* Weight, Fragile */}
        <div className="flex items-center gap-4 w-full">
          <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} required className="border-none py-4 px-4 text-lg text-black/70 font-medium w-full focus:outline-none focus:rounded-lg bg-zinc-100" placeholder="Weight (KG)" />
          <select value={fragile} onChange={(e) => setFragile(e.target.value)} required className="border-none py-4 px-4 text-lg text-black/40 font-medium focus:outline-none focus:rounded-lg bg-zinc-100 w-full">
            <option className="border-none" value="">Fragile?</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <button className="w-full px-2 py-4 bg-[var(--primary-color)] text-white font-semibold text-xl hover:bg-red-500 transition duration-300 cursor-pointer" type="submit">
          Send Parcel
        </button>
      </form>
    </div>
  );
};

export default ParcelForm;
