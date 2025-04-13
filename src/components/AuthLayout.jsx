import React, { use } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            useNavigate('/login')
        }
        else if (!authentication && authStatus === authentication) {
            useNavigate('/')
        }
        setLoader(false)
    }, [authStatus, authentication, navigate])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}