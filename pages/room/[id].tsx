import {
    ControlBar, GridLayout, LiveKitRoom, ParticipantTile, RoomAudioRenderer, TrackContext, useToken, useTracks,
    Chat
} from '@livekit/components-react';
import type { NextPage } from 'next';
import '@livekit/components-styles';
import { useRouter } from 'next/router';
import { Button, Row, Spinner } from 'react-bootstrap';
import { Track } from 'livekit-client';
import Layout from '@/components/Layout';
import OffCanvasInfo from '@/components/OffCanvas';
import PatientInfo from '@/components/PatientInfo';
import patientData from '../../public/patientData.json';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import OffCanvasCalendar from '@/components/OffCanvasCalendar';
import styles from './style.module.css'
import RequestModal from '@/components/RequestModal';


const VideoConference: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const params = typeof window !== 'undefined' ? new URLSearchParams(location.search) : null;
    const roomName = id?.toString() ?? "";
    const { data: session } = useSession();
    const [user, setUser] = useState<any>(null);
    const [appoitment, setAppoitment] = useState<any>(null);
    const userIdentity = session?.user?.name ?? "test";
    const [connect, setConnect] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [patient, setPatient] = useState<any>(null);
    const [events, setEvents] = useState<any[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [requestData, setRequestData] = useState<any>(null);
    const [error, setError] = useState<string>("");

    const [patientState, setPatientState] = useState<string>("");

    const token = useToken(process.env.NEXT_PUBLIC_LK_TOKEN_ENDPOINT, roomName, {
        userInfo: {
            identity: userIdentity,
            name: userIdentity,
        },
    })

    const getUserByEmail = async (email: string) => {
        fetch(`/api/getUserByEmail?email=${email}`)
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
            });
    }

    const getAppoitmentById = async (id: string) => {
        fetch(`/api/getAppointmentById?id=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setAppoitment(data);
            });
    }

    const getAppointmentByUser = async (id: string, role: string) => {
        fetch(`/api/getAppointmentByUser?id${role}=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setEvents(data);
            });
    }

    const handleDisconnect = () => {
        setConnect(false);
        setIsConnected(false);
    };

    const createRequest = async (idDoctor: string, idPatient: string, state: string) => {
        fetch('/api/createRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idDoctor, idPatient, state }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    useEffect(() => {
        if (!session) {
            router.push('/login');
        } else if (session.user?.email) {
            if (!user && !appoitment)
                getUserByEmail(session.user.email)
            getAppoitmentById(id?.toString() ?? "");
        }
    }, [id, router, session]);

    useEffect(() => {
        if (user?.id) {
            getAppointmentByUser(user?.id, user?.role[0].toUpperCase() + user?.role.slice(1));
        }
    }, [user]);

    useEffect(() => {
        if (params && patientData !== null) {
            setPatient(patientData.find((patient: any) => patient.idPaciente === appoitment?.idPatient))
        }
    }, [appoitment?.idPatient, id, params]);

    useEffect(() => {
        if (user?.role === "patient" && appoitment?.idDoctor && appoitment?.idPatient && (patientState === '')) {
            const interval = setInterval(() => {
                fetch(`/api/getByidPatientandIdDoctor?idDoctor=${appoitment?.idDoctor}&idPatient=${appoitment?.idPatient}`)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data?.message) {
                            setError(data.message);
                        } else {
                            setRequestData(data);
                            setPatientState(data.state);
                        }
                    })
            }, 9000);
            return () => clearInterval(interval);
        }
        if (user?.role === "doctor" && (patientState === 'PENDIENTE')) {
            const interval = setInterval(() => {
                fetch(`/api/getByidPatientandIdDoctor?idDoctor=${appoitment?.idDoctor}&idPatient=${appoitment?.idPatient}`)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data?.message) {
                            setError(data.message);
                        } else {
                            setRequestData(data);
                            setPatientState(data.state);
                        }
                    })
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [appoitment?.idDoctor, appoitment?.idPatient, user?.role, patientState]);

    useEffect(() => {
        if (user?.role == "patient" && patientState === 'PENDIENTE') {
            setShowModal(true);
        }
    }, [patientState]);

    const renderDoctorPreCall = () => {
        return (
            <>
                {patientState === 'APROBADO' ? (
                    <>
                        <div className='d-flex justify-content-center py-2'>
                            <Button variant='success' onClick={() => setIsConnected(!isConnected)}>
                                Ingresar a la Sala
                            </Button>
                        </div>
                        <PatientInfo patientInfoSelected={patient} />
                    </>
                ) : (
                    <div className={styles.form}>
                        <Row className={styles.header}>
                            <h2>{appoitment?.title}</h2>
                        </Row>
                        {patientState === '' &&
                            <div className="d-flex justify-content-center">
                                <Button variant='success' onClick={() => {
                                    createRequest(user?.id, appoitment?.idPatient, 'PENDIENTE');
                                    setPatientState('PENDIENTE');
                                }}>
                                    Solicitar Acceso
                                </Button>
                            </div>
                        }
                        {patientState === 'PENDIENTE' &&
                            <div className='text-center py-2'>
                                <div className="d-flex justify-content-center">
                                    <h4>
                                        Estado de la solicitud: <span className='text-warning'>{patientState}</span>
                                    </h4>
                                </div>
                                <Spinner animation="grow" className='px-2' style={{ height: "15px", width: "15px" }} />
                                Esperando aprobación del paciente
                                <div className="d-flex justify-content-center py-2">
                                    <Button variant='success' onClick={() => setPatientState('PENDIENTE')}> Revisar solicitud </Button>
                                </div>
                            </div>
                        }
                        {patientState === 'RECHAZADO' &&
                            <div className='text-center py-2'>
                                <div className="d-flex justify-content-center">
                                    <h4>
                                        Estado de la solicitud: <span className='text-danger'>{patientState}</span>
                                    </h4>
                                </div>
                                <Button variant='success' onClick={() => setPatientState('PENDIENTE')}> Solicitar nuevamente </Button>
                            </div>
                        }
                    </div>
                )}
            </>
        )
    }

    const renderPatientPreCall = () => {
        return (
            <>
                {patientState === 'APROBADO' ? (
                    <>
                        <div className='d-flex justify-content-center py-2'>
                            <Button variant='success' onClick={() => setIsConnected(!isConnected)}>
                                Ingresar a la Sala
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className={styles.form}>
                        <Row className={styles.header}>
                            <h2>{"Solicitud de acceso"}</h2>
                        </Row>
                        {patientState === '' &&
                            <div className="d-flex justify-content-center align-items-center">
                                {error === "" ?
                                    <>
                                        <Spinner animation="grow" className='px-2' style={{ height: "15px", width: "15px" }} />
                                        {"Esperando solicitud del médico"}
                                    </>
                                    :
                                    <div>
                                        <Row className='text-danger'>
                                            {error}
                                        </Row>
                                        <Row className="py-2">
                                            <Button variant='success' onClick={() => {
                                                setPatientState('')
                                                setError('')
                                            }}> Intentar nuevamente </Button>
                                        </Row>
                                    </div>
                                }
                            </div>
                        }
                        <RequestModal show={showModal} setShow={setShowModal} idRequest={requestData?.id} requestData={requestData} setRequestData={setRequestData} setPatientState={setPatientState} />
                    </div>
                )}
            </>

        )
    }

    return (
        <Layout data-lk-theme="default">
            {!isConnected ? (
                <>
                    {user?.role === 'doctor' && renderDoctorPreCall()}
                    {user?.role === 'patient' && renderPatientPreCall()}
                </>
            ) :
                (
                    <>
                        <div className='d-flex py-2 justify-content-center'>
                            {user?.role === 'doctor' &&
                                <OffCanvasInfo patientInfoSelected={patient} />
                            }
                            {user?.role === 'doctor' &&
                                <OffCanvasCalendar
                                    events={events}
                                    enableAddDate={true} patientInfo={
                                        {
                                            title: appoitment?.title,
                                            idPatient: appoitment?.idPatient,
                                            idDoctor: appoitment?.idDoctor,
                                        }
                                    }
                                />
                            }
                        </div>
                        <div className='text-center py-2'>
                            <Button variant='danger' onClick={() => setIsConnected(!isConnected)}>
                                Desconectar
                            </Button>
                        </div>
                        <LiveKitRoom
                            token={token}
                            serverUrl={process.env.NEXT_PUBLIC_LK_SERVER_URL}
                            connect={isConnected}
                            onConnected={() => setIsConnected(true)}
                            onDisconnected={handleDisconnect}
                            audio={true}
                            video={true}
                        >
                            <RoomAudioRenderer />
                            <Stage />
                            <ControlBar />
                            <Chat style={{ width: "100%" }} />
                        </LiveKitRoom>
                    </>
                )

            }
        </Layout>

    );
};

function Stage() {
    const cameraTracks = useTracks([Track.Source.Camera]);
    const screenShareTrack = useTracks([Track.Source.ScreenShare])[0];
    return (
        <>
            {screenShareTrack && <ParticipantTile {...screenShareTrack} />}
            <GridLayout tracks={cameraTracks}>
                <TrackContext.Consumer>{(track) => <ParticipantTile {...track} />}</TrackContext.Consumer>
            </GridLayout>
        </>
    );
}

export default VideoConference;