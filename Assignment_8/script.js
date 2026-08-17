// =============================================================================
// BACKEND SIMULATED DATA STORE
// =============================================================================
let currentUser = {
    id: 1,
    name: "Manish",
    age: 25,
    role: "Developer"
};

// =============================================================================
// OPERATION SWITCHER (UI CONTROLLER)
// =============================================================================
function handleOperationChange() {
    const selectedOp = document.getElementById("operationSelect").value;
    const sections = ["GET", "POST", "PATCH", "DELETE"];
    
    sections.forEach(op => {
        const sectionElem = document.getElementById(`section${op}`);
        if (sectionElem) {
            sectionElem.style.display = (op === selectedOp) ? "block" : "none";
        }
    });

    document.getElementById("statusMessage").innerText = "";
}

// =============================================================================
// TASK 1: VIEW USER PROFILE (GET)
// =============================================================================
async function fetchUserProfile() {
    const statusMsg = document.getElementById("statusMessage");
    statusMsg.innerText = "⏳ Executing GET request...";

    try {
        const response = await fetch("userData.json", { method: "GET" });
        if (response.ok && currentUser) {
            // Keep in-memory user updated or load initial
            displayUserProfile(currentUser);
            statusMsg.innerText = "✅ Status 200 OK: Profile loaded successfully.";
        } else if (!currentUser) {
            displayUserProfile(null);
            statusMsg.innerText = "⚠️ Status 404 Not Found: No user profile exists.";
        }
    } catch (error) {
        // Fallback for direct browser execution
        if (currentUser) {
            displayUserProfile(currentUser);
            statusMsg.innerText = "✅ Status 200 OK: Profile loaded successfully.";
        } else {
            displayUserProfile(null);
            statusMsg.innerText = "⚠️ Status 404 Not Found: No user profile exists.";
        }
    }
}

// =============================================================================
// TASK 2: CREATE USER PROFILE (POST)
// =============================================================================
async function createUserProfile(event) {
    event.preventDefault();
    const statusMsg = document.getElementById("statusMessage");

    const name = document.getElementById("postName").value.trim();
    const age = parseInt(document.getElementById("postAge").value);
    const role = document.getElementById("postRole").value.trim();

    const newUser = {
        id: currentUser ? currentUser.id + 1 : 1,
        name: name,
        age: age,
        role: role
    };

    // Store user in backend
    currentUser = newUser;
    displayUserProfile(currentUser);
    statusMsg.innerText = "✅ Status 201 Created: User created successfully.";
    console.log("POST Result:", currentUser);

    // Reset input fields
    event.target.reset();
}

// =============================================================================
// TASK 4: UPDATE ONLY ONE FIELD (PATCH)
// =============================================================================
async function patchUserProfile(event) {
    event.preventDefault();
    const statusMsg = document.getElementById("statusMessage");

    // Check if user exists
    if (!currentUser) {
        statusMsg.innerText = "❌ Error: Cannot update. No user profile found!";
        return;
    }

    const field = document.getElementById("patchField").value;
    const rawValue = document.getElementById("patchValue").value.trim();
    const parsedValue = (field === "age") ? parseInt(rawValue) : rawValue;

    // Use spread operator to update ONLY the specified field
    const updatedUser = {
        ...currentUser,
        [field]: parsedValue
    };

    currentUser = updatedUser;
    displayUserProfile(currentUser);
    statusMsg.innerText = `✅ Status 200 OK: Updated '${field}' via PATCH.`;
    console.log("PATCH Result (Spread Operator):", currentUser);

    // Reset input fields
    event.target.reset();
}

// =============================================================================
// TASK 5: DELETE USER PROFILE (DELETE)
// =============================================================================
async function deleteUserProfile() {
    const statusMsg = document.getElementById("statusMessage");

    // Handle "already deleted" case
    if (!currentUser) {
        statusMsg.innerText = "❌ Error 404: User is already deleted!";
        return;
    }

    // Remove user from backend
    currentUser = null;

    // UI updates instantly
    displayUserProfile(null);
    statusMsg.innerText = "✅ Status 200 OK: User profile deleted permanently.";
    console.log("DELETE Result: User deleted.");
}

// =============================================================================
// HELPER: DISPLAY USER ON UI
// =============================================================================
function displayUserProfile(user) {
    if (user) {
        document.getElementById("userId").innerText = user.id;
        document.getElementById("userName").innerText = user.name;
        document.getElementById("userAge").innerText = user.age;
        document.getElementById("userRole").innerText = user.role;
    } else {
        document.getElementById("userId").innerText = "--";
        document.getElementById("userName").innerText = "No user found";
        document.getElementById("userAge").innerText = "--";
        document.getElementById("userRole").innerText = "--";
    }
}

// Initial fetch on page load
window.onload = fetchUserProfile;
