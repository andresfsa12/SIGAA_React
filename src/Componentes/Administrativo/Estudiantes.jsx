import React from 'react'
import { useEffect, useState } from 'react'
import TablaEstudiante from './TablaEstudiante'

export function Estudiantes () {

  return (
    <div className='Body2'>
    <div>Estudiantes:</div>
      <TablaEstudiante/>
    </div>

  )
}
