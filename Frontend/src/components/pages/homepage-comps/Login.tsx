import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Autentication/AutProvider";
import { useState } from "react";
import { API_URL } from "../../../Autentication/constanst";
import type { AuthResponse, AuthResponseError } from "../../../types/types";
import React from "react";
import Header from "./Header";
import LogoMulti from "../../../../public/images/logoMulti.png";
import './Login.css'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const auth = useAuth();
  const goto = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      if (response.ok) {
        setErrorResponse("");
        const json = (await response.json()) as AuthResponse;

        if (json.body.accessToken && json.body.refreshToken) {
          const guardar = auth.saveUser(json);
          goto("/dashboard");
        }
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
      <section className="ContainerL relative w-full md:h-screen p-4 text-white h-unset flex justify-center items-center">
        <div className="flex flex-col max-w-screen-lg mx-auto relative z-10">
          <div className="pb-0">
            <h2 className="text-4xl font-bold inline border-b-4 border-blue-600 border-opacity-40 sm:text-5xl">Iniciar Sesión</h2>
            <p className="py-6">Completa el siguiente formulario para iniciar sesión</p>
          </div>

          <div className="flex justify-center items-center relative z-10 h-60">
            <form onSubmit={handleSubmit} className="flex flex-col w-full md:w-1/2 rounded-md p-0 space-y-4" style={{ zIndex: "20" }}>
              <div className="flex flex-col">
                <label htmlFor="username" className="text-white">Correo Electrónico</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  placeholder="Ingrese su correo electronico"
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  className="p-3 bg-transparent border-2 rounded-md text-white focus:outline-none focus:border-blue-600" 
                  required 
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="text-white">Contraseña</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="Ingrese su contraseña"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="p-3 bg-transparent border-2 rounded-md text-white focus:outline-none focus:border-blue-600" 
                  required 
                />
              </div>

              {!!errorResponse && <div className="text-red-500">{errorResponse}</div>}

              <button 
                type="submit" 
                className="group text-white font-semibold w-fit px-6 py-3 flex items-center rounded-md bg-gradient-to-t from-blue-600 cursor-pointer mx-auto md:mx-0"
              > 
                Iniciar Sesión  
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
            <p>¿No tienes una cuenta? <a href="/signup" className="text-blue-600">Registrarse</a></p>
          </div>
        </div>
      </section>
    </>
  );
}
