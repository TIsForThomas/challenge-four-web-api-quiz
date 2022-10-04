
var questions = [
    {question: "What is 5*10", answers:["55","30","50","15"], correctAnswerIndex:2},
    {question: "What is 19-7", answers:["18","14","12","6"], correctAnswerIndex:2},
    {question: "What is 30-28", answers:["23","9","5","2"], correctAnswerIndex:3},
    {question: "What is 60/3", answers:["5","13","78","20"], correctAnswerIndex:3}
  ]
  var state = 0
  var score = 0
  var timeLeft = 60
  $("#timer").css("display","none")
  $("#correction").css("display","none")
  
  var timeInterval
  
  function countdown(timeLeft) {
  
    if(timeInterval != null){
      clearInterval(timeInterval)
    } 
    timeInterval = setInterval(function() {
      if (timeLeft > 1) {
        $("#countdown").text(timeLeft)
        timeLeft--;
      } else if (timeLeft === 1) {
        $("#countdown").text(timeLeft)
        timeLeft--;
      } else {
        $("#countdown").text(0)
        $("#quiz").css("display","none")
        $("#initials").css("display","flex")
        $("#score").text(score)
        clearInterval(timeInterval);
      }
    }, 1000);
    } 
  
  function updateState(){
    state++
    $("#state").text(state)
  }
  
  function generateQuestion(){
    if(state > questions.length){
        $("#question").empty()
        $("#question").css("display","none")
        $("#initials").css("display","flex")
        $("#score").text(score)
        clearInterval(timeInterval)
    } else {
        $("#question").empty()
        $("#question").css("display","flex")
        $("#question").text(questions[state-1].question)
    }
  }
  
  function generateAnswers(){
    if(state > questions.length){
        $("#answers").empty()
        $("#answers").css("display","none")
    } else {
        $("#answers").empty()
        $("#answers").css("display","flex")
        for(var i=0;i<questions[state-1].answers.length;i++){
          var answer = questions[state-1].answers[i]
          $("#answers").append(`<button class="col-12 btn btn-outline-primary" id=${state}-${i}><li>${answer}</li></button>`)
        }
    }
  }
  

  function startQuiz(){
    $("#start-menu").css("display","none")
    $("#quiz").css("display","flex")
    $("#timer").css("display","block")
    $("#viewHighScores").css("display","none")
    countdown(timeLeft);
    updateState()
    generateQuestion();
    generateAnswers();
  }
  
  function nextQuestion(){
    updateState()
    generateQuestion()
    generateAnswers()
  }
  
  function checkAnswerAndNext() {
    $("#answers").on("click", "button", function() {
       var answerID = $(this).attr("id")
       if(answerID == state + "-" + questions[state-1].correctAnswerIndex){
            score++ 
            nextQuestion()
           $("#correction").css("display","flex")
           $("#correction").text("Previous question was correct").css("color","green")
       } else {
            var newTimeLeft = $("#countdown").text()
            countdown(newTimeLeft)
            nextQuestion()
            $("#correction").css("display","flex")
            $("#correction").text("Previous question was incorrect").css("color","red")
       }
    })
  }
  
  

  $("#start").click(function(){startQuiz()})
  

  
  
  $("#goBack").click(function(){
    state = 0
    score = 0
    timeLeft = 60
    $("#start-menu").css("display","flex")
    $("#state").text(state)
    $("#quiz").css("display","none")
     $("#correction").css("display","none")

  })

  
  checkAnswerAndNext()