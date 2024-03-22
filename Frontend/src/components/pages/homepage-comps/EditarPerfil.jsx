/* eslint-disable react-hooks/exhaustive-deps */
import NabarMenu from "./NabarMenu";
import { useAuth } from "../../../Autentication/AutProvider";
import { useEffect, useState } from 'react';
import { API_URL } from "../../../Autentication/constanst";
import Swal from 'sweetalert2';


export const EditarPerfil = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [downloadURL, setDownloadURL] = useState("");
  const auth = useAuth();

  const handleNombreChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleTelefonoChange = (event) => {
    setTelefono(event.target.value);
  };

  const handleContrasenaChange = (event) => {
    setContrasena(event.target.value);
  };

  const handleGuardarCambios = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URL}/perfil/${auth.getUser()?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: JSON.stringify({ name, username: email, password: contrasena, telefono }),
      });

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: '¡Cita Agendada Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        console.log('Perfil actualizado exitosamente');
        setModalMessage("Perfil actualizado exitosamente");
        setShowModal(true);
      } else {
        const responseData = await response.json();
        if (response.status === 500) {
          setModalMessage("Usuario o correo ya existente, intente otros datos");
          setShowModal(true);
        }
        else if (response.status === 400) {
          if (responseData.mensaje.includes("contraseña")) {
            setModalMessage("La contraseña debe tener al menos 6 caracteres");
          } else {
            setModalMessage("Intente ingresar otros datos");
          }
        }
        setShowModal(true);
      }
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Ocurrió un error al actualizar.',

      });
      console.error('Error al actualizar el perfil:', error);
      setModalMessage("Error al actualizar el perfil: " + error.message);
      setShowModal(true);
    }
  };

  useEffect(() => {
    getImageProfile();
  }, []);

  async function getImageProfile() {
    try {
      const id = auth.getUser()?.id;
      const response = await fetch(`${API_URL}/getImage/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener la imagen de perfil: ' + response.statusText);
      }

      const data = await response.json();

      if (!data.imageProfile) {
        throw new Error('Error: La respuesta del servidor no contiene la URL de la imagen de perfil');
      }

      setDownloadURL(data.imageProfile);
    } catch (error) {
      const defaultImageUrl = 'https://static.vecteezy.com/system/resources/previews/003/337/584/large_2x/default-avatar-photo-placeholder-profile-icon-vector.jpg';
      setDownloadURL(defaultImageUrl);
      console.error('Error al obtener la imagen de perfil:', error);
    }
  }

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  return (
    <div>
      <NabarMenu />
      <section className="w-full md:h-screen p-4 text-white h-unset flex justify-center items-center">
        <div className="flex flex-col max-w-screen-lg w-4/5 mx-auto relative z-10">
          <div className="pb-4">
            <h2 className="text-4xl font-bold inline border-b-4 border-blue-600 border-opacity-40 sm:text-5xl">Editar Perfil</h2>
          </div>

          <div className="flex justify-between items-center relative z-10 space-y-6">

            <form onSubmit={handleGuardarCambios} className="flex flex-col w-full md:w-1/2 rounded-md p-0 space-y-4" style={{ zIndex: "20" }}>
              <div className="flex flex-col">
                <label htmlFor="name" className="text-white">Nombre:</label>
                <input
                  type="text"
                  id='nombre'
                  value={name}
                  onChange={handleNombreChange}
                  placeholder="Ingrese su nuevo Nombre"
                  className="p-3 bg-transparent border-2 rounded-md text-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-white">Correo Electrónico:</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Ingrese su nuevo Correo Electrónico"
                  className="p-3 bg-transparent border-2 rounded-md text-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="telefono" className="text-white">Teléfono:</label>
                <input
                  type="text"
                  id="telefono"
                  value={telefono}
                  onChange={handleTelefonoChange}
                  placeholder="Ingrese su nuevo Teléfono"
                  className="p-3 bg-transparent border-2 rounded-md text-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="contrasena" className="text-white">Contraseña:</label>
                <input
                  type="password"
                  id="contrasena"
                  value={contrasena}
                  onChange={handleContrasenaChange}
                  placeholder="Ingrese su nueva contraseña"
                  className="p-3 bg-transparent border-2 rounded-md text-white focus:outline-none focus:border-blue-600"
                />
              </div>
              
              <button
                type="submit"
                className="group text-white font-semibold w-fit px-6 py-3 flex items-center rounded-md bg-gradient-to-t from-blue-600 cursor-pointer mx-auto md:mx-0"
              >
                Guardar Cambios
              </button>
            </form>

            <div className="ml-8 relative z-20" style={{ marginBottom: "2rem" }}>
              <img
                src={downloadURL}
                alt="Imagen"
                className="w-32 h-32 object-cover rounded-full"
              />
            </div>
          </div>

        </div>
      </section>
      {showModal && (
        <div className="modal2">
          <div className="modal2-content">
            <p>{modalMessage}</p>
            <button className='accept-btn' onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditarPerfil;
