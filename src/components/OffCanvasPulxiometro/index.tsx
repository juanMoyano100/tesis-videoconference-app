import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form, Offcanvas, Table } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

interface propsTypes {
  setScreenWidth: (value: string) => void;
  isPatient: boolean;
}

const OffCanvasPulxiometro = ({ setScreenWidth, isPatient }: propsTypes) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    handleStopGetPulxiometroData();
    setShowPulxiometroInfo(false);
    setScreenWidth("100%");
  };

  const toggleShow = () => {
    setScreenWidth("50%");
    setShow(true);
  };

  const [pulxiometroData, setPulxiometroData] = useState([]);
  const [globalInterval, setGlobalInterval] = useState(5000);
  const [dataStarted, setDataStarted] = useState(false);
  const [pulxiometroId, setPulxiometroId] = useState("");
  const [showPulxiometroInfo, setShowPulxiometroInfo] = useState(false);
  const [showMTC, setShowMTC] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerInterval = useRef<any>();

  const handleStartPulxiometroData = () => {
    const intervalId = setInterval(() => {
      fetch(`/api/getPulxiometroInfo?id_pulsioximetro=${pulxiometroId}`)
        .then((response) => response.json())
        .then((data) => {
          setPulxiometroData(data);
        });
    }, 5000);
    setGlobalInterval(intervalId as any);
    setDataStarted(true);
    setSeconds(0);
    timerInterval.current = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
  };

  const handleStopGetPulxiometroData = () => {
    clearInterval(globalInterval);
    setDataStarted(false);
    clearInterval(timerInterval.current);
  };

  const handleResetValues = () => {
    setDisplayData([]);
    setPulxiometroData([]);
    handleStopGetPulxiometroData();
    setSeconds(0);
  };

  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    const graphInterval = setInterval(() => {
      const lastThreeData = pulxiometroData.slice(-2); // Get the last three items

      lastThreeData.forEach((data, index) => {
        if (!displayData.includes(data)) {
          setDisplayData((prevData) => [...prevData, data]);
        }
      });
    }, 300);

    // Don't forget to clear the interval when the component unmounts
    return () => {
      clearInterval(graphInterval);
    };
  }, [pulxiometroData, displayData]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Pulxiometro",
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
      y: {},
    },
  };

  const labels = displayData.map((item: any) =>
    moment(item.timestamp).utcOffset("America/Guayaquil").format("HH:mm:ss")
  );

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const data = {
    labels,
    datasets: [
      {
        label: "PPM",
        data: displayData.map((item: any) => item.ppm),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "SP02",
        data: displayData.map((item: any) => item.spo2),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgb(54, 162, 235)",
      },
    ],
  };

  return (
    <>
      <div className="text-center py-2">
        <Button
          variant="primary"
          onClick={toggleShow}
          className="me-2"
          style={{ background: "#1e1e1e", border: "#1e1e1e" }}
        >
          Datos Pulxiometro
        </Button>
      </div>

      <Offcanvas
        className="lg"
        show={show}
        onHide={handleClose}
        scroll={true}
        placement="end"
        style={{ width: "50%" }}
      >
        <Offcanvas.Body className="p-0">
          <div className="d-flex">
            {!showPulxiometroInfo ? (
              <>
                <Form.Label
                  className="mx-2"
                  style={{ width: "200px", alignSelf: "center" }}
                >
                  Nro. Pulxiometro
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese el numero del pulxiometro"
                  className="mx-2"
                  value={pulxiometroId}
                  onChange={(e) => setPulxiometroId(e.target.value)}
                />
                <Button
                  variant="primary"
                  onClick={() => setShowPulxiometroInfo(true)}
                  className="mx-2"
                >
                  Guardar
                </Button>
              </>
            ) : (
              <div className="d-flex justify-content-between w-100">
                <div className="d-flex ">
                  <Button
                    variant="primary"
                    onClick={handleStartPulxiometroData}
                    className="m-2"
                  >
                    Obtener lectura
                  </Button>
                  {!isPatient && (
                    <Button
                      variant="danger"
                      onClick={handleStopGetPulxiometroData}
                      className="m-2"
                    >
                      Detener lectura
                    </Button>
                  )}
                  <div className="" style={{ alignSelf: "center" }}>
                    <h2>{formatTime(seconds)}</h2>
                  </div>
                </div>
                <div className="">
                  <Button
                    variant="secondary"
                    onClick={handleResetValues}
                    className="m-2"
                  >
                    Reset Test
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="m-2">
            {dataStarted ? <>Obteniendo datos...</> : <>Detenido</>}
          </div>
          <Container>
            <div
              className="d-flex"
              style={{ height: "20vh", maxHeight: "20vh", overflow: "overlay" }}
            >
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Hora</th>
                    <th>PPM</th>
                    <th>SP02</th>
                  </tr>
                </thead>
                <tbody>
                  {displayData.length > 0 ? (
                    displayData.map((data: any, index: number) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {moment(data.timestamp)
                            .utcOffset("America/Guayaquil")
                            .format("HH:mm:ss")}
                        </td>
                        <td>{data.ppm}</td>
                        <td>{data.spo2}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>No hay datos</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Container>
          {!showMTC && (
            <Container>
              <Button
                variant="primary"
                className="my-2"
                onClick={() => setShowMTC(true)}
              >
                Informe actual
              </Button>
            </Container>
          )}
          {showMTC && (
            <>
              <Container className="d-flex my-2">
                <Button variant="secondary" onClick={() => setShowMTC(false)}>
                  Ocultar informe actual
                </Button>
                <div className="mx-2" style={{ alignSelf: "center" }}>
                  <h3>En un tiempo de {formatTime(seconds)}</h3>
                </div>
              </Container>
              <Container>
                <div
                  className="d-flex justify-content-around align-items-center text-center mt-3"
                  style={{ color: "#666666" }}
                >
                  <div
                    style={{
                      width: "33%",
                      margin: "0 5px",
                      fontWeight: "bold",
                      fontSize: "10px",
                      border: "1px solid #e5e5e5",
                      borderRadius: "5px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <>Mínimo (ppm)</>
                    <h3>
                      {displayData.length > 0
                        ? Math.min(
                            ...displayData
                              .filter((item: any) => item.ppm !== 0)
                              .map((item: any) => item.ppm)
                          )
                        : 0}
                    </h3>
                  </div>
                  <div
                    style={{
                      width: "33%",
                      margin: "0 5px",
                      fontWeight: "bold",
                      fontSize: "10px",
                      border: "1px solid #e5e5e5",
                      borderRadius: "5px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <>Máximo (ppm)</>
                    <h3>
                      {displayData.length > 0
                        ? Math.max(...displayData.map((item: any) => item.ppm))
                        : 0}
                    </h3>
                  </div>
                  <div
                    style={{
                      width: "33%",
                      margin: "0 5px",
                      fontWeight: "bold",
                      fontSize: "10px",
                      border: "1px solid #e5e5e5",
                      borderRadius: "5px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <>Promedio (ppm)</>
                    <h3>
                      {displayData.length > 0
                        ? Math.round(
                            displayData.reduce(
                              (acc: number, item: any) => acc + item.ppm,
                              0
                            ) / displayData.length
                          )
                        : 0}
                    </h3>
                  </div>
                </div>
              </Container>
              <Container>
                <div
                  className="d-flex justify-content-around align-items-center text-center mt-3"
                  style={{ color: "#666666" }}
                >
                  <div
                    style={{
                      width: "33%",
                      margin: "0 5px",
                      fontWeight: "bold",
                      fontSize: "10px",
                      border: "1px solid #e5e5e5",
                      borderRadius: "5px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <>Mínimo (spo2)</>
                    <h3>
                      {displayData.length > 0
                        ? Math.min(
                            ...displayData
                              .filter((item: any) => item.spo2 !== 0)
                              .map((item: any) => item.spo2)
                          )
                        : 0}
                    </h3>
                  </div>
                  <div
                    style={{
                      width: "33%",
                      margin: "0 5px",
                      fontWeight: "bold",
                      fontSize: "10px",
                      border: "1px solid #e5e5e5",
                      borderRadius: "5px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <>Máxmo (spo2)</>
                    <h3>
                      {displayData.length > 0
                        ? Math.max(...displayData.map((item: any) => item.spo2))
                        : 0}
                    </h3>
                  </div>
                  <div
                    style={{
                      width: "33%",
                      margin: "0 5px",
                      fontWeight: "bold",
                      fontSize: "10px",
                      border: "1px solid #e5e5e5",
                      borderRadius: "5px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <>Promedio (spo2)</>
                    <h3>
                      {displayData.length > 0
                        ? Math.round(
                            displayData.reduce(
                              (acc: number, item: any) => acc + item.spo2,
                              0
                            ) / displayData.length
                          )
                        : 0}
                    </h3>
                  </div>
                </div>
              </Container>
            </>
          )}
          <div className="d-flex">
            <Container>
              {!isPatient && <Line options={options} data={data} />}
            </Container>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffCanvasPulxiometro;
