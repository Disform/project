'use strict';
document.addEventListener('DOMContentLoaded', () => {
// в файле есть примеры:
// создания переключения внутри страницы по кнопкам табам
// создание Часов, отсчёта времени и тд.

//#region  TABS

const tabs = document.querySelectorAll('.tabheader__item');
const tabsContent = document.querySelectorAll('.tabcontent');
const tabsParent = document.querySelector('.tabheader__items');

function hideTabContent() {
    
    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    });
}

//  // i = 0 для того, чтоб если значение не передано, то дефолт значение = 0
function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent();

//создаём таргет, для того чтоб потом легче переиспользовать вместо event.target
tabsParent.addEventListener('click', function(event) {
    const target = event.target;
    if(target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if (target == item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});
//#endregion

//#region CLOCK
//здесь содержится пример создания таймера, осчёта.
//так же из того что может пригодиться в часах подстановка 0 перед часом если значение часа <10

const deadLine = '2022-05-11';

function getTimeRemaining (endtime) {
    // Парсим дату, переделывая из формата строки в привычный для даты формат
    //создаём наовую дату СЕЙЧАС через new Date()
    const t = Date.parse(endtime) - Date.parse(new Date());
    // используем Math.floor() для округления часов
    // Мы берём нашу переменную t и делим на 1000 милисекунд (одна секунда) умноженную на секунд в минуте
    // умноженную на количество минут в часе, а потом умноженную на количество часов в дне
    const days = Math.floor(t / (1000 * 60 * 60 * 24)); 
    // По тому же принципу что и первое, только высчитываем остаток при делении на 24 часа
    // дабы наша цифра часов не была больше чем часов в сутках.
    const hours = Math.floor(t / (1000 * 60 * 60) % 24);
    // по аналогии к часам
    const minutes = Math.floor ((t / 1000 / 60) % 60 );
    const seconds = Math.floor (t / 1000) % 60;
    // Возвращаем обьект с данными по каждойму значению
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes' : minutes,
        'seconds' : seconds,
    };
}

function getZero(num) {
    if (num >= 1 && num < 10) {
        return `0${num}`;
    } else if ( num < 0 ){
        return `00`;
    } else {
        return num;
    }
}

function setClock (selector , endtime) {
    const timer =  document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval =  setInterval(updateClock, 1000);

    updateClock();

// пишем обновление времени для часов, но вызываем его чуть раньше, чтоб обновился до начала сет интервала в сет клок
    function updateClock() {
        const t =  getTimeRemaining(endtime);
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }

}
setClock('.timer', deadLine);
//#endregion

//#region MODAL
//здесь операциии с модальным окном
//его вызов, закрытие, блокировка скрола когда модальное окно открыто
// Закрытие модельного окна при клике за его пределами
// Появление его со временем
// Появление его при проскроливании в самый низ страницы

const modalTrigger = document.querySelectorAll('[data-modal]');
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('[data-modal-close]');

//открытие
function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    // это блокировка возможности скрола во воремя вызванного модального окна
    document.body.style.overflow = 'hidden';
    //доработка если пользователь сам открыл а не запустилось функцией, то убираем интервал
    clearInterval(modalTimer);
}

//обработчик события открытия
modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
});

//закрытие
function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    //оставить решение после закрытие на попечение браузера
    document.body.style.overflow = '';
}

// обработчик для вызова закрытия
modalCloseBtn.addEventListener('click', closeModal);
// тоже самое что и код сверху, но длиннее
//modalCloseBtn.addEventListener('click', function() {
//    closeModal();
//});

//закрытие при клике за пределами
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

//отлавливание клика клавиши ESC
// через документ вешаем лисенер, на действие keydown и далее сравниваем код нажатой клавиши c их event.code keybord
//и проверка на то есть ли активный класс show у модала, дабы не активировать лишний раз лисенер когда шоу закрыт
document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

// появление модельного окна со временем
// ставим сет таймаут и задаём задержку до использования, переиспользуем имеющийся опенМодал
const modalTimer = setTimeout(openModal, 3000);

// появление модельного окна после скрола в самый низ к футеру
// делаем через функцию, чтобы потом можно было использовать ремув евент лисенер на ней
function showModalByScroll () {
    // мы берём уже прокрученную часть + ту часть которую видит пользователь и сравниваем с всей высотой документа
    //таким образом если они совпадают, то юзер просмотрел уже всю страницу и находится в её конце 
    // иногда в конце условия надо добавлять -1   так как пиксели могут некоректно считываться
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight ) {
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
    
}

window.addEventListener('scroll', showModalByScroll);
//#endregion

//#region  cards (Классы)


class productCard {
    constructor (src, alt, title, descr, price,parentSelector) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 30;
        this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        
        
        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
    }
}
// const div = new productWindow();
// div.render(selector, imgNode, altNode, titleNode, textNode, price);
// можно сделать короче но это позволит использовать его только на месте
new productCard(
    "img/tabs/elite.jpg", 
    "Vega", 
    'Меню "фитнес"', 
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
    11,
    ".menu .container",
    ).render();

new productCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    14,
    ".menu .container"
).render();

new productCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    21,
    ".menu .container"
).render().addClass();


























//#endregion

















});