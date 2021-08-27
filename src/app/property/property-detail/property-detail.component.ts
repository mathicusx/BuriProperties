
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';
import { Property } from 'src/app/model/property';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
    selector: 'app-property-detail',
    templateUrl: './property-detail.component.html',
    styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
    public propertyId!: number;
    public mainPhotoUrl: string = "";
    property = new Property();
    galleryOptions!: NgxGalleryOptions[];
    galleryImages!: NgxGalleryImage[];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private housingService: HousingService) { }

    ngOnInit() {
        this.propertyId = +this.route.snapshot.params['id'];
        this.route.data.subscribe(
            (data: any) => {
                this.property = data['prp'];
                console.log(this.property.photos);
            }
        );

        // here we get our calculated age from our housingservice Method.
        this.property.age = this.housingService.getPropertyAge(this.property.estPossessionOn!);



        this.galleryOptions = [
            {
                width: '100%',
                height: '465px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide,
                preview: true
            }
        ];

        this.galleryImages = this.getPropertyPhotos(); // we get property photos from our Api.
    }
    getPropertyPhotos(): NgxGalleryImage[] {
        const photoUrls: NgxGalleryImage[] = [];
        for (const photo of this.property.photos!) {
            if(photo.isPrimary)
            {
                this.mainPhotoUrl = photo.imageUrl;
            }
            else{
              // we push each image to photo urls and set 3 urlss for small medium and big.
                photoUrls.push(
                    {
                        small: photo.imageUrl,
                        medium: photo.imageUrl,
                        big: photo.imageUrl
                    }
                );}
        }
        return photoUrls;
    }
}
