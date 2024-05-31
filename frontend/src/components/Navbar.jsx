    import React, { useEffect, useState } from 'react'
    import { Link } from 'react-router-dom';
    //icon 
    import {FaBarsStaggered, FaBlog, FaXmark } from "react-icons/fa6";

    const Navbar = () => {
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const[isSticky, setIsSticky] = useState(false);

        //chuyen doi menu mobile
        const toggleMenu = () => {
            setIsMenuOpen(!isMenuOpen);
        }

        useEffect(() => {
            const handleScroll = () => {
                if(window.scrollY > 100){
                    setIsSticky(true);
                }
                else{
                    setIsSticky(false);
                }
            }
            return () =>{
                window.addEventListener('scroll', handleScroll);
            }
        },[])

        const navItems = [
            {link: "Home", path: "/"},
            {link: "About", path: "/about"},
            {link: "Add Product", path: "/admin/dashboard"},
            {link: "Blog", path: "/blog"}
        ]
    return (
        <header>
        <nav>
            <div>
                {/*logo*/}
                <Link to="/" className='text-2x1 font-bold text-blue-700 flex items-center gap-2'>
                    <FaBlog className='inline-block'/> HS Bookstore </Link>

                    <ul className='md:flex space-x-12 hidden '>
                        {
                        navItems.map(({link, path}) => <Link key={path} to={path} 
                        className = 'block text-base text-black uppercase cursor-pointer hover:text-blue-700'>{link}</Link>)
                        }
                    </ul>

                    <div className='space-x-12 hidden lg:flex items  center'>
                        <button><FaBarsStaggered className='w-5 hover:text-blue-700'></FaBarsStaggered></button>
                    </div>

                    <div className='md:hidden'>
                        <button onClick={toggleMenu}>
                            {
                                isMenuOpen ? <FaXmark className='h-5 w-5 text-black'/> : <FaBarsStaggered 
                                className='h-5 w-5 text-black'/> 

                            }
                        </button>

                    </div>
            </div>
        </nav>
        </header>
    )
    }
export default Navbar
