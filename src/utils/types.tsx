type DateEvent = {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
}

type User = {
    id: string;
    email: string;
    name: string;
    role: string;
    token: string;
}


type Person = {
    id: string;
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    primerNombre: string;
    segundoNombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    genero: string;
    estadoCivil: string;
    telefono: string;
    celular: string;
    correoElectronico: string;
    // especializacion: string;
}

type Header = {
    organizationIdentifier: string;
    operationalUnit: string;
    extensionCode: string;
    parish: string;
    canton: string;
    province: string;
    clinicalHistoryNumber: string;
}

type Persona = {
    Apll_mat: string;
    Apll_pat: string;
    barr: string;
    Cll_prncpal: string;
    Cll_scndria: string;
    Cntn_nac: string;
    Cntn_res: string;
    cel: string;
    email: string;
    Drccn_cntct: string;
    Std_cvl: string;
    gen: string;
    nac: string;
    Lgr_nac: string;
    Fch_nac: string;
    Nmbr_apll_cntct: string;
    Num_cas: string;
    Num_id: string;
    prentsco: string;
    Prrq_nac: string;
    Prrq_resid: string;
    Prim_nmbr: string;
    Prov_nac: string;
    Prov_res: string;
    Ref_res: string;
    Seg_nmbr: string;
    tel: string;
    Tel_cont: string;
    Tp_id: string;
}

type Form1Informacion = {
    unidadOperativa: string;
    codUO: string;
    parroquia: string;
    canton: string;
    provincia: string;
    numHistoriaClinica: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    primerNombre: string;
    segundoNombre: string;
    numCedula: string;
    direccionResidencia: string;
    barrio: string;
    parroquiaResidencia: string;
    cantonResidencia: string;
    provinciaResidencia: string;
    zona: string;
    numTelefono: string;
    fechaNacimiento: string;
    lugarNacimiento: string;
    nacionalidad: string;
    grupoCultural: string;
    edad: number;
    sexo: string;
    estadoCivil: string;
    instruccionUltimoAnio: string;
    fechaAdmision: string;
    ocupacion: string;
    empresaTrabajo: string;
    tipoSeguroSalud: string;
    referidoDe: string;
    enCasoNecesarioLlamar: string;
    parentescoAfinidad: string;
    direccionContacto: string;
    numTelefonoContacto: string;
    admisionista: string;
};

type Form2Anamnesis = {
    establecimiento: string;
    nombre: string;
    apellido: string;
    sexo: string;
    numHoja: number;
    historiaClinica: string;
    motivoConsulta: string;
    vacunas: string;
    enfermedadPerinatal: string;
    enfermedadInfancia: string;
    enfermedadAdolescencia: string;
    enfermedadAlergica: string;
    enfermedadCardiaca: string;
    enfermedadRespiratoria: string;
    enfermedadDigestiva: string;
    enfermedadNeurologica: string;
    enfermedadMetabolica: string;
    enfermedadHemoLinfatica: string;
    enfermedadUrinaria: string;
    enfermedadTraumatica: string;
    enfermedadQuirurgica: string;
    enfermedadMental: string;
    enfermedadTransmisionSexual: string;
    tendenciaSexual: string;
    riesgoSocial: string;
    riesgoLaboral: string;
    riesgoFamiliar: string;
    actividadFisica: string;
    dietaHabitos: string;
    religionCultura: string;
    otro: string;
    menarquiaEdad: number;
    menopausiaEdad: number;
    ciclos: string;
    vidaSexualActiva: string;
    gesta: number;
    partos: number;
    abortos: number;
    cesareas: number;
    hijosVivos: number;
    fum: string;
    fuc: string;
    fup: string;
    biopsia: string;
    metodoPlanificacionFamiliar: string;
    terapiaHormonal: string;
    colposcopia: string;
    mamografia: string;
};

type Form2Evolucion = {
    fecha: string;
    hora: string;
    evolucion: string;
    prescripciones: string;
    medicamentos: string;
};

// type Form3Anamnesis = {
//     establecimiento: string;
//     nombre: string;
//     apellido: string;
//     sexo: string;
//     numeroHoja: string;
//     historiaClinica: string;
//     motivoConsulta: string;
//     vacunas: string;
//     enfermedadPerinatal: string;
//     enfermedadInfancia: string;
//     enfermedadAdolescencia: string;
//     enfermedadAlergica: string;
//     enfermedadCardiaca: string;
//     enfermedadRespiratoria: string;
//     enfermedadDigestiva: string;
//     enfermedadNeurologica: string;
//     enfermedadMetabolica: string;
//     enfermedadHemoLinfatica: string;
//     enfermedadUrinaria: string;
//     enfermedadTraumatica: string;
//     enfermedadQuirurgica: string;
//     enfermedadMental: string;
//     enfermedadTransmisionSexual: string;
//     tendenciaSexual: string;
//     riesgoSocial: string;
//     riesgoLaboral: string;
//     riesgoFamiliar: string;
//     actividadFisica: string;
//     dietaHabitos: string;
//     religionCultura: string;
//     otro: string;
//     menarquiaEdad: string;
//     menopausiaEdad: string;
//     ciclos: string;
//     vidaSexualActiva: string;
//     gesta: string;
//     partos: string;
//     abortos: string;
//     cesareas: string;
//     hijosVivos: string;
//     fum: string; // Fecha última menstruación
//     fuc: string; // Fecha última citología
//     fup: string; // Fecha último parto
//     biopsia: string;
//     metodoPlanificacionFamiliar: string;
//     terapiaHormonal: string;
//     colposcopia: string;
//     mamografia: string;
// };

type Form3ExamenFisico = {
    indiceMasaCorporal: number;
    presionArterial: string;
    frecuenciaCardiaca: number;
    frecuenciaRespiratoria: number;
    temperaturaBucal: number;
    temperaturaAxilar: number;
    peso: number;
    talla: number;
    perimetroCefalico: number;
    pielYFaneras: string;
    cabeza: string;
    ojos: string;
    oidos: string;
    nariz: string;
    boca: string;
    oroFaringe: string;
    cuello: string;
    axilasMamas: string;
    torax: string;
    abdomen: string;
    columnaVertebral: string;
    inglePerine: string;
    miembrosSuperiores: string;
    miembrosInferiores: string;
    organosSentidos: string;
    respiratorio: string;
    cardioVascular: string;
    digestivo: string;
    genital: string;
    urinario: string;
    musculoEsqueletico: string;
    endocrino: string;
    hemoLinfatico: string;
    neurologico: string;
    descripcion: string;
    cie: string;
    presuntivoDefinitivo: string;
    fechaControl: string;
    horaFin: string;
    medico: string;
    codigo: string;
    firma: string;
};

type Form5Evolucion = {
    establecimiento: string;
    nombre: string;
    apellido: string;
    sexo: string;
    numeroHoja: string;
    historiaClinica: string;
    fecha: string;
    hora: string;
    evolucion: string;
    prescripciones: string;
    medicamentos: string;
};
