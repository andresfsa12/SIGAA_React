  import React from 'react'
  import { useContext, useEffect, useState, useRef } from 'react'
  import {  Table, IconButton, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Modal, Box, TextField, Button, Select,
    MenuItem,} from '@mui/material';
  import { EditOutlined, DeleteForeverOutlined, AddCircleOutline } from '@mui/icons-material'; 
  import axios from 'axios';
  import UserContext from '../../Contexto/UserContext';
  import jsPDF from 'jspdf'; //npm install jspdf jspdf-autotable
  import 'jspdf-autotable';

  export const TablaBoletines = () => {
      
      //Variables para CRUD de Notas
    const [notasList, setNotasList] = useState([]);
    const id_docente = useContext(UserContext);
  


    //Variables para Filtro lista desplegable
    const prevNotasList = useRef(null);
    const [studentCodes, setStudentCodes] = useState([]); //Estado para almacenar los codigos estudiante para el SELECT
    const [selectedStudentCode, setSelectedStudentCode] = useState(''); //Estado para almacenar el codigo estudiante filtro
    const [year, setYear] = useState([]); //Estado para almacenar los codigos estudiante para el SELECT
    const [selectedYear, setSelectedYear] = useState(''); // Estado para almacenar el año seleccionado
    const [selectedPeriod, setSelectedPeriod] = useState(''); // Estado para almacenar el periodo seleccionado
    const [error, setError] = useState(null); // Estado para manejar errores

    const generatePDF = () => { //Generar PDF
      const doc = new jsPDF();
      const tableColumns = ["N°", "Codigo Estudiante", "Nombre", "Apellido", "Asignatura", "Grado", "Periodo Académico", "Nota", "Docente"];

      const tableData = notasList
          .filter(nota => 
            (!selectedStudentCode || nota.Codigo_Estudiante === selectedStudentCode),
            (!selectedYear || nota.Año === selectedYear),
            (!selectedPeriod || nota.Codigo_Periodos === selectedPeriod)
          )
          .map((notas) => [
              notas.Codigo_Notas,
              notas.Codigo_Estudiante,
              notas.Nombre,
              notas.Apellido,
              notas.Materia,
              notas.Grado,
              notas.Año,
              notas.Codigo_Periodos,
              notas.nota,
              notas.Codigo_Docente,
          ]);

      doc.autoTable({
          head: [tableColumns],
          body: tableData,
      });

      doc.save("notas.pdf");
      };


    const getNota = async () => {  //Consultar notas segun el id del DOCENTE
      try {
        const { data } = await axios.get('http://localhost:3000/api/notas-general');
        setNotasList(data);
    
        // Actualizar códigos de estudiantes solo si la lista de notas ha cambiado por FILTRO LISTA DESPLEGABLE
        if (prevNotasList.current !== data) {
          const uniqueCodes = [...new Set(data.map((nota) => nota.Codigo_Estudiante))];
          setStudentCodes(uniqueCodes);
          const uniqueYears = [...new Set(data.map((nota) => nota.Año))];
          setYear(uniqueYears);
          prevNotasList.current = data;
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setError(`Error al obtener las notas: ${error.message}`);
      }
    };
    
    useEffect(() => {
      getNota();
    }, []);

    return (
      <div className='body2'>
          {error && <p>Error: {error}</p>}
          <div className='filtros'>
            <div className='selectEstudiante'>
          Codigo Estudiante:
          <Select 
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedStudentCode}
            onChange={(e) => setSelectedStudentCode(e.target.value)}
            className="select" // Aplica la clase al Select
          >
            <MenuItem value="">Todos</MenuItem>
            {studentCodes.map(code => (
              <MenuItem key={code} value={code}>
                {code}
          </MenuItem>
            ))}
      </Select>
      </div>
      <br/>
      <div className='selectYear'>
        Año:
        <Select
          labelId="demo-simple-select-label-year"
          id="demo-simple-select"
          value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="select" // Aplica la clase al Select
          >
            <MenuItem value="">Todos</MenuItem>
            {year.map(code => (
              <MenuItem key={code} value={code}>
                {code}
          </MenuItem>
            ))}
      </Select>
      </div>
      <div className='boton'>
      {/* Botón para generar PDF */}
      <Button variant="contained" onClick={generatePDF} sx={{marginLeft: 2}}>
                      Exportar a PDF
                  </Button>
      </div>
      </div>
        <TableContainer component={Paper}>
              <Table>
              <TableHead>
                <TableRow>
                  <TableCell>N°</TableCell>
                  <TableCell>Codigo Estudiante</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell>Asignatura</TableCell>
                  <TableCell>Grado</TableCell>
                  <TableCell>Periodo Académico</TableCell>
                  <TableCell>Nota</TableCell>
                  <TableCell>Año</TableCell>
                  <TableCell>Docente</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              
              <TableBody>
                {/*mostrar solo las filas correspondientes al código de estudiante seleccionado, debemos filtrar la lista de notas notasList antes de renderizar la tabla.*/}
              {notasList
            .filter((nota) => 
              (!selectedStudentCode || nota.Codigo_Estudiante === selectedStudentCode) && (!selectedYear || nota.Año === selectedYear))
            .map((notas, index) => (
              
                  <TableRow key={index}>
                      <TableCell>{notas.Codigo_Notas}</TableCell>
                      <TableCell>{notas.Codigo_Estudiante}</TableCell>
                      <TableCell>{notas.Nombre}</TableCell>
                      <TableCell>{notas.Apellido}</TableCell>
                      <TableCell>{notas.Materia}</TableCell>
                      <TableCell>{notas.Grado}</TableCell>
                      <TableCell>{notas.Codigo_Periodos}</TableCell>
                      <TableCell>{notas.Promedio_Nota}</TableCell>
                      <TableCell>{notas.Año}</TableCell>
                      <TableCell>{notas.Nombre_Docente}</TableCell>
                      <TableCell>              
                        <IconButton size='small' color='primary' onClick={() => handleOpenModal(notas)}>
                          <EditOutlined/>
                        </IconButton>
                        <IconButton onClick={()=>onDelete(notas.Codigo_Notas)} size='small' color='secondary'>
                          <DeleteForeverOutlined/>
                        </IconButton>
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    
    </div>
  )
    
  }

