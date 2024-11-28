import { useContext, useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import {  Table, IconButton, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Modal, Box, TextField, Button, MenuItem, FormControl, Select} from '@mui/material';
import { EditOutlined, DeleteForeverOutlined, AddCircleOutline } from '@mui/icons-material';
import UserContext from '../../Contexto/UserContext';
import { format } from 'date-fns';

//Estilos de la ventana para editar estudiante
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

export const TablaDocente = () => {

  const [docenteList, setDocenteList] = useState([]);
  const [editingDocente, setEditingDocente] = useState(null);
  // Estado para controlar la visibilidad del modal de editar docente
  const [openModal, setOpenModal] = useState(false);
  
  // Estado para controlar la visibilidad del modal de agregar estudiante
  const [openAddModal, setOpenAddModal] = useState(false);
  
  // Estado para almacenar los datos de la nueva nota
  const [newDocente, setNewDocente] = useState({
    Id_Docente: '',
    Nombre_Docente: '',
    fecha_nacimiento: '',
    Genero: '',
    Nivel_Academico: '',
    Direccion: '',
    Ciudad: '',
    Celular: '',
    Clave: ''
    });
const cod_Acudiente = useContext(UserContext);

//Consultar docentes que esten relacionados con el ID del acudiente que inició sesión  
const getUser = async ()=>{
  try{
    const {data} = await axios.get('http://localhost:3000/api/administrar-docente');
      setDocenteList(data);
  } catch(error){
      console.error('Error al obtener datos:', error);
  }
}

//Eliminar docente
    const onDelete = async (Id_Docente)=>{
      try{
        const {data}=await axios.post('http://localhost:3000/api/eliminar-docente',{Id_Docente: Id_Docente})
        alert(data.message)
        getUser()
      }
      catch(error){
        console.log(error)
      }
    }
// Actualizar docente
     const handleOpenModal = (docente) => {
      setEditingDocente(docente);
      setOpenModal(true);
    };
    const handleCloseModal = () => {
      setEditingDocente(null);
      setOpenModal(false);
    };
    
    const handleEditChange = (event) => {
      setEditingDocente({
        ...editingDocente,
        [event.target.name]: event.target.value,
      });
    };

    const handleSaveEdit = async () => {
      try {
        await axios.put(`http://localhost:3000/api/actualizar-docente/${editingDocente.Id_Docente}`, editingDocente);
        getUser();
        handleCloseModal();
        alert('Actualizado correctamente');
      } catch (error) {
        console.log(error);
        alert('Error al procesar la solicitud.');
      }
    };

    // AGREGAR DOCENTE

      // Función para abrir el modal de agregar DOCENTE
      const handleOpenAddModal = () => {
        setOpenAddModal(true);
        };
  
        // Función para cerrar el modal de agregar DOCENTE
        const handleCloseAddModal = () => {
          setOpenAddModal(false);
          setNewDocente({  // Limpia el estado newDocente
            Id_Docente: '',
            Nombre_Docente: '',
            fecha_nacimiento: '',
            Genero: '',
            Nivel_Academico: '',
            Direccion: '',
            Ciudad: '',
            Celular: '',
            Clave: ''
          });
        };
  
        // Función para manejar los cambios en los campos del formulario de agregar DOCENTE
        const handleAddChange = (event) => {
          setNewDocente({
            ...newDocente,
            [event.target.name]: event.target.value,
          });
        };
  
        // Función para guardar el nuevo estudiante
        const handleSaveAdd = async () => {
          try {
            await axios.post('http://localhost:3000/api/agregar-docente', newDocente);
            getUser(); // Actualiza la lista después de agregar
            handleCloseAddModal();
            alert('Docente agregado correctamente');
          } catch (error) {
            console.log(error);
            alert('Error al agregar el docente.');
          }
        };

    useEffect(() => {
      getUser();
    })
  
  return (
    <div>
      
      <div className='Body2'>
      <TableContainer component={Paper}>
        {/* Agrega un botón para abrir el modal de agregar DOCENTE */}
        <Button 
          variant="contained" 
          startIcon={<AddCircleOutline/>} 
          onClick={handleOpenAddModal}
          sx={{marginBottom: 2}}
        >
          Agregar Docente
        </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID Docente</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Fecha de nacimiento</TableCell>
                <TableCell>Genero</TableCell>
                <TableCell>Nivel Académico</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Ciudad</TableCell>
                <TableCell>Celular</TableCell>
                <TableCell>Clave</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {docenteList.map((docente,index)=>(
                <TableRow key={index}>
                    <TableCell>{docente.Id_Docente}</TableCell>
                    <TableCell>{docente.Nombre_Docente}</TableCell>
                    <TableCell>{docente.fecha_nacimiento}</TableCell>
                    <TableCell>{docente.Genero}</TableCell>
                    <TableCell>{docente.Nivel_Academico}</TableCell>
                    <TableCell>{docente.Direccion}</TableCell>
                    <TableCell>{docente.Ciudad}</TableCell>
                    <TableCell>{docente.Celular}</TableCell>
                    <TableCell>{docente.Clave}</TableCell>
                    <TableCell>
                      
                      <IconButton size='small' color='primary' onClick={() => handleOpenModal(docente)}>
                        <EditOutlined/>
                      </IconButton>
                      <IconButton onClick={()=>onDelete(docente.Id_Docente)} size='small' color='secondary'>
                        <DeleteForeverOutlined/>
                      </IconButton>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/*Modal para actualizar DOCENTES*/}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <h2>Editar Docente</h2>
          {editingDocente && (
            <form>
              <FormControl>
              <TextField label="ID Docente" name="Id_Docente" value={editingDocente.Id_Docente} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField label="Nombre" name="Nombre_Docente" value={editingDocente.Nombre_Docente} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField label="Fecha nacimiento" type='date' name="fecha_nacimiento" value={editingDocente.fecha_nacimiento} onChange={handleEditChange} fullWidth margin="normal" 
              helperText="Selecciona la fecha de nacimiento"/>
              <TextField select label="Genero" name="Genero" value={editingDocente.Genero} onChange={handleEditChange} fullWidth margin="normal"
                helperText="Seleccione el género">
                <MenuItem value="M">Masculino</MenuItem>
                <MenuItem value="F">Femenino</MenuItem>
              </TextField>
              <TextField label="Nivel Academico" name="Nivel_Academico" value={editingDocente.Nivel_Academico} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField label="Direccion" name="Direccion" value={editingDocente.Direccion} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField label="Ciudad" name="Ciudad" value={editingDocente.Ciudad} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField label="Celular" name="Celular" value={editingDocente.Celular} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField label="Clave" name="Clave" value={editingDocente.Clave} onChange={handleEditChange} fullWidth margin="normal" />


              <Button variant="contained" color="primary" onClick={handleSaveEdit}>Guardar</Button>
              <Button variant="outlined" color="secondary" onClick={handleCloseModal}>Cancelar</Button>
              </FormControl>
            </form>
          )}
        </Box>
      </Modal>

      {/* Modal para agregar nuevos DOCENTES */}
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
          <h2>Agregar Nuevo Docente</h2>
          <FormControl>
          <TextField label="ID" name="Id_Docente" value={newDocente.Id_Docente} onChange={handleAddChange} fullWidth margin="normal" />
          <TextField label="Nombre" name="Nombre_Docente" value={newDocente.Nombre_Docente} onChange={handleAddChange} fullWidth margin="normal" />
          <TextField label="" type='date' name="fecha_nacimiento" value={newDocente.fecha_nacimiento} onChange={handleAddChange} fullWidth margin="normal" 
          helperText="Selecciona la fecha de nacimiento"/>
          <TextField select label="Genero" name="Genero" value={newDocente.Genero} onChange={handleAddChange} fullWidth margin="normal"
          helperText="Selecciona el género">
            <MenuItem value="M">Masculino</MenuItem>
            <MenuItem value="F">Femenino</MenuItem>
          </TextField>
          <TextField label="Nivel Academico" name="Nivel_Academico" value={newDocente.Nivel_Academico} onChange={handleAddChange} fullWidth margin="normal" />
          <TextField label="Direccion" name="Direccion" value={newDocente.Direccion} onChange={handleAddChange} fullWidth margin="normal" />
          <TextField label="Ciudad" name="Ciudad" value={newDocente.Ciudad} onChange={handleAddChange} fullWidth margin="normal" />
          <TextField label="Celular" name="Celular" value={newDocente.Celular} onChange={handleAddChange} fullWidth margin="normal" />
          <TextField label="Clave" name="Clave" type='password' value={newDocente.Clave} onChange={handleAddChange} fullWidth margin="normal" />

          
          <Button variant="contained" onClick={handleSaveAdd}>Agregar Docente</Button>
          </FormControl>
        </Box>
      </Modal>
      </div>
  )

}
export default TablaDocente;