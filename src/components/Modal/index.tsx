import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Event } from 'react-big-calendar';
import { Modal, Button, Form } from 'react-bootstrap';

type EventModalProps = {
    show: boolean;
    setShow: (value: boolean) => void;
    selectedEvent?: DateEvent;
    hideButton?: boolean
};


const EventModal = ({ show, setShow, selectedEvent, hideButton }: EventModalProps) => {
    const router = useRouter();
    const [title, setTitle] = useState<string>(selectedEvent?.title?.toString() || '')
    const [start, setStart] = useState<Date>(selectedEvent?.start || new Date());
    const [end, setEnd] = useState<Date>(selectedEvent?.end || new Date());
    const publicURL = process.env.NEXT_PUBLIC_ENDPOINT;

    const handleClose = () => setShow(false);

    const handleSave = () => {
        // Aquí puedes hacer lo que necesites para guardar el evento
        // ...
        handleClose();
    };

    const handleSelectEvent = () => {
        console.log(selectedEvent);
        router.push(`/room/${selectedEvent?.id}`);
        handleClose();
    };

    useEffect(() => {
        if (selectedEvent) {
            setTitle(selectedEvent?.title?.toString() || '');
            setStart(selectedEvent?.start || new Date());
            setEnd(selectedEvent?.end || new Date());
        }
    }, [selectedEvent]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedEvent?.title ? 'Editar Evento' : 'Nuevo Evento'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!selectedEvent?.title ?

                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Título</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese el título del evento" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formStart">
                            <Form.Label>Fecha de inicio</Form.Label>
                            <Form.Control type="datetime-local" value={moment(start).format('YYYY-MM-DDTHH:mm')} onChange={(e) => setStart(moment(e.target.value).toDate())} />
                        </Form.Group>
                        <Form.Group controlId="formEnd">
                            <Form.Label>Fecha de fin</Form.Label>
                            <Form.Control type="datetime-local" value={moment(end).format('YYYY-MM-DDTHH:mm')} onChange={(e) => setEnd(moment(e.target.value).toDate())} />
                        </Form.Group>
                    </Form>
                    :
                    <>
                        <p>Paciente: {selectedEvent.title}</p>
                        <p>Inicio: {selectedEvent.start.toLocaleDateString()}</p>
                        URL sesion: <a>{publicURL + "/room/" + selectedEvent.id}</a>
                    </>

                }
            </Modal.Body>
            <Modal.Footer>
                {hideButton ?
                    <Button variant="success" onClick={
                        () => { handleSelectEvent() }
                    }>Asistir a cita</Button>
                    :
                    <>
                        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                        <Button variant="primary" onClick={handleSave}>Guardar </Button>
                    </>

                }
            </Modal.Footer>
        </Modal>
    );
};

export default EventModal;
