import React from 'react'
import LogoSIGAA from './INDEX/Logo SIGAA.png'
import Navbar_estudiante from './Componentes/Navbar_estudiante';
import { Route,Routes } from 'react-router-dom';
import { Notas } from './Componentes/Estudiante/Notas';
import { Horario } from './Componentes/Estudiante/Horario';
import { Asistencia } from './Componentes/Estudiante/Asistencia';

export const Estudiante = () => {

  return (
    <>
    <div className='Body2'>
      <React.Fragment>
        <Navbar_estudiante/>
      </React.Fragment>
      <Routes>
          <Route path="/Estudiante/Notas" element={<Notas/>} />
          <Route path="/Estudiante/Horario" element={<Horario/>} />
          <Route path="/Estudiante/Asistencia" element={<Asistencia/>} />
        </Routes>
    </div>
    </>
    )
}
