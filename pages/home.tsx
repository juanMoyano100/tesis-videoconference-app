import { v4 as uuidv4 } from 'uuid';
import Layout from "@/components/Layout";
import EventList from "@/components/EventsList";
import { useRouter } from "next/dist/client/router";
import { Button, Col, Container, Row } from "react-bootstrap";
import moment from "moment";
import MyCalendar from "@/components/Calendar";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const HomePage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [user, setUser] = useState<any>();
    const [events, setEvents] = useState<any[]>([]);

    const getUserByEmail = async (email: string) => {
        fetch(`/api/getUserByEmail?email=${email}`)
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
            });
    }

    useEffect(() => {
        if (!session) {
            router.push('/login');
        } else if (session.user?.email) {
            getUserByEmail(session.user.email);
        }
    }, [router, session]);

    useEffect(() => {
        if (user?.id) {
            getAppointmentByUser(user?.id, user?.role[0].toUpperCase() + user?.role.slice(1));
        }
    }, [user]);

    const getAppointmentByUser = async (id: string, role: string) => {
        fetch(`/api/getAppointmentByUser?id${role}=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setEvents(data);
            });
    }

    return (
        <Layout>
            <Container>
                <h1>Bienvenido {user?.name} </h1>
                <p>Aquí podrás ver tus citas programadas:</p>
                <Row>
                    <Col md={9} sm={12}>
                        <MyCalendar events={events} enableAddDate={false}

                        ></MyCalendar>
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
