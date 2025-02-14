import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableViewComponent } from './table-view.component';
import { WorkoutApiService } from '../../services/workout-api.service';
import { of } from 'rxjs';
import { User } from '../../models/workout-interfaces';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('TableViewComponent', () => {
  let component: TableViewComponent;
  let fixture: ComponentFixture<TableViewComponent>;
  let mockWorkoutApiService: jasmine.SpyObj<WorkoutApiService>;

  const mockUserData: User[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 60 },
        { type: 'Swimming', minutes: 45 },
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Cycling', minutes: 40 },
        { type: 'Running', minutes: 20 },
      ],
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Running', minutes: 50 },
        { type: 'Yoga', minutes: 80 },
      ],
    },
    {
      id: 4,
      name: 'Joseph',
      workouts: [
        { type: 'Swimming', minutes: 50 },
        { type: 'Cycling', minutes: 80 },
      ],
    },
  ];

  beforeEach(async () => {
    mockWorkoutApiService = jasmine.createSpyObj('WorkoutApiService', ['userData$']);
    
    mockWorkoutApiService.userData$ = of(mockUserData); // Mock data stream
    
    await TestBed.configureTestingModule({
      declarations: [TableViewComponent],
      providers: [{ provide: WorkoutApiService, useValue: mockWorkoutApiService }],
      imports: [FormsModule,FontAwesomeModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should initialize userData and update pagination', () => {
    expect(component.userData.length).toBe(4);
    expect(component.totalPages).toBeGreaterThan(0);
  });

  it('Should go to the next page', () => {
    component.currentPage = 1;
    component.totalPages = 2;
    component.goToNextPage();
    expect(component.currentPage).toBe(2);
  });

  it('Should go to the previous page', () => {
    component.currentPage = 2;
    component.goToPreviousPage();
    expect(component.currentPage).toBe(1);
  });

  it('Should filter by name and workout type', () => {
    component.searchName = 'John D';
    component.workoutType = 'Running';
    component.filterByNameType();
    
    expect(component.paginatedUsers.length).toBe(1 );
    expect(component.paginatedUsers[0].name).toBe('John Doe');
  });

  it('Should calculate total minutes correctly', () => {
    const totalMinutes = component.getTotalMinutes(mockUserData[0].workouts);
    expect(totalMinutes).toBe(135);
  });

  it('Should count workouts correctly', () => {
    const workoutCount = component.getWorkoutCount(mockUserData[0].workouts);
    expect(workoutCount).toBe(3);
  });

  it('Should update currentPage and call updatePagination when goToPage is called', () => {
    component.goToPage(3);
    expect(component.currentPage).toBe(3);

  });
  
  it('Should reset currentPage to 1 and call updatePagination when onItemsPerPageChange is called', () => {
    component.currentPage = 5;
    component.onItemsPerPageChange();
    expect(component.currentPage).toBe(1);

  });

  it('Should filter users by workout type when workoutType is provided and matches', () => {
    component.workoutType = 'Running';
    component.filterByNameType();
  
    expect(component.paginatedUsers.length).toBe(3);
    expect(component.paginatedUsers[0].name).toBe('John Doe');
  });

  it('Should filter by name', () => {
    component.searchName = 'John Doe';
    component.filterByNameType();

    expect(component.paginatedUsers.length).toBe(1);
    expect(component.paginatedUsers[0].name).toBe('John Doe');
  });


  it('Should clean up on destroy', () => {
    const unsubscribeSpy = spyOn(component['unsubscribe$'], 'next');
    const completeSpy = spyOn(component['unsubscribe$'], 'complete');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
  
  it('Should run the SearchHandler function When the Search is Happening and Current Pagination Page should be 1 by default.', () => {
    // Simulating the SearchHandler with Sample Data 'John'
    component.SearchHandler()

    // Checking Weather the page is set to 1
    expect(component.currentPage).toBe(1);
  });
});
