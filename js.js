const BlueBlockItemsOne = document.querySelector('.blue_block_items_one');
const BlueBlockItemsTwo = document.querySelector('.blue_block_items_two');
const BlueBlockItemsThree = document.querySelector('.blue_block_items_three');
const button = document.querySelector('.button');
const formListLevel = document.querySelector('.blue_block_items');
const formItemLevel = document.querySelectorAll('.blue_block_items_all');
const form = document.querySelector('.main');

const cards = document.querySelector('.cards');
const cardsBtn = document.querySelector('.cards__btn');
const cardsItems = document.querySelector('.cards__items');
const timeInSeconds = document.getElementById('sec');
const timeInMinutes = document.getElementById('min');
let countTime;

let memoryObj = {};

function randomMixArrays(start, end) {
    let arrCut = dataOfCards.slice(start, end);
    let arrCopy = arrCut.slice();
    newArrCardsRandomAndSelected = arrCut.concat(arrCopy);
    newArrCardsRandomAndSelected.shuffle();
    return newArrCardsRandomAndSelected;
}

const fragment = document.createDocumentFragment();
const cardsItem = document.createElement('img');
fragment.appendChild(cardsItem);
cardsItem.classList.add('cards__item');

function init(obj) {
    dataOfCards.shuffle();

    if (formItemLevel[1].classList.contains('form__active')) {
        randomMixArrays(0, 6);
        addCards();
    } else if (formItemLevel[2].classList.contains('form__active')) {
        randomMixArrays();
        addCards();
    } else {
        randomMixArrays(0, 3);
        addCards();
    }
    return memoryObj;
}

function calcTime(sec, min, zeroing) {
    sec = Number(timeInSeconds.textContent);
    min = Number(timeInMinutes.textContent);
    sec++;
    if (zeroing) {
        sec = 0;
        min = 0;
    }
    if (sec >= 60) {
        sec = 0;
        min++;
    }
    if (sec < 10) {
        sec = '0' + sec;
    }
    if (min < 10) {
        min = '0' + min;
    }
    timeInSeconds.textContent = sec;
    timeInMinutes.textContent = min;
}

formListLevel.addEventListener('click', function (e) {
    for (let i = 0; i < formItemLevel.length; i++) {
        formItemLevel[i].classList.remove('form__active');
    }
    e.target.classList.add('form__active');
    formListLevel.classList.remove('form__active');
});

button.addEventListener('click', function (event) {
    event.preventDefault();
    if (formItemLevel) {
        form.style.display = 'none';
        cards.style.display = 'block';
        init(cardsItem);
        countTime = setInterval(calcTime, 1000);
    } else {
        failure.classList.add('popup--show');
    }
});
