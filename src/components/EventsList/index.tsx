import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import EventModal from "../Modal";
import styles from './styles.module.css'

const EventList = (eventsList: any) => {
    const [show, setShow] = useState(false);

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
                        {event.title} - {new Date(event.start).toLocaleString()} -{" "}
                        {new Date(event.start).toLocaleTimeString()}
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
