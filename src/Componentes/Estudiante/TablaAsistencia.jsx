import React from 'react'

export const TablaAsistencia = () => {
  return (
    <div className='body2'>
        <div>
        <h3>Asignatura</h3>
        <label htmlfor="asignatura"></label>
            <select name="asignatura" id="asignatura">
                <option value="1">Matematicas</option>
                <option value="2">Español</option>
                <option value="3">Quimica</option>
                <option value="4">Etica</option>
                <option value="5">Sociales</option>
                <option value="6">Deporte</option>
                <option value="7">Todas</option>
            </select>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>    
                        <th>Materia</th>
                        <th>Profesor</th>
                        <th>Fecha</th>
                        <th>Observación</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Matematicas</td>
                        <td>Brayan Stiven Angarita Sanchez</td>
                        <td>26/08/2024</td>
                        <td><input></input></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Español</td>
                        <td>Lina Maria Barreto</td>
                        <td>22/08/2024</td>
                        <td><input></input></td>
                    </tr>
                </tbody>
            </table>
            </div>
      </div>
  )
}
