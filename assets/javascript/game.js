
var panel = $("#quiz-area");
var countStartNumber = 15;

$(document).on("click", "#start-over", function(e) {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function() {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">15</span> Seconds</h2>');
  game.loadQuestion();
});


var questions = [{
  question: "In 1999 which artist had a hit with Genie In A Bottle?",
  answers: ["Britney Spears", "Natalia Imbrulia", "Christina Aguilera", "Lisa Loeb"],
  correctAnswer: "Christina Aguilera",
}, {
  question: "Which American dance group sang the song Groove Is In The Heart?",
  answers: ["LaBouche", "Dee-Lite", "All Saints", "Backstreet Boys"],
  correctAnswer: "Dee-Lite",
}, {
  question: "Which actress starred in the movie Pretty Woman?",
  answers: ["Julia Roberts", "Meg Ryan", "Meryl Streep", "Cher"],
  correctAnswer: "Julia Roberts",
}, {
  question: "Which group released the hit song Lovefool?",
  answers: ["Pixies", "Backstreet Boys", "Candlebox", "The Cardigans"],
  correctAnswer: "The Cardigans",
}, {
  question: "Which 90's film had a character in it named The Dude?",
  answers: ["The Big Lebowski", "Heat", "My Private Idaho", "Fight Club"],
  correctAnswer: "The Big Lebowski",
}, {
  question: "Who wrote Sinead O'Connor's #1 hit 'Nothing Compares 2 U'" ,
  answers: ["Coolio", "Eddie Vedder", "Prince", "Rob Thomas"],
  correctAnswer: "Prince",
}, {
  question: "Who directed the film 'Reservoir Dogs?",
  answers: ["Spielberg", "Tarantino", "Lucas", "Coppola"],
  correctAnswer: "Tarantino",
}, {
  question: "The hit song 'Iris' by the Goo Goo Dolls is from what 90's movie?",
  answers: ["Silence of the Lambs", "Goodfellas", "The Piano", "City of Angels"],
  correctAnswer: "City of Angels",
}];

var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>Here are your results!!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>No</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
