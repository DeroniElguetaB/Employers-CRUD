import './App.css';
import { useState } from 'react'

function App() {

  const [nombre, setNombre] = useState()

  return (
    <div className="App">
      <div className='datos'>
        <label>Nombre: <input type='text'></input></label>
        <label>Edad: <input type='text'></input></label>
        <label>Pais: <input type='text'></input></label>
        <label>Cargo: <input type='text'></input></label>
        <label>Año: <input type='number'></input></label>
        <button>Registrar</button>
      </div>
    </div>
  );
}

export default App;
