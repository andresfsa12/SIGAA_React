import React from 'react'
import { useForm } from 'react-hook-form'

export const Registro_estudiante = () => {
    const {register, handleSubmit} = useForm();
    const onSubmit = (data) => {
        console.log(data);
    }
  return (
    <content>
        
        <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Registro</h1>
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
                <label>Número de celular</label>
                <input type='text' {...register('nCelular')}/>
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
                <label>Contraseña</label>
                <input type='password' {...register('password')}/>
            </div>
            <div>
                <input type='submit' value='Enviar'/>
            </div>
        </form>
    </content>
      )
}
