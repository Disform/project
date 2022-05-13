"use strict";
let numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start : () => {
        personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
        while (personalMovieDB.count !== '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
            personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
        }
    },
    rememberMyFilms :() => {
        for (let i = 0; i < 2; i++){
            const a = prompt('Какой фильм вы посмотрели последним?', ''),
                  b = prompt('Какую оценку вы ему поставите?', '');
            if (a.length < 50 && a != '' && a != null && b != null && b != '') {
                personalMovieDB[a] = b;
                } else {
                    i--;
                }
        }
    },
    showMyDB : (hidden) => {
        if (!hidden) {
        console.log(personalMovieDB);
        }
    },
    toggleVisibleMyDB: () => {
        if (personalMovieDB.privat) {
            personalMovieDB.privat = true;
        } else { 
            personalMovieDB.privat = false;
        }
    },
    writeYourGenres : () => {
        for (let i = 1; i <= 3; i++){
            let checkList = prompt(`Ваш любимый жанр под номером ${i}`); 
            if (checkList == '' || checkList == null || checkList == undefined){
                console.log('Вы ввели неверное значение или не ввели вовсе');
                i--;
            } else {
                personalMovieDB.genres[i - 1] = checkList;
            }
            personalMovieDB.genres.forEach((item, i) => {
                console.log(`Люимый жанр № ${i + 1} - это ${item}`);
            });
        }
    },


}; 

const toggleVisibleMyDB = Object.create(personalMovieDB.privat()) {

}


}


function detectPersonalLevel() {
    if (personalMovieDB.count < 10) {
        console.log('мало посмотрел');
    } else if (personalMovieDB.count > 30) {
        console.log('вы киноман');
    } else if (personalMovieDB >= 10 && personalMovieDB <= 30) {
        console.log('обычный пользователь');
    } else {
        console.log('ошибка');
    }
}
detectPersonalLevel();


// здесь идёт проверка нашего privat на то true ли он. 


function writeYourGenres(){
    for (let i = 1; i <= 3; i++){
        const a = prompt(`Ваш любимый жанр под номером ${i}`);
        if (a !== null && a !== undefined){
            personalMovieDB.genres[i - 1] = a;
        } else {
            i--;
        }
    }
}
// можно было сделать через 
// personalMovieDB.genres[i - 1] = prompt(`Ваш любимый жанр под номером ${i}`);  минуя переменную а
//но я изначально подумал что нужна будет проверка но не понял как её сделать без переменной.
// а как сделать её без доп переменной я не в курсе.



let a = 'fhajf' + 0;
console.log(typeof(+a));