import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import ObjectModel from 'src/app/feature/models/object.model';
import { ApiService } from 'src/app/feature/services/api/api.service';
import { ApiMethods } from 'src/app/feature/utils/api-methods';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  objects: ObjectModel[] = [];
  word: String = '';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getObjects();
  }

  async getObjects() {
    await this.api.callApi('api/v1/objects', ApiMethods.GET, true)
      .subscribe((data: any) => this.objects = data);
  }

  getWord(word: any) {
    if (word == undefined) {
      word = '';
    }
    this.api.callApi('api/v1/object/search', ApiMethods.GET, true, undefined, word)
      .subscribe((data: any) => this.objects = data);
  }

  async onDelete(id: string) {
    await this.api.callApi(`api/v1/object/${id}`, ApiMethods.DELETE, true)
      .subscribe(() => this.getObjects());
  }

}
