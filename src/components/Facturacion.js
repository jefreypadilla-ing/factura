import React, { Fragment } from 'react';
import Cita from "./Cita";
import ReactToPrint from "react-to-print";
import '../factura.css';
import { db } from "../firebase";

class FacturaToPrint extends React.Component {
    render() {
        const {citas, lastFactura} = this.props;
        let totalFactura = 0;
        const now = new Date();

        citas.forEach(cita => {
            totalFactura += cita.cant * cita.price
        })

        return (
            <div className="ticket">
                <br/>
                <p className="centered"><strong>BLUEFARMAMJ</strong>
                    <br/>
                    <br/>Nit: 1.140.841.434
                    <br/>Calle 53 No 42 - 25 Local 101
                    <br/>Barranquilla - Cel. 3243896786
                    <br/>bluefarmamj@gmail.com
                    <br/>Resolución DIAN 18764002594606
                    <br/>Prefijo POS Del: 1 al 500
                    <br/>
                    <br/><strong>FACTURA DE VENTA</strong>
                    <br/>{lastFactura}
                    <br/>Fecha: {now.getDate()} / {now.getMonth() + 1} / {now.getFullYear()}
                </p>
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th className="quantity">Cant.</th>
                            <th className="description">Descripción</th>
                            <th className="price">$$</th>
                        </tr>
                        </thead>
                        <tbody>
                        {citas.map(cita => (
                            <tr>
                                <td className="quantity">{cita.cant}</td>
                                <td className="description">{cita.medicamento}</td>
                                <td className="price">$ {cita.price * cita.cant}</td>
                            </tr>
                        ))}
                        <tr>
                            <td></td>
                            <td className="description"><strong>Subtotal</strong></td>
                            <td className="quantity">${totalFactura}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="description"><strong>Total</strong></td>
                            <td className="quantity">${totalFactura}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <p/>
                <p className="centered">Gracias por su compra!</p>
            </div>
        );
    }
}
class Facturacion extends React.Component {
    constructor() {
        super();
        this.state = { lastFactura: null }
    }

    componentDidMount() {
        db.collection("factura")
            .orderBy('createAt', 'desc')
            .limit(1)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({ lastFactura: doc.data().number, id: doc.id })
                });

            });
    }

    render() {
        const {titulo,citas, eliminarCita, nuevaFactura } = this.props;

        const lastFactura = this.state.lastFactura + 1;

        return (
            <Fragment>
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

                { citas.length > 0 ?
                    <div>
                        <ReactToPrint
                            trigger={() => <button type="button" className="u-full-width button-primary">Imprimir Factura</button>}
                            content={() => this.componentRef}
                        />
                        <button
                            type="button"
                            className="button new u-full-width"
                            onClick={ () => nuevaFactura(lastFactura) }>
                            Nueva Factura
                        </button>
                        <div className="hidden-div">
                            <FacturaToPrint citas={citas} lastFactura={lastFactura} ref={(el) => (this.componentRef = el)} />
                        </div>
                    </div>
                    : null }
            </Fragment>
        );
    }
}

export default Facturacion;
