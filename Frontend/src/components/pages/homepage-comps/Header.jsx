import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react'; // Importa useState
import { FaBars, FaTimes } from 'react-icons/fa'; // Importa FaBars y FaTimes
import LogoMulti from '../../../../public/images/logoMulti.png';
import './Login.css'; // Asegúrate de que los estilos CSS estén correctamente importados

const Header = () => {
  const location = useLocation();
  const [isShowNav, setIsShowNav] = useState(false); // Estado para mostrar/ocultar el menú en pantallas pequeñas

  return (
    <header className="headerL fixed top-0 flex bg-neutral-900/60 justify-between h-20 items-center py-4 px-4 md:px-6 text-white mx-auto lg:px-24 md:py-0 w-full z-30 transition-colors duration-700">
      <div className='flex flex-row gap-0 items-center'>
        <img src={LogoMulti} alt="Logo" className="h-20 w-auto scale-x-[-1] filter invert" />
        <h1 className='text-lg hover:text-blue-600 hover:scale-125 duration-500 m-0'>
          MultiServicios
        </h1>
      </div>
      {/* Menú para pantallas grandes */}
      <ul className='hidden lg:flex flex-row space-x-4 items-center'>
        <li className={`cursor-pointer rounded-lg p-4 duration-200 text-lg opacity-70 ${location.pathname === '/' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}>
          <Link to="/" className='hover:text-white'>
            Inicio
          </Link>
        </li>
        <li className={`cursor-pointer rounded-lg p-4 duration-200 text-lg opacity-70 ${location.pathname === '/iniciar-sesion' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}>
          <Link to="/iniciar-sesion" className='hover:text-white'>
            Iniciar Sesion
          </Link>
        </li>
        <li className={`cursor-pointer rounded-lg p-4 duration-200 text-lg opacity-70 text-white ${location.pathname === '/registrate' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}>
          <Link to="/registrate" className='hover:text-white'>
            Regístrate
          </Link>
        </li>
      </ul>
      {/* Icono de menú para pantallas pequeñas */}
      <div onClick={() => setIsShowNav(!isShowNav)} className='cursor-pointer pr-4 z-10 text-gray-100 lg:hidden'>
        {isShowNav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>
      {/* Menú desplegable para pantallas pequeñas */}
      {isShowNav && (
        <ul className='flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black via-black to-blue-600 opacity-90'>
          <li className='px-4 cursor-pointer py-6 text-xl md:text-2xl lg:text-3xl xl:text-4xl opacity-100'>
            <Link onClick={() => setIsShowNav(!isShowNav)} to="/" smooth duration={500} className="text-white hover:text-blue-600">Inicio</Link>
          </li>
          <li className='px-4 cursor-pointer py-6 text-xl md:text-2xl lg:text-3xl xl:text-4xl opacity-100'>
            <Link onClick={() => setIsShowNav(!isShowNav)} to="/iniciar-sesion" smooth duration={500} className="text-white hover:text-blue-600">Iniciar Sesión</Link>
          </li>
          <li className='px-4 cursor-pointer py-6 text-xl md:text-2xl lg:text-3xl xl:text-4xl opacity-100'>
            <Link onClick={() => setIsShowNav(!isShowNav)} to="/registrate" smooth duration={500} className="text-white hover:text-blue-600">Registrarse</Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
