import {
    ControlBar, GridLayout, LiveKitRoom, ParticipantTile, RoomAudioRenderer, TrackContext, useToken, useTracks,
    Chat
} from '@livekit/components-react';
import type { NextPage } from 'next';
import '@livekit/components-styles';
import { useRouter } from 'next/router';
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Track } from 'livekit-client';
import Cookies from 'js-cookie';
import Layout from '@/components/Layout';
import OffCanvasInfo from '@/components/OffCanvas';
import PatientInfo from '@/components/PatientInfo';
import appoitments from '../../public/appoitments.json';
import patientData from '../../public/patientData.json';



const VideoConference: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const params = typeof window !== 'undefined' ? new URLSearchParams(location.search) : null;
    const roomName = id?.toString() ?? "";
    const { user } = useContext(AuthContext);
    const userIdentity = user?.name ?? "";
    const [connect, setConnect] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const { isLoggedIn } = useContext(AuthContext);
    const [patient, setPatient] = useState<any>(null);


    const token = useToken(process.env.NEXT_PUBLIC_LK_TOKEN_ENDPOINT, roomName, {
        userInfo: {
            identity: userIdentity,
            name: userIdentity,
        },
    })

    const handleDisconnect = () => {
        setConnect(false);
        setIsConnected(false);
    };

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (!isLoggedIn) {
            Cookies.set('redirectUrl', "room/" + roomName);
        }
        if (params) {
            const appoitment = appoitments.find((appoitment) => appoitment.id === id);
            setPatient(patientData.find((patient: any) => patient.idPaciente === appoitment?.idPatient))
            if (appoitment) {
                Cookies.set('redirectUrl', "room/" + roomName);
            }
        }
    }, [id]);

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
                        {user?.role === 'doctor' &&
                            <OffCanvasInfo patientInfoSelected={patient} />
                        }
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