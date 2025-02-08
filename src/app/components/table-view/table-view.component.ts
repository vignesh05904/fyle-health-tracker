import { Component } from '@angular/core';
import { User } from '../../models/interfaces';
import { WorkoutApiService } from '../../services/workout-api.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table-view',
  standalone: false,
  
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss'
})
export class TableViewComponent {
  workoutType: string = '';
  searchName: string = ''; 
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;
  paginatedUsers: User[] = [];
  pages: number[] = [];
  userData: User[] = [];
  private unsubscribe$ = new Subject<void>(); 

  constructor(private service_api: WorkoutApiService){}

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

  filterByNameType(workoutType?: string){
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

  ngOnInit(): void {
    this.service_api.userData$.subscribe(data => {
      this.userData = data;
      this.updatePagination();
    });
  }
  
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
