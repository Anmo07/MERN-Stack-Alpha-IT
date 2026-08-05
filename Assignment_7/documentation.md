# Granular Technical Documentation: `script.js`

This document provides a line-by-line and block-by-block explanation of [script.js](file:///Users/anmoljangra/Documents/AlphaIT/Assignment_7/script.js) built for the **Unique Data Tracker and ID Generator System**.

---

## Table of Contents
1. [Overview & Core Architecture](#overview--core-architecture)
2. [Section 1: Unique ID Generator (Generator Function)](#section-1-unique-id-generator-generator-function)
3. [Section 2: Data Structures (Set & Map)](#section-2-data-structures-set--map)
4. [Section 3: Core System Functions](#section-3-core-system-functions)
   - [3.1 `addUser(identifier)`](#31-adduseridentifier)
   - [3.2 `updateUserData(identifier, newData)`](#32-updateuserdataidentifier-newdata)
   - [3.3 `displayAllUsers()`](#33-displayallusers)
5. [Section 4: Extra Challenge / Bonus Functions](#section-4-extra-challenge--bonus-functions)
   - [4.1 `searchUser(query)`](#41-searchuserquery)
   - [4.2 `removeUser(identifier)`](#42-removeuseridentifier)
   - [4.3 `resetSystem()`](#43-resetsystem)
6. [Section 5: DOM & Helper Utilities](#section-5-dom--helper-utilities)
   - [5.1 `logOutput(message, type)`](#51-logoutputmessage-type)
   - [5.2 `renderUserTable()`](#52-renderusertable)
   - [5.3 `runDemo()`](#53-rundemo)
7. [Section 6: Event Listeners & Dual-Environment Execution](#section-6-event-listeners--dual-environment-execution)

---

## Overview & Core Architecture

The system coordinates three key JavaScript ES6 features:
- **Set (`userSet`)**: Provides $O(1)$ time complexity for duplicate detection, ensuring every user email/username exists exactly once.
- **Generator Function (`idGenerator`)**: Produces incremental sequential IDs (`U001`, `U002`, `U003`...) lazily on demand without storing an infinite array.
- **Map (`userMap`)**: Maintains key-value relationships mapping user identifiers to their detailed record objects `{ id, email, score, level }`.

---

## Section 1: Unique ID Generator (Generator Function)

```javascript
// Lines 6–14: Generator function definition
function* idGenerator() {
    let idCounter = 1;
    while (true) {
        // Format number with leading zeros (e.g., U001, U002)
        const formattedId = "U" + String(idCounter).padStart(3, "0");
        yield formattedId;
        idCounter++;
    }
}

// Line 17: Initialize the ID generator instance
let idGen = idGenerator();
```

### Granular Explanation:
- **Line 6 (`function* idGenerator()`)**: The `*` syntax declares a **Generator Function**. Unlike standard functions that execute to completion and return once, generators can pause execution (`yield`) and resume later when `.next()` is called.
- **Line 7 (`let idCounter = 1;`)**: Initializes a local counter variable at `1`. Because of closure scope inside the generator, `idCounter` persists across multiple `.next()` calls.
- **Line 8 (`while (true)`)**: Creates an intentional infinite loop. The loop does **not** block the main thread because execution halts each time it hits `yield`.
- **Line 10 (`const formattedId = "U" + String(idCounter).padStart(3, "0");`)**:
  - Converts `idCounter` (e.g., `1`) into a string `"1"`.
  - `.padStart(3, "0")` pads the string on the left with `"0"` until it reaches a length of 3 digits (e.g., `"1"` $\rightarrow$ `"001"`).
  - Concatenates prefix `"U"` to produce `"U001"`, `"U002"`, etc.
- **Line 11 (`yield formattedId;`)**: Pauses the generator and returns an object `{ value: "U001", done: false }` to the caller.
- **Line 12 (`idCounter++;`)**: Increments the internal counter by 1 when the generator is resumed by the next `.next()` invocation.
- **Line 17 (`let idGen = idGenerator();`)**: Instantiates the generator object `idGen`, making it ready to produce IDs.

---

## Section 2: Data Structures (Set & Map)

```javascript
// Line 25: Set to track unique user emails/usernames
const userSet = new Set();

// Line 28: Map to store structured user data
const userMap = new Map();
```

### Granular Explanation:
- **Line 25 (`const userSet = new Set();`)**: Instantiates a native JavaScript `Set`. Sets only store unique values. Querying `.has(value)` runs in $O(1)$ constant time, making duplicate checks instant.
- **Line 28 (`const userMap = new Map();`)**: Instantiates a native JavaScript `Map`. Maps store key-value pairs (`email -> userData Object`) and preserve insertion order.

---

## Section 3: Core System Functions

### 3.1 `addUser(identifier)`

```javascript
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
```

### Granular Explanation:
- **Lines 41–44**: Validates input. If `identifier` is empty, `null`, `undefined`, or whitespace-only, it logs a warning message and terminates early by returning `null`.
- **Line 46 (`const cleanedInput = identifier.trim();`)**: Trims leading and trailing spaces from the user input string.
- **Lines 49–52**: Calls `userSet.has(cleanedInput)`. If the Set already contains this user, it logs `⚠️ User already exists: <name>` and returns `null` without adding any duplicate data.
- **Line 55 (`const newId = idGen.next().value;`)**: Calls `.next()` on the generator instance `idGen`. This resumes the generator up to `yield`, yielding the next sequential ID string (e.g. `"U001"`). Accessing `.value` extracts the string.
- **Line 58 (`userSet.add(cleanedInput);`)**: Inserts `cleanedInput` into `userSet` so future checks will recognize this user as existing.
- **Lines 61–66**: Constructs a user record object with initial default values for `score` and `level`.
- **Line 68 (`userMap.set(cleanedInput, userRecord);`)**: Saves `userRecord` in `userMap` using `cleanedInput` as the primary key.
- **Line 71**: Calls `logOutput` to print the green success message `✅ New User Added: ... (ID: ...)`.
- **Line 74**: Calls `renderUserTable()` to refresh the HTML table view if running in a browser.
- **Line 76**: Returns the created `userRecord`.

---

### 3.2 `updateUserData(identifier, newData)`

```javascript
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
```

### Granular Explanation:
- **Line 86**: Cleans input using `.trim()`.
- **Lines 89–92**: Queries `userSet.has(cleanedInput)`. If `false`, logs an error `❌ Error: User '...' does not exist!` and aborts by returning `false`.
- **Line 95 (`const userRecord = userMap.get(cleanedInput);`)**: Fetches the existing user object reference from `userMap`.
- **Lines 98–99**: Checks if `newData.score` and `newData.level` are provided and non-empty. If valid, updates the object properties.
- **Line 102 (`userMap.set(cleanedInput, userRecord);`)**: Re-saves the updated user record into `userMap`.
- **Lines 105–106**: Formats the update log string matching the exact assignment prompt specifications (`🟢 Data Updated: { email: '...', score: ..., level: ... }`) and logs it.
- **Line 109**: Calls `renderUserTable()` to update the UI.

---

### 3.3 `displayAllUsers()`

```javascript
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
```

### Granular Explanation:
- **Line 118**: Logs header `🔍 User Data:`.
- **Lines 120–123**: Checks `userSet.size`. If 0, outputs a warning message that no users exist and exits.
- **Lines 126–129**: Uses `userMap.forEach((user) => ...)` to iterate through all stored user records. Formats each user into a single line (`ID: U001 | Email: ... | Score: ... | Level: ...`) and logs it.

---

## Section 4: Extra Challenge / Bonus Functions

### 4.1 `searchUser(query)`
- **Lines 141–158**: Takes a `query` string (ID or email). Converts to lowercase, iterates over `userMap` entries, and checks if `user.id` or `user.email` matches `query`. Logs search result if found or an error if not found.

### 4.2 `removeUser(identifier)`
- **Lines 164–175**: Verifies user presence via `userSet.has(cleaned)`.
  - If present: deletes key from both `userSet.delete(cleaned)` and `userMap.delete(cleaned)`, logs deletion message, and refreshes table via `renderUserTable()`.
  - If absent: logs `❌ Cannot remove. User '...' does not exist.`.

### 4.3 `resetSystem()`
- **Lines 180–186**: Clears all records (`userSet.clear()`, `userMap.clear()`), re-instantiates `idGen = idGenerator()` (resetting ID counter back to `U001`), logs reset event, and updates UI table.

---

## Section 5: DOM & Helper Utilities

### 5.1 `logOutput(message, type)`
- **Lines 196–211**:
  - `console.log(message)`: Logs every message directly to the browser or terminal console.
  - `if (typeof document !== "undefined")`: Safely checks if DOM environment is available.
  - Creates a `<div>` element with class `log-line log-<type>` and appends it to `#consoleLog` terminal element in `index.html`. Automatically scrolls to the bottom.

### 5.2 `renderUserTable()`
- **Lines 216–239**:
  - Guards against non-browser execution.
  - Fetches `#userTableBody` element.
  - If `userMap.size === 0`, inserts an empty state row.
  - Otherwise, iterates `userMap` and dynamically constructs `<tr>` table rows displaying `ID`, `Email`, `Score`, `Level`, and a `Delete` button bound to `removeUser()`.

### 5.3 `runDemo()`
- **Lines 244–266**: Executes the exact test sequence required by the assignment prompt:
  1. `addUser("alice@example.com")` $\rightarrow$ Added `U001`
  2. `addUser("bob@example.com")` $\rightarrow$ Added `U002`
  3. `addUser("alice@example.com")` $\rightarrow$ Duplicate warning triggered
  4. `updateUserData("alice@example.com", { score: 90, level: 3 })`
  5. `updateUserData("bob@example.com", { score: 75, level: 2 })`
  6. `displayAllUsers()` $\rightarrow$ Outputs formatted database records

---

## Section 6: Event Listeners & Dual-Environment Execution

```javascript
if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        // Attaches click handlers to UI buttons (#addUserBtn, #updateUserBtn, etc.)
        // Automatically calls runDemo() on page load.
    });
} else {
    // Direct Node.js execution support
    runDemo();
}
```

### Granular Explanation:
- **`typeof document !== "undefined"`**: Checks whether the code is running in a web browser environment.
  - **In Browser**: Listens for `DOMContentLoaded` event, attaches click event listeners to interactive inputs/buttons, and runs `runDemo()`.
  - **In Node.js**: Directly executes `runDemo()`, printing the sample output cleanly into the CLI without DOM errors.
