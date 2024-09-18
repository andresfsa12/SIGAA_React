import { useEffect, useState } from 'react'
import LogoSIGAA from './INDEX/Logo SIGAA.png'
import { Acudientes } from './Acudientes'
import { Estudiante } from './Estudiante'
import { Docente } from './Docente'

function App() {
  const [usuario, setUsuario] = useState()
  const [clave, setClave] = useState('')
  const [rol, setRol] = useState('')
  const [logeado,setLogeado] = useState(false)


  function cambiarUsuario(evento){
    setUsuario(evento.target.value)
  }

  function cambiarClave(evento) {
    setClave(evento.target.value)
  }

  function cambiarRol(evento) {
    setRol(evento.target.value)
  }

 
  async function ingresar() {
    if(rol == 'acudiente'){
      const peticion1 = await fetch('http://localhost:3000/login-Acudiente?N_id=' +usuario+ '&PASSWORD='+ clave, {credentials: 'include'})
        if (peticion1.ok){
          alert(rol);
          alert('Bienvenido '+usuario+' - '+clave);
          setLogeado(true)
  
          }else{
            alert('Usuario o clave incorrecto');
          }
  }else{
    if (rol == 'docente'){
      const peticion2 = await fetch('http://localhost:3000/login-Docente?Id_Docente=' +usuario+ '&Clave='+ clave, {credentials: 'include'})
      alert(rol);
        if (peticion2.ok){
          alert('Bienvenido '+usuario+' - '+clave);
          setLogeado(true)
          }
  }else{
    if(rol == 'estudiante'){
      const peticion3 = await fetch('http://localhost:3000/login-Estudiante?Id_Estudiante=' +usuario+ '&Clave='+ clave, {credentials: 'include'})
      alert(rol);
        if (peticion3.ok){
          alert('Bienvenido '+usuario+' - '+clave);
          setLogeado(true)
    }
   }
  }
}}
    async function validar(){
    peticion = await fetch('http://localhost:3000/validar',{credentials: 'include'} )
      if (peticion.ok){
        setLogeado(true)
      }
    }
    
    useEffect(()=>{
      validar() 
    },[])

    if (logeado && rol=='acudiente') {
      return(
        <>
        <Acudientes/>
      </>);
    }else{
      if (logeado && rol=='docente') {
        return(
          <>
          <Docente/>
        </>);
    }else{
      if (logeado && rol=='estudiante') {
        return(
          <>
          <Estudiante/>
        </>);
    }
  }}
return (
  <body>
    <img className='LogoIndex' src={LogoSIGAA} alt="Logo" width="800px"></img>
    <form>
    <label for="lang"><h1>Rol:</h1></label>
      <select name="rol" id="rol" value={rol} onChange={cambiarRol}>
        <option value="">--Selecciona una opción--</option>
        <option value="acudiente">Acudiente</option>
        <option value="estudiante">Estudiante</option>
        <option value="docente">Docente</option>
      </select>
    <h1>Usuario:</h1> <input placeholder='Identificación' type="text"name="usuario" id="usuario" value={usuario} onChange={cambiarUsuario}/>
    <h1>Contraseña:</h1> <input placeholder='*****' type="password" name="clave" id="clave" value={clave} onChange={cambiarClave}/>
    </form>
    <div className='textbox'>
      
    <button onClick={ingresar} >INICIAR SESIÓN</button>
    </div>
  </body>
  )
}

export default App 