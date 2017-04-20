let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here

    // #08
    if (answer.value == '' || attempt.value == '') {
        setHiddenFields();
    }

    // #11
    if (validateInput(input.value) === false) {
        return false;
    }

    // #14
    if (getResults(input.value)) {
        setMessage("You win! :)");
        showAnswer(true);
        showReplay();
        answer.value = '';
        attempt.value = '';
    } else if (attempt.value >= 10) {
        // #15
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
        answer.value = '';
        attempt.value = '';
    } else {
        // #16
        setMessage("Incorrect, try again.");
        attempt.value++;
    }
}

//implement new functions here

// #05
function setHiddenFields() {
    answer.value = "" + Math.floor(Math.random() * 9999);

    // #06
    while (answer.value.length < 4) {
        answer = '0' + answer;
    }
    // #07
    attempt.value = 1;
}

// #09
function setMessage(msg) {
    document.getElementById("message").innerHTML = msg;
}

// #10
function validateInput(text) {
    if (text.toString().length === 4) {
        return true;
    }
    setMessage("Guesses must be exactly 4 characters long.");
    return false;
}

// #12
function getResults(guess) {
    let div = "<div class='row'><span class='col-md-6'>";
    let result = '';
    let correct = '<span class="glyphicon glyphicon-ok"></span>';
    let kinda = '<span class="glyphicon glyphicon-transfer"></span>';
    let incorrect = '<span class="glyphicon glyphicon-remove"></span>';
    let charResult = '';
    let numCorrect = 0;

    for (let i = 0; i < guess.length; i++) {
        charResult = '';
        for (let j = 0; j < answer.value.length; j++) {
            if (i === j && guess.charAt(i) === answer.value.charAt(j)) {
                charResult = correct;
                numCorrect += 1;
                break;
            } else if (guess.charAt(i) === answer.value.charAt(j)) {
                if (guess.charAt(i) === answer.value.charAt(j)) {
                    charResult = kinda;
                    break;
                }
            }
            else if (j === answer.value.length-1 && charResult.length === 0) {
                charResult = incorrect;
            }

        }
        result = result + charResult;
    }

    div = div + result + "</span></div>";
    document.getElementById("results").innerHTML = div;

    // #13
    return numCorrect === 4;
}

// #17
function showAnswer(win) {
    document.getElementById("code").innerHTML = answer.value;
    if(win) {
        document.getElementById("code").className = document.getElementById("code").className + " success";
    } else {
        document.getElementById("code").className = document.getElementById("code").className + " failure";
    }
}

// #18
function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}