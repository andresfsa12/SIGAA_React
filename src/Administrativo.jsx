import React from 'react'
import { useEffect, useState } from 'react'

import Navbar_administrativo from './Componentes/Navbar_administrativo';
import { Route,Routes } from 'react-router-dom';
import { Estudiantes } from './Componentes/Administrativo/Estudiantes';
import { Docentes } from './Componentes/Administrativo/Docentes';
import { Horario } from './Componentes/Administrativo/Horario';
import { Boletines } from './Componentes/Administrativo/Boletines';

export function Administrativo() {



  return(
    <>
    <div className='Body2'>
      <React.Fragment>
        <Navbar_administrativo/>
      </React.Fragment>
      <Routes>
          <Route path="/Administrativo/Estudiantes" element={<Estudiantes/>} />
          <Route path="/Administrativo/Docentes" element={<Docentes/>} />
          <Route path="/Administrativo/Horario" element={<Horario/>} />
          <Route path="/Administrativo/Boletines" element={<Boletines/>} />
          
          
        </Routes>
        
      </div>
      </> 
  )
  }
  export default Administrativo