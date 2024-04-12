import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';

function App() {

  const [nombre, setNombre] = useState('')
  const [edad, setEdad] = useState(0)
  const [pais, setPais] = useState('')
  const [cargo, setCargo] = useState('')
  const [anios, setAnios] = useState(0)

  const [empleados, setEmpleados] = useState([])

  const add = () => {
      Axios.post("http://localhost:8001/create",
      {
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
        anios: anios
      }).then(()=> {
        getEmpleados()
        alert("Empleado registrado")
      })  
  }

  const getEmpleados = () => {
    Axios.get("http://localhost:8001/employers")
    .then((response) => {
      setEmpleados(response.data)
    })  
  }
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
                    placeholder="Ingrese nombre"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup><InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Edad</InputGroup.Text>
                  <Form.Control
                    onChange={(event) => {setEdad(event.target.value)}}
                    type='number'
                    placeholder="Ingrese edad"
                    aria-label="Edad"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup><InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Pais</InputGroup.Text>
                  <Form.Control
                    onChange={(event) => {setPais(event.target.value)}}
                    type='text'
                    placeholder="Ingrese pais de origen"
                    aria-label="Pais"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup><InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Cargo</InputGroup.Text>
                  <Form.Control
                    onChange={(event) => {setCargo(event.target.value)}}
                    type='text'
                    placeholder="Ingrese cargo de empleado"
                    aria-label="Cargo"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup><InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Años de experiencia</InputGroup.Text>
                  <Form.Control
                    onChange={(event) => {setAnios(event.target.value)}}
                    type='number'
                    placeholder="Ingrese los años"
                    aria-label="Anio"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
            </Card.Body>
            <Card.Footer className="text-muted">
                <button className='btn btn-success' onClick={add}>Registrar</button>
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
                      </tr>
            })}
          </tbody>
        </Table>
          {/* <Table striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Pais</th>
                <th>Cargo</th>
                <th>Años de experiencia</th>
              </tr>
            </thead>
            {empleados.map((val, key) => {
              return <tbody>
                      <tr>
                        <td>{val.id}</td>
                        <td>{val.nombre}</td>
                        <td>{val.edad}</td>
                        <td>{val.pais}</td>
                        <td>{val.cargo}</td>
                        <td>{val.anios}</td>
                      </tr>
                    </tbody>
            })}
          </Table> */}
        </div>
      </div>
    </div>
  );
}

export default App;
