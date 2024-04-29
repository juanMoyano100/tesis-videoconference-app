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
    newEvent?: boolean
    appointmentData?: any
    setEventsList?: (value: any) => void;
};


const EventModal = ({ show, setShow, selectedEvent, hideButton, newEvent, appointmentData, setEventsList}: EventModalProps) => {
    const router = useRouter();
    const [title, setTitle] = useState<string>(selectedEvent?.title?.toString() || '')
    const [start, setStart] = useState<Date>(selectedEvent?.start || new Date());
    const [end, setEnd] = useState<Date>(selectedEvent?.end || new Date());
    const publicURL = process.env.NEXT_PUBLIC_ENDPOINT;


    const appointment = {
        idPatient: appointmentData?.idPatient,
        idDoctor: appointmentData?.idDoctor,
        title: title,
        start: start,
        end: end,
    };

    const handleClose = () => setShow(false);

    const handleSave = () => {
        fetch('/api/appoitments', {
            method: 'POST',
            body: JSON.stringify(appointment),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json()).then((data) => {
                setEventsList && setEventsList(
                    (prev: any) => [
                        ...prev,
                        {
                            id: data.id,
                            title: data.title,
                            start: new Date(data.start),
                            end: new Date(data.end),
                        },
                    ]
                );
            })
        handleClose();
    };

    const handleSelectEvent = () => {
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
                <Modal.Title>{newEvent ? 'Editar Evento' : 'Nuevo Evento'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {newEvent ?
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Paciente</Form.Label>
                            <Form.Control type="text" disabled placeholder="Ingrese el título del evento" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formStart">
                            <Form.Label>Fecha de inicio</Form.Label>
                            <Form.Control type="datetime-local" value={moment(start).format('YYYY-MM-DDTHH:mm')} onChange={(e) => {
                                setStart(moment(e.target.value).toDate())
                                setEnd(moment(e.target.value).add(1, "hour").toDate())
                            }
                            } />
                        </Form.Group>
                        <Form.Group controlId="formEnd">
                            <Form.Label>Fecha de fin</Form.Label>
                            <Form.Control type="datetime-local" value={moment(end).format('YYYY-MM-DDTHH:mm')} onChange={(e) => setEnd(moment(e.target.value).toDate())} />
                        </Form.Group>
                    </Form>
                    :
                    <>
                        <p>Paciente: {selectedEvent?.title}</p>
                        <p>Inicio: {selectedEvent?.start ? new Date(selectedEvent?.start).toLocaleDateString() : ''}</p>
                        <p>Hora: {new Date(selectedEvent?.start ?? '').toLocaleTimeString()}</p>
                        URL sesion: <a>{publicURL + "/room/" + selectedEvent?.id}</a>
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
