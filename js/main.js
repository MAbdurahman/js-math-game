/* ============================================
            preloader
===============================================*/
$(window).on('load', function () {
    // makes sure that whole site is loaded
    $('#preloader-gif, #preloader').fadeOut(5000, function () {});
});

/*=============================================
         js-math-game scripts
================================================*/

$(function() {

    //**************** variables ****************//
    const game_page = document.getElementById('game-page');
    const score_page = document.getElementById('score-page');
    const splash_page = document.getElementById('splash-page');
    const countdown_page = document.getElementById('countdown-page');

    const start_form = document.getElementById('start-form');
    const radioButton_containers = document.querySelectorAll('.radio-container');
    const radioButton_inputs = document.querySelectorAll('input');
    const best_scores = document.querySelectorAll('.best-score-value');

    const countdown = document.querySelector('.countdown');
// Game Page
    const item_container = document.querySelector('.item-container');
// Score Page
    const final_time_el = document.querySelector('.final-time');
    const base_time_el = document.querySelector('.base-time');
    const penalty_time_el = document.querySelector('.penalty-time');
    const play_again_button = document.querySelector('.play-again');

// Equations
    let question_amount = 0;
    let equations_array = [];
    let player_guess_array = [];
    let best_score_array = [];

// Game Page
    let first_number = 0;
    let second_number = 0;
    let equation_object = {};
    const wrong_format = [];

// Time
    let timer;
    let time_played = 0;
    let base_time = 0
    let penalty_time = 0;
    let final_time = 0;
    let final_time_display = '0.0';

// Scroll
    let y_value = 0;


    //**************** functions ****************//



    /**
     * @description - get a random number of to a specified amount
     * @param max - the specified amount
     * @returns {number} - the random number
     */
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    /**
     * @description - create correct and incorrect random equations
     */
    function generateEquations() {
        // randomly choose the number of correct equations
        const correct_equations = getRandomInt(question_amount);
        console.log('correct equations:', correct_equations);
        // set the number of  wrong equations
        const wrong_equations = question_amount - correct_equations;
        console.log('wrong equations:', wrong_equations);
        // loop through correct equations, multiply random numbers up to 9, and push to array
        for (let i = 0; i < correct_equations; i++) {
            first_number = getRandomInt(9);
            second_number = getRandomInt(9);
            const equation_value = first_number * second_number;
            const equation = `${first_number} x ${second_number} = ${equation_value}`;
            equation_object = { value: equation, evaluated: 'true' };
            equations_array.push(equation_object);
        }

        // loop through wrong equation, alter the equation results, and push to array
        for (let i = 0; i < wrong_equations; i++) {
            first_number = getRandomInt(9);
            second_number = getRandomInt(9);
            const equation_value = first_number * second_number;
            wrong_format[0] = `${first_number} x ${second_number + 1} = ${equation_value}`;
            wrong_format[1] = `${first_number} x ${second_number} = ${equation_value - 1}`;
            wrong_format[2] = `${first_number + 1} x ${second_number} = ${equation_value}`;
            const format_choice = getRandomInt(2);
            const equation = wrong_format[format_choice];
            equation_object = { value: equation, evaluated: 'false' };
            equations_array.push(equation_object);
        }
        console.log('equations_array', equations_array)
        shuffle(equations_array);
        console.log('shuffled equations_array', equations_array)
    }

    /**
     * @description - adds and/or removes the selected-label class from the div that contain
     * the radio-container class in the index.html
     */
    function removeRadioButtonLabel() {
        radioButton_containers.forEach((radioButton) => {
            radioButton.classList.remove('selected-label');


            if (radioButton.children[1].checked) {
                radioButton.classList.add('selected-label');
            }
        });
    }
    /**
     * @description - gets the value from the selected radioButton
     * @returns {*} - returns a number value of the radioButton input value
     */
    function getRadioValue() {
        let radio_value;
        radioButton_inputs.forEach((radioButton_input) => {
            if (radioButton_input.checked) {
                radio_value = radioButton_input.value;
            }
        });
        return radio_value;
    }
    /**
     * @description - determines the amount of questions to generate
     * @param e - submit event of the start button
     */
    function selectQuestionAmount(e) {
        e.preventDefault();
        question_amount = getRadioValue();

        if (question_amount) {
            showCountdown();

        } else {
            swal('INVALID ENTRY!', 'Select A Number Of Questions To Be Answered.', 'error');
        }
    }
    /**
     * @description - displays the countdown page, and counts down
     */
    function countdownStart() {
        countdown.textContent = '3';
        setTimeout(() => {
            countdown.textContent = '2';
        }, 1000);
        setTimeout(() => {
            countdown.textContent = '1';
        }, 2000);
        setTimeout(() => {
            countdown.textContent = 'BEGIN!';
        }, 3000);
    }
    // Navigate from Splash Page to CountdownPage to Game Page
    function showCountdown() {
        countdown_page.hidden = false;
        splash_page.hidden = true;
        countdownStart();
        generateEquations();
        /*populateGamePage();
        setTimeout(showGamePage, 4000);*/
    }
    function playAgain() {
        console.log('play again!');
    }



    //**************** add event listeners ****************//
    start_form.addEventListener('click', removeRadioButtonLabel);
    start_form.addEventListener('submit', selectQuestionAmount);

})