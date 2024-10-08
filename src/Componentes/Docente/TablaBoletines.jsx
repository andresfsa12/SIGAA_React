import React from 'react'

export const TablaBoletines = () => {
  return (
    <div className='body2'>
        <div>
        <h3>Grado</h3>
        <label htmlfor="grado"></label>
            <select name="grado" id="grado">
                <option value="1">601</option>
                <option value="2">701</option>
                <option value="3">801</option>
                <option value="4">901</option>
                <option value="5">1001</option>
                <option value="6">1101</option>
            </select>
        <h3>Periodo académico:</h3>
        <label htmlfor="asignatura"></label>
            <select name="asignatura" id="asignatura">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>

            <table>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha</th>
                        <th>Inasistencias</th>
                        <th>Observación</th>
                        <th>Descargar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0001</td>
                        <td>Andres Fabian</td>
                        <td>Sarmiento Andapiña</td>
                        <td>26/08/2024</td>
                        <td>2</td>
                        <td><input></input></td>
                        <td><ion-icon name="reader-outline"></ion-icon></td>
                    </tr>
                    <tr>
                        <td>0002</td>
                        <td>Natalia</td>
                        <td>Rodriguez Farfan</td>
                        <td>22/08/2024</td>
                        <td>0</td>
                        <td><input></input></td>
                        <td><ion-icon name="reader-outline"></ion-icon></td>
                    </tr>
                </tbody>
            </table>
            </div>
      </div>
  )
}
