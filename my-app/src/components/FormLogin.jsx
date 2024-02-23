import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function FormLogin() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    const [capthca, setCapthca] = useState('')
    const [captchaInput, setCaptchaInput] = useState('')

    const handleCaptcha = () => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let captcha = "";
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            captcha += charset[randomIndex];
        }
        setCapthca(captcha);
    }


    const handleOnSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
            const result = await res.json()


            if (res.ok && capthca === captchaInput) {
                localStorage.setItem("access_token", result.access_token)
                navigate('/dashboard/all-users')
                toast.success(`LOGIN BERHASIL`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    theme: "light",
                });
            } else {
                if (result.message) {
                    toast.error(`LOGIN GAGAL!. ${result.message}`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        theme: "light",
                    });
                } else {
                    toast.error(`LOGIN GAGAL!. Wrong Capthca.`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        theme: "light",
                    });
                }

            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleCaptcha();
    }, [])
    const handleOnChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    return (
        <>
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        className="absolute inset-0 bg-gradient-to-r bg-primary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>

                    <form className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20" onSubmit={handleOnSubmit}>
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">Login</h1>
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

                                    <input
                                        type="text"
                                        value={capthca}
                                        className="text-center text-xl input input-bordered w-full max-w-xs font-semibold tracking-widest" disabled />


                                    <div className="flex flex-row gap-2">
                                        <input
                                            type="text"
                                            value={captchaInput}
                                            onChange={(e) => setCaptchaInput(e.target.value)}
                                            placeholder="Type captcha here"
                                            className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="relative">
                                        <button
                                            className=" rounded-lg bg-primary py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white hover:shadow-lg hover:shadow-blue-500/40"
                                            type="submit">
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-center">

                            <div id="buttonDiv"></div>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}