<?php
//require 'PHPMailer/PHPMailerAutoload.php';

class enviarCorreo{


		function basico($mail){
			//$mail = new PHPMailer;

					//$mail->SMTPDebug = 3;                               // Enable verbose debug output

					$mail->isSMTP();                                      // Set mailer to use SMTP
					$mail->Host = 'smtp.gmail.com;smtp2.example.com';  // Specify main and backup SMTP servers
					$mail->SMTPAuth = true;                               // Enable SMTP authentication
					$mail->Username = 'oscarandresgs@ufps.edu.co';                 // SMTP username
					$mail->Password = 'migataesblanca';                           // SMTP password
					$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
					$mail->Port = 587;                                    // TCP port to connect to

		}			

		function enviarA($nombre,$correo,$mail){
			$this->basico($mail);

			

				$mail->setFrom('oscargelvez23@gmail.com', 'MinCIT Usuarios');
				$mail->addAddress($correo, $nombre);     // Add a recipient
				//$mail->addAddress('ellen@example.com');               // Name is optional
				$mail->addReplyTo('oscarandresgs@ufps.edu.co', 'Para mas información contactese a');
				//$mail->addCC('oscarandresgs@ufps.edu.co');
				//$mail->addBCC('oscarandresgs@ufps.edu.co');

				//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
				//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
				$mail->isHTML(true);                                  // Set email format to HTML

				$mail->Subject = 'Reestablecimiento de contraseña';
				$mail->Body    = '¿Olvidaste tu contraseña? No hay problema! Tu contraseña es '.$claveLista.'. Si no has 
				presionado restablecer contraseña alguien mas intento acceder... Te sugerimos que la cambies o la hagas  mas robusta.';
				//$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

				if(!$mail->send()) {
				    echo 0;// mensaje no fue enviado
				    //echo 'Mailer Error: ' . $mail->ErrorInfo;
				} else {
				    echo 1; // mensaje enviado correctamente
				}
		}

}
?>