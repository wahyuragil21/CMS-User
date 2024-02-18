import { useLocation } from "react-router-dom"

export default function Navbar() {
    const { pathname } = useLocation()
    return (
        <>
            <div className="navbar bg-primary">
                {pathname === '/dashboard/all-users' &&
                    <a className="text-xl text-white">Home</a>
                }
                {pathname === '/dashboard/add-new-user' &&
                    <a className="text-xl text-white">Add New User</a>
                }
            </div>
        </>
    )
}