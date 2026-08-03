/**
 * Student Record Processing System
 * 
 * This script manages student records, renders initial data to the DOM,
 * asynchronously processes each student's average marks and pass/fail status
 * with simulated delays, and updates the user interface with the results.
 */

// ==========================================
// 1. Initial Data Setup
// ==========================================

// Dataset containing student objects with their respective subject marks
const Students = {
    student1: { name: "Alice", marks: { math: 85, science: 90, english: 78 } },
    student2: { name: "Bob", marks: { math: 75, science: 80, english: 88 } },
    student3: { name: "Charlie", marks: { math: 95, science: 89, english: 92 } }
};

// Log initial dataset to the console
console.log(" Initial Student Records ");
for (const key in Students) {
    const { name, marks } = Students[key];
    console.log(`Name: ${name}, Marks: Math(${marks.math}), Science(${marks.science}), English(${marks.english})`);
}
console.log("Processing Student Records Please wait ... ");

// ==========================================
// 2. DOM Rendering - Initial Student Data
// ==========================================

// Render initial student records to the DOM list element (#initial-list)
const initialListElement = document.getElementById("initial-list");
if (initialListElement) {
    for (const student of Object.values(Students)) {
        const { name, marks } = student;
        const li = document.createElement("li");
        li.className = "student-item";
        li.innerHTML = `<strong>${name}</strong> — Math: ${marks.math}, Science: ${marks.science}, English: ${marks.english}`;
        initialListElement.appendChild(li);
    }
}

// ==========================================
// 3. Asynchronous Data Processing Functions
// ==========================================

/**
 * Simulates asynchronous processing of a single student's record.
 * Calculates total marks, average score, and determines pass/fail status.
 * 
 * @param {Object} Student - The student object containing name and subject marks.
 * @returns {Promise<Object>} A promise resolving to an object with calculated student data.
 */
async function processStudent(Student) {
    return new Promise((resolve) => {
        const delay = 2000; // Simulated delay of 2 seconds (2000 ms)

        setTimeout(() => {
            // Extract mark values and calculate total & average score
            const marksArray = Object.values(Student.marks);
            const total = marksArray.reduce((sum, mark) => sum + mark, 0);
            const average = (total / marksArray.length).toFixed(2);
            
            // Determine pass/fail status based on average threshold (>= 80)
            const status = average >= 80 ? "Pass" : "Fail";

            // Resolve promise with processed student data object
            resolve({
                name: Student.name,
                average: average,
                status: status
            });
        }, delay);
    });
}

/**
 * Sequentially processes all student records stored in the `Students` object.
 * Updates UI status message for each student being processed.
 * 
 * @returns {Promise<Array<Object>>} A promise resolving to an array of processed student results.
 */
async function processAllStudents() {
    const results = [];
    const statusElement = document.getElementById("status");

    // Loop sequentially through each student record
    for (const key in Students) {
        const student = Students[key];
        console.log(`Processing student: ${student.name}...`);
        
        // Update progress status text on the webpage UI
        if (statusElement) {
            statusElement.textContent = `Processing student: ${student.name}...`;
        }
        
        // Wait for the current student's processing promise to resolve before moving to the next
        const result = await processStudent(student);
        results.push(result);
    }
    return results;
}

// ==========================================
// 4. Execution & UI Result Handling
// ==========================================

// Execute batch processing and handle resolved results or errors
processAllStudents()
    .then(results => {
        // Log individual student summaries to the console
        for (const student of results) {
            console.log(` ${student.name} has an average of ${student.average} (Status: ${student.status})`);
        }

        // Remove the loading/status message element from DOM
        const statusElement = document.getElementById("status");
        if (statusElement) {
            statusElement.remove();
        }

        // Render processed results into the DOM list (#results-list) and unhide the results section
        const resultsListElement = document.getElementById("results-list");
        const resultsSection = document.getElementById("results-section");

        if (resultsListElement && resultsSection) {
            results.forEach(student => {
                const li = document.createElement("li");
                li.className = "student-item";
                li.innerHTML = `<strong>${student.name}</strong> has an average of <strong>${student.average}</strong> — Status: <strong>${student.status}</strong>`;
                resultsListElement.appendChild(li);
            });
            // Display results container by removing the 'hidden' CSS class
            resultsSection.classList.remove("hidden");
        }
    })
    .catch(error => {
        // Log error and display error message on UI if processing fails
        console.error(error);
        const displayElement = document.getElementById("display");
        if (displayElement) {
            const errSpan = document.createElement("span");
            errSpan.className = "error-message";
            errSpan.textContent = `Error processing records: ${error.message}`;
            displayElement.appendChild(errSpan);
        }
    });
