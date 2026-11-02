/* REP/BIT v2.5 — personal training log */
(() => {
  'use strict';
  const STORAGE_KEY = 'repbit-data-v1';
  // Los grupos se usan en la biblioteca. Las rutinas A/B se almacenan por separado.
  const DAY = {
    push: {label:'Push', desc:'Pecho · hombros · tríceps', line:'Empuje', icon:'arrow-up-right'},
    pull: {label:'Pull', desc:'Espalda · bíceps', line:'Tracción', icon:'arrow-down-left'},
    legs: {label:'Legs', desc:'Piernas · glúteos', line:'Piernas', icon:'activity'},
    core: {label:'Core', desc:'Zona media · estabilidad', line:'Core', icon:'activity'}
  };
  const ROUTINES = {
    push_a: {label:'Push A',group:'push',desc:'Base · pecho, hombros y tríceps',icon:'arrow-up-right'},
    push_b: {label:'Push B',group:'push',desc:'Variación de empuje',icon:'arrow-up-right'},
    pull_a: {label:'Pull A',group:'pull',desc:'Base · espalda y bíceps',icon:'arrow-down-left'},
    pull_b: {label:'Pull B',group:'pull',desc:'Variación de tracción',icon:'arrow-down-left'},
    legs_a: {label:'Legs A',group:'legs',desc:'Base · sentadilla clásica',icon:'activity'},
    legs_b: {label:'Legs B',group:'legs',desc:'Complementaria · piernas',icon:'activity'},
    core: {label:'Core',group:'core',desc:'Abdominales · estabilidad',icon:'activity'}
  };
  const routineLabel = day => ROUTINES[day]?.label || DAY[day]?.label || 'Entrenamiento';
  const routineGroup = day => ROUTINES[day]?.group || day;
  const isCore = session => session?.day === 'core' && session.kind === 'strength';
  const CATALOG = [
    [
        "p01",
        "Press de banca con barra",
        "push",
        "Pecho",
        "Barra",
        "bench press pecho plano"
    ],
    [
        "p16",
        "Press de banca declinado con barra",
        "push",
        "Pecho",
        "Barra",
        "decline bench pecho declinado"
    ],
    [
        "p19",
        "Press inclinado con barra",
        "push",
        "Pecho",
        "Barra",
        "incline bench"
    ],
    [
        "p20",
        "Press de banca con agarre cerrado",
        "push",
        "Pecho",
        "Barra",
        "close grip triceps"
    ],
    [
        "p21",
        "Press de banca en máquina Smith",
        "push",
        "Pecho",
        "Barra",
        "press smith"
    ],
    [
        "p22",
        "Press inclinado en máquina Smith",
        "push",
        "Pecho",
        "Barra",
        "smith inclinado"
    ],
    [
        "p23",
        "Press de banca con pausa",
        "push",
        "Pecho",
        "Barra",
        "pause bench"
    ],
    [
        "p02",
        "Press inclinado con mancuernas",
        "push",
        "Pecho",
        "Mancuernas",
        "incline dumbbell"
    ],
    [
        "p24",
        "Press plano con mancuernas",
        "push",
        "Pecho",
        "Mancuernas",
        "flat dumbbell press"
    ],
    [
        "p25",
        "Press declinado con mancuernas",
        "push",
        "Pecho",
        "Mancuernas",
        "decline db"
    ],
    [
        "p26",
        "Press con mancuernas agarre neutro",
        "push",
        "Pecho",
        "Mancuernas",
        "neutral grip dumbbells"
    ],
    [
        "p27",
        "Press en el suelo con mancuernas",
        "push",
        "Pecho",
        "Mancuernas",
        "floor press"
    ],
    [
        "p08",
        "Aperturas con mancuernas",
        "push",
        "Pecho",
        "Mancuernas",
        "dumbbell fly chest"
    ],
    [
        "p28",
        "Aperturas inclinadas con mancuernas",
        "push",
        "Pecho",
        "Mancuernas",
        "incline fly"
    ],
    [
        "p29",
        "Squeeze press con mancuernas",
        "push",
        "Pecho",
        "Mancuernas",
        "press compresion"
    ],
    [
        "p07",
        "Press de pecho en máquina",
        "push",
        "Pecho",
        "Máquina",
        "chest press"
    ],
    [
        "p13",
        "Press inclinado en máquina",
        "push",
        "Pecho",
        "Máquina",
        "incline machine"
    ],
    [
        "p30",
        "Press declinado en máquina",
        "push",
        "Pecho",
        "Máquina",
        "decline machine chest press"
    ],
    [
        "p31",
        "Press convergente de pecho en máquina",
        "push",
        "Pecho",
        "Máquina",
        "converging chest press"
    ],
    [
        "p17",
        "Aperturas en máquina (peck deck)",
        "push",
        "Pecho",
        "Máquina",
        "machine fly machine flys pec deck contractor"
    ],
    [
        "p32",
        "Press de pecho unilateral en máquina",
        "push",
        "Pecho",
        "Máquina",
        "single arm chest press"
    ],
    [
        "p11",
        "Aperturas en polea",
        "push",
        "Pecho",
        "Polea",
        "cable fly cruce poleas"
    ],
    [
        "p33",
        "Aperturas en polea de abajo hacia arriba",
        "push",
        "Pecho",
        "Polea",
        "low to high cable fly"
    ],
    [
        "p34",
        "Aperturas en polea de arriba hacia abajo",
        "push",
        "Pecho",
        "Polea",
        "high to low cable fly"
    ],
    [
        "p35",
        "Press de pecho de pie en polea",
        "push",
        "Pecho",
        "Polea",
        "cable chest press"
    ],
    [
        "p36",
        "Press de pecho unilateral en polea",
        "push",
        "Pecho",
        "Polea",
        "single arm cable press"
    ],
    [
        "p09",
        "Flexiones",
        "push",
        "Pecho",
        "Peso corporal",
        "push ups lagartijas"
    ],
    [
        "p06",
        "Fondos en paralelas",
        "push",
        "Pecho",
        "Peso corporal",
        "dips"
    ],
    [
        "p37",
        "Flexiones con manos elevadas",
        "push",
        "Pecho",
        "Peso corporal",
        "incline push ups"
    ],
    [
        "p38",
        "Flexiones con pies elevados",
        "push",
        "Pecho",
        "Peso corporal",
        "decline push ups"
    ],
    [
        "p39",
        "Flexiones con agarre estrecho",
        "push",
        "Pecho",
        "Peso corporal",
        "diamond push ups"
    ],
    [
        "p03",
        "Press militar",
        "push",
        "Hombros",
        "Barra",
        "overhead press barra"
    ],
    [
        "p40",
        "Press militar sentado con barra",
        "push",
        "Hombros",
        "Barra",
        "seated barbell shoulder press"
    ],
    [
        "p10",
        "Press de hombros con mancuernas",
        "push",
        "Hombros",
        "Mancuernas",
        "shoulder press"
    ],
    [
        "p41",
        "Press Arnold",
        "push",
        "Hombros",
        "Mancuernas",
        "arnold press"
    ],
    [
        "p04",
        "Elevaciones laterales",
        "push",
        "Hombros",
        "Mancuernas",
        "lateral raise mancuernas"
    ],
    [
        "p42",
        "Elevaciones laterales sentado",
        "push",
        "Hombros",
        "Mancuernas",
        "seated lateral raise"
    ],
    [
        "p43",
        "Elevaciones frontales con mancuernas",
        "push",
        "Hombros",
        "Mancuernas",
        "front raise"
    ],
    [
        "p44",
        "Press unilateral de hombros con mancuerna",
        "push",
        "Hombros",
        "Mancuernas",
        "single arm overhead press"
    ],
    [
        "p14",
        "Press de hombros en máquina",
        "push",
        "Hombros",
        "Máquina",
        "machine shoulder press"
    ],
    [
        "p45",
        "Elevaciones laterales en máquina",
        "push",
        "Hombros",
        "Máquina",
        "lateral raise machine"
    ],
    [
        "p46",
        "Elevaciones laterales en polea",
        "push",
        "Hombros",
        "Polea",
        "cable lateral raise"
    ],
    [
        "p47",
        "Elevaciones laterales unilaterales en polea",
        "push",
        "Hombros",
        "Polea",
        "single arm lateral raise"
    ],
    [
        "p48",
        "Elevaciones frontales en polea",
        "push",
        "Hombros",
        "Polea",
        "cable front raise"
    ],
    [
        "p49",
        "Press landmine a una mano",
        "push",
        "Hombros",
        "Polea",
        "landmine press"
    ],
    [
        "p05",
        "Extensión de tríceps en polea",
        "push",
        "Tríceps",
        "Polea",
        "pushdown barra"
    ],
    [
        "p15",
        "Extensión de tríceps sobre la cabeza en polea",
        "push",
        "Tríceps",
        "Polea",
        "overhead extension triceps"
    ],
    [
        "p50",
        "Extensión de tríceps con cuerda en polea",
        "push",
        "Tríceps",
        "Polea",
        "rope pushdown"
    ],
    [
        "p51",
        "Extensión unilateral de tríceps en polea",
        "push",
        "Tríceps",
        "Polea",
        "single arm tricep extension"
    ],
    [
        "p52",
        "Extensión de tríceps en polea con agarre inverso",
        "push",
        "Tríceps",
        "Polea",
        "reverse grip pushdown"
    ],
    [
        "p53",
        "Extensión cruzada de tríceps en polea",
        "push",
        "Tríceps",
        "Polea",
        "cross body extension"
    ],
    [
        "p18",
        "Extensión unilateral de tríceps con mancuerna sentado",
        "push",
        "Tríceps",
        "Mancuernas",
        "single arm overhead seated dumbbell extension"
    ],
    [
        "p54",
        "Extensión de tríceps sobre la cabeza con dos manos",
        "push",
        "Tríceps",
        "Mancuernas",
        "two hand overhead dumbbell extension"
    ],
    [
        "p55",
        "Press francés con mancuernas acostado",
        "push",
        "Tríceps",
        "Mancuernas",
        "lying dumbbell triceps extension"
    ],
    [
        "p56",
        "Patada de tríceps con mancuerna",
        "push",
        "Tríceps",
        "Mancuernas",
        "triceps kickback"
    ],
    [
        "p12",
        "Press francés",
        "push",
        "Tríceps",
        "Barra",
        "skullcrushers barra z ez french press"
    ],
    [
        "p57",
        "Extensión de tríceps acostado con barra EZ",
        "push",
        "Tríceps",
        "Barra",
        "skull crusher press frances barra z"
    ],
    [
        "p58",
        "Extensión de tríceps en máquina",
        "push",
        "Tríceps",
        "Máquina",
        "tricep extension machine"
    ],
    [
        "p59",
        "Fondos de tríceps en máquina",
        "push",
        "Tríceps",
        "Máquina",
        "machine dips"
    ],
    [
        "u01",
        "Jalón al pecho",
        "pull",
        "Espalda · tracción vertical",
        "Polea",
        "lat pulldown prono"
    ],
    [
        "u14",
        "Jalón al pecho con agarre neutro",
        "pull",
        "Espalda · tracción vertical",
        "Polea",
        "neutral grip lat pulldown palmas enfrentadas"
    ],
    [
        "u18",
        "Jalón al pecho con agarre supino",
        "pull",
        "Espalda · tracción vertical",
        "Polea",
        "chin grip pulldown"
    ],
    [
        "u19",
        "Jalón al pecho con agarre amplio",
        "pull",
        "Espalda · tracción vertical",
        "Polea",
        "wide grip lat pulldown"
    ],
    [
        "u20",
        "Jalón unilateral en polea alta",
        "pull",
        "Espalda · tracción vertical",
        "Polea",
        "single arm lat pulldown"
    ],
    [
        "u21",
        "Jalón al pecho con agarre estrecho",
        "pull",
        "Espalda · tracción vertical",
        "Polea",
        "close grip lat pulldown"
    ],
    [
        "u22",
        "Jalón al pecho con cuerda",
        "pull",
        "Espalda · tracción vertical",
        "Polea",
        "rope lat pulldown"
    ],
    [
        "u06",
        "Dominadas",
        "pull",
        "Espalda · tracción vertical",
        "Peso corporal",
        "pull ups"
    ],
    [
        "u13",
        "Dominadas asistidas",
        "pull",
        "Espalda · tracción vertical",
        "Peso corporal",
        "assisted pull ups"
    ],
    [
        "u23",
        "Dominadas con agarre neutro",
        "pull",
        "Espalda · tracción vertical",
        "Peso corporal",
        "neutral grip pullups"
    ],
    [
        "u24",
        "Dominadas supinas",
        "pull",
        "Espalda · tracción vertical",
        "Peso corporal",
        "chin ups"
    ],
    [
        "u25",
        "Dominadas con banda de asistencia",
        "pull",
        "Espalda · tracción vertical",
        "Peso corporal",
        "band assisted pull ups"
    ],
    [
        "u02",
        "Remo con barra",
        "pull",
        "Espalda · remo",
        "Barra",
        "barbell row"
    ],
    [
        "u26",
        "Remo Pendlay",
        "pull",
        "Espalda · remo",
        "Barra",
        "pendlay row"
    ],
    [
        "u27",
        "Remo con barra T",
        "pull",
        "Espalda · remo",
        "Barra",
        "t bar row"
    ],
    [
        "u28",
        "Remo invertido en barra",
        "pull",
        "Espalda · remo",
        "Barra",
        "inverted row australian"
    ],
    [
        "u07",
        "Remo con mancuerna",
        "pull",
        "Espalda · remo",
        "Mancuernas",
        "dumbbell row"
    ],
    [
        "u29",
        "Remo con pecho apoyado y mancuernas",
        "pull",
        "Espalda · remo",
        "Mancuernas",
        "chest supported dumbbell row"
    ],
    [
        "u30",
        "Remo unilateral con mancuerna en banco",
        "pull",
        "Espalda · remo",
        "Mancuernas",
        "one arm dumbbell row"
    ],
    [
        "u31",
        "Remo con mancuernas en banco inclinado",
        "pull",
        "Espalda · remo",
        "Mancuernas",
        "incline bench row"
    ],
    [
        "u03",
        "Remo sentado en polea",
        "pull",
        "Espalda · remo",
        "Polea",
        "seated cable row"
    ],
    [
        "u32",
        "Remo unilateral en polea baja",
        "pull",
        "Espalda · remo",
        "Polea",
        "one arm cable row"
    ],
    [
        "u33",
        "Remo sentado con agarre amplio",
        "pull",
        "Espalda · remo",
        "Polea",
        "wide grip cable row"
    ],
    [
        "u34",
        "Remo en polea alta hacia el pecho",
        "pull",
        "Espalda · remo",
        "Polea",
        "high cable row"
    ],
    [
        "u35",
        "Remo con cuerda en polea baja",
        "pull",
        "Espalda · remo",
        "Polea",
        "rope cable row"
    ],
    [
        "u12",
        "Remo en máquina",
        "pull",
        "Espalda · remo",
        "Máquina",
        "machine row"
    ],
    [
        "u36",
        "Remo en máquina con pecho apoyado",
        "pull",
        "Espalda · remo",
        "Máquina",
        "chest supported machine row"
    ],
    [
        "u37",
        "Remo unilateral en máquina",
        "pull",
        "Espalda · remo",
        "Máquina",
        "single arm machine row"
    ],
    [
        "u38",
        "Remo alto en máquina",
        "pull",
        "Espalda · remo",
        "Máquina",
        "high row"
    ],
    [
        "u39",
        "Remo con barra T apoyado en máquina",
        "pull",
        "Espalda · remo",
        "Máquina",
        "chest supported t bar"
    ],
    [
        "u11",
        "Pullover en polea",
        "pull",
        "Dorsales",
        "Polea",
        "straight arm pulldown barra"
    ],
    [
        "u15",
        "Jalón con brazos extendidos y cuerda",
        "pull",
        "Dorsales",
        "Polea",
        "rope straight arm pulldown pull over"
    ],
    [
        "u40",
        "Jalón con brazos extendidos y barra",
        "pull",
        "Dorsales",
        "Polea",
        "bar straight arm pulldown"
    ],
    [
        "u41",
        "Pullover unilateral en polea",
        "pull",
        "Dorsales",
        "Polea",
        "single arm pullover"
    ],
    [
        "u42",
        "Pullover en máquina",
        "pull",
        "Dorsales",
        "Máquina",
        "machine pullover"
    ],
    [
        "u43",
        "Pullover con mancuerna",
        "pull",
        "Dorsales",
        "Mancuernas",
        "dumbbell pullover"
    ],
    [
        "u08",
        "Face pull",
        "pull",
        "Deltoides posteriores",
        "Polea",
        "facepull cuerda"
    ],
    [
        "u44",
        "Aperturas inversas en polea",
        "pull",
        "Deltoides posteriores",
        "Polea",
        "reverse cable fly"
    ],
    [
        "u45",
        "Pájaros unilaterales en polea",
        "pull",
        "Deltoides posteriores",
        "Polea",
        "single arm rear delt fly"
    ],
    [
        "u10",
        "Pájaros con mancuernas",
        "pull",
        "Deltoides posteriores",
        "Mancuernas",
        "rear delt fly"
    ],
    [
        "u46",
        "Pájaros en banco inclinado",
        "pull",
        "Deltoides posteriores",
        "Mancuernas",
        "chest supported reverse fly"
    ],
    [
        "u47",
        "Elevaciones en Y con mancuernas",
        "pull",
        "Deltoides posteriores",
        "Mancuernas",
        "Y raise"
    ],
    [
        "u48",
        "Aperturas inversas en máquina (reverse peck deck)",
        "pull",
        "Deltoides posteriores",
        "Máquina",
        "rear delt machine"
    ],
    [
        "u49",
        "Encogimientos de hombros con mancuernas",
        "pull",
        "Trapecios",
        "Mancuernas",
        "shrugs"
    ],
    [
        "u50",
        "Elevaciones en Y sobre banco",
        "pull",
        "Trapecios",
        "Mancuernas",
        "lower traps"
    ],
    [
        "u51",
        "Encogimientos de hombros en máquina",
        "pull",
        "Trapecios",
        "Máquina",
        "machine shrugs"
    ],
    [
        "u04",
        "Curl de bíceps con barra",
        "pull",
        "Bíceps",
        "Barra",
        "barbell curl"
    ],
    [
        "u05",
        "Curl martillo",
        "pull",
        "Bíceps",
        "Mancuernas",
        "hammer curl"
    ],
    [
        "u17",
        "Curl inclinado con mancuernas",
        "pull",
        "Bíceps",
        "Mancuernas",
        "incline dumbbell biceps curl"
    ],
    [
        "u52",
        "Curl alternado con mancuernas",
        "pull",
        "Bíceps",
        "Mancuernas",
        "alternating dumbbell curl"
    ],
    [
        "u53",
        "Curl de bíceps con mancuernas sentado",
        "pull",
        "Bíceps",
        "Mancuernas",
        "seated dumbbell curl"
    ],
    [
        "u54",
        "Curl concentración con mancuerna",
        "pull",
        "Bíceps",
        "Mancuernas",
        "concentration curl"
    ],
    [
        "u55",
        "Curl predicador unilateral con mancuerna",
        "pull",
        "Bíceps",
        "Mancuernas",
        "single arm preacher curl"
    ],
    [
        "u56",
        "Curl martillo cruzado",
        "pull",
        "Bíceps",
        "Mancuernas",
        "cross body hammer curl"
    ],
    [
        "u57",
        "Curl tipo Zottman con mancuernas",
        "pull",
        "Bíceps",
        "Mancuernas",
        "zottman curl"
    ],
    [
        "u58",
        "Curl spider con mancuernas",
        "pull",
        "Bíceps",
        "Mancuernas",
        "spider curl"
    ],
    [
        "u59",
        "Curl invertido con mancuernas",
        "pull",
        "Bíceps",
        "Mancuernas",
        "reverse dumbbell curl"
    ],
    [
        "u16",
        "Curl unilateral en polea baja",
        "pull",
        "Bíceps",
        "Polea",
        "single arm low cable biceps curl"
    ],
    [
        "u60",
        "Curl de bíceps en polea baja",
        "pull",
        "Bíceps",
        "Polea",
        "low cable curl"
    ],
    [
        "u61",
        "Curl martillo con cuerda en polea",
        "pull",
        "Bíceps",
        "Polea",
        "rope hammer cable curl"
    ],
    [
        "u62",
        "Curl bayesiano en polea",
        "pull",
        "Bíceps",
        "Polea",
        "bayesian cable curl"
    ],
    [
        "u63",
        "Curl de bíceps en polea alta",
        "pull",
        "Bíceps",
        "Polea",
        "high cable curl double biceps"
    ],
    [
        "u64",
        "Curl concentrado en polea baja",
        "pull",
        "Bíceps",
        "Polea",
        "single cable curl"
    ],
    [
        "u09",
        "Curl predicador",
        "pull",
        "Bíceps",
        "Máquina",
        "preacher curl barra"
    ],
    [
        "u65",
        "Curl de bíceps en máquina",
        "pull",
        "Bíceps",
        "Máquina",
        "biceps machine curl"
    ],
    [
        "u66",
        "Curl predicador unilateral en máquina",
        "pull",
        "Bíceps",
        "Máquina",
        "unilateral machine preacher"
    ],
    [
        "u67",
        "Curl de muñeca con mancuerna",
        "pull",
        "Antebrazos",
        "Mancuernas",
        "wrist curl"
    ],
    [
        "u68",
        "Extensión de muñeca con mancuerna",
        "pull",
        "Antebrazos",
        "Mancuernas",
        "wrist extension"
    ],
    [
        "u69",
        "Curl de muñeca martillo",
        "pull",
        "Antebrazos",
        "Mancuernas",
        "radial deviation"
    ],
    [
        "l01",
        "Sentadilla con barra",
        "legs",
        "Cuádriceps",
        "Barra",
        "back squat clasica squat"
    ],
    [
        "l16",
        "Sentadilla frontal con barra",
        "legs",
        "Cuádriceps",
        "Barra",
        "front squat"
    ],
    [
        "l17",
        "Sentadilla en máquina Smith",
        "legs",
        "Cuádriceps",
        "Barra",
        "smith squat"
    ],
    [
        "l18",
        "Sentadilla con barra de seguridad",
        "legs",
        "Cuádriceps",
        "Barra",
        "safety bar squat"
    ],
    [
        "l19",
        "Sentadilla con pausa",
        "legs",
        "Cuádriceps",
        "Barra",
        "pause squat"
    ],
    [
        "l02",
        "Prensa de piernas",
        "legs",
        "Cuádriceps",
        "Máquina",
        "leg press"
    ],
    [
        "l20",
        "Sentadilla hack",
        "legs",
        "Cuádriceps",
        "Máquina",
        "hack squat"
    ],
    [
        "l21",
        "Sentadilla pendular en máquina",
        "legs",
        "Cuádriceps",
        "Máquina",
        "pendulum squat"
    ],
    [
        "l22",
        "Prensa de piernas horizontal",
        "legs",
        "Cuádriceps",
        "Máquina",
        "horizontal leg press"
    ],
    [
        "l23",
        "Prensa de piernas unilateral",
        "legs",
        "Cuádriceps",
        "Máquina",
        "single leg press"
    ],
    [
        "l24",
        "Sentadilla en máquina V-squat",
        "legs",
        "Cuádriceps",
        "Máquina",
        "v squat"
    ],
    [
        "l25",
        "Sentadilla en máquina belt squat",
        "legs",
        "Cuádriceps",
        "Máquina",
        "belt squat"
    ],
    [
        "l05",
        "Extensiones de cuádriceps",
        "legs",
        "Cuádriceps",
        "Máquina",
        "leg extension"
    ],
    [
        "l26",
        "Extensión de cuádriceps unilateral",
        "legs",
        "Cuádriceps",
        "Máquina",
        "single leg extension"
    ],
    [
        "l09",
        "Sentadilla goblet",
        "legs",
        "Cuádriceps",
        "Mancuernas",
        "goblet squat"
    ],
    [
        "l10",
        "Sentadilla búlgara",
        "legs",
        "Cuádriceps",
        "Mancuernas",
        "bulgarian split squat"
    ],
    [
        "l27",
        "Sentadilla con talones elevados",
        "legs",
        "Cuádriceps",
        "Mancuernas",
        "heels elevated squat"
    ],
    [
        "l28",
        "Sentadilla dividida con mancuernas",
        "legs",
        "Cuádriceps",
        "Mancuernas",
        "dumbbell split squat"
    ],
    [
        "l29",
        "Zancada inversa con mancuernas",
        "legs",
        "Cuádriceps",
        "Mancuernas",
        "reverse lunge"
    ],
    [
        "l30",
        "Zancadas caminando",
        "legs",
        "Cuádriceps",
        "Mancuernas",
        "walking lunges"
    ],
    [
        "l31",
        "Zancada lateral con mancuernas",
        "legs",
        "Cuádriceps",
        "Mancuernas",
        "lateral lunges"
    ],
    [
        "l32",
        "Step-up con mancuernas",
        "legs",
        "Cuádriceps",
        "Mancuernas",
        "step up"
    ],
    [
        "l07",
        "Zancadas",
        "legs",
        "Cuádriceps",
        "Peso corporal",
        "lunges"
    ],
    [
        "l12",
        "Step-up",
        "legs",
        "Cuádriceps",
        "Peso corporal",
        "subida banco escalon"
    ],
    [
        "l33",
        "Sentadilla al aire",
        "legs",
        "Cuádriceps",
        "Peso corporal",
        "air squat bodyweight"
    ],
    [
        "l34",
        "Sentadilla española con banda",
        "legs",
        "Cuádriceps",
        "Peso corporal",
        "spanish squat"
    ],
    [
        "l35",
        "Sentadilla isométrica en pared",
        "legs",
        "Cuádriceps",
        "Peso corporal",
        "wall sit"
    ],
    [
        "l36",
        "Sentadilla pistol asistida",
        "legs",
        "Cuádriceps",
        "Peso corporal",
        "assisted pistol squat"
    ],
    [
        "l04",
        "Curl femoral",
        "legs",
        "Isquiotibiales",
        "Máquina",
        "leg curl"
    ],
    [
        "l15",
        "Curl femoral sentado",
        "legs",
        "Isquiotibiales",
        "Máquina",
        "seated leg curl"
    ],
    [
        "l37",
        "Curl femoral acostado",
        "legs",
        "Isquiotibiales",
        "Máquina",
        "lying leg curl"
    ],
    [
        "l38",
        "Curl femoral de pie",
        "legs",
        "Isquiotibiales",
        "Máquina",
        "standing leg curl"
    ],
    [
        "l39",
        "Curl femoral unilateral",
        "legs",
        "Isquiotibiales",
        "Máquina",
        "single leg curl"
    ],
    [
        "l03",
        "Peso muerto rumano",
        "legs",
        "Isquiotibiales",
        "Mancuernas",
        "romanian deadlift"
    ],
    [
        "l40",
        "Peso muerto rumano con mancuernas",
        "legs",
        "Isquiotibiales",
        "Mancuernas",
        "dumbbell RDL"
    ],
    [
        "l41",
        "Curl nórdico asistido",
        "legs",
        "Isquiotibiales",
        "Peso corporal",
        "assisted nordic hamstring curl"
    ],
    [
        "l42",
        "Curl femoral deslizante",
        "legs",
        "Isquiotibiales",
        "Peso corporal",
        "sliding hamstring curl"
    ],
    [
        "l43",
        "Curl femoral con pelota suiza",
        "legs",
        "Isquiotibiales",
        "Peso corporal",
        "swiss ball hamstring curl"
    ],
    [
        "l13",
        "Hip thrust en máquina",
        "legs",
        "Glúteos",
        "Máquina",
        "machine hip thrust"
    ],
    [
        "l44",
        "Patada de glúteos en máquina",
        "legs",
        "Glúteos",
        "Máquina",
        "machine glute kickback"
    ],
    [
        "l11",
        "Abducción de cadera",
        "legs",
        "Glúteos",
        "Máquina",
        "hip abduction machine"
    ],
    [
        "l45",
        "Abducción unilateral de cadera en máquina",
        "legs",
        "Glúteos",
        "Máquina",
        "single leg hip abduction"
    ],
    [
        "l08",
        "Hip thrust",
        "legs",
        "Glúteos",
        "Barra",
        "barbell hip thrust"
    ],
    [
        "l46",
        "Hip thrust en máquina Smith",
        "legs",
        "Glúteos",
        "Barra",
        "smith hip thrust"
    ],
    [
        "l47",
        "Patada de glúteos en polea",
        "legs",
        "Glúteos",
        "Polea",
        "cable kickback"
    ],
    [
        "l48",
        "Abducción de cadera en polea",
        "legs",
        "Glúteos",
        "Polea",
        "cable abduction"
    ],
    [
        "l49",
        "Pull-through en polea",
        "legs",
        "Glúteos",
        "Polea",
        "cable pullthrough"
    ],
    [
        "l50",
        "Puente de glúteos",
        "legs",
        "Glúteos",
        "Peso corporal",
        "glute bridge"
    ],
    [
        "l51",
        "Puente de glúteos a una pierna",
        "legs",
        "Glúteos",
        "Peso corporal",
        "single leg glute bridge"
    ],
    [
        "l52",
        "Abducción de cadera acostado de lado",
        "legs",
        "Glúteos",
        "Peso corporal",
        "side lying hip abduction"
    ],
    [
        "l53",
        "Clamshell con minibanda",
        "legs",
        "Glúteos",
        "Peso corporal",
        "clamshell"
    ],
    [
        "l54",
        "Frog pumps",
        "legs",
        "Glúteos",
        "Peso corporal",
        "glute frog bridge"
    ],
    [
        "l55",
        "Aducción de cadera en máquina",
        "legs",
        "Aductores",
        "Máquina",
        "hip adduction"
    ],
    [
        "l56",
        "Aducción de cadera en polea",
        "legs",
        "Aductores",
        "Polea",
        "cable hip adduction"
    ],
    [
        "l06",
        "Elevación de gemelos",
        "legs",
        "Gemelos",
        "Máquina",
        "calf raises"
    ],
    [
        "l14",
        "Elevación de gemelos sentado",
        "legs",
        "Gemelos",
        "Máquina",
        "seated calf raise"
    ],
    [
        "l57",
        "Elevación de gemelos de pie en máquina",
        "legs",
        "Gemelos",
        "Máquina",
        "standing calf machine"
    ],
    [
        "l58",
        "Elevación de gemelos en prensa",
        "legs",
        "Gemelos",
        "Máquina",
        "calf press leg press"
    ],
    [
        "l59",
        "Elevación de gemelos tipo donkey",
        "legs",
        "Gemelos",
        "Máquina",
        "donkey calf raise"
    ],
    [
        "l60",
        "Elevación de gemelos a una pierna",
        "legs",
        "Gemelos",
        "Peso corporal",
        "single leg calf raise"
    ],
    [
        "l61",
        "Elevación de tibial anterior",
        "legs",
        "Gemelos",
        "Peso corporal",
        "tibialis raises"
    ],
    [
        "c11",
        "Crunch horizontal en máquina",
        "core",
        "Abdominales",
        "Máquina",
        "horizontal crunch crunch machine abdominal maquina"
    ],
    [
        "c13",
        "Crunch abdominal sentado en máquina",
        "core",
        "Abdominales",
        "Máquina",
        "machine crunch seated"
    ],
    [
        "c14",
        "Rotación de torso en máquina",
        "core",
        "Abdominales",
        "Máquina",
        "rotary torso machine oblicuos"
    ],
    [
        "c12",
        "Hiperextensión lateral para oblicuos",
        "core",
        "Oblicuos",
        "Banco",
        "flexion lateral banco 45 side hyperextension side bend banco romano"
    ],
    [
        "c05",
        "Crunch abdominal",
        "core",
        "Abdominales",
        "Peso corporal",
        "abdominal crunch"
    ],
    [
        "c15",
        "Crunch inverso",
        "core",
        "Abdominales",
        "Peso corporal",
        "reverse crunch"
    ],
    [
        "c16",
        "Crunch bicicleta",
        "core",
        "Abdominales",
        "Peso corporal",
        "bicycle crunch"
    ],
    [
        "c17",
        "Crunch con piernas elevadas",
        "core",
        "Abdominales",
        "Peso corporal",
        "toe touches"
    ],
    [
        "c18",
        "Crunch en banco declinado",
        "core",
        "Abdominales",
        "Peso corporal",
        "decline crunch"
    ],
    [
        "c19",
        "Abdominal en V",
        "core",
        "Abdominales",
        "Peso corporal",
        "V up"
    ],
    [
        "c20",
        "Elevación de rodillas en paralelas",
        "core",
        "Abdominales",
        "Peso corporal",
        "captain chair knee raise"
    ],
    [
        "c21",
        "Elevación de rodillas colgado",
        "core",
        "Abdominales",
        "Peso corporal",
        "hanging knee raise"
    ],
    [
        "c06",
        "Elevación de piernas",
        "core",
        "Abdominales",
        "Peso corporal",
        "leg raise"
    ],
    [
        "c22",
        "Elevación de piernas colgado",
        "core",
        "Abdominales",
        "Peso corporal",
        "hanging leg raise"
    ],
    [
        "c23",
        "Flutter kicks",
        "core",
        "Abdominales",
        "Peso corporal",
        "patada alternada"
    ],
    [
        "c09",
        "Crunch en polea",
        "core",
        "Abdominales",
        "Polea",
        "cable crunch"
    ],
    [
        "c24",
        "Crunch oblicuo en polea",
        "core",
        "Abdominales",
        "Polea",
        "cable side crunch"
    ],
    [
        "c01",
        "Plancha frontal",
        "core",
        "Estabilidad",
        "Peso corporal",
        "plank"
    ],
    [
        "c02",
        "Plancha lateral",
        "core",
        "Estabilidad",
        "Peso corporal",
        "side plank"
    ],
    [
        "c03",
        "Dead bug",
        "core",
        "Estabilidad",
        "Peso corporal",
        "deadbug"
    ],
    [
        "c04",
        "Bird dog",
        "core",
        "Estabilidad",
        "Peso corporal",
        "birddog"
    ],
    [
        "c08",
        "Hollow hold",
        "core",
        "Estabilidad",
        "Peso corporal",
        "hollow body"
    ],
    [
        "c25",
        "Plancha con toque de hombros",
        "core",
        "Estabilidad",
        "Peso corporal",
        "plank shoulder taps"
    ],
    [
        "c26",
        "Plancha lateral con elevación de cadera",
        "core",
        "Estabilidad",
        "Peso corporal",
        "side plank hip dips"
    ],
    [
        "c27",
        "Plancha de oso",
        "core",
        "Estabilidad",
        "Peso corporal",
        "bear plank"
    ],
    [
        "c28",
        "Hollow rocks",
        "core",
        "Estabilidad",
        "Peso corporal",
        "hollow rock"
    ],
    [
        "c29",
        "Curl-up de McGill",
        "core",
        "Estabilidad",
        "Peso corporal",
        "mcgill curlup"
    ],
    [
        "c30",
        "Superman",
        "core",
        "Estabilidad",
        "Peso corporal",
        "superman hold"
    ],
    [
        "c31",
        "Plancha Copenhagen asistida",
        "core",
        "Estabilidad",
        "Peso corporal",
        "copenhagen plank"
    ],
    [
        "c07",
        "Pallof press",
        "core",
        "Estabilidad",
        "Polea",
        "antirotacion anti rotation"
    ],
    [
        "c32",
        "Pallof press con pausa",
        "core",
        "Estabilidad",
        "Polea",
        "pallof hold"
    ],
    [
        "c33",
        "Pallof press con pasos laterales",
        "core",
        "Estabilidad",
        "Polea",
        "pallof walkout"
    ],
    [
        "c34",
        "Woodchopper de arriba hacia abajo",
        "core",
        "Estabilidad",
        "Polea",
        "cable woodchop high to low"
    ],
    [
        "c35",
        "Woodchopper de abajo hacia arriba",
        "core",
        "Estabilidad",
        "Polea",
        "cable woodchop low to high"
    ],
    [
        "c36",
        "Flexión lateral del tronco con mancuerna",
        "core",
        "Oblicuos",
        "Mancuernas",
        "dumbbell side bend"
    ],
    [
        "c37",
        "Paseo del granjero unilateral",
        "core",
        "Oblicuos",
        "Mancuernas",
        "suitcase carry"
    ],
    [
        "c10",
        "Russian twist",
        "core",
        "Oblicuos",
        "Peso corporal",
        "giros rusos"
    ],
    [
        "c38",
        "Extensiones lumbares en banco 45°",
        "core",
        "Zona lumbar",
        "Banco",
        "back extension hyperextension"
    ],
    [
        "c39",
        "Extensiones lumbares horizontales",
        "core",
        "Zona lumbar",
        "Banco",
        "roman chair back extension"
    ],
    [
        "c40",
        "Extensión lumbar en máquina",
        "core",
        "Zona lumbar",
        "Máquina",
        "back extension machine"
    ],
    [
        "c41",
        "Rueda abdominal de rodillas",
        "core",
        "Estabilidad",
        "Rueda / pelota",
        "ab wheel rollout"
    ],
    [
        "c42",
        "Rollout en pelota suiza",
        "core",
        "Estabilidad",
        "Rueda / pelota",
        "stability ball rollout"
    ],
    [
        "c43",
        "Stir the pot en pelota suiza",
        "core",
        "Estabilidad",
        "Rueda / pelota",
        "stir the pot"
    ]
]
    .map(([id,name,group,muscle,equipment,aliases]) => ({id,name,group,muscle,equipment,aliases,custom:false}));
  // Plan sugerido: las series y rangos de repeticiones son objetivos editables,
  // no cargas prescritas. Los días A quedan completos si solo se entrena 3 días.
  const ROUTINE_PLAN = {
    push_a:[['p01',3,'6–10'],['p02',2,'8–12'],['p10',2,'8–12'],['p04',2,'12–15'],['p15',2,'10–15']],
    pull_a:[['u01',3,'8–12'],['u03',3,'8–12'],['u08',2,'12–15'],['u17',2,'10–12'],['u05',2,'10–15']],
    legs_a:[['l01',3,'6–10'],['l04',2,'10–15'],['l13',2,'8–12'],['l14',2,'12–15'],['l05',2,'10–15']],
    push_b:[['p16',2,'8–12'],['p14',2,'8–12'],['p17',2,'10–15'],['p04',2,'12–15'],['p18',2,'10–15']],
    pull_b:[['u14',2,'8–12'],['u12',2,'8–12'],['u15',2,'10–15'],['u10',2,'12–15'],['u16',2,'10–15']],
    legs_b:[['l02',2,'10–12'],['l10',2,'8–10 por pierna'],['l15',2,'10–15'],['l11',2,'12–15'],['l06',2,'12–15']],
    core:[['c11',2,'10–15'],['c12',2,'10–15 por lado']]
  };
  // Plantillas anteriores: no trasladar por accidente ejercicios retirados del
  // plan (ej. peso muerto rumano) al iniciar una sesión con un historial viejo.
  const PREVIOUS_DEFAULTS = {
    push_a:['p01','p02','p03','p04','p05'],
    push_b:['p07','p10','p11','p06','p12'],
    pull_a:['u01','u02','u03','u04','u05'],
    pull_b:['u06','u07','u08','u09','u12'],
    legs_a:['l01','l02','l03','l04','l06'],
    legs_b:['l09','l10','l08','l05','l06'],
    core:['c01','c03','c07']
  };
  // IDs que pertenecieron a plantillas predeterminadas anteriores.
  // Así no reaparecen como añadidos cuando se carga un entrenamiento viejo.
  const RETIRED_TEMPLATE_IDS = {
    push_a:['p05'], pull_a:['u04'], push_b:['p13','p11','p15'],
    pull_b:['u13','u11','u09'], legs_a:[], legs_b:[], core:['c01','c03','c07']
  };
  const DEFAULTS = Object.fromEntries(Object.entries(ROUTINE_PLAN).map(([day,plan])=>[day,plan.map(([id])=>id)]));
  // Compatibilidad con registros antiguos sin variante A/B.
  DEFAULTS.push = PREVIOUS_DEFAULTS.push_a;
  DEFAULTS.pull = PREVIOUS_DEFAULTS.pull_a;
  DEFAULTS.legs = PREVIOUS_DEFAULTS.legs_a;
  const CARDIO_TYPES = ['Caminata','Correr','Bicicleta','Elíptica','Remo','Natación','Escaladora','Otro'];
  const ICONS = {
    dumbbell:'<path d="m6.5 6.5 11 11"/><path d="m5.2 5.2-2 2a2 2 0 0 0 0 2.8l1 1a2 2 0 0 0 2.8 0l4-4a2 2 0 0 0 0-2.8l-1-1a2 2 0 0 0-2.8 0l-2 2Z"/><path d="m13 15.8 4-4a2 2 0 0 1 2.8 0l1 1a2 2 0 0 1 0 2.8l-4 4a2 2 0 0 1-2.8 0l-1-1a2 2 0 0 1 0-2.8Z"/>',
    house:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-7h6v7"/>',
    activity:'<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    clipboard:'<rect x="5" y="5" width="14" height="17" rx="2"/><path d="M9 5.5V3h6v2.5M9 12h6M9 16h6"/>',
    heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    layers:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    settings:'<path d="M12 15.3a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6Z"/><path d="m19.4 15 .8 1.4-2 2-.9-.4-1.4.8-.2 1.2h-3l-.4-1.2h-1.6l-.5 1.2h-3l-.2-1.2-1.4-.8-.9.4-2-2L3.5 15l-.8-1.2.1-2 .8-1.2-.3-1.4 2-2 .9.4 1.4-.8L8 5.6h3l.5 1.2h1.6l.5-1.2h3l.2 1.2 1.4.8.9-.4 2 2-.8 1.4.8 1.2-.1 2z"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
    'arrow-up-right':'<path d="M7 17 17 7M8 7h9v9"/>',
    'arrow-down-left':'<path d="M17 7 7 17M16 17H7V8"/>',
    chevron:'<path d="m6 9 6 6 6-6"/>',
    trash:'<path d="M3 6h18M8 6V4h8v2m-9 0 1 15h8l1-15M10 10v7M14 10v7"/>',
    download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
    upload:'<path d="M12 16V4m-5 5 5-5 5 5M4 17v4h16v-4"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    check:'<path d="m4 12 5 5L20 6"/>',
    close:'<path d="M18 6 6 18M6 6l12 12"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
    file:'<path d="M5 3h10l4 4v14H5zM15 3v5h4M8 13h8M8 17h8"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    'scale':'<path d="M4 7h16v14H4z"/><path d="M12 14 9 11a4 4 0 0 1 6 0z"/>',
    menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
    pencil:'<path d="m3 17 12-12 4 4L7 21H3zM13 7l4 4"/>',
    refresh:'<path d="M20 11a8 8 0 1 0-2 6M20 4v7h-7"/>',
    lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    'bar-chart':'<path d="M4 20V10M10 20V4M16 20v-8M22 20v-5"/>',
    'more':'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>'
  };
  const icon = (name, size=19) => `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ICONS.activity}</svg>`;
  const uid = () => (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const today = () => { const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
  const es = v => String(v??'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const formatDate = d => {if(!d)return 'Sin fecha';const z=new Date(`${d}T12:00:00`);return Number.isNaN(z.getTime()) ? String(d) : z.toLocaleDateString('es-UY',{day:'numeric',month:'short',year:'numeric'});};
  const num = value => value === '' || value == null ? null : Number.isFinite(Number(value)) ? Number(value) : null;
  const fmt = value => value==null ? '—' : Number(value).toLocaleString('es-UY',{maximumFractionDigits:2});
  const groupTag = day => `<span class="tag ${es(routineGroup(day))}">${es(day==='cardio'?'Cardio':routineLabel(day))}</span>`;
  const allExercises = () => [...CATALOG, ...db.customExercises];
  const searchText = text => String(text||'').toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,' ');
  const matchesExercise = (ex,query) => {
    const terms=searchText(query).split(/\s+/).filter(Boolean);
    const blob=searchText([ex.name,ex.muscle,ex.equipment,ex.aliases,DAY[ex.group]?.label].join(' '));
    return terms.every(term=>blob.includes(term));
  };
  const exerciseById = id => allExercises().find(ex => ex.id === id);
  const blankSet = () => ({id:uid(),reps:'',seconds:'',weight:'',done:false,touched:false});
  const newData = () => ({version:2,sessions:[],measurements:[],customExercises:[],draft:null});
  function loadData(){
    try {const raw=localStorage.getItem(STORAGE_KEY);if(!raw)return newData();const data=JSON.parse(raw);if(!data || !Array.isArray(data.sessions) || !Array.isArray(data.measurements) || !Array.isArray(data.customExercises))throw Error('Datos inválidos');return {...newData(),...data,version:2};}
    catch(err){console.warn('Repbit: datos almacenados no válidos',err);return newData();}
  }
  let db=loadData();
  // Los borradores creados antes de v2.2 no marcaban qué series fueron editadas.
  // Se conservan sus valores existentes al actualizar, para no perder cambios.
  for (const item of db.draft?.items||[]) for (const set of item.sets||[]) {
    if(set.touched===undefined) set.touched=(set.reps!=='' && set.reps!=null)||(set.seconds!==''&&set.seconds!=null)||(set.weight!==''&&set.weight!=null)||Boolean(set.done);
  }
  // La preferencia de navegación se mantiene aunque cambies de pantalla.
  const NAV_KEY='repbit-sidebar-open-v1';
  const navSaved=(()=>{try{return localStorage.getItem(NAV_KEY)}catch{return null}})();
  const ui = {page:'inicio',historyFilter:'todos',libraryFilter:'todos',libraryQuery:'',expandedHistory:null,modalSearch:'',cardioEditId:null,sidebarOpen:innerWidth>780 && navSaved!=='false'};
  function toggleSidebar(force){
    ui.sidebarOpen=typeof force==='boolean'?force:!ui.sidebarOpen;
    if(innerWidth>780){try{localStorage.setItem(NAV_KEY,String(ui.sidebarOpen))}catch{}}
    render();
  }
  function updateNavBody(){document.body.classList.toggle('nav-open',ui.sidebarOpen && innerWidth<=780);}

  function save(){ try{localStorage.setItem(STORAGE_KEY,JSON.stringify(db));}catch(error){console.error(error);alert('No se pudo guardar en este navegador. Exportá una copia de seguridad desde Datos.');}}
  let toastTimer;
  function toast(message){ const root=document.getElementById('toast-root');root.innerHTML=`<div class="toast">${es(message)}</div>`;clearTimeout(toastTimer);toastTimer=setTimeout(()=>root.innerHTML='',2800);}
  const navItems = [{id:'inicio',label:'Inicio',ico:'house'},{id:'entrenar',label:'Entrenar',ico:'dumbbell'},{id:'historial',label:'Historial',ico:'clipboard'},{id:'cardio',label:'Cardio',ico:'heart'},{id:'core',label:'Core',ico:'activity'},{id:'ejercicios',label:'Ejercicios',ico:'layers'},{id:'datos',label:'Datos',ico:'settings'}];
  function sidebar(){return `<aside id="app-sidebar" class="sidebar" aria-label="Menú principal" ${ui.sidebarOpen?'':'inert aria-hidden="true"'}>
    <div class="sidebar-brand-row"><div class="brand"><span class="brand-icon">R<span class="brand-mark">/</span></span><div><div class="brand-name">REP<span class="brand-slash">/</span>BIT</div><span class="brand-meta">TRAINING LOG</span></div></div><button class="sidebar-close" type="button" data-action="toggle-sidebar" aria-label="Cerrar navegación" title="Cerrar navegación">${icon('close',19)}</button></div>
    <div class="nav-section-label">NAVEGACIÓN <span>01—07</span></div>
    <nav class="nav-list" aria-label="Secciones">${navItems.map(navButton).join('')}</nav>
    <div class="sidebar-footer"><span>REP/BIT <b>2.5</b></span><span class="live-dot" title="Almacenamiento local"></span></div>
  </aside>`;}
  function navButton(item){return `<button type="button" class="nav-link ${ui.page===item.id?'active':''}" data-action="nav" data-page="${item.id}" ${ui.page===item.id?'aria-current="page"':''}>${icon(item.ico,18)}<span>${item.label}</span><span class="nav-link-arrow">${icon('arrow',15)}</span></button>`;}
  function appbar(){const label=navItems.find(item=>item.id===ui.page)?.label||'Inicio';return `<div class="appbar"><div class="appbar-left"><button type="button" class="menu-trigger" data-action="toggle-sidebar" aria-controls="app-sidebar" aria-expanded="${ui.sidebarOpen}" aria-label="${ui.sidebarOpen?'Cerrar':'Abrir'} navegación" title="${ui.sidebarOpen?'Cerrar':'Abrir'} menú">${icon('menu',20)}</button><div class="appbar-rule"></div><span class="appbar-location">${es(label)}</span></div><div class="appbar-right">${db.draft?`<button class="active-session" data-action="nav" data-page="entrenar"><span class="pulse"></span> ${es(routineLabel(db.draft.day))} EN CURSO</button>`:''}<span class="appbar-date">${new Date().toLocaleDateString('es-UY',{day:'2-digit',month:'short',year:'numeric'})}</span><span class="appbar-stamp">RB<span>/</span></span></div></div>`;}
  function pageHeader(title,desc,action=''){return `<header class="topline"><div><div class="eyebrow">REP/BIT — ${es(navItems.find(item=>item.id===ui.page)?.label||'TRAINING')}</div><h1 class="page-title">${title}</h1></div>${action||''}</header>`;}
  function empty(title,desc,ico='clipboard',button=''){return `<div class="empty"><div class="empty-icon">${icon(ico,33)}</div><div class="empty-title">${title}</div><p>${desc}</p>${button}</div>`;}
  function render(){
    const root=document.getElementById('app');
    let content;
    switch(ui.page){case 'entrenar':content=renderWorkout();break;case 'historial':content=renderHistory();break;case 'cardio':content=renderCardio();break;case 'core':content=renderCore();break;case 'ejercicios':content=renderLibrary();break;case 'datos':content=renderData();break;default:content=renderHome();}
    root.innerHTML=`<div class="shell ${ui.sidebarOpen?'sidebar-open':'sidebar-collapsed'}">${sidebar()}${ui.sidebarOpen?`<button type="button" class="sidebar-scrim" data-action="toggle-sidebar" aria-label="Cerrar menú"></button>`:''}<main class="main">${appbar()}<div class="view-content">${content}</div></main></div>`;
    updateNavBody();
  }
  function changePage(page){if(!navItems.some(p=>p.id===page))return;ui.page=page;if(innerWidth<=780)ui.sidebarOpen=false;render();window.scrollTo({top:0,behavior:'instant'});}
  function countSets(s){return (s.items||[]).reduce((n,item)=>n+(item.sets||[]).filter(set=>isCore(s)?(num(set.reps)>0||num(set.seconds)>0):(num(set.reps)>0 && num(set.weight)!=null && num(set.weight)>=0)).length,0);}
  const sortByDate = a => a.slice().sort((x,y)=>(y.date||'').localeCompare(x.date||'') || (y.createdAt||'').localeCompare(x.createdAt||''));
  function sessionSummary(s){return s.kind==='cardio' ? `${fmt(s.minutes)} min${s.distance!=null ? ` · ${fmt(s.distance)} km`:''}` : `${(s.items||[]).length} ejercicios · ${countSets(s)} series`;}
  function recentList(sessions,limit=4){return sessions.length?`<div class="session-list">${sortByDate(sessions).slice(0,limit).map(s=>`<div class="session-item"><div class="session-left"><div class="session-circle">${icon(s.kind==='cardio'?'heart':isCore(s)?'activity':'dumbbell',19)}</div><div><div class="session-name">${es(s.kind==='cardio'?s.activity:routineLabel(s.day))}</div><div class="session-sub">${es(sessionSummary(s))}</div></div></div><div class="session-right"><div class="session-date">${es(formatDate(s.date))}</div><div class="session-more">${s.kind==='cardio'?'Cardio':isCore(s)?'Core':'Fuerza'}</div></div></div>`).join('')}</div>`:`<div class="empty compact-empty">SIN SESIONES</div>`;}
  function routineCards(){return `<div class="routine-grid">${Object.entries(ROUTINES).filter(([key])=>key!=='core').map(([key,val],i)=>`<article class="routine ${val.group}"><div class="routine-top"><span class="routine-number">${String(i+1).padStart(2,'0')} / 06</span><span class="routine-glyph">${icon(val.icon,19)}</span></div><div class="routine-name">${val.label.split(' ')[0]}<em>${val.label.split(' ')[1]}</em></div><div class="routine-bottom"><span class="routine-desc">${val.group==='push'?'EMPUJE':val.group==='pull'?'TRACCIÓN':'PIERNAS'}</span><button class="routine-go" type="button" data-action="start-session" data-day="${key}" aria-label="${db.draft?'Ver sesión':'Iniciar'} ${val.label}">${icon('arrow',21)}</button></div></article>`).join('')}</div>`;}
  function renderHome(){
    const sessions=db.sessions;
    const month=sessions.filter(s=>s.date?.startsWith(today().slice(0,7)));
    const strength=sessions.filter(s=>s.kind==='strength');
    const last=sortByDate(sessions)[0];
    const cardioMinutes=month.filter(s=>s.kind==='cardio').reduce((n,s)=>n+(num(s.minutes)||0),0);
    const totalSets=strength.reduce((n,s)=>n+countSets(s),0);
    return `${pageHeader('El registro.','')}
      <section class="hero"><div class="hero-body"><span class="hero-kicker">YOUR TRAINING / YOUR NUMBERS</span><h2>${db.draft?'SEGUÍ<br>DONDE<br>QUEDASTE.':'LISTO<br>PARA<br>ENTRENAR.'}</h2><div class="hero-foot"><button class="btn primary" data-action="nav" data-page="entrenar">${db.draft?'Continuar sesión':'Nueva sesión'} ${icon('arrow',18)}</button><span>${db.draft?es(routineLabel(db.draft.day)):(last?`ÚLTIMA · ${es(routineLabel(last.day))}`:'PUSH / PULL / LEGS')}</span></div></div><div class="hero-art" aria-hidden="true"><span>R</span><span>/</span><span>B</span></div></section>
      <section class="stats" aria-label="Resumen">
        ${stat('clipboard','SESIONES',sessions.length,'TOTAL')}
        ${stat('calendar','ESTE MES',month.length,'SESIONES')}
        ${stat('dumbbell','SERIES',totalSets,'REGISTRADAS')}
        ${stat('heart','CARDIO',`${fmt(cardioMinutes)}′`,'ESTE MES')}
      </section>
      <div class="section-header"><h2 class="section-title">RUTINAS <span class="section-counter">/ 06</span></h2><button class="text-action" data-action="nav" data-page="entrenar">SELECCIONAR ${icon('arrow',15)}</button></div>${routineCards()}
      <div class="section-header"><h2 class="section-title">ÚLTIMAS SESIONES</h2><button class="text-action" data-action="nav" data-page="historial">VER TODAS ${icon('arrow',15)}</button></div>
      ${recentList(sessions,4)}`;
  }
  function stat(ico,label,value,foot){return `<div class="stat"><div class="stat-label">${label}</div><div class="stat-num">${value}</div><div class="stat-foot">${foot}</div></div>`;}
  function lastPerformance(exerciseId, excludeId=null, name=null){
    // Busca la última sesión real por fecha y no reutiliza una sesión que se está editando.
    for (const s of sortByDate(db.sessions.filter(x=>x.kind==='strength' && x.id!==excludeId))) {
      const item=(s.items||[]).find(x=>(exerciseId && x.exerciseId===exerciseId) || (name && x.name===name));
      if (item && Array.isArray(item.sets) && item.sets.length) return {item,date:s.date,day:s.day};
    }
    return null;
  }
  function copySets(sets){return sets.map(set=>({id:uid(),reps:set.reps??'',seconds:set.seconds??'',weight:set.weight??'',done:false,touched:false}));}
  function makeItem(ex, previous=null, suggestedSets=3){
    const last=previous || lastPerformance(ex.id);
    // El último entrenamiento aporta los pesos/reps; el plan aporta el número
    // mínimo de series, aunque solo se haya realizado una la vez anterior.
    const sets=last?.item?.sets?.length?copySets(last.item.sets):[];
    while(sets.length<suggestedSets) sets.push(blankSet());
    return {uid:uid(),exerciseId:ex.id,name:ex.name,group:ex.group,sets};
  }
  function previousRoutine(day, excludeId=null){
    const oldDay={push_a:'push',pull_a:'pull',legs_a:'legs'}[day];
    return sortByDate(db.sessions.filter(s=>s.kind==='strength' && s.id!==excludeId && (s.day===day || (oldDay && s.day===oldDay))))[0]||null;
  }
  // Busca el último registro real de cada ejercicio dentro de esta rutina,
  // aunque ese ejercicio no se haya realizado en la sesión más reciente.
  function lastInRoutine(day, exerciseId, name=null, excludeId=null){
    const oldDay={push_a:'push',pull_a:'pull',legs_a:'legs'}[day];
    const sessions=sortByDate(db.sessions.filter(s=>s.kind==='strength' && s.id!==excludeId && (s.day===day || (oldDay && s.day===oldDay))));
    for(const s of sessions){
      const item=(s.items||[]).find(x=>(exerciseId && x.exerciseId===exerciseId) || (name && x.name===name));
      if(item?.sets?.length) return {item,date:s.date,day:s.day};
    }
    return null;
  }
  function lastForRoutineExercise(day, exerciseId, name=null, excludeId=null){
    return lastInRoutine(day,exerciseId,name,excludeId) || lastPerformance(exerciseId,excludeId,name);
  }
  function startSession(day){
    if(!ROUTINES[day])return;
    if(db.draft){changePage('entrenar');toast('Ya hay un entrenamiento en curso');return;}
    const lastRoutine=previousRoutine(day);
    // Siempre se parte de la plantilla completa: guardar solo 1 ejercicio
    // en una sesión anterior no debe reducir la próxima rutina a 1 ejercicio.
    const items=(ROUTINE_PLAN[day]||[]).map(([id,sets])=>{
      const ex=exerciseById(id);
      return ex?makeItem(ex,lastForRoutineExercise(day,ex.id,ex.name),sets):null;
    }).filter(Boolean);
    const seenIds=new Set(items.map(item=>item.exerciseId));
    const seenNames=new Set(items.map(item=>item.name.toLocaleLowerCase('es')));
    // Conserva también ejercicios adicionales de la última sesión, sin duplicar
    // los que ya forman parte de la plantilla predeterminada.
    const legacyIds=new Set([...(PREVIOUS_DEFAULTS[day]||[]),...(RETIRED_TEMPLATE_IDS[day]||[])]);
    for(const oldItem of lastRoutine?.items||[]){
      // Evitá que los ejercicios de la antigua rutina vuelvan a aparecer
      // como extras: eso reintroduciría peso muerto en Legs A.
      if(legacyIds.has(oldItem.exerciseId) && !seenIds.has(oldItem.exerciseId)) continue;
      const name=oldItem.name||'';
      if(seenIds.has(oldItem.exerciseId) || seenNames.has(name.toLocaleLowerCase('es')))continue;
      const ex=exerciseById(oldItem.exerciseId) || {id:oldItem.exerciseId,name,group:oldItem.group||routineGroup(day)};
      items.push(makeItem(ex,lastForRoutineExercise(day,oldItem.exerciseId,name)));
      seenIds.add(oldItem.exerciseId);
      seenNames.add(name.toLocaleLowerCase('es'));
    }
    db.draft={id:uid(),day,date:today(),notes:'',items,createdAt:new Date().toISOString()};
    save();changePage('entrenar');
    if(lastRoutine)toast('Ejercicios predeterminados y últimas cargas recuperados');
  }
  function lastForDraft(item){
    return lastForRoutineExercise(db.draft?.day,item.exerciseId,item.name,db.draft?.sessionId);
  }
  function lastItem(exerciseId){return lastPerformance(exerciseId,db.draft?.sessionId)?.item||null;}
  function renderCore(){
    const recent=db.sessions.filter(isCore);
    return `${pageHeader('Core.','')}
      <section class="card core-hero"><span class="routine-symbol core">${icon('activity',28)}</span><div><h2>Sesión de Core</h2><p>CRUNCH EN MÁQUINA / OBLICUOS</p></div><button class="btn primary" data-action="start-session" data-day="core">${db.draft?'Ver sesión en curso':'Empezar Core'} ${icon('arrow',16)}</button></section>
      <div class="section-header"><h2 class="section-title">Últimas sesiones de Core</h2><button class="btn ghost small" data-action="nav" data-page="historial">Ver historial ${icon('arrow',13)}</button></div>
      ${recent.length?recentList(recent,6):empty('Todavía no hay Core registrado','Tus sesiones de Core aparecerán aquí cuando guardes la primera.','activity',`<button class="btn small primary" data-action="start-session" data-day="core">Iniciar Core ${icon('arrow',14)}</button>`)}
      `;
  }
  function renderWorkout(){
    if(!db.draft) return `${pageHeader('Entrenar.','')}
      <div class="section-header"><h2 class="section-title">¿Qué entrenás hoy?</h2></div>${routineCards()}
      `;
    const draft=db.draft, sets=draft.items.reduce((n,item)=>n+item.sets.length,0);
    return `${pageHeader(draft.sessionId?'Editar sesión.':'En curso.','',`<button class="btn ghost small" data-action="discard-draft">${icon('trash',15)} Descartar</button>`)}
      <div class="card workout-toolbar"><div><div class="workout-title">${groupTag(draft.day)}<h2>${routineLabel(draft.day)}</h2></div><div class="muted tiny mt-16">${draft.items.length} ejercicios · ${sets} series disponibles</div></div><div class="workout-meta"><div class="field date-inline"><label for="workout-date">Fecha</label><input class="input" id="workout-date" type="date" value="${es(draft.date)}" data-bind="workout-date" /></div><button class="btn ghost" data-action="open-exercise-picker">${icon('plus',17)} Ejercicio</button></div></div>
      <div class="exercise-stack">${draft.items.length ? draft.items.map((item,i)=>renderExerciseCard(item,i)).join(''):empty('Sin ejercicios','Agregá ejercicios desde la biblioteca para comenzar.')}</div>
      <div class="card workout-bottom"><div class="field workout-notes"><label for="workout-notes">NOTAS</label><textarea class="textarea" id="workout-notes" data-bind="workout-notes" placeholder="Notas">${es(draft.notes)}</textarea></div><div class="toolbar-buttons"><button class="btn ghost" data-action="open-exercise-picker">${icon('plus',16)} Agregar</button><button class="btn primary" data-action="finish-session">${icon('check',17)} ${draft.sessionId?'Guardar cambios':'Finalizar sesión'}</button></div></div>`;
  }
  function renderExerciseCard(item,index){
    const last=lastForDraft(item);
    const core=db.draft?.day==='core';
    const plan=(ROUTINE_PLAN[db.draft?.day]||[]).find(entry=>entry[0]===item.exerciseId);
    const target=plan?`<div class="exercise-target">${plan[1]} × ${es(plan[2])}</div>`:'';
    const recent=last?`<div class="previous-line">${icon('clock',14)} ANTERIOR · ${es(formatDate(last.date))} · ${es(last.item.sets.map(s=>s.seconds?`${fmt(s.seconds)} s${s.reps?` · ${fmt(s.reps)} rep`:''}`:`${fmt(s.reps)} rep${s.weight!=null&&s.weight!==''?` · ${fmt(s.weight)} kg`:''}`).join(' / '))}</div>`:'';
    return `<section class="card exercise-card"><div class="exercise-head"><div class="exercise-label"><span class="exercise-num">${String(index+1).padStart(2,'0')}</span><div><h3>${es(item.name)}</h3>${target}${recent}</div></div><div class="exercise-actions">${last?`<button class="btn ghost small" data-action="copy-last" data-item="${es(item.uid)}" title="Usar las series del registro anterior">${icon('refresh',14)} Copiar última</button>`:''}<button class="btn ghost small" data-action="add-set" data-item="${es(item.uid)}">${icon('plus',14)} Serie</button><button class="btn icon-only ghost" data-action="remove-exercise" data-item="${es(item.uid)}" title="Quitar ejercicio" aria-label="Quitar ${es(item.name)}">${icon('trash',15)}</button></div></div>
      <div class="set-head ${core?'core-sets':''}"><span>Serie</span><span>Reps.</span>${core?'<span>Seg.</span>':''}<span>Peso (kg)</span><span style="text-align:center">Hecha</span><span></span></div>
      ${item.sets.map((set,j)=>`<div class="set-row ${core?'core-sets':''} ${set.done?'complete':''}"><span class="set-index">${String(j+1).padStart(2,'0')}</span><input class="input set-input" type="number" min="0" max="10000" step="1" inputmode="numeric" placeholder="Reps" aria-label="Repeticiones de serie ${j+1} de ${es(item.name)}" value="${es(set.reps)}" data-bind="set-reps" data-item="${es(item.uid)}" data-set="${es(set.id)}">${core?`<input class="input set-input" type="number" min="0" max="36000" step="1" inputmode="numeric" placeholder="seg" aria-label="Segundos de serie ${j+1} de ${es(item.name)}" value="${es(set.seconds??'')}" data-bind="set-seconds" data-item="${es(item.uid)}" data-set="${es(set.id)}">`:''}<input class="input set-input" type="number" min="0" max="10000" step="0.5" inputmode="decimal" placeholder="kg" aria-label="Peso de serie ${j+1} de ${es(item.name)}" value="${es(set.weight??'')}" data-bind="set-weight" data-item="${es(item.uid)}" data-set="${es(set.id)}"><label class="done-label"><input type="checkbox" class="set-check" aria-label="Serie ${j+1} completada" data-bind="set-done" data-item="${es(item.uid)}" data-set="${es(set.id)}" ${set.done?'checked':''}></label><button class="btn ghost icon-only" data-action="remove-set" data-item="${es(item.uid)}" data-set="${es(set.id)}" title="Quitar serie" aria-label="Quitar serie ${j+1}">${icon('close',14)}</button></div>`).join('')}
      </section>`;
  }
  function findDraftItem(id){return db.draft?.items.find(i=>i.uid===id);}
  function findSet(itemId,setId){return findDraftItem(itemId)?.sets.find(s=>s.id===setId);}
  function finishSession(){
    const d=db.draft;if(!d)return;
    const core=d.day==='core';
    const items=d.items.map(item=>({...item,sets:item.sets.filter(set=>{
      const reps=num(set.reps),seconds=num(set.seconds),weight=num(set.weight);
      if(!set.touched && !set.done) return false; // Precargas no equivalen a series realizadas.
      return core ? ((reps>0 || seconds>0) && (weight==null || weight>=0)) : (reps>0 && weight!=null && weight>=0);
    }).map(set=>({id:set.id,reps:num(set.reps),seconds:core?num(set.seconds):null,weight:num(set.weight),done:!!set.done}))})).filter(item=>item.sets.length);
    if(items.length===0){alert(core?'Registrá al menos una serie con repeticiones o segundos.':'Registrá al menos una serie con repeticiones y peso. Para ejercicios sin carga externa, usá 0 kg.');return;}
    if(!validDate(d.date)){alert('Elegí una fecha válida.');return;}
    const session={id:d.sessionId||d.id,kind:'strength',day:d.day,date:d.date,notes:d.notes||'',items,createdAt:d.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};
    const oldIndex=db.sessions.findIndex(s=>s.id===session.id);
    if(oldIndex>=0)db.sessions[oldIndex]=session;else db.sessions.push(session);
    const edited=oldIndex>=0;db.draft=null;save();ui.historyFilter='todos';changePage('historial');ui.expandedHistory=session.id;render();toast(edited?'Cambios guardados':'Entrenamiento guardado');
  }
  const validDate = d => {if(!/^\d{4}-\d{2}-\d{2}$/.test(d))return false;const t=new Date(`${d}T12:00:00`);return !Number.isNaN(t.getTime()) && t.getFullYear()===Number(d.slice(0,4)) && t.getMonth()+1===Number(d.slice(5,7)) && t.getDate()===Number(d.slice(8,10));};
  function openModal(content){document.getElementById('modal-root').innerHTML=`<div class="modal-backdrop" data-action="close-modal-backdrop"><div class="modal" role="dialog" aria-modal="true">${content}</div></div>`;}
  const modalHead = text => `<div class="modal-head"><h2>${text}</h2><button type="button" class="btn ghost icon-only" data-action="close-modal" aria-label="Cerrar">${icon('close')}</button></div>`;
  function closeModal(){document.getElementById('modal-root').innerHTML='';}
  function confirmDiscardDraft(){
    if(!db.draft){changePage('entrenar');return;}
    const day=routineLabel(db.draft.day);
    openModal(`${modalHead('Descartar sesión')}<p class="subtext">¿Descartar la sesión de ${es(day)}? Los cambios de esta sesión que no guardaste se perderán. Tus entrenamientos anteriores no se modificarán.</p><div class="form-actions"><button type="button" class="btn ghost" data-action="close-modal">Seguir entrenando</button><button type="button" class="btn danger" data-action="confirm-discard-draft">Descartar y elegir rutina</button></div>`);
    document.querySelector('#modal-root [data-action="confirm-discard-draft"]')?.focus();
  }
  function discardDraft(){
    if(!db.draft){closeModal();changePage('entrenar');return;}
    db.draft=null;
    save();
    closeModal();
    changePage('entrenar');
    toast('Borrador descartado');
  }
  function exercisePicker(){ui.modalSearch='';ui.pickerGroup=routineGroup(db.draft?.day)||'todos';openModal(`${modalHead('Agregar ejercicio')}<div class="field mb-16"><label for="picker-search">Buscar en la biblioteca</label><input class="input" id="picker-search" placeholder="Ej.: remo, press, sentadilla..." data-bind="picker-search" autocomplete="off"></div><div class="picker-tabs" id="picker-tabs">${pickerTabs()}</div><div class="modal-scroll" id="picker-results">${pickerResults()}</div><div class="divider"></div><button class="btn ghost w-full" data-action="open-custom-modal">${icon('plus',15)} Crear un ejercicio propio</button>`);}
  function pickerTabs(){return [['todos','Todos'],['push','Push'],['pull','Pull'],['legs','Legs'],['core','Core']].map(([key,label])=>`<button class="${ui.pickerGroup===key?'active':''}" type="button" data-action="picker-group" data-value="${key}">${label}</button>`).join('');}
  function pickerResults(){
    const arr=allExercises().filter(ex=>(ui.pickerGroup==='todos'||ex.group===ui.pickerGroup)&&matchesExercise(ex,ui.modalSearch)).sort((a,b)=>a.name.localeCompare(b.name,'es'));
    return `<div class="picker-count">${arr.length} ejercicios</div>`+(arr.length ? arr.map(ex=>`<div class="modal-exercise"><div><b>${es(ex.name)}</b><div><span>${es(ex.muscle||DAY[ex.group]?.label||'General')}${ex.equipment?' · '+es(ex.equipment):''}${ex.custom?' · Propio':''}</span></div></div><button class="btn small ghost" data-action="pick-exercise" data-id="${es(ex.id)}">${icon('plus',14)} Añadir</button></div>`).join('') : `<div class="empty" style="padding:16px">No hay coincidencias.</div>`);
  }
  function customModal(){openModal(`${modalHead('Nuevo ejercicio')}<form id="custom-exercise-form"><div class="stack"><div class="field"><label for="custom-name">Nombre del ejercicio</label><input class="input" id="custom-name" name="name" minlength="2" maxlength="80" placeholder="Ej.: remo unilateral en máquina" required></div><div class="field"><label for="custom-group">Día al que pertenece</label><select class="select" id="custom-group" name="group"><option value="push">Push</option><option value="pull">Pull</option><option value="legs">Legs</option><option value="core">Core</option></select></div></div><div class="form-actions"><button type="button" class="btn ghost" data-action="close-modal">Cancelar</button><button type="submit" class="btn primary">Guardar ejercicio</button></div></form>`);}
  function renderHistory(){
    const arr=sortByDate(db.sessions).filter(s=>ui.historyFilter==='todos' || (ui.historyFilter==='fuerza'?(s.kind==='strength'&&!isCore(s)):ui.historyFilter==='core'?isCore(s):s.kind==='cardio'));
    return `${pageHeader('Historial.','',`<button class="btn ghost small" data-action="export-csv">${icon('download',15)} CSV</button>`)}
      <div class="filters"><div class="segment" role="group" aria-label="Filtrar sesiones">${[['todos','Todas'],['fuerza','Fuerza'],['core','Core'],['cardio','Cardio']].map(([id,label])=>`<button data-action="history-filter" data-value="${id}" class="${ui.historyFilter===id?'active':''}">${label}</button>`).join('')}</div><span class="muted tiny">${arr.length} ${arr.length===1?'sesión':'sesiones'}</span></div>
      ${arr.length?arr.map(historyCard).join(''):empty('Sin sesiones para mostrar','Empezá a registrar tus entrenamientos para verlos acá.','calendar',`<button class="btn primary small" data-action="nav" data-page="entrenar">Crear sesión</button>`)}
      `;
  }
  function historyCard(s){const expanded=ui.expandedHistory===s.id;return `<article class="card history-card"><button type="button" class="history-summary" data-action="toggle-history" data-id="${es(s.id)}" aria-expanded="${expanded}"><span class="session-left"><span class="session-circle">${icon(s.kind==='cardio'?'heart':isCore(s)?'activity':'dumbbell',19)}</span><span><span class="session-name" style="display:block">${es(s.kind==='cardio'?s.activity:routineLabel(s.day))} ${groupTag(s.kind==='cardio'?'cardio':s.day)}</span><span class="session-sub" style="display:block">${es(formatDate(s.date))} · ${es(sessionSummary(s))}</span></span></span><span style="color:var(--muted)">${icon('chevron',19)}</span></button>${expanded?historyDetails(s):''}</article>`;}
  function historyDetails(s){
    if(s.kind==='cardio')return `<div class="history-details"><div class="form-grid"><div><div class="field-label">Actividad</div><b>${es(s.activity)}</b></div><div><div class="field-label">Duración</div><b>${fmt(s.minutes)} minutos</b></div><div><div class="field-label">Distancia</div><b>${s.distance==null?'—':`${fmt(s.distance)} km`}</b></div></div>${s.notes?`<p class="details-note">${es(s.notes)}</p>`:''}<div class="history-actions"><button class="btn small ghost" data-action="edit-cardio" data-id="${es(s.id)}">${icon('pencil',14)} Editar</button> <button class="btn small danger" data-action="delete-session" data-id="${es(s.id)}">${icon('trash',14)} Eliminar</button></div></div>`;
    return `<div class="history-details">${(s.items||[]).map(item=>`<div class="history-ex-name">${es(item.name)}</div><table class="history-table"><thead><tr><th>Serie</th><th>Reps.</th>${isCore(s)?'<th>Segundos</th>':''}<th>Peso</th><th>Estado</th></tr></thead><tbody>${(item.sets||[]).map((set,i)=>`<tr><td>${i+1}</td><td>${fmt(set.reps)}</td>${isCore(s)?`<td>${fmt(set.seconds)}</td>`:''}<td>${set.weight==null?'—':`${fmt(set.weight)} kg`}</td><td>${set.done?'Hecha':'Registrada'}</td></tr>`).join('')}</tbody></table>`).join('')}${s.notes?`<p class="details-note">${es(s.notes)}</p>`:''}<div class="history-actions"><button class="btn small ghost" data-action="edit-strength" data-id="${es(s.id)}">${icon('pencil',14)} Editar</button> <button class="btn small danger" data-action="delete-session" data-id="${es(s.id)}">${icon('trash',14)} Eliminar</button></div></div>`;
  }
  function editStrength(id){const s=db.sessions.find(s=>s.id===id && s.kind==='strength');if(!s)return;if(db.draft && !confirm('Hay una sesión en curso. ¿Descartarla para editar esta sesión anterior?'))return;db.draft={id:s.id,sessionId:s.id,day:s.day,date:s.date,notes:s.notes||'',createdAt:s.createdAt,items:s.items.map(item=>({...item,uid:uid(),sets:item.sets.map(set=>({...set,id:uid(),touched:true}))}))};save();changePage('entrenar');}
  function renderCardio(){const editing=db.sessions.find(s=>s.id===ui.cardioEditId && s.kind==='cardio');return `${pageHeader(editing?'Editar cardio.':'Cardio.','')}
    <div class="two-col"><div><section class="card card-pad"><h2 class="section-title mb-16">${editing?'Actualizar sesión':'Nueva sesión de cardio'}</h2><form id="cardio-form"><div class="form-grid cols-2"><div class="field"><label for="cardio-activity">Actividad</label><select class="select" id="cardio-activity" name="activity" required>${CARDIO_TYPES.map(v=>`<option value="${es(v)}" ${editing?.activity===v?'selected':''}>${es(v)}</option>`).join('')}</select></div><div class="field"><label for="cardio-date">Fecha</label><input class="input" id="cardio-date" type="date" name="date" value="${es(editing?.date||today())}" required></div><div class="field"><label for="cardio-minutes">Duración (minutos)</label><input class="input" id="cardio-minutes" type="number" min="1" max="10000" step="1" name="minutes" inputmode="numeric" placeholder="Ej.: 30" value="${editing?es(editing.minutes):''}" required></div><div class="field"><label for="cardio-distance">Distancia (km, opcional)</label><input class="input" id="cardio-distance" type="number" min="0" max="100000" step="0.01" name="distance" inputmode="decimal" placeholder="Ej.: 4.5" value="${editing?.distance!=null?es(editing.distance):''}"></div><div class="field wide"><label for="cardio-notes">Notas (opcional)</label><textarea class="textarea" id="cardio-notes" name="notes" placeholder="Ritmo, sensaciones, recorrido...">${es(editing?.notes||'')}</textarea></div></div><div class="form-actions">${editing?`<button class="btn ghost" type="button" data-action="cancel-cardio-edit">Cancelar</button>`:''}<button class="btn primary" type="submit">${icon('check',16)} ${editing?'Guardar cambios':'Guardar cardio'}</button></div></form></section></div><div><section class="card card-pad"><h2 class="section-title mb-16">Actividad reciente</h2>${recentList(db.sessions.filter(s=>s.kind==='cardio'),5)}</section></div></div>`;}

  function renderLibrary(){
    const arr=allExercises().filter(ex=>(ui.libraryFilter==='todos'||ui.libraryFilter===ex.group||ui.libraryFilter==='propios'&&ex.custom) && matchesExercise(ex,ui.libraryQuery)).sort((a,b)=>a.name.localeCompare(b.name,'es'));
    return `${pageHeader('Ejercicios.','',`<button class="btn primary small" data-action="open-custom-modal">${icon('plus',16)} Crear ejercicio</button>`)}
      <div class="filters"><input class="input filter-search" type="search" id="library-query" data-bind="library-query" placeholder="Buscar por nombre..." value="${es(ui.libraryQuery)}" aria-label="Buscar ejercicio"><div class="segment" role="group" aria-label="Filtro de biblioteca">${[['todos','Todos'],['push','Push'],['pull','Pull'],['legs','Legs'],['core','Core'],['propios','Propios']].map(([id,label])=>`<button data-action="library-filter" data-value="${id}" class="${ui.libraryFilter===id?'active':''}">${label}</button>`).join('')}</div></div><div class="muted tiny mb-16">${arr.length} ejercicios disponibles</div>
      ${arr.length?`<div class="library-grid" id="library-results">${libraryItems(arr)}</div>`:empty('Sin coincidencias','Probá con otra búsqueda o creá un ejercicio personalizado.','search')}`;
  }
  function libraryItems(arr){return arr.map(ex=>`<article class="card library-item"><div><h3>${es(ex.name)}</h3><p>${es(ex.muscle||DAY[ex.group]?.label||'General')}${ex.equipment?' · '+es(ex.equipment):''} ${ex.custom?'· Propio':'· Precargado'}</p></div>${ex.custom?`<button class="btn ghost icon-only" data-action="delete-exercise" data-id="${es(ex.id)}" title="Eliminar ejercicio propio" aria-label="Eliminar ${es(ex.name)}">${icon('trash',15)}</button>`:groupTag(ex.group)}</article>`).join('');}
  function renderData(){return `${pageHeader('Datos.','')}
    <div class="data-tiles">
      <article class="card data-tile"><span class="data-index">01 / EXPORTAR</span>${icon('file',26)}<h3>Sesiones CSV</h3><button class="btn ghost" data-action="export-csv">${icon('download',16)} Exportar CSV</button></article>
      <article class="card data-tile"><span class="data-index">02 / RESPALDAR</span>${icon('download',26)}<h3>Respaldo JSON</h3><button class="btn primary" data-action="export-json">${icon('download',16)} Crear respaldo</button></article>
      <article class="card data-tile"><span class="data-index">03 / RESTAURAR</span>${icon('upload',26)}<h3>Importar JSON</h3><button class="btn ghost" data-action="import-json">${icon('upload',16)} Importar archivo</button><input class="upload-input" id="import-file" type="file" accept="application/json,.json"></article>
    </div>
    <div class="data-local">${icon('lock',17)} ALMACENAMIENTO LOCAL · Los datos se guardan en este navegador. Exportá un respaldo antes de cambiar de dispositivo o versión.</div>
    <div class="data-danger"><span>BORRAR DATOS LOCALES</span><button class="btn danger small" data-action="erase-all">${icon('trash',14)} Borrar todo</button></div>`;}
  function csvCell(x){let s=x==null?'':String(x);if(/^[=+@\-]/.test(s) && !/^-\d+(\.\d+)?$/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';}
  function csv(rows){return '\ufeff'+rows.map(row=>row.map(csvCell).join(',')).join('\r\n');}
  function download(name,body,mime){const blob=new Blob([body],{type:mime});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.style.display='none';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);}
  function exportSessions(){
    const rows=[['tipo','fecha','rutina_actividad','ejercicio','serie','repeticiones','segundos','peso_kg','completada','duracion_min','distancia_km','notas']];
    sortByDate(db.sessions).forEach(s=>{
      if(s.kind==='cardio') rows.push(['cardio',s.date,s.activity,'','','','','','',s.minutes,s.distance??'',s.notes||'']);
      else (s.items||[]).forEach(item=>(item.sets||[]).forEach((set,i)=>rows.push([isCore(s)?'core':'fuerza',s.date,routineLabel(s.day),item.name,i+1,set.reps??'',set.seconds??'',set.weight??'',set.done?'sí':'no','','',s.notes||''])));
    });
    download(`repbit-sesiones-${today()}.csv`,csv(rows),'text/csv;charset=utf-8');toast('Sesiones exportadas');
  }
  function exportJSON(){download(`repbit-respaldo-${today()}.json`,JSON.stringify({...db,exportedAt:new Date().toISOString(),app:'repbit'},null,2),'application/json;charset=utf-8');toast('Respaldo exportado');}
  function validateImport(value){
    if(!value || !Array.isArray(value.sessions) || !Array.isArray(value.customExercises) || (value.measurements!=null&&!Array.isArray(value.measurements)))throw Error('El archivo no tiene el formato de un respaldo de Repbit.');
    if(value.sessions.length>100000 || (value.measurements||[]).length>100000 || value.customExercises.length>10000)throw Error('El archivo contiene demasiados registros.');
    if(value.sessions.some(s=>!s || typeof s.id!=='string' || !validDate(s.date) || !['cardio','strength'].includes(s.kind) || (s.kind==='strength'&&(!Array.isArray(s.items)|| !(ROUTINES[s.day] || DEFAULTS[s.day])))))throw Error('El historial contiene sesiones inválidas.');
    if((value.measurements||[]).some(m=>!m || typeof m.id!=='string' || !validDate(m.date)))throw Error('El respaldo contiene mediciones inválidas.');
    if(value.customExercises.some(e=>!e || typeof e.id!=='string' || typeof e.name!=='string' || !DAY[e.group]))throw Error('El respaldo contiene ejercicios inválidos.');
    return {version:2,sessions:value.sessions,measurements:value.measurements||[],customExercises:value.customExercises,draft:value.draft&&Array.isArray(value.draft.items)&&(ROUTINES[value.draft.day] || DEFAULTS[value.draft.day])?value.draft:null};
  }
  async function importJSON(file){if(!file)return;if(file.size>12*1024*1024){alert('El archivo es demasiado grande (máximo 12 MB).');return;}try{const obj=validateImport(JSON.parse(await file.text()));if(!confirm(`¿Restaurar ${obj.sessions.length} sesiones? Reemplazará todos los datos actuales de este navegador.`))return;db=obj;save();ui.expandedHistory=null;ui.cardioEditId=null;changePage('inicio');toast('Respaldo restaurado');}catch(err){alert(`No se pudo importar: ${err.message}`);}}
  function removeSession(id){const s=db.sessions.find(s=>s.id===id);if(!s)return;if(!confirm(`¿Eliminar la sesión del ${formatDate(s.date)}? Esta acción no se puede deshacer.`))return;db.sessions=db.sessions.filter(s=>s.id!==id);if(ui.expandedHistory===id)ui.expandedHistory=null;save();render();toast('Sesión eliminada');}
  function eraseAll(){if(!confirm('¿Borrar permanentemente todos tus registros locales? Exportá un respaldo antes si querés conservarlos.'))return;if(!confirm('Última confirmación: ¿eliminar todo el historial de este navegador?'))return;db=newData();save();closeModal();changePage('inicio');toast('Registros locales borrados');}
  function mobileMore(){openModal(`${modalHead('Más secciones')}<div class="stack">${navItems.slice(3).map(item=>`<button class="btn ghost w-full" style="justify-content:flex-start;min-height:54px" data-action="nav-modal" data-page="${item.id}">${icon(item.ico)} ${item.label} ${icon('arrow',15)}</button>`).join('')}</div>`);}
  document.addEventListener('click', ev=>{
    const button=ev.target.closest('[data-action]');if(!button)return;
    const action=button.dataset.action;
    if(action==='close-modal-backdrop'){if(ev.target===button)closeModal();return;}
    if(action==='toggle-sidebar'){toggleSidebar();return;}
    if(action==='nav'){changePage(button.dataset.page);return;}
    if(action==='nav-modal'){closeModal();changePage(button.dataset.page);return;}
    if(action==='mobile-more'){mobileMore();return;}
    if(action==='close-modal'){closeModal();return;}
    if(action==='start-session'){startSession(button.dataset.day);return;}
    if(action==='discard-draft'){confirmDiscardDraft();return;}
    if(action==='confirm-discard-draft'){discardDraft();return;}
    if(action==='open-exercise-picker'){exercisePicker();return;}
    if(action==='picker-group'){ui.pickerGroup=button.dataset.value;document.getElementById('picker-tabs').innerHTML=pickerTabs();document.getElementById('picker-results').innerHTML=pickerResults();return;}
    if(action==='open-custom-modal'){customModal();return;}
    if(action==='pick-exercise'){const ex=exerciseById(button.dataset.id);if(ex && db.draft){db.draft.items.push(makeItem(ex));save();closeModal();render();toast('Ejercicio agregado');}return;}
    if(action==='add-set'){const item=findDraftItem(button.dataset.item);if(item){if(item.sets.length>=30){alert('Máximo 30 series por ejercicio.');return;}item.sets.push(blankSet());save();render();}return;}
    if(action==='remove-set'){const item=findDraftItem(button.dataset.item);if(item){item.sets=item.sets.filter(s=>s.id!==button.dataset.set);save();render();}return;}
    if(action==='remove-exercise'){const item=findDraftItem(button.dataset.item);if(!item)return;const filled=item.sets.some(s=>s.reps!==''||s.weight!=='');if(filled&&!confirm(`¿Quitar ${item.name} y sus series de esta sesión?`))return;db.draft.items=db.draft.items.filter(i=>i.uid!==item.uid);save();render();return;}
    if(action==='copy-last'){const item=findDraftItem(button.dataset.item);if(!item)return;const previous=lastForDraft(item)?.item;if(!previous)return;if(item.sets.some(s=>s.reps!==''||s.weight!=='')&&!confirm('¿Reemplazar las series actuales con las de la última sesión?'))return;item.sets=copySets(previous.sets);save();render();toast('Últimas series copiadas');return;}
    if(action==='finish-session'){finishSession();return;}
    if(action==='history-filter'){ui.historyFilter=button.dataset.value;ui.expandedHistory=null;render();return;}
    if(action==='toggle-history'){ui.expandedHistory=ui.expandedHistory===button.dataset.id?null:button.dataset.id;render();return;}
    if(action==='edit-strength'){editStrength(button.dataset.id);return;}
    if(action==='edit-cardio'){ui.cardioEditId=button.dataset.id;changePage('cardio');return;}
    if(action==='cancel-cardio-edit'){ui.cardioEditId=null;render();return;}
    if(action==='delete-session'){removeSession(button.dataset.id);return;}
    if(action==='library-filter'){ui.libraryFilter=button.dataset.value;render();return;}
    if(action==='delete-exercise'){const ex=db.customExercises.find(e=>e.id===button.dataset.id);if(ex&&confirm(`¿Eliminar ${ex.name} de la biblioteca? Los entrenamientos históricos no se modificarán.`)){db.customExercises=db.customExercises.filter(e=>e.id!==ex.id);save();render();toast('Ejercicio eliminado');}return;}
    if(action==='export-csv'){exportSessions();return;}
    if(action==='export-json'){exportJSON();return;}
    if(action==='import-json'){document.getElementById('import-file')?.click();return;}
    if(action==='erase-all'){eraseAll();return;}
  });
  document.addEventListener('input', ev=>{
    const el=ev.target;const bind=el.dataset.bind;
    if(!bind)return;
    if(bind==='picker-search'){ui.modalSearch=el.value;const results=document.getElementById('picker-results');if(results)results.innerHTML=pickerResults();return;}
    if(bind==='library-query'){
      ui.libraryQuery=el.value;const start=el.selectionStart,end=el.selectionEnd;render();const input=document.getElementById('library-query');if(input){input.focus();input.setSelectionRange(start,end);}return;
    }
    if(bind==='workout-notes'){db.draft.notes=el.value;save();return;}
    if(bind==='workout-date'){db.draft.date=el.value;save();return;}
    if(['set-reps','set-weight','set-seconds'].includes(bind)){const set=findSet(el.dataset.item,el.dataset.set);if(set){set[bind.slice(4)]=el.value;set.touched=true;save();}return;}
  });
  document.addEventListener('change',ev=>{
    const el=ev.target;
    if(el.id==='import-file'){importJSON(el.files?.[0]);el.value='';return;}
    if(el.dataset.bind==='set-done'){const set=findSet(el.dataset.item,el.dataset.set);if(set){set.done=el.checked;if(el.checked)set.touched=true;save();const row=el.closest('.set-row');row?.classList.toggle('complete',el.checked);}return;}
    if(el.dataset.bind==='workout-date'){db.draft.date=el.value;save();}
  });
  document.addEventListener('submit',ev=>{
    const form=ev.target;if(!['cardio-form','custom-exercise-form'].includes(form.id))return;ev.preventDefault();
    const data=new FormData(form);
    if(form.id==='custom-exercise-form'){
      const name=String(data.get('name')||'').trim();const group=data.get('group');
      if(name.length<2||name.length>80||!DAY[group]){alert('Completá un nombre válido y elegí un grupo de ejercicios.');return;}
      const ex={id:uid(),name,group,custom:true};db.customExercises.push(ex);
      if(ui.page==='entrenar'&&db.draft)db.draft.items.push(makeItem(ex));
      save();closeModal();render();toast('Ejercicio creado');return;
    }
    if(form.id==='cardio-form'){
      const activity=String(data.get('activity')||'');const date=String(data.get('date')||'');const minutes=num(data.get('minutes'));const distance=num(data.get('distance'));
      if(!CARDIO_TYPES.includes(activity)||!validDate(date)||minutes==null||minutes<=0||minutes>10000||distance!=null&&(distance<0||distance>100000)){alert('Revisá los datos de la sesión.');return;}
      const old=db.sessions.find(s=>s.id===ui.cardioEditId&&s.kind==='cardio');
      const session={id:old?.id||uid(),kind:'cardio',activity,date,minutes,distance,notes:String(data.get('notes')||'').trim().slice(0,2000),createdAt:old?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};
      if(old)db.sessions=db.sessions.map(s=>s.id===old.id?session:s);else db.sessions.push(session);
      ui.cardioEditId=null;save();render();toast(old?'Cardio actualizado':'Cardio guardado');return;
    }
  });
  document.addEventListener('keydown',ev=>{if(ev.key==='Escape'){if(document.querySelector('#modal-root .modal'))closeModal();else if(ui.sidebarOpen)toggleSidebar(false);}});
  render();
  if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost')){
    window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(err=>console.warn('Servicio offline no disponible',err)));
  }
})();