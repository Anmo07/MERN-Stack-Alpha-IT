// Student Data
const Students = {
    student1: { name: "Alice", marks: { math: 85, science: 90, english: 78 } },
    student2: { name: "Bob", marks: { math: 75, science: 80, english: 88 } },
    student3: { name: "Charlie", marks: { math: 95, science: 89, english: 92 } }
};

// Print initial student records to the browser console
console.log("Initial Student Records:");
for (const key in Students) {
    const student = Students[key];
    console.log(`Name: ${student.name}, Marks: Math(${student.marks.math}), Science(${student.marks.science}), English(${student.marks.english})`);
}
console.log("Processing Student Records Please wait ...");

// Display initial student list on the webpage
const initialListElement = document.getElementById("initial-list");
if (initialListElement) {
    for (const key in Students) {
        const student = Students[key];
        const li = document.createElement("li");
        li.className = "student-item";
        li.innerHTML = `<strong>${student.name}</strong> — Math: ${student.marks.math}, Science: ${student.marks.science}, English: ${student.marks.english}`;
        initialListElement.appendChild(li);
    }
}

// Function to process a single student's marks after a 2-second delay
async function processStudent(student) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Calculate total marks and average score
            const total = student.marks.math + student.marks.science + student.marks.english;
            const average = (total / 3).toFixed(2);

            // Determine status: Pass if average is 80 or higher, else Fail
            let status = "Fail";
            if (average >= 80) {
                status = "Pass";
            }

            // Return processed student data
            resolve({
                name: student.name,
                average: average,
                status: status
            });
        }, 2000);
    });
}

// Function to process all students sequentially
async function processAllStudents() {
    const results = [];
    const statusElement = document.getElementById("status");

    // Loop through each student
    for (const key in Students) {
        const student = Students[key];
        console.log(`Processing student: ${student.name}...`);

        // Update status message on webpage
        if (statusElement) {
            statusElement.textContent = `Processing student: ${student.name}...`;
        }

        // Wait for current student processing to complete
        const result = await processStudent(student);
        results.push(result);
    }

    return results;
}

// Run the script to process all students and show results on the webpage
processAllStudents()
    .then((results) => {
        // Log final results to console
        for (const student of results) {
            console.log(`${student.name} has an average of ${student.average} (Status: ${student.status})`);
        }

        // Remove loading status message from webpage
        const statusElement = document.getElementById("status");
        if (statusElement) {
            statusElement.remove();
        }

        // Display results on webpage
        const resultsListElement = document.getElementById("results-list");
        const resultsSection = document.getElementById("results-section");

        if (resultsListElement && resultsSection) {
            for (const student of results) {
                const li = document.createElement("li");
                li.className = "student-item";
                li.innerHTML = `<strong>${student.name}</strong> has an average of <strong>${student.average}</strong> — Status: <strong>${student.status}</strong>`;
                resultsListElement.appendChild(li);
            }

            // Unhide results section
            resultsSection.classList.remove("hidden");
        }
    })
    .catch((error) => {
        console.error(error);
        const displayElement = document.getElementById("display");
        if (displayElement) {
            const errSpan = document.createElement("span");
            errSpan.className = "error-message";
            errSpan.textContent = `Error processing records: ${error.message}`;
            displayElement.appendChild(errSpan);
        }
    });
