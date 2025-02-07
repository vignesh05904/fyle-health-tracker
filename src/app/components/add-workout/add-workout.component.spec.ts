import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddWorkoutComponent } from './add-workout.component';
import { FormsModule, NgForm } from '@angular/forms'; 
import Swal from 'sweetalert2';
import { WorkoutApiService } from '../../services/workout-api.service';
import { AppComponent } from '../../app.component';

const mockApiService = jasmine.createSpyObj('WorkoutApiService', ['saveWorkoutInfo', 'loadUserData']);

class MockAppComponent {
  userData = [{ id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] }] ;
  updatePagination() {}
  updateChart() {}
}

describe('AddWorkoutComponent', () => {
  let component: AddWorkoutComponent;
  let fixture: ComponentFixture<AddWorkoutComponent>;
  let mockAppComponent: MockAppComponent;

  beforeEach(async () => {
    mockAppComponent = new MockAppComponent();

    await TestBed.configureTestingModule({
      declarations: [AddWorkoutComponent],
      imports: [FormsModule],
      providers: [
        { provide: WorkoutApiService, useValue: mockApiService },
        { provide: AppComponent, useValue: mockAppComponent }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWorkoutComponent);
    component = fixture.componentInstance;

    // Mock loadUserData to return necessary user data
    mockApiService.loadUserData.and.returnValue(mockAppComponent.userData);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new workout for an existing user', () => {
    const newWorkout = { username: 'John Doe', WorkoutType: 'Cycling', workoutMinutes: 20 };

    const mockForm = {
      value: newWorkout,
      reset: jasmine.createSpy('reset')
    } as unknown as NgForm;

    component.add_workout(mockForm);

    expect(mockAppComponent.userData[0].workouts.length).toBe(2);
    expect(mockAppComponent.userData[0].workouts[1].type).toBe('Cycling');
    expect(mockAppComponent.userData[0].workouts[1].minutes).toBe(20);
    expect(mockApiService.saveWorkoutInfo).toHaveBeenCalledWith(mockAppComponent.userData);
  });

  it('Should not add a workout if workoutMinutes is 0', () => {
    const invalidWorkout = { username: 'Jane Doe', WorkoutType: 'Swimming', workoutMinutes: 0 };
  
    const mockForm = {
      value: invalidWorkout,
      reset: jasmine.createSpy('reset'),
    } as unknown as NgForm;
  
    spyOn(Swal, 'fire').and.callThrough();
  
    const initialLength = mockAppComponent.userData.length;
  
    component.add_workout(mockForm);
  
    // Check if Swal was called with correct arguments
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
      icon: 'error',
      title: 'Invalid Workout Minutes!',
      text: 'Workout minutes must be a valid number greater than 0, without leading zeros.',
    }));
  
    // TO Ensure userData is not updated after giving invalid input
     expect(mockAppComponent.userData.length).toBe(initialLength);
  });

  it('Should show error if fields are missing', () => {
    const form = { value: { username: '', WorkoutType: '', workoutMinutes: null } } as NgForm;
  
    const mockForm = {
      value: form,
      reset: jasmine.createSpy('reset'),
    } as unknown as NgForm;
  
    spyOn(Swal, 'fire').and.callThrough();
  
    // using incomplete data
    component.add_workout(mockForm);
  
    // Check if Swal was called with correct arguments
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
        icon: 'error',
          title: 'Hold on!',
          text: 'Looks like some fields are missing. Complete them to proceed.',
     }));
  
  });
  

  it('Should show error when username is invalid', () => {
  
    let form = { username: 'John Doe%$#%s', WorkoutType: 'Running', workoutMinutes: 30 } ;
  
    let mockForm = {
      value: form,
      reset: jasmine.createSpy('reset'),
    } as unknown as NgForm;
  
    spyOn(Swal, 'fire').and.callThrough();
  
    component.add_workout(mockForm);
  
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
        icon: 'error',
          title: 'Invalid Username!',
          text: 'Username must be at least 3 characters long and contain only letters and numbers.',
     }));
  });

    it('Should just add exta workout mintues, if existingWorkout is aldready present.', () => {
    
      let form = { username: 'John Doe', WorkoutType: 'Running', workoutMinutes: 20 } ;
    
      let mockForm = {
        value: form,
        reset: jasmine.createSpy('reset'),
      } as unknown as NgForm;
    
      spyOn(Swal, 'fire').and.callThrough();
    
      component.add_workout(mockForm);
    
      expect(mockAppComponent.userData[0].workouts[0].minutes).toBe(50);
    });

    it('Should add a new user with a workout', () => {
      const newUserWorkout = { username: 'Jane Doe', WorkoutType: 'Swimming', workoutMinutes: 45 };
  
      const mockForm = {
          value: newUserWorkout,
          reset: jasmine.createSpy('reset'),
        } as unknown as NgForm;
  
      component.add_workout(mockForm);
  
      expect(mockAppComponent.userData.length).toBe(2);
      expect(mockAppComponent.userData[1].name).toBe('Jane Doe');
      expect(mockAppComponent.userData[1].workouts.length).toBe(1);
      expect(mockAppComponent.userData[1].workouts[0].type).toBe('Swimming');
      expect(mockAppComponent.userData[1].workouts[0].minutes).toBe(45);
    });
});
