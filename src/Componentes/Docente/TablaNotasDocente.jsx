import React from 'react'
import { useContext, useEffect, useState, useRef } from 'react'
import {  Table, IconButton, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Modal, Box, TextField, Button, Select,
  MenuItem,} from '@mui/material';
import { EditOutlined, DeleteForeverOutlined, AddCircleOutline } from '@mui/icons-material'; 
import axios from 'axios';
import UserContext from '../../Contexto/UserContext';
import jsPDF from 'jspdf'; //npm install jspdf jspdf-autotable
import 'jspdf-autotable';

export const TablaNotasDocente = () => {

    //Variables para CRUD de Notas
  const [editingNotas, setEditingNotas] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [notasList, setNotasList] = useState([]);
  const id_docente = useContext(UserContext);
  const [openAddModal, setOpenAddModal] = useState(false); // Estado para controlar la visibilidad del modal de agregar notas
  const [newNota, setNewNota] = useState({// Estado para almacenar los datos de la nueva nota
    Codigo_Estudiante: '',
    Materia: '',
    Codigo_Periodos: '',
    nota: '',
    Codigo_Docente: id_docente // Asigna el ID del docente automáticamente
  });


  //Variables para Filtro lista desplegable
  const prevNotasList = useRef(null);
  const [studentCodes, setStudentCodes] = useState([]); //Estado para almacenar los codigos estudiante para el SELECT
  const [selectedStudentCode, setSelectedStudentCode] = useState(''); //Estado para almacenar el codigo estudiante filtro
  const [error, setError] = useState(null); // Estado para manejar errores

  const [materiasList, setMateriasList] = useState([]); //Estado para almacenar la asignatura para el SELECT
  const [gradoList, setGradoList] = useState([]); //Estado para almacenar el Grado para el SELECT

  const generatePDF = () => { //Generar PDF
    const doc = new jsPDF();
    const tableColumns = ["N°", "Codigo Estudiante", "Nombre", "Apellido", "Asignatura", "Grado", "Periodo Académico", "Nota", "Docente"];

    const tableData = notasList
        .filter(nota => !selectedStudentCode || nota.Codigo_Estudiante === selectedStudentCode)
        .map((notas) => [
            notas.Codigo_Notas,
            notas.Codigo_Estudiante,
            notas.Nombre,
            notas.Apellido,
            notas.Materia,
            notas.Grado,
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
      const { data } = await axios.get('http://localhost:3000/api/notas-docente', { params: { id_docente } });
      setNotasList(data);
  
      // Actualizar códigos de estudiantes solo si la lista de notas ha cambiado por FILTRO LISTA DESPLEGABLE
      if (prevNotasList.current !== data) {
        const uniqueCodes = [...new Set(data.map((nota) => nota.Codigo_Estudiante))];
        setStudentCodes(uniqueCodes);
        prevNotasList.current = data;
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setError(`Error al obtener las notas: ${error.message}`);
    }
  };
  
//Consultar MATERIAS segun el id del DOCENTE
  const getMateria = async () => {  
    try {
      const { data } = await axios.get('http://localhost:3000/api/materias', { params: { id_docente } });
      setMateriasList(data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setError(`Error al obtener las materias: ${error.message}`);
    }
  };
  //Consultar GRADO segun el id del DOCENTE
  const getGrado = async () => {  
    try {
      const { data } = await axios.get('http://localhost:3000/api/grado', { params: { id_docente } });
      setGradoList(data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setError(`Error al obtener los grados: ${error.message}`);
    }
  };
    // Eliminar nota
      const onDelete = async (Codigo_Notas)=>{
        try{
          const {data}=await axios.post('http://localhost:3000/api/eliminar-nota',{Codigo_Notas: Codigo_Notas})
          alert(data.message)
          getNota()
        }
        catch(error){
          console.log(error)
        }
      }
    // Editar nota
       const handleOpenModal = (notas) => {
        setEditingNotas(notas);
        setOpenModal(true);
      };
      const handleCloseModal = () => {
        setEditingNotas(null);
        setOpenModal(false);
      };
      
      const handleEditChange = (event) => {
        setEditingNotas({
          ...editingNotas,
          [event.target.name]: event.target.value,
        });
      };
  
      const handleSaveEdit = async () => {
        try {
          await axios.put(`http://localhost:3000/api/actualizar-notas/${editingNotas.Codigo_Notas}`, editingNotas);
          getNota();
          handleCloseModal();
          alert('Actualizado correctamente');
        } catch (error) {
          console.log(error);
          alert('Error al procesar la solicitud.');
        }
      };

      /// AGREGAR NOTA

      // Función para abrir el modal de agregar nota
     const handleOpenAddModal = () => {
      setOpenAddModal(true);
      };

      // Función para cerrar el modal de agregar nota
      const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setNewNota({  // Limpia el estado newNota
          Codigo_Estudiante: '',
          Materia: '',
          Grado: '',
          Codigo_Periodos: '',
          nota: '',
          Codigo_Docente: id_docente, 
        });
      };

      // Función para manejar los cambios en los campos del formulario de agregar nota
      const handleAddChange = (event) => {
        setNewNota({
          ...newNota,
          [event.target.name]: event.target.value,
        });
      };

      // Función para guardar la nueva nota
      const handleSaveAdd = async () => {
        try {
          await axios.post('http://localhost:3000/api/agregar-notas', newNota);
          getNota(); // Actualiza la lista después de agregar
          handleCloseAddModal();
          alert('Nota agregada correctamente');
        } catch (error) {
          console.log(error);
          alert('Error al agregar la nota.');
        }
      };

      useEffect(() => {
        getNota();
        getMateria();
        getGrado();
      });

  return (
    <div className='Body2'>
      <div className='tabla-content'>
          <div className='tabla-content'>
            <h1>Notas</h1>
          </div>

        {error && <p>Error: {error}</p>}
        <div className='filtros'>
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
     {/* Botón para generar PDF */}
     <Button variant="contained" onClick={generatePDF} sx={{marginLeft: 2}}>
                    Exportar a PDF
                </Button>
    </div>
       <TableContainer component={Paper}>
        {/* Agrega un botón para abrir el modal de agregar nota */}
        <Button 
          variant="contained" 
          startIcon={<AddCircleOutline />} 
          onClick={handleOpenAddModal}
          sx={{marginBottom: 2}}
        >
          Agregar Nota
        </Button>
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
                <TableCell>Docente</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {/*mostrar solo las filas correspondientes al código de estudiante seleccionado, debemos filtrar la lista de notas notasList antes de renderizar la tabla.*/}
            {notasList
          .filter(nota => !selectedStudentCode || nota.Codigo_Estudiante === selectedStudentCode)
          .map((notas, index) => (
             
                <TableRow key={index}>
                    <TableCell>{notas.Codigo_Notas}</TableCell>
                    <TableCell>{notas.Codigo_Estudiante}</TableCell>
                    <TableCell>{notas.Nombre}</TableCell>
                    <TableCell>{notas.Apellido}</TableCell>
                    <TableCell>{notas.Materia}</TableCell>
                    <TableCell>{notas.Grado}</TableCell>
                    <TableCell>{notas.Codigo_Periodos}</TableCell>
                    <TableCell>{notas.nota}</TableCell>
                    <TableCell>{notas.Codigo_Docente}</TableCell>
        
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
      
      {/*Modal para actualizar notas*/}
      <Modal open={openModal} onClose={handleCloseModal}>
      <Box className="modal">
        <h2>Editar Notas</h2>
        {editingNotas && (
          <form>
            <TextField label="Materia" name="Materia" value={editingNotas.Materia} onChange={handleEditChange} fullWidth margin="normal" />
            <TextField label="Notas" name="nota" value={editingNotas.nota} onChange={handleEditChange} fullWidth margin="normal" />
            <Button variant="contained" color="primary" onClick={handleSaveEdit}>Guardar</Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseModal}>Cancelar</Button>
          </form>
        )}
      </Box>
    </Modal>
    {/* Modal para agregar nuevas notas */}
    <Modal open={openAddModal} onClose={handleCloseAddModal}>
        <Box className="modal"  >
          <h2>Agregar Nueva Nota</h2>
          <TextField 
            label="Codigo Estudiante" name="Codigo_Estudiante" value={newNota.Codigo_Estudiante} onChange={handleAddChange} fullWidth margin="normal" 
          />
          <TextField 
            select label="Materia" name="Materia" value={newNota.Materia} onChange={handleAddChange} fullWidth margin="normal" 
           > {materiasList.map((materia) => (
            <MenuItem key={materia.Nombre} value={materia.Nombre}>
                {materia.Nombre}
            </MenuItem>
             ))}
            </TextField>
          <TextField 
            select label="Grado" name="Grado" value={newNota.Grado} onChange={handleAddChange} fullWidth margin="normal" 
          >{gradoList.map((grado) => (
            <MenuItem key={grado.Codigo_Grado} value={grado.Codigo_Grado}>
                {grado.Codigo_Grado}
            </MenuItem>
             ))}
          
          </TextField>
          <TextField 
            label="Periodo" name="Codigo_Periodos" value={newNota.Codigo_Periodos} onChange={handleAddChange} fullWidth margin="normal" 
          />
          <TextField 
            label="Nota" name="nota" value={newNota.nota} onChange={handleAddChange} fullWidth margin="normal"
          />
          <TextField 
            label="Codigo Docente" name="Codigo_Docente" value={newNota.Codigo_Docente} onChange={handleAddChange} fullWidth margin="normal" disabled
          />
          <Button variant="contained" onClick={handleSaveAdd}>Agregar Nota</Button>
        </Box>
      </Modal>
    </div>
  </div>
)
  
}
