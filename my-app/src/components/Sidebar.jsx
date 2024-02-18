import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        navigate('/')
    }
    return (
        <>
            <div className="h-screen p-3 space-y-2 w-72 bg-primary text-white">
                <div className="flex items-center p-2 space-x-4">
                    <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
                    <div>
                        <h2 className="text-lg font-semibold">ADMIN</h2>
                        <span className="flex items-center space-x-1">
                        </span>
                    </div>
                </div>
                <div className="divide-y dark:divide-gray-700">
                    <ul className="pt-2 pb-4 space-y-1 text-sm">
                        <li className="flex items-center p-2 space-x-3 rounded-md">
                            <svg className={`w-7 h-7 dark:text-gray-400 ${pathname === "/dashboard/all-users" ? "text-quaternary" : ""}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19c0 .6.4 1 1 1h3v-3c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v3h3c.6 0 1-.4 1-1v-8.5" />
                            </svg>
                            <Link className={pathname === "/dashboard/all-users" ? "text-quaternary" : ""} to="all-users"><span className="font-semibold">Home</span></Link>
                        </li>

                        <li className="flex items-center p-2 space-x-3 rounded-md">
                            <svg className={`w-7 h-7 dark:text-gray-400 ${pathname === "/dashboard/add-new-user" ? "text-quaternary" : ""}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1c0 .6-.4 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <Link className={pathname === "/dashboard/add-new-user" ? "text-quaternary" : ""} to="add-new-user"><span className="font-semibold">Add New User</span></Link>
                        </li>

                        <li className="flex items-center p-2 space-x-3 rounded-md">
                            <svg className={`w-6 h-6 dark:text-gray-400 ${pathname === "/dashboard/fibonacci" ? "text-quaternary" : ""}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10.8 17.8-6.4 2.1 2.1-6.4m4.3 4.3L19 9a3 3 0 0 0-4-4l-8.4 8.6m4.3 4.3-4.3-4.3m2.1 2.1L15 9.1m-2.1-2 4.2 4.2" />
                            </svg>
                            <Link className={pathname === "/dashboard/fibonacci" ? "text-quaternary" : ""} to="fibonacci"><span className="font-semibold">Fibonacci</span></Link>
                        </li>
                        <li className="flex items-center p-2 space-x-3 rounded-md">
                            <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                            </svg>
                            <button onClick={handleLogout}><span className="font-semibold">Logout</span></button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}