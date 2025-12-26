import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApproveParcelMutation, useCancelParcelMutation, useGetParcelByIdQuery, useGetParcelByUserQuery } from '../redux/slices/parcelApi'
import { format } from "date-fns"
import Swal from 'sweetalert2'
import { useMeQuery } from '../redux/slices/authApi'
import Navbar from "../component/Navbar"
const MoreInfo = () => {
    const { id } = useParams()
    const { data: meData, refetch: meRefetch } = useMeQuery(undefined);
    const [approveParcel] = useApproveParcelMutation()
    const { data: parcelData, isLoading: parcelLoading, isError: parcelError, refetch: parcelRefetch } = useGetParcelByUserQuery(meData?.currentUser?._id);
    const { data, refetch } = useGetParcelByIdQuery(id)
    const [deleteItem, { isLoading }] = useCancelParcelMutation();
    const [parcel, setParcel] = useState<any>(null)
    const navigate = useNavigate()
    useEffect(() => {
        if (data?.data) setParcel(data.data)
    }, [data])
    console.log(data)
    const statusSteps = [
        { key: "pending", label: "Pending" },
        { key: "approved", label: "Approved" },
        { key: "in_transit", label: "In Route" },
        { key: "delivered", label: "Delivered" },
        { key: "accepted", label: "Accepted" },
        { key: "rejected", label: "Rejected" },
    ]

    const statusTitle =
        parcel?.currentStatus
            ? parcel.currentStatus.replaceAll("_", " ").replace(/\b\w/g, (c: string) => c.toUpperCase())
            : "N/A"


    const cancelBtn = (trackingNumber: string) => {
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
                    Swal.fire({
                        title: "Cancelled!",
                        text: "Parcel has been cancelled",
                        icon: "success",
                    });
                    navigate(`/dashboard/userDashboard/${meData?.currentUser?._id}`)
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


    const acceptBtn =  (_id: string) => {
        console.log(_id)
        Swal.fire({
            title: "Are you sure?",
            text: "Accept this parcel?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Accept!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const formatted = new Date().toISOString();
                    const res = await approveParcel({
                        "parcelId": _id,
                        "currentStatus": "accepted",
                    })
                    console.log(res)
                    refetch()
                } catch (error) {
                    console.log(error)
                }
                Swal.fire({
                    text: "Parcel Successfully Accepted 😍",
                    icon: "success"
                });
            }
        });
    };
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className='bg-black'>
                <Navbar />
            </div>
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                        Parcel Information
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Detailed overview of sender, receiver, parcel and delivery status
                    </p>
                </div>

                <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
                    {/* Top Status Banner */}
                    <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-amber-100 grid place-content-center text-amber-700 font-black">
                                #
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Current Status</p>
                                <p className="text-lg font-bold text-gray-900">{statusTitle}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {isLoading ? (
                                <span className="px-3 py-2 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                                    Loading...
                                </span>
                            ) : (
                                <span className="px-3 py-2 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                                    Live Data
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Sender + Receiver */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {/* sender */}
                        <div className="rounded-xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-5 shadow-sm">
                            <p className="text-lg font-bold text-gray-900 mb-4">Sender Information</p>

                            <div className="space-y-2 text-sm">
                                <p className="text-gray-700">
                                    <span className="text-gray-500">Name:</span>{" "}
                                    <span className="font-semibold">{data?.data?.sender?.name ?? "N/A"}</span>
                                </p>
                                <p className="text-gray-700">
                                    <span className="text-gray-500">Email:</span>{" "}
                                    <span className="font-semibold">{data?.data?.sender?.email ?? "N/A"}</span>
                                </p>
                                <p className="text-gray-700">
                                    <span className="text-gray-500">Phone:</span>{" "}
                                    <span className="font-semibold">{data?.data?.sender?.phone ?? "N/A"}</span>
                                </p>
                                <p className="text-gray-700">
                                    <span className="text-gray-500">Address:</span>{" "}
                                    <span className="font-semibold">{data?.data?.sender?.address ?? "N/A"}</span>
                                </p>
                            </div>
                        </div>

                        {/* receiver */}
                        <div className="rounded-xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-5 shadow-sm">
                            <p className="text-lg font-bold text-gray-900 mb-4">Receiver Information</p>

                            <div className="space-y-2 text-sm">
                                <p className="text-gray-700">
                                    <span className="text-gray-500">Name:</span>{" "}
                                    <span className="font-semibold">{data?.data?.receiver?.name ?? "N/A"}</span>
                                </p>
                                <p className="text-gray-700">
                                    <span className="text-gray-500">Email:</span>{" "}
                                    <span className="font-semibold">{data?.data?.receiver?.email ?? "N/A"}</span>
                                </p>
                                <p className="text-gray-700">
                                    <span className="text-gray-500">Phone:</span>{" "}
                                    <span className="font-semibold">{data?.data?.receiver?.phone ?? "N/A"}</span>
                                </p>
                                <p className="text-gray-700">
                                    <span className="text-gray-500">Address:</span>{" "}
                                    <span className="font-semibold">{data?.data?.receiver?.address ?? "N/A"}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Parcel Details */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm mb-6">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Parcel Details</h3>
                            <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                                Tracking Info
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                                <p className="text-xs text-gray-500">Description</p>
                                <p className="font-semibold text-gray-900 mt-1">
                                    {parcel?.contentDescription || "N/A"}
                                </p>
                            </div>

                            <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                                <p className="text-xs text-gray-500">Fragile</p>
                                <p className={`font-semibold mt-1 ${parcel?.fragile ? "text-red-600" : "text-green-700"}`}>
                                    {parcel?.fragile ? "Yes" : "No"}
                                </p>
                            </div>

                            <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                                <p className="text-xs text-gray-500">Weight</p>
                                <p className="font-semibold text-gray-900 mt-1">{parcel?.weight || "N/A"}</p>
                            </div>

                            <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                                <p className="text-xs text-gray-500">Shipping Cost</p>
                                <p className="font-semibold text-gray-900 mt-1">
                                    {parcel?.shippingCost ? `${parcel.shippingCost} TK` : "N/A"}
                                </p>
                            </div>

                            <div className="rounded-lg bg-gray-50 p-4 border border-gray-100 sm:col-span-2">
                                <p className="text-xs text-gray-500">Estimated Delivery Date</p>
                                <p className="font-semibold text-gray-900 mt-1">
                                    {parcel?.expectedDeliveryDate
                                        ? format(new Date(parcel.expectedDeliveryDate), "dd MMM yyyy")
                                        : "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Status Steps */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                            <p className="font-bold text-gray-900 text-lg">Status Timeline</p>

                        </div>

                        <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
                            {statusSteps.map((status) => {
                                const isActive = parcel?.currentStatus === status.key
                                return (
                                    <span
                                        key={status.key}
                                        className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all
                      ${isActive
                                                ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                                                : "bg-green-50 text-green-700 border-green-200"
                                            }
                    `}
                                    >
                                        {status.label}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                    <>
                        {parcel?.currentStatus === "accepted" || parcel?.currentStatus === "rejected" && (
                            <button onClick={() => cancelBtn(parcel?.trackingNumber)} className="w-full text-center py-2 bg-red-500/80 text-white font-semibold text-lg rounded-sm mt-2 cursor-pointer">
                                Remove Parcel
                            </button>
                        )}

                        {parcel?.currentStatus === "pending" && (
                            <button onClick={() => cancelBtn(parcel?.trackingNumber)} className="w-full text-center py-2 bg-red-500/80 text-white font-semibold text-lg rounded-sm mt-2 cursor-pointer">
                                Cancel Parcel
                            </button>
                        )}
                        {parcel?.currentStatus === "delivered" && meData?.currentUser?.role === "receiver" && (
                            <button onClick={() => acceptBtn(parcel?._id)} className="w-full text-center py-2 bg-red-500/80 text-white font-semibold text-lg rounded-sm mt-2 cursor-pointer">
                                Accept Parcel
                            </button>
                        )}
                        
                    </>
                </div>
            </div>
        </div>
    )
}

export default MoreInfo
