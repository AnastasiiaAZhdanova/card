import './style.css';

const button = document.querySelector<HTMLElement>('.button');
const formListLevel = document.querySelector<HTMLElement>('.blue_block_items');
const formItemLevel = document.querySelectorAll<HTMLElement>(
    '.blue_block_items_all'
);
const form = document.querySelector<HTMLElement>('.main');

const cards = document.querySelector<HTMLElement>('.cards');
const cardsBtn = document.querySelector<HTMLElement>('.cards__btn');
const cardsItems = document.querySelector<HTMLElement>('.cards__items');
const timeInSeconds = document.getElementById('sec');
const timeInMinutes = document.getElementById('min');
let countTime;

const popupGame = document.querySelector<HTMLElement>('.popup--game');
const popupLostGame = document.querySelector<HTMLElement>('.popup_lost--game');
const failure = document.querySelector<HTMLElement>('.popup--failure');
const popupTime = document.querySelector<HTMLElement>('.popup__title--time');
const popupBtnGame = document.querySelector<HTMLElement>('.popup__btn--game');

let firstTurnedCardIndex;
let firstTurnedCardId;

type Employee = {
    shirt?: string;
  };
let memoryObj: Employee = {};


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

// перемешивание
Array.prototype.shuffle = function <T>(this: T[]): T[]  {
    for (let i = this.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let itemAtIndex = this[randomIndex];
        this[randomIndex] = this[i];
        this[i] = itemAtIndex;
    }
    return this;
};

// рандомный массив
function randomMixArrays(start, end) {
    let arrCut = dataOfCards.slice(start, end);
    let arrCopy = arrCut.slice();
    type NewArrCardsRandomAndSelected = {
        dataId: number;
        backgroundImage: string;
    }[];
    let newArrCardsRandomAndSelected: NewArrCardsRandomAndSelected =
        arrCut.concat(arrCopy);

    newArrCardsRandomAndSelected.shuffle();
    return newArrCardsRandomAndSelected;
}

const fragment = document.createDocumentFragment();
const cardsItem = document.createElement('img');
fragment.appendChild(cardsItem);
cardsItem.classList.add('cards__item');

// начало игры
function init(obj) {
    dataOfCards.shuffle();

    obj.classList.remove('cards__item--turned');

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

// отрисовка карты
let renderCard = function (card, index) {
    const newCard = document.createElement('img');
    
    newCard.dataset.id = newArrCardsRandomAndSelected[index].dataId;
    newCard.dataset.bg = newArrCardsRandomAndSelected[index].backgroundImage;
    newCard.style.backgroundImage = memoryObj.shirt;
    newCard.src = './img/shirt.jpg';
    return newCard;
};

// добавление карт
let addCards = function () {
    for (let i = 0; i < newArrCardsRandomAndSelected.length; i++) {
        let elem = renderCard(newArrCardsRandomAndSelected[i], i);
        elem.className = 'cards__item';
        if (newArrCardsRandomAndSelected.length < 18) {
            elem.className = 'cards__item  cards__item--low-difficulty';
        }
        if (newArrCardsRandomAndSelected.length > 18) {
            elem.className = 'cards__item';
        }
        if (cardsItems) {
            cardsItems.appendChild(elem);
        }
    }
};

// таймер
function calcTime(sec, min, zeroing) {
    if (timeInSeconds) {
        sec = Number(timeInSeconds.textContent);
    }
    if (timeInMinutes) {
        min = Number(timeInMinutes.textContent);
    }
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
    if (timeInSeconds) {
        timeInSeconds.textContent = sec;
    }
    if (timeInMinutes) {
        timeInMinutes.textContent = min;
    }
}

// выход
function closeCardsField() {
    if (cards) {
        cards.style.display = 'none';
    }
    if (form) {
        form.style.display = 'block';
    }
    if (cardsItems) {
        cardsItems.innerHTML = '';
    }
}

// вывод поздравлений
function outputResult() {
    clearInterval(countTime); // остановка таймера
    if (popupTime) {
       popupTime.textContent = min.textContent + ' . ' + sec.textContent; // вывод результата таймера
    }
    if (popupGame) {
        if (!popupGame.classList.contains('popup--show')) {
            popupGame.classList.add('popup--show');
        }
    }
}

// вывод сожалений
function outputBedResult() {
    clearInterval(countTime);
    if (popupTime) {
        popupTime.textContent = min.textContent + ' . ' + sec.textContent;
    }
    if (popupLostGame) {
        if (!popupLostGame.classList.contains('popup--show')) {
            popupLostGame.classList.add('popup--show');
        }
    }
}

// поворот карты
if (cardsItems) {
    cardsItems.addEventListener('click', function (e) {
        const target = e.target as Element;
        if (target) {
            if (
                target.classList.contains('cards__item--turned') &&
                !target.classList.contains('cards__items')
            ) {
                target.style.backgroundImage = memoryObj.shirt;
                target.classList.toggle('cards__item--turned');
                firstTurnedCardId = null;
                firstTurnedCardIndex = null;
            } else if (!target.classList.contains('cards__items')) {
                target.classList.toggle('cards__item--turned');
                setTimeout(function () {
                    if (target) {
                        target.style.backgroundImage =
                            "url('./img/" +
                            target.getAttribute('data-bg') +
                            "')";
                    }
                }, 300);
                const arrOfCards = document.querySelectorAll('.cards__item');
                let count = 0;

                for (let i = 0; i < arrOfCards.length; i++) {
                    if (
                        arrOfCards[i].classList.contains('cards__item--turned')
                    ) {
                        count++;
                    }
                    if (
                        count == 1 &&
                        arrOfCards[i].classList.contains('cards__item--turned')
                    ) {
                        if (!firstTurnedCardId) {
                            firstTurnedCardId =
                                arrOfCards[i].getAttribute('data-id');
                        }
                        if (!firstTurnedCardIndex) {
                            firstTurnedCardIndex = i;
                        }
                    }
                    if (count == 2) {
                        if (
                            target.getAttribute('data-id') ==
                            firstTurnedCardId
                        ) {
                            outputResult();
                        } else {
                            outputBedResult();
                        }
                        break;
                    }
                }
            }
        }
    });
}

if (formListLevel) {
    formListLevel.addEventListener('click', function (e) {
        const target = e.target as Element;
        for (let i = 0; i < formItemLevel.length; i++) {
            formItemLevel[i].classList.remove('form__active');
        }
        if (target) {
            target.classList.add('form__active');
        }
        formListLevel.classList.remove('form__active');
    });
}

// вход в игру
if (button) {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        if (formItemLevel) {
            if (form) {
                form.style.display = 'none';
            }
            if (cards) {
                cards.style.display = 'block';
            }
            init(cardsItem);
            countTime = setInterval(calcTime, 1000);
        } else {
            if (failure) {
                failure.classList.add('popup--show');
            }
        }
    });
}

// досрочный выход
let cardsBtnClickHandler = function () {
    clearInterval(countTime);
    calcTime(0, 0, 1);
    closeCardsField();
    if (cards) {
        cards.removeEventListener('click', cardsBtnClickHandler);
    }
};

if (cardsBtn) {
    cardsBtn.addEventListener('click', cardsBtnClickHandler);
}

// новая игра
if (popupBtnGame) {
    popupBtnGame.addEventListener('click', function (event) {
        if (popupGame) {
            if (popupGame.classList.contains('popup--show')) {
                popupGame.classList.remove('popup--show');
            } 
        }
        if(popupLostGame){
            if (popupLostGame.classList.contains('popup--show')) {
                popupLostGame.classList.remove('popup--show');
            }
        }
        if (cardsItems) {
            cardsItems.innerHTML = '';
        }
        calcTime(0, 0, 1);
        init(cardsItem);
        countTime = setInterval(calcTime, 1000);
    });
}
