/**
 * Corepetitus Quiz – APP FINAL
 */

let stepIndex = 0;
const answers = {};
let isTransitioning = false;

const content = document.getElementById('quiz-content');
const progressBar = document.querySelector('.progress-bar');
const stepCurrent = document.getElementById('step-current');
const stepTotal = document.getElementById('step-total');
const backBtn = document.getElementById('back-btn');

backBtn.addEventListener('click', prevStep);

const HIDDEN_TYPES = ['loading', 'info', 'analysis', 'lead', 'thankyou'];

/* =====================
   STEPS COUNT (be info / loading / analysis)
===================== */

const visibleSteps = quizSteps.filter(
  s => !['loading', 'info', 'analysis', 'lead', 'thankyou'].includes(s.type)
);

stepTotal.textContent = visibleSteps.length; // + lead form

/* =====================
   INIT
===================== */

document.body.style.minHeight = '100vh';

trackQuizStart(); // ✅ QUIZ START
renderStep();

/* =====================
   CORE RENDER
===================== */

function renderStep() {
  const step = quizSteps[stepIndex];

  if (!step) {
    console.error('INVALID STEP INDEX:', stepIndex);
    return;
  }

  updateProgress();
  updateBackButton();
  content.innerHTML = '';

  switch (step.type) {
    case 'options':
      renderOptions(step);
      break;

    case 'grid':
      renderGrid(step);
      break;

    case 'grid_dynamic':
      renderDynamicGrid(step);
      break;

    case 'table':
      renderTable(step);
      break;

    case 'info':
      renderInfo(step);
      break;

    case 'analysis':
      renderAnalysis();
      return;

    case 'loading':
      renderLoading(step);
      return;
      
    case 'lead':
      trackQuizComplete(); // QUIZ COMPLETE
      renderLeadForm();
      return;

    
    case 'thankyou':
      renderThankYou(step);
      return;

  }

  slideIn(content);
}

/* =====================
   STEP TYPES
===================== */

function renderOptions(step) {
  content.innerHTML = `
    <h2>${step.question}</h2>
    <div class="options">
      ${step.options.map(opt => `
        <button class="option" onclick="selectAnswer('${step.id}','${opt}',this)">
          ${opt}
        </button>
      `).join('')}
    </div>
  `;
}

function renderGrid(step) {
  content.innerHTML = `
    <h2>${step.question}</h2>
    <div class="options grid-options">
      ${step.options.map(opt => `
        <button class="option" onclick="selectAnswer('${step.id}','${opt}',this)">
          ${opt}
        </button>
      `).join('')}
    </div>
  `;
}

function renderDynamicGrid(step) {
  const base = parseInt(answers[step.dependsOn] || 1);
  const opts = [];

  for (let i = 10; i >= base; i--) {
    opts.push(i.toString());
  }

  content.innerHTML = `
    <h2>${step.question}</h2>
    <div class="options">
      ${opts.map(opt => `
        <button class="option" onclick="selectAnswer('${step.id}','${opt}',this)">
          ${opt}
        </button>
      `).join('')}
    </div>
  `;
}


function renderTable(step) {
  answers[step.id] = [];

  content.innerHTML = `
    <h2>${step.question}</h2>

    <div class="time-table" data-step="${step.id}">
      <table>
        <thead>
          <tr>
            <th></th>
            ${step.days.map(d => `<th>${d}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${step.times.map(time => `
            <tr>
              <td>${time}</td>
              ${step.days.map(day => `
                <td>
                  <input type="checkbox"
                    data-time
                    onchange="toggleTime('${step.id}','${day}','${time}')">
                </td>
              `).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>

      <label class="select-all">
        <input type="checkbox"
               data-select-all
               checked
               onchange="toggleSelectAll('${step.id}', this)">
        Pasirinkti visus
      </label>
    </div>

    <button class="next-btn primary-btn" disabled onclick="nextStep()">Tęsti →</button>
  `;

  // ✅ DEFAULT: pažymim visus (SU TEISINGAIS day/time)
  setTimeout(() => {
    const table = document.querySelector(`.time-table[data-step="${step.id}"]`);
    const checkboxes = table.querySelectorAll('[data-time]');
    const nextBtn = content.querySelector('.next-btn');

    answers[step.id] = [];

    checkboxes.forEach(cb => {
      cb.checked = true;

      const td = cb.closest('td');
      const tr = cb.closest('tr');

      const dayIndex = td.cellIndex - 1; // nes 0 yra laiko stulpelis
      const dayName = step.days[dayIndex];
      const timeText = tr.querySelector('td').textContent.trim();

      answers[step.id].push({ day: dayName, time: timeText });
    });

    nextBtn.disabled = false;
  }, 0);
}

function toggleSelectAll(stepId, el) {
  const table = el.closest('.time-table');
  const checkboxes = table.querySelectorAll('[data-time]');
  const nextBtn = content.querySelector('.next-btn');

  const step = quizSteps.find(s => s.id === stepId);
  answers[stepId] = [];

  if (el.checked) {
    checkboxes.forEach(cb => {
      cb.checked = true;

      const td = cb.closest('td');
      const tr = cb.closest('tr');

      const dayIndex = td.cellIndex - 1;
      const dayName = step.days[dayIndex];
      const timeText = tr.querySelector('td').textContent.trim();

      answers[stepId].push({ day: dayName, time: timeText });
    });

    nextBtn.disabled = false;
  } else {
    checkboxes.forEach(cb => (cb.checked = false));
    nextBtn.disabled = true;
  }
}



function renderInfo(step) {
  content.innerHTML = `
    <h2>${step.title}</h2>

    <div class="testimonial-box">
      <img src="assets/images/user.webp" alt="Atsiliepimas">
      <div>
        <strong>${step.testimonial.name}</strong>
        <p>⭐⭐⭐⭐⭐</p>
        <p>${step.testimonial.text}</p>
      </div>
    </div>

    <button class="next-btn primary-btn" onclick="nextStep()">Tęsti →</button>
  `;
}

function renderLoading(step) {
  trackQuizLoading('matching', step.from);

  let count = step.from;
  const startTime = Date.now();
  const minDuration = 2500;

  content.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>${step.text}</p>
      <h1 id="loading-count">${count}</h1>
      <p>mokytojai</p>
    </div>
  `;

  slideIn(content);
  spinLoader();

  const interval = setInterval(() => {
    if (count > step.to) {
      count--;
      const el = document.getElementById('loading-count');
      if (el) el.textContent = count;
    }

    if (count <= step.to && Date.now() - startTime >= minDuration) {
      clearInterval(interval);
      slideOut(content, nextStep);
    }
  }, 90);
}


/* =====================
   ANALYSIS (MARKETING STEP)
===================== */

function renderAnalysis() {
content.innerHTML = `
  <div class="analysis-card">
    <h2>Analizuojame Jūsų rezultatus</h2>

    <div class="analysis-item">
      <div class="analysis-header">
        <span>Vertinamas mokytojo prieinamumas</span>
        <strong class="analysis-percent">0%</strong>
      </div>
      <div class="analysis-bar"><span></span></div>
    </div>
    
    <div class="analysis-item">
      <div class="analysis-header">
        <span>Vertinamas vaiko mokymosi stilius</span>
        <strong class="analysis-percent">0%</strong>
      </div>
      <div class="analysis-bar"><span></span></div>
    </div>
    
    <div class="analysis-item">
      <div class="analysis-header">
        <span>Rengiamas personalizuotas mokymosi planas</span>
        <strong class="analysis-percent">0%</strong>
      </div>
      <div class="analysis-bar"><span></span></div>
    </div>


<div class="analysis-stats">
  <div class="analysis-number">6500+</div>
  <div class="analysis-text">sėkmingai paruoštų mokinių</div>
  <div class="analysis-stars">★★★★★</div>
</div>


    <div class="testimonial-box">
  <img src="assets/images/nojus.webp" alt="Nojus">
  <div>
    <strong>Nojus P.</strong>
    <p>
      Viskas gerai ir sklandžiai. Tik geriausios rekomendacijos Jums. Kai pradėjom daryti egzaminų užduotis, rezultatai tikrai pagerėjo, ir mokykloje jaučiu, kad lengviau mokytis. Rekomenduoju.
    </p>
  </div>
</div>

</div>
  `;

slideIn(content);

const bars = document.querySelectorAll('.analysis-bar span');
const percents = document.querySelectorAll('.analysis-percent');

let i = 0;

function fillNextBar() {
  if (i >= bars.length) {
    setTimeout(nextStep, 1200); // DUODAM LAIKO PASKAITYTI
    return;
  }

  let progress = 0;
  const interval = setInterval(() => {
    progress += 2; // lėčiau
    bars[i].style.width = progress + '%';
    percents[i].textContent = progress + '%';

    if (progress >= 100) {
      clearInterval(interval);
      i++;
      setTimeout(fillNextBar, 800); // pauzė tarp eilučių
    }
  }, 25); // greitis
}

fillNextBar();

}

/* =====================
   ACTIONS
===================== */

function selectAnswer(id, value, el) {
  if (isTransitioning) return;

  answers[id] = value.replace(' kl.', '');
  if (el) pulseOption(el);

  slideOut(content, nextStep);
}


function toggleTime(stepId, day, time) {
  const list = answers[stepId];

  const index = list.findIndex(
    t => t.day === day && t.time === time
  );

  if (index === -1) {
    list.push({ day, time });
  } else {
    list.splice(index, 1);
  }

  validateTimeSelection(stepId);
}

function validateTimeSelection(stepId) {
  const table = document.querySelector('.time-table');
  const checkboxes = table.querySelectorAll('[data-time]');
  const selectAll = table.querySelector('[data-select-all]');
  const nextBtn = content.querySelector('.next-btn');

  const checkedCount = [...checkboxes].filter(cb => cb.checked).length;

  // Mygtukas
  nextBtn.disabled = checkedCount === 0;

  // Select all būsena
  selectAll.checked = checkedCount === checkboxes.length;
}


// function selectAllTimes(cb, id) {
//   const checkboxes = document.querySelectorAll('.time-table input[type="checkbox"]');
//   checkboxes.forEach(c => c.checked = cb.checked);
// }

function nextStep() {
  if (isTransitioning) return;
  isTransitioning = true;

  stepIndex++;

  // ✅ PROGRESS EVENT (tik checkpoint'ai)
  if ([2, 4, 6].includes(stepIndex)) {
    trackQuizProgress(stepIndex);
  }

  renderStep();

  setTimeout(() => {
    isTransitioning = false;
  }, 300);
}

function shouldShowBack() {
  const current = quizSteps[stepIndex];
  // rodome tik kai yra kur grįžti ir kai esam normaliam klausime (ne loading/analysis/lead/thankyou)
  return stepIndex > 0 && current && !HIDDEN_TYPES.includes(current.type);
}

function updateBackButton() {
  if (!backBtn) return;
  backBtn.classList.toggle('is-visible', shouldShowBack());
}

function prevStep() {
  if (isTransitioning) return;
  isTransitioning = true;

  // einam atgal iki artimiausio "normalaus" žingsnio
  do {
    stepIndex--;
  } while (stepIndex > 0 && HIDDEN_TYPES.includes(quizSteps[stepIndex].type));

  renderStep();

  setTimeout(() => {
    isTransitioning = false;
  }, 300);
}


/* =====================
   LEAD FORM
===================== */

function renderLeadForm() {
  stepCurrent.textContent = stepTotal.textContent;

  content.innerHTML = `
    <h2>Sudarėme unikalų mokymosi planą ir atrinkome mokytoją pagal jūsų poreikius</h2>
    <p class="lead-subtitle">Kur siųsti rezultatus?</p>

    <form class="lead-form" onsubmit="submitLead(event)">
      <input type="email" placeholder="El. paštas" required>
      <input type="tel" placeholder="Telefono numeris" required>

<label class="privacy">
  <input type="checkbox" required>
  Sutinku su
  <a href="https://corepetitus.lt/privatumo-politika/"
     target="_blank"
     rel="noopener"
     class="privacy-link">
    privatumo politika
  </a>
</label>


      <button type="submit" class="primary-btn">Tęsti →</button>
    </form>
  `;
}

/* =====================
   SUBMIT + THANK YOU
===================== */

async function submitLead(e) {
  e.preventDefault();

  const form = e.target;
  const email = form.querySelector('input[type="email"]').value;
  const phone = form.querySelector('input[type="tel"]').value;

  const csrfResponse = await fetch('/api/csrf-token.php', {
    credentials: 'include'
  });
  const csrf_token = (await csrfResponse.json()).csrf_token;

  const payload = {
    email: email,
    phone: phone,
    quiz_answers: answers,
    source: 'corepetitus_quiz'
  };

  fetch('/api/submit-quiz.php', {  // Your own server endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' ,
      'X-CSRF-Token': csrf_token
    },
    credentials: 'include',
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    console.log('CRM RESPONSE:', data);

    trackQuizLead({
      email: email,
      phone: phone
    });

    slideOut(content, () => {
      nextStep(); // thank you
    });

  })
  .catch(err => {
    console.error('CRM ERROR:', err);
    alert('Įvyko klaida, bandykite dar kartą');
  });
}


function renderThankYou(step) {
  content.innerHTML = `
    <div class="thankyou-box">
      <div class="thankyou-emoji">😊</div>
      <h2>${step.title}</h2>
      <p>${step.text}</p>
    </div>
  `;

  slideIn(content);

  setTimeout(() => {
    window.location.href = 'https://corepetitus.lt/';
  }, 2000);
}



/* =====================
   PROGRESS
===================== */

function updateProgress() {
  const current = quizSteps[stepIndex];
  
  const index = visibleSteps.findIndex(s => s.id === current?.id);

  const visibleIndex = index === -1
    ? parseInt(stepCurrent.textContent || 1)
    : index + 1;

  const percent = (visibleIndex / visibleSteps.length) * 100;


  progressBar.style.width = percent + '%';
  stepCurrent.textContent = visibleIndex;
}
