import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'compa';
  dominio = "http://localhost:8000/";

constructor(private http:HttpClient){


}

generaPoliza(){
  const consultas = [ "INSERT INTO dbo.Polizas (Id,Ejercicio,Periodo,TipoPol,Folio,Clase,Impresa,Concepto,Fecha,Cargos,Abonos,SistOrig,IdUsuario,ConFlujo,ConCuadre,Guid)"
  +" Values(112,2020,5,3,1234,1,0,'Poliza ingresada Servidor','2020-05-01 00:00:00.000',10000.00,10000.00,11,1,1,1,'D00527E2-90D5-11EA-A9A8-A9ABECEE8A18')",
"INSERT INTO dbo.MovimientosPoliza (TipoMovto,Id,IdPoliza,Ejercicio,Periodo,TipoPol,Folio,NumMovto,IdCuenta,Importe,Referencia,Concepto,Fecha,Guid)"+
"Values (0,15,112,2020,5,3,1234,1,16,10000.00,'Viene del Servidor','No Tomar en Cuenta','2020-05-01 00:00:00.000','D00527E2-90D5-11EA-A9A8-A9ABECEE8A18')"+
",      (1,16,112,2020,5,3,1234,2,13,10000.00,'Viene del Servidor 2','No Tomar en Cuenta','2020-05-01 00:00:00.000','D00527E2-90D5-11EA-A9A8-A9ABECEE8A18')"
];

consultas.forEach(element => {
  
  this.http.get(this.dominio+"getalgo/"+element).subscribe(

    (data:any)=>{
        console.log(data);
    });

});
 

}


}
