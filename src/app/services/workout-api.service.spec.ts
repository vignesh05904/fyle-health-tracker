import { TestBed } from '@angular/core/testing';
import { WorkoutApiService } from './workout-api.service';
import { User } from './../models/interfaces';
import Swal from 'sweetalert2';

describe('WorkoutApiService', () => {
  let service: WorkoutApiService;
  let mockUserData: User[];
  let saveWorkoutInfoSpy: jasmine.Spy;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutApiService);
    
    mockUserData = [
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
          { type: 'Running', minutes: 50 },
          { type: 'Cycling', minutes: 80 },
        ],
      },
    ]

    saveWorkoutInfoSpy = spyOn(service, 'saveWorkoutInfo').and.callThrough();

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'workoutData') {
        return JSON.stringify(mockUserData);
      }
      return null;
    });
    spyOn(localStorage, 'setItem');
    spyOn(Swal, 'fire');
  });


  afterEach(() => {
    localStorage.clear();
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should get workout info', () => {
    const data = service.getWorkoutInfo();
    expect(data).toEqual(mockUserData);
  });

  it('Should save workout info and update observable', () => {
    service.saveWorkoutInfo(mockUserData, false);
    expect(localStorage.setItem).toHaveBeenCalledWith('workoutData', JSON.stringify(mockUserData));
    expect(Swal.fire).toHaveBeenCalled();

    service.userData$.subscribe((data) => {
      expect(data).toEqual(mockUserData);
    });
  });

  it('Should save workout info without alert when specified', () => {
    service.saveWorkoutInfo(mockUserData, true);
    expect(localStorage.setItem).toHaveBeenCalledWith('workoutData', JSON.stringify(mockUserData));
    expect(Swal.fire).not.toHaveBeenCalled();
  });

  it('Should load default data and call saveWorkoutInfo when localStorage is empty', () => {
    localStorage.clear();
    service.loadUserData();

    expect(service.userData$).toBeTruthy();
  });

});
