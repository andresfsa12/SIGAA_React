import React from 'react'
import LogoSIGAA from './INDEX/Logo SIGAA.png'
import Navbar_estudiante from './Componentes/Navbar_estudiante';
import './Componentes/Navbar.css'

export const Estudiante = () => {

  return (
    <>
    <body2>
      <encabezado>
      <img src={LogoSIGAA} alt="Logo" width="100px"></img>
         <h3>PERFIL: ESTUDIANTE</h3>
         <h3>Nombre: Andres Sarmiento</h3>
         <h3>Periódo Académico 1</h3>
      </encabezado>
      <React.Fragment>
        <Navbar_estudiante/>
      </React.Fragment>
    </body2>
    </>
    )
}
