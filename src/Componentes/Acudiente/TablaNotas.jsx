import React from 'react'

export const TablaNotas = () => {
  return (
    <body2>
        <div>
        <h3>Estudiantes Registrados:</h3>
        <label for="notas"></label>
            <select name="notas" id="notas">
            
                <option value="1">Andres Fabian Sarmiento Andapiña</option>
                <option value="2">Edilberto Sarmiento Andapiña</option>
            </select>
            <table>
                <tr>
                    <th>Asignatura</th>
                    <th>Nota</th>
                    <th>Docente</th>

                </tr>
                <tr>
                    <td>Matemáticas</td>
                    <td>5.0</td>
                    <td>Brayan Stiven Sanchez Angarita</td>
                </tr>
                <tr>
                    <td>Español</td>
                    <td>3.5</td>
                    <td>Lina Maria Barreto</td>
                </tr>
            </table>
            </div>
      </body2>
  )
}
