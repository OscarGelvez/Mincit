var app=angular.module('mincit.controllersAdmin',['angularSpinner']);


//Controller inicio

app.run([ "CONFIG", "$http", function(CONFIG, $http)
{

  var sesion;
function verificar(){

  $http.get('servicesMincit/verificaSession.php')
            .success(function(data) {
              console.log(data);
                    sesion=data;
                    if(data=="ad"){
                       CONFIG.ROL_CURRENT_USER= 1;
                       
                        }
                                   
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });



}
verificar();

}])

app.controller('controllerInicio_Admin', ['$scope', 'usSpinnerService', '$http', 'cerrarSesion', function($scope, usSpinnerService, $http, cerrarSesion){


 	$scope.mostrarEmpre=function(){
    usSpinnerService.spin('spinner-1');

		$http.get("servicesMincit/listarEmpresas.php")
		.success(function(data){
   usSpinnerService.stop('spinner-1');
			console.log(data)
			
			
			$scope.data=data
		})
	}
   
	$scope.mostrarEmpre();


  $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }
	
}])


app.controller('controllerRegistrarEntidad_Admin', ['$scope','$http', 'usSpinnerService', 'cerrarSesion', function($scope, $http, usSpinnerService, cerrarSesion){

$scope.registrarEntidad=function(){
usSpinnerService.spin('spinner-1');
$http.post('servicesMincit/php', {
            nombre: $scope.nombreEntidad,
            correo: $scope.correoEntidad,
            descrip: $scope.descripEntidad,
            telefono: $scope.telefonoEntidad,
            direccion: $scope.direccionEntidad,
            nit: $scope.nitEntidad
          
               
        }
    ).success(function (data) {
      usSpinnerService.stop('spinner-1');
     
        console.log(data);
    

    }).error(function(err){
        console.log(err);

    }); 


}




 $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }

}])

app.controller('controllerVerEntidad_Admin', ['$scope', 'cerrarSesion', function($scope, cerrarSesion){

$scope.guardoModal=function(){
  swal(
  'Datos guardados!',
  'Sus datos se guardaron correctamente',
  'success'
)
}


$scope.eliminar=function(){
swal({
  title: '¿Eliminar Entidad?',
  text: "Esta seguro de eliminar esta entidad",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, eliminar',
  cancelButtonText:'Cancelar'
}).then(function() {
  swal(
    'Eliminada',
    'Entidad eliminada de la base de datos',
    'success'
  );
})
}

 $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }

}])

app.controller('controllerServicios_Admin',['$scope', 'cerrarSesion', function($scope, cerrarSesion){

$scope.guardoModal2=function(){
  swal(
  'Datos guardados!',
  'Sus datos se guardaron correctamente',
  'success'
)
}


$scope.eliminar=function(){
swal({
  title: '¿Eliminar Entidad?',
  text: "Esta seguro de eliminar esta entidad",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, eliminar',
  cancelButtonText:'Cancelar'
}).then(function() {
  swal(
    'Eliminada',
    'Entidad eliminada de la base de datos',
    'success'
  );
})
}

 $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }
}])

app.controller('controllerLogros_Admin', ['$scope', 'cerrarSesion', function($scope, cerrarSesion){


$scope.editar=function(){
	
}


$scope.eliminar=function(){
swal({
  title: '¿Esta seguro de eliminar este logro?',
  text: "Si elimina este logro las empresas que lo hayan obtenido lo perderan",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, eliminar',
  cancelButtonText:'Cancelar'
}).then(function() {
  swal(
    'Eliminado',
    'Logro eliminado de la base de datos',
    'success'
  );
})
}


 $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }
}])


app.controller('controllerConfiguraciones_Admin', ['$scope', 'cerrarSesion', function($scope, cerrarSesion){

 $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }
  }])

