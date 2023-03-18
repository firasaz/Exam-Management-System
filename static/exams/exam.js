console.log("hello from exam.js")

const url = window.location.href
const examBox = document.getElementById("exam-box")
const scoreBox = document.getElementById("score-box")
const resultBox = document.getElementById("result-box")
const timerBox = document.getElementById("timer-box")

const activateTimer = (time) => {
    console.log("Time:\n\t",time,"mins")

    if (time.toString().length < 2) {
        timerBox.innerHTML = `<b>0${time}:00</b>`
    }
    else{
        timerBox.innerHTML = `<b>${time}:00</b>`
    }

    let minutes = time-1
    let seconds = 60
    let displaySeconds
    let displayMinutes

    const timer = setInterval(() => {
        seconds--
        if (seconds < 0) {
            seconds = 59
            minutes --
        }
        if (minutes.toString().length < 2) {
            displayMinutes = "0" + minutes
        } else {
            displayMinutes = minutes
        }

        if (seconds.toString().length < 2) {
            displaySeconds = "0" + seconds
        }
        else {
            displaySeconds = seconds
        }

        if (minutes == 0 && seconds == 0) {
            console.log("time is over")
            setTimeout(() => {
                clearInterval(timer)
                alert("Time Over!")
                sendData()
            }, 500) // 500 ms. yani 0.5s
            
        }

        timerBox.innerHTML = `<b>${displayMinutes}:${displaySeconds}`
    }, 1000) //1000ms. yani 1s
}
// this ajax block gets the questions by calling the view which returns a json response of the contents of the question model
// then displays them in the div element with id="exam-box"
$.ajax({
    type:"GET",
    url: `${url}take/`,
    success: function(response) {
        console.log("response:\n", response)
        const data = response.data
        console.log("response.data:\n", data)

        for (const [questions, answers] of Object.entries(data)) {
            console.log("Questions:\n\t",questions)
            examBox.innerHTML += `
                <hr>
                <div class="mb-2">
                    <b>${questions}</b>
                </div>
            `
            console.log("Answers:")
            if (answers != "classical question") {
                answers.forEach(answer => {
                    console.log("\t",answer)
                    examBox.innerHTML += `
                        <div>
                            <input type="radio" class="ans" id="${questions}-${answer}" name="${questions}" value="${answer}">
                            <label for="${questions}-${answer}">${answer}</label>
                        </div>
                    `
                });
            } else {
                examBox.innerHTML += `
                    <div>
                        <label for="answer_text"></label>                        
                        <textarea class="classical"name="${questions}" cols="30" rows="5" id="answer_text"></textarea>
                    </div>
                `
            }
            
        }

        activateTimer(response.time)
        // data.forEach(element => {
        //     console.log(element)
        //     for (const [questions, answers] of Object.entries(element)) {
        //         console.log(questions)
        //         console.log(answers)
        //     }
        // });
    },
    error: function(error) {
        console.log(error)
    }
})

const examForm = document.getElementById("exam-form")
const csrf = document.getElementsByName("csrfmiddlewaretoken")

// this sendData block is responsible for posting the user's asnwers then displaying 
// the results and the score back using the response of the backend
const sendData = () => {
    const choices = [...document.getElementsByClassName("ans")]
    const long_answers = [...document.getElementsByClassName("classical")]
    const dataDict = {}
    const classicalDict = {}
    dataDict["csrfmiddlewaretoken"] = csrf[0].value

    console.log(choices)
    choices.forEach(element => {
        if (element.checked) { // add the choice, which has the question and its corresponding value, from the form in the dictionary
            dataDict[element.name] = element.value
        }
        else {
            if (!dataDict[element.name]) {
                dataDict[element.name] = null // add the unanswered question and give it a value of null
            }
        }
    })

    long_answers.forEach(ans => {
        dataDict[ans.name] = ans.value
    })

    $.ajax({
        // when there is a POST request, we send(POST) the dataDict to the url
        type: "POST",
        url: `${url}submit/`,
        data: dataDict,
        success: function(response) {
            console.log("Response:\n",response)
            const results = response.results
            examForm.classList.add("not-visible")
            console.log("Results:\n",results)

            scoreBox.innerHTML = `
                Your result is ${response.score}%
            `
            results.forEach(result => {
                const respDiv = document.createElement("div")
                for (const [question, resp] of Object.entries(result)) {
                    respDiv.innerHTML += question
                    const cls = ["container", "p-3", "text-light", "h6"] // create a list of the classes of the respDiv
                    respDiv.classList.add(...cls) // add the class list to the respDiv

                    if (resp == "not answered") {
                        respDiv.innerHTML += `
                            - not asnwered
                        `
                        respDiv.classList.add("bg-danger") // add the "bg-dnager" to the div with no answer to its question

                    }
                    else {
                        const answer = resp["answered"]
                        const correct = resp["correct_answer"]

                        // display answer in green if answer chosen is the correct one
                        if (answer == correct) {
                            respDiv.classList.add("bg-success")
                            respDiv.innerHTML += `
                                answered: ${answer}
                            `
                        }
                        // display in red the answer chosen and the correct one
                        else {
                            respDiv.classList.add("bg-danger")
                            respDiv.innerHTML += ` | correct answer: ${correct}`
                            respDiv.innerHTML += ` | answered: ${answer}`
                        }
                    }
                }
                resultBox.append(respDiv)
            })
        },
        error: function(error) {
            console.log(error)
        }
    })
}

examForm.addEventListener("submit", e => {
    e.preventDefault()

    sendData()
})
