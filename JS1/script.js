"use strict";

const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
};

function rememberMyFilms() {
    for (let i = 0; i < 2; i++){
        const a = prompt('Какой фильм вы посмотрели последним?', ''),
              b = prompt('Какую оценку вы ему поставите?', '');
        if (a.length < 50 && a != '' && a != null && b != null && b != '') {
            personalMovieDB[a] = b;
            } else {
                i--;
            }
    }
}
rememberMyFilms();

function detectPersonalLevel() {
    if (personalMovieDB.count < 10) {
        console.log('мало посмотрел');
    } else if (personalMovieDB.count > 30) {
        console.log('вы киноман');
    } else if (personalMovieDB >= 10 && personalMovieDB <= 30) {
        console.log('обычный пользователь');
    } else {
        console.log('ошибка')
    }
}
detectPersonalLevel();


// здесь идёт проверка нашего privat на то true ли он. 
function showMyDB(hidden) {
    if (!hidden) {
    console.log(personalMovieDB);
    }
}
showMyDB(personalMovieDB.privat);


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
// personalMovieDB.genres[i - 1] = prompt(`Ваш любимый жанр под номером ${i}`);  минуя переменную а, но я я изначально подумал что нужна будет проверка
// а как сделать её без доп переменной я не в курсе.


