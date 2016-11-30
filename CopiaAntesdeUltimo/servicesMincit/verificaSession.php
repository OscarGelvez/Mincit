<?php
session_start(); //Iniciamos o Continuamos la sesion
if (isset($_SESSION['SI'])) //Si llego un Nickname via el formulario lo grabamos en la Sesion
{
	echo $_SESSION['SI'][0];
}else{
	echo "false";
}

?>