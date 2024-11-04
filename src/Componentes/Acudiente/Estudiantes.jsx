import React from 'react'
import { TablaEstudiante } from './TablaEstudiante'
import { useEffect, useState } from 'react'

export function Estudiantes () {

  return (
    <div className='Body2'>
    <div>Estudiantes:</div>
      <TablaEstudiante/>
    </div>

  )
}
