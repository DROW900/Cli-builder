import { Component, OnInit } from '@angular/core';

interface tipoSeries {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  title = "Administración de Programas";
  subtitle = "Series";
  textButton = "Nueva Serie";
  titleCard = "Buscar Producción";
  showCloseButton = false;
  routeInfo = [];

  // Select

  selectedValue = "";
  tipoS: tipoSeries[] = [
    {value: '', viewValue: 'Selecciona una opción'},
    {value: 'Adquisición', viewValue: 'Adquisición'},
    {value: 'Producción', viewValue: 'Producción'},
    {value: 'Producción Digital', viewValue: 'Producción Digital'},
    {value: 'Donación', viewValue: 'Donación'},
    {value: 'Coproducción', viewValue: 'Coproducción'},
    {value: 'Podcast', viewValue: 'Podcast'},
    {value: 'Cine', viewValue: 'Cine'},
  ];

  // Seccion 2

  titleCard2 = "";
  routeInfo2 = ["Registros modificados", "Ingresados recientemente"];

  // Table
  headerName = "Buscar";
  headers = [
    {
      id:1,
      name: "Título original",
      checked: true,
    }, 
    {
      id: 2,
      name: "Título español",
      checked: true,
    },
    {
      id: 3,
      name: "Año",
      checked: true,
    },
    {
      id: 4,
      name: "Duración",
      checked: true,
    }
  ];

  content = [
    {
      header1: "",
      header2: "",
      header3: "",
      header4: "",
    },
    {
      header1: "",
      header2: "",
      header3: "",
      header4: "",
    },
    {
      header1: "",
      header2: "",
      header3: "",
      header4: "",
    }
   
  ]

  constructor() { }

  ngOnInit(): void {
  }


}
