const questions = [
    {
        question: "Where do the band ABBA originally come from?",
        answers: [
            {text: "Denmark", correct: false},
            {text: "Sweden", correct: true},
            {text: "Norway", correct: false},
            {text: "Finland", correct: false},
        ]
    },
    {
        question: "Who is the frontman for the band 'Metallica'?",
        answers: [
            {text: "Lars Ulrich", correct: false},
            {text: "James Hetfield", correct: true},
            {text: "Robert Trujillo", correct: false},
            {text: "Kirk Hammett", correct: false},
        ]
    },
    {
        question: "In what year did Dua Lipa win her first Grammy?",
        answers: [
            {text: "2016", correct: false},
            {text: "2017", correct: false},
            {text: "2018", correct: false},
            {text: "2019", correct: true},
        ]
    },
    {
        question: "How many members are in the band 'Red Hot Chilli Peppers",
        answers: [
            {text: "3", correct: false},
            {text: "4", correct: true},
            {text: "5", correct: false},
            {text: "6", correct: false},
        ]
    },
    {
        question: "Who was the lead singer of 'No Doubt'?",
        answers: [
            {text: "Gwen Stefani", correct: true},
            {text: "Christina Aguilera", correct: false},
            {text: "Debbie Harry", correct: false},
            {text: "Emma Bunton", correct: false},
        ]
    },
    {
        question: "Which of these are NOT a song by Green Day?",
        answers: [
            {text: "When I Come Around", correct: false},
            {text: "American Idiot", correct: false},
            {text: "All The Small Things", correct: true},
            {text: "Holiday", correct: false},
        ]
    },
    {
        question: "What year did Elvis Presley die?",
        answers: [
            {text: "1975", correct: false},
            {text: "1977", correct: true},
            {text: "1979", correct: false},
            {text: "1981", correct: false},
        ]
    },
    {
        question: "In which country was Pitbull born?",
        answers: [
            {text: "Cuba", correct: false},
            {text: "Colombia", correct: false},
            {text: "Venezuela", correct: false},
            {text: "United States", correct: true},
        ]
    },
    {
        question: "Which of these songs was Outkast's first hit?",
        answers: [
            {text: "Player's Ball", correct: true},
            {text: "So Fresh, So Clean", correct: false},
            {text: "Ms Jackson", correct: false},
            {text: "Hey Ya!", correct: false},
        ]
    },
    {
        question: "Which song is playing in the background of the famous Cadbury's advert featuring a Gorilla playing a drum solo?",
        answers: [
            {text: "I Don't Want to Miss a Thing - Aerosmith", correct: false},
            {text: "Livin' on a Prayer - Bon Jovi", correct: false},
            {text: "In The Air Tonight - Phil Collins", correct: true},
            {text: "Paranoid - Black Sabbath", correct: false},
        ]
    },
    {
        question: "Which song by Lady Gaga wasn't originally broadcast on certain radio stations due to the Radio Edit not actually being clean?",
        answers: [
            {text: "Poker Face", correct: true},
            {text: "Bad Romance", correct: false},
            {text: "Bloody Mary", correct: false},
            {text: "Telephone", correct: false},
        ]
    },
    {
        question: "How many studio albums have been released by the band Fall Out Boy?",
        answers: [
            {text: "5", correct: false},
            {text: "6", correct: false},
            {text: "7", correct: false},
            {text: "8", correct: true},
        ]
    },
    {
        question: "Which of these is not an album by Adele?",
        answers: [
            {text: "19", correct: false},
            {text: "22", correct: true},
            {text: "25", correct: false},
            {text: "30", correct: false},
        ]
    },
    {
        question: "Which of these Katy Perry singles did NOT reach number 1 on the UK charts?",
        answers: [
            {text: "Firework", correct: true},
            {text: "I Kissed A Girl", correct: false},
            {text: "California Gurls", correct: false},
            {text: "Part of Me", correct: false},
        ]
    },
    {
        question: "What is the best selling Christmas song of all time?",
        answers: [
            {text: "Last Christmas - Wham!", correct: false},
            {text: "All I Want For Christmas is You - Mariah Carey", correct: false},
            {text: "White Christmas - Bing Crosby", correct: true},
            {text: "The Fairytale of New York - The Pogues & Kirsty MacColl", correct: false},
        ]
    }

];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-question");

let currentQuestionIndex = 0;
let score = 0;

function letsPlay(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("option");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect){
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        letsPlay();
    }
});

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You got ${score} out of ${questions.length} right. Congrats!`;
    nextButton.innerHTML = "Play Again?";
    nextButton.style.display = "block";
}

letsPlay();