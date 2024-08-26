import React from 'react'

export const TablaNotas = () => {
  return (
    <body2>
        <h1>Estudiantes Registrados</h1>
        <div>
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
                    <td>Edilberto</td>
                    <td>Sarmiento Andapiña</td>
                    <td>Sexto</td>
                </tr>
            </table>
            </div>
      </body2>
  )
}
