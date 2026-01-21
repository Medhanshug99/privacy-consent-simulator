const interactionInput = document.getElementById("interactionInput");
const sessionInput = document.getElementById("sessionInput");
const interactionValue = document.getElementById("interactionValue");
const sessionValue = document.getElementById("sessionValue");

const analyticsToggle = document.getElementById("analyticsToggle");
const marketingToggle = document.getElementById("marketingToggle");

const analyticsSys = document.getElementById("analyticsSys");
const marketingSys = document.getElementById("marketingSys");

const analyticsMetric = document.getElementById("analyticsMetric");
const marketingMetric = document.getElementById("marketingMetric");

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

  if (analyticsToggle.checked) {
    const events = interactions * duration;
    analyticsSys.className = "system enabled";
    analyticsMetric.textContent = `Events: ${events}`;
    outputLog.innerHTML += `<li>Analytics recorded ${events} interaction events</li>`;
  } else {
    analyticsSys.className = "system blocked";
    analyticsMetric.textContent = "Events: 0";
  }

  if (marketingToggle.checked) {
    const profiles = Math.floor((interactions + duration) / 10);
    marketingSys.className = "system enabled";
    marketingMetric.textContent = `Profiles: ${profiles}`;
    outputLog.innerHTML += `<li>Marketing updated ${profiles} user profiles</li>`;
  } else {
    marketingSys.className = "system blocked";
    marketingMetric.textContent = "Profiles: 0";
  }

  updateExposure();
  if (!analyticsToggle.checked && !marketingToggle.checked) {
    outputLog.innerHTML = "<li>No non-essential data collected.</li>";
  }
}

function updateExposure() {
  exposureBar.className = "";

  if (marketingToggle.checked) {
    exposureBar.classList.add("high");
    exposureBar.textContent = "High Data Exposure";
  } else if (analyticsToggle.checked) {
    exposureBar.classList.add("medium");
    exposureBar.textContent = "Medium Data Exposure";
  } else {
    exposureBar.classList.add("low");
    exposureBar.textContent = "Low Data Exposure";
  }
}

interactionInput.oninput = updateValues;
sessionInput.oninput = updateValues;
analyticsToggle.onchange = applyLogic;
marketingToggle.onchange = applyLogic;

updateValues();
