import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';
import Printer from "./components/Printer";

function App() {

  // Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('medicamentos'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  // Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  // Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
      let citasIniciales = JSON.parse(localStorage.getItem('medicamentos'));

      if(citasIniciales) {
        localStorage.setItem('medicamentos', JSON.stringify(citas))
      } else {
        localStorage.setItem('medicamentos', JSON.stringify([]));
      }
  }, [citas] );

  // Función que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas([ ...citas, cita ]);
  }

  // Función que elimina una cita por su id
  const eliminarCita = id => {
     const nuevasCitas = citas.filter(cita => cita.id !== id );
     guardarCitas(nuevasCitas);
  }

  const clearFactura = () => {
      guardarCitas([])
      localStorage.setItem('medicamentos', JSON.stringify([]));
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay medicamentos' : 'Administra la facturación';

  return (
    <Fragment>
      <h1>Administrador de Facturación</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
              <Formulario
                crearCita={crearCita}
              />
          </div>
          <div className="one-half column">
              <h2>{titulo}</h2>

              <table className="cita u-full-width">
                  <thead>
                  <tr>
                      <th>Medicamento</th>
                      <th>Precio Unitario</th>
                      <th>Cantidad</th>
                      <th>Total</th>
                      <th>x</th>
                  </tr>
                  </thead>
                  <tbody>
                  {citas.map(cita => (
                      <Cita
                          key={cita.id}
                          cita={cita}
                          eliminarCita={eliminarCita}
                      />
                  ))}
                  </tbody>
              </table>
              <Printer
                  citas={citas}
                  clear={clearFactura}
              />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
