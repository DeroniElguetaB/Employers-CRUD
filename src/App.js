import './App.css';
import { useState } from 'react'

function App() {

  const [nombre, setNombre] = useState('')
  const [edad, setEdad] = useState(0)
  const [pais, setPais] = useState('')
  const [cargo, setCargo] = useState('')
  const [anios, setAnios] = useState(0)

  return (
    <div className="App">
      <div className='datos'>
        <label>Nombre: <input onChange={(event) => {setNombre(event.target.value)}} type='text'></input></label>
        <label>Edad: <input onChange={(event) => {setEdad(event.target.value)}} type='number'></input></label>
        <label>Pais: <input onChange={(event) => {setPais(event.target.value)}} type='text'></input></label>
        <label>Cargo: <input onChange={(event) => {setCargo(event.target.value)}} type='text'></input></label>
        <label>Año: <input onChange={(event) => {setAnios(event.target.value)}} type='number'></input></label>
        <button onClick={mostrarDatos}>Registrar</button>
      </div>
    </div>
  );
}

export default App;
