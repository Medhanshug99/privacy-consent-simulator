const interactionInput = document.getElementById("interactionInput");
const sessionInput = document.getElementById("sessionInput");
const interactionValue = document.getElementById("interactionValue");
const sessionValue = document.getElementById("sessionValue");

const statsToggle = document.getElementById("statsToggle");
const personalizationToggle = document.getElementById("personalizationToggle");

const statsSystem = document.getElementById("statsSystem");
const personalizationSystem = document.getElementById("personalizationSystem");

const statsMetric = document.getElementById("statsMetric");
const personalizationMetric = document.getElementById("personalizationMetric");

const exposureBar = document.getElementById("exposureBar");
const outputLog = document.getElementById("outputLog");

function updateValues() {
  interactionValue.textContent = interactionInput.value;
  sessionValue.textContent = sessionInput.value;
  applyLogic();
}

function applyLogic() {
  outputLog.innerHTML = "";

  const interactions = Number(interactionInput.value);
  const duration = Number(sessionInput.value);

  if (statsToggle.checked) {
    const events = interactions * duration;
    statsSystem.className = "system enabled";
    statsMetric.textContent = `Events: ${events}`;
    outputLog.innerHTML += `<li>Usage statistics recorded ${events} interaction events.</li>`;
  } else {
    statsSystem.className = "system blocked";
    statsMetric.textContent = "Events: 0";
  }

  if (personalizationToggle.checked) {
    const profiles = Math.floor((interactions + duration) / 10);
    personalizationSystem.className = "system enabled";
    personalizationMetric.textContent = `Profiles: ${profiles}`;
    outputLog.innerHTML += `<li>Personalization updated ${profiles} user profiles.</li>`;
  } else {
    personalizationSystem.className = "system blocked";
    personalizationMetric.textContent = "Profiles: 0";
  }

  updateExposure();

  if (!statsToggle.checked && !personalizationToggle.checked) {
    outputLog.innerHTML = "<li>No non-essential data collected.</li>";
  }
}

function updateExposure() {
  exposureBar.className = "";

  if (personalizationToggle.checked) {
    exposureBar.classList.add("high");
    exposureBar.textContent = "High Data Exposure";
  } else if (statsToggle.checked) {
    exposureBar.classList.add("medium");
    exposureBar.textContent = "Medium Data Exposure";
  } else {
    exposureBar.classList.add("low");
    exposureBar.textContent = "Low Data Exposure";
  }
}

interactionInput.oninput = updateValues;
sessionInput.oninput = updateValues;
statsToggle.onchange = applyLogic;
personalizationToggle.onchange = applyLogic;

updateValues();
