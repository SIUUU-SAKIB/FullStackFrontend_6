import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout.";

import HomePage from "../pages/HomePage";
import ServicePage from "../pages/ServicePage";
import About from "../pages/About";
import ParcelForm from "../pages/ParcelForm";
import Register from "../pages/Register";
import LoginForm from "../pages/Login";
import Login from "../pages/Login";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: "/service-page",
                element: <ServicePage />
            }, {
                path: '/about',
                element: <About />
            }, {
                path: '/parcel-form',
                element: <ParcelForm />
            },
            {
                path:'/register',
                element:<Register/>
            },
            {
                path:"/login",
                element:<Login/>
            }

        ]
    }
])

export default router