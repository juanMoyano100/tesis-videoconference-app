
import { Calendar, Event, momentLocalizer, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment-timezone'
import 'moment/locale/es' // Importa el idioma de tu preferencia
import { use, useEffect, useState } from 'react'
import EventModal from '../Modal'

moment.tz.setDefault('America/Guayaquil')
const localizer = momentLocalizer(moment);

const MyCalendar = ({ events, enableAddDate, patientInfo }: any) => {
    const [show, setShow] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<DateEvent>();
    const [eventsList, setEventsList] = useState<Event[]>(events);
    const handleSelectSlot = ({ start, end }: { start: Date, end: Date }) => {
        setSelectedEvent({
            id: '',
            title: patientInfo.patientInfo.title,
            start: start,
            end: end,
            allDay: false
        });
        setShow(true);
    };

    useEffect(() => {   
        setEventsList(events);
    }, [events]);

    const handleSelectEvent = (event: DateEvent) => {
        setSelectedEvent(event);
        setShow(true);
    };
    return (
        <>
            <Calendar
                localizer={localizer}
                key={"events?.id"}
                events={eventsList?.map((event: any) => ({
                    id: event.id,
                    title: event.title,
                    start: new Date(event.start),
                    end: new Date(event.end),
                }))
                }
                views={[Views.MONTH, Views.WORK_WEEK, Views.DAY, Views.AGENDA]}
                startAccessor="start"
                endAccessor="end"
                selectable={true}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={enableAddDate ? handleSelectSlot : undefined}
                style={{ height: '100vh' }}
                popup={true}
            />
            <EventModal
                setEventsList={setEventsList}
                show={show}
                setShow={setShow}
                selectedEvent={selectedEvent}
                hideButton={
                    !enableAddDate
                }
                newEvent={enableAddDate}
                appointmentData={patientInfo?.patientInfo}
            ></EventModal>
        </>
    );
}



export default MyCalendar;
