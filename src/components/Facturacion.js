import React, {Fragment} from 'react';
import Cita from "./Cita";
import ReactToPrint from "react-to-print";
import '../factura.css';
import { db } from "../firebase";
import CurrencyFormat from 'react-currency-format';
import Barcode from 'react-barcode';
import logo from '../../src/LogoBlueFarmaPNG.png'

class FacturaToPrint extends React.Component {
    render() {
        const {citas, lastFactura} = this.props;
        let totalFactura = 0;
        let descuento = 0;
        let barcode = "00000000018764002594606" + lastFactura
        const now = new Date();

        citas.forEach(cita => {
            totalFactura += cita.price * cita.cant
            descuento += ((cita.price * cita.cant) * (cita.descuento / 100))
        })

        return (
            <div className="ticket">
                <br/>
                <p className="centered">
                    <img className="logo_factura" src={logo} alt="BlueFarmaMJ" />
                    <br/><strong>DOMICILIOS</strong>
                    <br/><strong>Teléfono: (324) 389-6786</strong>
                    <br/><strong>Whatsapp: (324) 389-6786</strong>
                    <br/><small>BLUEFARMAMJ</small>
                    <br/><small>NIT 1.140.841.434</small>
                    <br/>
                    <br/>Calle 53 No 42 - 25 Local 101
                    <br/>BARRANQUILLA ATL Colombia
                    <br/>=====================================
                </p>
                <div className="container">
                    <table width="100%">
                        <tr>
                            <th className="description">Tienda: Boston</th>
                            <th className="description">Factura: {lastFactura}</th>
                        </tr>
                        <tr>
                            <th className="description">Fecha: {now.getDate()} / {now.getMonth() + 1} / {now.getFullYear()}</th>
                            <th className="description">Hora: {now.getHours()} : {now.getMinutes()}</th>
                        </tr>
                    </table>
                </div>
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th className="description">Artículo</th>
                            <th className="quantity">Cantidad</th>
                            <th className="price">Precio</th>
                        </tr>
                        </thead>
                        <tbody>
                        {citas.map(cita => (
                            <tr>
                                <td className="description">{cita.medicamento}</td>
                                <td className="quantity">{cita.cant}</td>
                                <td className="price"><CurrencyFormat value={cita.price * cita.cant} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <table width="table">
                        <thead>
                            <tr>
                                <th className="description">Subtotal</th>
                                <th className="description">Descuento</th>
                                <th className="description">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="description"><CurrencyFormat value={totalFactura} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                <td className="description">- <CurrencyFormat value={descuento} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                <td className="description"><CurrencyFormat value={totalFactura - descuento} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="centered">
                    =====================================
                    <br/>Total: <CurrencyFormat value={totalFactura - descuento} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    <br/>=====================================
                    <br/>
                    <br/>Autorización de Facturación
                    <br/>Resolución DIAN no 18764002594606
                    <br/>Prefijo POS Del: 1 al 500
                    <br/>
                    <br/>Instagram: @bluefarmamj
                    <br/>
                    <br/>GRACIAS POR SU COMPRA!
                    <br/><Barcode value={barcode} width={1} height={50} fontSize={13} textAlign="center" />
                    <br/>
                    <br/>
                </p>

            </div>
        );
    }
}
class Facturacion extends React.Component {
    constructor() {
        super();
        this.state = { lastFactura: null };
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
                        <th>Subtotal</th>
                        <th>Descuento</th>
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
