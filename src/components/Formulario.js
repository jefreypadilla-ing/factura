import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    // Crear State de Citas
    const [cita, actualizarCita] = useState({
        medicamento: '',
        cant: '',
        price: ''
    });
    const [ error, actualizarError ] = useState(false)

    // Función que se ejecuta cada que el usuario escribe en un input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    // Extraer los valores
    const { medicamento, cant, price } = cita;

    // Cuando el usuario presiona agregar cita
    const submitCita = e => {
        e.preventDefault();

        // Validar
        if ((!medicamento || !cant || !price) || (cant <= 0 || price <=0)) {
            actualizarError(true);
            return;
        }

        if(medicamento.trim() === '' || cant.trim() === ''  || price.trim() === '' ){
            actualizarError(true);
            return;
        }
        // Eliminar el mensaje previo
        actualizarError(false);

        // Asignar un ID
        cita.id = uuid();

        // Crear la cita
        crearCita(cita);

        // Reiniciar el form
        actualizarCita({
            medicamento: '',
            cant: '',
            price: ''
        })
    }

    return (
        <Fragment>
            <h2>Crear Medicamento</h2>

            { error ? <p className="alerta-error">Todos los campos son obligatorios</p>     : null }

            <form
                onSubmit={submitCita}
            >
                <label>Medicamento</label>
                <input
                    type="text"
                    name="medicamento"
                    className="u-full-width"
                    placeholder="Nombre Medicamento"
                    onChange={actualizarState}
                    value={medicamento}
                />

                <label>Cantidad</label>
                <input
                    type="number"
                    name="cant"
                    className="u-full-width"
                    placeholder="Cantidad"
                    onChange={actualizarState}
                    value={cant}
                />

                <label>Precio Unitario</label>
                <input
                    type="number"
                    name="price"
                    className="u-full-width"
                    placeholder="Precio Unitario"
                    onChange={actualizarState}
                    value={price}
                />

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Medicamento</button>
            </form>
        </Fragment>
    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;
