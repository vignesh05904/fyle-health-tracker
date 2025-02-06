import { TestBed } from '@angular/core/testing';
import { WorkoutApiService } from './workout-api.service';

describe('WorkoutService', () => {
  let service: WorkoutApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutApiService);

    localStorage.clear();
  });

  it('should load user data from localStorage when available', () => {
    const mockData = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 30 },
        ],
      },
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockData));

    service.loadUserData();

    expect(service.userData).toEqual(mockData);
  });

  it('should load default userData if localStorage is empty', () => {
    service.loadUserData();
    expect(service.userData.length).toBe(3);
    expect(service.userData[0].name).toBe('John Doe');
  });

  it('should retrieve stored workout data from localStorage', () => {
    const mockData = [
      {
        id: 1,
        name: 'Test John',
        workouts: [{ type: 'Running', minutes: 20 }],
      },
    ];

    localStorage.setItem('workoutData', JSON.stringify(mockData));

    const retrievedData = service.getWorkoutInfo();
    expect(retrievedData.length).toBe(1);
    expect(retrievedData[0].name).toBe('Test John');
  });

  it('should save workout data to localStorage', () => {
    const testData = [
      {
        id: 4,
        name: 'Abhishek',
        workouts: [{ type: 'Swimming', minutes: 35 }],
      },
    ];

    service.saveWorkoutInfo(testData);
    const storedData = JSON.parse(localStorage.getItem('workoutData') as string);
    
    expect(storedData.length).toBe(1);
    expect(storedData[0].name).toBe('Abhishek');
  });


});

