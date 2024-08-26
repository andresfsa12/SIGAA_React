import LogoSIGAA from './INDEX/Logo SIGAA.png'
import Navbar_index from './Componentes/Navbar_index'




function IniciarSesion() {
 
return (
  <>
  <body>
    <Navbar_index/>
    <logoIndex>
    <img src={LogoSIGAA} alt="Logo" width="800px"></img>
    </logoIndex>
    <textbox>
    
    <h1>DSDSrio:</h1> <input type="text"name="usuario" id="usuario" value={usuario} onChange={cambiarUsuario}/>
    <h1>Contraseña:</h1> <input type="password" name="clave" id="clave" value={clave} onChange={cambiarClave}/>
    </textbox>
    <textbox>
    <button onClick={ingresar} >INICIAR SESIÓN</button>
    </textbox>
    </body>
    </>)
}
export default IniciarSesion
