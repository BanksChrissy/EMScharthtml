
const protocolSymptoms = {
  "General Adult Assessment": ["chest pain", "shortness of breath", "nausea"],
  "Pediatric Respiratory Distress": ["nasal flaring", "retractions", "cyanosis"]
};

const selected = {};

function createUI() {
  const container = document.getElementById("protocols");
  for (const protocol in protocolSymptoms) {
    const section = document.createElement("div");
    section.className = "protocol";
    const title = document.createElement("h3");
    title.innerText = protocol;
    section.appendChild(title);
    protocolSymptoms[protocol].forEach(symptom => {
      const box = document.createElement("div");
      box.className = "symptom";
      box.innerText = `Denies ${symptom}`;
      const key = protocol + "_" + symptom;
      box.onclick = () => {
        box.classList.toggle("selected");
        selected[key] = !selected[key];
      };
      section.appendChild(box);
    });
    container.appendChild(section);
  }
}

function generateNarrative() {
  const text = Object.entries(selected)
    .filter(([_, v]) => v)
    .map(([k]) => {
      const parts = k.split("_");
      return `Denies ${parts.slice(1).join(" ")}`;
    })
    .join(", ");
  document.getElementById("narrative").value = text ? `Pertinent negatives: ${text}.` : "No pertinent negatives selected.";
}

function copyNarrative() {
  const textArea = document.getElementById("narrative");
  textArea.select();
  document.execCommand("copy");
  alert("Narrative copied to clipboard!");
}

createUI();
