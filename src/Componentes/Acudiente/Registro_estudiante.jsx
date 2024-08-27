import React from 'react'
import { useForm } from 'react-hook-form'

export const Registro_estudiante = () => {
    const {register, handleSubmit} = useForm();
    const onSubmit = (data) => {
        console.log(data);
    }
  return (
    <body2>
    <h1>Registro</h1>
    <content>
        <form onSubmit={handleSubmit(onSubmit)}>
        
            <div>
                <label>Tipo de documento</label><br/>
                <select {...register('tipoDocumento')}>
                    <option value="Cc">Cedula de ciudadania</option>
                    <option value="Ps">Pasaporte</option>
                    <option value="Ce">Cedula extranjera</option>
                </select>
            </div>
            <div>
                <label>Nombres:</label>
                <input type='text' {...register('nombres')}/>
            </div>
            <div>
                <label>Apellidos:</label>
                <input type='text' {...register('apellidos')}/>
            </div>
            <div>
                <label>Fecha_Nacimiento</label>
                <input type='text' {...register('fNacimiento')}/>
            </div>
            <div>
                <label>Género</label>
                <input type='text' {...register('genero')}/>
            </div>
            <div>
                <label>Email</label>
                <input type='text' {...register('email')}/>
            </div>
            <div>
                <label>Dirección</label>
                <input type='text' {...register('direccion')}/>
            </div>
            <div>
                <label>Grado:</label><br/>
                <select {...register('grado')}>
                    <option value="Cc">601</option>
                    <option value="Ps">701</option>
                    <option value="Ps">801</option>
                    <option value="Ps">901</option>
                    <option value="Ps">1001</option>
                    <option value="Ps">1101</option>
                </select>
            </div>
            <div>
                <input type='submit' value='Enviar'/>
            </div>
        </form>
    </content>
    </body2>
      )
}
