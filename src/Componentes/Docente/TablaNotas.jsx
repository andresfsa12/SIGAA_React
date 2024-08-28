import React from 'react'

export const TablaNotas = () => {
  return (
    <body2>
        <div>
        <div className='encabezado-tabla'>
            <div className=''>
            <label for="grado"></label>
            <h3>Grado:</h3>
            <select name="grado" id="grado">
                <option value="1">601</option>
                <option value="2">701</option>
                <option value="3">801</option>
                <option value="4">901</option>
                <option value="5">1001</option>
                <option value="6">1101</option>
            </select> 
            </div>
        <button className='btn'>Agregar Nota</button>

        </div>
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
