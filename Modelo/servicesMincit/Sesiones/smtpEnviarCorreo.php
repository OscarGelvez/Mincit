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

		function enviarA($nombre,$correo,$clave,$mail){
			$this->basico($mail);

			

				$mail->setFrom('oscarandresgs@ufps.edu.co', 'MinCIT Usuarios');
				$mail->addAddress($correo, $nombre);     // Add a recipient
				//$mail->addAddress('ellen@example.com');               // Name is optional
				$mail->addReplyTo('oscarandresgs@ufps.edu.co', 'Para mas información contactese a');
				//$mail->addCC('oscarandresgs@ufps.edu.co');
				//$mail->addBCC('oscarandresgs@ufps.edu.co');

				$mail->addAttachment('banner2Comp.png');     // Add attachments
				//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
				$mail->isHTML(true);                                  // Set email format to HTML

				$mail->Subject = 'Bienvenido a la plataforma de MinCIT';
				$mail->Body    = 'De parte del equipo de trabajo de MinCIT te damos la bienvenida a nuestra plataforma.
				 Tu usuario de acceso es: '.$nombre.' y tu Contraseña es: '.$clave.' No olvides seguirnos en nuestras redes
				 sociales'.'<div class="footer-left">
      

        <p class="footer-company-name">Ministerio de Comercio, industria y turismo 2016</p>
        <div class="footer-icons">

          <a href="http://www.facebook.com/pages/Ministerio-de-Comercio-Industria-y-Turismo/144621955578773" target="_blank"><i class="fa fa-facebook"></i></a>
          <a href="https://twitter.com/MincomercioCo" target="_blank"><i class="fa fa-twitter"></i></a>
          <a href="http://www.youtube.com/mincomerciocolombia" target="_blank"><i class="fa fa-youtube-play"></i></a>
          <a href="https://www.flickr.com/photos/mincit/" target="_blank"><i class="fa fa-flickr"></i></a>

        </div>
      </div>

      <div class="footer-center">

        <div>
          <i class="fa fa-map-marker"></i>
          <p><span>Av. 0A # 21-14 Barrio Blanco</span> Cúcuta, Colombia</p>
        </div>

        <div>
          <i class="fa fa-phone" ></i>
          <p>(7) 5716190 - 5717985 Ext. 6609</p>
        </div>

        <div>
          <i class="fa fa-envelope"></i>
          <p>jperezo@mincit.gov.co</p>
        </div>

      </div>

      <div class="footer-right">

        <p class="footer-company-about">
          <span>Acerca de MICITio</span>
          MiCITio Cúcuta se encuentra operando desde el 07 de Octubre de 2015. Desde su apertura se ha atendido a 134 usuarios entre empresarios, emprendedores y ciudadanos.
        </p>

      </div>';
				//$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

				if(!$mail->send()) {
				    //echo 0;// mensaje no fue enviado
				    //echo 'Mailer Error: ' . $mail->ErrorInfo;
				} else {
				    //echo 1; // mensaje enviado correctamente
				}
		}

}
?>