import React from 'react'
import { useContext, useEffect, useState } from 'react'
import {  Table, IconButton, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Modal, Box, TextField, Button} from '@mui/material';
import { EditOutlined, DeleteForeverOutlined, AddCircleOutline } from '@mui/icons-material'; 
import axios from 'axios';
import UserContext from '../../Contexto/UserContext';

export const TablaAsistencia = () => {

    //Estilo de la ventana editar notas
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:   
   400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [editingAsistencia, setEditingAsistencia] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [asistenciaList, setAsistenciaList] = useState([]);
  const id_docente = useContext(UserContext);
  const [openAddModal, setOpenAddModal] = useState(false); // Estado para controlar la visibilidad del modal de agregar Asistencias
  const [newAsistencia, setNewAsistencia] = useState({// Estado para almacenar los datos de la nueva Asistencia
    Codigo_Asistencia: '',
    Fecha: '',
    Codigo_Estudiante: '',
    Materia: '',
    Periodo:'',
    Codigo_Docente: id_docente // Asigna el ID del docente automáticamente
  });

  //Consultar Asistencia segun el id del docente
    const getAsistencia = async ()=>{
        try{
          const {data} =await axios.get('http://localhost:3000/api/asistencia-id-docente', {params: { id_docente }});
          setAsistenciaList(data);
        } catch(error){
          console.error('Error al obtener datos:',error);
        }
      }

    // Eliminar Asistencia

      const onDelete = async (Codigo_Asistencia)=>{
        try{
          const {data}=await axios.post('http://localhost:3000/api/eliminar-asistencia',{Codigo_Asistencia: Codigo_Asistencia})
          alert(data.message)
          getAsistencia()
        }
        catch(error){
          console.log(error)
        }
      }
    // Editar Asistencia
       const handleOpenModal = (asistencia) => {
        setEditingAsistencia(asistencia);
        setOpenModal(true);
      };
      const handleCloseModal = () => {
        setEditingAsistencia(null);
        setOpenModal(false);
      };
      
      const handleEditChange = (event) => {
        setEditingAsistencia({
          ...editingAsistencia,
          [event.target.name]: event.target.value,
        });
      };
  
      const handleSaveEdit = async () => {
        try {
          await axios.put(`http://localhost:3000/api/actualizar-asistencia/${editingAsistencia.Codigo_Asistencia}`, editingAsistencia);
          getAsistencia();
          handleCloseModal();
          alert('Actualizado correctamente');
        } catch (error) {
          console.log(error);
          alert('Error al procesar la solicitud.');
        }
      };

      /// AGREGAR ASISTENCIA

      // Función para abrir el modal de agregar Asistencia
     const handleOpenAddModal = () => {
      setOpenAddModal(true);
      };

      // Función para cerrar el modal de agregar ASISTRENCIA
      const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setNewAsistencia({  // Limpia el estado newAsistencia
            Fecha: '',
            Codigo_Estudiante: '',
            Materia: '',
            Periodo:'',
            Codigo_Docente: id_docente // Asigna el ID del docente automáticamente
        });
      };

      // Función para manejar los cambios en los campos del formulario de agregar ASISTENCIA
      const handleAddChange = (event) => {
        setNewAsistencia({
          ...newAsistencia,
          [event.target.name]: event.target.value,
        });
      };

      // Función para guardar la nueva ASISTENCIA
      const handleSaveAdd = async () => {
        try {
          await axios.post('http://localhost:3000/api/agregar-asistencia', newAsistencia);
          getAsistencia(); // Actualiza la lista después de agregar
          handleCloseAddModal();
          alert('Registro agregado correctamente');
        } catch (error) {
          console.log(error);
          alert('Error al agregar el registro.');
        }
      };

      useEffect(() => {
        getAsistencia();
      })


  return (
    <div className='body2'>
        <div className='tabla-content'>
        
        <div className='tabla-content'>
          <h1>Asistencia</h1>
        </div>
       <TableContainer component={Paper}>
        {/* Agrega un botón para abrir el modal de agregar ASISTENCIA */}
        <Button 
          variant="contained" 
          startIcon={<AddCircleOutline />} 
          onClick={handleOpenAddModal}
          sx={{marginBottom: 2}}
        >
          Agregar Registro de Asistencia
        </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Codigo</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Codigo Estudiante</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Materia</TableCell>
                <TableCell>Periodo Académico</TableCell>
                <TableCell>Docente</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {asistenciaList.map((asistencia,index)=>(
                <TableRow key={index}>
                    <TableCell>{asistencia.Codigo_Asistencia}</TableCell>
                    <TableCell>{asistencia.Fecha}</TableCell>
                    <TableCell>{asistencia.Codigo_Estudiante}</TableCell>
                    <TableCell>{asistencia.Nombre}</TableCell>
                    <TableCell>{asistencia.Apellido}</TableCell>
                    <TableCell>{asistencia.Materia}</TableCell>
                    <TableCell>{asistencia.Periodo}</TableCell>
                    <TableCell>{asistencia.Codigo_Docente}</TableCell>
                    <TableCell>
                      
                      <IconButton size='small' color='primary' onClick={() => handleOpenModal(asistencia)}>
                        <EditOutlined/>
                      </IconButton>
                      <IconButton onClick={()=>onDelete(asistencia.Codigo_Asistencia)} size='small' color='secondary'>
                        <DeleteForeverOutlined/>
                      </IconButton>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      
   {/* Modal para agregar ASISTENCIA */}
    <Modal open={openAddModal} onClose={handleCloseAddModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow:   24,
            p: 6,
          }}
        >
          <h2>Agregar Nuevo Registro</h2>
          <TextField 
             label="" name="Fecha" type='date' value={newAsistencia.Fecha} onChange={handleAddChange} fullWidth margin="normal" 
             helperText="Selecciona la Fecha"/>
          <TextField 
            label="Codigo Estudiante" name="Codigo_Estudiante" value={newAsistencia.Codigo_Estudiante} onChange={handleAddChange} fullWidth margin="normal" 
          />
          <TextField 
            label="Materia" name="Materia" value={newAsistencia.Materia} onChange={handleAddChange} fullWidth margin="normal" 
          />
          <TextField 
            label="Periodo" name="Periodo" value={newAsistencia.Periodo} onChange={handleAddChange} fullWidth margin="normal" 
          />
          <TextField 
            label="Docente" name="Codigo_Docente" disabled value={newAsistencia.Codigo_Docente} onChange={handleAddChange} fullWidth margin="normal"
          />
          
          <Button variant="contained" onClick={handleSaveAdd}>Agregar</Button>
        </Box>
      </Modal>
      {/*Modal para actualizar ASISTENCIA*/}
      <Modal open={openModal} onClose={handleCloseModal}>
      <Box sx={style}>
        <h2>Editar Asistencia</h2>
        {editingAsistencia && (
          <form>
            <TextField label="" name="Fecha" type='date' value={editingAsistencia.Fecha} onChange={handleEditChange} fullWidth margin="normal" helperText="Selecciona la Fecha"/>
            <TextField label="Materia" name="Materia" value={editingAsistencia.Materia} onChange={handleEditChange} fullWidth margin="normal" />
            <Button variant="contained" color="primary" onClick={handleSaveEdit}>Guardar</Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseModal}>Cancelar</Button>
          </form>
        )}
      </Box>
    </Modal>
    </div>
      </div>
  )
}
