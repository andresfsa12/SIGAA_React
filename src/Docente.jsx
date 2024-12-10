import React from 'react'
import LogoSIGAA from './INDEX/Logo SIGAA.png'
import Navbar_docente from './Componentes/Navbar_docente';
import { Route,Routes } from 'react-router-dom';
import { Notas } from './Componentes/Docente/Notas';
import { Horario } from './Componentes/Docente/Horario';
import { Asistencia } from './Componentes/Docente/Asistencia';
import { Boletines } from './Componentes/Docente/Boletines';

export function Docente()  {


  return (
    <div className='Body2'>

      <React.Fragment>
        <Navbar_docente/>
      </React.Fragment>
      <Routes>
          <Route path="/Docente/Notas" element={<Notas/>} />
          <Route path="/Docente/Horario" element={<Horario/>} />
          <Route path="/Docente/Asistencia" element={<Asistencia/>} />
          <Route path="/Docente/Boletines" element={<Boletines/>} />
        </Routes>
    </div>
  )
}
