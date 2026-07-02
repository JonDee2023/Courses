const quizId = localStorage.getItem("quizId");

//const student = JSON.parse(localStorage.getItem("student"));

const student_id = localStorage.getItem("stud-id");


const form = document.getElementById("quizForm");

let questionsData = [];

form.addEventListener("DOMContentLoaded", loadQuestions)

// LOAD QUESTIONS
async function loadQuestions() {

    const res = await fetch(
        `http://localhost:5000/api/quizzes/${quizId}/questions`
    );

    const questions = await res.json();

    questionsData = questions;

    questions.forEach((q, index) => {

        const div = document.createElement("div");

        div.innerHTML = `
            <h3>
                ${index + 1}. ${q.question}
            </h3>

            <label>
                <input type="radio"
                    name="question_${q.id}"
                    value="A">
                ${q.option_a}
            </label>

            <br>

            <label>
                <input type="radio"
                    name="question_${q.id}"
                    value="B">
                ${q.option_b}
            </label>

            <br>

            <label>
                <input type="radio"
                    name="question_${q.id}"
                    value="C">
                ${q.option_c}
            </label>

            <br>

            <label>
                <input type="radio"
                    name="question_${q.id}"
                    value="D">
                ${q.option_d}
            </label>

            <hr>
        `;

        form.appendChild(div);
    });
}

loadQuestions();



// SUBMIT QUIZ
document.getElementById("submitBtn")
.addEventListener("click", async () => {

    const answers = {};

    questionsData.forEach((q) => {

        const selected = document.querySelector(
            `input[name="question_${q.id}"]:checked`
        );

        answers[q.id] = selected ? selected.value : null;
    });

    const res = await fetch(
        `http://localhost:5000/api/quizzes/${quizId}/submit`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                student_id: student_id,
                answers: answers
            })
        }
    );

    const data = await res.json();

    alert(
        `You scored ${data.score}/${data.total}`
    );

    window.location.href = "teecha-stud-dashboard-full.html";
});

