import { format, parseISO } from "date-fns";
import { useApproveParcelMutation, useDeleteParcelMutation } from "../redux/slices/parcelApi";
import { useState } from "react";
import Swal from "sweetalert2";


interface Person {
    name: string;
    email: string;
    phone: string;
}

interface Parcel {
    _id: string;
    sender: Person;
    receiver: Person;
    contentDescription: string;
    fragile: boolean;
    weight: number;
    currentStatus: "pending" | "approved" | "rejected" | "in_transit" | "delivered";
    createdAt: string;
}

// Props type
interface ParcelCardProps {
    parcel?: Parcel;
    parcelRefetch: () => void;
}



function ParcelCard({ parcel, parcelRefetch }: ParcelCardProps) {
    if (!parcel) return null;
    const [approveParcel] = useApproveParcelMutation()
    const [deleteParcel] = useDeleteParcelMutation()
    const [deliveryDate, setDeliveryDate] = useState('')
    const [shippingCost, setShippingCost] = useState('')




    const approveBtn = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Make this parcel approved?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const formatted = new Date().toISOString();
                    const shippingCostNumber = +shippingCost;
                    if (isNaN(shippingCostNumber)) {
                        Swal.fire({
                            text: "Please enter a valid shipping cost.",
                            icon: "error"
                        });
                        return;
                    }
                    if (!deliveryDate) {
                        Swal.fire({
                            text: "Please provide a valid delivery date.",
                            icon: "error"
                        });
                        return;
                    }
                    const res = await approveParcel({
                        "parcelId": id,
                        "currentStatus": "approved",
                        "shippingCost": shippingCostNumber,
                        "expectedDeliveryDate": deliveryDate,
                        "approvalDate": formatted
                    });

                    setDeliveryDate('');
                    setShippingCost('');
                    parcelRefetch();

                    console.log(res);
                    Swal.fire({
                        text: "Parcel Successfully Approved 😍",
                        icon: "success"
                    });
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        text: "An error occurred while approving the parcel.",
                        icon: "error"
                    });
                }
            }
        });
    };

    const rejectBtn = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Reject this parcel?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const formatted = new Date().toISOString();
                    await approveParcel({
                        "parcelId": id,
                        "currentStatus": "rejected",
                        "rejectedDate": formatted
                    })
                    parcelRefetch()
                } catch (error) {
                    console.log(error)
                }
                Swal.fire({
                    text: "Parcel Successfully Approved 😍",
                    icon: "success"
                });
            }
        });
    };
    const deleteBtn = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You really want to delete this parcel?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteParcel({
                        "id": id
                    })
                    parcelRefetch()
                } catch (error) {
                    console.log(error)
                }
                Swal.fire({
                    text: "Parcel Deleted Succesfully 😍",
                    icon: "success"
                });
            }
        });
    }
    const inRouteBtn = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Upadate status to In Route?!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const formatted = new Date().toISOString();
                    const res = await approveParcel({
                        "parcelId": id,
                        "currentStatus": "in_transit",
                        "transitDate": formatted
                    })
                    setDeliveryDate('')
                    setShippingCost('')
                    parcelRefetch()
                    console.log(res)
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
    const deliveredBtn = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Make this parcel delivered?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve!"
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
                } catch (error) {
                    console.log(error)
                }
                Swal.fire({
                    text: "Parcel Successfully Delivered 😍",
                    icon: "success"
                });
            }
        });
    }
    const approveAgainBtn = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Make this parcel approved again?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve again!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const formatted = new Date().toISOString();
                    const time = "10:30";
                    const isoDate = new Date(`${deliveryDate}T${time}:00Z`).toISOString();
                    await approveParcel({
                        "parcelId": id,
                        "currentStatus": "approved",
                        "shippingCost": +shippingCost,
                        "expectedDeliveryDate": isoDate,
                        "approvalDate": formatted
                    })
                    setDeliveryDate('')
                    setShippingCost('')
                    parcelRefetch()
                  
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
    return (
        <div
            key={parcel._id}
            className="flex flex-col gap-3 bg-white rounded-xl shadow-md hover:shadow-lg p-4 border border-gray-100 transition duration-200 relative text-sm"
        >
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-base font-semibold text-gray-800">Parcel</h2>
                <p className="text-xs text-gray-500">
                    {format(parseISO(parcel.createdAt), "dd MMM yyyy, hh:mm a")}
                </p>
            </div>

            {/* Sender & Receiver side by side */}
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-green-50 p-2 rounded-lg border border-green-100">
                    <p className="font-semibold text-green-700 text-xs mb-1">Sender</p>
                    <p className="truncate">{parcel.sender.name}</p>
                    <p className="truncate text-gray-500">{parcel.sender.email}</p>
                    <p className="truncate text-gray-500">{parcel.sender.phone}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
                    <p className="font-semibold text-blue-700 text-xs mb-1">Receiver</p>
                    <p className="truncate">{parcel.receiver.name}</p>
                    <p className="truncate text-gray-500">{parcel.receiver.email}</p>
                    <p className="truncate text-gray-500">{parcel.receiver.phone}</p>
                </div>
            </div>

            {/* Content */}
            <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
                <p className="font-semibold text-amber-700 text-xs">Content</p>
                <p className="text-gray-800">{parcel.contentDescription}</p>
                <p className="font-medium text-xs mt-1">
                    Fragile:{" "}
                    <span
                        className={`${parcel.fragile ? "text-red-500 font-semibold" : "text-gray-600"
                            }`}
                    >
                        {parcel.fragile ? "Yes" : "No"}
                    </span>
                </p>

                <p className="font-medium text-xs mt-1">
                    Weight:{" "}
                    <span
                        className={`${parcel.fragile ? "text-red-500 font-semibold" : "text-gray-600"
                            }`}
                    >
                        {parcel.weight}
                    </span>

                </p>
            </div>

            {/* Status */}
            <p
                className={`px-2 py-1 rounded-md text-center text-xs font-bold uppercase 
    ${parcel.currentStatus === "pending" ? "bg-fuchsia-100 text-fuchsia-700" :
                        parcel.currentStatus === "delivered" ? "bg-green-100 text-green-700" :
                            parcel.currentStatus === "rejected" ? "bg-red-100 text-red-700" :
                                parcel.currentStatus === "in_transit" ? "bg-blue-100 text-blue-700" :
                                    parcel.currentStatus === "approved" ? "bg-orange-100 text-orange-700" :
                                        "bg-gray-100 text-gray-600"}`}
            >
                {parcel.currentStatus === "pending" ? "Pending" :
                    parcel.currentStatus === "approved" ? "Approved" :
                        parcel.currentStatus === "rejected" ? "Rejected" :
                            parcel.currentStatus === "in_transit" ? "In Transit" :
                                parcel.currentStatus === "delivered" ? "Delivered" :
                                    "Unknown"}
            </p>


            {/* Action Buttons */}
            <div className="flex gap-2 mt-1">
                {parcel.currentStatus === "pending" && (

                    <button disabled={shippingCost === '' || deliveryDate === ''}
                        onClick={() => approveBtn(parcel._id)}
                        className={`${shippingCost === '' || deliveryDate === '' ? "cursor-not-allowed" : "cursor-pointer"} flex-1 bg-green-500 text-white py-1.5 rounded-lg text-xs font-semibold hover:bg-green-600 transition `}
                    >
                        Approve
                    </button>
                )}
                {parcel.currentStatus === "approved" && (
                    <button
                        onClick={() => inRouteBtn(parcel._id)}
                        className="flex-1 bg-blue-500 text-white py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-600 transition cursor-pointer"
                    >
                        Make in Route
                    </button>
                )}
                {parcel.currentStatus === "delivered" || parcel.currentStatus === "rejected" && (
                    <button
                        onClick={() => deleteBtn(parcel._id)}
                        className=
                        {`${parcel.currentStatus === "rejected" ? "w-1/2" : "w-full"} bg-red-500 text-white py-1.5 rounded-lg text-xs font-medium hover:bg-red-600 transition cursor-pointer`}
                    >
                        Delete
                    </button>
                )}

                {parcel.currentStatus === "in_transit" && (
                    <button
                        onClick={() => deliveredBtn(parcel._id)}
                        className="flex-1 bg-cyan-500 text-white py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-600 transition cursor-pointer"
                    >
                        Delivered?
                    </button>
                )}

                {parcel.currentStatus !== "delivered" && parcel.currentStatus !== "rejected" && (
                    <button
                        onClick={() => rejectBtn(parcel._id)}
                        className="flex-1 bg-red-500 text-white py-1.5 rounded-lg text-xs font-medium hover:bg-red-600 transition cursor-pointer"
                    >
                        Reject
                    </button>
                )}

                {parcel.currentStatus == "rejected" && (
                    <button disabled={shippingCost === '' || deliveryDate === ''}
                        onClick={() => approveAgainBtn(parcel._id)}
                        className={`${shippingCost === '' || deliveryDate === '' ? "cursor-not-allowed" : "cursor-pointer"} flex-1 bg-green-500 text-white py-1.5 rounded-lg text-xs font-medium hover:bg-green-600 transition cursor-pointer`}
                    >
                        Approve Again?
                    </button>
                )}
            </div>
            <form className={`${parcel.currentStatus === "pending" || parcel.currentStatus === "rejected" ? "flex" : "hidden"} w-full gap-2`}>
                <div className="flex w-1/2 flex-col gap-1 items-start ">
                    <p className="italic">Shipping Cost</p>
                    <input onChange={(e) => setShippingCost(e.target.value)} value={shippingCost} required className=' w-full border-none py-2 px-2 text-md text-black font-medium 
             focus:outline-none focus:rounded-lg bg-zinc-100' placeholder='Shipping Cost' />
                </div>
                <div className="flex flex-col w-1/2 items-start">
                    <p className="italic">Estimated Delivery date</p>
                    <input onChange={(e) => setDeliveryDate(e.target.value)} value={deliveryDate} type="date" required className='border-none py-2 px-2 w-full text-md text-black/70 font-regular cursor-pointer
             focus:outline-none focus:rounded-lg bg-zinc-100' placeholder='Estimated Delivery Date' />
                </div>

            </form>
        </div>
    );
}

export default ParcelCard;
