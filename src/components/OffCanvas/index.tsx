import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import PatientInfo from "../PatientInfo";

const OffCanvasInfo = (patientInfoSelected: any) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    return (
        <>
            <div className='text-center py-2'>
            <Button variant="primary" onClick={toggleShow} className="me-2">
                Información del paciente
            </Button>
            </div>

            <Offcanvas className="lg" show={show} onHide={handleClose} scroll={true} placement="end" style={{ width: "50%" }}    >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Información del paciente</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <PatientInfo patientInfoSelected={patientInfoSelected?.patientInfoSelected} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default OffCanvasInfo;
