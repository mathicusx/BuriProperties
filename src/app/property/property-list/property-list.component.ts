import { Component, OnInit } from '@angular/core';
import { IProperty } from 'src/app/IProperty';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  properties: Array<IProperty> = [];


  constructor(private housingService:HousingService) { }

  //dependency injection
  ngOnInit(): void {//we are using a Service so we dont get code duplication.
    this.housingService.getAllProperties().subscribe(// as http get returns an observable we are using the subscribe method to return a value.
      data =>{
        this.properties = data;
        console.log(data);
      }, error => {
        console.log('httpError:');
        console.log(error);
      }
    );
  }

}
