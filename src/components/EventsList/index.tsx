import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import EventModal from "../Modal";
import styles from './styles.module.css'

const EventList = (eventsList: any) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedEvent, setSelectedEvent] = useState<DateEvent>();

    return (
        <>
            <ListGroup>
                {eventsList.eventsList.map((event: any) => (
                    <ListGroup.Item key={event.id}
                        className={styles.eventList}
                        onClick={() => {
                            setSelectedEvent(event);
                            setShow(true);
                        }}
                    >
                        {event.title} - {event.start.toDateString()} -{" "}
                        {event.start.getHours()}:{event.start.getMinutes()+"0"} hs

                    </ListGroup.Item>
                ))}
            </ListGroup>
            <EventModal
                show={show}
                setShow={setShow}
                selectedEvent={selectedEvent}
                hideButton={true}
            ></EventModal>
        </>
    );
};

export default EventList;
