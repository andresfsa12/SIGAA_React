import { useEffect, useState } from 'react'
import LogoSIGAA from './INDEX/Logo SIGAA.png'
import { Acudientes } from './Acudientes'
import { Estudiante } from './Estudiante'
import { Docente } from './Docente'
import UserContext from './Contexto/UserContext'
import axios from 'axios';

export function App() {

  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [rol, setRol] = useState('')
  const [logueado,setLogueado] = useState(false)

  const infoUser = usuario;

  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const response = await axios.get('http://localhost:3000/verificar-sesion', {
          withCredentials: true,
        });
        if (response.data.logueado) {
          setUsuario(response.data.usuario);
          setRol(response.data.rol);
          setLogueado(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    verificarSesion();
  }, []); // Ejecutar solo al montar el componente

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
    try {
      let response;
      if (rol === 'acudiente') {
        response = await axios.get('http://localhost:3000/login-Acudiente', {
          params: { N_id: usuario, PASSWORD: clave },
          withCredentials: true,
        });
      } else if (rol === 'docente') {
        response = await axios.get('http://localhost:3000/login-Docente', {
          params: { Id_Docente: usuario, Clave: clave },
          withCredentials: true,
        });
      } else if (rol === 'estudiante') {
        response = await axios.get('http://localhost:3000/login-Estudiante', {
          params: { Id_Estudiante: usuario, Clave: clave },
          withCredentials: true,
        });
      } else {
        alert('Selecciona un rol');
        return;
      }

      if (response.data.logueado) {
        alert(rol);
        alert('Bienvenido ' + usuario + ' - ' + clave);
        setLogueado(true);
      }
    } catch (error) {
      alert('Usuario o clave incorrecto');
      console.error(error);
    }
  }

  async function cerrarSesion() {
    try {
      await axios.post('http://localhost:3000/logout', {}, {
        withCredentials: true,
      });
      setLogueado(false);
      setUsuario('');
      setClave('');
      setRol('');
    } catch (error) {
      console.error(error);
    }
  }

    
    if (logueado && rol=='acudiente' ) {
      return(
        <>
        <UserContext.Provider value={infoUser}>
        <button onClick={cerrarSesion}>Cerrar sesión</button> {/* Botón para cerrar sesión */}
        <Acudientes/>
        </UserContext.Provider>
      </>);
    }else{
      if (logueado && rol=='docente') {
        return(
          <>
          <UserContext.Provider value={infoUser}>
          <button onClick={cerrarSesion}>Cerrar sesión</button> {/* Botón para cerrar sesión */}
          <Docente/>
          </UserContext.Provider>
        </>);
    }else{
      if (logueado && rol=='estudiante') {
        return(
          <>
        <UserContext.Provider value={infoUser}>
        <button onClick={cerrarSesion}>Cerrar sesión</button> {/* Botón para cerrar sesión */}
        <Estudiante/>
        </UserContext.Provider>
        </>);
    }else{
      <App/>
    }
  }}
return (
  <div className='body'>
    <img className='LogoIndex' src={LogoSIGAA} alt="Logo" width="800px"></img>
    <form>
    <label htmlFor='rol'><h1>Rol:</h1></label>
      <select name="rol" id="rol" value={rol} onChange={cambiarRol}>
        <option value="">--Selecciona una opción--</option>
        <option value="acudiente">Acudiente</option>
        <option value="estudiante">Estudiante</option>
        <option value="docente">Docente</option>
      </select>
    <h1>Usuario:</h1> <input placeholder='Identificación' type="text"  name="usuario"  
                value={usuario} onChange={cambiarUsuario} />
    <h1>Contraseña:</h1> <input placeholder='*****' type="password" 
                name="clave" id="clave" value={clave} onChange={cambiarClave}/>
    </form>
    
    <div className='textbox'>
    <button type='submit' onClick={ingresar} >INICIAR SESIÓN</button>
    </div>
  </div>
  )
}

export default App 