import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/model/IPropertyBase';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  properties: Array<IPropertyBase> = [];


  constructor(private route: ActivatedRoute,
    private housingService:HousingService) { }

  //dependency injection
  ngOnInit(): void {//we are using a Service so we dont get code duplication.
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2; // means we are on rent-property URl else we are on base URl
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(// as http get returns an observable we are using the subscribe method to return a value.
      data =>{
        this.properties = data;
        console.log(data);
        console.log(this.route.snapshot.url.toString());
      }, error => {
        console.log('httpError:');
        console.log(error);
      }
    );
  }

}
