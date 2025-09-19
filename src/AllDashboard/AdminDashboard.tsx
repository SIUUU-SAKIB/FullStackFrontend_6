import Swal from "sweetalert2";
import {
  useAllAdminsQuery,
  useAlluserQuery,
  useBlockUserMutation,
  useDeleteByAdminMutation,
  useMeQuery,
  useUnblockUserMutation,
  useVerifyMutation,
} from "../redux/slices/authApi";
import RegLoader from "../utils/RegLoader";
import { useEffect, useState } from "react";
import ParcelCard from "../component/ParcelCard";
import { useGetParcelsQuery } from "../redux/slices/parcelApi";


type ParcelStatus = "pending" | "approved" | "rejected" | "in_transit" | "delivered";

interface ParcelCardParcel {
  _id: string;
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
  trackingNumber: string;
  currentStatus: ParcelStatus;  
  createdAt: string;
  updatedAt: string;
  contentDescription: string;
  fragile: boolean;
  weight: number;
  expectedDeliveryDate?: string;
  shippingCost?: string;
}


interface User {
  _id: string;
  name: string;
  email: string;
  role: "sender" | "receiver";
  isVerified: boolean;
  blocked?: boolean;
}

// Use the compatible type for the API response
interface ParcelResponse {
  total: number;
  data: ParcelCardParcel[];
}

interface UserResponse {
  total: number;
  data: User[];
}

const AdminDashboard: React.FC = () => {
  const [verify, { isLoading }] = useVerifyMutation();
  const [deleteByAdmin, { isLoading: load }] = useDeleteByAdminMutation();
  const [users, setUsers] = useState<boolean>(true);
  const [block] = useBlockUserMutation();
  const [unblock] = useUnblockUserMutation();
  const { data: meData } = useMeQuery(undefined);
  
  const [userPage, setUSerPage] = useState<number>(1);
  const { data: userResponse, refetch, isLoading: userLoading } = useAlluserQuery(userPage);
  
  const userData = userResponse as UserResponse;
  const usersList = userData?.data || [];

  const [parcelPage, setParcelPage] = useState<number>(1);
  
  const { data: parcelResponse, refetch: parcelRefetch, isLoading: parcelLoading } = useGetParcelsQuery(parcelPage);
  
  const parcelData = parcelResponse as ParcelResponse;
  const parcelsList = parcelData?.data || [];

  const totalParcel = parcelData?.total || 0;
  const parcelPerPage = 4;
  const totalParcelPage = Math.ceil(totalParcel / parcelPerPage);
  
  const [admins, setAdmins] = useState(false);
  const [parcel, setParcel] = useState(false);
  const { data: allAdmins, isLoading: adminLoading } = useAllAdminsQuery(undefined);

  useEffect(() => {
    refetch();
  }, [refetch, parcelRefetch]);

  const preveParcelBtn = () => {
    if (parcelPage > 1) {
      setParcelPage(parcelPage - 1);
    }
  };

  const nextParcelBtn = () => {
    if (parcelPage < totalParcelPage) {
      setParcelPage(parcelPage + 1);
    }
  };

  const totalUsers = userData?.total || 0;
  const userPerPage = 5;
  const totalPages = Math.ceil(totalUsers / userPerPage);
  const [sort, setSort] = useState<string>("");

  if (adminLoading || parcelLoading || userLoading) {
    return <RegLoader />;
  }

  const filteredUsers = usersList.filter((e) => {
    if (sort === "Sender") return e.role === "sender";
    if (sort === "Receiver") return e.role === "receiver";
    return true;
  });

  if (isLoading || load) {
    return <RegLoader />;
  }

  const preveBtn = () => {
    if (userPage > 1) {
      setUSerPage(userPage - 1);
    }
  };

  const nextBtn = () => {
    if (userPage < totalPages) {
      setUSerPage(userPage + 1);
    }
  };

  const verifyUserBtn = (email: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be verified!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make this user verified",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await verify({ email }).unwrap();
          refetch();
          Swal.fire({
            title: "Success😍",
            text: "User is successfully verified now",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          console.error(error);
        }
      }
    });
  };

  const blockBtn = (email: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be blocked!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make this user blocked",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await block({ email }).unwrap();
          refetch();
          Swal.fire({
            title: "Success😍",
            text: "User is successfully blocked",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          console.error(error);
        }
      }
    });
  };

  const unblockBtn = (email: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be unblocked!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make this user unblockd",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await unblock({ email }).unwrap();
          refetch();
          Swal.fire({
            title: "Success😍",
            text: "User is successfully unblocked now",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          console.error(error);
        }
      }
    });
  };

  const deleteUserBtn = (email: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be DELETED!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, DELETE this user",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteByAdmin({ email }).unwrap();
          refetch();
          Swal.fire({
            title: "Success😍",
            text: "User deleted successfully",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          console.error(error);
        }
      }
    });
  };

  return (
    <div className="max-w-screen bg-zinc-600 relative">
      <div className="max-w-screen-2xl min-h-screen mx-auto bg-white">
        <p className="text-6xl font-bold text-center text-shadow-blue-400 py-4 bg-[var(--primary-color)] text-white italic">
          ADMIN DASHBOARD
        </p>
        <div className="w-full h-[0.2px] bg-black/20"></div>

        <div className="flex items-center justify-evenly">
          <div
            onClick={() => { setUsers(true); setAdmins(false); setParcel(false); }}
            className="py-6 w-1/2 text-center font-bold text-2xl bg-green-500/50 border-black/50 cursor-pointer hover:bg-green-400 hover:text-white transition duration-200"
          >
            Users: {totalUsers}
          </div>
          {meData?.currentUser?.role === "super_admin" && (
            <div
              onClick={() => { setAdmins(true); setUsers(false); setParcel(false); }}
              className="py-6 w-1/2 text-center font-bold text-2xl bg-fucassia-500/50 border-black/50 cursor-pointer hover:bg-green-400 hover:text-white transition duration-200"
            >
              Admins: {allAdmins?.data?.length || 0}
            </div>
          )}
          <div
            onClick={() => { setUsers(false); setAdmins(false); setParcel(true); }}
            className="py-6 w-1/2 text-center font-bold text-2xl bg-blue-500/50 border-black/50 cursor-pointer hover:bg-blue-500 hover:text-white transition duration-200"
          >
            Parcels: {totalParcel}
          </div>
        </div>

        {/* Users */}
        <div
          className={`w-full min-h-screen bg-green-50 px-4 py-6 ${users ? "flex flex-col gap-6" : "hidden"}`}
        >
          <div className="flex items-center gap-4 max-w-lg mx-auto">
            <select
              onChange={(e) => setSort(e.target.value)}
              className="mx-auto bg-zinc-100 px-4 py-2 rounded-sm cursor-pointer"
            >
              <option>Sort by</option>
              <option value={"All"}>All</option>
              <option value={"Sender"}>Sender</option>
              <option value={"Receiver"}>Receiver</option>
            </select>
          </div>

          {filteredUsers.map((e: User) => (
            <div
              key={e.email}
              className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100 transition hover:shadow-xl"
            >
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <p className="text-lg font-semibold text-gray-800">{e.name}</p>
                <p className="text-sm text-gray-500 break-words">{e.email}</p>
              </div>

              <div>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${e.role === "sender"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-purple-100 text-purple-700"
                    }`}
                >
                  {e.role}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  disabled={e.isVerified === true}
                  onClick={() => verifyUserBtn(e.email)}
                  className={`${e.isVerified
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                    } px-4 py-2 rounded-lg font-medium transition`}
                >
                  {e.isVerified ? "Verified" : "Verify User"}
                </button>

                <button
                  onClick={() => deleteUserBtn(e.email)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition cursor-pointer"
                >
                  Delete User
                </button>
                {e.blocked ? (
                  <button
                    onClick={() => unblockBtn(e.email)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition cursor-pointer"
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => blockBtn(e.email)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition cursor-pointer"
                  >
                    Block
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="w-full flex items-center justify-center gap-4 pt-2">
            <button
              disabled={userPage === 1}
              onClick={preveBtn}
              className="text-lg font-semibold  px-4 py-1 bg-amber-200 cursor-pointer hover:bg-amber-300 transition duration-100"
            >
              Prev
            </button>
            <p className="text-lg font-bold">{userPage}</p>
            <button
              disabled={userPage === totalPages}
              onClick={nextBtn}
              className="text-lg font-semibold  px-4 py-1 bg-amber-200 cursor-pointer hover:bg-amber-300 transition duration-100"
            >
              Next
            </button>
          </div>
        </div>

        {/* Parcels */}
        <div
          className={`w-full grid grid-cols-1 md:grid-cols-2 gap-4 py-2 bg-blue-500/50 px-4 ${parcel ? "grid" : "hidden"}`}
        >
          {parcelsList.map((parcel: ParcelCardParcel) => (
            <ParcelCard
              key={parcel._id}
              parcel={parcel}
              parcelRefetch={parcelRefetch}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;