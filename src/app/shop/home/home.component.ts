import { Component } from '@angular/core';
import { NgZorroModule } from '../../shared/ng-zorro/ng-zorro.module';

@Component({
  selector: 'app-home',
  imports: [
    NgZorroModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
