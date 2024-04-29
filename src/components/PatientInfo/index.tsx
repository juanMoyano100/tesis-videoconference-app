import React, { useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import styles from './style.module.css'

const PatientInfo = (patientInfoSelected: any) => {

    useEffect(() => {
        setPatientInfo(patientInfoSelected.patientInfoSelected)
    }, [patientInfoSelected])
    const [patientInfo, setPatientInfo] = useState<any>(patientInfoSelected)
    return (
        <>
            <Tabs defaultActiveKey="Form1" id="forms-tab" className="mb-3">
                {patientInfo?.nivelAcceso &&
                    <Tab eventKey="Form1" title="Información Paciente">
                        <div className={styles.form}>
                            <Row className={styles.header}>
                                <h2 >{patientInfo?.institucionSistema}</h2>
                            </Row>
                            <div className={styles.content}>
                                <Row>
                                    <Col md={4} sm={12}>
                                        <p><b>Nivel de Acceso:</b> {patientInfo?.nivelAcceso}</p>
                                    </Col>
                                    <Col md={4} sm={12}>
                                        <p><b>Fecha Admisión: </b>{patientInfo?.fechaAdmision}</p>
                                    </Col>
                                    <Col md={4} sm={12}>
                                        <p><b>Admisionista: </b>{patientInfo?.admisionista}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <p><b>Unidad Operativa: </b>{patientInfo?.unidadOperativa}</p>
                                        <p><b>COD. UO:</b> {patientInfo?.unidadOperativa}</p>
                                        <p><b>Historia Clínica: </b>{patientInfo?.unidadOperativa}</p>
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <p><b>Parroquia: </b>{patientInfo?.parroquia}</p>
                                        <p><b>Cantón:</b> {patientInfo?.canton}</p>
                                        <p><b>Provincia: </b>{patientInfo?.provincia}</p>
                                    </Col>
                                </Row>
                            </div>
                            <Row className={styles.header}>
                                <h3 >Datos personales</h3>
                            </Row>
                            <div className={styles.content}>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <p><b>Nombres y Apellidos:</b> {patientInfo?.primerNombre}  {patientInfo?.segundoNombre}  {patientInfo?.apellidoPaterno} {patientInfo?.apellidoMaterno}</p>
                                        <p><b>Fecha Nacimiento: </b>{patientInfo?.fechaNacimiento}</p>
                                        <p><b>Lugar Nacimiento: </b>{patientInfo?.lugarNacimiento}</p>
                                        <p><b>Sexo: </b>{patientInfo?.sexo}</p>
                                        <p><b>Estado Civil: </b>{patientInfo?.estadoCivil}</p>
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <p><b>CI: </b>{patientInfo?.numCedula}</p>
                                        <p><b>Edad: </b>{patientInfo?.edad}</p>
                                        <p><b>Nacionalidad: </b>{patientInfo?.nacionalidad}</p>
                                        <p><b>Teléfono: </b>{patientInfo?.numTelefono}</p>
                                        <p><b>Ocupación: </b>{patientInfo?.ocupacion}</p>
                                    </Col>
                                </Row>

                            </div>
                            <Row className={styles.header}>
                                <h3>Información de residencia</h3>
                            </Row>
                            <div className={styles.content}>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <p><b>Dirección: </b>{patientInfo?.direccionResidencia}</p>
                                        <p><b>Zona: </b>{patientInfo?.zona}</p>
                                        <p><b>Barrio: </b>{patientInfo?.barrio}</p>
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <p><b>Cantón Residencia: </b>{patientInfo?.cantonResidencia}</p>
                                        <p><b>Provincia Residencia: </b>{patientInfo?.provinciaResidencia}</p>
                                        <p><b>Parroquia Residencia: </b>{patientInfo?.parroquiaResidencia}</p>
                                    </Col>
                                </Row>
                            </div>

                            <Row className={styles.header}>
                                <h3>Información adicional</h3>
                            </Row>
                            <div className={styles.content}>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <p><b>Instruccion Ultimo Año: </b>{patientInfo?.instruccionUltimoAnio}</p>
                                        <p><b>Grupo Cultural: </b>{patientInfo?.grupoCultural}</p>
                                        <p><b>En Caso de emergencia Llamar a: </b>{patientInfo?.enCasoNecesarioLlamar}</p>
                                        <p><b>Dirección Contacto: </b>{patientInfo?.direccionContacto}</p>
                                        <p><b>Teléfono Contacto: </b>{patientInfo?.numTelefonoContacto}</p>

                                    </Col>
                                    <Col md={6} sm={12}>
                                        <p><b>Empresa Trabajo: </b>{patientInfo?.empresaTrabajo}</p>
                                        <p><b>Tipo Seguro Salud: </b>{patientInfo?.tipoSeguroSalud}</p>
                                        <p><b>Referido De: </b>{patientInfo?.referidoDe}</p>
                                        <p><b>Parentesco Afinidad: </b>{patientInfo?.parentescoAfinidad}</p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Tab>
                }
                {patientInfo?.nivelAcceso > 1 &&
                    <Tab eventKey="Form2" title="Anamnesis">
                        <div className={styles.form}>
                            <Row className={styles.header}>
                                <h2 >{patientInfo?.establecimiento}</h2>
                            </Row>
                            <div className={styles.content}>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <p><b>Nombre:</b> {patientInfo?.nombre} {patientInfo?.apellido}</p>
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <p><b>Historia Clínica: </b>{patientInfo?.historiaClinica}</p>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <p><b>Motivo Consulta: </b>{patientInfo?.motivoConsulta}</p>
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <p><b>Vacunas</b> {patientInfo?.vacunas}</p>
                                    </Col>
                                </Row>
                            </div>
                            <Row className={styles.header}>
                                <h3 >Enfermedades</h3>
                            </Row>
                            <div className={styles.content}>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <p><b>Enfermedad Perinatal:</b> {patientInfo?.enfermedadPerinatal}  {patientInfo?.segundoNombre}  {patientInfo?.apellidoPaterno} {patientInfo?.apellidoMaterno}</p>
                                        <p><b>Enfermedad Infancia: </b>{patientInfo?.enfermedadInfancia}</p>
                                        <p><b>Enfermedad Adolescencia: </b>{patientInfo?.enfermedadAdolescencia}</p>
                                        <p><b>Enfermedad Alergica: </b>{patientInfo?.enfermedadAlergica}</p>
                                        <p><b>Enfermedad Cardiaca: </b>{patientInfo?.enfermedadCardiaca}</p>
                                        <p><b>Enfermedad Urinaria: </b>{patientInfo?.enfermedadUrinaria}</p>
                                        <p><b>Enfermedad Quirurgica: </b>{patientInfo?.enfermedadQuirurgica}</p>
                                        <p><b>Enfermedad Transmision Sexual: </b>{patientInfo?.enfermedadTransmisionSexual}</p>
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <p><b>Enfermedad Respiratoria</b>{patientInfo?.enfermedadRespiratoria}</p>
                                        <p><b>Enfermedad Digestiva: </b>{patientInfo?.enfermedadDigestiva}</p>
                                        <p><b>Enfermedad Neurologica: </b>{patientInfo?.enfermedadNeurologica}</p>
                                        <p><b>Enfermedad Metabolica: </b>{patientInfo?.enfermedadMetabolica}</p>
                                        <p><b>Enfermedad HemoLinfatica: </b>{patientInfo?.enfermedadHemoLinfatica}</p>
                                        <p><b>Enfermedad Traumatica: </b>{patientInfo?.enfermedadTraumatica}</p>
                                        <p><b>Enfermedad Mental: </b>{patientInfo?.enfermedadMental}</p>
                                    </Col>
                                </Row>

                            </div>
                            <Row className={styles.header}>
                                <h3>Antecedentes</h3>
                            </Row>
                            <div className={styles.content}>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <p><b>Tendencia Sexual: </b>{patientInfo?.tendenciaSexual}</p>
                                        <p><b>Riesgo Social: </b>{patientInfo?.riesgoSocial}</p>
                                        <p><b>Riesgo Laboral: </b>{patientInfo?.riesgoLaboral}</p>
                                        <p><b>Religion Cultura: </b>{patientInfo?.religionCultura}</p>
                                        <p><b>Menopausia Edad: </b>{patientInfo?.menopausiaEdad}</p>
                                        <p><b>Ciclos: </b>{patientInfo?.ciclos}</p>
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <p><b>Riesgo Familiar: </b>{patientInfo?.riesgoFamiliar}</p>
                                        <p><b>Actividad Fisica: </b>{patientInfo?.actividadFisica}</p>
                                        <p><b>Dieta Habitos: </b>{patientInfo?.dietaHabitos}</p>
                                        <p><b>Menarquia Edad: </b>{patientInfo?.menarquiaEdad}</p>
                                        <p><b>Vida Sexual Activa: </b>{patientInfo?.vidaSexualActiva}</p>
                                        <p><b>Colposcopia: </b>{patientInfo?.colposcopia}</p>
                                    </Col>
                                </Row>
                            </div>

                            <Row className={styles.header}>
                                <h3>Antecedentes Obstétricos</h3>
                            </Row>
                            <div className={styles.content}>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <p><b>Gesta: </b>{patientInfo?.gesta}</p>
                                        <p><b>Partos: </b>{patientInfo?.partos}</p>
                                        <p><b>Abortos: </b>{patientInfo?.abortos}</p>
                                        <p><b>Cesareas: </b>{patientInfo?.cesareas}</p>
                                        <p><b>Hijos Vivos: </b>{patientInfo?.hijosVivos}</p>
                                        <p><b>Terapia Hormonal: </b>{patientInfo?.terapiaHormonal}</p>
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <p><b>Fecha última menstruación: </b>{patientInfo?.fum}</p>
                                        <p><b>Fecha última citología: </b>{patientInfo?.fuc}</p>
                                        <p><b>Fecha último parto: </b>{patientInfo?.fup}</p>
                                        <p><b>Biopsia: </b>{patientInfo?.biopsia}</p>
                                        <p><b>Metodo Planificacion Familiar: </b>{patientInfo?.metodoPlanificacionFamiliar}</p>
                                        <p><b>Mamografia: </b>{patientInfo?.mamografia}</p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Tab>
                }
                {patientInfo?.nivelAcceso > 1 &&
                    <Tab eventKey="Form4" title="Evolución" >
                        <div className={styles.form}>
                            <Row className={styles.header}>
                                <h2 >Evolución</h2>
                            </Row>
                            <div className={styles.content}>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <p><b>Fecha:</b> {patientInfo?.fecha}</p>
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <p><b>Hora: </b>{patientInfo?.hora}</p>
                                    </Col>
                                    <Row>
                                        <p>{patientInfo?.evolucion}</p>
                                    </Row>
                                </Row>
                                <Row className={styles.header}>
                                    <h2 >Prescripciones</h2>
                                </Row>
                                <Row>
                                    <p>{patientInfo?.prescripciones}</p>
                                </Row>
                                <Row className={styles.header}>
                                    <h2 >Medicamentos</h2>
                                </Row>
                                <Row>
                                    <p>{patientInfo?.medicamentos}</p>
                                </Row>
                            </div>

                        </div>
                    </Tab>
                }
                {patientInfo?.nivelAcceso > 1 && patientInfo?.nivelAcceso === 3 &&
                    <Tab eventKey="Form3" title="Examen físico" >
                        <div className={styles.form}>
                            <Row className={styles.header}>
                                <h2 >Información general</h2>
                            </Row>
                            <div className={styles.content}>
                                <Row>
                                    <Col>
                                        <p><b>Médico: </b>{patientInfo?.medico}</p>
                                        <p><b>Fecha Control:</b> {patientInfo?.fechaControl}</p>
                                        <p><b>Diagnostico CIE:</b> {patientInfo?.cie}</p>
                                        <p><b>Hora de finalización: </b>{patientInfo?.horaFin}</p>
                                    </Col>
                                    <Col>
                                        <p><b>Descripción:</b> {patientInfo?.descripcion}</p>
                                        <p><b>Diagnostico Presuntivo/Definitivo:</b> {patientInfo?.presuntivoDefinitivo}</p>
                                        <p><b>Código:</b> {patientInfo?.codigo}</p>
                                        <p><b>Firma:</b> {patientInfo?.firma}</p>
                                    </Col>
                                </Row>
                            </div>
                            <Row className={styles.header}>
                                <h3> Evaluación física</h3>
                            </Row>
                            <div className={styles.content}>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <p><b>Índice de masa corporal:</b> {patientInfo?.indiceMasaCorporal}</p>
                                        <p><b>Presión arterial: </b>{patientInfo?.presionArterial}</p>
                                        <p><b>Frecuencia cardiaca: </b>{patientInfo?.frecuenciaCardiaca}</p>
                                        <p><b>Frecuencia respiratoria: </b>{patientInfo?.frecuenciaRespiratoria}</p>
                                        <p><b>Temperatura bucal: </b>{patientInfo?.temperaturaBucal}</p>
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <p><b>Temperatura axilar: </b>{patientInfo?.temperaturaAxilar}</p>
                                        <p><b>Peso: </b>{patientInfo?.peso}</p>
                                        <p><b>Talla: </b>{patientInfo?.talla}</p>
                                        <p><b>Perímetro cefálico: </b>{patientInfo?.perimetroCefalico}</p>
                                        <p><b>Piel y faneras: </b>{patientInfo?.pielYFaneras}</p>
                                    </Col>
                                </Row>

                            </div>
                            <Row className={styles.header}>
                                <h3>Examen de cabeza y cuello</h3>
                            </Row>
                            <div className={styles.content}>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <p><b>Cabeza:</b> {patientInfo?.cabeza}</p>
                                        <p><b>Ojos: </b>{patientInfo?.ojos}</p>
                                        <p><b>Oídos: </b>{patientInfo?.oidos}</p>
                                        <p><b>Nariz: </b>{patientInfo?.nariz}</p>
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <p><b>Boca: </b>{patientInfo?.boca}</p>
                                        <p><b>Oro faringe: </b>{patientInfo?.oroFaringe}</p>
                                        <p><b>Cuello: </b>{patientInfo?.cuello}</p>
                                    </Col>
                                </Row>
                            </div>
                            <Row className={styles.header}>
                                <h3>Examen de tórax y abdomen</h3>
                            </Row>
                            <div className={styles.content}>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <p><b>Axilas :</b> {patientInfo?.axilasMamas}</p>
                                        <p><b>Tórax: </b>{patientInfo?.torax}</p>
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <p><b>Abdomen: </b>{patientInfo?.abdomen}</p>
                                    </Col>
                                </Row>
                            </div>
                            <Row className={styles.header}>
                                <h3>Examen musculoesquelético y extremidades</h3>
                            </Row>
                            <div className={styles.content}>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <p><b>Columna vertebral:</b> {patientInfo?.columnaVertebral}</p>
                                        <p><b>Ingle: </b>{patientInfo?.inglePerine}</p>
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <p><b>Miembros superiores: </b>{patientInfo?.miembrosSuperiores}</p>
                                        <p><b>Miembros inferiores: </b>{patientInfo?.miembrosInferiores}</p>
                                    </Col>
                                </Row>
                            </div>

                            <Row className={styles.header}>
                                <h3>Evaluación de sistemas y órganos</h3>
                            </Row>
                            <div className={styles.content}>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <p><b>Órganos de los sentidos:</b> {patientInfo?.organosSentidos}</p>
                                        <p><b>Respiratorio: </b>{patientInfo?.respiratorio}</p>
                                        <p><b>Cardiovascular: </b>{patientInfo?.cardioVascular}</p>
                                        <p><b>Digestivo: </b>{patientInfo?.digestivo}</p>
                                        <p><b>Genital: </b>{patientInfo?.genital}</p>
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <p><b>Urinario: </b>{patientInfo?.urinario}</p>
                                        <p><b>Musculoesquelético: </b>{patientInfo?.musculoEsqueletico}</p>
                                        <p><b>Endocrino: </b>{patientInfo?.endocrino}</p>
                                        <p><b>Hemo linfático: </b>{patientInfo?.hemoLinfatico}</p>
                                        <p><b>Neurológico: </b>{patientInfo?.neurologico}</p>
                                    </Col>
                                </Row>
                            </div>

                        </div>
                    </Tab>
                }
            </Tabs >
        </>
    );
};

export default PatientInfo;
