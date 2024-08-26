import React from 'react'
import LogoSIGAA from './INDEX/Logo SIGAA.png'
import Navbar_docente from './Componentes/Navbar_docente';

export const Docente = () => {
  return (
      <body2>
      <encabezado>
      <img src={LogoSIGAA} alt="Logo" width="100px"></img>
         <h3>PERFIL: DOCENTE</h3>
         <h3>Nombre: Henry Vanegas Plazas</h3>
         <h3>Periódo Académico 1</h3>
      </encabezado>
      <React.Fragment>
        <Navbar_docente/>
      </React.Fragment>
    </body2>
  )
}
