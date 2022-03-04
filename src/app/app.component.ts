import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VisitService } from './services/visit.service';

@Component({
  selector: 'Root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'customers-web';
  subscription: Subscription = new Subscription();

  constructor(public visitService: VisitService) {}

  ngOnInit(): void {
    this.subscription = this.visitService.saveVisit().subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
