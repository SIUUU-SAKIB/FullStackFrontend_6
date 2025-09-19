
// const AdminCard = ({ allAdmin}) => {
//   return (
//     <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100 transition hover:shadow-xl">
      
//       {/* User Info */}
//       <div className="flex flex-col items-center md:items-start text-center md:text-left">
//         <p className="text-lg font-semibold text-gray-800">{allAdmin?.name || 'N/A'}</p>
//         <p className="text-sm text-gray-500 break-words">{allAdmin?.email || 'N/A'}</p>
//       </div>

//       {/* Role */}
//       <div>
//         <span className={`px-3 py-1 text-sm font-medium rounded-full ${allAdmin?.role === "sender"
//           ? "bg-blue-100 text-blue-700"
//           : "bg-purple-100 text-purple-700"
//         }`}>
//           {allAdmin?.role || 'N/A'}
//         </span>
//       </div>

//       {/* Buttons */}
//       <div className="flex gap-4">
//         <button
//           onClick={() => alert(`Disabling ${allAdmin?.name}`)}
//           className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-200"
//         >
//           Disable
//         </button>

//         {/* Delete Button */}
//         <button
//           onClick={() => alert(`Deleting ${allAdmin?.name}`)} // Fixed incorrect prop
//           className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminCard;


const AdminCard = () => {
  return (
    <div>AdminCard</div>
  )
}

export default AdminCard