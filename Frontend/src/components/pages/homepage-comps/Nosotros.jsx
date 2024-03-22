/* eslint-disable react/no-unescaped-entities */

import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll';
import { useAuth } from '../../../Autentication/AutProvider';


const About = () => {
    const auth= useAuth()
    return (
        <section name="Acerca de nosotros" 
        className='relative w-full md:h-screen text-white h-unset'>

            <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full text-lg'>

                    <div className='pb-8'>
                        <h2 className='text-4xl sm:text-5xl font-bold inline border-b-4 border-blue-600 '>Acerca de Nosotros</h2>
                    </div>

                    <p className="mb-4 py-6">En Multiservicios, nos dedicamos a proporcionar soluciones versátiles para una amplia gama de necesidades laborales. Somos una plataforma dedicada al trabajo formal e informal, donde conectamos a personas con habilidades únicas y diversas con aquellas que buscan contratar servicios de calidad.
                    </p>

                    <p>Únase a nuestro equipo y descubra cómo estamos cambiando el panorama laboral, creando nuevas oportunidades y fomentando el crecimiento profesional. ¡Estamos emocionados de tenerlo a bordo en nuestro equipo de trabajo!</p>

                    <Link to='/about-me' className='text-white font-semibold text-[16px] w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-t from-blue-600  cursor-pointer mx-auto md:mx-0 self-end mt-8 hover:scale-110 duration-300'>
                        Ver mas
                        <span className=''><MdOutlineKeyboardArrowRight size={25} className='ml-1' /></span>
                    </Link>
                
            </div>
            {!auth.esAutentico &&  <ScrollLink to="Servicios" smooth duration={500} className='absolute bottom-2 -left-full md:left-1/2 md:-translate-x-1/2 cursor-pointer hover:text-primary-color'>
                <i className='bx bx-chevron-down text-7xl text-gray-400 animate-bounce font hover:text-blue-600'></i>
            </ScrollLink>}
           
            
        </section>
        
    )
}

export default About
