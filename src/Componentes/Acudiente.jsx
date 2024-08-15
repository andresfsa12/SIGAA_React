import React from 'react'
import { RegistroAcudiente } from './RegistroAcudiente'

export const Acudiente = () => {
  return (
    <div>
    <div>
         <h1>PERFIL ACUDIENTE</h1> <br/>
         <h3>Acudiente Hedilberto Sarmiento</h3>
         <h3>PERIÓDO ACADÉMICO 1</h3>
         <h3>3 Febrero - 15 Marzo</h3>
         <button name="logout" id="btn-logout1"> Cerrar Sesión </button>;  
    </div>
    <div>
      <RegistroAcudiente/>
    </div>
    </div>
 )
}
