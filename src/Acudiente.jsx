import React from 'react'
import LogoSIGAA from './INDEX/Logo SIGAA.png'
import Navbar_acudiente from './Componentes/Navbar_acudiente';
import { Registro_estudiante } from './Componentes/Registro_estudiante';
import { Route,Routes } from 'react-router-dom';
import { Estudiantes } from './Componentes/Estudiantes';
import { Notas } from './Componentes/Notas';
import { Asignaturas } from './Componentes/Asignaturas';

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
      <Routes>
          <Route path="/Estudiantes" element={<Estudiantes/>} />
          <Route path="/Notas" element={<Notas/>} />
          <Route path="/Asignaturas" element={<Asignaturas/>} />
          <Route path="/Registro_estudiante" element={<Registro_estudiante/>} />
        </Routes>
      </body2>
      </>
    )
}
