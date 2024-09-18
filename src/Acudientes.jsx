import React from 'react'
import LogoSIGAA from './INDEX/Logo SIGAA.png'
import Navbar_acudiente from './Componentes/Navbar_acudiente';
import { Registro_estudiante } from './Componentes/Acudiente/Registro_estudiante';
import { Route,Routes } from 'react-router-dom';
import { Estudiantes } from './Componentes/Acudiente/Estudiantes';
import { Notas } from './Componentes/Acudiente/Notas';



export const Acudientes = () => {

  return (
    <>
    <div className='Body2'>
      <div className='encabezado'>
      <img src={LogoSIGAA} alt="Logo" width="100px"></img>
         <h3>PERFIL: ACUDIENTE</h3>
         <h3>Nombre: Hedilberto Sarmiento</h3>
         <h3>Periódo Académico 1</h3>
      </div>
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