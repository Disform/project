<?php
//echo var_dump($_POST);
// это для просто получения пост запроссов в формате formData
//для работы с json надо другая конструкция.

//вот такая вот конструкция позволит работать уже с json
$_POST = json_decode(file_get_contents('php://input'), true);
echo var_dump($_POST);