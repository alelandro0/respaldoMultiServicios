import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from '../../../Autentication/constanst';
import { useAuth } from '../../../Autentication/AutProvider';
import type { AuthResponseError } from "../../../types/types";
import Header from "./Header";
import LogoMulti from "../../../../public/images/logoMulti.png";
import './Login.css'

export const Registro = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState('');
  const [roll, setRoll] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const auth = useAuth();
  const goto = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!roll) {
      setErrorResponse("Por favor, selecciona el tipo de usuario.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          username,
          password,
          roll
        })
      });

      if (response.ok) {
        setErrorResponse("");
        goto("/iniciar-sesion");
      } else {
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (auth.esAutentico) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Header />
      <section className="ContainerR relative w-full md:h-screen p-4 text-white h-unset flex justify-center items-center">
        <div className="flex flex-col max-w-screen-lg mx-auto relative z-10 mt-12">
          <div className="pb-0">
            <h2 className="text-4xl font-bold inline border-b-4 border-blue-600 border-opacity-40 sm:text-5xl">Registro</h2>
            <p className="py-6">Completa el siguiente formulario para registrarte</p>
          </div>

          <div className="flex justify-center items-center relative z-10 h-76">
            <form onSubmit={handleSubmit} className="flex flex-col w-full md:w-1/2 rounded-md p-0" style={{ zIndex: "20" }}>
              <div className="flex flex-col mb-4">
                <label htmlFor="name" className="text-white">Nombre</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Ingresa tu nombre" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="p-2 bg-transparent border-2 rounded-md text-white focus:outline-none focus:border-blue-600" 
                  required 
                />
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="username" className="text-white">Correo Electrónico</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  placeholder="Ingresa tu correo electrónico" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  className="p-2 bg-transparent border-2 rounded-md text-white focus:outline-none focus:border-blue-600" 
                  required 
                />
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="password" className="text-white">Contraseña</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="Ingresa tu contraseña" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="p-2 bg-transparent border-2 rounded-md text-white focus:outline-none focus:border-blue-600" 
                  required 
                />
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="roll" className="text-white">Tipo de Usuario</label>
                <select 
                  name="roll" 
                  id="roll"
                  value={roll} 
                  onChange={(e) => setRoll(e.target.value)} 
                  className="p-2 rounded-md focus:outline-none focus:border-blue-600 bg-black border-2 border-white text-white"
                  required
                >
                  <option value="">Selecciona el tipo de usuario</option>
                  <option value="Cliente">Cliente</option>
                  <option value="Profesional">Profesional</option>
                </select>
              </div>

              {!!errorResponse && <div className="text-red-500 mb-4">{errorResponse}</div>}

              <button 
                type="submit" 
                className="group text-white font-semibold w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-t from-blue-600 cursor-pointer mx-auto md:mx-0"
              > 
                Registrarse  
              </button>
            </form>
            
            <div className="ml-8 relative z-20">
              <img 
                className="scale-x-[-1] filter invert transition-transform transform hover:scale-110 transition duration-500" 
                src={LogoMulti} 
                alt="Imagen" 
              />
            </div>
          </div>

          <div className="mt-4">
            <p>¿Ya tienes una cuenta? <a href="/iniciar-sesion" className="text-blue-600">Iniciar sesión</a></p>
          </div>
        </div>
      </section>
    </>
  );
};

