import { Component } from '@angular/core';
import { EventTypes } from 'src/app/feature/models/toast/event-types';
import { ToastService } from './feature/services/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client2';

  constructor() {
  }
}
