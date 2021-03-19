import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Facturacion from './components/Facturacion';
import {db} from "./firebase";

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

  const nuevaFactura = (lastFactura) => {
      guardarCitas([])
      localStorage.setItem('medicamentos', JSON.stringify([]));
      db.collection('factura').doc().set({ number: lastFactura, createAt: new Date() })
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
              <Facturacion
                  titulo={titulo}
                  citas={citas}
                  eliminarCita={eliminarCita}
                  nuevaFactura={nuevaFactura}
              />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
