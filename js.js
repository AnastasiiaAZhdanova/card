import './style.css';

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

const popupGame = document.querySelector('.popup--game');
const popupLostGame = document.querySelector('.popup_lost--game');
const failure = document.querySelector('.popup--failure');
const popupTime = document.querySelector('.popup__title--time');
const popupBtnGame = document.querySelector('.popup__btn--game');

let firstTurnedCardIndex;
let firstTurnedCardId;

let memoryObj = {};

let newArrCardsRandomAndSelected = [];
const dataOfCards = [
    { dataId: 1, backgroundImage: '6_Club.jpg' },
    { dataId: 2, backgroundImage: '6_Diamond.jpg' },
    { dataId: 3, backgroundImage: '6_Heart.jpg' },
    { dataId: 4, backgroundImage: '6_Spade.jpg' },
    { dataId: 5, backgroundImage: '7__Spade.jpg' },
    { dataId: 6, backgroundImage: '7_Club.jpg' },
    { dataId: 7, backgroundImage: '7_Diamond.jpg' },
    { dataId: 8, backgroundImage: '7_Heart.jpg' },
    { dataId: 9, backgroundImage: '8_Club.jpg' },
    { dataId: 10, backgroundImage: '8_Diamond.jpg' },
    { dataId: 11, backgroundImage: '8_Heart.jpg' },
    { dataId: 12, backgroundImage: '8_Spade.jpg' },
    { dataId: 13, backgroundImage: '9_Club.jpg' },
    { dataId: 14, backgroundImage: '9_Diamond.jpg' },
    { dataId: 15, backgroundImage: '9_Heart.jpg' },
    { dataId: 16, backgroundImage: '9_Spade.jpg' },
    { dataId: 17, backgroundImage: '10_Club.jpg' },
    { dataId: 18, backgroundImage: '10_Diamond.jpg' },
    { dataId: 19, backgroundImage: '10_Heart.jpg' },
    { dataId: 20, backgroundImage: '10_Spade.jpg' },
    { dataId: 21, backgroundImage: 'A_Club.jpg' },
    { dataId: 22, backgroundImage: 'A_Diamond.jpg' },
    { dataId: 23, backgroundImage: 'A_Heart.jpg' },
    { dataId: 24, backgroundImage: 'A_Spade.jpg' },
    { dataId: 25, backgroundImage: 'J_Club.jpg' },
    { dataId: 26, backgroundImage: 'J_Diamond.jpg' },
    { dataId: 27, backgroundImage: 'J_Heart.jpg' },
    { dataId: 28, backgroundImage: 'J_Spade.jpg' },
    { dataId: 29, backgroundImage: 'K_Club.jpg' },
    { dataId: 30, backgroundImage: 'K_Diamond.jpg' },
    { dataId: 31, backgroundImage: 'K_Heart.jpg' },
    { dataId: 32, backgroundImage: 'K_Spade.jpg' },
    { dataId: 33, backgroundImage: 'Q_Club.jpg' },
    { dataId: 34, backgroundImage: 'Q_Diamond.jpg' },
    { dataId: 35, backgroundImage: 'Q_Heart.jpg' },
    { dataId: 36, backgroundImage: 'Q_Spade.jpg' },
];

Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let itemAtIndex = this[randomIndex];
        this[randomIndex] = this[i];
        this[i] = itemAtIndex;
    }
    return this;
};

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

function init() {
    dataOfCards.shuffle();

    if (formItemLevel[1].classList.contains('form__active')) {
        randomMixArrays(0, 6);
        addCards();
    } else if (formItemLevel[2].classList.contains('form__active')) {
        randomMixArrays(0, 9);
        addCards();
    } else {
        randomMixArrays(0, 3);
        addCards();
    }
    return memoryObj;
}

let renderCard = function (card, index) {
    const newCard = document.createElement('img');
    newCard.dataset.id = newArrCardsRandomAndSelected[index].dataId;
    newCard.dataset.bg = newArrCardsRandomAndSelected[index].backgroundImage;
    newCard.style.backgroundImage = memoryObj.shirt;
    newCard.src = './static/img/shirt.jpg';
    return newCard;
};

let addCards = function () {
    for (let i = 0; i < newArrCardsRandomAndSelected.length; i++) {
        let elem = renderCard(newArrCardsRandomAndSelected[i], i);
        elem.className = 'cards__item';
        if (newArrCardsRandomAndSelected.length < 18) {
            elem.className = 'cards__item';
        }
        if (newArrCardsRandomAndSelected.length > 18) {
            elem.className = 'cards__item';
        }
        cardsItems.appendChild(elem);
    }
    const shirts = document.querySelectorAll('.cards__item');
    shirts.forEach((el) => {
        el.setAttribute('src', `static/img/${el.getAttribute('data-bg')}`);
    });
    setTimeout(() => {
        shirts.forEach((el) => {
            el.setAttribute('src', `static/img/shirt.jpg`);
        });
        countTime = setInterval(calcTime, 1000);
    }, 5000);
};

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

function closeCardsField() {
    cards.style.display = 'none';
    form.style.display = 'flex';
    cardsItems.innerHTML = '';
}

function outputResult() {
    clearInterval(countTime);
    popupTime.textContent = min.textContent + ' . ' + sec.textContent;
    if (!popupGame.classList.contains('popup--show')) {
        popupGame.classList.add('popup--show');
    }
}

function outputBedResult() {
    clearInterval(countTime);
    popupTime.textContent = min.textContent + ' . ' + sec.textContent;
    if (!popupLostGame.classList.contains('popup--show')) {
        popupLostGame.classList.add('popup--show');
    }
}

cardsItems.addEventListener('click', function (e) {
    if (
        e.target.classList.contains('cards__item--turned') &&
        !e.target.classList.contains('cards__items')
    ) {
        e.target.style.backgroundImage = memoryObj.shirt;
        e.target.classList.toggle('cards__item--turned');
        firstTurnedCardId = null;
        firstTurnedCardIndex = null;
    } else if (!e.target.classList.contains('cards__items')) {
        e.target.classList.toggle('cards__item--turned');
        setTimeout(function () {
            e.target.setAttribute(
                'src',
                `static/img/${e.target.getAttribute('data-bg')}`
            );
        }, 300);
        const arrOfCards = document.querySelectorAll('.cards__item');
        let count = 0;

        for (let i = 0; i < arrOfCards.length; i++) {
            if (arrOfCards[i].classList.contains('cards__item--turned')) {
                count++;
            }
            if (
                count === 1 &&
                arrOfCards[i].classList.contains('cards__item--turned')
            ) {
                if (!firstTurnedCardId) {
                    firstTurnedCardId = arrOfCards[i].getAttribute('data-id');
                }
                if (!firstTurnedCardIndex) {
                    firstTurnedCardIndex = i;
                }
            }
            if (count === 2) {
                if (e.target.getAttribute('data-id') === firstTurnedCardId) {
                    setTimeout(function () {
                        e.target.style.visibility = 'hidden';
                        e.target.classList.remove('cards__item--turned');
                        e.target.classList.remove('cards__item');
                        arrOfCards[firstTurnedCardIndex].style.visibility =
                            'hidden';
                        arrOfCards[firstTurnedCardIndex].classList.remove(
                            'cards__item--turned'
                        );
                        arrOfCards[firstTurnedCardIndex].classList.remove(
                            'cards__item'
                        );
                        firstTurnedCardId = null;
                        firstTurnedCardIndex = null;
                    }, 500);
                    if (arrOfCards.length < 4) {
                        setTimeout(function () {
                            outputResult();
                        }, 700);
                    }
                } else {
                    outputBedResult();
                }
                break;
            }
        }
    }
});

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

let cardsBtnClickHandler = function () {
    clearInterval(countTime);
    calcTime(0, 0, 1);
    closeCardsField();
    cards.removeEventListener('click', cardsBtnClickHandler);
    if (popupGame.classList.contains('popup--show')) {
        popupGame.classList.remove('popup--show');
    } else if (popupLostGame.classList.contains('popup--show')) {
        popupLostGame.classList.remove('popup--show');
    }
};

cardsBtn.addEventListener('click', cardsBtnClickHandler);

popupBtnGame.addEventListener('click', function () {
    if (popupGame.classList.contains('popup--show')) {
        popupGame.classList.remove('popup--show');
    } else if (popupLostGame.classList.contains('popup--show')) {
        popupLostGame.classList.remove('popup--show');
    }
    cardsItems.innerHTML = '';
    calcTime(0, 0, 1);
    init(cardsItem);
    countTime = setInterval(calcTime, 1000);
});
