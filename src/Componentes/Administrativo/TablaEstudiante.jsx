import { useContext, useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import { Table, IconButton, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Modal, Box, TextField, Button, MenuItem, FormControl, Select} from '@mui/material';
import { EditOutlined, DeleteForeverOutlined, AddCircleOutline } from '@mui/icons-material';
import UserContext from '../../Contexto/UserContext';

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

export const TablaEstudiante = () => {

  
  const [studentList, setStudentList] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false); // Estado para controlar la visibilidad del modal de agregar estudiante
  const [newEstudiante, setNewEstudiante] = useState({ // Estado para almacenar los datos de la nueva nota
    Tipo_Id: '',
    Id_Estudiante: '',
    Nombre: '',
    Apellido: '',
    fecha_nacimiento: '',
    Genero: '',
    Direccion: '',
    Clave: '',
    Codigo_Grado_E: '',
    Id_Acudiente: ''
    });
const cod_Acudiente = useContext(UserContext);

const getUser = async ()=>{ //Consultar estudiantes
  try{
    const {data} = await axios.get('http://localhost:3000/api/administrar-estudiante');
      setStudentList(data);
  } catch(error){
      console.error('Error al obtener datos:', error);
  }
}

//Eliminar estudiante
    const onDelete = async (Id_Estudiante)=>{
      try{
        const {data}=await axios.post('http://localhost:3000/api/eliminar-estudiante',{Id_Estudiante: Id_Estudiante})
        alert(data.message)
        getUser()
      }
      catch(error){
        console.log(error)
      }
    }
// Actualizar estudiante
     const handleOpenModal = (estudiante) => {
      setEditingStudent(estudiante);
      setOpenModal(true);
    };
    const handleCloseModal = () => {
      setEditingStudent(null);
      setOpenModal(false);
    };
    
    const handleEditChange = (event) => {
      setEditingStudent({
        ...editingStudent,
        [event.target.name]: event.target.value,
      });
    };

    const handleSaveEdit = async () => {
      try {
        await axios.put(`http://localhost:3000/api/actualizar-estudiante/${editingStudent.Codigo}`, editingStudent);
        getUser();
        handleCloseModal();
        alert('Actualizado correctamente');
      } catch (error) {
        console.log(error);
        alert('Error al procesar la solicitud.');
      }
    };

    // AGREGAR ESTUDIANTE

      // Función para abrir el modal de agregar estudiante
      const handleOpenAddModal = () => {
        setOpenAddModal(true);
        };
  
        // Función para cerrar el modal de agregar estudiante
        const handleCloseAddModal = () => {
          setOpenAddModal(false);
          setNewEstudiante({  // Limpia el estado newEstudiante
            Tipo_Id: '',
            Id_Estudiante: '',
            Nombre: '',
            Apellido: '',
            fecha_nacimiento: '',
            Genero: '',
            Direccion: '',
            Clave: '',
            Codigo_Grado_E: '',
            Id_Acudiente: ''
          });
        };
  
        // Función para manejar los cambios en los campos del formulario de agregar estudiante
        const handleAddChange = (event) => {
          setNewEstudiante({
            ...newEstudiante,
            [event.target.name]: event.target.value,
          });
        };
  
        // Función para guardar el nuevo estudiante
        const handleSaveAdd = async () => {
          try {
            await axios.post('http://localhost:3000/api/agregar-estudiante', newEstudiante);
            getUser(); // Actualiza la lista después de agregar
            handleCloseAddModal();
            alert('Estudiante agregado correctamente');
          } catch (error) {
            console.log(error);
            alert('Error al agregar el estudiante.');
          }
        };

    useEffect(() => {
      getUser();
    })
  
  return (
    <div>
      
      <div className='Body2'>
      <TableContainer component={Paper}>
        {/* Agrega un botón para abrir el modal de agregar estudiante */}
        <Button 
          variant="contained" 
          startIcon={<AddCircleOutline/>} 
          onClick={handleOpenAddModal}
          sx={{marginBottom: 2}}
        >
          Agregar Estudiante
        </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Codigo</TableCell>
                <TableCell>Tipo ID</TableCell>
                <TableCell>ID Estudiante</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Fecha de nacimiento</TableCell>
                <TableCell>Genero</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Clave</TableCell>
                <TableCell>Grado</TableCell>
                <TableCell>Id Acudiente</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentList.map((estudiante,index)=>(
                <TableRow key={index}>
                    <TableCell>{estudiante.Codigo}</TableCell>
                    <TableCell>{estudiante.Tipo_Id}</TableCell>
                    <TableCell>{estudiante.Id_Estudiante}</TableCell>
                    <TableCell>{estudiante.Nombre}</TableCell>
                    <TableCell>{estudiante.Apellido}</TableCell>
                    <TableCell>{estudiante.fecha_nacimiento}</TableCell>
                    <TableCell>{estudiante.Genero}</TableCell>
                    <TableCell>{estudiante.Direccion}</TableCell>
                    <TableCell>{estudiante.Clave}</TableCell>
                    <TableCell>{estudiante.Codigo_Grado_E}</TableCell>
                    <TableCell>{estudiante.Id_Acudiente}</TableCell>
                    <TableCell>
                      <IconButton size='small' color='primary' onClick={() => handleOpenModal(estudiante)}>
                        <EditOutlined/>
                      </IconButton>
                      <IconButton onClick={()=>onDelete(estudiante.Id_Estudiante)} size='small' color='secondary'>
                        <DeleteForeverOutlined/>
                      </IconButton>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/*Modal para actualizar estudiantes*/}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <h2>Editar Estudiante</h2>
          {editingStudent && (
            
            <form>
              <FormControl>
              <TextField select label="Tipo ID" name="Tipo_Id" value={editingStudent.Tipo_Id} onChange={handleEditChange} fullWidth margin="normal" 
                helperText="Selecciona el tipo de ID">
                <MenuItem value="Cc">CC</MenuItem>
                <MenuItem value="Ti">TI</MenuItem>
                <MenuItem value="Ce">CE</MenuItem>
                <MenuItem value="Ps">PS</MenuItem>
              </TextField>
              <TextField label="ID Estudiante" name="Id_Estudiante" value={editingStudent.Id_Estudiante} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField label="Nombre" name="Nombre" value={editingStudent.Nombre} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField label="Apellido" name="Apellido" value={editingStudent.Apellido} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField label="Fecha de Nacimiento" type='date' name="fecha_nacimiento" value={editingStudent.fecha_nacimiento} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField select label="Género" name="Genero" value={editingStudent.Genero} onChange={handleEditChange} fullWidth margin="normal" 
                helperText="Selecciona el tipo de ID">
                <MenuItem value="M">Masculino</MenuItem>
                <MenuItem value="F">Femenino</MenuItem>
              </TextField>
              <TextField label="Dirección" name="Direccion" value={editingStudent.Direccion} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField label="Clave" name="Clave" type='password' value={editingStudent.Clave} onChange={handleEditChange} fullWidth margin="normal" />
              <Button variant="contained" color="primary" onClick={handleSaveEdit}>Guardar</Button>
              <Button variant="outlined" color="secondary" onClick={handleCloseModal}>Cancelar</Button>
              </FormControl>
            </form>
          )}
        </Box>
      </Modal>

      {/* Modal para agregar nuevos estudiantes */}
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
          <h2>Agregar Nuevo Estudiante</h2>
          <FormControl>
          <TextField 
            select label="Tipo ID" name="Tipo_Id" value={newEstudiante.Tipo_Id} onChange={handleAddChange} fullWidth margin="normal"  
            helperText="Selecciona el tipo de ID">
              <MenuItem value="Cc">CC</MenuItem>
              <MenuItem value="Ti">TI</MenuItem>
              <MenuItem value="Ce">CE</MenuItem>
              <MenuItem value="Ps">PS</MenuItem>
          </TextField>
          
          <TextField 
            label="Número ID" name="Id_Estudiante" value={newEstudiante.Id_Estudiante} onChange={handleAddChange} fullWidth margin="normal" 
          />
          <TextField 
            label="Nombre" name="Nombre" value={newEstudiante.Nombre} onChange={handleAddChange} fullWidth margin="normal" 
          />
          <TextField 
            label="Apellido" name="Apellido" value={newEstudiante.Apellido} onChange={handleAddChange} fullWidth margin="normal" 
          />
          <TextField 
            label="" name="fecha_nacimiento" type="date" value={newEstudiante.fecha_nacimiento} onChange={handleAddChange} fullWidth margin="normal" 
          helperText="Selecciona la fecha de nacimiento"/> 
    
          <TextField 
            select label="Género" name="Genero" value={newEstudiante.Genero} onChange={handleAddChange} fullWidth margin="normal" 
            helperText="Selecciona el género">
            <MenuItem value="M">Masculino</MenuItem>
            <MenuItem value="F">Femenino</MenuItem>
          </TextField>
          <TextField 
            label="Dirección" name="Direccion" value={newEstudiante.Direccion} onChange={handleAddChange} fullWidth margin="normal" 
          />
          <TextField 
            label="Clave" name="Clave" type='password' value={newEstudiante.Clave} onChange={handleAddChange} fullWidth margin="normal" 
          />
          <TextField 
            label="Grado" name="Codigo_Grado_E" value={newEstudiante.Codigo_Grado}_E onChange={handleAddChange} fullWidth margin="normal" 
          />
          <TextField 
            label="ID Acudiente" name="Id_Acudiente" value={newEstudiante.Id_Acudiente} onChange={handleAddChange} fullWidth margin="normal" 
          />
          
          <Button variant="contained" onClick={handleSaveAdd}>Agregar</Button>
          </FormControl>
        </Box>
      </Modal>
      </div>
  )

}
export default TablaEstudiante;