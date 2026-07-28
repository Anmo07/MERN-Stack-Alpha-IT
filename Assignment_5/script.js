/**
 * ==============================================================================
 * School Result Analyzer - JavaScript Array Search Methods
 * ==============================================================================
 * Array Search Methods Covered:
 * 1. indexOf()
 * 2. lastIndexOf()
 * 3. includes()
 * 4. find()
 * 5. findIndex()
 * 6. findLast()
 * 7. findLastIndex()
 * ==============================================================================
 */

// Native polyfills for Array.prototype.findLast and findLastIndex if not supported in older engines
if (!Array.prototype.findLast) {
  Array.prototype.findLast = function (predicate) {
    for (let i = this.length - 1; i >= 0; i--) {
      if (predicate(this[i], i, this)) return this[i];
    }
    return undefined;
  };
}

if (!Array.prototype.findLastIndex) {
  Array.prototype.findLastIndex = function (predicate) {
    for (let i = this.length - 1; i >= 0; i--) {
      if (predicate(this[i], i, this)) return i;
    }
    return -1;
  };
}

// Initial Data Arrays matching Example Case
const DEFAULT_STUDENTS = ["Rahul", "Priya", "Aman", "Rahul", "Neha"];
const DEFAULT_MARKS = [25, 35, 45, 60, 75];

// Working Data Arrays
let students = [...DEFAULT_STUDENTS];
let marks = [...DEFAULT_MARKS];

// DOM Elements
const rosterContainer = document.getElementById("roster-container");
const consoleLogs = document.getElementById("console-logs");

// Init application on load
document.addEventListener("DOMContentLoaded", () => {
  renderRoster();
  setupEventListeners();
  logToConsole("Dataset loaded: " + students.length + " students enrolled.", "info");
});

/**
 * Render Roster Visual Cards
 */
function renderRoster(highlightIndices = []) {
  rosterContainer.innerHTML = "";

  students.forEach((student, idx) => {
    const mark = marks[idx];
    const isPassed = mark > 40;
    const isHighlighted = highlightIndices.includes(idx);

    const item = document.createElement("div");
    item.className = `roster-item ${isHighlighted ? "active-highlight" : ""}`;
    item.id = `roster-item-${idx}`;

    item.innerHTML = `
      <div class="roster-info">
        <span class="roster-idx">Index ${idx}</span>
        <span class="roster-name">${escapeHtml(student)}</span>
      </div>
      <div class="roster-marks">
        <span class="mark-pill ${isPassed ? "mark-pass" : "mark-fail"}">
          ${mark} pts (${isPassed ? "Pass" : "Fail"})
        </span>
        <button class="btn-delete-student" data-idx="${idx}" title="Remove student">&times;</button>
      </div>
    `;

    rosterContainer.appendChild(item);
  });
}

/**
 * Logger helper function
 */
function logToConsole(message, type = "info") {
  const time = new Date().toLocaleTimeString();
  const entry = document.createElement("div");
  entry.className = `log-entry log-${type}`;
  entry.textContent = `[${time}] ${message}`;
  consoleLogs.appendChild(entry);
  consoleLogs.scrollTop = consoleLogs.scrollHeight;
}

/**
 * Event Listeners Registration
 */
function setupEventListeners() {
  // Reset Button
  document.getElementById("btn-reset").addEventListener("click", () => {
    students = [...DEFAULT_STUDENTS];
    marks = [...DEFAULT_MARKS];
    renderRoster();
    clearResults();
    logToConsole("Dataset reset to original default state.", "warning");
  });

  // Add Student Form
  document.getElementById("add-student-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("new-name");
    const markInput = document.getElementById("new-mark");

    const name = nameInput.value.trim();
    const mark = parseInt(markInput.value, 10);

    if (name && !isNaN(mark)) {
      students.push(name);
      marks.push(mark);
      renderRoster([students.length - 1]);
      logToConsole(`Added new student "${name}" with mark ${mark}.`, "success");
      nameInput.value = "";
      markInput.value = "";
    }
  });

  // Remove Student Delegate
  rosterContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete-student")) {
      const idx = parseInt(e.target.getAttribute("data-idx"), 10);
      const removedName = students[idx];
      students.splice(idx, 1);
      marks.splice(idx, 1);
      renderRoster();
      logToConsole(`Removed student "${removedName}" at index ${idx}.`, "warning");
    }
  });

  // Clear Console
  document.getElementById("btn-clear-console").addEventListener("click", () => {
    consoleLogs.innerHTML = "";
  });

  // Run Expected Queries Button
  document.getElementById("btn-run-all").addEventListener("click", runExpectedQueries);

  // Method 1: indexOf()
  const inputIndexOf = document.getElementById("input-indexOf");
  inputIndexOf.addEventListener("input", () => {
    document.getElementById("code-indexOf-name").textContent = inputIndexOf.value || "...";
  });
  document.getElementById("btn-indexOf").addEventListener("click", () => {
    const searchName = inputIndexOf.value.trim();
    const index = students.indexOf(searchName);

    const resBox = document.getElementById("res-indexOf");
    if (index !== -1) {
      resBox.className = "result-box res-success";
      resBox.textContent = `First ${searchName} is at index ${index}`;
      renderRoster([index]);
      logToConsole(`indexOf("${searchName}") ➔ ${index}`, "success");
    } else {
      resBox.className = "result-box res-fail";
      resBox.textContent = `Student "${searchName}" not found (-1)`;
      renderRoster([]);
      logToConsole(`indexOf("${searchName}") ➔ -1 (Not Found)`, "warning");
    }
  });

  // Method 2: lastIndexOf()
  const inputLastIndexOf = document.getElementById("input-lastIndexOf");
  inputLastIndexOf.addEventListener("input", () => {
    document.getElementById("code-lastIndexOf-name").textContent = inputLastIndexOf.value || "...";
  });
  document.getElementById("btn-lastIndexOf").addEventListener("click", () => {
    const searchName = inputLastIndexOf.value.trim();
    const index = students.lastIndexOf(searchName);

    const resBox = document.getElementById("res-lastIndexOf");
    if (index !== -1) {
      resBox.className = "result-box res-success";
      resBox.textContent = `Last ${searchName} is at index ${index}`;
      renderRoster([index]);
      logToConsole(`lastIndexOf("${searchName}") ➔ ${index}`, "success");
    } else {
      resBox.className = "result-box res-fail";
      resBox.textContent = `Student "${searchName}" not found (-1)`;
      renderRoster([]);
      logToConsole(`lastIndexOf("${searchName}") ➔ -1 (Not Found)`, "warning");
    }
  });

  // Method 3: includes()
  const inputIncludes = document.getElementById("input-includes");
  inputIncludes.addEventListener("input", () => {
    document.getElementById("code-includes-name").textContent = inputIncludes.value || "...";
  });
  document.getElementById("btn-includes").addEventListener("click", () => {
    const searchName = inputIncludes.value.trim();
    const enrolled = students.includes(searchName);

    const resBox = document.getElementById("res-includes");
    if (enrolled) {
      resBox.className = "result-box res-success";
      resBox.textContent = `${searchName} is enrolled ➔ true`;
      const idx = students.indexOf(searchName);
      renderRoster(idx !== -1 ? [idx] : []);
      logToConsole(`includes("${searchName}") ➔ true`, "success");
    } else {
      resBox.className = "result-box res-fail";
      resBox.textContent = `${searchName} is enrolled ➔ false`;
      renderRoster([]);
      logToConsole(`includes("${searchName}") ➔ false`, "warning");
    }
  });

  // Method 4: find()
  const inputFindThresh = document.getElementById("input-find-thresh");
  inputFindThresh.addEventListener("input", () => {
    document.getElementById("code-find-thresh").textContent = inputFindThresh.value || "0";
  });
  document.getElementById("btn-find").addEventListener("click", () => {
    const threshold = parseInt(inputFindThresh.value, 10) || 0;
    const foundMark = marks.find((m) => m > threshold);

    const resBox = document.getElementById("res-find");
    if (foundMark !== undefined) {
      const idx = marks.indexOf(foundMark);
      const studentName = students[idx];
      resBox.className = "result-box res-success";
      resBox.textContent = `First passing mark ➔ ${foundMark} (${studentName})`;
      renderRoster([idx]);
      logToConsole(`find(m > ${threshold}) ➔ ${foundMark} (Student: ${studentName})`, "success");
    } else {
      resBox.className = "result-box res-fail";
      resBox.textContent = `No mark found above ${threshold} (undefined)`;
      renderRoster([]);
      logToConsole(`find(m > ${threshold}) ➔ undefined`, "warning");
    }
  });

  // Method 5: findIndex()
  const inputFindIndexThresh = document.getElementById("input-findIndex-thresh");
  inputFindIndexThresh.addEventListener("input", () => {
    document.getElementById("code-findIndex-thresh").textContent = inputFindIndexThresh.value || "0";
  });
  document.getElementById("btn-findIndex").addEventListener("click", () => {
    const threshold = parseInt(inputFindIndexThresh.value, 10) || 0;
    const idx = marks.findIndex((m) => m > threshold);

    const resBox = document.getElementById("res-findIndex");
    if (idx !== -1) {
      const studentName = students[idx];
      const mark = marks[idx];
      resBox.className = "result-box res-success";
      resBox.textContent = `First passing student index ➔ ${idx} (${studentName}, ${mark} pts)`;
      renderRoster([idx]);
      logToConsole(`findIndex(m > ${threshold}) ➔ ${idx} (${studentName})`, "success");
    } else {
      resBox.className = "result-box res-fail";
      resBox.textContent = `No student index found above ${threshold} (-1)`;
      renderRoster([]);
      logToConsole(`findIndex(m > ${threshold}) ➔ -1`, "warning");
    }
  });

  // Method 6: findLast()
  const inputFindLastThresh = document.getElementById("input-findLast-thresh");
  inputFindLastThresh.addEventListener("input", () => {
    document.getElementById("code-findLast-thresh").textContent = inputFindLastThresh.value || "0";
  });
  document.getElementById("btn-findLast").addEventListener("click", () => {
    const threshold = parseInt(inputFindLastThresh.value, 10) || 0;
    const foundMark = marks.findLast((m) => m > threshold);

    const resBox = document.getElementById("res-findLast");
    if (foundMark !== undefined) {
      const idx = marks.findLastIndex((m) => m > threshold);
      const studentName = students[idx];
      resBox.className = "result-box res-success";
      resBox.textContent = `Last student scoring above ${threshold} ➔ ${foundMark} (${studentName})`;
      renderRoster([idx]);
      logToConsole(`findLast(m > ${threshold}) ➔ ${foundMark} (Student: ${studentName})`, "success");
    } else {
      resBox.className = "result-box res-fail";
      resBox.textContent = `No mark found above ${threshold} (undefined)`;
      renderRoster([]);
      logToConsole(`findLast(m > ${threshold}) ➔ undefined`, "warning");
    }
  });

  // Method 7: findLastIndex()
  const inputFindLastIndexThresh = document.getElementById("input-findLastIndex-thresh");
  inputFindLastIndexThresh.addEventListener("input", () => {
    document.getElementById("code-findLastIndex-thresh").textContent = inputFindLastIndexThresh.value || "0";
  });
  document.getElementById("btn-findLastIndex").addEventListener("click", () => {
    const threshold = parseInt(inputFindLastIndexThresh.value, 10) || 0;
    const idx = marks.findLastIndex((m) => m > threshold);

    const resBox = document.getElementById("res-findLastIndex");
    if (idx !== -1) {
      const studentName = students[idx];
      const mark = marks[idx];
      resBox.className = "result-box res-success";
      resBox.textContent = `Last passing student index ➔ ${idx} (${studentName}, ${mark} pts)`;
      renderRoster([idx]);
      logToConsole(`findLastIndex(m > ${threshold}) ➔ ${idx} (${studentName})`, "success");
    } else {
      resBox.className = "result-box res-fail";
      resBox.textContent = `No student index found above ${threshold} (-1)`;
      renderRoster([]);
      logToConsole(`findLastIndex(m > ${threshold}) ➔ -1`, "warning");
    }
  });
}

/**
 * Execute Problem Statement Queries & Update Audit Summary
 */
function runExpectedQueries() {
  logToConsole("Executing Problem Statement Expected Queries Audit...", "highlight");

  // 1. indexOf() -> First Rahul
  const firstRahulIdx = students.indexOf("Rahul");
  document.querySelector("#exp-1 .exp-val").textContent = firstRahulIdx !== -1 ? `index ${firstRahulIdx}` : "Not Found";

  // 2. lastIndexOf() -> Last Rahul
  const lastRahulIdx = students.lastIndexOf("Rahul");
  document.querySelector("#exp-2 .exp-val").textContent = lastRahulIdx !== -1 ? `index ${lastRahulIdx}` : "Not Found";

  // 3. includes() -> Neha enrolled
  const isNehaEnrolled = students.includes("Neha");
  document.querySelector("#exp-3 .exp-val").textContent = isNehaEnrolled ? "true" : "false";

  // 4. find() -> First passing marks (> 40)
  const firstPassingMark = marks.find((m) => m > 40);
  document.querySelector("#exp-4 .exp-val").textContent = firstPassingMark !== undefined ? `${firstPassingMark}` : "None";

  // 5. findIndex() -> First passing student index
  const firstPassingIdx = marks.findIndex((m) => m > 40);
  document.querySelector("#exp-5 .exp-val").textContent = firstPassingIdx !== -1 ? `index ${firstPassingIdx}` : "None";

  // 6. findLast() -> Last student scoring above 50
  const lastAbove50Mark = marks.findLast((m) => m > 50);
  document.querySelector("#exp-6 .exp-val").textContent = lastAbove50Mark !== undefined ? `${lastAbove50Mark}` : "None";

  // 7. findLastIndex() -> Last passing student index (> 40)
  const lastPassingIdx = marks.findLastIndex((m) => m > 40);
  document.querySelector("#exp-7 .exp-val").textContent = lastPassingIdx !== -1 ? `index ${lastPassingIdx}` : "None";

  // Highlight all matched indices in visual roster
  const matchedIndices = [firstRahulIdx, lastRahulIdx, firstPassingIdx, lastPassingIdx].filter((i) => i !== -1);
  renderRoster(matchedIndices);

  logToConsole(`Outputs: First Rahul: ${firstRahulIdx}, Last Rahul: ${lastRahulIdx}, Neha: ${isNehaEnrolled}, First Pass Mark: ${firstPassingMark}, First Pass Index: ${firstPassingIdx}, Last >50 Mark: ${lastAbove50Mark}, Last Pass Index: ${lastPassingIdx}`, "success");
}

function clearResults() {
  const resultBoxes = document.querySelectorAll(".result-box");
  resultBoxes.forEach((box) => {
    box.className = "result-box";
    box.textContent = "Result will appear here";
  });

  const expVals = document.querySelectorAll(".exp-val");
  expVals.forEach((val) => (val.textContent = "--"));
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
