import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from "react-icons/fa"
import { Link } from "react-scroll"
import LogoMulti from '../../../../public/images/logoMulti.png';
import Home from '../homepage-comps/Home'; 

const NavbarVideos = () => {
    const links = [
        {
            id: 1,
            link: "Home", // Cambiar de "Inicio" a "Home"
            name: "Inicio"
        },
        {
            id: 2,
            link: "About",
            name: "Acerca de Multiservicios"
        },
        {
            id: 3,
            link: "Edition",
            name: "Equipo de trabajo"
        }
    ]

    const [isShowNav, setIsShowNav] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset
            if (scrollTop > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <header className={`fixed top-0 flex bg-neutral-900/60 justify-between h-20 items-center py-4 px-2 text-white mx-auto md:px-24 md:py-0 w-full z-30 transition-colors duration-700 ${isScrolled ? 'bg-black/90' : ''}`}>
            <div className='flex flex-row gap-0 items-center'>
                <img src={LogoMulti} alt="Logo" className="h-20 w-auto scale-x-[-1] filter invert" />
                <h1 className='text-lg hover:text-blue-600 hover:scale-125 duration-500 m-0'>
                    MultiServicios
                </h1>
            </div>

            <ul className='hidden md:flex'>
                {links.map(({ id, link, name }) => (
                    <li key={id} className='cursor-pointer hover:scale-105 rounded-lg hover:bg-blue-600 p-4 duration-200 hover:text-white text-[1.1rem] lg:text-[1.3rem]'>
                        <Link to={link} smooth duration={500} offset={-70}>{name}</Link>
                    </li>
                ))}
            </ul>

            <div onClick={() => setIsShowNav(!isShowNav)} className='cursor-pointer pr-4 z-10 text-gray-100 md:hidden'>
                {isShowNav ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>

            {isShowNav && (
                <ul className='flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black via-black to-white-950 opacity-90'>
                    {links.map(({ id, link, name }) => (
                        <li
                            key={id}
                            className='px-4 cursor-pointer py-6 text-4xl opacity-100'>
                            <Link
                                onClick={() => setIsShowNav(!isShowNav)}
                                to={link}
                                smooth
                                duration={500}
                                offset={-70}>{name}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    )
}

export default NavbarVideos
