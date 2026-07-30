

const Students = 
{
     student1: { name: "Alice", marks: { math: 85, science: 90, english: 78
} }, 
     student2: { name: "Bob", marks: { math: 75, science: 80, english:88 } 
    }, 
    student3: { name: "Charlie" , marks: { math: 95, science: 89, english: 92} } 
}

console.log(" Initial Student Records ");
for (const key in Students) {
    const s = Students[key];
    console.log(`Name: ${s.name}, Marks: Math(${s.marks.math}), Science(${s.marks.science}), English(${s.marks.english})`);
}
console.log("Processing Student Records Please wait ... ");
const displayElement = document.getElementById("display");
if (displayElement) {
    let initialHtml = "<h3>Initial Student Data:</h3><ul class='student-list'>";
    for (const key in Students) {
        const s = Students[key];
        initialHtml += `<li class='student-item'><strong>${s.name}</strong> — Math: ${s.marks.math}, Science: ${s.marks.science}, English: ${s.marks.english}</li>`;
    }
    initialHtml += "</ul><p id='status' style='margin-top: 15px; font-weight: bold;'>Processing Student Records, please wait...</p>";
    displayElement.innerHTML = initialHtml;
}


async function processStudent(Student) {
    return new Promise((resolve) => {
        
        const delay = 2000;

        setTimeout(() => {
            const marksArray = Object.values(Student.marks);
            const total = marksArray.reduce((sum, mark) => sum + mark, 0);
            const average = (total / marksArray.length).toFixed(2);

            let status;
            if (average >= 80) {
                status = "Pass";
            } else {
                status = "Fail";
            }

            resolve({
                name: Student.name,
                average: average,
                status: status
            });
        }, delay);
    });
}

async function processAllStudents(){
    const results = [];
    for (const key in Students) {
        console.log(`Processing student: ${Students[key].name}...`);
        const statusEl = document.getElementById("status");
        if (statusEl) {
            statusEl.innerText = `Processing student: ${Students[key].name}...`;
        }
        const result = await processStudent(Students[key]);
        results.push(result);
    }
    return results;
}

processAllStudents(Students)
    .then(results => {
        for (const student of results) {
            console.log(` ${student.name} has an average of ${student.average} (Status: ${student.status})`);
        }

        const displayEl = document.getElementById("display");
        if (displayEl) {
            let html = "<h3 style='margin-top: 15px;'>Results Processed Successfully:</h3><ul class='student-list' style='list-style: none; padding: 0;'>";
            results.forEach(student => {
                html += `<li class='student-item' style='margin: 6px 0;'> <strong>${student.name}</strong> has an average of <strong>${student.average}</strong> — Status: <strong>${student.status}</strong></li>`;
            });
            html += "</ul>";

            const statusEl = document.getElementById("status");
            if (statusEl) {
                statusEl.outerHTML = html;
            } else {
                displayEl.innerHTML += html;
            }
        }
    })
    .catch(error => {
        console.error(error);
        const displayEl = document.getElementById("display");
        if (displayEl) {
            displayEl.innerHTML = `<span class="error-message">Error processing records: ${error.message}</span>`;
        }
    });
