import React from 'react'
import { TablaEstudiante } from './TablaEstudiante'
import { useEffect, useState } from 'react'

export function Estudiantes () {

  return (
    <div>
    <div className='text'>
      <TablaEstudiante/>
    </div>
    </div>
  )
}
