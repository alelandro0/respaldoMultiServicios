import Daniela from "../../../../public/images/videosImages/DanielaImage.jpeg";
import Torres from "../../../../public/images/videosImages/TorresImage.jpeg"
import AlejandroG from "../../../../public/images/videosImages/AlejandroGImage.jpeg"
import AlejoO from "../../../../public/images/videosImages/AlejoOImage.jpeg"

const Edition = () => {
    return (
        <section name="Edition" className='relative text-white p-4 py-10 grid gap-10 sm:grid-cols-2 max-w-[100%] mx-auto max-h-[100vh] pt-[130px] ' style={{ overflowY: 'auto' }}>
            {/* Seccion izquierda */}
            <section className='grid gap-10'>   
                <div>
                    <h3 className='text-sm text-blue-400'>Equipo De Trabajo</h3>
                    <h2 className='text-3xl font-semibold mt-2'>MultiServicios</h2>
                </div>

                <article className='bg-gray-d relative border-[1px] border-primary-color/30 rounded-lg overflow-hidden'>
                    <div>
                        <img src={AlejandroG} alt="reel-diego" loading='lazy' />
                    </div>
                    <section className='p-6'>
                        <h4>Alejandro Giraldo</h4>
                        <p className='text-gray-400 text-md mt-2'>Desarrollador FullStack , Edad 33 años,nacionalidad Colombiana.  </p>
                        
                    </section>
                </article>

                <article className='bg-gray-d relative border-[1px] border-primary-color/30 rounded-lg overflow-hidden'>
                    <div>
                        <img src={Daniela} alt="informal employment" loading='lazy' />
                    </div>
                    <section className='p-6'>
                        <h4>Daniela Osorio</h4>
                        <p className='text-gray-400 text-md mt-2'>Desarrolladora backend y Documentación , Edad 26 años , Colombiana </p>
                        
                    </section>
                </article>
            </section>

            {/* Seccion derecha */}
            <section className='grid gap-10'>
            <article className='bg-gray-d relative border-[1px] border-primary-color/30 rounded-lg overflow-hidden'>
                    <div>
                        <img src={Torres} alt="macroeconomics" loading='lazy' />
                    </div>
                    <section className='p-6'>
                        <h4>Juan David Torres</h4>
                        <p className='text-gray-400 text-md mt-2'>Desarrollador FrontEnd , Edad 21 años , Colombiano</p>
                        
                    </section>
                </article>

                <article className='bg-gray-d relative border-[1px] border-primary-color/30 rounded-lg overflow-hidden'>
                    <div>
                        <img src={AlejoO} alt="burger day" loading='lazy' />
                    </div>
                    <section className='p-6'>
                        <h4>Alejandro Osorio</h4>
                        <p className='text-gray-400 text-md mt-2'>Desarrollador Backend, Edad 24 , Venezolano</p>
                        
                    </section>
                </article>

                
            </section>
        </section>
    )
}

export default Edition;
