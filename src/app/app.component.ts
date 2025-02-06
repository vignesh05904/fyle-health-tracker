import { Component, OnInit } from '@angular/core';
import { WorkoutApiService } from './services/workout-api.service';
import { User } from './models/interfaces';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ChartOptions } from 'chart.js';

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
 

  ngOnInit() {
    this.updateTime();
    setInterval(() => {
      this.updateTime(); // Update every second
    }, 1000);
  }

  updateTime() {
    this.CurrentDateTime = new Date().toLocaleString();
  }

  constructor(private api:WorkoutApiService) {
    api.loadUserData(); // loading data from localStorage.
    this.userData = api.getWorkoutInfo() || []; // getting WorkoutData from localStorage.
    this.updatePagination(); // updating the table data with respect to pagination filters.
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
}
