import { Component, HostListener, OnInit } from '@angular/core';
import { WorkoutApiService } from '../../services/workout-api.service';
import { User } from '../../models/workout-interfaces';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chart-view',
  standalone: false,
  
  templateUrl: './chart-view.component.html',
  styleUrl: './chart-view.component.scss'
})
export class ChartViewComponent implements OnInit{
  chartType: string = 'chart-bar-vertical';
  userData: User[] = [];
  selectedUser: any = '';
  userId: number = 1;
  chartData: any[] = [];
  showLegend = true;
  chartWidth: number = 0;
  chartHeight: number = 0;
  searchName: string = '';
  FilterByName: User[] = [];
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
    domain: ['rgb(231, 82, 119)', 'rgb(235, 97, 132)', 'rgb(235, 97, 132)']
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
      this.filterByName();
      this.onSelectUser();
    });
  }
  
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  chartResposive(Width?: number){
    const screenWidth = Width || window.innerWidth;
    if(screenWidth <= 600){
      this.chartWidth = 340;
      this.chartHeight = 320;
      this.showLegend = false;
    } else {
      this.chartWidth = 750;
      this.chartHeight = 400;
      this.showLegend = true;
    }
  }
  
  changeChartType(chart_type: string){
    this.chartType = chart_type;
  }

  filterByName(){
    const filterData = this.userData.filter(user =>
      user.name.toLowerCase().includes(this.searchName.toLowerCase())
    );

    this.FilterByName = filterData;
  }
}
