import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../model/property';
import { environment } from '../../environments/environment';
import { Ikeyvaluepair } from '../model/IKeyValuePair';


@Injectable({
    providedIn: 'root'
})
export class HousingService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getAllCities(): Observable<string[]> {
        return this.http.get<string[]>(this.baseUrl + '/city/cities');
    }

    getPropertyTypes(): Observable<Ikeyvaluepair[]> {
        return this.http.get<Ikeyvaluepair[]>(this.baseUrl + '/propertytype/list');
    }

    getFurnishingTypes(): Observable<Ikeyvaluepair[]> {
        return this.http.get<Ikeyvaluepair[]>(this.baseUrl + '/furnishingtype/list');
    }

    getProperty(id: number) {
        return this.http.get<Property>(this.baseUrl + '/property/detail/'+id.toString());
    }

    getAllProperties(SellRent?: number): Observable<Property[]> {
        return this.http.get<Property[]>(this.baseUrl + '/property/list/'+SellRent!.toString());
    }
    addProperty(property: Property) {
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer '+ localStorage.getItem('token')
            })
        };
        return this.http.post(this.baseUrl + '/property/add', property, httpOptions); // we are submitting our property here.

    }

    newPropID() {
        if (localStorage.getItem('PID')) {
            localStorage.setItem('PID', String(+localStorage.getItem('PID')! + 1));
            return +localStorage.getItem('PID')!;
        } else {
            localStorage.setItem('PID', '101');
            return 101;
        }
    }

    getPropertyAge(dateofEstablishment: string): string
    {
        const today = new Date();
        const estDate = new Date(dateofEstablishment);

        // we are getting age of property by getting today's date - establishment date of property.
        let age = today.getFullYear() - estDate.getFullYear();

        // difference of months same as age.
        const m = today.getMonth() - estDate.getMonth();


        // here we are checking if month of current date is  smaller than the month of establishment date
        // or if the month is the same but our current date is smaller than the establishment date
        // that means our property hasn't completed a full year so we are substracting from our age.
        if (m < 0 || (m === 0 && today.getDate() < estDate.getDate())) {
            age --;
        }

        // Establshment date is future date
        if(today < estDate) {
            return '0';
        }

        // Age is less than a year
        if(age === 0) {
            return 'Less than a year';
        }

        return age.toString();
    }

}
