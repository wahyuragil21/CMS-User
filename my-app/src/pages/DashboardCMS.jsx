import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import { Children } from "react";
import { Outlet } from "react-router-dom";


export default function DashboardCMS() {
    return (
        <>
            <div className="flex flex-row">
                <Sidebar />
                <div className='flex flex-col w-full'>
                    <Navbar />
                    <Outlet/>
                </div>
            </div>
        </>
    )
}