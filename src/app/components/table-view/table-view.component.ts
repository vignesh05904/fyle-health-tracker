import { Component } from '@angular/core';
import { User } from '../../models/workout-interfaces';
import { WorkoutApiService } from '../../services/workout-api.service';
import { faRunning, faBicycle, faSwimmer, faSpa } from '@fortawesome/free-solid-svg-icons';
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
  paginatedUsers: User[] = [];
  pages: number[] = [];
  userData: User[] = [];
  private unsubscribe$ = new Subject<void>(); 

  // fortawesome icons
  faRunning = faRunning;
  faBicycle = faBicycle;
  faSwimmer = faSwimmer;
  faSpa = faSpa;

  constructor(private service_api: WorkoutApiService){}

  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;

  updatePagination(){
    this.totalPages = this.userData.length / this.itemsPerPage;
    this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
    
    const start = Number(this.currentPage - 1) * this.itemsPerPage;

    this.paginatedUsers = this.userData.slice(start, Number(start) + Number(this.itemsPerPage));

    this.filterByNameType();
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

  SearchHandler(){
    this.currentPage = 1; // When an user started to search the Pagination Should goto pg-1 by default.
    this.filterByNameType();
  }

  
  filterByNameType(){

    const data = this.userData.filter(user => {
      const matchesWorkoutType = this.workoutType ? user.workouts.some(workout => workout.type === this.workoutType): true;

      const matchesSearchName = this.searchName ? user.name.toLowerCase().includes(this.searchName.toLowerCase()): true;

      return matchesWorkoutType && matchesSearchName;
    });

    const start = Number(this.currentPage - 1) * this.itemsPerPage;

    this.paginatedUsers = data.slice(start, Number(this.currentPage) * Number(this.itemsPerPage));


    console.log(data);
  }






















  filterByNamesType(workoutType?: string){
     const data = this.userData.filter(user => {
      const matchesWorkoutType = this.workoutType ? user.workouts.some(workout => workout.type === this.workoutType) : true;

      const matchesName = this.searchName ? user.name.toLowerCase().includes(this.searchName.toLowerCase()) : true;

      return matchesWorkoutType && matchesName;
    });

    this.paginatedUsers = data.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
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
