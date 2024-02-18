import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Table() {

    const [users, setUsers] = useState([])
    const fetchdata = async () => {
        try {
            const res = await fetch('http://localhost:3000/all-users');
            const { user } = await res.json();
            if (res.ok) {
                setUsers(user)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/del-user?user_id=${id}`, {
                method: 'DELETE',
            })
            if (res.ok) {
                fetchdata()
                toast.success("Success Delete User", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    theme: "light",
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchdata()
    }, [])

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Password</th>
                            <th>Created</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td className="w-32">{user.username}</td>
                                <td className="w-32">{user.password}t</td>
                                <td className="w-32">{new Date(user.createdAt).toLocaleDateString('en-GB')}</td>
                                <td className="flex gap-2 w-28 ">
                                    <Link to={`/dashboard/update-user?user_id=${user.id}`} className="rounded-lg bg-primary py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white hover:shadow-lg hover:shadow-blue-500/40">Update</Link>
                                    <button className="rounded-lg bg-tertiary py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white hover:shadow-lg hover:shadow-blue-500/40" onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}