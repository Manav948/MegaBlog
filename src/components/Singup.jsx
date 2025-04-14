import React, { useState } from "react";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from '../store/authSlice'
import { Input, Button, Logo } from './index'
import { useDispatch } from "react-redux";

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                dispatch(login(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }

    }
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm border-black/10">
                    <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight">Create Your Account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Sign In</Link>
                    </p>
                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                    <form onSubmit={handleSubmit(create)} className="mt-6">
                        <div className="space-y-4">
                            <Input
                                label="Name"
                                type="text"
                                placeholder="Enter your name"
                                {...register("name", { required: true })}
                            />
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

                            <Button className="w-full" type="submit" variant="primary">Sign In</Button>  
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;
