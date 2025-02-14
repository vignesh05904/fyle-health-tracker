import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddWorkoutComponent } from './add-workout.component';
import { WorkoutApiService } from '../../services/workout-api.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('AddWorkoutComponent', () => {
  let component: AddWorkoutComponent;
  let fixture: ComponentFixture<AddWorkoutComponent>;
  let workoutServiceSpy: jasmine.SpyObj<WorkoutApiService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('WorkoutApiService', ['getWorkoutInfo', 'saveWorkoutInfo']);

    await TestBed.configureTestingModule({
      declarations: [AddWorkoutComponent],
      imports: [FormsModule, FontAwesomeModule],
      providers: [{ provide: WorkoutApiService, useValue: spy }]
    }).compileComponents();

    workoutServiceSpy = TestBed.inject(WorkoutApiService) as jasmine.SpyObj<WorkoutApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when submitting empty form', () => {
    spyOn(Swal, 'fire');
    component.add_workout({ value: {}, reset: () => {} } as any);
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({ title: 'Hold on!' }));
  });

  it('should show error for invalid username', () => {
    spyOn(Swal, 'fire');
    const invalidForm = {
      value: { username: 'J!$78^', WorkoutType: 'Running', workoutMinutes: 30 },
      reset: () => {}
    } as any;

    component.add_workout(invalidForm);

    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({ title: 'Invalid Username!' }));
  });

  it('should show error for invalid workout minutes', () => {
    spyOn(Swal, 'fire');
    const invalidMinutesForm = {
      value: { username: 'John', WorkoutType: 'Running', workoutMinutes: -10 },
      reset: () => {}
    } as any;

    component.add_workout(invalidMinutesForm);
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({ title: 'Invalid Workout Minutes!' }));
  });

  it('should add new user if not exists', () => {
    workoutServiceSpy.getWorkoutInfo.and.returnValue([]);
    const validForm = {
      value: { username: 'NewUser', WorkoutType: 'Swimming', workoutMinutes: 40 },
      reset: () => {}
    } as any;

    component.add_workout(validForm);
    expect(workoutServiceSpy.saveWorkoutInfo).toHaveBeenCalled();
  });

  it('should update workout minutes if user exists', () => {
    const mockData = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] }
    ];
    workoutServiceSpy.getWorkoutInfo.and.returnValue(mockData);

    const validForm = {
      value: { username: 'John Doe', WorkoutType: 'Running', workoutMinutes: 20 },
      reset: () => {}
    } as any;

    component.add_workout(validForm);
    expect(workoutServiceSpy.saveWorkoutInfo).toHaveBeenCalled();
    expect(mockData[0].workouts[0].minutes).toBe(50);
  });

  it('should add new workout type if user exists but workout type is new', () => {
    const mockData = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] }
    ];
    workoutServiceSpy.getWorkoutInfo.and.returnValue(mockData);

    const validForm = {
      value: { username: 'John Doe', WorkoutType: 'Swimming', workoutMinutes: 40 },
      reset: () => {}
    } as any;

    component.add_workout(validForm);
    expect(workoutServiceSpy.saveWorkoutInfo).toHaveBeenCalled();
    expect(mockData[0].workouts.length).toBe(2);
  });

  it('Should toggle the custom workout select options', () => {
    // Simulating an toggle
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBe(true);

    // Simulating another toggle
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBe(false);
  });

  it('After selecting an option from workout options.', () => {
    // Simulating the Select Option as Running
    component.selectOption('Running');

    // The selectedOption should be Running and isDropdownOpen should be false
    expect(component.selectedOption).toBe('Running');
    expect(component.isDropdownOpen).toBe(false);
  });

});
