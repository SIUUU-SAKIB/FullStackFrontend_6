import logo from '../assets/updated_logo.png'
export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 min-w-screen">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-24 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-12 justify-between place-items-center ">
        
   
        <div className='col-span-1'>
          <img
            src={logo}
            alt="Metro Parcel & Freight"
            className="h-10 mb-4"
          />
          <p className="text-lg">5965 Wall Street</p>
          <p className="text-lg">Sterling Heights, MI 48312</p>
          <p className="mt-3 text-lg">+8801796000000</p>
          <p className="mt-1 text-lg">metropf@metroparcelfreight.com</p>
          <div className="mt-4">
            <a href="#" className="text-white hover:text-red-500 text-lg">
              in
            </a>
          </div>
        </div>

        {/* Middle - Services */}
        <div >
          <h3 className="text-white font-bold mb-4">Services</h3>
          <ul className="space-y-2 text-lg">
            <li><a href="#" className="hover:text-red-500">Dedicated Services</a></li>
            <li><a href="#" className="hover:text-red-500">Mexico Cross-Border Solutions</a></li>
            <li><a href="#" className="hover:text-red-500">Canada Cross-Border Solutions</a></li>
            <li><a href="#" className="hover:text-red-500">Expedited Freight Services</a></li>
            <li><a href="#" className="hover:text-red-500">Hazmat Transportation</a></li>
            <li><a href="#" className="hover:text-red-500">Warehousing Solutions</a></li>
            <li><a href="#" className="hover:text-red-500">Specialized Freight Services</a></li>
          </ul>
        </div>
           <div >
          <h3 className="text-white font-bold mb-4">Company</h3>
          <ul className="space-y-2 text-lg">
            <li><a href="#" className="hover:text-red-500">About Us</a></li>
            <li><a href="#" className="hover:text-red-500">Drivers</a></li>
            <li><a href="#" className="hover:text-red-500">Contact Us</a></li>
          </ul>
        </div>
        {/* Right - Useful Links */}
        <div >
          <h3 className="text-white font-bold mb-4">Useful links</h3>
          <ul className="space-y-2 text-md">
            <li><a href="#" className="hover:text-red-500">Equipment</a></li>
            <li><a href="#" className="hover:text-red-500">Authority Documents</a></li>
            <li><a href="#" className="hover:text-red-500">Blogs</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between px-6 lg:px-12 text-xs text-gray-400">
        <p>© Metro Parcel & Freight Logistics, LLC. 2024 All Rights Reserved.</p>
        <div className="flex items-center mt-4 md:mt-0 space-x-2">
          <span>Powered By</span>
          {/* <img src="/vaunt-logo.png" alt="Vaunt" className="h-4" /> */}
        </div>
      </div>
    </footer>
  );
}
