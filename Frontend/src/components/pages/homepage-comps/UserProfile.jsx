  /* eslint-disable react-hooks/exhaustive-deps */
  /* eslint-disable no-unused-vars */
  /* eslint-disable react/prop-types */
  /* eslint-disable no-undef */
  import './perfil.css';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faImage, faPen, faThumbsUp, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
  import { useEffect, useState } from 'react';
  import { useAuth } from '../../../Autentication/AutProvider';
  import { API_URL } from '../../../Autentication/constanst';
  import { ModalInfo } from '../../ModalInfo';
  import { useRef } from 'react';
  import Modal from 'react-modal'
  import './style.css'
  import Swal from 'sweetalert2';




  const UserProfile = () => {
    const [downloadURL, setDownloadURL] = useState("");
    const [, setEditingProfileImage] = useState(false);
    const [downloadURLPortada, setDownloadURLPortada] = useState("");
    const [description, setDescription] = useState("");
    const fileInputRef = useRef(null); // Utiliza useRef() para crear referencias
    const descriptionTextareaRef = useRef(null);
    const [publicaciones, setPublicaciones] = useState([]);
    const [publicacionesUsuarios, setPublicacionesUsuarios] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [currenImage, setCurrenImage] = useState('')
    const [idPublicacion, setCurrentPublicationId] = useState('')
    const [agendarModalIsOpen, setAgendarModalIsOpen] = useState(false);
    const [name, setName] = useState('')
    const [eliminar, setEliminar] = useState('')
    const [fechas, setfecha] = useState(Date)
    const [horas, setHoras] = useState('')
    const [descripcionCita, setDescripcionCita] = useState('');
    const [descripcionP, setdeProfesion] = useState('')
    const [selectedProject, setSelectedProject] = useState(null);
    const [transparentBackground, setTransparentBackground] = useState(false);
    const [profesionalesId ,setIdP] = useState('')



    const auth = useAuth();
    useEffect(() => {
      getImageProfile();// Llama a la función para obtener la imagen de perfil cuando el componente se monta
      // eslint-disable-next-line react-hooks/exhaustive-deps
      getImagePortda();
      obtenerTodasLasPublicaciones();
      getPublishAllUsers();
      deleteHandler(eliminar)
      

    }, []);
    const modalHandlerAgendar = (isOpenAge, date, hora, descripcionCita, nombre, ProfesionalId) => {
      setAgendarModalIsOpen(isOpenAge)
      setfecha(date)
      setHoras(hora)
      setdeProfesion(descripcionCita)
      setName(nombre)
      setIdP(ProfesionalId)
    }

    // Función para abrir el modal con el proyecto seleccionado
    const openModal = (image, description) => {
      setSelectedProject({ image, description });
      console.log('modal abierto');
    };

    // Función para cerrar el modal
    const closeModal = () => {
      setSelectedProject(false);
      console.log('modal cerrado ');
    };

    function getTimeElapsed(publishedAt) {
      const currentDate = new Date();
      const postDate = new Date(publishedAt);
      const timeDifference = currentDate.getTime() - postDate.getTime();
      const secondsElapsed = Math.floor(timeDifference / 1000);
      // TIEMPO DE PUBLICACION
      if (secondsElapsed < 60) {
        return `${secondsElapsed} segundos`;
      } else if (secondsElapsed < 3600) {
        const minutes = Math.floor(secondsElapsed / 60);
        return `${minutes} minutos`;
      } else if (secondsElapsed < 86400) {
        const hours = Math.floor(secondsElapsed / 3600);
        return `${hours} horas`;
      } else {
        const days = Math.floor(secondsElapsed / 86400);
        return `${days} días`;
      }
    }


    //METODO POST DE  IMAGEN DE PERFIL
    async function handleProfileImageChange(files) {
      try {
        if (!files || files.length === 0) {
          console.error("No se seleccionó ningún archivo");
          return;
        }

        const file = files[0];
        const formData = new FormData();
        formData.append("file", file);
        console.log('post TOKEN ', auth.getAccessToken());


        // Subir la nueva imagen
        const responsePost = await fetch(`${API_URL}/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.getAccessToken(
            )}`,
          },
          body: formData,
        });
        console.log('POST perfil ', responsePost);

        if (!responsePost.ok) {
          console.error(
            "Error al cambiar la imagen de perfil:",
            responsePost.statusText
          );
          return;
        }

        const data = await responsePost.json();
        console.log("Respuesta del servidor POST:", data.downloadURL);

        // Después de cargar la nueva imagen, actualizar la imagen de perfil
        setDownloadURL(data.downloadURL);
        getImageProfile()
      } catch (error) {
        console.error("Error al cambiar la imagen de perfil:", error);
      }
    }
    // OCTENER IMAGEN DE PERFIL
    async function getImageProfile() {
      try {
        console.log('este es el token => ', auth.getAccessToken());
        const id = auth.getUser()?.id

        console.log('ID of user Profile', id);
        const response = await fetch(`${API_URL}/getImage/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
        });
        console.log('GET perfil', response);

        if (!response.ok) {
          throw new Error('Error al obtener la imagen de perfil: ' + response.statusText);
        }

        const data = await response.json();
        console.log('==> este es data de get', data);

        if (!data.imageProfile) { // Cambio aquí de data.downloadURL a data.imageProfile
          throw new Error('Error: La respuesta del servidor no contiene la URL de la imagen de perfil');
        }

        setDownloadURL(data.imageProfile); // Cambio aquí de data.downloadURL a data.imageProfile
        console.log('URL de la imagen de perfil obtenida:', data.imageProfile); // Cambio aquí de data.downloadURL a data.imageProfile
      } catch (error) {
        const defaultImageUrl = 'https://static.vecteezy.com/system/resources/previews/003/337/584/large_2x/default-avatar-photo-placeholder-profile-icon-vector.jpg'; // Reemplaza con la URL de tu imagen por defecto
        setDownloadURL(defaultImageUrl)
        console.error('Error al obtener la imagen de perfil:', error);
      }
      //
    }
    //POST DE IMAGEN DE PORTADA
    async function handlePortdaImageChange(files) {
      try {
        if (!files || files.length === 0) {
          console.error("No se seleccionó ningún archivo");
          return;
        }

        const file = files[0];
        const formData = new FormData();
        formData.append("file", file);
        console.log('post TOKEN ', auth.getAccessToken());


        // Subir la nueva imagen
        const responsePost = await fetch(`${API_URL}/portada`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
          body: formData,
        });
        console.log('POST perfil ', responsePost);

        if (!responsePost.ok) {
          console.error(
            "Error al cambiar la imagen de perfil:",
            responsePost.statusText
          );
          return;
        }

        const data = await responsePost.json();
        console.log("Respuesta del servidor POST:", data.downloadURLPortada);

        // Después de cargar la nueva imagen, actualizar la imagen de perfil
        setDownloadURLPortada(data.downloadURLPortada);
        getImagePortda()
      } catch (error) {
        console.error("Error al cambiar la imagen de perfil:", error);
      }
    }
    //OCTENER IMAGEN DE PORTADA
    async function getImagePortda() {
      try {
        console.log('este es el token => ', auth.getAccessToken());
        const id = auth.getUser()?.id

        console.log('ID of user Profile', id);
        const response = await fetch(`${API_URL}/portadaGet/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
        });
        console.log('GET perfil', response);

        if (!response.ok) {
          throw new Error('Error al obtener la imagen de portdad: ' + response.statusText);
        }

        const data = await response.json();
        console.log('==> este es data de get portada', data);
        console.log('imagen de portada', data.portada);
        if (!data.portada) { // Cambio aquí de data.downloadURL a data.imageProfile
          throw new Error('Error: La respuesta del servidor no contiene la URL de la imagen de perfil');
        }

        setDownloadURLPortada(data.portada); // Cambio aquí de data.downloadURL a data.imageProfile
        console.log('URL de la imagen de portad obtenida:', data.portada); // Cambio aquí de data.downloadURL a data.imageProfile
      } catch (error) {
        console.error('Error al obtener la imagen de portada:', error);
      }
      //
    }
    //POST PUBLICACION
    async function postPublication(event) {
      event.preventDefault();

      try {
        const formData = new FormData();

        // Obtener el archivo seleccionado del input de tipo file
        const files = fileInputRef.current?.files;

        // Obtener el valor del textarea
        const description = descriptionTextareaRef.current?.value;

        // Agregar la descripción al FormData
        formData.append('description', description || '');

        if (!files || files.length === 0) {
          console.error('No se han seleccionado archivos.');
          return;
        }

        // Agregar el archivo al FormData
        for (let i = 0; i < files.length; i++) {
          formData.append('file', files[i]);
        }

        const accessToken = auth.getAccessToken();
        console.log('Token de publicacion', accessToken);

        const response = await fetch(`${API_URL}/publicationpost`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        });

        console.log('POST publicacion:', response);

        if (!response.ok) {
          console.error("Error al cargar la imagen de publicación:", response.statusText);
          return;
        }

        const data = await response.json();

        console.log("Respuesta del servidor al subir publicacion POST:", data);

        // Actualizar la lista de publicaciones después de la publicación exitosa
        obtenerTodasLasPublicaciones();
        getPublishAllUsers();

        // Realizar cualquier acción necesaria después de cargar la nueva publicación
        // setFile(data.file);
        fileInputRef.current.value = ''; // Limpiar el input de tipo file
        setDescription('');
        console.log('url de imagen publicada',);

      } catch (error) {
        console.error("Error al cargar la imagen publicada:", error);
      }
    }
    //ODTENER TODAS LAS PUBLICACIONES DE UN SOLO USUARIO
    const obtenerTodasLasPublicaciones = async () => {
      try {
        const accessToken = auth.getAccessToken();
        console.log('token de obtener la publiblocaciones ', accessToken);
        console.log('elemetos de user', auth.getUser());



        const id = auth.getUser()?.id
        console.log('ID of user de PUBLICACIONES', id);
        const response = await fetch(`${API_URL}/publicationget/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('GET publicaciones', response);

        if (!response.ok) {
          throw new Error('Error al obtener todas las publicaciones');
        }
        const data = await response.json();
        console.log('data de toadas las publicaciones ', data);
        // Ordenar las publicaciones por fecha de forma descendente
        const publicacionesOrdenadas = data.publications.slice().reverse();


        console.log('Todas las publicaciones', publicacionesOrdenadas);
        setPublicaciones(publicacionesOrdenadas);

      } catch (error) {
        if (typeof error === 'string') {
          setError(error);
        } else {
          console.log("error al treer la publicacion");
          await Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Ocurrió un error al mostrar la publicacion.',

          });
        }
      }
    };
    //MODAL DE PUBLICACION
    const modalHandler = (isOpen, image, publicationId, descripcion, nombre) => {
      setModalIsOpen(isOpen)
      setCurrenImage(image)
      setCurrentPublicationId(publicationId);
      setDescription(descripcion);
      setName(nombre);
      setTransparentBackground(true);
    }
    //OCTENER PUBLICIONES DE TODOS LOS USUARIOS
    const getPublishAllUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/publicationgetAll`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        console.log('publicaciones de todos los usrios', response);

        if (!response.ok) {
          throw new Error('Error al obtener todas las publicaciones all');
        }
        const data = await response.json();

        // Ordenar las publicaciones por fecha de forma descendente
        const publicacionesOrdenadas = data.publications.slice().reverse();

        console.log('estas son las puplicaiones en el orden que se debe revisar all', publicacionesOrdenadas);
        setPublicacionesUsuarios(publicacionesOrdenadas);
        console.log('este es data de la publicacion traida todos ', publicacionesOrdenadas);
      } catch (error) {
        if (typeof error === 'string') {
          setError(error);
        } else {
          console.log("error al treer la publicacion all");
          await Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Ocurrió un error al traer las publicaciones.',

          });
        }
      }
    };
  
    //ELIMINAR PUBLICACION 
    const deleteHandler = async (idPublicacion) => {
      try {

        const imageIDToDelete = idPublicacion
        setEliminar(imageIDToDelete)
        if (!imageIDToDelete) {
          console.error('No se encontró el ID de la imagen actual en las publicaciones del usuario.');
          return;
        }

        // Realizar la eliminación de la imagen utilizando su ID
        const idUser = auth.getUser()?.id;
        const response = await fetch(`${API_URL}/delete/${idUser}/publications/${imageIDToDelete}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al eliminar la imagen.');
        }
        await Swal.fire({
          icon: 'success',
          title: '¡Imagen eliminada exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        obtenerTodasLasPublicaciones()
        getPublishAllUsers()
        // Aquí puedes realizar cualquier actualización de estado o acción necesaria después de la eliminación

      } catch (error) {
        console.error('Error al eliminar la imagen:', error);
        await Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Ocurrió un error al eliminar la imagen. Por favor, inténtalo de nuevo más tarde.',
          confirmButtonText: 'OK'
        });
      }
    };
    const handleAgendarCita = async (event) => {
      event.preventDefault();

      try {
        const formData = {
          profesionalId:profesionalesId,
          nombre: name,
          nombreCliente: auth.getUser()?.name,
          description: descripcionCita,
          date: fechas,
          hora: horas,
          userId: idPublicacion,
          id: auth.getUser()?.id  // Asegúrate de obtener este valor de donde corresponda
        };

        const response = await fetch(`${API_URL}/citas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Error al agendar la cita');
        }

        const data = await response.json();
        await Swal.fire({
          icon: 'success',
          title: '¡Cita Agendada Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        console.log('Cita agendada satisfactoriamente:', data);
        // Aquí puedes realizar cualquier acción adicional después de agendar la cita, como mostrar un mensaje de éxito.
      } catch (error) {
        console.error('Error al agendar la cita:', error);
        await Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Ocurrió un error al Agendar la Cita. Por favor, inténtalo de nuevo más tarde.',

        });
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje de error al usuario.
      }
    };

    return (
      <div name='Perfil'
        className='profile-container relative  '><section className="seccion-perfil-usuario ">
          <div className="perfil-usuario-header">
            <div className="perfil-usuario-portada " style={{ margin: 30 }} >
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={(e) => handleProfileImageChange(e.target.files)}
              />
              <div className="perfil-usuario-avatar relative z-10" onClick={() => setEditingProfileImage(true)}>
                <img src={downloadURL} alt="img-avatar" className="avatar-img " />
                <label htmlFor="fileInput" style={{ background: 'black' }}
                  className="boton-avatar flex items-center justify-center"
                  onClick={(e) => handleProfileImageChange(e.target.files)}>
                  <FontAwesomeIcon icon={faImage} />
                </label>
              </div>

              <input
                type="file"
                id="PortadaInput"
                style={{ display: 'none' }}
                onChange={(e) => handlePortdaImageChange(e.target.files)}
              />

              <img src={downloadURLPortada} alt="img-portada" className="portada " />
              <label htmlFor="PortadaInput" className="boton-portada" >
                <FontAwesomeIcon icon={faImage} /> Cambiar fondo
              </label>
            </div>
          </div>
          <div className="perfil-usuario-body1" style={{ width: '50%', backgroundColor: 'black', color: 'white', padding: '20px', borderRadius: '10px' }}>
            <div className="perfil-usuario-bio" style={{ display: 'flex', flexDirection: 'column', background: "transparent" }}>
              <div>
                <h2 className='infor'>Información Personal:</h2>
              </div>
              <div>
                <h2 className='info'>Tipo de usuario: {auth.getUser()?.roll}</h2>
              </div>
              <div>
                <h2 className="Info">Nombre: {auth.getUser()?.name}</h2>
              </div>
              <div>
                <p className="info">Número de celular: {auth.getUser()?.telefono}</p>
              </div>
              <div>
                <p className="info">Correo Electrónico: {auth.getUser()?.username}</p>
              </div>
            </div>

            {auth.getUser().roll === "Profesional" ? (<div className="Post-potfile">
              <h1 className="texto">Publicaciones {publicaciones.length}</h1>
            </div>) : null}

          </div>
          {auth.getUser().roll === "Profesional" ? (<div className="area-comentar" style={{ height: '20vh' }}>
            <div className="avatar">
              <img src={downloadURL} alt="img" />
            </div>
            {/* {seccion formulario publicacion} */}
            <form className="inputs-comentarios" encType="multipart/form-data" onSubmit={postPublication}>
              <div className="textarea-container">
                <textarea
                  name=""
                  className="area-comentario text-black"
                  placeholder="Descripcion del Servicio"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  ref={descriptionTextareaRef}
                  style={{ padding: 2 }}
                ></textarea>
              </div>
              <div className="botones-comentar flex justify-between items-center">
                <div className="boton-subir-archivo">
                  <label className="group text-white font-semibold w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-t from-blue-600 cursor-pointer mx-auto md:mx-0">
                    Adjuntar archivo
                    <input type="file" ref={fileInputRef} name="file" id="adjuntar" className="hidden" />
                  </label>
                </div>
                <button className="group text-white font-semibold w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-t from-blue-600 cursor-pointer mx-auto md:mx-0" type="submit">
                  Enviar
                </button>
              </div>
            </form>
          </div>) : null}


          {/* {puplicaiones personales} */}

          <div className='publicacion-cometario '>
            {console.log(publicaciones)}
            {publicaciones.map((publicacion, index) => (
              <div className="publicacion-realizada" key={index}>
                <div className="usuario-publico">
                  <div className="avatar">
                    <img src={downloadURL || 'https://static.vecteezy.com/system/resources/previews/003/337/584/large_2x/default-avatar-photo-placeholder-profile-icon-vector.jpg'} alt="img" />
                  </div>
                  <div className="contenido-publicacion">
                    <div>
                      <h4>{auth.getUser()?.name}</h4>
                      <button onClick={() => { modalHandler(true, publicacion?.image, publicacion?.id, publicacion?.description, publicacion?.name) }} className='btn-modal'>Ver</button>
                    </div>
                    <ul style={{ paddingTop: 4 }}>
                      <li>Hace {getTimeElapsed(publicacion.createdAt)}</li>
                    </ul>
                  </div>
                  <div className="menu-comentario">
                    <FontAwesomeIcon icon={faPen} />
                    <ul className="menu">
                      <button className=''>Editar</button>
                      <button className='' onClick={() => deleteHandler(publicacion.id)}>Eliminar</button>
                    </ul>
                  </div>
                </div>
                <p className='descripcion'>{publicacion.description}</p>
                <div className="archivo-publicado py-6">
                  <img src={publicacion.image} />
                </div>
                <div className="botones-comentario">
                  <button type="" className="boton-puntuar">
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <p>45</p>
                  </button>
                  <button type="" className="boton-responder">
                    Comentar
                  </button>
                </div>
              </div>
            ))}
          </div>



          <div style={{ height: 50 }}></div>
          {/* todas las publicaciones */}
        </section>
        {auth.getUser()?.roll === 'Cliente' && (<><section className='seccion-perfil-usuario' id='galeri'>
          <ul className='publicacion-cometario '>
            {Array.isArray(publicacionesUsuarios) && publicacionesUsuarios.map((usuarioPublicaciones, index) => (
              Array.isArray(usuarioPublicaciones) && usuarioPublicaciones.map((publicacion, subIndex) => (
                <li className='publicacion-realizada' key={`${index}-${subIndex}`}>
                  <div className='usuario-publico  publicacionesall'>
                    <div className='flex items-center gap-1'>
                      <div className='avatar'>
                        <img src={publicacion.imageProfile || 'https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg'} alt="" />
                      </div>
                      <div className='flex flex-col font-sans font-arial'>
                        {console.log('este es el ID del profesional',publicacion.profesionalId)}
                        <div className='flex'>
                          <h2 className='nameUser px-3'>{(publicacion.name) ?? ""}</h2>
                        </div>
                        <ul style={{ paddingTop: 4 }}>
                          <li className='px-3' style={{ fontSize: "14px" }}>Hace {getTimeElapsed(publicacion.createdAt)}</li>
                        </ul></div></div>
                    <div className="flex flex-row justify-center gap-4">
                      <button
                        onClick={() => openModal(true,publicacion?.description, publicacion?.image )} 
                        className="group text-white font-semibold w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-t from-blue-600 cursor-pointer mx-auto md:mx-0 p-3 rounded-md'
                        onClick={() => modalHandlerAgendar(true, fechas, horas, descripcionP, publicacion.name"
                      >
                        Ver
                      </button>
                      <button
                        className='group text-white font-semibold w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-t from-blue-600 cursor-pointer mx-auto md:mx-0 p-3 rounded-md'
                        onClick={() => modalHandlerAgendar(true, fechas, horas, descripcionP, publicacion.name)}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} className='px-2' />Agendar
                      </button>
                    </div>
                  </div>
                  <p className='decription py-2'>{publicacion?.description}</p>
                  <div className='archivo-publicado py-6'>
                    <img className=' ' src={publicacion?.image} alt="" />
                  </div>
                  <div className="botones-comentario" style={{ marginTop: 12 }}>
                    <button
                      type=""
                      className="text-white font-semibold w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-t from-blue-600 cursor-pointer mx-auto md:mx-0 p-3 rounded-md"
                      style={{ display: 'flex', gap: 5, padding: '12px' }}
                    >
                      <FontAwesomeIcon icon={faThumbsUp} style={{ marginLeft: 2 }} />
                      <p>45</p>
                    </button>
                    <button
                      type=""
                      className="text-white font-semibold w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-t from-blue-600 cursor-pointer mx-auto md:mx-0 p-3 rounded-md"
                    >
                      Comentar
                    </button>
                  </div>

                  {/* <button className='citas'></button><h4>AGENDA</h4> */}
                </li>
              ))
            ))}
          </ul>
          <div style={{ height: 100 }}></div>

        </section>

          {selectedProject && <ModalInfo SelectedProject={selectedProject} closeModal={closeModal} />}
          <Modal isOpen={agendarModalIsOpen} onRequestClose={() => modalHandlerAgendar(false, '', '', '', '')}>
    <section className="fixed inset-0 flex items-center justify-center bg-opacity-70 bg-black z-40 over">
      <div className="relative bg-white/20 p-2 rounded-lg w-[70%] sm:w-[60%] max-w-[600px] modalCard max-h-[80vh] flex flex-col overflow-y-auto lg:text-lg lg:w-[90%]">
        <div className="overflow-hidden rounded-tl-lg rounded-tr-lg">
          {/* Aquí puedes insertar la imagen de acuerdo a tu lógica */}
        </div>

        <div className="w-full text-white p-10 flex flex-col bg-black/80 border-opacity-70 border-primary-color rounded-bl-lg rounded-br-lg">
          <h5 className="text-white mx-4 ">Agendar Cita Con: {name || 'sin nombre'}</h5>
          <form onSubmit={handleAgendarCita} className="p-4">
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-white-700">Fecha:</label>
              <input type="date" className="form-control mt-1 p-2 border rounded-md w-full text-black" id="date" name="date" value={fechas} onChange={(e) => setfecha(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label htmlFor="time" className="block text-sm font-medium text-white-700">Hora:</label>
              <input type="time" className="form-control mt-1 p-2 border rounded-md w-full text-black" id="time" name="time" value={horas} onChange={(e) => setHoras(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-white-700">Descripción:</label>
              <textarea className="form-control mt-1 p-2 border rounded-md w-full text-black" id="description" name="description" value={descripcionCita} onChange={(e) => setDescripcionCita(e.target.value)} required></textarea>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="text-white font-semibold w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-t from-blue-600 cursor-pointer mx-auto md:mx-0 p-3 rounded-md">Agendar</button>
            </div>
          </form>
        </div>

        <button onClick={() => modalHandlerAgendar(false, '', '', '', '')} className="absolute top-3 right-2 lg:right-4 cursor-pointer">
          <i className="bx bx-x-circle bg-black  text-[2.25rem] rounded-full transition-transform duration-300 hover:scale-110"></i>
        </button>
      </div>
    </section>
  </Modal>


        </>)}
        <Modal className='fixed inset-0 flex items-center justify-center bg-opacity-70 bg-black z-40 over'  isOpen={modalIsOpen} onRequestClose={() => modalHandler(false, '', '', '', '',)}>
          <div className="relative bg-white/20 p-2 rounded-lg w-[70%] sm:w-[60%] max-w-[800px] modalCard max-h-[80vh] flex flex-col overflow-y-auto lg:text-lg lg:w-[90%]">
            <div className="overflow-hidden rounded-tl-lg rounded-tr-lg">
            <img className='w-full h-auto object-cover' src={currenImage || ''} alt="" />
            </div>
            <div className='w-full text-white p-8 flex flex-col bg-black/80 border-opacity-70 border-primary-color rounded-bl-lg rounded-br-lg'>
              <ul>
                <li>
                  <span className='text-blue-600'>Descripcion:</span>
                  <span>{description}</span>
                </li>
              </ul>
            </div>
              <button className='absolute top-3 right-2 lg:right-4 cursor-pointer' onClick={() => modalHandler(false, '', '', '', '')}>
                <li className='bx bx-x-circle bg-black text-blue-600 text-[2.25rem] rounded-full transition-transform duration-300 hover:scale-110'></li>
              </button>
            </div>
            
          
        </Modal>

      </div>

    );
  }

  export default UserProfile;