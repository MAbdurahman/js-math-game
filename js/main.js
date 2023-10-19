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
        console.log('question amount:', question_amount);
        if (question_amount) {
            /*showCountdown();*/
            console.log('start countdown...');
        } else {
            swal('INVALID ENTRY!', 'Select A Number Of Questions To Be Answered.', 'error');
        }
    }
    function playAgain() {
        console.log('play again!');
    }



    //**************** add event listeners ****************//
    start_form.addEventListener('click', removeRadioButtonLabel);
    start_form.addEventListener('submit', selectQuestionAmount);

})