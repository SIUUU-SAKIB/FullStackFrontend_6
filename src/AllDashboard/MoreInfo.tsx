import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetParcelByIdQuery} from '../redux/slices/parcelApi'

const MoreInfo = () => {
    const { id } = useParams()
    const { data } = useGetParcelByIdQuery(id)
    console.log(data)
    const [parcel, setParcel] = useState(data?.data)

    return (
        <div className='max-w-screen bg-red-500/50'>
            <div className='max-w-screen-xl mx-auto bg-gray-400 min-h-screen flex flex-col gap-1'>
                <p className='text-center text-4xl font-bold  py-8'>Parcel Information</p>

                <div className='max-w-screen-xl mx-auto border p-4 flex flex-col gap-4'>
                    <p className='text-center font-bold text-xl bg-green-500 py-1 rounded-sm text-white'>{parcel.currentStatus.slice(0,1).toUpperCase() + parcel.currentStatus.slice(1)}</p>
                    <div className='flex w-full gap-8 '>
                        {/* sender */}
                        <div className="bg-gray-50 rounded-lg p-4 space-y-1">
                            <p className="text-xl font-semibold  mb-2">
                                Sender Information
                            </p>

                            <p className="text-md font-medium">
                                <span className="text-gray-400">Name:</span> {data?.data?.sender.name}
                            </p>
                            <p className="text-md font-medium">
                                <span className="text-gray-400">Email:</span> {data?.data?.sender.email}
                            </p>
                            <p className="text-md font-medium">
                                <span className="text-gray-400">Phone:</span>{data?.data?.sender.phone}</p>
                            <p className="text-md font-medium">
                                <span className="text-gray-400">Address:</span> {data?.data?.sender.address}
                            </p>
                        </div>
                        {/* receiver */}
                        <div className="bg-gray-50 rounded-lg p-4 space-y-1">
                            <p className="text-xl font-semibold mb-2">
                                Receiver Information
                            </p>

                            <p className="text-md font-medium">
                                <span className="text-gray-400">Name:</span> {data?.data?.receiver.name}
                            </p>
                            <p className="text-sm font-medium">
                                <span className="text-gray-400">Email:</span> {data?.data?.receiver.email}
                            </p>
                            <p className="text-md font-medium">
                                <span className="text-gray-400">Phone:</span>{data?.data?.receiver.phone}</p>
                            <p className="text-md font-medium">
                                <span className="text-gray-400">Address:</span> {data?.data?.receiver.address}
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col bg-white gap-2 items-start p-4'>
                        <p>Description: <span className='text-md font-semibold'>{parcel.contentDescription}</span></p>
                        <p>Fragile: <span className='text-md font-semibold'>{parcel.fragile?"Yes":"No"}</span></p>
                        <p>Description: <span className='text-md font-semibold'>{parcel.weight}</span></p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MoreInfo