import { Component, HostListener, OnInit } from '@angular/core';
import { WorkoutApiService } from '../../services/workout-api.service';
import { User } from '../../models/interfaces';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chart-view',
  standalone: false,
  
  templateUrl: './chart-view.component.html',
  styleUrl: './chart-view.component.scss'
})
export class ChartViewComponent implements OnInit{
  userData: User[] = [];
  selectedUser: any = '';
  userId: number = 1;
  chartData: any[] = [];
  showLegend = true;
  chartWidth: number = 650;
  private unsubscribe$ = new Subject<void>(); 

  constructor(private service_api: WorkoutApiService){}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.chartResposive(event.target.innerWidth);
  }

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#733e90', '#753797', '#733e90']
  };

  onSelectUser(event?: any) {
    this.userId = event || this.userId;
    this.selectedUser = this.userData.find(user => user.id == this.userId);
    this.updateChart();
  }

  updateChart() {
    if (this.selectedUser) {
      this.chartData = this.selectedUser.workouts.map((workout: { type: string; minutes: number }) => ({
        name: workout.type,
        value: workout.minutes
      }));
    }
  }

  ngOnInit(): void {
    this.chartResposive();
    this.service_api.userData$.subscribe(data => {
      this.userData = data;
      this.onSelectUser();
    });
  }
  
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  chartResposive(Width?: number){
    console.log('responssive.')
    const screenWidth = Width || window.innerWidth;
    if(screenWidth <= 600){
      this.chartWidth = 340;
      this.showLegend = false;
    } else {
      this.chartWidth = 650;
      this.showLegend = true;
    }
  }
}
