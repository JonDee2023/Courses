
async function loadQuizzes() {

    const res = await fetch("http://localhost:5000/api/quizzes");

    const quizzes = await res.json();

    const container = document.getElementById("quizList");

    quizzes.forEach((quiz) => {

        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${quiz.title}</h3>
            <p>${quiz.description}</p>
            <button onclick="startQuiz(${quiz.id})">
                Start Quiz
            </button>
        `;

        container.appendChild(div);
    });
}

function startQuiz(id) {

    localStorage.setItem("quizId", id);

    window.location.href = "teecha-stud-quiz-full.html";
}

loadQuizzes();

