import React, { useState } from "react";
import authService from "../appwrite/config";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from '../store/authSlice'
import { Input, Button, Logo } from './index'
import { useDispatch } from "react-redux";
function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }

    }

    <>
        <div
            className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm border-black/10">
                <div
                    className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign to Your Account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-700">Sign up</Link>
                </p>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-6">
                    <div className="space-y-4">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: true, validate: { matchPatern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Invalid email address" }
                            })}
                        />

                        <Input
                            label="password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: true })}
                        />

                        <Button type="submit" className="w-full" variant="primary">Sign in</Button>

                    </div>

                </form>
            </div>
        </div>
    </>
}

export default Login;