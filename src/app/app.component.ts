import { Component, OnInit } from '@angular/core';
import { WorkoutApiService } from './services/workout-api.service';
import { User } from './models/interfaces';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ChartOptions } from 'chart.js';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  CurrentDateTime: string = '';
  
  workoutType: string = '';
  searchName: string = ''; 
  addWorkout: string = 'Running';
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;
  paginatedUsers: User[] = [];
  pages: number[] = [];
  userData: User[] = [];
  displayChart: boolean = JSON.parse(localStorage.getItem('displayChart') || 'false');

  toggleChart(){
    this.displayChart = !this.displayChart;
    localStorage.setItem('displayChart', JSON.stringify(this.displayChart));
  }

  ngOnInit() {
    this.updateTime();
    setInterval(() => {
      this.updateTime(); // Update every second
    }, 1000);
  }

  updateTime() {
    this.CurrentDateTime = new Date().toLocaleString();
  }

  view: any;
  constructor(private api:WorkoutApiService) {
    api.loadUserData(); // loading data from localStorage.
    this.userData = api.getWorkoutInfo() || []; // getting WorkoutData from localStorage.
    this.updatePagination(); // updating the table data with respect to pagination filters.

    this.onSelectUser(1); // Selecting the first user on the userData.
    this.updateChart(); // Updating the Chart with the selected UserData

    this.view = [innerWidth / 1.3, 400];
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.userData.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedUsers = this.userData.slice(start, start + this.itemsPerPage);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  onItemsPerPageChange() {
    this.currentPage = 1;
    this.updatePagination();
  }


  filterByType(workoutType: string){
    this.paginatedUsers = this.userData
    .filter(user => {
      const matchesWorkoutType = this.workoutType ? 
        user.workouts.some(workout => workout.type === this.workoutType) : true;

      return matchesWorkoutType;
    })
    .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }


  filterByNameType(){
    this.paginatedUsers = this.userData
    .filter(user => {
      const matchesWorkoutType = this.workoutType ? 
        user.workouts.some(workout => workout.type === this.workoutType) : true;

      const matchesName = this.searchName ? 
        user.name.toLowerCase().includes(this.searchName.toLowerCase()) : true;

      return matchesWorkoutType && matchesName;
    })
    .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }


  getTotalMinutes(workouts: { minutes: number }[]): number {
    return workouts.reduce((total,workout) =>  total + workout.minutes, 0);
  }
  
  getWorkoutCount(workouts: { type: string; minutes: number }[]): number {
    return workouts.length;
  }


  // chart optional feature script
  // chart feature 
  selectedUser: any = '';
  chartData: any[] = [];
  showLegend = true;
  
  onSelectUser(event: any) {
    const userId = event;
    this.selectedUser = this.userData.find(user => user.id == userId);
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

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#733e90', '#753797', '#733e90'] // Reason for not using tailwind for this on html, ngx-charts module does not support tailwind.
  };
  

}
