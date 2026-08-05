// ==========================================
// 1. UNIQUE ID GENERATOR (Generator Function)
// ==========================================

// Generator function to yield sequential IDs (e.g., U001, U002, ...)
function* idGenerator() {
    let idCounter = 1;
    while (true) {
        // Format number with leading zeros (e.g., U001, U002)
        const formattedId = "U" + String(idCounter).padStart(3, "0");
        yield formattedId;
        idCounter++;
    }
}

// Initialize the ID generator instance
let idGen = idGenerator();


// ==========================================
// 2. DATA STRUCTURES (Set & Map)
// ==========================================

// Set to track unique user emails/usernames and prevent duplicates
const userSet = new Set();

// Map to store structured user data (Key: Email/Username -> Value: User Object)
const userMap = new Map();


// ==========================================
// 3. CORE SYSTEM FUNCTIONS
// ==========================================

/**
 * Adds a new user to the system.
 * Uses Set for uniqueness check and Generator for ID generation.
 * @param {string} identifier - User email or username
 */
function addUser(identifier) {
    if (!identifier || identifier.trim() === "") {
        logOutput("⚠️ Please provide a valid username or email.", "warning");
        return null;
    }

    const cleanedInput = identifier.trim();

    // Check if user already exists using Set
    if (userSet.has(cleanedInput)) {
        logOutput(`⚠️ User already exists: ${cleanedInput}`, "warning");
        return null;
    }

    // Step A: Generate unique ID using Generator function
    const newId = idGen.next().value;

    // Step B: Add user to Set to enforce uniqueness
    userSet.add(cleanedInput);

    // Step C: Create user object and store in Map
    const userRecord = {
        id: newId,
        email: cleanedInput,
        score: "N/A",
        level: "N/A"
    };

    userMap.set(cleanedInput, userRecord);

    // Step D: Log success message
    logOutput(`✅ New User Added: ${cleanedInput} (ID: ${newId})`, "success");

    // Refresh UI table view
    renderUserTable();

    return userRecord;
}

/**
 * Updates existing user data in the Map.
 * Verifies existence using the Set.
 * @param {string} identifier - User email or username
 * @param {object} newData - Object containing fields to update (e.g., score, level)
 */
function updateUserData(identifier, newData) {
    const cleanedInput = identifier.trim();

    // Verify user exists using the Set before updating
    if (!userSet.has(cleanedInput)) {
        logOutput(`❌ Error: User '${cleanedInput}' does not exist!`, "error");
        return false;
    }

    // Retrieve existing user record from Map
    const userRecord = userMap.get(cleanedInput);

    // Update record with new data properties
    if (newData.score !== undefined && newData.score !== "") userRecord.score = newData.score;
    if (newData.level !== undefined && newData.level !== "") userRecord.level = newData.level;

    // Save updated record back to Map
    userMap.set(cleanedInput, userRecord);

    // Format output string matching assignment specs
    const dataDetails = `{ email: '${cleanedInput}', score: ${userRecord.score}, level: ${userRecord.level} }`;
    logOutput(`🟢 Data Updated: ${dataDetails}`, "info");

    // Refresh UI table view
    renderUserTable();

    return true;
}

/**
 * Displays all user data stored in the system.
 */
function displayAllUsers() {
    logOutput("🔍 User Data:", "info");

    if (userSet.size === 0) {
        logOutput("  (No users stored in system)", "warning");
        return;
    }

    // Iterate through Map entries to log detailed user data
    userMap.forEach((user) => {
        const line = `ID: ${user.id} | Email: ${user.email} | Score: ${user.score} | Level: ${user.level}`;
        logOutput(line, "info");
    });
}


// ==========================================
// 4. EXTRA CHALLENGE / BONUS FUNCTIONS
// ==========================================

/**
 * Searches for a user in the Map by ID or Email.
 * @param {string} query - ID or Email to search for
 */
function searchUser(query) {
    if (!query) return;
    const cleaned = query.trim().toLowerCase();

    // Search Map values for matching ID or Email
    let foundUser = null;
    userMap.forEach((user) => {
        if (user.id.toLowerCase() === cleaned || user.email.toLowerCase() === cleaned) {
            foundUser = user;
        }
    });

    if (foundUser) {
        logOutput(`🔎 Found User -> ID: ${foundUser.id} | Email: ${foundUser.email} | Score: ${foundUser.score} | Level: ${foundUser.level}`, "success");
    } else {
        logOutput(`🔎 No user found matching: '${query}'`, "error");
    }
}

/**
 * Removes a user from both Set and Map.
 * @param {string} identifier - User email or username to delete
 */
function removeUser(identifier) {
    const cleaned = identifier.trim();

    if (userSet.has(cleaned)) {
        userSet.delete(cleaned);  // Delete from Set
        userMap.delete(cleaned);  // Delete from Map
        logOutput(`🗑️ Removed user: ${cleaned}`, "warning");
        renderUserTable();
    } else {
        logOutput(`❌ Cannot remove. User '${cleaned}' does not exist.`, "error");
    }
}

/**
 * Resets the generator and clears system data.
 */
function resetSystem() {
    userSet.clear();
    userMap.clear();
    idGen = idGenerator(); // Reset generator to start from U001
    logOutput("🔄 System data & ID generator reset.", "info");
    renderUserTable();
}


// ==========================================
// 5. DOM & HELPER UTILITIES
// ==========================================

/**
 * Logs messages to browser console and appends to terminal UI element.
 */
function logOutput(message, type = "info") {
    // Print to developer console
    console.log(message);

    // Append to UI terminal log box if DOM element exists
    if (typeof document !== "undefined") {
        const terminal = document.getElementById("consoleLog");
        if (terminal) {
            const logLine = document.createElement("div");
            logLine.className = `log-line log-${type}`;
            logLine.textContent = message;
            terminal.appendChild(logLine);
            terminal.scrollTop = terminal.scrollHeight;
        }
    }
}

/**
 * Renders user table view in the webpage HTML.
 */
function renderUserTable() {
    if (typeof document === "undefined") return;

    const tableBody = document.getElementById("userTableBody");
    if (!tableBody) return;

    if (userMap.size === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="empty-state">No users added yet.</td></tr>`;
        return;
    }

    tableBody.innerHTML = "";
    userMap.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${user.id}</strong></td>
            <td>${user.email}</td>
            <td>${user.score}</td>
            <td>${user.level}</td>
            <td><button class="action-btn-danger" onclick="removeUser('${user.email}')">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

/**
 * Runs default demo sequence matching assignment specifications.
 */
function runDemo() {
    // Clear terminal display for clean demo output
    if (typeof document !== "undefined") {
        const terminal = document.getElementById("consoleLog");
        if (terminal) terminal.innerHTML = "";
    }

    logOutput("--- Unique Data Tracker & ID Generator System ---", "info");

    // 1. Add Users (Uses Set and Generator)
    addUser("alice@example.com");
    addUser("bob@example.com");

    // 2. Attempt adding duplicate user (Set will detect and prevent)
    addUser("alice@example.com");

    // 3. Update User Data (Stored in Map)
    updateUserData("alice@example.com", { score: 90, level: 3 });
    updateUserData("bob@example.com", { score: 75, level: 2 });

    // 4. Display all user data
    displayAllUsers();
}


// ==========================================
// 6. EVENT LISTENERS SETUP
// ==========================================

if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        // Setup UI event handlers
        const addUserBtn = document.getElementById("addUserBtn");
        const updateUserBtn = document.getElementById("updateUserBtn");
        const searchUserBtn = document.getElementById("searchUserBtn");
        const removeUserBtn = document.getElementById("removeUserBtn");
        const runDemoBtn = document.getElementById("runDemoBtn");

        if (addUserBtn) {
            addUserBtn.addEventListener("click", () => {
                const input = document.getElementById("userInput");
                if (input && input.value) {
                    addUser(input.value);
                    input.value = "";
                }
            });
        }

        if (updateUserBtn) {
            updateUserBtn.addEventListener("click", () => {
                const email = document.getElementById("updateEmailInput").value;
                const score = document.getElementById("scoreInput").value;
                const level = document.getElementById("levelInput").value;
                if (email) {
                    updateUserData(email, { score: score, level: level });
                }
            });
        }

        if (searchUserBtn) {
            searchUserBtn.addEventListener("click", () => {
                const query = document.getElementById("searchQueryInput").value;
                if (query) searchUser(query);
            });
        }

        if (removeUserBtn) {
            removeUserBtn.addEventListener("click", () => {
                const query = document.getElementById("searchQueryInput").value;
                if (query) {
                    removeUser(query);
                    document.getElementById("searchQueryInput").value = "";
                }
            });
        }

        if (runDemoBtn) {
            runDemoBtn.addEventListener("click", () => {
                runDemo();
            });
        }

        // Automatically run demo on page load
        runDemo();
    });
} else {
    // If executing directly in Node.js environment
    runDemo();
}
