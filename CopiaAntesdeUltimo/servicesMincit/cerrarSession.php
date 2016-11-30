<?php
// Inicializar la sesión.
// Si está usando session_name("algo"), ¡no lo olvide ahora!
session_start();

// Destruir todas las variables de sesión.
$_SESSION = array();



// Finalmente, destruir la sesión.
session_destroy();
echo "sesion cerrada";
?>