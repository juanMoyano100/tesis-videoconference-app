import React from 'react';
import { Modal, Button } from 'react-bootstrap';

type RequestModalProps = {
    show: boolean;
    setShow: (value: boolean) => void;
    idRequest: string;
    requestData: any;
    setRequestData: (value: any) => void;
    setPatientState: (value: string) => void;
};

const RequestModal = ({ show, setShow, idRequest, requestData, setRequestData, setPatientState }: RequestModalProps) => {
    const handleClose = () => setShow(false);
    const handleRequest = (state: string, idRequest: string) => {
        setPatientState(state)
        fetch(`/api/putRequest?id=${idRequest}`, {
            method: 'PUT',
            body: JSON.stringify({ ...requestData, state }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) =>
            setRequestData(response.json())
        )
        handleClose();
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{'Solicitud de Acceso'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Desea brindar acceso temporal a este su médico para esta cita?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleRequest('RECHAZADO', idRequest)}>Rechazar</Button>
                <Button variant="primary" onClick={() => handleRequest('APROBADO', idRequest)}>Aprobar</Button>
            </Modal.Footer>
        </Modal >
    );
};

export default RequestModal;
