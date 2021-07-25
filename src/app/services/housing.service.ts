import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IProperty } from '../IProperty';


@Injectable({
  providedIn: 'root'
})
export class HousingService {

constructor(private http:HttpClient) { }

getAllProperties(): Observable<IProperty[]> {
  return this.http.get('data/properties.json').pipe(
    map(data => {
      const jsonData = JSON.stringify(data); // converts the data to Json String
      const propertiesArray: Array<IProperty> = JSON.parse(jsonData);
      return propertiesArray;
    })
  );
}

}
