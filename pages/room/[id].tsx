import {
    ControlBar, GridLayout, LiveKitRoom, ParticipantTile, RoomAudioRenderer, TrackContext, useToken, useTracks,
    Chat
} from '@livekit/components-react';
import type { NextPage } from 'next';
import '@livekit/components-styles';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { Track } from 'livekit-client';
import Layout from '@/components/Layout';
import OffCanvasInfo from '@/components/OffCanvas';
import PatientInfo from '@/components/PatientInfo';
import patientData from '../../public/patientData.json';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import OffCanvasCalendar from '@/components/OffCanvasCalendar';


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

    const getAppointmentByUser = async (id: string, role:string) => {
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

    useEffect(() => {
        if (!session) {
            router.push('/login');
        } else if (session.user?.email) {
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
        if (params) {
            setPatient(patientData.find((patient: any) => patient.idPaciente === appoitment?.idPatient))
        }
    }, [appoitment?.idPatient, id, params]);

    return (
        <Layout data-lk-theme="default">
            {!isConnected ? (
                <>
                    <div className='text-center py-2'>
                        <Button variant='success' onClick={() => setIsConnected(!isConnected)}>
                            Ingresar a la Sala
                        </Button>
                    </div>
                    {user?.role === 'doctor' &&
                        <PatientInfo patientInfoSelected={patient} />
                    }
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