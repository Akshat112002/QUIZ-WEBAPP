const container=document.querySelector('.container');
const questionBox=document.querySelector('.questions');
const choicesBox=document.querySelector('.choices');
const nextBtn=document.querySelector('.nextBtn');
const scoreCard=document.querySelector('.scoreCard');
const alert=document.querySelector('.alert');
const startBtn=document.querySelector('.startBtn');
const timer=document.querySelector('.timer');


// make array of question and ans
const quiz=[
    {
        question:"Q.Which of the following is not a css box model property?",
        choices:["margin","padding","border-radius","border-collapse"],
        answer:"border-collapse"
    },

    {
        question:"Q.Setting an inline-block in CSS requires which of the following properties?",
        choices:["display","color","block","none"],
        answer:"display"
    },

    {
        question:"Q.How are custom fonts defined using CSS?",
        choices:["font-face rule","custom font cannot be decided","src tags","none"],
        answer:"font-face rule"
    },

    {
        question:"Q.Which of the following are parts of the CSS box model?",
        choices:["margin","border","padding","All of above"],
        answer:"All of above"
    },
];


let currentQuestionIndex=0;
let score=0;
let quizOver=false;
let timeLeft=15;
let timerID=null;
const showQuestion = ()=>{
    const questionDetails=quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;
    
    choicesBox.textContent="";
    for(let i=0;i<questionDetails.choices.length;i++){
        const currentChoice=questionDetails.choices[i];
        const choiceDiv=document.createElement('div');
        choiceDiv.textContent=currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', ()=>{
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected');
            }
            else{
                choiceDiv.classList.add('selected');
            }
        });
    }
    if(currentQuestionIndex<quiz.length){
        startTimer();
    }
}

//function to check answer
const checkAnswer=()=>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(selectedChoice.textContent=== quiz[currentQuestionIndex].answer){
        // alert("CORRECT ANSWER!!");
        displayAlert("CORRECT ANSWER");
        score++;
    }
    else{
        // alert("WRONG ANSWER!!");
        displayAlert(`WRONG ANSWER !! ${quiz[currentQuestionIndex].answer} is the correct Answer`);
    }
    timeLeft=15;
    currentQuestionIndex++;
    if(currentQuestionIndex<quiz.length){
        showQuestion();
    }
    else {
        showScore();
        stopTimer();
        quizOver=true;  
        timer.style.display="none"; 
    }
}


// function to show score
const showScore=()=>{
    questionBox.textContent="";
    choicesBox.textContent="";
    scoreCard.textContent=`You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You Have Completed This Quiz!!")
    nextBtn.textContent="Play Again";
}

const displayAlert=(msg)=>{
   alert.style.display="block";
   alert.textContent=msg;
   setTimeout(()=>{
    alert.style.display="none";
   },1500);
}

const startTimer = ()=>{
    clearInterval(timerID);
    timer.textContent=timeLeft;

    const countDown =()=>{
        timeLeft--;
        timer.textContent=timeLeft;
        if(timeLeft===0){
            const confirmUser=confirm("Time Up !!! Do You want to play again");
            if(confirmUser){
                timeLeft=15;
                startQuiz();
            }
            else{
                startBtn.style.display="block";
                container.style.display="none";
                return ;
            }
        }
    }
   timerID= setInterval(countDown,1000);
}
const stopTimer =()=>{
    clearInterval(timerID);
}
const startQuiz =()=>{
    timeLeft=15;
    timer.style.display="flex";
    showQuestion();
}
startBtn.addEventListener('click', ()=>{
    startBtn.style.display="none";
    container.style.display="block";
    startQuiz();
})

//showQuestion();
nextBtn.addEventListener('click',()=>{
    const selectedChoice=document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent==="NEXT"){
        // alert("Selected Your Choice");
        displayAlert("Selected Your Choice");
    }
    if(quizOver){
        nextBtn.textContent="NEXT";
        scoreCard.textContent="";
        currentQuestionIndex=0;
        quizOver=false;
        score=0;  
        startQuiz();    
    }
    else{
        checkAnswer();
    }
});

