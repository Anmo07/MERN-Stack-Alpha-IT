const Students = {
    student1: { name: "Alice", marks: { math: 85, science: 90, english: 78 } },
    student2: { name: "Bob", marks: { math: 75, science: 80, english: 88 } },
    student3: { name: "Charlie", marks: { math: 95, science: 89, english: 92 } }
};

console.log(" Initial Student Records ");
for (const key in Students) {
    const { name, marks } = Students[key];
    console.log(`Name: ${name}, Marks: Math(${marks.math}), Science(${marks.science}), English(${marks.english})`);
}

console.log("Processing Student Records Please wait ... ");

// Render initial student records to DOM
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

async function processStudent(Student) {
    return new Promise((resolve) => {
        const delay = 2000;

        setTimeout(() => {
            const marksArray = Object.values(Student.marks);
            const total = marksArray.reduce((sum, mark) => sum + mark, 0);
            const average = (total / marksArray.length).toFixed(2);
            const status = average >= 80 ? "Pass" : "Fail";

            resolve({
                name: Student.name,
                average: average,
                status: status
            });
        }, delay);
    });
}

async function processAllStudents() {
    const results = [];
    const statusElement = document.getElementById("status");

    for (const key in Students) {
        const student = Students[key];
        console.log(`Processing student: ${student.name}...`);
        if (statusElement) {
            statusElement.textContent = `Processing student: ${student.name}...`;
        }
        const result = await processStudent(student);
        results.push(result);
    }
    return results;
}

processAllStudents()
    .then(results => {
        for (const student of results) {
            console.log(` ${student.name} has an average of ${student.average} (Status: ${student.status})`);
        }

        const statusElement = document.getElementById("status");
        if (statusElement) {
            statusElement.remove();
        }

        const resultsListElement = document.getElementById("results-list");
        const resultsSection = document.getElementById("results-section");

        if (resultsListElement && resultsSection) {
            results.forEach(student => {
                const li = document.createElement("li");
                li.className = "student-item";
                li.innerHTML = `<strong>${student.name}</strong> has an average of <strong>${student.average}</strong> — Status: <strong>${student.status}</strong>`;
                resultsListElement.appendChild(li);
            });
            resultsSection.classList.remove("hidden");
        }
    })
    .catch(error => {
        console.error(error);
        const displayElement = document.getElementById("display");
        if (displayElement) {
            const errSpan = document.createElement("span");
            errSpan.className = "error-message";
            errSpan.textContent = `Error processing records: ${error.message}`;
            displayElement.appendChild(errSpan);
        }
    });
