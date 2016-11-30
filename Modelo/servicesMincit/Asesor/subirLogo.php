 <?php
$file = $_FILES["file"]["name"];
//print_r("file es ".$file);
$extension = pathinfo($_FILES['file']["name"], PATHINFO_EXTENSION);
//print_r("extension ".$extension);
$nombre2 = "{$_POST['name']}.$extension";
if($extension!="jpg" && $extension!="JPG" && $extension!="png" && $extension!="PNG"){
	echo 2;
}else{

			  //  print_r("nombre2 ".$nombre2);
			if(!is_dir("../../../Vista/LogosEmpresas/"))
					mkdir("../../../Vista/LogosEmpresas/", 0777);

			if($file && move_uploaded_file($_FILES["file"]["tmp_name"], "../../../Vista/LogosEmpresas/$nombre2")){
				echo 1;
			}
			else{
				echo 0;
			}

}


?>