/* ============================================
            preloader
===============================================*/
$(window).on('load', function () {
    // makes sure that whole site is loaded
    $('#preloader-gif, #preloader').fadeOut(5000, function () {
    });
});

/*=============================================
         js-math-game scripts
================================================*/

$(function () {

    //**************** variables ****************//
    const game_page = document.getElementById('game-page');
    const score_page = document.getElementById('score-page');
    const splash_page = document.getElementById('splash-page');
    const countdown_page = document.getElementById('countdown-page');

    const start_form = document.getElementById('start-form');
    const radioButton_containers = document.querySelectorAll('.radio-container');
    const radioButton_inputs = document.querySelectorAll('input');
    const best_scores = document.querySelectorAll('.best-score-value');

    const right_button = document.getElementById('right-button');
    const wrong_button = document.getElementById('wrong-button');

    const countdown = document.querySelector('.countdown');
// Game Page
    const item_container = document.querySelector('.item-container');
// Score Page
    const final_time_el = document.querySelector('.final-time');
    const base_time_el = document.querySelector('.base-time');
    const penalty_time_el = document.querySelector('.penalty-time');
    /*    const play_again_button = document.querySelector('.play-again');*/


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

    //stops timer, processes results, and goes to score page
    function checkTime() {
        console.log('checkTime() called');

        console.log('question_amount ', question_amount);
        console.log('player_guess_array ', player_guess_array);
        if (player_guess_array.length == question_amount) {

            console.log('player_guess_array', player_guess_array);

            console.log('time played: ', time_played);
            clearInterval(timer);
            // Check for wrong guess, add penaltyTime
            equations_array.forEach((equation, index) => {
                let is_correct = equation.evaluated === player_guess_array[index];
                is_correct ? penalty_time += 0.0 : penalty_time += 0.5;
            });
            final_time = time_played + penalty_time;
            console.log('time played: ', time_played, '\npenalty time: ', penalty_time, '\nfinal time: ', final_time);
/*            scoresToDOM();*/

        }
    }

    //adds a tenth of second to time played
    function addTime() {
        time_played += 0.1;
        checkTime();
    }

    //starts time when game page is clicked
    function startTimer() {
        time_played = 0;
        penalty_time = 0;
        final_time = 0;
        timer = setInterval(addTime, 100);
        game_page.removeEventListener('click', startTimer);
    }

    /**
     * @description - scrolls and stores player's answer in player_guess_array
     * @param e - the e.target.value of the right or wrong button
     * @returns {number} - returns player_guess_array with player's selected answer
     */
    function selectedAnswer(e) {
        let selectedAnswer = e.target.value;
        y_value += 80;
        item_container.scroll(0, y_value);

        return player_guess_array.push(selectedAnswer);
    }

    /**
     * @description - displays the game_page
     */
    function displayGamePage() {
        game_page.hidden = false;
        countdown_page.hidden = true;
    }

    /**
     * @description - get a random number of to a specified amount
     * @param max - the specified amount
     * @returns {number} - the random number
     */
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    /**
     * @description - create correct and incorrect random equations; and then shuffles
     * them
     */
    function generateEquations() {
        // randomly choose the number of correct equations
        const correct_equations = getRandomInt(question_amount);

        // set the number of  wrong equations
        const wrong_equations = question_amount - correct_equations;

        // loops through correct equations, multiply random numbers up to 9, and push to array
        for (let i = 0; i < correct_equations; i++) {
            first_number = getRandomInt(9);
            second_number = getRandomInt(9);
            const equation_value = first_number * second_number;
            const equation = `${first_number} x ${second_number} = ${equation_value}`;
            equation_object = {value: equation, evaluated: 'true'};
            equations_array.push(equation_object);
        }

        // loops through wrong equation, alter the equation results, and push to array
        for (let i = 0; i < wrong_equations; i++) {
            first_number = getRandomInt(9) + 1;
            second_number = getRandomInt(9) + 1;
            const equation_value = first_number * second_number;
            wrong_format[0] = `${first_number} x ${second_number + 1} = ${equation_value}`;
            wrong_format[1] = `${first_number} x ${second_number} = ${equation_value - 1}`;
            wrong_format[2] = `${first_number + 1} x ${second_number} = ${equation_value}`;
            const format_choice = getRandomInt(2);
            const equation = wrong_format[format_choice];
            equation_object = {value: equation, evaluated: 'false'};
            equations_array.push(equation_object);
        }
        shuffle(equations_array);
    }

    /**
     * @description - creates element, add item class, add equation text, and append to the
     * div with the item-container class
     */
    function addEquationsToDOM() {
        equations_array.forEach((equation) => {

            const item = document.createElement('div');
            item.classList.add('item');

            const equation_text = document.createElement('h1');
            equation_text.classList.add('item-equation');
            equation_text.textContent = equation.value;

            item.appendChild(equation_text);
            item_container.appendChild(item);
        });
    }

    /**
     * @description - dynamically adds correct and incorrect equations to game_page
     */
    function populateGamePage() {
        // Reset DOM, Set Blank Space Above
        item_container.textContent = '';
        // Spacer
        const topSpacer = document.createElement('div');
        topSpacer.classList.add('height-240');
        // Selected Item
        const selectedItem = document.createElement('div');
        selectedItem.classList.add('selected-item');
        // Append
        item_container.append(topSpacer, selectedItem);

        // Create Equations, Build Elements in DOM
        generateEquations();
        addEquationsToDOM();

        // Set Blank Space Below
        const bottomSpacer = document.createElement('div');
        bottomSpacer.classList.add('height-500');
        item_container.appendChild(bottomSpacer);
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

    /**
     * @description - navigates from spash_page to countdown_page to game_page
     */
    function showCountdown() {
        countdown_page.hidden = false;
        splash_page.hidden = true;
        countdownStart();
        populateGamePage();
        setTimeout(displayGamePage, 4000);
    }


    function playAgain() {
        console.log('play again!');
    }

    //**************** add event listeners ****************//
    start_form.addEventListener('click', removeRadioButtonLabel);
    start_form.addEventListener('submit', selectQuestionAmount);

    right_button.addEventListener('click', selectedAnswer);
    wrong_button.addEventListener('click', selectedAnswer);

    game_page.addEventListener('click', startTimer);


})