import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function Form() {
    const { pathname } = useLocation()
    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate()
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get('user_id')


    const fetchdata = async () => {
        try {
            const res = await fetch(`http://localhost:3000/user?user_id=${id}`)
            const { user } = await res.json()
            if (res.ok && pathname === '/dashboard/update-user') {
                setForm(user)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchdata()
    }, [id])


    const handleCreateUser = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
            const errorMsg = await res.json()
            if (res.ok) {
                navigate('/dashboard/all-users')
                toast.success("Success Add User", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    theme: "light",
                });
            } else {
                toast.error(errorMsg.message[0], {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    theme: "light",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdateUser = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch('http://localhost:3000/update-user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
            const errorMsg = await res.json()
            if (res.ok) {
                navigate('/dashboard/all-users')
                toast.success("Success Update User", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    theme: "light",
                });
            } else {
                toast.error(errorMsg.message[0], {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    theme: "light",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }


    return (
        <>
            <form className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 h-full">
                <div className="max-w-md mx-auto">
                    <div>
                        <h1 className="text-2xl font-semibold">{pathname === "/dashboard/update-user" ? "Update User" : "Create User"}</h1>
                    </div>
                    <div className="divide-y divide-gray-200">
                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                            <label className="input input-bordered flex items-center gap-2 bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    autoComplete="username"
                                    value={form.username}
                                    onChange={handleOnChange}
                                    className="grow"
                                    placeholder="Username" />
                            </label>

                            <label className="input input-bordered flex items-center gap-2 bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    autoComplete="password"
                                    value={form.password}
                                    onChange={handleOnChange}
                                    placeholder="Password"
                                    className="grow"
                                />
                            </label>
                            <div className="relative flex gap-2">
                                <button
                                    className="rounded-lg bg-primary py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white hover:shadow-lg hover:shadow-blue-500/40"
                                    type="submit" onClick={pathname === "/dashboard/update-user" ? handleUpdateUser : handleCreateUser}>
                                    Submit
                                </button>
                                {pathname === "/dashboard/update-user" && (
                                    <Link to={`/dashboard/all-users`} className=" rounded-lg bg-quaternary py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white hover:shadow-lg hover:shadow-blue-500/40">Back</Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center">

                    <div id="buttonDiv"></div>
                </div>

            </form>
        </>
    )
}