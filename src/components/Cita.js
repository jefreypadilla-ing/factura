import React from 'react';
import PropTypes from 'prop-types';


const Cita = ({cita, eliminarCita}) => (
    <tr>
        <td>{cita.medicamento}</td>
        <td>{cita.price}</td>
        <td>{cita.cant}</td>
        <td>{cita.price * cita.cant}</td>
        <td><button
            className="button eliminar u-full-width"
            onClick={ () => eliminarCita(cita.id)  }
        >Eliminar &times;</button></td>
    </tr>
);

Cita.propTypes = {
    cita: PropTypes.object.isRequired,
    eliminarCita: PropTypes.func.isRequired
}

export default Cita;
