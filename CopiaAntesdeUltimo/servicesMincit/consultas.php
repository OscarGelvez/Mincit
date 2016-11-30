<?php 
class Consultas{ 
    // database connection and table name 
    private $conn; 
     
 
    // object properties 
    public $id; 
    public $user; 
    public $password; 
    public $valProdBuscado;
    public $codBar;
    public $idProd;
    public $idTienda;
    public $idPro;
    public $idTien;
    public $CantP;
    public $fecha;
    public $formaPago;
    public $idEmpleadoF;
    public $idFact;
    public $subt;
    public $idPT;
   // public $idP; // id para consultar la cantidad de un producto en todas las tiendas
   
    
    // constructor with $db as database connection 
    public function __construct($db){ 
        $this->conn = $db;
    }

    // create product
function login(){
     
     $table_name = "empleado";
    // query to insert record
    $query ="SELECT e.nombre as nombreEmp, e.idTienda, t.nombre, t.direccion, t.telefono, t.impuesto, e.idEmpleado FROM empleado e, tienda t WHERE e.email=:user AND e.contrasenia=:password AND e.idTienda=t.idTienda;";
   // $query = "INSERT INTO " . $this->table_name . " SET nombre_user=:user, clave_user=:password";
     //print_r($query);

    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // posted values
    $this->user=htmlspecialchars(strip_tags($this->user));
    $this->password=htmlspecialchars(strip_tags($this->password));
   
 
    // bind values
   $stmt->bindParam(":user", $this->user);
    $stmt->bindParam(":password", $this->password);


  
    $cont = 0;
    $user2 = "";
    // execute query
    $stmt->execute();
  
     while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $cont++;
            $user2 = $row;             
        }
    if($cont==1){  
            
            return $user2;

        }
        else{
            print_r("false");

            return false;
        }    
    
}



// read products
function findProduct(){

 $table_name = "producto"; //ojo aqui es productotienda
    // select all query
    $query = "SELECT 
                * 
            FROM 
                " . $table_name . "
            WHERE nombreProducto LIKE ?  OR descripcionCorta LIKE  ? ;";
             // aqui solo busca coincidencias en nombre y descrip corta asi q ps se quiere mas agrego mas
             //print_r($query);

    $var1=$this->valProdBuscado;

    $params = array("%$var1%", "%$var1%");
                        
     // prepare query statement
    $stmt = $this->conn->prepare($query);
   $this->valProdBuscado=htmlspecialchars(strip_tags($this->valProdBuscado));
    // bind values
   //$stmt->bindParam("valProdBuscado", $this->valProdBuscado);
    // execute query
    $stmt->execute($params);
     return $stmt;
}

/**
 * Funcion que permite realizar busqueda de productos por codigos de barras
 */
function findProduct2(){

 $table_name = "producto"; //ojo aqui es productotienda
    // select all query
    $query = "SELECT 
                * 
            FROM 
                " . $table_name . "
            WHERE codigoBarras=:codBar ;";
             // aqui solo busca coincidencias en nombre y descrip corta asi q ps se quiere mas agrego mas
             //print_r($query);
                
     // prepare query statement
    $stmt = $this->conn->prepare($query);
   $this->codBar=htmlspecialchars(strip_tags($this->codBar));
 
    // bind values
   $stmt->bindParam(":codBar", $this->codBar);
   
    $stmt->execute();
     return $stmt;
}

function findProductTodo(){
    $table_name = "producto"; 
    // select all query
    $query = "SELECT 
                * 
            FROM 
                " . $table_name;
   $stmt = $this->conn->prepare($query);
  $stmt->execute();
     return $stmt;
}

function conTiendaCant(){
 $table_name=  "productotienda";
 $query= "SELECT pt.idProducto, pt.idTienda, pt.cantidad, t.nombre, t.direccion 
  FROM  productotienda pt, tienda t WHERE idProducto=:pro  AND pt.idTienda=t.idTienda;";
 
 $stmt=$this->conn->prepare($query);
 $stmt->bindParam(":pro", $this->idProd); 
 $stmt->execute();
     return $stmt;
}

function infoTienda(){
    

 $query= "SELECT nombre, direccion, telefono 
  FROM  tienda WHERE idTienda=:idT;";
 
 $stmt=$this->conn->prepare($query);
 $stmt->bindParam(":idT", $this->idTienda); 
 $stmt->execute();
     return $stmt;
}

function updateTiendaProducto(){
    $query="UPDATE productotienda SET cantidad=(cantidad-".$this->CantP.") WHERE idProducto=:idPro AND idTienda=:idTien;";


 $stmt=$this->conn->prepare($query);
 //$stmt->bindParam(":CantP", $this->CantP);
 $stmt->bindParam(":idPro", $this->idPro);
 $stmt->bindParam(":idTien", $this->idTien);

 $stmt->execute();
 return $stmt;
}

function updateProducto(){
  $query="UPDATE producto SET cantidad=(cantidad-".$this->CantP.") WHERE idProducto=:idPro;";


 $stmt=$this->conn->prepare($query);
 $stmt->bindParam(":idPro", $this->idPro);


 $stmt->execute();
 return $stmt;  
}

function insertFacturaVenta(){
    $query="INSERT INTO facturaventa (formaPago, idEmpleado) VALUES (:fp, ".$this->idEmpleadoF.");";

   

 $stmt=$this->conn->prepare($query);
 //$stmt->bindParam(":fe", $this->fecha);
 $stmt->bindParam(":fp", $this->formaPago);
 
 $stmt->execute();
 $id = $this->conn->lastInsertId();
  
 return $id; 
}

function findIdPT(){

 $query= "SELECT idProductoTienda FROM productotienda WHERE (idProducto=:idP AND idTienda=:idT)";
 
 $stmt=$this->conn->prepare($query);
 $stmt->bindParam(":idP", $this->idProd);
 $stmt->bindParam(":idT", $this->idTienda); 
 $stmt->execute();
     return $stmt;
}

function insertDetalleFactura(){
$query="INSERT INTO detalleventa (subTotal, idFactura, idProductoTienda) VALUES ( ".$this->subt.", ".$this->idFact.", ".$this->idPT.");"; 

 $stmt=$this->conn->prepare($query);

 $stmt->execute();
 $id = $this->conn->lastInsertId();
 return $id;   
}
}
?>