import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className="min-w-full">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}
