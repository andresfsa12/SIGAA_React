import React from 'react'
import { useEffect, useState } from 'react'

import Navbar_acudiente from './Componentes/Navbar_acudiente';
import { Asistencia } from './Componentes/Acudiente/Asistencia';
import { Route,Routes } from 'react-router-dom';
import { Estudiantes } from './Componentes/Acudiente/Estudiantes';
import { Notas } from './Componentes/Acudiente/Notas';

export function Acudientes() {
  


  return(
    <>
    <div className='Body2'>
      <React.Fragment>
        <Navbar_acudiente/>
      </React.Fragment>
      <Routes>
          <Route path="/Acudiente/Estudiantes" element={<Estudiantes/>} />
          <Route path="/Acudiente/Notas" element={<Notas/>} />
          <Route path="/Acudiente/Asistencia" element={<Asistencia/>} />
          
        </Routes>
        
      </div>
      </> 
  )
  }
  export default Acudientes