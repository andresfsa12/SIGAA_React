import React from 'react'

export const TablaHorario = () => {
  return (
    <div className='body2'>
        <p>Horario:</p>
        <div>        
            <table>
                <thead>
                    <tr>
                        <th>Dia</th>
                        <th>Hora</th>
                        <th>Asignatura</th>
                        <th>Grado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Lunes</td>
                        <td>06:00</td>
                        <td>Matemáticas</td>
                        <td>601</td>
                    </tr>
                    <tr>
                        <td>Lunes</td>
                        <td>08:00</td>
                        <td>Geometría</td>
                        <td>801</td>
                    </tr>
                    <tr>
                        <td>Martes</td>
                        <td>10:00</td>
                        <td>Estadística</td>
                        <td>1001</td>
                    </tr>
                    <tr>
                        <td>Miercoles</td>
                        <td>11:00</td>
                        <td>Matemáticas</td>
                        <td>901</td>
                    </tr>
                </tbody>
            </table>
            </div>
      </div>
  )
}
