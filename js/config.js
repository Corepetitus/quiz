/**
 * Corepetitus Quiz – CONFIG v2.1
 * Tipai:
 * - options
 * - grid
 * - grid_dynamic
 * - table
 * - loading
 * - info
 * - analysis
 * - lead
 * - thankyou
 */

const quizSteps = [

  // 1
  {
    id: 'grade',
    type: 'grid',
    columns: 2,
    question: 'Kurioje klasėje šiuo metu mokotės?',
    options: [1,2,3,4,5,6,7,8,9,10,11,12].map(n => `${n} kl.`)
  },

  // 2
  {
    id: 'subject',
    type: 'options',
    question: 'Kurį dalyką norėtumėte geriau išmokti?',
    options: [
      '🧮 Matematika',
      '📘 Lietuvių kalba',
      '🇬🇧 Anglų kalba',
      '⚡ Fizika',
      '🧬 Biologija',
      '⚗️ Chemija',
      '📜 Istorija',
      '🇪🇸 Ispanų kalba',
      '➕ Kita'
    ]
  },

  // 3
  {
    id: 'learning_style',
    type: 'options',
    question: 'Koks mokymosi būdas labiausiai padeda įsisavinti informaciją?',
    options: [
      '👀 Vizualiai (matant pavyzdžius)',
      '🎧 Klausantis (klausant paaiškinimo)',
      '✍️ Praktikuojant (atliekant užduotis)',
      '🤷 Nežinau',
      '➕ Kita'
    ]
  },

  // 4
  {
    id: 'goal',
    type: 'options',
    question: 'Ko norėtumėte pasiekti mokydamiesi su korepetitoriumi?',
    options: [
      '📈 Pagerinti pažymius ir vidurkį',
      '🎓 Pasiruošti egzaminui ar testui (pvz. PUPP, VBE)',
      '🤝 Gauti daugiau individualaus dėmesio mokantis ir pagalbos su namų darbais',
      '🔥 Sustiprinti motyvaciją mokytis'
    ]
  },

  // 5
  {
    id: 'reason',
    type: 'options',
    question: 'Kas paskatino ieškoti korepetitoriaus?',
    options: [
      '🏫 Norime įstoti į pasirinktą mokyklą, kolegiją ar universitetą',
      '🧠 Norime lavinti loginį ir kritinį mąstymą',
      '✨ Norime sustiprinti susidomėjimą dalyku',
      '🌱 Siekiame bendro išsilavinimo ir asmeninio tobulėjimo',
      '➕ Kita'
    ]
  },

  // LOADING 1
  {
    id: 'loading_1',
    type: 'loading',
    from: 34,
    to: 28,
    text: 'Minutėlę... Atrenkame mokytojus pagal jūsų poreikius'
  },

  // INFO
  {
    id: 'info_time',
    type: 'info',
    title: 'Tam, kad parinktume tinkamą mokytoją, mums svarbu žinoti jums patogius laikus',
    testimonial: {
      name: 'Kristina Bulotienė',
      text: 'Dukros pusmečio balas pakilo nuo 6 iki 8. Mokytojas visą dėmesį skyrė tik jai.'
    }
  },

  // 6
  {
    id: 'weekday_time',
    type: 'table',
    question: 'Kokiu laiku galite mokytis darbo dienomis?',
    days: ['Pir', 'An', 'Tre', 'Ket', 'Pen'],
    times: ['15:00 – 17:00', '17:00 – 19:00', '19:00 – 21:00']
  },

  // 7
  {
    id: 'weekend_time',
    type: 'table',
    question: 'Kokiu laiku galite mokytis savaitgaliais?',
    days: ['Šeš', 'Sek'],
    times: ['10:00 – 12:00', '12:00 – 14:00', '14:00 – 16:00', '16:00 – 18:00', '18:00 – 20:00']
  },

  // LOADING 2
  {
    id: 'loading_2',
    type: 'loading',
    from: 18,
    to: 13,
    text: 'Minutėlę... Liko mokytojai, atitinkantys jūsų poreikius'
  },

  // 8
  {
    id: 'homework',
    type: 'options',
    question: 'Ar mokiniui patinka namų darbai?',
    options: [
      '😍 Patinka!',
      '🙂 Nesiskundžia',
      '😡 Labai nepatinka',
      '🤔 Nežinau'
    ]
  },

  // 9
  {
    id: 'motivation',
    type: 'options',
    question: 'Kokia mokinio motyvacija mokytis?',
    options: [
      '🔥 Labai didelė',
      '🙂 Vidutinė',
      '😐 Žema',
      '😴 Labai žema'
    ]
  },

  // 10 – nuo 10 iki 1
  {
    id: 'current_avg',
    type: 'grid',
    columns: 2,
    question: 'Koks buvo paskutinio pusmečio vidurkis?',
    options: [10,9,8,7,6,5,4,3,2,1].map(n => `${n}`)
  },

  // 11 – nuo didesnio iki mažesnio
  {
    id: 'target_avg',
    type: 'grid_dynamic',
    columns: 2,
    question: 'Kokio vidurkio siekiate?',
    dependsOn: 'current_avg',
    order: 'desc'
  },

  // 12
  {
    id: 'frequency',
    type: 'options',
    question: 'Kaip dažnai norėtumėte lankyti papildomas pamokas?',
    options: [
      '1 kartą per savaitę (stipriems mokiniams)',
      '2 kartus per savaitę (vidutinio lygio)',
      '3 kartus per savaitę (mokymosi spragoms)',
      'Tiek, kiek reikės'
    ]
  },

  // 13
  {
    id: 'environment',
    type: 'options',
    question: 'Kokia mokymosi aplinka jums padeda geriausiai?',
    options: [
      '🧘 Rami ir savarankiška',
      '🤝 Bendradarbiaujanti ir interaktyvi',
      '🤷 Nežinau'
    ]
  },

  // ANALIZĖ (marketing)
  {
    id: 'analysis',
    type: 'analysis',
    title: 'Analizuojame Jūsų rezultatus',
    items: [
      'Vertinamas mokytojo prieinamumas',
      'Vertinamas vaiko mokymosi stilius',
      'Rengiamas personalizuotas mokymosi planas'
    ],
    stats: '6500+ sėkmingai paruoštų mokinių',
    testimonial: {
      name: 'Jovita',
      text: 'Mano vaikas nekenčia mokytis, bet individualios pamokos pavertė mokslą įdomiu.'
    }
  },

  // LEAD
  {
    id: 'lead',
    type: 'lead',
    title: 'Sudarėme unikalų mokymosi planą ir atrinkome mokytoją pagal jūsų poreikius',
    subtitle: 'Kur siųsti rezultatus?'
  },

  // THANK YOU
  {
    id: 'thankyou',
    type: 'thankyou',
    title: 'Ačiū! 🎉',
    text: 'Su Jumis netrukus susisieksime',
    redirect: '/'
  }

];
