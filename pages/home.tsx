import { v4 as uuidv4 } from 'uuid';
import Layout from "@/components/Layout";
import EventList from "@/components/EventsList";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import moment from "moment";
import users from '../public/users.json';
import appoitments from '../public/appoitments.json';
import MyCalendar from "@/components/Calendar";

const HomePage = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn]);

    const generateRandomEvents = () => {
        const events = [];

        for (let i = 0; i < 10; i++) {
            ///set hours to 0 to avoid problems with timezones
            const start = moment().add(i, 'days').set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toDate();
            const end = moment().add(i, 'days').set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).add(1, 'hours').toDate();
            const title = `Evento ${i + 1}`;
            events.push({
                id: uuidv4(),
                title,
                start,
                end,
                allDay: false,
            });
        }
        return events;
    };

    const doctors = [
        { id: '2e91de12-04f5-4e9d-89a6-83d76c67ac57', role: 'doctor' },
        { id: 'd7ab7ea2-3f24-4c36-9a79-28b92a2f6c7c', role: 'doctor' },
    ];

    const patients = [
        { id: '33b237b1-4af3-42c3-94b9-184c471b9bf4', role: 'patient' },
        { id: '8a810c50-e36a-44d5-ae48-2d045bc9a2e5', role: 'patient' },
        { id: 'bfe1e4c3-068a-4b3d-8c2b-c5b32b712947', role: 'patient' },
        { id: '89a5d1f8-033f-4816-90ee-6dc8a74b7107', role: 'patient' },
        { id: 'a4eb3c4d-cd3a-4b28-8a3e-dc0df1a09c48', role: 'patient' },
        { id: '8ddc6d75-6d6f-41a8-9c10-76e4c5cb9c3d', role: 'patient' },
        { id: 'e0e51da2-c28a-4b10-bf26-7eaa3b80c5fd', role: 'patient' },
        { id: '3c92d54a-831e-4242-a4c9-dfbf49706715', role: 'patient' },
    ];

    const getRandomDate = () => {
        const start = new Date(moment().add(Math.floor(Math.random() * 7), 'days').set({ hour: Math.floor(Math.random() * 10) + 9, minute: 0, second: 0, millisecond: 0 }).toDate());
        const end = new Date(moment(start).add(1, 'hours').toDate());
        return { start, end };
    };

    const getRandomPatientId: any = () => {
        const patient = patients[Math.floor(Math.random() * patients.length)];
        const title = users.find((user) => user.id === patient.id)?.name
        return { idPatient: patient.id, title };
    };

    const getRandomDoctorId = () => {
        const doctor = doctors[Math.floor(Math.random() * doctors.length)];
        return doctor.id;
    };

    const appointments = Array.from({ length: 10 }).map(() => ({
        id: uuidv4(),
        idDoctor: getRandomDoctorId(),
        ...getRandomPatientId(),
        ...getRandomDate(),
    }));

    const events = appoitments.filter((appointment) => (appointment.idDoctor === user?.id || appointment.idPatient === user?.id))
        .map((appointment) => ({
            id: appointment.id,
            title: appointment.title,
            start: new Date(appointment.start),
            end: new Date(appointment.end),
            allDay: false,
        }));

    // console.log(JSON.stringify(appointments))
    // console.log(JSON.stringify(appoitments))

    return (
        <Layout>
            <Container>
                <h1>Bienvenido {user?.name} </h1>
                <p>Aquí podrás ver tus citas programadas:</p>
                <Row>
                    <Col md={9} sm={12}>
                        <MyCalendar events={events} ></MyCalendar>
                    </Col>
                    <Col md={3} sm={12}>
                        <EventList eventsList={events} />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default HomePage;
