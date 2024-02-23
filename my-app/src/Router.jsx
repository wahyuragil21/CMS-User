import { createBrowserRouter, redirect } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardCMS from "./pages/DashboardCMS";
import Form from "./components/Form";
import Table from "./components/Table";
import Fibonacci from "./pages/Fibonacci";

const authen = () => {
    const isLogin = localStorage.getItem('access_token')
    if (!isLogin) {
        throw redirect('/')
    } else {
        return null
    }
}

const router = createBrowserRouter([

    {
        path: "/",
        element: < LandingPage />
    },
    // {
    //     path: "/fibonacci",
    //     element: < Fibonacci />
    // },
    {
        path: "/dashboard",
        element: <DashboardCMS />,
        loader: authen,
        children: [
            {
                path: "all-users",
                element: <Table />
            },
            {
                path: "add-new-user",
                element: <Form />
            },
            {
                path: "update-user",
                element: <Form />
            },
            {
                path: "fibonacci",
                element: < Fibonacci />
            },

        ],
    }
]);


export default router