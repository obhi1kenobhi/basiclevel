import { questionbank } from "./questionbank";


const questionContainer = document.getElementById("questions");
const submitbtn = document.getElementById("submit-btn");
const randombtn = document.getElementById("random-btn");
const descriptor = document.getElementById("description");
var randomquestions = [];

const randomgenerator = () => {
    randomquestions = [];
    for (let n = 0; n < 50; n++){

        randomquestions.push(questionbank[Math.floor(Math.random() * questionbank.length)]);
    }
    descriptor.innerHTML = ``;
    questionContainer.innerHTML = ``;
    randomquestions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");
        questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
        const optionsDiv = document.createElement("div");
        optionsDiv.classList.add("options");
        ["A", "B", "C", "D"].forEach((letter, i) => {
            const label = document.createElement("label");
            label.innerHTML = `<input type="radio" name="q${index}" value="${letter}" class="option-input"> ${q.options[i]}`;
            label.setAttribute("data-correct", letter === q.correct ? "true" : "false");
            optionsDiv.appendChild(label);
        });
        questionDiv.appendChild(optionsDiv);
        questionContainer.appendChild(questionDiv);
    });
    console.log(randomquestions);
}






    
function submitQuiz() {
    // console.log(questionbank.length);
    let score = 0;
    document.querySelectorAll(".options label").forEach(label => label.classList.remove("correct-answer", "wrong-answer"));
    randomquestions.forEach((q, index) => {
        const selected = document.querySelector(`input[name=q${index}]:checked`);
        const labels = document.querySelectorAll(`input[name=q${index}]`);
        if (selected) {
            const selectedLabel = selected.parentNode;
            if (selected.value === q.correct) {
                score++;
                selectedLabel.classList.add("correct-answer");
            } else {
                selectedLabel.classList.add("wrong-answer");
            }
        }
        labels.forEach(label => {
            if (label.value === q.correct) {
                label.parentNode.classList.add("correct-answer");
            }
        });
    });
    document.getElementById("result").innerText = `You scored ${score} out of ${randomquestions.length}`;
}
randombtn.addEventListener("click",randomgenerator);
submitbtn.addEventListener("click",submitQuiz);
