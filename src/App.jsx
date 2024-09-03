import { useEffect, useState } from 'react'
import LogoSIGAA from './INDEX/Logo SIGAA.png'
import { Acudientes } from './Acudientes'
import { Docente } from './Docente'
import { Estudiante } from './Estudiante'



function App() {
  const [usuario, setUsuario] = useState()
  const [clave, setClave] = useState('')
  const [logeado,setLogeado] = useState(false)

  function cambiarUsuario(evento){
    setUsuario(evento.target.value)
  }

  function cambiarClave(evento) {
    setClave(evento.target.value)
  }

  async function ingresar() {
    const peticion = await fetch('http://localhost:3000/mydb?N_id=' +usuario+ '&PASSWORD='+ clave, {credentials: 'include'})
    if (peticion.ok){
      alert('Bienvenido '+usuario+' - '+clave);
      setLogeado(true)
    }else{
      alert('Usuario o clave incorrecto')
    }}
    // if (usuario == 'docente' && clave == 'docente'){
    //     alert('Usuario docente')
    //     setLogeado(true)
    // }else{
    //     if (usuario == 'estudiante' && clave == 'estudiante'){
    //       alert('Usuario estudiante')
    //       setLogeado(true)
    //     }else{
    //       if (usuario == 'acudiente' && clave == 'acudiente'){
    //         alert('Usuario acudiente')
    //         setLogeado(true)
    //       }else{
    //       alert('Usuario o clave incorrecto')
    //     }}}
    async function validar(){
      const peticion = await fetch('http://localhost:3000/validar',{credentials: 'include'} )
      if (peticion.ok){
        setLogeado(true)
      }
    }
    
    useEffect(()=>{
      validar() 
    },[])

    if (logeado) {
    return(
      <>
      <Acudientes/>
    </>);
      }
        // if (logeado && usuario == 'estudiante') {
        //   return(
        //     <>
        //     <Estudiante/>
        //     </>);
        //     }else{
        //     if (logeado && usuario == 'acudiente') {
        //       return(
        //         <>
        //         <Acudiente/>
        //         </>);  
        //   }}

return (
  <body>
    <img className='LogoIndex' src={LogoSIGAA} alt="Logo" width="800px"></img>
    
    <div className='textbox'>
    <h1>Usuario:</h1> <input placeholder='Identificación' type="text"name="usuario" id="usuario" value={usuario} onChange={cambiarUsuario}/>
    <h1>Contraseña:</h1> <input placeholder='*****' type="password" name="clave" id="clave" value={clave} onChange={cambiarClave}/>
    </div>
    <div className='textbox'>
    <button onClick={ingresar} >INICIAR SESIÓN</button>
    </div>
  </body>
)
}
export default App 
 