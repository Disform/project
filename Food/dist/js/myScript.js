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

//закрытие при клике за пределами
modal.addEventListener('click', (e) => {
    //добавили в условие, чтоб срабатывало в случае если это === модал и цель имеет атрибут дата-клосе
    //и уточняем что он должен быть равен пустой строке
    if (e.target === modal || e.target.getAttribute('data-modal-close') == "") { 
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
const modalTimer = setTimeout(openModal, 3000000);

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
    constructor (src, alt, title, descr, price,parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 30;
        this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        
        
        render() {
            const element = document.createElement('div');
            // обращаемся к нашему массиву из классов, перебираем его и каждый индекс\кеи (классНейм) добавляем
            // в лист классов этого елемента. для того чтоб так делать классес должен быть массивом
            // и добавляем условие на случай если классов не передавали вообще
            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
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
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    14,
    ".menu .container"
).render();

new productCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    21,
    ".menu .container"
).render();
//#endregion

//#region  Реквесты и Формы Forms

//получаем все формы по тэгу form  она же <form></form>
const form = document.querySelectorAll('form');
const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    fail: 'Что-то пошло не так...'

};

//привязываем созданную ниже функцию пост дата к каждой из форм
form.forEach(item => {
    postData(item);
});

// закоментированный для FormData а расскоментированны будет для JSON
// создаём функцию отправки формы
// function postData(form) {
//     //ставим на форму лисенер который срабатывает при Подтверждении - обычно висит на кнопке рядом с полем
//     form.addEventListener('submit', (event) => {
//         event.preventDefault();
//         // отменяем базовое поведение

//         //для отображение пользователю статуса процедуры
//         // создаём статус ессадж и создаём новый див
//         const statusMessage = document.createElement('div');
//         // добавляем этому диву класс статус
//         statusMessage.classList.add('status');
//         //создаём ему текст контент и вставляем в него содержимое ключа loading в обьекте message
//         statusMessage.textContent = message.loading;
//         // указываем куда в DOM его надо поместить
//         form.append(statusMessage);

//         // создаём переменную реквест и записываем в неё новый XML запрос
//         const request = new XMLHttpRequest();
//         // открываем этот запрос - образно указываем что мы запрашиваем
//         // в данном случаем это POST, может быть GET
//         // Указываем куда мы посылаем этот запрос - наш сервер
//         request.open('POST', 'server.php');

//         //выставляем запросу заголовок, в котором мы говорим серверу о том, что именно будет к нему приходить
//         // в пером значении указываем что это какой-то контент
//         // во втором - какой способ передачи данных будет использован для передачи
//         //request.setRequestHeader('Content-type','multipart/form-data');
//          // если мы форм дата отправляем через XML реквест, то делать сетреквестхедер не надо он подставляется авто


//         // создаём переменную в которую помещаем FormData - это тип передачи данных который мы используем
//         const formData = new FormData(form); //для отправки через форм у тегов обязательно должен быть указан name

//         // отправляем наш обьет
//         request.send(formData);

//         // вызываем лисенер
//         //говорим что мы будем отслеживать 'load' тоесть конечную загрузку
//         request.addEventListener('load', () =>{
//             if (request.status === 200) {
//                 console.log(request.response);
//                 // обращаемся к текст контенту внутри статус меседжа, и передаём ему ключь из обьекта мессадж
//                 statusMessage.textContent = message.success;
                
//                 //очистка input после успешной отправки
//                 form.reset();
//                 //Удаление через время статуса лоадинг/ошибка/успех выводимого пользователю 
//                 setTimeout(() => {
//                     statusMessage.remove();
//                 }, 2000);
//             } else {
//                 statusMessage.textContent = message.fail;
//             }
//         });
//     });
// }
function postData(form) {
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        // добавляем реквест с форматом для jsona
        request.setRequestHeader('Content-type','application/json');
        const formData = new FormData(form);
        //форм дату нельзя просто перегнать в формат json
        // для этого понадобится такой приём
        //создаём обьект, берём форм дату, и перебираем его, устанавливая каждое из его велью, как ключь в нашем обьекте
        const obj = {};
        formData.forEach(function (value, key) {
            obj[key] = value;
        });
        //после чего создаём json и перерабатываем обьект в формат jsona
        const json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('load', () =>{
            if (request.status === 200) {
                console.log(request.response);
                showThanksModal(message.success);
                statusMessage.remove();
                form.reset();
            } else {
                showThanksModal(message.fail);
            }
        });
    });
}
    // вызов подального окна с благодартностью
    // создаём функцию в которую аргументом передаём мессаге из нашего обьекта
    function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    // добавляем ищначальному модалу класс hide
    prevModalDialog.classList.add('hide');
    //вызываем функцию опен модал
    openModal();
    // создаём непосредственно сам див нашего второго модельного окна
    const thanksModal = document.createElement('div');
    //добавляем ему класс аналогичный с первым модельным окном
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-modal-close>×</div>
            <div class="modal__title">${message}</div>
        </div> 
        `;

    //выгружаем его теперь на hmtl страницу, делаем это без переменной, так как не пларинуем реюз
    // выбираем в кого будет помещён наш код через селектор класса, дальше делаем аппенд и указываем наш код
    document.querySelector('.modal').append(thanksModal);
    // удаление нашей модалки через время
    setTimeout(() => {
        thanksModal.remove();
        // после чего меняем наш шоу на хайд у нашей модалки
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        //закрываем нашу модалку
        closeModal();
    }, 400000000);
    }












































//#endregion

















});