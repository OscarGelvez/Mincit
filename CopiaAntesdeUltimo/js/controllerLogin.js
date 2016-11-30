var app=angular.module('mincit.controllersLogin',[]);

app.constant('CONFIG', {
 TEMPLATE_DIR:"",
 
})

app.controller('loginCtrl', ['$scope', '$http', 'usSpinnerService', 'CONFIG', '$location', function($scope, $http, usSpinnerService, CONFIG, $location){


$scope.iniciar=function(){
	 usSpinnerService.spin('spinner-1');
	$http.post('servicesMincit/login.php', {
            usuario: $scope.user,
            clave: $scope.pass  
          
               
        }
    ).success(function (data) {
      console.log(data);
      usSpinnerService.stop('spinner-1');
      if(data==0){
      	swal({
 				 title: 'Error',
 				 text: 'Usuario o contraseña incorrecta', 
 				 type: 'error',
  				  timer: 2000
		})
      }

      else{
      
      if(data==-1){
        swal({
         title: 'Imposible Acceder',
         text: 'Ya ha iniciado sesión previamente. Cierre esa sesión e intente nuevamente.', 
         type: 'info',
            timer: 2000
    })
      }
        else{
          console.log(data.privilegio);
          if(data.privilegio=="ad"){ 

                   CONFIG.ROL_CURRENT_USER= 1;
                   $location.path("/Admin_inicio");

              }else if(data.privilegio=="as"){
            
                         CONFIG.ROL_CURRENT_USER= 2;
                         $location.path("/Asesor_inicio");

            }else if(data.privilegio=="en"){
              
                        CONFIG.ROL_CURRENT_USER= 3;
            }
         }


      }
        
    

    }).error(function(err){
    	 usSpinnerService.stop('spinner-1');
        console.log(err);

    });
}



	$scope.irAdmin=function(){
		window.location.href='#Admin_inicio';
	}

			$scope.irAsesor=function(){
		window.location.href='#Asesor_inicio';
	}
	

		$scope.irRecuperar=function(){
			window.location.href='#recuperar_clave';
		}


		$scope.irInicio=function(){
			window.location.href='#inicio';
		}
}])
