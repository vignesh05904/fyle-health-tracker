import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WorkoutApiService } from './services/workout-api.service';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockApiService: jasmine.SpyObj<WorkoutApiService>;
  let SwalSpy: jasmine.Spy;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('WorkoutApiService', ['loadUserData', 'getWorkoutInfo', 'saveWorkoutInfo']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent, AddWorkoutComponent],
      imports: [FormsModule], 
      providers: [{ provide: WorkoutApiService, useValue: apiSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockApiService = TestBed.inject(WorkoutApiService) as jasmine.SpyObj<WorkoutApiService>;

    mockApiService.getWorkoutInfo.and.returnValue([
      { id: 1, name: 'John Doe',
        workouts: [{ type: 'Running', minutes: 30 }],
      },
    ]);

    component.userData = mockApiService.getWorkoutInfo();
    fixture.detectChanges();
  });


  it('Should load user data on initialization', () => {
    expect(mockApiService.getWorkoutInfo).toHaveBeenCalled();
    expect(component.userData.length).toBe(1);
  });


  it('Should filter by name', () => {
    component.searchName = 'John';
    component.filterByNameType();

    expect(component.paginatedUsers.length).toBe(1);
    expect(component.paginatedUsers[0].name).toBe('John Doe');
  });

  it('Should calculate total Workout minutes', () => {
    const totalMinutes = component.getTotalMinutes([
      { minutes: 30 },
      { minutes: 45 },
    ]);

    expect(totalMinutes).toBe(75);
  });

  it('Should count the number of Workouts', () => {
    const workoutCount = component.getWorkoutCount([
      { type: 'Running', minutes: 30 },
      { type: 'Cycling', minutes: 45 },
    ]);

    expect(workoutCount).toBe(2);
  });

  it('Should update pagination correctly', () => {
    component.itemsPerPage = 1;
    component.updatePagination();

    expect(component.totalPages).toBe(1);
    expect(component.paginatedUsers.length).toBe(1);
  });

  it('Should go to the next page', () => {
    component.totalPages = 3;
    component.currentPage = 1;

    component.goToNextPage();
    expect(component.currentPage).toBe(2);
  });

  it('Should not go to next page if already on last page', () => {
    component.totalPages = 3;
    component.currentPage = 3;
    component.goToNextPage();
    expect(component.currentPage).toBe(3);
  });

  it('Should go to the previous page', () => {
    component.currentPage = 2;
    component.goToPreviousPage();
    expect(component.currentPage).toBe(1);
  });

  it('Should call updateTime on ngOnInit', () => {
    spyOn(component, 'updateTime');

    component.ngOnInit();
    expect(component.updateTime).toHaveBeenCalled();
  });


it('Should update currentPage and call updatePagination in goToPage()', () => {
  spyOn(component, 'updatePagination');

  component.goToPage(2);

  expect(component.currentPage).toBe(2);
  expect(component.updatePagination).toHaveBeenCalled();
});

it('Should reset currentPage to 1 and call updatePagination in onItemsPerPageChange()', () => {
  spyOn(component, 'updatePagination');

  component.onItemsPerPageChange();

  expect(component.currentPage).toBe(1);
  expect(component.updatePagination).toHaveBeenCalled();
});

it('Should filter users by workout type when workoutType is provided and matches', () => {
  component.workoutType = 'Running';
  component.filterByNameType();

  expect(component.paginatedUsers.length).toBe(1);
  expect(component.paginatedUsers[0].name).toBe('John Doe');
});

it('Should filter by workout type', () => {
  component.workoutType = 'Running';
  component.filterByType(component.workoutType);

  expect(component.paginatedUsers.length).toBe(1);
  expect(component.paginatedUsers[0].workouts[0].type).toBe('Running');
});

it('Should call updateTime every second using setInterval', (done) => {
  spyOn(component, 'updateTime');

  component.ngOnInit();

  setTimeout(() => {
    expect(component.updateTime).toHaveBeenCalledTimes(3); 
    done();
  }, 1000); 
});


it('Should return all users when workoutType is empty', () => {
  component.workoutType = '';
  component.filterByType('');
  
  console.log('debug Users:', component.paginatedUsers);
  expect(component.paginatedUsers.length).toBe(component.userData.length);
});

// optional feature charts-ngx test unit.
it('Should update selectedUser and call updateChart() on user selection', () => {
  spyOn(component, 'updateChart');

  component.onSelectUser(1);
  
  expect(component.selectedUser).toEqual(component.userData[0]);
  expect(component.updateChart).toHaveBeenCalled();
});

it('Should correctly update chartData when updateChart() is called', () => {
  component.selectedUser = {
    id: 1,
    name: 'John Doe',
    workouts: [
      { type: 'Running', minutes: 30 },
      { type: 'Swimming', minutes: 40 }
    ]
  };

  component.updateChart();

  expect(component.chartData).toEqual([
    { name: 'Running', value: 30 },
    { name: 'Swimming', value: 40 }
  ]);
});

});
