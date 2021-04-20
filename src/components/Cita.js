import React from 'react';
import PropTypes from 'prop-types';
import CurrencyFormat from 'react-currency-format';

const Cita = ({cita, eliminarCita}) => {

    const subtotal = cita.price * cita.cant
    const total_descuento = (subtotal * (cita.descuento / 100))
    const total = subtotal - total_descuento

    return (
        <tr>
            <td>{cita.medicamento}</td>
            <td><CurrencyFormat value={cita.price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
            <td>{cita.cant}</td>
            <td><CurrencyFormat value={subtotal} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
            <td>- <CurrencyFormat value={total_descuento} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
            <td><CurrencyFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
            <td><button
                className="button eliminar u-full-width"
                onClick={ () => eliminarCita(cita.id)  }
            >X</button></td>
        </tr>
    );
}

Cita.propTypes = {
    cita: PropTypes.object.isRequired,
    eliminarCita: PropTypes.func.isRequired
}

export default Cita;
