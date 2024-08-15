import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LogoSIGAA from './INDEX/Logo SIGAA.png'
import { Acudiente } from './Componentes/Acudiente'
import { Estudiante } from './Componentes/Estudiante'
import { Docente } from './Componentes/Docente'

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
          if (usuario == 'acudiente' && clave == 'acudiente'){
            alert('Usuario acudiente')
            setLogeado(true)
          }else{
          alert('Usuario o clave incorrecto')
        }}}}
  
  if (logeado && usuario == 'docente') {
    return(
      <>
      <Docente/>
    </>);
      }else{
        if (logeado && usuario == 'estudiante') {
          return(
            <>
            <Estudiante/>
            </>);
            }else{
            if (logeado && usuario == 'acudiente') {
              return(
                <>
                <Acudiente/>
                </>);  
          }}}
return (
  <>
    <img src={LogoSIGAA} alt="Logo" width="800px"></img><br/><br/>
    Usuario: <input type="text"name="usuario" id="usuario" value={usuario} onChange={cambiarUsuario}/><br/>
    Contraseña: <input type="password" name="clave" id="clave" value={clave} onChange={cambiarClave}/><br/><br/>
    <button onClick={ingresar} >INICIAR SESIÓN</button>
    </>)
}
export default App
