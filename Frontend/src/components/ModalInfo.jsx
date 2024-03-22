/* eslint-disable react/prop-types */

export function ModalInfo({ SelectedProject, closeModal }) {
  const handleClickCloseButton = () => {
    closeModal();
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-opacity-70 bg-black z-40 over">
      <div className="relative bg-white/20 p-2 rounded-lg w-[70%] sm:w-[60%] max-w-[800px] modalCard max-h-[80vh] flex flex-col overflow-y-auto lg:text-lg lg:w-[90%]">
        <div className="overflow-hidden rounded-tl-lg rounded-tr-lg">
          <img
            className="w-full h-auto object-cover"
            src={typeof SelectedProject?.image === 'string' ? SelectedProject?.image : ""}
            alt="Resident image"
          />
        </div>

        <div className="w-full text-white p-8 flex flex-col bg-black/80 border-opacity-70 border-primary-color rounded-bl-lg rounded-br-lg">
          <ul>
            <li>
            <span className="text-blue-600">Descripcion: </span>

              <span>{SelectedProject?.description}</span>
            </li>
            {/* Agrega más elementos aquí según sea necesario */}
          </ul>
        </div>

        <button
          onClick={handleClickCloseButton}
          className="absolute top-3 right-2 lg:right-4 cursor-pointer"
        >
          <i className="bx bx-x-circle bg-black text-blue-600 text-[2.25rem] rounded-full transition-transform duration-300 hover:scale-110"></i>
        </button>
      </div>
    </section>
  );
}

