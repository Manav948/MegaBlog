import React, { useState } from "react";
import authService from "../appwrite/authService";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {login } from '../store/authSlice'
import {Input , Button , Logo} from './index'
import { useDispatch } from "react-redux";
function Login() {
    <>
        <div>
            Login
        </div>
    </>
}

export default Login;