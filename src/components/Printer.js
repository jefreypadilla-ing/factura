import React, {useRef } from 'react';
import PrinterReact from '@eyelly/react-printer'

// import Factura from './Factura';

const Printer = ({ citas, clear }) => {
    const printContent = useRef()

    return (
        <>
            <div ref={printContent}> this is content to print </div>
            <div> this is normal content </div>
            <PrinterReact content={printContent}>
                <button>Printer</button>
            </PrinterReact>
        </>
    );
};

export default Printer;
