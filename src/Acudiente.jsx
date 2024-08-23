import React from 'react'
import LogoSIGAA from './INDEX/Logo SIGAA.png'
import Navbar_acudiente from './Componentes/Navbar_acudiente';

export const Acudiente = () => {

  return (
    <>
    <body2>
      <encabezado>
      <img src={LogoSIGAA} alt="Logo" width="100px"></img>
         <h3>PERFIL: ACUDIENTE</h3>
         <h3>Nombre: Hedilberto Sarmiento</h3>
         <h3>Periódo Académico 1</h3>
      </encabezado>
      <React.Fragment>
        <Navbar_acudiente/>
      </React.Fragment>
    </body2>
    </>
    )
}
