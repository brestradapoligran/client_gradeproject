import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output() searchWord = new EventEmitter<String>();
  word: String = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  sendSearch() {
    this.searchWord.emit(this.word)
  }

}
