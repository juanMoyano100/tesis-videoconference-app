import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  TrackContext,
  useToken,
  useTracks,
  Chat,
  VideoConference,
  LocalUserChoices,
} from "@livekit/components-react";

import { VideoConference as CustomVideo } from "@/components/VideoConference";
import type { NextPage } from "next";
import "@livekit/components-styles";
import { useRouter } from "next/router";
import { Button, Row, Spinner } from "react-bootstrap";
import {
  DeviceUnsupportedError,
  ExternalE2EEKeyProvider,
  Room,
  RoomConnectOptions,
  RoomOptions,
  Track,
  VideoCodec,
  VideoPresets,
} from "livekit-client";
import Layout from "@/components/Layout";
import OffCanvasInfo from "@/components/OffCanvas";
import PatientInfo from "@/components/PatientInfo";
import patientData from "../../public/patientData.json";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import OffCanvasCalendar from "@/components/OffCanvasCalendar";
import styles from "./style.module.css";
import RequestModal from "@/components/RequestModal";
import dynamic from "next/dynamic";
import OffCanvasPulxiometro from "@/components/OffCanvasPulxiometro";

const VideoConferencePage: NextPage = () => {
  const router = useRouter();
  const { id, codec, hq } = router.query;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const params =
    typeof window !== "undefined" ? new URLSearchParams(location.search) : null;
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
  const [screenWidth, setScreenWidth] = useState<string>("100%");

  const [patientState, setPatientState] = useState<string>("");
  const [preJoinChoices, setPreJoinChoices] = useState<
    LocalUserChoices | undefined
  >(undefined);

  const token = useToken(process.env.NEXT_PUBLIC_LK_TOKEN_ENDPOINT, roomName, {
    userInfo: {
      identity: userIdentity,
      name: userIdentity,
    },
  });

  const getUserByEmail = async (email: string) => {
    fetch(`/api/getUserByEmail?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  };

  const getAppoitmentById = async (id: string) => {
    fetch(`/api/getAppointmentById?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAppoitment(data);
      });
  };

  const getAppointmentByUser = async (id: string, role: string) => {
    fetch(`/api/getAppointmentByUser?id${role}=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      });
  };

  const handleDisconnect = () => {
    setConnect(false);
    setIsConnected(false);
  };

  const createRequest = async (
    idDoctor: string,
    idPatient: string,
    state: string
  ) => {
    fetch("/api/createRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idDoctor, idPatient, state }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    if (session === undefined) return;
    if (!session) {
      router.push("/login");
    } else if (session.user?.email) {
      if (!user && !appoitment) getUserByEmail(session.user.email);
      getAppoitmentById(id?.toString() ?? "");
    }
  }, [id, router, session]);

  useEffect(() => {
    if (user?.id) {
      getAppointmentByUser(
        user?.id,
        user?.role[0].toUpperCase() + user?.role.slice(1)
      );
    }
  }, [user]);

  useEffect(() => {
    if (params && patientData !== null) {
      setPatient(
        patientData.find(
          (patient: any) => patient.idPaciente === appoitment?.idPatient
        )
      );
    }
  }, [appoitment?.idPatient, id, params]);

  useEffect(() => {
    if (
      user?.role === "patient" &&
      appoitment?.idDoctor &&
      appoitment?.idPatient &&
      patientState === ""
    ) {
      const interval = setInterval(() => {
        fetch(
          `/api/getByidPatientandIdDoctor?idDoctor=${appoitment?.idDoctor}&idPatient=${appoitment?.idPatient}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data?.message) {
              setError(data.message);
            } else {
              setRequestData(data);
              setPatientState(data.state);
            }
          });
      }, 9000);
      return () => clearInterval(interval);
    }
    if (user?.role === "doctor" && patientState === "PENDIENTE") {
      const interval = setInterval(() => {
        fetch(
          `/api/getByidPatientandIdDoctor?idDoctor=${appoitment?.idDoctor}&idPatient=${appoitment?.idPatient}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data?.message) {
              setError(data.message);
            } else {
              setRequestData(data);
              setPatientState(data.state);
            }
          });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [appoitment?.idDoctor, appoitment?.idPatient, user?.role, patientState]);

  useEffect(() => {
    if (user?.role == "patient" && patientState === "PENDIENTE") {
      setShowModal(true);
    }
  }, [patientState]);

  const renderDoctorPreCall = () => {
    return (
      <>
        {patientState === "APROBADO" ? (
          <>
            <div className="d-flex justify-content-center py-2">
              {user && (
                <PreJoinNoSSR
                  data-lk-theme="default"
                  onError={(err) =>
                    console.log("error while setting up prejoin", err)
                  }
                  defaults={{
                    username: user.name,
                    videoEnabled: false,
                    audioEnabled: false,
                  }}
                  userLabel="Nombre"
                  camLabel="Cámara"
                  micLabel="Micrófono"
                  joinLabel="Unirse"
                  onSubmit={handlePreJoinSubmit}
                ></PreJoinNoSSR>
              )}
            </div>
            <OffCanvasInfo patientInfoSelected={patient} />
          </>
        ) : (
          <div className={styles.form}>
            <Row className={styles.header}>
              <h2>{appoitment?.title}</h2>
            </Row>
            {patientState === "" && (
              <div className="d-flex justify-content-center">
                <Button
                  variant="success"
                  onClick={() => {
                    createRequest(user?.id, appoitment?.idPatient, "PENDIENTE");
                    setPatientState("PENDIENTE");
                  }}
                >
                  Solicitar Acceso
                </Button>
              </div>
            )}
            {patientState === "PENDIENTE" && (
              <div className="text-center py-2">
                <div className="d-flex justify-content-center">
                  <h4>
                    Estado de la solicitud:{" "}
                    <span className="text-warning">{patientState}</span>
                  </h4>
                </div>
                <Spinner
                  animation="grow"
                  className="px-2"
                  style={{ height: "15px", width: "15px" }}
                />
                Esperando aprobación del paciente
                <div className="d-flex justify-content-center py-2">
                  <Button
                    variant="success"
                    onClick={() => setPatientState("PENDIENTE")}
                  >
                    {" "}
                    Revisar solicitud{" "}
                  </Button>
                </div>
              </div>
            )}
            {patientState === "RECHAZADO" && (
              <div className="text-center py-2">
                <div className="d-flex justify-content-center">
                  <h4>
                    Estado de la solicitud:{" "}
                    <span className="text-danger">{patientState}</span>
                  </h4>
                </div>
                <Button
                  variant="success"
                  onClick={() => setPatientState("PENDIENTE")}
                >
                  {" "}
                  Solicitar nuevamente{" "}
                </Button>
              </div>
            )}
          </div>
        )}
      </>
    );
  };

  const renderPatientPreCall = () => {
    return (
      <>
        {patientState === "APROBADO" ? (
          <>
            <div className="d-flex justify-content-center py-2">
              {user && (
                <PreJoinNoSSR
                  data-lk-theme="default"
                  onError={(err) =>
                    console.log("error while setting up prejoin", err)
                  }
                  defaults={{
                    username: user.name,
                    videoEnabled: false,
                    audioEnabled: false,
                  }}
                  userLabel="Nombre"
                  camLabel="Cámara"
                  micLabel="Micrófono"
                  joinLabel="Unirse"
                  onSubmit={handlePreJoinSubmit}
                ></PreJoinNoSSR>
              )}
            </div>
          </>
        ) : (
          <div className={styles.form}>
            <Row className={styles.header}>
              <h2>{"Solicitud de acceso"}</h2>
            </Row>
            {patientState === "" && (
              <div className="d-flex justify-content-center align-items-center">
                {error === "" ? (
                  <>
                    <Spinner
                      animation="grow"
                      className="px-2"
                      style={{ height: "15px", width: "15px" }}
                    />
                    {"Esperando solicitud del médico"}
                  </>
                ) : (
                  <div>
                    <Row className="text-danger">{error}</Row>
                    <Row className="py-2">
                      <Button
                        variant="success"
                        onClick={() => {
                          setPatientState("");
                          setError("");
                        }}
                      >
                        {" "}
                        Intentar nuevamente{" "}
                      </Button>
                    </Row>
                  </div>
                )}
              </div>
            )}
            <RequestModal
              show={showModal}
              setShow={setShowModal}
              idRequest={requestData?.id}
              requestData={requestData}
              setRequestData={setRequestData}
              setPatientState={setPatientState}
            />
          </div>
        )}
      </>
    );
  };

  const PreJoinNoSSR = dynamic(
    async () => {
      return (await import("@livekit/components-react")).PreJoin;
    },
    { ssr: false }
  );
  function handlePreJoinSubmit(values: LocalUserChoices) {
    setPreJoinChoices(values);
    setIsConnected(!isConnected);
  }

  return (
    <Layout data-lk-theme="default">
      {!isConnected ? (
        <div style={{ background: "#111", height: "calc(100vh - 68px)" }}>
          {user?.role === "doctor" && renderDoctorPreCall()}
          {user?.role === "patient" && renderPatientPreCall()}
        </div>
      ) : (
        <div style={{ height: "calc(100vh - 136px)", width: screenWidth }}>
          <div
            className="d-flex py-2 justify-content-center"
            style={{ background: "#111" }}
          >
            {user?.role === "doctor" && (
              <OffCanvasInfo patientInfoSelected={patient} />
            )}
            {user?.role === "doctor" && (
              <OffCanvasCalendar
                events={events}
                enableAddDate={true}
                patientInfo={{
                  title: appoitment?.title,
                  idPatient: appoitment?.idPatient,
                  idDoctor: appoitment?.idDoctor,
                }}
              />
            )}
            {(user?.role === "doctor" || user?.role === "patient") && (
              <OffCanvasPulxiometro
                isPatient={user?.role === "patient"}
                setScreenWidth={setScreenWidth}
              ></OffCanvasPulxiometro>
            )}
          </div>

          <LiveKitRoom
            video={preJoinChoices?.videoEnabled ?? true}
            audio={preJoinChoices?.audioEnabled ?? true}
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LK_SERVER_URL}
            data-lk-theme="default"
            onDisconnected={handleDisconnect}
            connect={isConnected}
            onConnected={() => {
              setConnect(true);
            }}
          >
            <CustomVideo />
          </LiveKitRoom>
        </div>
      )}
    </Layout>
  );
};

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  return (
    <>
      <GridLayout
        tracks={tracks}
        style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
      >
        {/* The GridLayout accepts zero or one child. The child is used
        as a template to render all passed in tracks. */}
        <ParticipantTile>
          <TrackContext.Consumer>
            {(track) => <ParticipantTile {...track} />}
          </TrackContext.Consumer>
        </ParticipantTile>
      </GridLayout>
    </>
  );
}

function Stage() {
  const cameraTracks = useTracks([Track.Source.Camera]);
  const screenShareTrack = useTracks([Track.Source.ScreenShare])[0];
  return (
    <>
      {screenShareTrack && <ParticipantTile {...screenShareTrack} />}
      <GridLayout tracks={cameraTracks}>
        <TrackContext.Consumer>
          {(track) => <ParticipantTile {...track} />}
        </TrackContext.Consumer>
      </GridLayout>
    </>
  );
}
export default VideoConferencePage;
