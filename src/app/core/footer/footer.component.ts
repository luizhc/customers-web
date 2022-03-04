import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { VisitService } from '../../services/visit.service';

@Component({
  selector: 'Footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  subscription: Subscription = new Subscription();
  visits: string = '';

  constructor(public visitService: VisitService) {}

  ngOnInit(): void {
    this.getVisits();
    this.subscription = interval(10000).subscribe(() => this.getVisits());
  }

  getVisits() {
    this.visitService.getVisits().subscribe((visits: any) => {
      if (visits.length) {
        this.visits = ` | ${visits.length} visitas`;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
