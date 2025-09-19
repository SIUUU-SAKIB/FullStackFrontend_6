import { useContext, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbAddressBookOff } from "react-icons/tb";
import Swal from "sweetalert2";
import { useCancelParcelMutation } from "../redux/slices/parcelApi";
import { contextApi } from "../ContextProvider";

interface Parcel {
    _id: string;
    currentStatus: string;
    trackingNumber: string;
    sender: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    receiver: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    weight: string;
    expectedDeliveryDate: string;
    shippingCost: string;
    fragile: boolean;
}

interface RecCardProps {
    parcel: { data: Parcel[] };
    incoming?: boolean;
    history?: boolean;
    all?: boolean;
    track?: string;
    meData: any;
    refetch: () => void;
}

function RecCard({ parcel, incoming, history, meData, refetch, track, all }: RecCardProps) {

    const { setTrcNum } = useContext(contextApi) ?? {};
    const [allParcel, setAllParcel] = useState<Parcel[]>(parcel.data[0] ? [parcel.data[0]] : []);
    const [deleteItem, { isLoading }] = useCancelParcelMutation();

    useEffect(() => {
        if (!parcel || parcel.data.length === 0) return;

        const filteredParcels = parcel.data.filter((e) => {
            if (incoming) {
                return e.currentStatus === "approved" || e.currentStatus === "in_transit";
            }

            if (history) {
                return e.currentStatus === "delivered" || e.currentStatus === "rejected";
            }

            if (all) {
                return e.currentStatus !== "rejected" && e.currentStatus !== "delivered";
            }

            if (track && track.length > 10) {
                return e.trackingNumber.toUpperCase() === track.toUpperCase();
            }

            return true;
        });

        setAllParcel(filteredParcels);
    }, [incoming, history, parcel.data, track]);

    const cancelBtn = (e: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You really want cancel this parcel?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!",
        }).then(async (result) => {
            try {
                await deleteItem({ trackingNumber: e });
                refetch();
            } catch (error) {
                console.log(error);
            }

            if (result.isConfirmed) {
                Swal.fire({
                    title: "Cancelled!",
                    text: "Parcel has been deleted",
                    icon: "success",
                });
            }
        });
    };

    return (
        <>
            {allParcel.length > 0 ? (
                allParcel.map((e) => (
                    <div
                        key={e._id}
                        className={`${e.currentStatus === "delivered" && "bg-zinc-300" ||
                            e.currentStatus === "rejected" && "bg-red-300"
                            } max-w-xl mx-auto bg-white shadow-md rounded-lg p-4 border border-gray-200 z-10 relative`}
                    >
                        <div className="flex flex-col items-start justify-center py-2">
                            {e.currentStatus === "approved" && (
                                <div className="flex gap-2 items-center">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz_5B7JbaaxkVB1lJNZ57OQkmz4RYJ_oQntm7Gu8asuUZxu2h9KwbEWJLTf9LTMky4fW4&usqp=CAU"
                                        className="w-[30px] rounded-full"
                                        alt="Approved Status"
                                    />
                                    <p className="text-sm uppercase text-blue-500 font-semibold">{e.currentStatus}</p>
                                </div>
                            )}
                            {e.currentStatus === "pending" && (
                                <div className="flex gap-2 items-center">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/11412/11412573.png"
                                        className="w-[30px] rounded-full object-contain"
                                    />
                                    <p className="text-sm uppercase text-orange-500 font-semibold">{e.currentStatus}</p>
                                </div>
                            )}
                            {e.currentStatus === "delivered" && (
                                <div className="flex gap-2 items-center">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR50Ic3NJ6UqVUwxUTQ7iWSbesJzmLoBksCCw&s"
                                        className="w-[30px] rounded-full"
                                    />
                                    <p className="text-sm uppercase text-green-500 font-semibold">{e.currentStatus}</p>
                                </div>
                            )}
                            {e.currentStatus === "rejected" && (
                                <div className="flex gap-2 items-center">
                                    <img
                                        src="https://media.istockphoto.com/id/1151657492/vector/vector-red-prohibition-sign-no-symbol-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=UhU_DVZGc-HnEeMayjUllgdrhYdvfUpDYPRaxFaHwmk="
                                        className="w-[30px] rounded-full"
                                    />
                                    <p className="text-sm uppercase text-red-500 font-semibold">{e.currentStatus}</p>
                                </div>
                            )}
                            <p className="text-center h-auto font-semibold">
                                Tracking ID:{" "}
                                <span
                                    onClick={() => setTrcNum && setTrcNum(e.trackingNumber)}
                                    className="text-blue-700 cursor-pointer"
                                >
                                    {e.trackingNumber}
                                </span>
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className={`p-3 bg-zinc-100 gap-1 flex flex-col ${e.currentStatus === "delivered" && "bg-zinc-300"}`}>
                                <h2 className="text-sm font-semibold text-gray-700 mb-2">Sender</h2>
                                <div className="flex gap-2 items-center">
                                    <CgProfile />
                                    <p className="text-gray-600">
                                        <span className="font-medium">{e.sender.name}</span>
                                    </p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <MdOutlineMailOutline className="shrink-0 mt-1" />
                                    <p className="text-gray-600 truncate max-w-[300px]">
                                        <span className="font-medium">{e.sender.email}</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaPhoneAlt />
                                    <p className="text-gray-600">
                                        <span className="font-medium">Phone:</span> {e.sender.phone}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 justify-center">
                                    <TbAddressBookOff />
                                    <p className="text-gray-600 max-w-[300px]">
                                        <span className="font-medium">{e.sender.address}</span>
                                    </p>
                                </div>
                            </div>

                            <div className={`p-3 bg-zinc-100 ${e.currentStatus === "delivered" && "bg-zinc-300"}`}>
                                <h2 className="text-sm font-semibold text-gray-700 mb-2">Receiver</h2>
                                <div className="flex gap-2 items-center">
                                    <CgProfile />
                                    <p className="text-gray-600">
                                        <span className="font-medium">{e.receiver.name}</span>
                                    </p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <MdOutlineMailOutline className="shrink-0 mt-1" />
                                    <p className="text-gray-600 truncate max-w-[300px]">
                                        <span className="font-medium">{e.receiver.email}</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaPhoneAlt />
                                    <p className="text-gray-600">
                                        <span className="font-medium">Phone:</span> {e.receiver.phone}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TbAddressBookOff />
                                    <p className="text-gray-600 max-w-[300px]">
                                        <span className="font-medium">{e.receiver.address}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t-1 border-black/10 pt-2">
                            <h2 className="text-sm font-semibold text-gray-700 mb-2">Parcel Information</h2>
                            <p className="text-gray-600">
                                <span className="font-medium">Description:</span> fridge
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Weight:</span> {e.weight}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Expected Date:</span> {e.expectedDeliveryDate || ""}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Shipping Cost:</span> {e.shippingCost ? e.shippingCost + "$" : "..."}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Fragile:</span>{" "}
                                {e.fragile ? (
                                    <span className="text-red-500 font-semibold">Yes</span>
                                ) : (
                                    <span className="text-green-600 font-semibold">No</span>
                                )}
                            </p>
                        </div>
                        {["pending", "delivered", "rejected"].includes(e.currentStatus) && (
                            <button
                                onClick={() => cancelBtn(e.trackingNumber)}
                                disabled={isLoading}
                                className="text-center w-full bg-[var(--primary-color)] py-1 text-white font-semibold mt-2 hover:bg-red-500 cursor-pointer"
                            >
                                {e.currentStatus === "pending" ? "Cancel Parcel" : "Remove Parcel"}
                            </button>
                        )}
                    </div>
                ))
            ) : (
                <h1 className="text-xl font-bold text-center text-white z-10 w-full">
                    {meData?.currentUser?.role === "sender" ? "You don't have any parcels 😔" : "You don't have any incoming parcels 😔"}
                </h1>
            )}
        </>
    );
}

export default RecCard;
