 <?php
$file = $_FILES["file"]["name"];
//print_r("file es ".$file);
$extension = pathinfo($_FILES['file']["name"], PATHINFO_EXTENSION);
//print_r("extension ".$extension);
$nombre2 = "{$_POST['name']}.$extension";
  //  print_r("nombre2 ".$nombre2);
if(!is_dir("LogosEmpresas/"))
	mkdir("LogosEmpresas/", 0777);

if($file && move_uploaded_file($_FILES["file"]["tmp_name"], "LogosEmpresas/$nombre2"))
{
	echo 1;
}else{
	echo 0;
}

?>