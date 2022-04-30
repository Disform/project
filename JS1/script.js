"use strict";

const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
};
const answerFilmsName = prompt('Какой фильм вы смотрели последним?', '');
const answerFilmsGrade = promt('Сколько балов из 10 вы ему поставили бы?', '');
personalMovieDB.movies[answerFilmsName] = answerFilmsGrade;

console.log(!1 && 2 || !3 );

let result = '';

for (let i = 0; i < 4; i++) {
    result += '*';
    i++;
    console.log(result);
    for (let j = 0; j < 3; j++){
        result += '*';
        j++;
        console.log(result);
    }
}