
import { Link, useParams } from 'react-router-dom'
import { useMeQuery } from '../redux/slices/authApi'

const ReceiverDashboard = () => {
  const {data:meData} = useMeQuery(undefined)
  const {id} =  useParams()

  return (
      <div className="bg-[url('https://wallpapers.com/images/featured/cool-trucks-cdvn4ttk7o8geggz.jpg')] min-h-screen max-w-screen bg-center bg-cover bg-no-repeat relative">
          {(meData?.currentUser?.blocked || !meData?.currentUser?.isVerified) && (
            <div className="absolute top-0 left-0 w-full h-full bg-red-500/95 z-100 grid place-content-center backdrop-blur-sm">
              <p className="text-white font-extrabold z-200 text-6xl text-center">{meData?.currentUser?.blocked ? "Your account has been blocked"
                : "Your account is not verified yet"}</p>
              <p className='text-white font-semibold text-xl text-shadow-2xs text-center  py-4'>{!meData?.currentUser?.blocked ? "Please wait for an admin to review your account"
                : "Please wait for admin to unblock you"}</p>
              <Link className='text-xl text-center' to={'/'}>Return to home</Link>
            </div>
          )}
          
          <div className="max-w-screen-xl mx-auto min-h-screen bg-white/20 flex flex-col items-center py-6">
          </div>
          
          </div>
  )
}

export default ReceiverDashboard