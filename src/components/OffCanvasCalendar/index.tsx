import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import MyCalendar from "../Calendar";

const OffCanvasCalendar = (patientInfo: any, events:any) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    return (
        <>
            <div className='text-center py-2'>
                <Button variant="primary" onClick={toggleShow} className="me-2">
                    Agendar Cita
                </Button>
            </div>

            <Offcanvas className="lg" show={show} onHide={handleClose} scroll={true} placement="end" style={{ width: "50%" }}    >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Agendar Cita</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <MyCalendar enableAddDate={true} patientInfo={patientInfo} events={patientInfo.events} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default OffCanvasCalendar;
