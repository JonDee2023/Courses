document.addEventListener("DOMContentLoaded", () => {

    const startBtn = document.getElementById("lesson-start-btn");
    const endBtn = document.getElementById("lesson-end-btn");

    const startTimerDisplay =
        document.getElementById("start-lesson-timer");

    const endTimerDisplay =
        document.getElementById("end-lesson-timer");

    if (!startBtn || !endBtn) {
        console.log("Lesson buttons not found");
        return;
    }

    // Store current session ID
    let learningId = localStorage.getItem("newLearningSessionId");

    // STUD-START LESSON
    startBtn.addEventListener("click", async () => {

        const lessonStartTime = new Date();

        startTimerDisplay.textContent =
            "Start time: " +
            lessonStartTime.toLocaleTimeString();

        try {

            const response = await fetch(
                "http://localhost:5000/api/stud-start-lesson",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        sessionId: learningId,
                        startTime: lessonStartTime
                    })
                }
            );

            const data = await response.json();

            // Save session ID returned from backend
            // currentSessionId = data.sessionId;

            console.log("Session created:", learningId);

        } catch (error) {

            console.error("Error starting lesson:", error);

        }

    });

    // STUD-END LESSON
    endBtn.addEventListener("click", async () => {

        // Prevent ending before starting
        if (!learningId) {
            alert("Start lesson first");
            return;
        }

        const lessonEndTime = new Date();

        endTimerDisplay.textContent =
            "End time: " +
            lessonEndTime.toLocaleTimeString();

        try {

            const response = await fetch(
                "http://localhost:5000/api/stud-end-lesson",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        sessionId: tutoringId,
                        endTime: lessonEndTime
                    })
                }
            );

            const data = await response.json();

            console.log("Session updated:", data);

        } catch (error) {

            console.error("Error ending lesson:", error);

        }

    });

});