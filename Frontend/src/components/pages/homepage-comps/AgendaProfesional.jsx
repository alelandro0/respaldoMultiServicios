/* eslint-disable react-hooks/exhaustive-deps */
import  { useState, useEffect } from 'react';
import { useAuth } from "../../../Autentication/AutProvider";
import { API_URL } from "../../../Autentication/constanst";

const AgendaProfesional = () => {
    const auth = useAuth();
    const [datos, setDatos] = useState([]);
   

    useEffect(() => {
        consultarCitas();
    }, []);

    const consultarCitas = async () => {
        try {
            const response = await fetch(`${API_URL}/agenda-profesional/${auth.getUser()?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('No se pudieron cargar las citas');
            }
            const data = await response.json();
            console.log('Datos obtenidos AGENDAPROFESIONAL:', data);
            // Aquí asumiendo que data es un array de objetos con el formato correcto de CitaData
            setDatos(data);
        } catch (error) {
            console.error("Error al cargar las citas:", error);  
        }
    };
    const formatHora = (hora) => {
        // Separar las horas y minutos
        const [hours, minutes] = hora.split(':');
        // Convertir a número
        const numHours = parseInt(hours, 10);
        // Determinar si es AM o PM
        const period = numHours >= 12 ? 'PM' : 'AM';
        // Ajustar a formato de 12 horas
        const formattedHours = numHours % 12 || 12;
        // Retornar la hora formateada
        return `${formattedHours}:${minutes} ${period}`;
    };
    
    const formatFecha = (fecha) => {
        // Crear objeto de fecha
        const dateObj = new Date(fecha);
        // Obtener año, mes y día
        const year = dateObj.getFullYear();
        const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        const day = ('0' + dateObj.getDate()).slice(-2);
        // Retornar la fecha formateada
        return `${day}-${month}-${year}`;
    };

    return (
        <>
        <div className="relative container mx-auto mt-5 px-4 sm:px-6 lg:px-8">
            <h1 className="text-center font-bold text-3xl text-white" >Cronograma de Trabajo</h1>
        
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                {datos.map((cita, index) => (
                    <div key={index} className="shadow-md rounded-lg">
                        <div className="bg-gray-100 p-4 rounded-t-lg">
                             <h2 className='text-white bg-black text-lg font-bold px-4 py-2 rounded-t-lg' >Cita Programada</h2>
                                <div className='mt-4'>
                                    <h1 className="font-semibold text-black">Fecha: {formatFecha(cita.date)}</h1>
                                    <h1 className="font-semibold text-black">Hora: {formatHora(cita.hora)}</h1>
                                    <h1 className="font-semibold text-black">Nombre del Cliente: {cita.userName}</h1>
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}

export default AgendaProfesional;
