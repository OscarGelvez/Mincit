
$('#dptoContacto').click(function(e) {
  $scope.cargarComboDpto();
var cons= document.getElementById("dptoContacto").value;
for (var i = 0; i < $scope.dptosCombo.length; i++) {
  if($scope.dptosCombo[i].nombre==$scope.contactoEdit.departamento){
    $scope.id_dpto_seleccionado=$scope.dptosCombo[i].id;
    $scope.cargarComboCiudad();
  
  }
  

};



console.log($scope.contactoEdit.ciudad);

});

$('#dptoEmpresa').click(function(e) {
  $scope.cargarComboDpto();
var cons= document.getElementById("dptoEmpresa").value;
for (var i = 0; i < $scope.dptosCombo.length; i++) {
  if($scope.dptosCombo[i].nombre==$scope.EmpEdit.departamento){
    $scope.id_dpto_seleccionado=$scope.dptosCombo[i].id;
    $scope.cargarComboCiudad();
    
  
  }
  

};

});



function clone( obj ) {
  
    if ( obj === null || typeof obj  !== 'object' ) {
        return obj;
    }
 
    var temp = obj.constructor();
    for ( var key in obj ) {
        temp[ key ] = clone( obj[ key ] );
    }
  console.log(temp);
    return temp;
}



$scope.verMasEmpresa=function(index, tipo){
$scope.hayCambioLogo=false;

$scope.EmpEdit=clone($scope.empresas[index]);
$scope.EmpOriginal=clone($scope.empresas[index]);
$scope.EmpEdit.nit=parseInt($scope.EmpEdit.nit);
$scope.EmpOriginal.nit=parseInt($scope.EmpOriginal.nit);

// OJO AL COMPARAR CON EMP ORIGINAL NO SERA IGUAL PS EMPEDIT tiene campos en int y no en string
$scope.EmpEdit.no_consecutivo_form=parseInt($scope.EmpEdit.no_consecutivo_form);
$scope.EmpOriginal.no_consecutivo_form=parseInt($scope.EmpOriginal.no_consecutivo_form);


$scope.EmpEdit.no_emple_directo=parseInt($scope.EmpEdit.no_emple_directo);
$scope.EmpOriginal.no_emple_directo=parseInt($scope.EmpOriginal.no_emple_directo);



$scope.EmpEdit.no_emple_indirecto=parseInt($scope.EmpEdit.no_emple_indirecto);
$scope.EmpOriginal.no_emple_indirecto=parseInt($scope.EmpOriginal.no_emple_indirecto);


$scope.EmpEdit.no_emple_mt=parseInt($scope.EmpEdit.no_emple_mt);
$scope.EmpOriginal.no_emple_mt=parseInt($scope.EmpOriginal.no_emple_mt);


$scope.EmpEdit.no_emple_tc=parseInt($scope.EmpEdit.no_emple_tc);
$scope.EmpOriginal.no_emple_tc=parseInt($scope.EmpOriginal.no_emple_tc);


$scope.EmpEdit.telefonoC=parseInt($scope.EmpEdit.telefonoC);
$scope.EmpOriginal.telefonoC=parseInt($scope.EmpOriginal.telefonoC);


$scope.EmpEdit.telefonoF=parseInt($scope.EmpEdit.telefonoF);
$scope.EmpOriginal.telefonoF=parseInt($scope.EmpOriginal.telefonoF);


$scope.EmpEdit.contacto_cc=parseInt($scope.EmpEdit.contacto_cc);
$scope.EmpOriginal.contacto_cc=parseInt($scope.EmpOriginal.contacto_cc);


for (var i = 0; i < $scope.contactos.length; i++) {
 if($scope.contactos[i].cc_contacto==$scope.empresas[index].contacto_cc){
  $scope.contactoEdit=clone($scope.contactos[i]);
  $scope.contactoOriginal=clone($scope.contactos[i]);

console.log("contacto seleccionado")
console.log($scope.contactoEdit);
 $scope.contactoEdit.cc_contacto=parseInt($scope.contactoEdit.cc_contacto);
 $scope.contactoEdit.tel_cel=parseInt($scope.contactoEdit.tel_cel);
 $scope.contactoEdit.tel_fijo=parseInt($scope.contactoEdit.tel_fijo);

 $scope.contactoOriginal.cc_contacto=parseInt($scope.contactoOriginal.cc_contacto);
 $scope.contactoOriginal.tel_cel=parseInt($scope.contactoOriginal.tel_cel);
 $scope.contactoOriginal.tel_fijo=parseInt($scope.contactoOriginal.tel_fijo);

 }
console.log($scope.contactos[i].cc_contactoa );
};


if(tipo=="Emprendedora"){
  for (var i = 0; i < $scope.empresasE.length; i++) {
  
  if($scope.empresas[index].correo==$scope.empresasE[i].correo_emp){

    $scope.EmpEditEmprend=clone($scope.empresasE[i]);
    $scope.EmpOriginalEmprend=clone($scope.empresasE[i]);

    $scope.EmpEditEmprend.nit_empresa=parseInt($scope.EmpEditEmprend.nit_empresa);
    $scope.EmpEditEmprend.cod_ciiu=parseInt($scope.EmpEditEmprend.cod_ciiu);

    $scope.EmpOriginalEmprend.nit_empresa=parseInt($scope.EmpOriginalEmprend.nit_empresa);
    $scope.EmpOriginalEmprend.cod_ciiu=parseInt($scope.EmpOriginalEmprend.cod_ciiu);
console.log("info de Emprendedora");
    console.log($scope.EmpEditEmprend);
  }
};
}else if(tipo=="Turística"){
  for (var i = 0; i < $scope.empresasT.length; i++) {
  
  if($scope.empresas[index].correo==$scope.empresasT[i].correo_emp){

    $scope.EmpEditTuristica=clone($scope.empresasT[i]);
    $scope.EmpOriginalTuristica=clone($scope.empresasT[i]);
$scope.EmpEditTuristica.cc_extranj_opc=parseInt($scope.EmpEditTuristica.cc_extranj_opc);
$scope.EmpOriginalTuristica.cc_extranj_opc=parseInt($scope.EmpOriginalTuristica.cc_extranj_opc);
    

console.log("info de turistica");
console.log($scope.EmpEditTuristica);
  }
};
}




//$scope.EmpOriginal=clone($scope.empresas[index]);
console.log($scope.EmpEdit);
}
  $scope.textoBtn="Editar"
  $scope.esEditable=false;
$scope.hacerEditable=function(){

  if($scope.esEditable){
$scope.esEditable=false;
  $scope.textoBtn="Editar"
  }else{
    
    $scope.esEditable=true;
  $scope.textoBtn="Cancelar"
  }
  
}


$scope.updateEmpresaE=function(){
console.log("llego update1")
$scope.hayCambios=false;

if($scope.EmpEdit.clasif_cliente!=$scope.EmpOriginal.clasif_cliente){
  $scope.hayCambios=true;
}

if($scope.contactoEdit.cc_contacto!=$scope.contactoOriginal.cc_contacto){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.nombre_cont!=$scope.contactoOriginal.nombre_cont){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.apellido_cont!=$scope.contactoOriginal.apellido_cont){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.cargo_cont!= $scope.contactoOriginal.cargo_cont){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.fecha_ingreso_cargo!= $scope.contactoOriginal.fecha_ingreso_cargo){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.fecha_nacimiento!= $scope.contactoOriginal.fecha_nacimiento){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.lugar_nacimiento!= $scope.contactoOriginal.lugar_nacimiento){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.nivel_estudio!= $scope.contactoOriginal.nivel_estudio){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.direccion!= $scope.contactoOriginal.direccion){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.tel_fijo!= $scope.contactoOriginal.tel_fijo){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.tel_cel!= $scope.contactoOriginal.tel_cel){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.departamento!= $scope.contactoOriginal.departamento){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.ciudad!= $scope.contactoOriginal.ciudad){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.genero!= $scope.contactoOriginal.genero){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.correo!= $scope.contactoOriginal.correo){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.etnia!= $scope.contactoOriginal.etnia){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.desplazado!= $scope.contactoOriginal.desplazado){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.discapacidad!= $scope.contactoOriginal.discapacidad){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.nombre_empresa!=$scope.EmpOriginal.nombre_empresa){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.nit!=$scope.EmpOriginal.nit){
  $scope.hayCambios=true;
}

if($scope.EmpEdit.nombre_rep_legal!=$scope.EmpOriginal.nombre_rep_legal){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.tipo_constitucion!=$scope.EmpOriginal.tipo_constitucion){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.fecha_const_legal!=$scope.EmpOriginal.fecha_const_legal){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.no_emple_tc!=$scope.EmpOriginal.no_emple_tc){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.no_emple_mt!=$scope.EmpOriginal.no_emple_mt){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.no_emple_directo!=$scope.EmpOriginal.no_emple_directo){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.no_emple_indirecto!=$scope.EmpOriginal.no_emple_indirecto){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.direccion!=$scope.EmpOriginal.direccion){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.ciudad!=$scope.EmpOriginal.ciudad){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.departamento!=$scope.EmpOriginal.departamento){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.telefonoF!=$scope.EmpOriginal.telefonoF){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.telefonoC!=$scope.EmpOriginal.telefonoC){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.correo!=$scope.EmpOriginal.correo){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.url_sitio_web!=$scope.EmpOriginal.url_sitio_web){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.registro_mercantil!=$scope.EmpOriginal.registro_mercantil){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.numero_registro_mercantil!=$scope.EmpOriginal.numero_registro_mercantil){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.renov_mercantil!=$scope.EmpOriginal.renov_mercantil){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.servicios_ofrecidos!=$scope.EmpOriginal.servicios_ofrecidos){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.observaciones!=$scope.EmpOriginal.observaciones){
  $scope.hayCambios=true;
}
if($scope.EmpEditEmprend.tipo_activ_empresa!=$scope.EmpOriginalEmprend.tipo_activ_empresa){
  $scope.hayCambios=true;
}
if($scope.EmpEditEmprend.cod_ciiu!=$scope.EmpOriginalEmprend.cod_ciiu){
  $scope.hayCambios=true;
}
if($scope.EmpEditEmprend.activ_intern!=$scope.EmpOriginalEmprend.activ_intern){
  $scope.hayCambios=true;
}
if($scope.EmpEditEmprend.paises_comercializa!=$scope.EmpOriginalEmprend.paises_comercializa){
  $scope.hayCambios=true;
}
if($scope.EmpEditEmprend.negoc_internet!=$scope.EmpOriginalEmprend.negoc_internet){
  $scope.hayCambios=true;
}
if($scope.EmpEditEmprend.como_se_entero!=$scope.EmpOriginalEmprend.como_se_entero){
  $scope.hayCambios=true;
}


   $scope.subirLogo(); 

}



$scope.updateEmpresaE2=function(hayLogo){

if(!hayLogo){
  $scope.urlLogo=$scope.EmpEdit.url_logo;
}

//Para controlar que no vaya a cambiar su nit por otro de alguna empresa q ya existe y lo permita el sistema.
//Al mandar si, en php valido q no haya otra emp con ese nit. si mando no. en php no valido eso. 
  if($scope.EmpEdit.nit!=$scope.EmpOriginal.nit){
     $scope.modificoNit="si";
  }else{
     $scope.modificoNit="no"
  }

if($scope.hayCambios){
usSpinnerService.spin('spinner-1');
$http.post('Modelo/servicesMincit/Entidad/actualizarEmpresaE.php', {
          
clasificacion: $scope.EmpEdit.clasif_cliente,
cedula: $scope.contactoEdit.cc_contacto,
nombres: $scope.contactoEdit.nombre_cont,
apellidos: $scope.contactoEdit.apellido_cont,
cargo: $scope.contactoEdit.cargo_cont,
antiguedadCargo: $scope.contactoEdit.fecha_ingreso_cargo,
fechaNacimiento: $scope.contactoEdit.fecha_nacimiento,
lugarNacimiento: $scope.contactoEdit.lugar_nacimiento,
nivelEstudios: $scope.contactoEdit.nivel_estudio,
direccion: $scope.contactoEdit.direccion,
telefonoF: $scope.contactoEdit.tel_fijo,
telefonoC: $scope.contactoEdit.tel_cel,
departamento: $scope.contactoEdit.departamento,
ciudad: $scope.contactoEdit.ciudad,
genero: $scope.contactoEdit.genero,
 correo: $scope.contactoEdit.correo,
grupoEtnico: $scope.contactoEdit.etnia,
condicionDesplazamiento: $scope.contactoEdit.desplazado,
discapacidad: $scope.contactoEdit.discapacidad,

nombreE: $scope.EmpEdit.nombre_empresa,
nit: $scope.EmpEdit.nit,
nombreR: $scope.EmpEdit.nombre_rep_legal,
constitucion: $scope.EmpEdit.tipo_constitucion,
fechaC: $scope.EmpEdit.fecha_const_legal,
tc: $scope.EmpEdit.no_emple_tc,
mt: $scope.EmpEdit.no_emple_mt,
directos: $scope.EmpEdit.no_emple_directo,
indirectos: $scope.EmpEdit.no_emple_indirecto,
direccionEm: $scope.EmpEdit.direccion,
ciudadEm: $scope.EmpEdit.ciudad,
dptoEm: $scope.EmpEdit.departamento,
telefonoFijo: $scope.EmpEdit.telefonoF,
telefonoCelular: $scope.EmpEdit.telefonoC,
correoEm: $scope.EmpEdit.correo,
sitioWeb: $scope.EmpEdit.url_sitio_web,
registroM: $scope.EmpEdit.registro_mercantil,
numRegistro: $scope.EmpEdit.numero_registro_mercantil,
anoRenova: $scope.EmpEdit.renov_mercantil,
serviciosEmpre: $scope.EmpEdit.servicios_ofrecidos,
observaciones: $scope.EmpEdit.observaciones,
url_logo: $scope.urlLogo,

tipoEm: $scope.EmpEditEmprend.tipo_activ_empresa,
ciiu: $scope.EmpEditEmprend.cod_ciiu,
actividadI: $scope.EmpEditEmprend.activ_intern,
paisesCome: $scope.EmpEditEmprend.paises_comercializa,
negocio_internet: $scope.EmpEditEmprend.negoc_internet,
medioCde: $scope.EmpEditEmprend.como_se_entero,
modificoNit: $scope.modificoNit

                           
               
        }
    ).success(function (data) {
      usSpinnerService.stop('spinner-1');
      if(data==1){
          swal({
          title: 'Exito',
          text: "La empresa se modificó exitosamente",
          type: 'success',         
          confirmButtonColor: '#388E3C'          
          }).then(function() {
           
          location.reload();
        })
      
      }else{
        

        if(data==2){
        swal(
            'Error',
           'La empresa no fue modificada, Vuelva a intentarlo',
            'error'
           );
          }
       
     }
        console.log(data);    

    }).error(function(err){
      usSpinnerService.stop('spinner-1');
        console.log(err);

    }); 
} else{
  swal(
            'AVISO',
           'No se detectaron cambios en los datos.',
            'info'
           );
          }
}








$('#logo').bind('change', function() {
 $scope.tam=(this.files[0].size)/1000;
});

$('#logo').bind('change', function() {
$scope.aux=this.files[0].type;
$scope.tipo=$scope.aux.split("/");
  if($scope.tipo[1]=="jpeg"){
      $scope.tipo[1]="jpg";
    }
  console.log("tipo "+$scope.tipo[1]);
$scope.hayCambioLogo=true;
  
});
$scope.subirLogo=function(){

  if($scope.tam>100){
      swal({
          title: 'Error Peso Exedido',
          text: 'El peso de la imagen seleccionada supera los 100KB',
          type: 'warning',
         timer: 2000
        })  
        return false;     
    }else{
      
        var name = $scope.EmpEdit.nombre_empresa
        var file = $scope.file;
        
        upload.uploadFile(file, name).then(function(res)
        {
          console.log(res);
          if(res.data==1){
            console.log("es 1. salio bien");
            console.log("La ruta de la img es: "+name+"."+$scope.tipo[1])
            $scope.urlLogo=name+"."+$scope.tipo[1];
            $scope.updateEmpresaE2(true);
          }else{

            $scope.urlLogo="nologo.jpg";
            $scope.updateEmpresaE2(false);

            console.log("es 0. Algo salio mal o No desea subir logo");
          }

        })
     return true;
    }
    
}