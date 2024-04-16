import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function App() {

  const [nombre, setNombre] = useState('')
  const [edad, setEdad] = useState()
  const [pais, setPais] = useState('')
  const [cargo, setCargo] = useState('')
  const [anios, setAnios] = useState()
  const [empleados, setEmpleados] = useState([])
  const [editar, setEditar] = useState(false)
  const [id, setId] = useState()

  //Declaracion Sweet Alert
  const noti = withReactContent(Swal)

  //CRUD functions
  const addEmpleado = () => {
      Axios
      .post("http://localhost:8001/create",
      {
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
        anios: anios
      }).then(()=> {
        noti.fire({
          title: <strong>Registro exitoso!</strong>,
          html: <i>Empleado/a <strong>{nombre}</strong> registrado correctamente</i>,
          showConfirmButton: false,
          icon: 'success',
          timer: 3000
        })
        limpiarCampos()
      }).catch(function(error){
        noti.fire({
          icon: "error",
          title: "Oops...",
          text: "No se logro crear el registro!",
          footer: JSON.parse(JSON.stringify(error)).message === "Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error))
        });
      })   
  }

  const updateEmpleado = () => {
    Axios
      .put("http://localhost:8001/update",
      {
        id: id,
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
        anios: anios
      }).then(()=> {
        noti.fire({
          title: <strong>Actualizacion exitosa!</strong>,
          html: <i>Empleado/a <strong>{nombre}</strong> actualizado correctamente</i>,
          showConfirmButton: false,
          icon: 'success',
          timer: 3000
        })
        limpiarCampos()
      }).catch(function(error){
        noti.fire({
          icon: "error",
          title: "Oops...",
          text: "No se logro actualizar el registro!",
          footer: JSON.parse(JSON.stringify(error)).message === "Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error))
        });
      })   
  }

  const editarEmpleado = (val) => {
    setEditar(true)

    setNombre(val.nombre)
    setEdad(val.edad)
    setPais(val.pais)
    setCargo(val.cargo)
    setAnios(val.anios)
    setId(val.id)
  }

  const deleteEmpleado = (val) => {
    noti.fire({
      title: "Confirmar eliminado",
      html: <i>¿Realmente desea eliminar a <strong>{val.nombre}</strong>?</i>,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar registro"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios
          .delete(`http://localhost:8001/delete/${val.id}`)
          .then(()=> {
            limpiarCampos()
            noti.fire({
              title: "Eliminado correctamente!",
              html: <i>El registro de <strong>{val.nombre}</strong> fue eliminado.</i>,
              icon: "success",
              showConfirmButton: false,
              timer: 3000
            });
          }).catch(function(error){
            noti.fire({
              icon: "error",
              title: "Oops...",
              text: "No se logro eliminar el registro!",
              footer: JSON.parse(JSON.stringify(error)).message === "Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error))
            });
          })  
      }
    })
  }

  //CANCELAR function
  const limpiarCampos = () => {
    return(
    setNombre(""),
    setEdad(""),
    setPais(""),
    setCargo(""),
    setAnios(""),
    setEditar(false))
}

  //GET lista de empleados
  useEffect(() => {
    Axios
    .get("http://localhost:8001/employers")
    .then((response) => {
      setEmpleados(response.data)
    }) 
  }, [setEmpleados])

  return (
  //Insertar HTML
    <div className='container-fluid'>
      <div className='App'>
        <div>
          <Card className="text-center">
            <Card.Header>GESTION DE EMPLEADOS</Card.Header>
            <Card.Body>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Nombre</InputGroup.Text>
                  <Form.Control
                    onChange={(event) => {setNombre(event.target.value)}}
                    type='text'
                    value= {nombre}
                    placeholder="Ingrese nombre"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup><InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Edad</InputGroup.Text>
                  <Form.Control
                    onChange={(event) => {setEdad(event.target.value)}}
                    type='number'
                    value= {edad}
                    placeholder="Ingrese edad"
                    aria-label="Edad"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup><InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Pais</InputGroup.Text>
                  <Form.Control
                    onChange={(event) => {setPais(event.target.value)}}
                    type='text'
                    value= {pais}
                    placeholder="Ingrese pais de origen"
                    aria-label="Pais"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup><InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Cargo</InputGroup.Text>
                  <Form.Control
                    onChange={(event) => {setCargo(event.target.value)}}
                    type='text'
                    value={cargo}
                    placeholder="Ingrese cargo de empleado"
                    aria-label="Cargo"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup><InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Años de experiencia</InputGroup.Text>
                  <Form.Control
                    onChange={(event) => {setAnios(event.target.value)}}
                    type='number'
                    value={anios}
                    placeholder="Ingrese los años"
                    aria-label="Anio"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
            </Card.Body>
            <Card.Footer className="text-muted">
              {editar === true? 
                <div>
                  <button className='btn btn-warning' onClick={updateEmpleado}>Actualizar</button>
                  <button className="btn btn-secondary m-2" onClick={limpiarCampos}>Cancelar</button>
                </div>
              : 
                <button className='btn btn-success' onClick={addEmpleado}>Registrar</button>}
            </Card.Footer>
          </Card>
        </div>
        <div>
          <Table striped>
            <thead>
              <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Pais</th>
              <th>Cargo</th>
              <th>Años de experiencia</th>
              <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
            {empleados.map((val, key) => {
                return <tr>
                          <td>{val.id}</td>
                          <td>{val.nombre}</td>
                          <td>{val.edad}</td>
                          <td>{val.pais}</td>
                          <td>{val.cargo}</td>
                          <td>{val.anios}</td>
                          <td>
                              <Button variant="secondary" 
                                onClick={() => {editarEmpleado(val)}}>Editar</Button>
                              <Button className='btn btn-danger m-2' onClick={() => 
                                {deleteEmpleado(val)}}>Eliminar</Button>
                          </td>
                        </tr>
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default App;
