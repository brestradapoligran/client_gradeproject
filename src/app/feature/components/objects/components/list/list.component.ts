import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/feature/services/api/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  objects: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.callApi('api/v1/objects')
      .subscribe(data => this.objects = data);
  }

}
