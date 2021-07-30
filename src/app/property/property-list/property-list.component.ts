import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProperty } from 'src/app/IProperty';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  properties: Array<IProperty> = [];


  constructor(private route: ActivatedRoute,
    private housingService:HousingService) { }

  //dependency injection
  ngOnInit(): void {//we are using a Service so we dont get code duplication.
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2; // We are Using 1 or 2 to determine if we are on 1 = Sell Url or 2 = Rent Url
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
