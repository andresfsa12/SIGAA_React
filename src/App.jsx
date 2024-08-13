import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LogoSIGAA from './INDEX/Logo SIGAA.png'

function App() {
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [logeado,setLogeado] = useState(false)

  function cambiarUsuario(evento){
    setUsuario(evento.target.value)
  }

  function cambiarClave(evento) {
    setClave(evento.target.value)
  }

  function ingresar() {
    if (usuario == 'docente' && clave == 'docente'){
        alert('Usuario docente')
        setLogeado(true)
    }else{
        if (usuario == 'estudiante' && clave == 'estudiante'){
          alert('Usuario estudiante')
          setLogeado(true)
        }else{
          alert('Usuario o clave incorrecto')
        }}} 
  
  if (logeado && usuario == 'docente') {
    return(
      <>
      PERFIL DOCENTE <br/>
      <img src={LogoSIGAA} alt="Logo" width="200px"></img>
      <h3>Docente Lina Maria Giraldo</h3>
      <h3>PERIÓDO ACADÉMICO 1</h3>
      <h3>3 Febrero - 15 Marzo</h3>
      <button name="logout" id="btn-logout1"> Cerrar Sesión </button>
      
</>);
      }else{
        if (logeado && usuario == 'estudiante') {
          return(
            <>
            PERFIL ESTUDIANTE <br/>
            <img src={LogoSIGAA} alt="Logo" width="200px"></img>
            <h3>Estudiante Andres Fabian Sarmiento</h3>
            <h3>PERIÓDO ACADÉMICO 1</h3>
            <h3>3 Febrero - 15 Marzo</h3>
            <button name="logout" id="btn-logout1"> Cerrar Sesión </button>
            </>)}}
return (
  <>
    <img src={LogoSIGAA} alt="Logo" width="800px"></img><br/><br/>
    Usuario: <input type="text"name="usuario" id="usuario" value={usuario} onChange={cambiarUsuario}/><br/>
    Contraseña: <input type="password" name="clave" id="clave" value={clave} onChange={cambiarClave}/><br/><br/>
    <button onClick={ingresar} >INICIAR SESIÓN</button>
    </>)
}
export default App
