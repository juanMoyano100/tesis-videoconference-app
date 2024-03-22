import React, { useEffect, useRef, useState } from "react";
import { Button, Offcanvas, Table } from "react-bootstrap";
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

const OffCanvasPulxiometro = (appoitment: any) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    handleStopGetPulxiometroData()
  }
  const toggleShow = () => setShow((s) => !s);
  const [pulxiometroData, setPulxiometroData] = useState([]);
  const [globalInterval, setGlobalInterval] = useState(5000);
  const [dataStarted, setDataStarted] = useState(false);

  const handleStartPulxiometroData = () => {
    const intervalId = setInterval(() => {
      fetch(
        `/api/getPulxiometroInfo?id_paciente=${appoitment?.appoitment?.idPatient}`
      )
        .then((response) => response.json())
        .then((data) => {
          setPulxiometroData(data);
        });
    }, 5000);
    setGlobalInterval(intervalId);
    setDataStarted(true);
  };

  const handleStopGetPulxiometroData = () => {
    clearInterval(globalInterval);
    setDataStarted(false);
  };

  const [displayData, setDisplayData] = useState([]);
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (indexRef.current < pulxiometroData.length - 1) {
        setDisplayData((prevData) => [
          ...prevData,
          pulxiometroData[indexRef.current],
        ]);
        indexRef.current++;
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [pulxiometroData]);

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
  };

  const labels = displayData.map((item: any) => item.timestamp.split("T")[1]);
  
  const data = {
    labels,
    datasets: [
      {
        label: "PPM",
        data: displayData.map((item: any) => item.ppm),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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
        <Offcanvas.Header closeButton>
          <Offcanvas.Title> Datos Pulxiometro</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex">
            <Button
              variant="primary"
              onClick={handleStartPulxiometroData}
              className="me-2"
            >
              Obtener lectura
            </Button>
            <Button
              variant="danger"
              onClick={handleStopGetPulxiometroData}
              className="me-2"
            >
              Detener lectura
            </Button>
          </div>
          {dataStarted ? <div>Obteniendo datos...</div> : <div>Detenido</div>}
          <div
            className="d-flex"
            style={{ height: "500px", maxHeight: "500px", overflow: "overlay" }}
          >
            <Table striped bordered hover size="sm" style={{ height: "300px" }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Hora</th>
                  <th>PPM</th>
                </tr>
              </thead>
              <tbody>
                {displayData.length > 0 ? (
                  displayData.map((data: any, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.timestamp}</td>
                      <td>{data.ppm}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>No hay datos</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <div
            className="d-flex"
            style={{ height: "500px", maxHeight: "500px", overflow: "overlay" }}
          >
            <Line options={options} data={data} />;
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffCanvasPulxiometro;
