import React from 'react'

export const TablaAsignatura = () => {
  return (
    <div className='body2'>
        <p>Asignaturas:</p>
        <div>        
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Profesor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Matemáticas</td>
                        <td>Brayan Stiven Sanchez Angarita</td>
                    </tr>
                    <tr>
                        <td>Español</td>
                        <td>Lina Maria Barreto</td>
                    </tr>
                    <tr>
                        <td>Quimica</td>
                        <td>Fabio Viveros</td>
                    </tr>
                </tbody>
            </table>
            </div>
      </div>
  )
}
