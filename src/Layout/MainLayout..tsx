import { Outlet } from "react-router-dom"
import Footer from "../component/Footer"

const MainLayout = () => {
  return (
    <div className="font-font min-w-screen">
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default MainLayout