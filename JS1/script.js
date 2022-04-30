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