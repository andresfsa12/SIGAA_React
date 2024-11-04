import React from 'react'
import { useEffect, useState } from 'react'

import Navbar_acudiente from './Componentes/Navbar_acudiente';
import { Registro_estudiante } from './Componentes/Acudiente/Registro_estudiante';
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
          <Route path="/Acudiente/Registro_estudiante" element={<Registro_estudiante/>} />
          
        </Routes>
        
      </div>
      </> 
  )
  }
  export default Acudientes