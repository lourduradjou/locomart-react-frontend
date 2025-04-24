import React, { useState } from 'react'
import { IoMenuOutline } from 'react-icons/io5'
import { AiOutlineClose } from 'react-icons/ai'
import { BsShopWindow } from 'react-icons/bs'

const Navbar = () => {
    const [nav, setNav] = useState(true)
    const [navOpen, setNavOpen] = useState(false)

    const handleHamburger = () => {
        setNav(!nav)
        setNavOpen(!navOpen)
    }

    const scrollToSection = (id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div
            className={` flex justify-between items-center rounded-full mx-4 max-w-[1240px] md:mx-auto pt-4`}
        >
            <h1 className="text-xl font-bold text-[#000] w-full p-4  duration-200">REACT.</h1>
            <ul className="hidden uppercase font-medium md:flex text-black">
                <li className="p-4 hover:text-[#000000] transition-all duration-300">
                    <button onClick={() => scrollToSection('hero')}>Home</button>
                </li>
                <li>
                    <button
                        className="p-4 hover:text-[#000000] transition-all duration-300"
                        onClick={() => scrollToSection('company')}
                    >
                        Company
                    </button>
                </li>
                <li>
                    <button
                        className="p-4 hover:text-[#000000] transition-all duration-300"
                        onClick={() => scrollToSection('resources')}
                    >
                        Resources
                    </button>
                </li>
                <li>
                    <button
                        className="p-4 hover:text-[#000000] transition-all duration-300"
                        onClick={() => scrollToSection('footer')}
                    >
                        About
                    </button>
                </li>
                <li>
                    <button
                        className="p-4 hover:text-[#000000] transition-all duration-300"
                        onClick={() => scrollToSection('newsletter')}
                    >
                        Contact
                    </button>
                </li>
            </ul>
            <div>
                <button className="block md:hidden px-4" onClick={handleHamburger}>
                    {navOpen ? <AiOutlineClose size={25} /> : <IoMenuOutline size={25} />}
                </button>
            </div>
            <div
                className={
                    !nav
                        ? 'fixed left-0 top-0 w-[60%] md:hidden h-full border-r border-r-red-600 bg-[#1e1b1b] ease-in-out duration-[0.5s] text-white'
                        : 'fixed left-[-60%]  top-0 h-full border-r border-r-red-600 bg-[#1e1b1b] ease-out duration-[0.8s]'
                }
            >
                <h1 className="text-xl font-bold text-[#b028b0] w-full p-4 hover:text-red-400 transition-all duration-300">
                    REACT.
                </h1>
                <ul className="uppercase p-4">
                    <li>
                        {' '}
                        <button
                            className="p-4 border-b-gray-600 border-b-[1px] hover:text-red-400 transition-all duration-300"
                            onClick={() => scrollToSection('hero')}
                        >
                            Home
                        </button>
                    </li>
                    <li>
                        <button
                            className="p-4 border-b-gray-600 border-b-[1px] hover:text-red-400 transition-all duration-300"
                            onClick={() => scrollToSection('company')}
                        >
                            Company
                        </button>
                    </li>
                    <li>
                        <button
                            className="p-4 border-b-gray-600 border-b-[1px] hover:text-red-400 transition-all duration-300"
                            onClick={() => scrollToSection('resources')}
                        >
                            Resources
                        </button>
                    </li>
                    <li>
                        {' '}
                        <button
                            className="p-4 border-b-gray-600 border-b-[1px] hover:text-red-400 transition-all duration-300"
                            onClick={() => scrollToSection('footer')}
                        >
                            About
                        </button>
                    </li>
                    <li>
                        <button
                            className="p-4 border-b-gray-600 border-b-[1px] hover:text-red-400 transition-all duration-300"
                            onClick={() => scrollToSection('newsletter')}
                        >
                            Contact
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
