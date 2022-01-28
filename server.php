<?php
$_POST = json_decode(file_get_contents("php://input"), true); // декодируем все из JSON что бы на PHP коде получить json формат
echo var_dump($_POST);  