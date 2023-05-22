(() => {
    'use strict';
    const t = document.querySelector('.button'),
        e = document.querySelector('.blue_block_items'),
        a = document.querySelectorAll('.blue_block_items_all'),
        d = document.querySelector('.main'),
        n = document.querySelector('.cards'),
        c = document.querySelector('.cards__btn'),
        o = document.querySelector('.cards__items'),
        r = document.getElementById('sec'),
        s = document.getElementById('min');
    let g;
    const u = document.querySelector('.popup--game'),
        i = document.querySelector('.popup_lost--game'),
        l = document.querySelector('.popup--failure'),
        m = document.querySelector('.popup__title--time'),
        p = document.querySelector('.popup__btn--game');
    let _,
        I,
        b = {},
        k = [];
    const j = [
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
    function f(t, e) {
        let a = j.slice(t, e),
            d = a.slice();
        return (k = a.concat(d)), k.shuffle(), k;
    }
    Array.prototype.shuffle = function () {
        for (let t = this.length - 1; t >= 0; t--) {
            let e = Math.floor(Math.random() * (t + 1)),
                a = this[e];
            (this[e] = this[t]), (this[t] = a);
        }
        return this;
    };
    const h = document.createDocumentFragment(),
        L = document.createElement('img');
    function y(t) {
        return (
            j.shuffle(),
            t.classList.remove('cards__item--turned'),
            a[1].classList.contains('form__active')
                ? (f(0, 6), S())
                : a[2].classList.contains('form__active')
                ? (f(0, 9), S())
                : (f(0, 3), S()),
            b
        );
    }
    h.appendChild(L), L.classList.add('cards__item');
    let v = function (t, e) {
            const a = document.createElement('img');
            return (
                (a.dataset.id = k[e].dataId),
                (a.dataset.bg = k[e].backgroundImage),
                (a.style.backgroundImage = b.shirt),
                (a.src = './img/shirt.jpg'),
                a
            );
        },
        S = function () {
            for (let t = 0; t < k.length; t++) {
                let e = v(k[t], t);
                (e.className = 'cards__item'),
                    k.length < 18 && (e.className = 'cards__item'),
                    k.length > 18 && (e.className = 'cards__item'),
                    o.appendChild(e);
            }
        };
    function C(t, e, a) {
        (t = Number(r.textContent)),
            (e = Number(s.textContent)),
            t++,
            a && ((t = 0), (e = 0)),
            t >= 60 && ((t = 0), e++),
            t < 10 && (t = '0' + t),
            e < 10 && (e = '0' + e),
            (r.textContent = t),
            (s.textContent = e);
    }
    o.addEventListener('click', function (t) {
        if (
            t.target.classList.contains('cards__item--turned') &&
            !t.target.classList.contains('cards__items')
        )
            (t.target.style.backgroundImage = b.shirt),
                t.target.classList.toggle('cards__item--turned'),
                (I = null),
                (_ = null);
        else if (!t.target.classList.contains('cards__items')) {
            t.target.classList.toggle('cards__item--turned'),
                setTimeout(function () {
                    t.target.style.backgroundImage =
                        "url('./img/" + t.target.getAttribute('data-bg') + "')";
                }, 300);
            const e = document.querySelectorAll('.cards__item');
            let a = 0;
            for (let d = 0; d < e.length; d++)
                if (
                    (e[d].classList.contains('cards__item--turned') && a++,
                    1 === a &&
                        e[d].classList.contains('cards__item--turned') &&
                        (I || (I = e[d].getAttribute('data-id')), _ || (_ = d)),
                    2 === a)
                ) {
                    t.target.getAttribute('data-id') === I
                        ? (clearInterval(g),
                          (m.textContent =
                              min.textContent + ' . ' + sec.textContent),
                          u.classList.contains('popup--show') ||
                              u.classList.add('popup--show'))
                        : (clearInterval(g),
                          (m.textContent =
                              min.textContent + ' . ' + sec.textContent),
                          i.classList.contains('popup--show') ||
                              i.classList.add('popup--show'));
                    break;
                }
        }
    }),
        e.addEventListener('click', function (t) {
            for (let t = 0; t < a.length; t++)
                a[t].classList.remove('form__active');
            t.target.classList.add('form__active'),
                e.classList.remove('form__active');
        }),
        t.addEventListener('click', function (t) {
            t.preventDefault(),
                a
                    ? ((d.style.display = 'none'),
                      (n.style.display = 'block'),
                      y(L),
                      (g = setInterval(C, 1e3)))
                    : l.classList.add('popup--show');
        });
    let q = function () {
        clearInterval(g),
            C(0, 0, 1),
            (n.style.display = 'none'),
            (d.style.display = 'block'),
            (o.innerHTML = ''),
            n.removeEventListener('click', q);
    };
    c.addEventListener('click', q),
        p.addEventListener('click', function () {
            u.classList.contains('popup--show')
                ? u.classList.remove('popup--show')
                : i.classList.contains('popup--show') &&
                  i.classList.remove('popup--show'),
                (o.innerHTML = ''),
                C(0, 0, 1),
                y(L),
                (g = setInterval(C, 1e3));
        });
})();
