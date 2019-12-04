'use strict';

let messages = {
        guess: 'Your number is',
        less: 'Less than ',
        equal: 'Equal ',
        more: 'More than ',
        win: 'Game is Over! Your Number is '
    },
    middleNum = 0,
    startNum = 0,
    endNum = 100,
    buttons = document.querySelector('.buttons'),
    text = document.querySelector('.text p'),
    startBtn = document.querySelector('.start'),
    gameBtns = document.querySelectorAll('.buttons button');

startBtn.addEventListener('click', startTheGame);
gameBtns.forEach((btn) => {
    btn.addEventListener('click', function() {
        generateRange(this);
    });
});


function startTheGame() {
    preloader();

    buttons.classList.add('active');
    startBtn.classList.add('hide');

    text.innerText = messages.guess;
    generateMiddleNumber(startNum, endNum);
}

function preloader() {
    let window = document.querySelector('.window');

    window.classList.add('loading');

    setTimeout(() => {
        window.classList.remove('loading');
    }, 800);
} 

function generateMiddleNumber(a, b) {
    middleNum = Math.round((a + b)/2);
    
    less.innerText = messages.less + middleNum;
    equal.innerText = messages.equal + middleNum;
    more.innerText = messages.more + middleNum;
}

function generateRange(item) {
    preloader();
    let lastMid = middleNum;

    if (diff() === 1) {
        winner(item.id === 'less' ? startNum : endNum);
        return;
    }

    switch (item.id) {
        case 'less':
            endNum = middleNum - 1;
            generateMiddleNumber(startNum, lastMid);

            diff() === 1 && more.remove();
            break;
        case 'equal':
            winner(middleNum);
            break;
        case 'more':
            startNum = middleNum + 1;
            generateMiddleNumber(lastMid, endNum);

            diff() === 1 && less.remove();
            break;
    }

    if (diff() === 0) {
        winner(middleNum);
    }
}

function diff() {
    return Math.abs(startNum - endNum);
}

function winner(num) {
    text.innerText = messages.win + num;
    buttons.classList.remove('active');
}