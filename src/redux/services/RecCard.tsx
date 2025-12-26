import { useContext, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbAddressBookOff } from "react-icons/tb";
import Swal from "sweetalert2";
import { useApproveParcelMutation, useCancelParcelMutation, useGetParcelByUserQuery, useGetReceiverParcelQuery } from "../slices/parcelApi";
import { contextApi } from "../../ContextProvider";
import { IoCopyOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const RecCard = ({ parcel, meData, parcelRefetch, sent, incoming, status }) => {
  const { data: receiverData, isError, refetch: receiverRefetch } = useGetReceiverParcelQuery(meData?.currentUser?.email)

  const [filteredParcel, setFilteredParcel] = useState([])
  const { setTrcNum } = useContext(contextApi);
  const [deleteItem, { isLoading }] = useCancelParcelMutation();
  const [approveParcel] = useApproveParcelMutation()

  useEffect(() => {
    const filteredParcels = parcel?.data?.filter((e) => {
      if (status === "pending") {
        return e.currentStatus === "pending";
      }

      if (status === "rejected") {
        return e.currentStatus === "rejected";
      } if (status === "approved") {
        return e.currentStatus === "approved";
      }
      if (status === "delivered") {
        return e.currentStatus === "delivered";
      }
      if (status === "inRoute") {
        return e.currentStatus === "in_transit";
      }

      if (status === "all") {
        return true
      }
   
      return true
    });
    setFilteredParcel(filteredParcels);
  }, [status, incoming]);
// console.log(filteredParcel)
  const receivedBtn = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "Reject this parcel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Received!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const formatted = new Date().toISOString();
          await approveParcel({
            "parcelId": id,
            "currentStatus": "delivered",
            "deliveredDate": formatted
          })
          parcelRefetch()
          refetch()
        } catch (error) {
          console.log(error)
        }
        Swal.fire({
          text: "Parcel Successfully Approved 😍",
          icon: "success"
        });
      }
    });
  }


const copyToClipboard = async(text:string) => {
  try{
   await navigator.clipboard.writeText(text)
   Swal.fire({
  position: "top-center",
  icon: "success",
  title: "TrackingID saved to clipboard",
  showConfirmButton: false,
  timer: 500
});
  }catch(err) {
    alert("Failed to copy ❌")
  }
}

  return (

  parcel?.data[0]?.length === 0 ? (<p className="text-white z-10 font-bold text-2xl px-4">No Parcel to show 😔</p>) : (
    filteredParcel?.map(e => <div key={e._id} className="max-w-[450px] bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col gap-4 z-10">
      
      {/* Status Section */}
      <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
         
          {
            e.currentStatus === "in_transit" &&  <img
            className="w-6 h-6"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaZsvdfV87Irme6qx1RVc45mdmEa2FVof7dw&s"
            alt="Pending"
          />
          }
              {
            e.currentStatus === "pending" && <img
            className="w-6 h-6"
            src="https://cdn-icons-png.freepik.com/512/11412/11412573.png"
            alt="Pending"
          />
          }
           
              {
            e.currentStatus === "approved" && <img
            className="w-6 h-6"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY2y0LpTUxZxVe9y-HRXzYUr-z8axC-iENgg&s"
            alt="Pending"
          />
          }
          <span className="px-3 py-1 text-sm font-semibold text-amber-700 bg-amber-100 rounded-full">
            {e.currentStatus}
          </span>
        </div>

        <div className="flex gap-1 items-center">
          <p className="text-sm font-medium cursor-pointer text-gray-700 hover:text-green-600 transition">
            <span className="text-gray-400">Tracking Number:</span>{" "}
            {e.trackingNumber}
          </p>
          <IoCopyOutline
            onClick={() => copyToClipboard(e.trackingNumber)}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Sender Info */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-1">
        <p className="text-sm font-semibold text-gray-500 mb-2">
          Sender Information
        </p>

        <p className="text-sm font-medium">
          <span className="text-gray-400">Name:</span> {e.sender.name}
        </p>
        <p className="text-sm font-medium">
          <span className="text-gray-400">Email:</span> {e.sender.email}
        </p>
        <p className="text-sm font-medium">
          <span className="text-gray-400">Phone:</span>{e.sender.phone}</p>
        <p className="text-sm font-medium">
          <span className="text-gray-400">Address:</span> {e.sender.address}
        </p>
      </div>

      {/* Parcel Info */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-1">
        <p className="text-sm font-semibold text-gray-500 mb-2">
          Parcel Information
        </p>

        <p className="text-sm font-medium">
          <span className="text-gray-400">Description:</span>{e.contentDescription}
        </p>
        <p className="text-sm font-medium">
          <span className="text-gray-400">Weight:</span> {e.weight}
        </p>

        <div className="flex items-center gap-2 text-sm font-semibold ">
          <span className="text-black/40">Fragile:</span>
          <span className={`${e.fragile?"bg-red-500":"bg-green-500"} px-2 py-0.5 rounded-full text-white`}>{e.fragile?"Yes":"No"}</span>
        </div>
      </div>
      <Link to={`/dashboard/more_info/${e._id}`} className="text-center bg-green-200 py-1 rounded-md font-semibold cursor-pointer">More Information</Link>
    </div>)
  )



  )

};

export default RecCard;
