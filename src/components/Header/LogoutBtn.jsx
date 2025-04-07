import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authservice from "../../appwrite/config";
function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authservice.logout().then(() => {
            dispatch(logout())
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={logoutHandler}>
                Logout
            </button>
        </>
    )
}

export default LogoutBtn;