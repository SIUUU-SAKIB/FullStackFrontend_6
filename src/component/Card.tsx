import { useContext, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbAddressBookOff } from "react-icons/tb";
import Swal from "sweetalert2";
import { useApproveParcelMutation, useCancelParcelMutation, useGetReceiverParcelQuery } from "../redux/slices/parcelApi";
import { contextApi } from "../ContextProvider";

const Card = ({ parcel, meData, parcelRefetch, sent, incoming, status }) => {

  const { data: receiverData, isError, refetch } = useGetReceiverParcelQuery(meData?.currentUser?.email || meData?.currentUser?.user?.email)
  const [receiverParcels, setReceiverParcels] = useState(receiverData?.data)
  const { setTrcNum } = useContext(contextApi);
  const [allParcel, setAllParcel] = useState([]);
  const [deleteItem, { isLoading }] = useCancelParcelMutation();

const [approveParcel] = useApproveParcelMutation()
  useEffect(() => {

    const filteredParcels = parcel.data[0].filter((e) => {
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
      if (sent === true) {
        return true
      }
      return true;
    });
    setAllParcel(filteredParcels);
  }, [status, sent]);
  useEffect(() => {
    const filteredParcels = receiverData?.data?.filter((e) => {
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
      if (incoming) {
        return true
      }
      return true
    });
    setReceiverParcels(filteredParcels);
  }, [status, incoming]);

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

  const cancelBtn = (trackingNumber) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You really want to cancel this parcel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteItem({ trackingNumber });
          parcelRefetch();
          refetch();
          Swal.fire({
            title: "Cancelled!",
            text: "Parcel has been deleted",
            icon: "success",
          });
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };


  // const getUserRole = () => {
  //   if (!meData?.currentUser) return '';

  //   if (meData.currentUser.user) {
  //     return meData.currentUser.user.role;
  //   } else {
  //     return meData.currentUser.role;
  //   }
  // };

  // const userRole = getUserRole();
  if (sent === true) {
    return (
      <>
        {allParcel.length > 0 ? (
          allParcel.map((e) => (
            <div
              key={e._id}
              className={`${e.currentStatus === "delivered" ? "bg-gray-100" : "bg-white"
                } max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200 z-10 relative transition-all duration-300 hover:shadow-xl hover:bg-gray-50`}
            >
              <div className="flex flex-col items-start justify-center py-4">
                <div className="flex gap-2 items-center mb-2">
                  {e.currentStatus === "approved" && (
                    <div className="flex items-center">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz_5B7JbaaxkVB1lJNZ57OQkmz4RYJ_oQntm7Gu8asuUZxu2h9KwbEWJLTf9LTMky4fW4&usqp=CAU"
                        className="w-8 h-8 rounded-full"
                        alt="Approved Status"
                      />
                      <p className="text-sm uppercase text-blue-600 font-semibold">{e.currentStatus}</p>
                    </div>
                  )}
                  {e.currentStatus === "pending" && (
                    <div className="flex items-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/11412/11412573.png"
                        className="w-8 h-8 rounded-full object-contain"
                        alt="Pending Status"
                      />
                      <p className="text-sm uppercase text-orange-500 font-semibold">{e.currentStatus}</p>
                    </div>
                  )}
                  {e.currentStatus === "delivered" && (
                    <div className="flex items-center">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR50Ic3NJ6UqVUwxUTQ7iWSbesJzmLoBksCCw&s"
                        className="w-8 h-8 rounded-full"
                        alt="Delivered Status"
                      />
                      <p className="text-sm uppercase text-green-600 font-semibold">{e.currentStatus}</p>
                    </div>
                  )}
                  {e.currentStatus === "rejected" && (
                    <div className="flex items-center">
                      <img
                        src="https://media.istockphoto.com/id/1151657492/vector/vector-red-prohibition-sign-no-symbol-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=UhU_DVZGc-HnEeMayjUllgdrhYdvfUpDYPRaxFaHwmk="
                        className="w-8 h-8 rounded-full"
                        alt="Rejected Status"
                      />
                      <p className="text-sm uppercase text-red-600 font-semibold">{e.currentStatus}</p>
                    </div>
                  )}
                </div>

                <p className="text-center font-semibold">
                  Tracking ID:{" "}
                  <span
                    onClick={() => setTrcNum(e.trackingNumber)}
                    className="text-indigo-600 cursor-pointer hover:underline"
                  >
                    {e.trackingNumber}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                  <h2 className="text-sm font-semibold text-gray-700 mb-2">Sender</h2>
                  <div className="flex gap-2 items-center mb-1">
                    <CgProfile />
                    <p className="text-gray-600 font-regular text-sm">{e.sender.name}</p>
                  </div>
                  <div className="flex items-start gap-2 mb-1">
                    <MdOutlineMailOutline />
                    <p className="text-gray-600 font-regular text-sm break-all">{e.sender.email}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <FaPhoneAlt />
                    <p className="text-gray-600">
                      <span className="text-gray-600 font-regular text-sm">Phone:</span> {e.sender.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <TbAddressBookOff />
                    <p className="text-gray-600 font-regular text-sm">{e.sender.address}</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                  <h2 className="text-sm font-semibold text-gray-700 mb-2">Receiver</h2>
                  <div className="flex gap-2 items-center mb-1">
                    <CgProfile />
                    <p className="text-gray-600 font-regular text-sm">{e.receiver.name}</p>
                  </div>
                  <div className="flex items-start gap-2 mb-1">
                    <MdOutlineMailOutline />
                    <p className="text-gray-600 font-regular text-sm">{e.receiver.email}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <FaPhoneAlt />
                    <p className="text-gray-600">
                      <span className="text-gray-600 font-regular text-sm">Phone:</span> {e.receiver.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <TbAddressBookOff />
                    <p className="text-gray-600 font-regular text-sm">{e.receiver.address}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mt-2">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Parcel Information</h2>
                <p className="text-gray-600">
                  <span className="font-medium">Description:</span> {e.description || "No description available"}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Weight:</span> {e.weight} kg
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Expected Date:</span> {e.expectedDeliveryDate || "N/A"}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Shipping Cost:</span> {e.shippingCost ? `$${e.shippingCost}` : "N/A"}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Fragile:</span> {e.fragile ? "Yes" : "No"}
                </p>
              </div>

              {(e.currentStatus === "pending" || e.currentStatus === "delivered" || e.currentStatus === "rejected") && (
                <button
                  onClick={() => cancelBtn(e.trackingNumber)}
                  disabled={isLoading}
                  className="w-full bg-red-500 py-2 text-white font-semibold rounded-lg mt-4 hover:bg-red-600 transition duration-300"
                >
                  {e.currentStatus === "pending" || e.currentStatus === "rejected" ? "Cancel Parcel" : "Remove Parcel"}
                </button>
              )}
            </div>
          ))
        ) : (
          <h1 className="text-xl font-bold text-center text-white z-10 w-full">
            No {status} parcels 😔
          </h1>
        )}
      </>
    );
  } else if (incoming) {
    return (
      <>
        {receiverParcels?.length > 0 ? (
          receiverParcels?.map((e) => (
            <div
              key={e._id}
              className={`${e.currentStatus === "delivered" ? "bg-gray-100" : "bg-white"
                } max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200 z-10 relative transition-all duration-300 hover:shadow-xl hover:bg-gray-50`}
            >
              <div className="flex flex-col items-start justify-center py-4">
                <div className="flex gap-2 items-center mb-2">
                  {e.currentStatus === "approved" && (
                    <div className="flex items-center">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz_5B7JbaaxkVB1lJNZ57OQkmz4RYJ_oQntm7Gu8asuUZxu2h9KwbEWJLTf9LTMky4fW4&usqp=CAU"
                        className="w-8 h-8 rounded-full"
                        alt="Approved Status"
                      />
                      <p className="text-sm uppercase text-blue-600 font-semibold">{e.currentStatus}</p>
                    </div>
                  )}
                  {e.currentStatus === "pending" && (
                    <div className="flex items-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/11412/11412573.png"
                        className="w-8 h-8 rounded-full object-contain"
                        alt="Pending Status"
                      />
                      <p className="text-sm uppercase text-orange-500 font-semibold">{e.currentStatus}</p>
                    </div>
                  )}
                  {e.currentStatus === "delivered" && (
                    <div className="flex items-center">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR50Ic3NJ6UqVUwxUTQ7iWSbesJzmLoBksCCw&s"
                        className="w-8 h-8 rounded-full"
                        alt="Delivered Status"
                      />
                      <p className="text-sm uppercase text-green-600 font-semibold">{e.currentStatus}</p>
                    </div>
                  )}
                  {e.currentStatus === "rejected" && (
                    <div className="flex items-center">
                      <img
                        src="https://media.istockphoto.com/id/1151657492/vector/vector-red-prohibition-sign-no-symbol-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=UhU_DVZGc-HnEeMayjUllgdrhYdvfUpDYPRaxFaHwmk="
                        className="w-8 h-8 rounded-full"
                        alt="Rejected Status"
                      />
                      <p className="text-sm uppercase text-red-600 font-semibold">{e.currentStatus}</p>
                    </div>
                  )}
                </div>

                <p className="text-center font-semibold">
                  Tracking ID:{" "}
                  <span
                    onClick={() => setTrcNum(e.trackingNumber)}
                    className="text-indigo-600 cursor-pointer hover:underline"
                  >
                    {e.trackingNumber}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                  <h2 className="text-sm font-semibold text-gray-700 mb-2">Sender</h2>
                  <div className="flex gap-2 items-center mb-1">
                    <CgProfile />
                    <p className="text-gray-600 font-regular text-sm">{e.sender.name}</p>
                  </div>
                  <div className="flex items-start gap-2 mb-1">
                    <MdOutlineMailOutline />
                    <p className="text-gray-600 font-regular text-sm break-all">{e.sender.email}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <FaPhoneAlt />
                    <p className="text-gray-600">
                      <span className="text-gray-600 font-regular text-sm">Phone:</span> {e.sender.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <TbAddressBookOff />
                    <p className="text-gray-600 font-regular text-sm">{e.sender.address}</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                  <h2 className="text-sm font-semibold text-gray-700 mb-2">Receiver</h2>
                  <div className="flex gap-2 items-center mb-1">
                    <CgProfile />
                    <p className="text-gray-600 font-regular text-sm">{e.receiver.name}</p>
                  </div>
                  <div className="flex items-start gap-2 mb-1">
                    <MdOutlineMailOutline />
                    <p className="text-gray-600 font-regular text-sm">{e.receiver.email}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <FaPhoneAlt />
                    <p className="text-gray-600">
                      <span className="text-gray-600 font-regular text-sm">Phone:</span> {e.receiver.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <TbAddressBookOff />
                    <p className="text-gray-600 font-regular text-sm">{e.receiver.address}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mt-2">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Parcel Information</h2>
                <p className="text-gray-600">
                  <span className="font-medium">Description:</span> {e.description || "No description available"}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Weight:</span> {e.weight} kg
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Expected Date:</span> {e.expectedDeliveryDate || "N/A"}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Shipping Cost:</span> {e.shippingCost ? `$${e.shippingCost}` : "N/A"}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Fragile:</span> {e.fragile ? "Yes" : "No"}
                </p>
              </div>

              {(e.currentStatus === "pending" || e.currentStatus === "delivered") && (
                <button
                  onClick={() => cancelBtn(e.trackingNumber)}
                  disabled={isLoading}
                  className="w-full bg-red-500 py-2 text-white font-semibold rounded-lg mt-4 hover:bg-red-600 transition duration-300"
                >
                  {e.currentStatus === "pending" ? "Cancel Parcel" : "Remove Parcel"}
                </button>
              )}
              {e.currentStatus === "delivered"|| e.currentStatus === "in_transit"  && <button
                onClick={() => receivedBtn(e._id)}
                disabled={isLoading}
                className="w-full bg-red-500 py-2 text-white font-semibold rounded-lg mt-4 hover:bg-red-600 transition duration-300"
              >
                Received
              </button>}
            </div>
          ))
        ) : (
          <h1 className="text-xl font-bold text-center text-white z-10 w-full">
            No {status} parcels 😔
          </h1>
        )}
      </>
    );
  }

};

export default Card;
