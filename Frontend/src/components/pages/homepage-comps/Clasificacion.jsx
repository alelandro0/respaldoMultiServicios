/* eslint-disable react/no-unescaped-entities */


import javascript from "../../../assets/construccion.png";
import react from "../../../assets/enfermeria.png";
import vue from "../../../assets/martillo.png";
import git from "../../../assets/plomeria.png";
import github from "../../../assets/programador.png";
import node from "../../../assets/soldador.png";


import { Link as ScrollLink } from "react-scroll";


const   Techs = () => {

  const techs = [
    
 
    {
      id: 3,
      src: javascript,
      title: "CONSTRUCCION",
      style: "shadow-white",
    },
    {
      id: 4,
      src: react,
      title: "ENFERMERIA",
      style: "shadow-white",
    },
    {
      id: 5,
      src: vue,
      title: "CARPINTERIA",
      style: "shadow-white",
    },
   
    {
      id: 6,
      src: git,
      title: "PLOMERIA",
      style: "shadow-white",
    },
    {
      id: 7,
      src: github,
      title: "PROGRAMADOR",
      style: "shadow-white",
    },
   
   
    {
      id: 10,
      src: node,
      title: "SOLDADOR",
      style: "shadow-white",
    },
   
  ];

  return (
    <section
      name="Clasificaciones"
      className="relative w-full md:h-screen h-unset"
    >
      <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full text-white">
        <div>
          <h2 className="text-4xl font-bold inline pb-1 border-b-4 border-blue-600 sm:text-5xl">
            Clasificacion de Servicios
          </h2>
          <p className="py-6">clasificacion de Servicios</p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 text-center py-8 sm:px-0">
          {techs.map(({ id, src, title, style }) => (
            <div
              key={id}
              className={`flex flex-col justify-between shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}`}
            >
              <img className="w-20 mx-auto py-2 md:py-4" src={src} alt="" />
              <p className="mt-4 md:mt-2">{title}</p>
            </div>
          ))}
        </div>
      </div>
     <ScrollLink
        to="Contactanos"
        smooth
        duration={500}
        className="absolute bottom-2 -left-full md:left-1/2 md:-translate-x-1/2 cursor-pointer hover:text-primary-color"
      >
        <i className="bx bx-chevron-down text-7xl text-gray-400 animate-bounce font hover:text-blue-600"></i>
      </ScrollLink>
      
    </section>
  );
};

export default Techs;
