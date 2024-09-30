import React from 'react'
import LogoSIGAA from './INDEX/Logo SIGAA.png'
import Navbar_docente from './Componentes/Navbar_docente';
import { Route,Routes } from 'react-router-dom';
import { Notas } from './Componentes/Docente/Notas';
import { Asignaturas } from './Componentes/Docente/Asignaturas';
import { Horario } from './Componentes/Docente/Horario';
import { Asistencia } from './Componentes/Docente/Asistencia';
import { Boletines } from './Componentes/Docente/Boletines';

export function Docente()  {


  return (
    <div className='Body2'>
      <div className='encabezado'>
      <img src={LogoSIGAA} alt="Logo" width="100px"></img>
         <h3>PERFIL: DOCENTE</h3>
         <h3>Nombre: Henry Vanegas Plazas</h3>
         <h3>Periódo Académico 1</h3>
         <button >Cerrar Sesión</button>
      </div>
      <React.Fragment>
        <Navbar_docente/>
      </React.Fragment>
      <Routes>
          <Route path="/Docente/Notas" element={<Notas/>} />
          <Route path="/Docente/Asignaturas" element={<Asignaturas/>} />
          <Route path="/Docente/Horario" element={<Horario/>} />
          <Route path="/Docente/Asistencia" element={<Asistencia/>} />
          <Route path="/Docente/Boletines" element={<Boletines/>} />
        </Routes>
    </div>
  )
}
