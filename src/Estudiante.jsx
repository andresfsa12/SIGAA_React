import React from 'react'
import LogoSIGAA from './INDEX/Logo SIGAA.png'
import Navbar_estudiante from './Componentes/Navbar_estudiante';
import { Route,Routes } from 'react-router-dom';
import { Notas } from './Componentes/Estudiante/Notas';
import { Asignaturas } from './Componentes/Estudiante/Asignaturas';
import { Horario } from './Componentes/Estudiante/Horario';
import { Asistencia } from './Componentes/Estudiante/Asistencia';

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
      <Routes>
          <Route path="/Estudiante/Notas" element={<Notas/>} />
          <Route path="/Estudiante/Asignaturas" element={<Asignaturas/>} />
          <Route path="/Estudiante/Horario" element={<Horario/>} />
          <Route path="/Estudiante/Asistencia" element={<Asistencia/>} />
        </Routes>
    </body2>
    </>
    )
}
