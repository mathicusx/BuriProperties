import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-edit',
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.css']
})
export class PropertyEditComponent implements OnInit {

  public propertyId!: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.propertyId = this.route.snapshot.params['id'];
  }

}
