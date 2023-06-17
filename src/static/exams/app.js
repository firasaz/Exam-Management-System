console.log("hello from app.js")
const examBtns = [...document.getElementsByClassName("modal-button")]
const modal = document.getElementById("modal-body-confirm")
const startExam = document.getElementById("start-button")

examBtns.forEach(examBtn => examBtn.addEventListener("click", () => {
    const pk = examBtn.getAttribute("data-pk")
    const name = examBtn.getAttribute("data-name")
    const no_of_questions = examBtn.getAttribute("data-noOfQuestions")
    const duration = examBtn.getAttribute("data-time")

    modal.innerHTML = `
    <div class="h5 mb-3">Are you sure you want to start this exam?</div>
    <div class="text-muted">
        <ul>
            <li>Exam: <b>${name}</b></li>
            <li>Number of Questions: <b>${no_of_questions}</b></li>
            <li>Duration: <b>${duration} mins</b></li>
        </ul>
    `

    startExam.addEventListener("click", () => {
        window.location.href += pk
    })
}))