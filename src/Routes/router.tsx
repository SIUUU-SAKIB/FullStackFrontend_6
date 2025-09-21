import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout.";

import HomePage from "../pages/HomePage";
import ServicePage from "../pages/ServicePage";
import About from "../pages/About";
import ParcelForm from "../pages/Parcel/ParcelForm";
import Register from "../pages/Register";
import Login from "../pages/Login";
import UserDashboard from "../AllDashboard/UserDashboard";
import Dashboard from "../AllDashboard/Dashboard";
import AdminDashboard from "../AllDashboard/AdminDashboard";
import NotFound from "../component/NotFound";
import CreateAdmin from "../component/CreateAdmin";

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
                path: '/parcel-form/:id',
                element: <ParcelForm />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            }, {
                path: "*",
                element: <NotFound />

            }

        ],

    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
            {
                path: 'userDashboard/:id',
                element: <UserDashboard />
            },
            {
                path: "adminDashboard",
                element: <AdminDashboard />
            },
            {
                path: "create-admin",
                element: <CreateAdmin />
            },
            {
                path: "*",
                element: <NotFound />

            }
        ]
    }
])

export default router