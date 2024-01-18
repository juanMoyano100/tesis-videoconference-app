
import { Calendar, Event, momentLocalizer, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment-timezone'
import 'moment/locale/es' // Importa el idioma de tu preferencia
import { useState } from 'react'
import EventModal from '../Modal'

moment.tz.setDefault('America/Guayaquil')
const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }: any) => {
    const [show, setShow] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<DateEvent>();

    const handleSelectSlot = ({ start, end }: { start: Date, end: Date }) => {
        setSelectedEvent({
            id: '',
            title: '',
            start: start,
            end: end,
            allDay: false
        });
        setShow(true);
    };

    const handleSelectEvent = (event: DateEvent) => {
        setSelectedEvent(event);
        setShow(true);
    };


    return (
        <>
            <Calendar
                localizer={localizer}
                key={events.id}
                events={events}
                views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
                startAccessor="start"
                endAccessor="end"
                selectable={true}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                style={{ height: '100vh' }}
                popup={true}
            />
            <EventModal
                show={show}
                setShow={setShow}
                selectedEvent={selectedEvent}
                hideButton={selectedEvent?.title ? true : false}
            ></EventModal>
        </>
    );
}



export default MyCalendar;
